import { Controller, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { AppointmentsService } from '../../appointments/appointments.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Controller('payments/paypal')
export class PaypalController {
  constructor(
    private paypalService: PaypalService,
    private appointmentsService: AppointmentsService,
    private notificationsService: NotificationsService,
  ) {}

  @Post('create-order')
  async createOrder(@Body() body: { amount: string, description: string, sessionType?: string }) {
    try {
      const order = await this.paypalService.createOrder(body);
      return { id: order.id, status: order.status };
    } catch (err: any) {
      console.error('[PaypalController] Error creating order:', err);
      throw new HttpException(
        err?.message || 'Internal server error',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('capture/:orderId')
  async capturePayment(@Param('orderId') orderId: string) {
    if (!orderId) {
      throw new HttpException('orderId is required', HttpStatus.BAD_REQUEST);
    }

    // 1. Verificar si ya fue pagado localmente para ahorrar llamadas a PayPal
    const existing = await this.appointmentsService.findByPaypalOrderId(orderId);
    if (existing?.status === 'paid' && existing.calendlyToken) {
      return {
        orderId,
        status: 'COMPLETED',
        calendlyToken: existing.calendlyToken,
        cached: true,
      };
    }

    try {
      // 2. Capturar el pago en PayPal
      const captureData = await this.paypalService.captureOrder(orderId);

      // 3. Marcar como pagado en la base de datos
      const appointment = await this.appointmentsService.markAsPaid(orderId, captureData);

      // 4. Enviar notificación por email si tenemos el email del pagador
      if (appointment.payerEmail) {
        await this.notificationsService.sendPaymentConfirmation(
          appointment.payerEmail,
          {
            orderId,
            amount: appointment.amount.toString(),
            payerName: appointment.payerName || 'Paciente',
          }
        );
      }

      return {
        orderId,
        status: captureData.status,
        calendlyToken: appointment.calendlyToken,
      };
    } catch (err: any) {
      console.error('[PaypalController] Error capturing payment:', err);
      throw new HttpException(
        err?.message || 'Internal server error',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    console.log(`[PaypalController] Recibiendo webhook de PayPal: ${body.event_type} (ID: ${body.id})`);
    
    try {
      const eventType = body.event_type;
      const resource = body.resource;

      if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
        console.log(`[PaypalController] Procesando pago completado para captura: ${resource.id}`);
        
        const orderDetails = await this.paypalService.getOrderDetailsByCapture(resource);
        const orderId = orderDetails.id;
        
        console.log(`[PaypalController] Orden vinculada: ${orderId}. Marcando como pagada en BD...`);
        
        // El servicio appointmentsService.markAsPaid es idempotente por el upsert
        const appointment = await this.appointmentsService.markAsPaid(orderId, orderDetails);
        
        console.log(`[PaypalController] Cita actualizada exitosamente. Token: ${appointment.calendlyToken}`);

        // Opcional: Notificar si no se notificó antes (markAsPaid ya envía notificaciones si hay email)
      } else {
        console.log(`[PaypalController] Ignorando evento de tipo: ${eventType}`);
      }

      return { status: 'ok' };
    } catch (err: any) {
      console.error('[PaypalController] Error procesando webhook:', err.message || err);
      return { status: 'error', message: err.message || 'Internal error' };
    }
  }
}
