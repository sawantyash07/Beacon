import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizerProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyProfile(userId: string) {
    let profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        verificationDocuments: true,
      },
    });

    if (!profile) {
      profile = await this.prisma.profile.create({
        data: {
          userId,
          displayName: 'New Organizer',
          partnerType: 'COMPANY',
        },
        include: {
          verificationDocuments: true,
        },
      });
    }

    const completionPercentage = this.calculateCompletion(profile);
    return {
      profile,
      completionPercentage,
    };
  }

  async updateSection(userId: string, sectionKey: string, data: Record<string, any>) {
    const existing = await this.prisma.profile.findUnique({ where: { userId } });
    if (!existing) {
      throw new NotFoundException('Organizer Profile not found');
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { userId },
      data: {
        ...data,
      },
      include: {
        verificationDocuments: true,
      },
    });

    const completionPercentage = this.calculateCompletion(updatedProfile);
    return {
      message: `Section ${sectionKey} updated successfully`,
      profile: updatedProfile,
      completionPercentage,
    };
  }

  async uploadVerificationDocument(userId: string, docData: { title: string; documentType: string; fileName: string; fileUrl?: string }) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Organizer Profile not found');
    }

    const doc = await this.prisma.verificationDocument.create({
      data: {
        profileId: profile.id,
        documentName: docData.title,
        documentType: docData.documentType,
        fileUrl: docData.fileUrl || '#',
        status: 'UNDER_REVIEW',
      },
    });

    await this.prisma.profile.update({
      where: { id: profile.id },
      data: {
        verificationProgress: 'UNDER_REVIEW',
      },
    });

    return {
      message: 'Verification document uploaded securely',
      document: doc,
    };
  }

  async getPublicProfile(id: string) {
    const profile = await this.prisma.profile.findFirst({
      where: { OR: [{ id }, { userId: id }] },
    });

    if (!profile) {
      throw new NotFoundException('Public organizer profile not found');
    }

    // Exclude private verification documents and financial banking details from public API
    const {
      bankAccountName,
      bankAccountNumber,
      bankName,
      ifscOrSwiftCode,
      upiOrPaypalId,
      ...publicData
    } = profile;

    return publicData;
  }

  private calculateCompletion(profile: any): number {
    let score = 0;
    if (profile.displayName && profile.bio && profile.phone) score += 10;
    if (profile.specializations && profile.specializations.length > 0) score += 10;
    if (profile.countriesServed && profile.countriesServed.length > 0) score += 10;
    if (profile.companyName || profile.occupation) score += 10;
    if (profile.serviceFlights || profile.serviceHotels) score += 10;
    if (profile.workingDays && profile.workingDays.length > 0) score += 10;
    if (profile.bankAccountNumber || profile.upiOrPaypalId) score += 10;
    if (profile.socialWebsite || profile.socialInstagram) score += 10;
    if (profile.autoResponderMessage) score += 10;
    if (profile.verificationDocuments && profile.verificationDocuments.length >= 3) score += 10;
    return score;
  }
}
