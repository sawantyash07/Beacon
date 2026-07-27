import { DestinationsService } from './destinations.service';
export declare class DestinationsController {
    private readonly destinationsService;
    constructor(destinationsService: DestinationsService);
    findAll(search?: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        location: string;
        bestSeason: string;
        weather: string;
        gallery: string[];
    }[]>;
    findOne(id: string): Promise<{
        packages: ({
            images: {
                id: string;
                packageId: string;
                url: string;
                isCover: boolean;
            }[];
        } & {
            destination: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            duration: number;
            basePrice: number;
            discountedPrice: number | null;
            category: string;
            difficulty: import("@prisma/client").$Enums.DifficultyLevel;
            groupSize: number | null;
            status: import("@prisma/client").$Enums.PackageStatus;
            inclusions: string[];
            exclusions: string[];
            destinationId: string | null;
            plannerId: string;
        })[];
        reviews: ({
            user: {
                profile: {
                    id: string;
                    bio: string | null;
                    avatarUrl: string | null;
                    phone: string | null;
                    companyName: string | null;
                    gstNumber: string | null;
                    panNumber: string | null;
                    isVerified: boolean;
                    userId: string;
                } | null;
                name: string | null;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            destinationId: string | null;
            rating: number;
            comment: string;
            packageId: string | null;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        location: string;
        bestSeason: string;
        weather: string;
        gallery: string[];
    }>;
}
