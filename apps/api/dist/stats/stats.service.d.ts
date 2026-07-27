import { PrismaService } from '../prisma/prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        users: number;
        packages: number;
        bookings: number;
        destinations: number;
    }>;
}
