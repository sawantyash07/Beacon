import { NewsletterService } from './newsletter.service';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    create(createNewsletterDto: any): import("@prisma/client").Prisma.Prisma__NewsletterClient<{
        id: string;
        email: string;
        isActive: boolean;
        subscribedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        isActive: boolean;
        subscribedAt: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__NewsletterClient<{
        id: string;
        email: string;
        isActive: boolean;
        subscribedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateNewsletterDto: any): import("@prisma/client").Prisma.Prisma__NewsletterClient<{
        id: string;
        email: string;
        isActive: boolean;
        subscribedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__NewsletterClient<{
        id: string;
        email: string;
        isActive: boolean;
        subscribedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
