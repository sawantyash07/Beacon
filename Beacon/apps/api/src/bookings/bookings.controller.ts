import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: any) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll(
    @Query('plannerId') plannerId?: string,
    @Query('travelerId') travelerId?: string
  ) {
    return this.bookingsService.findAll({ plannerId, travelerId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: any) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
