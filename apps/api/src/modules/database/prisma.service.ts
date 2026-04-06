import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@jess-web/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  get client(): PrismaClient {
    return prisma;
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
