import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { AppointmentsModule } from '../../appointments/appointments.module';
import { NotificationsModule } from '../../notifications/notifications.module';

@Module({
  imports: [AppointmentsModule, NotificationsModule],
  controllers: [PaypalController],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaypalModule {}
