import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PaypalService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.PAYPAL_ENV === 'production'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';
  }

  async getAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Paypal credentials are not configured');
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const res = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!res.ok) {
      throw new HttpException('Paypal authentication failed', HttpStatus.UNAUTHORIZED);
    }

    const data = await res.json();
    return data.access_token;
  }

  async createOrder(body: { amount: string, description: string, sessionType?: string, currency?: string }) {
    const token = await this.getAccessToken();
    const currency = body.currency ?? 'USD';
    const amount = parseFloat(body.amount).toFixed(2);
    const idempotencyKey = `therapy-order-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const res = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
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
            custom_id: body.sessionType ?? 'therapy-session',
            description: body.description,
            amount: {
              currency_code: currency,
              value: amount,
            },
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new HttpException(data, res.status);
    }

    return data;
  }

  async captureOrder(orderId: string) {
    const token = await this.getAccessToken();

    const res = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      // Si la orden ya fue capturada, devolvemos los detalles actuales
      if (data.name === 'ORDER_ALREADY_CAPTURED' || res.status === 422) {
        return this.getOrderDetails(orderId, token);
      }
      throw new HttpException(data, res.status);
    }

    return data;
  }

  async getOrderDetails(orderId: string, token?: string) {
    const accessToken = token ?? (await this.getAccessToken());
    const res = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      throw new HttpException('Could not fetch PayPal order details', res.status);
    }

    return await res.json();
  }

  /**
   * Helper para webhooks: obtiene los detalles de la orden a partir de un recurso de captura
   */
  async getOrderDetailsByCapture(captureResource: any) {
    // Intentar encontrar el order_id en diferentes campos del recurso de captura de PayPal
    let orderId = captureResource.supplementary_data?.related_ids?.order_id;
    
    // Si no está ahí, buscar en los links
    if (!orderId && Array.isArray(captureResource.links)) {
      const upLink = captureResource.links.find((l: any) => l.rel === 'up');
      if (upLink) {
        // El link 'up' suele ser a la orden: /v2/checkout/orders/{order_id}
        const parts = upLink.href.split('/');
        orderId = parts[parts.length - 1];
      }
    }

    if (!orderId) {
      throw new Error('Could not determine orderId from capture resource');
    }

    return this.getOrderDetails(orderId);
  }
}
