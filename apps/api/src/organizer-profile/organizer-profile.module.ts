import { Module } from '@nestjs/common';
import { OrganizerProfileController } from './organizer-profile.controller';
import { OrganizerProfileService } from './organizer-profile.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizerProfileController],
  providers: [OrganizerProfileService],
  exports: [OrganizerProfileService],
})
export class OrganizerProfileModule {}
