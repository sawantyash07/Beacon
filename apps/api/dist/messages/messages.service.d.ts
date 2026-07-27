import { PrismaService } from '../prisma/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__MessageClient<{
        id: string;
        createdAt: Date;
        content: string;
        isRead: boolean;
        receiverId: string;
        senderId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        content: string;
        isRead: boolean;
        receiverId: string;
        senderId: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__MessageClient<{
        id: string;
        createdAt: Date;
        content: string;
        isRead: boolean;
        receiverId: string;
        senderId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__MessageClient<{
        id: string;
        createdAt: Date;
        content: string;
        isRead: boolean;
        receiverId: string;
        senderId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__MessageClient<{
        id: string;
        createdAt: Date;
        content: string;
        isRead: boolean;
        receiverId: string;
        senderId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
