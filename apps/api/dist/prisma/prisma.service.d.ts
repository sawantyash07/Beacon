import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@beacon/database';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): Promise<void>;
}
