import { Controller, Delete, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';

@ApiTags('ACTIVITY')
@Controller('activity')
export class ActivityController {
  @Inject() private readonly activityService: ActivityService;

  @ApiOperation({ summary: 'Get all activity 🟢' })
  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @ApiOperation({ summary: 'Cache all activity 🟢' })
  @Get('cache')
  async cache() {
    return await this.activityService.cache();
  }

  @ApiOperation({ summary: 'Delete all activity 🟢' })
  @Delete()
  delete() {
    return this.activityService.delete();
  }
}
