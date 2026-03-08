import { NextRequest, NextResponse } from 'next/server'
import * as crypto from 'crypto'

const PAYPAL_BASE_URL =
  process.env.PAYPAL_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  const data = await res.json()
  return data.access_token
}

/**
 * Verify webhook signature using PayPal's verification API.
 * This is the recommended approach over manual HMAC verification.
 */
async function verifyWebhookSignature(
  headers: Headers,
  rawBody: string
): Promise<boolean> {
  try {
    const token = await getAccessToken()

    const verificationPayload = {
      auth_algo: headers.get('paypal-auth-algo'),
      cert_url: headers.get('paypal-cert-url'),
      transmission_id: headers.get('paypal-transmission-id'),
      transmission_sig: headers.get('paypal-transmission-sig'),
      transmission_time: headers.get('paypal-transmission-time'),
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(rawBody),
    }

    const res = await fetch(
      `${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationPayload),
      }
    )

    const result = await res.json()
    return result.verification_status === 'SUCCESS'
  } catch (err) {
    console.error('[PayPal Webhook] Signature verification failed:', err)
    return false
  }
}

export async function POST(req: NextRequest) {
  // Read raw body BEFORE parsing — needed for signature verification
  const rawBody = await req.text()

  // ─── Signature verification ──────────────────────────────
  const isValid = await verifyWebhookSignature(req.headers, rawBody)

  if (!isValid) {
    console.warn('[PayPal Webhook] Invalid signature — rejecting request')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const event = JSON.parse(rawBody)

  console.log(`[PayPal Webhook] Event received: ${event.event_type}`, {
    id: event.id,
    resource_type: event.resource_type,
  })

  // ─── Event routing ───────────────────────────────────────
  try {
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const capture = event.resource
        /**
         * TODO: Implement your business logic here:
         * - Mark appointment as paid in DB
         * - Send confirmation email to patient
         * - Notify therapist
         *
         * Example:
         * await appointmentService.confirmPayment({
         *   captureId: capture.id,
         *   orderId: capture.supplementary_data?.related_ids?.order_id,
         *   amount: capture.amount.value,
         *   payerEmail: capture.payer?.email_address,
         * })
         */
        console.log('[PayPal Webhook] Payment completed:', capture.id)
        break
      }

      case 'PAYMENT.CAPTURE.DENIED': {
        const capture = event.resource
        /**
         * TODO:
         * - Mark appointment as payment_failed
         * - Notify patient of failed payment
         */
        console.warn('[PayPal Webhook] Payment denied:', capture.id)
        break
      }

      case 'PAYMENT.CAPTURE.REFUNDED': {
        const refund = event.resource
        /**
         * TODO:
         * - Update appointment status to refunded
         * - Log refund in financial records
         */
        console.log('[PayPal Webhook] Payment refunded:', refund.id)
        break
      }

      case 'CHECKOUT.ORDER.APPROVED': {
        // Order was approved by buyer but not yet captured
        // This is informational — capture happens via the frontend flow
        console.log('[PayPal Webhook] Order approved:', event.resource.id)
        break
      }

      default:
        console.log(`[PayPal Webhook] Unhandled event type: ${event.event_type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[PayPal Webhook] Processing error:', err)
    // Return 200 anyway to avoid PayPal retrying — log the real error
    return NextResponse.json({ received: true, error: 'Processing error logged' })
  }
}