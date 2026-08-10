import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  getStats(@Query('plannerId') plannerId?: string) {
    return this.statsService.getStats({ plannerId });
  }
}
