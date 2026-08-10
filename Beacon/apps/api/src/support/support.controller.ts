import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  create(@Body() createTicketDto: any) {
    return this.supportService.create(createTicketDto);
  }

  @Get()
  findAll(
    @Query('plannerId') plannerId?: string,
    @Query('customerId') customerId?: string
  ) {
    return this.supportService.findAll({ plannerId, customerId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: any) {
    return this.supportService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportService.remove(id);
  }
}
