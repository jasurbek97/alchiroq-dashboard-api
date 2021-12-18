import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChargeService } from './charge.service';
import { ChargeCacheRequest } from './dto/charge.cache';
import { FindAllTariffsRequest } from './dto/find-all-tariffs.dto';
import { TariffEnum } from './enums/tariff.enum';

@ApiTags('CHARGE')
@Controller('charges')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @ApiOperation({ summary: 'Get all charges 🟢' })
  @Get('/')
  findAll() {
    return this.chargeService.findAll();
  }

  @ApiOperation({ summary: 'Calculate revenue 🧮' })
  @Get('/revenue')
  revenue(): Promise<any> {
    return this.chargeService.revenue();
  }

  @ApiOperation({ summary: 'Cache charges 🟢' })
  @ApiBody({ type: ChargeCacheRequest })
  @Post('/cache')
  cache(@Body() request: ChargeCacheRequest) {
    const { dates, sign } = request;
    return this.chargeService.cache(dates, sign);
  }

  @ApiOperation({ summary: 'Get all charges 🟢' })
  @ApiParam({
    name: 'tariff',
    type: 'string',
    enum: TariffEnum,
  })
  @Get('/today/:tariff')
  findByTariffToday(@Param('tariff') tariff: string) {
    return this.chargeService.findByTariffToday(tariff);
  }

  @ApiOperation({ summary: 'Get all charges by tariffs 🟢' })
  @ApiBody({ type: FindAllTariffsRequest })
  @Post('/filter')
  @HttpCode(200)
  findByAllTariffs(@Body() request: FindAllTariffsRequest) {
    return this.chargeService.findByAllTariffs(request);
  }

  @ApiOperation({ summary: 'Get all charges 🟢' })
  @ApiParam({
    name: 'tariff',
    type: 'string',
    enum: TariffEnum,
  })
  @Get('/:tariff')
  findByTariff(@Param('tariff') tariff: string) {
    return this.chargeService.findByTariff(tariff);
  }

  @ApiOperation({ summary: 'Delete all charges 🔴' })
  @Delete()
  delete() {
    return this.chargeService.delete();
  }
}
