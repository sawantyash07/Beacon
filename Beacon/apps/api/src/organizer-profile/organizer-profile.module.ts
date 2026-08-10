import { Module } from '@nestjs/common';
import { OrganizerProfileController } from './organizer-profile.controller';
import { OrganizerProfileService } from './organizer-profile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [PrismaModule, PaymentsModule],
  controllers: [OrganizerProfileController],
  providers: [OrganizerProfileService],
  exports: [OrganizerProfileService],
})
export class OrganizerProfileModule {}
