import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DatabaseModule } from '../database/database.module';
import { CalendlyService } from './calendly.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, CalendlyService],
  exports: [AppointmentsService, CalendlyService],
})
export class AppointmentsModule {}
