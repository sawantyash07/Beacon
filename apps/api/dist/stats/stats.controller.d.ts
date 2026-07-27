import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getStats(): Promise<{
        users: number;
        packages: number;
        bookings: number;
        destinations: number;
    }>;
}
