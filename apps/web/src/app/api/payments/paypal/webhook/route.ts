import { NextRequest, NextResponse } from 'next/server'
import prisma, { Prisma } from '@jess-web/database'

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
 * Verificando el webhook por si no viene de un atacante queriendose pasar por paypal
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

  // verificacion de la firma del webhook para asegurarnos que viene de paypal y no de un atacante
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
        const orderId = capture.supplementary_data?.related_ids?.order_id
        
        if (!orderId) {
          console.error('[PayPal Webhook] Capture event missing order_id', capture.id)
          break
        }

        // Preparamos los datos comunes para evitar repetición (DRY)
        const paymentData = {
          captureId: capture.id,
          status: 'paid',
          paidAt: capture.create_time ? new Date(capture.create_time) : new Date(),
          payerEmail: capture.payer?.email_address,
          payerName: `${capture.payer?.name?.given_name ?? ''} ${capture.payer?.name?.surname ?? ''}`.trim(),
          // Usamos Prisma.Decimal para evitar problemas de precisión de floats
          amount: new Prisma.Decimal(capture.amount.value), 
          currency: capture.amount.currency_code,
        }

        try {
          await prisma.appointment.upsert({
            where: { paypalOrderId: orderId },
            update: {
              ...paymentData,
            },
            create: {
              paypalOrderId: orderId,
              sessionType: capture.custom_id ?? 'therapy-session',
              ...paymentData,
            },
          })

          console.log('[PayPal Webhook] Payment completed and saved to DB:', capture.id)
        } catch (dbError) {
          if (dbError instanceof Prisma.PrismaClientKnownRequestError && (dbError as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
             console.error('[PayPal Webhook] Unique constraint failed. Possible duplicate captureId:', (dbError as Prisma.PrismaClientKnownRequestError).meta)
          } else {
             throw dbError; // Re-lanzar para que el catch principal lo capture
          }
        }
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