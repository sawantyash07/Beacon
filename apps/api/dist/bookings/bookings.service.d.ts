import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    }[]>;
    findOne(id: string): Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: any): Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
