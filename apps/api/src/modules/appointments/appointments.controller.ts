import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('validate-token')
  async validateToken(@Query('token') token: string) {
    if (!token) {
      throw new HttpException({ valid: false }, HttpStatus.BAD_REQUEST);
    }

    const appointment = await this.appointmentsService.validateToken(token);

    if (!appointment) {
      throw new HttpException({ valid: false }, HttpStatus.FORBIDDEN);
    }

    return {
      valid: true,
      sessionType: appointment.sessionType,
      payerName: appointment.payerName,
    };
  }
}
