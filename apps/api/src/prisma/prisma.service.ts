import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@beacon/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to MongoDB Database via Prisma Client');
    } catch (error) {
      this.logger.error(
        `Failed to connect to MongoDB Database. Please check your DATABASE_URL environment variable and MongoDB Atlas Network Access (0.0.0.0/0). Error: ${error.message}`,
      );
    }
  }
}
