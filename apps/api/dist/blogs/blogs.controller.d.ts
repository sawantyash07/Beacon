import { BlogsService } from './blogs.service';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: any): import("@prisma/client").Prisma.Prisma__BlogClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        coverImage: string | null;
        categories: string[];
        tags: string[];
        likes: number;
        authorId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        coverImage: string | null;
        categories: string[];
        tags: string[];
        likes: number;
        authorId: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__BlogClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        coverImage: string | null;
        categories: string[];
        tags: string[];
        likes: number;
        authorId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateBlogDto: any): import("@prisma/client").Prisma.Prisma__BlogClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        coverImage: string | null;
        categories: string[];
        tags: string[];
        likes: number;
        authorId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__BlogClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        coverImage: string | null;
        categories: string[];
        tags: string[];
        likes: number;
        authorId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
