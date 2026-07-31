import { Controller, Get, Patch, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrganizerProfileService } from './organizer-profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('organizer-profile')
export class OrganizerProfileController {
  constructor(private readonly organizerProfileService: OrganizerProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Request() req: any) {
    return this.organizerProfileService.getMyProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/section/:sectionKey')
  async updateSection(
    @Request() req: any,
    @Param('sectionKey') sectionKey: string,
    @Body() body: Record<string, any>,
  ) {
    return this.organizerProfileService.updateSection(req.user.id, sectionKey, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/verification/upload')
  async uploadVerificationDoc(
    @Request() req: any,
    @Body() body: { title: string; documentType: string; fileName: string; fileUrl?: string },
  ) {
    return this.organizerProfileService.uploadVerificationDocument(req.user.id, body);
  }

  @Get('public/:id')
  async getPublicProfile(@Param('id') id: string) {
    return this.organizerProfileService.getPublicProfile(id);
  }
}
