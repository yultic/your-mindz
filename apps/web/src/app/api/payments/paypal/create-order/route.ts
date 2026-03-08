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

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.statusText}`)
  }

  const data = await res.json()
  return data.access_token
}

export interface CreateOrderBody {
  amount: string          // e.g. "75.00"
  currency?: string       // default "USD"
  description: string     // e.g. "Sesión de psicoterapia - 60 min"
  sessionType?: string    // e.g. "individual" | "couples" | "initial"
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderBody = await req.json()

    if (!body.amount || !body.description) {
      return NextResponse.json(
        { error: 'amount and description are required' },
        { status: 400 }
      )
    }

    // Validate amount is a positive number
    const parsedAmount = parseFloat(body.amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const token = await getAccessToken()

    const idempotencyKey = `therapy-order-${Date.now()}-${Math.random().toString(36).slice(2)}`

    const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': idempotencyKey,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: body.currency ?? 'USD',
              value: parsedAmount.toFixed(2),
            },
            description: body.description,
            // Custom field to link with internal records
            custom_id: body.sessionType ?? 'therapy-session',
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              landing_page: 'LOGIN',
              user_action: 'PAY_NOW',
              return_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success`,
              cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancelled`,
            },
          },
        },
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error('[PayPal] Create order failed:', errorData)
      return NextResponse.json(
        { error: 'Failed to create PayPal order', details: errorData },
        { status: res.status }
      )
    }

    const order = await res.json()

    // Return only what the frontend needs
    return NextResponse.json({
      id: order.id,
      status: order.status,
    })
  } catch (err) {
    console.error('[PayPal] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}