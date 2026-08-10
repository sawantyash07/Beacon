import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogDto: any) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: any) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
