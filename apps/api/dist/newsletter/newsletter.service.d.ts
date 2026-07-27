import { PrismaService } from '../prisma/prisma.service';
export declare class NewsletterService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__NewsletterClient<{
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
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__NewsletterClient<{
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
