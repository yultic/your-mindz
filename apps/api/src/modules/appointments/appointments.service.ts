import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { createHash } from 'crypto';
import { Prisma } from '@jess-web/database';



@Injectable()
export class AppointmentsService {
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

    const paymentData = {
      captureId: captureDetail?.id ?? null,
      status: 'paid',
      paidAt: captureDetail?.create_time ? new Date(captureDetail.create_time) : new Date(),
      payerEmail: captureData.payer?.email_address ?? null,
      payerName: `${captureData.payer?.name?.given_name ?? ''} ${captureData.payer?.name?.surname ?? ''}`.trim() || null,
      amount: new Prisma.Decimal(captureDetail?.amount?.value ?? '0.00'),
      currency: captureDetail?.amount?.currency_code ?? 'USD',
      calendlyToken,
    };

    return this.prisma.client.appointment.upsert({
      where: { paypalOrderId: orderId },
      update: paymentData,
      create: {
        paypalOrderId: orderId,
        sessionType: purchaseUnit?.custom_id ?? 'therapy-session',
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
      select: { id: true, sessionType: true, payerName: true },
    });

    if (!appointment) {
      return null;
    }

    // Marcamos el token como usado
    await this.prisma.client.appointment.update({
      where: { id: appointment.id },
      data: { calendlyTokenUsedAt: new Date() },
    });

    return appointment;
  }
}
