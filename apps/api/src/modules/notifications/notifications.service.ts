import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class NotificationsService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendPaymentConfirmation(to: string, data: { orderId: string, amount: string, payerName: string }) {
    try {
      await this.resend.emails.send({
        from: `Jess <${process.env.RESEND_FROM_EMAIL ?? 'confirmaciones@jess-web.com'}>`,
        to,
        subject: '¡Pago Confirmado! - Tu Sesión con Jess',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>¡Hola ${data.payerName}!</h1>
            <p>Hemos recibido correctamente tu pago de <strong>${data.amount} USD</strong>.</p>
            <p>Tu número de orden de PayPal es: <code>${data.orderId}</code></p>
            <p><strong>Siguiente paso:</strong> Pronto recibirás un enlace de Calendly para agendar tu sesión si aún no lo has hecho.</p>
            <hr />
            <p style="font-size: 12px; color: #666;">Este es un correo automático, por favor no respondas directamente.</p>
          </div>
        `,
      });
    } catch (err) {
      console.error('[Notifications] Failed to send email:', err);
    }
  }
}
