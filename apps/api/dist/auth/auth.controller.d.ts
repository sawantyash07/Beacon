import { AuthService } from './auth.service';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, res: Response): Promise<{
        message: string;
        user: {
            id: any;
            email: any;
            name: any;
            mobileNumber: any;
            role: any;
        };
    }>;
    register(registerDto: Record<string, any>): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            mobileNumber: string | null;
            age: number | null;
            gender: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    logout(res: Response): {
        message: string;
    };
    getProfile(req: any): {
        user: any;
    };
}
