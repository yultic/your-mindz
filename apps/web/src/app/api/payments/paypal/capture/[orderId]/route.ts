import { NextRequest, NextResponse } from 'next/server'
import prisma, { Prisma } from '@jess-web/database'

const PAYPAL_BASE_URL =
  process.env.PAYPAL_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64') // datos de 8 bits (bytes) los re mapea a un conjunto de 64 caracteres.

  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`PayPal auth failed: ${res.statusText}`)

  const data = await res.json()
  return data.access_token
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
    }

    const token = await getAccessToken()

    const res = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const capture = await res.json()

    if (!res.ok) {
      console.error('[PayPal] Capture failed:', capture)
      return NextResponse.json(
        { error: 'Failed to capture payment', details: capture },
        { status: res.status }
      )
    }

    if (capture.status !== 'COMPLETED') {
      console.warn('[PayPal] Capture not completed:', capture.status)
      return NextResponse.json(
        { error: `Payment status: ${capture.status}` },
        { status: 402 }
      )
    }

    // 1. Extraer datos con seguridad y asegurar fallbacks
    const captureUnit = capture.purchase_units?.[0]
    const captureDetail = captureUnit?.payments?.captures?.[0]
    
    // Aseguramos que el valor sea un string válido para Decimal
    const amountValue = captureDetail?.amount?.value || "0.00"
    const currencyCode = captureDetail?.amount?.currency_code || "USD"

    const paymentData = {
      captureId: captureDetail?.id,
      status: 'paid',
      paidAt: captureDetail?.create_time ? new Date(captureDetail.create_time) : new Date(),
      payerEmail: capture.payer?.email_address,
      payerName: `${capture.payer?.name?.given_name ?? ''} ${capture.payer?.name?.surname ?? ''}`.trim(),
      amount: new Prisma.Decimal(amountValue),
      currency: currencyCode,
    }

    // 2. Lógica de base de datos resiliente
    try {
      await prisma.appointment.upsert({
        where: { paypalOrderId: orderId },
        update: {
          ...paymentData,
        },
        create: {
          paypalOrderId: orderId,
          sessionType: captureUnit?.custom_id ?? 'therapy-session',
          ...paymentData,
        },
      })
      console.log('[PayPal] Payment saved/updated in DB successfully')
    } catch (dbErr) {
      // REGISTRAMOS EL ERROR CRÍTICO pero no lanzamos 500
      // El pago YA se realizó en PayPal, no queremos asustar al usuario
      console.error('CRITICAL: Payment succeeded in PayPal but DB update failed:', dbErr)
    }

    const paymentResult = {
      orderId,
      ...paymentData,
      status: capture.status,
    }

    console.log('[PayPal] Payment captured successfully:', paymentResult)

    return NextResponse.json(paymentResult)
  } catch (err) {
    console.error('[PayPal] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}