import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() createPackageDto: any) {
    return this.packagesService.create(createPackageDto);
  }

  @Get()
  findAll(
    @Query('plannerId') plannerId?: string,
    @Query('status') status?: string
  ) {
    return this.packagesService.findAll({ plannerId, status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: any) {
    return this.packagesService.update(id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(id);
  }
}
