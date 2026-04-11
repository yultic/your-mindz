import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { createHash } from 'crypto';
import { Prisma } from '@jess-web/database';
import { CalendlyService } from './calendly.service';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    private prisma: PrismaService,
    private calendly: CalendlyService,
  ) {}

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
      calendlyBookingUrl = await this.calendly.createSingleUseLink(payerName, payerEmail);
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
        bookingUrl = await this.calendly.createSingleUseLink(
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

    if (!bookingUrl) {
      this.logger.warn(`No se pudo obtener bookingUrl para el token ${token}`);
      return {
        sessionType: appointment.sessionType,
        payerName: appointment.payerName,
        bookingUrl: null,
      };
    }

    // Marcamos el token como usado SOLAMENTE si tenemos una URL de reserva
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
}
