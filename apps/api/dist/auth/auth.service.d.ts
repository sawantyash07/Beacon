import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@beacon/database';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(data: Prisma.UserCreateInput): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            mobileNumber: string | null;
            age: number | null;
            gender: string | null;
            role: import("@beacon/database").$Enums.Role;
        };
    }>;
    validateUser(identifier: string, pass: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        mobileNumber: string | null;
        age: number | null;
        gender: string | null;
        role: import("@beacon/database").$Enums.Role;
        partnerType: import("@beacon/database").$Enums.PartnerType;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            mobileNumber: any;
            role: any;
        };
    }>;
}
