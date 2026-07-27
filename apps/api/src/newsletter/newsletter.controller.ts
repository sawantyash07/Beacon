import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  create(@Body() createNewsletterDto: any) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsletterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsletterDto: any) {
    return this.newsletterService.update(id, updateNewsletterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsletterService.remove(id);
  }
}
