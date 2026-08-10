import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SecurityService } from './services/security.service';
import { FraudService } from './services/fraud.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, SecurityService, FraudService],
  exports: [PaymentsService, SecurityService],
})
export class PaymentsModule {}
