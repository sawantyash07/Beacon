import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto: { userId: string, packageId?: string }) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: any) {
    return this.wishlistService.update(id, updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }
}
