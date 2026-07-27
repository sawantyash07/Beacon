import { PrismaService } from '../prisma/prisma.service';
export declare class WishlistService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId: string;
        packageId?: string;
    }): import("@prisma/client").Prisma.Prisma__WishlistClient<{
        id: string;
        createdAt: Date;
        userId: string;
        packageId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        userId: string;
        packageId: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__WishlistClient<{
        id: string;
        createdAt: Date;
        userId: string;
        packageId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__WishlistClient<{
        id: string;
        createdAt: Date;
        userId: string;
        packageId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__WishlistClient<{
        id: string;
        createdAt: Date;
        userId: string;
        packageId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
