import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { createHash } from 'crypto';
import { Prisma } from '@jess-web/database';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(private prisma: PrismaService) {}

  generateCalendlyToken(orderId: string): string {
    const secret = process.env.CALENDLY_TOKEN_SECRET ?? 'default-secret';
    return createHash('sha256')
      .update(`${orderId}:${secret}`)
      .digest('hex')
      .slice(0, 32);
  }

  async findByPaypalOrderId(orderId: string) {
    return this.prisma.appointment.findUnique({
      where: { paypalOrderId: orderId },
    });
  }

  async markAsPaid(orderId: string, captureData: any) {
    const purchaseUnit = captureData.purchase_units?.[0];
    const captureDetail = purchaseUnit?.payments?.captures?.[0];
    const calendlyToken = this.generateCalendlyToken(orderId);
    const sessionType = purchaseUnit?.custom_id ?? 'therapy-session';
    const payerEmail = captureData.payer?.email_address ?? null;
    const payerName = `${captureData.payer?.name?.given_name ?? ''} ${captureData.payer?.name?.surname ?? ''}`.trim() || null;

    // single use link
    let calendlyBookingUrl: string | null = null;
    try {
      calendlyBookingUrl = await this.createSingleUseLink(payerName, payerEmail);
    } catch (err) {
      // No bloqueamos el pago si Calendly falla — se reintenta en validateToken
      this.logger.error('Could not create Calendly link during payment:', err);
    }

    const paymentData = {
      captureId: captureDetail?.id ?? null,
      status: 'paid',
      paidAt: captureDetail?.create_time ? new Date(captureDetail.create_time) : new Date(),
      payerEmail,
      payerName,
      amount: new Prisma.Decimal(captureDetail?.amount?.value ?? '0.00'),
      currency: captureDetail?.amount?.currency_code ?? 'USD',
      calendlyToken,
      calendlyBookingUrl,
    };

    return this.prisma.client.appointment.upsert({
      where: { paypalOrderId: orderId },
      update: paymentData,
      create: {
        paypalOrderId: orderId,
        sessionType,
        ...paymentData,
      },
    });
  }

  async validateToken(token: string) {
    const appointment = await this.prisma.client.appointment.findFirst({
      where: {
        calendlyToken: token,
        status: 'paid',
        calendlyTokenUsedAt: null,
      },
      select: { id: true, sessionType: true, payerName: true, payerEmail: true, calendlyBookingUrl: true },
    });

    if (!appointment) {
      return null;
    }

    // Si por alguna razón no se generó el link durante el pago, lo creamos ahora
    let bookingUrl: string | null = appointment.calendlyBookingUrl;
    if (!bookingUrl) {
      try {
        bookingUrl = await this.createSingleUseLink(
          appointment.payerName || '',
          appointment.payerEmail || ''
        );
        if (bookingUrl) {
          await this.prisma.client.appointment.update({
            where: { id: appointment.id },
            data: { calendlyBookingUrl: bookingUrl },
          });
        }
      } catch (err) {
        this.logger.error('Could not create Calendly link during token validation:', err);
      }
    }

    // Marcamos el token como usado
    await this.prisma.client.appointment.update({
      where: { id: appointment.id },
      data: { calendlyTokenUsedAt: new Date() },
    });

    return {
      sessionType: appointment.sessionType,
      payerName: appointment.payerName,
      bookingUrl,
    };
  }

  private async createSingleUseLink(payerName: string, payerEmail: string): Promise<string | null> {
    const apiToken = process.env.CALENDLY_TOKEN_SECRET;
    const eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

    if (!apiToken || !eventTypeUri) {
      this.logger.error('Calendly credentials or event type URI not configured');
      return null;
    }

    try {
      const response = await fetch('https://api.calendly.com/scheduling_links', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          max_event_count: 1,
          owner: eventTypeUri,
          owner_type: 'EventType',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        this.logger.error('Calendly API Error:', JSON.stringify(error));
        return null;
      }

      const data = await response.json();
      let bookingUrl = data.resource.booking_url;

      // Prefill name and email if available
      if (payerName || payerEmail) {
        const url = new URL(bookingUrl);
        if (payerName) url.searchParams.set('name', payerName);
        if (payerEmail) url.searchParams.set('email', payerEmail);
        bookingUrl = url.toString();
      }

      return bookingUrl;
    } catch (err) {
      this.logger.error('Error creating Calendly scheduling link:', err);
      return null;
    }
  }
}
