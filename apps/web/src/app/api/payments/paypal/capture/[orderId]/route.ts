import { NextRequest, NextResponse } from 'next/server'

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

    // Extract useful payment data
    const captureUnit = capture.purchase_units?.[0]
    const captureDetail = captureUnit?.payments?.captures?.[0]

    const paymentResult = {
      orderId: capture.id,
      status: capture.status,
      payerEmail: capture.payer?.email_address,
      payerName: `${capture.payer?.name?.given_name ?? ''} ${capture.payer?.name?.surname ?? ''}`.trim(),
      captureId: captureDetail?.id,
      amount: captureDetail?.amount?.value,
      currency: captureDetail?.amount?.currency_code,
      capturedAt: captureDetail?.create_time,
    }

    // TODO: Here you'd persist to DB, send confirmation email, etc.
    // e.g.: await db.appointments.update({ orderId, status: 'paid', ...paymentResult })
    console.log('[PayPal] Payment captured successfully:', paymentResult)

    return NextResponse.json(paymentResult)
  } catch (err) {
    console.error('[PayPal] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}