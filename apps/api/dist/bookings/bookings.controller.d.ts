import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: any): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateBookingDto: any): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        packageId: string;
        travelerId: string;
        travelDate: Date;
        passengerCount: number;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
