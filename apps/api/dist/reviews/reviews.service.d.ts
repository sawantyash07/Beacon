import { PrismaService } from '../prisma/prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        destinationId: string | null;
        rating: number;
        comment: string;
        packageId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        destinationId: string | null;
        rating: number;
        comment: string;
        packageId: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        destinationId: string | null;
        rating: number;
        comment: string;
        packageId: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        destinationId: string | null;
        rating: number;
        comment: string;
        packageId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        destinationId: string | null;
        rating: number;
        comment: string;
        packageId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
