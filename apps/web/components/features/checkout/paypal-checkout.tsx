import { useCallback, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from '@jess-web/ui'

export interface PaymentResult {
    orderId: string
    status: string
    calendlyToken?: string
    payerEmail?: string
    payerName?: string
    captureId?: string
    amount?: string
    currency?: string
    capturedAt?: string
}

export interface PaypalCheckoutProps {
    amount: string
    description: string
    sessionType?:string
    currency?: string
    onSuccess?: (result: PaymentResult) => void
    onCancel?: () => void
    onError?: (error: unknown) => void
    className?: string
}

function PayPalButtonWrapper ({
    amount,
    description,
    sessionType,
    onSuccess,
    onCancel,
    onError
}: Omit<PaypalCheckoutProps, 'currency' | 'className'>) {
    const [{ isPending, isResolved, isRejected}] = usePayPalScriptReducer()
    const [paymentState, setPaymentState] = useState< 'idle' | 'processing' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const createOrder = useCallback(async () => {
        setPaymentState('processing')
        setErrorMessage(null)
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
        const res = await fetch(`${API_URL}/payments/paypal/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ amount, description, sessionType}),
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.error ?? 'Failed to create order')
        }

        const order = await res.json()
        return order.id as string
    }, [amount, description, sessionType])

    const onApprove = useCallback(
        async (data: {
            orderID: string}) => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
                    const res = await fetch(
                        `${API_URL}/payments/paypal/capture/${data.orderID}`,
                        { method: 'POST'}
                    )
                    if (!res.ok) {
                        const err = await res.json()
                        throw new Error(err.error ?? 'Failed to capture payment')
                    }

                    const result: PaymentResult = await res.json()
                    setPaymentState('success')
                    onSuccess?.(result)
                } catch (err) {
                    const message = err instanceof Error ? err.message : 'Payment capture failed'
                    setPaymentState('error')
                    setErrorMessage(message)
                    onError?.(err)
                }
            },
            [onSuccess, onError]
    )
    const handleError = useCallback(
        (err: unknown) => {
            const message = err instanceof Error ? err.message: 'An unexpected payment error occurred'
            setPaymentState('error')
            setErrorMessage(message)
            onError?.(err)
        },
        [onError]
    )

    const handleCancel = useCallback(() => {
        setPaymentState('idle')
        onCancel?.()        
    }, [onCancel])

    if (isPending) {
        return (
            <div className="flex items-center justify-center py-6 text-muted-foreground gap-2">
                <Loader2 className="w-4 h-4 animate-spin"/>
                <span className="text-sm">Loading payment options...</span>
            </div>
        )
    }

  if (isRejected) {
    return (
      <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>Could not load PayPal. Please refresh the page or try another payment method.</span>
      </div>
    )
  }


  if (paymentState === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-600" />
        <div>
          <p className="font-semibold text-foreground">Payment Successful!</p>
          <p className="text-sm text-muted-foreground mt-1">
            You'll receive a confirmation email shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Error message */}
      {paymentState === 'error' && errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Proceso */}
      {paymentState === 'processing' && (
        <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-md text-primary text-sm">
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          <span>Processing your payment...</span>
        </div>
      )}

      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay',
          height: 45,
        }}
        disabled={paymentState === 'processing'}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={handleError}
        onCancel={handleCancel}
      />

      <p className="text-xs text-center text-muted-foreground">
        Secured by PayPal. Your financial information is never shared.
      </p>
    </div>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────

/**
 * Drop-in PayPal checkout component.
 *
 * Usage:
 * ```tsx
 * <PaypalCheckout
 *   amount="75.00"
 *   description="Individual therapy session - 50 min"
 *   sessionType="individual"
 *   onSuccess={(result) => console.log('Paid!', result)}
 * />
 * ```
 */
export function PaypalCheckout({
  amount,
  description,
  sessionType,
  currency = 'USD',
  onSuccess,
  onCancel,
  onError,
  className,
}: PaypalCheckoutProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <div className={cn('p-4 border border-yellow-200 bg-yellow-50 rounded-lg text-yellow-800 text-xs flex flex-col gap-2', className)}>
        <p className="font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          PayPal Configuration Missing
        </p>
        <p>Please add <strong>NEXT_PUBLIC_PAYPAL_CLIENT_ID</strong> file and restart the development server.</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <PayPalScriptProvider
        options={{
          clientId: clientId,
          currency: currency,
          intent: 'capture',
          components: 'buttons',
        }}
      >
        <PayPalButtonWrapper
          amount={amount}
          description={description}
          sessionType={sessionType}
          onSuccess={onSuccess}
          onCancel={onCancel}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  )
}
