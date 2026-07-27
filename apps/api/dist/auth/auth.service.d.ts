import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@beacon/database';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(data: Prisma.UserCreateInput): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@beacon/database").$Enums.Role;
        };
    }>;
    validateUser(email: string, pass: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        role: import("@beacon/database").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
}
