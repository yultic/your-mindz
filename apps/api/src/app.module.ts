import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaypalModule } from './modules/payments/paypal/paypal.module';

@Module({
  imports: [
    DatabaseModule,
    AppointmentsModule,
    NotificationsModule,
    PaypalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
