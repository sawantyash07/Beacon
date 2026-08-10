import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  create(@Body() createInquiryDto: any) {
    return this.inquiriesService.create(createInquiryDto);
  }

  @Get()
  findAll(@Query('plannerId') plannerId?: string) {
    return this.inquiriesService.findAll({ plannerId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inquiriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInquiryDto: any) {
    return this.inquiriesService.update(id, updateInquiryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inquiriesService.remove(id);
  }
}
