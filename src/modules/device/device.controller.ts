import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';

@ApiTags('DEVICE')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiOperation({ summary: 'Get all devices 📱' })
  @Get()
  async findAll() {
    return await this.deviceService.findAll();
  }
}
