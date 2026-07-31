"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() },
        });
    }
    async findByIdentifier(identifier) {
        if (!identifier)
            return null;
        const trimmed = identifier.trim();
        const lowercased = trimmed.toLowerCase();
        if (trimmed.includes('@')) {
            return this.prisma.user.findUnique({
                where: { email: lowercased },
            });
        }
        const cleanPhone = trimmed.replace(/[^0-9+]/g, '');
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: lowercased },
                    { mobileNumber: trimmed },
                    { mobileNumber: cleanPhone },
                ],
            },
        });
    }
    async findByEmailOrMobile(email, mobileNumber) {
        const emailLower = email ? email.trim().toLowerCase() : '';
        const mobileTrimmed = mobileNumber ? mobileNumber.trim() : '';
        const cleanPhone = mobileTrimmed.replace(/[^0-9+]/g, '');
        const conditions = [];
        if (emailLower) {
            conditions.push({ email: emailLower });
        }
        if (mobileTrimmed) {
            conditions.push({ mobileNumber: mobileTrimmed });
            if (cleanPhone && cleanPhone !== mobileTrimmed) {
                conditions.push({ mobileNumber: cleanPhone });
            }
        }
        if (conditions.length === 0)
            return null;
        return this.prisma.user.findFirst({
            where: { OR: conditions },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async createUser(data) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
        return this.prisma.user.create({
            data: {
                ...data,
                email: data.email.trim().toLowerCase(),
                mobileNumber: data.mobileNumber ? data.mobileNumber.trim() : null,
                password: hashedPassword,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map