import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './packages/packages.module';
import { BookingsModule } from './bookings/bookings.module';
import { DestinationsModule } from './destinations/destinations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { BlogsModule } from './blogs/blogs.module';
import { MessagesModule } from './messages/messages.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, PackagesModule, BookingsModule, DestinationsModule, ReviewsModule, WishlistModule, BlogsModule, MessagesModule, NewsletterModule, StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
