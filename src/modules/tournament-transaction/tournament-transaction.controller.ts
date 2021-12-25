import { Controller, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TournamentTransactionService } from './tournament-transaction.service';

@ApiTags('TOURNAMENT')
@Controller('tournament-transaction')
export class TournamentTransactionController {
  constructor(
    private readonly tournamentTransactionService: TournamentTransactionService,
  ) {}

  @ApiOperation({ summary: 'Get all tournament 🟢' })
  @Get()
  findAll() {
    return this.tournamentTransactionService.findAll();
  }

  @ApiOperation({ summary: 'Get all tournament by tariff 🟢' })
  @Get('paket')
  transactionByTariff() {
    return this.tournamentTransactionService.transactionByTariff();
  }

  @ApiOperation({ summary: 'Cache all tournament 🟢' })
  @Get('/cache')
  cache() {
    return this.tournamentTransactionService.cacheMonth();
  }

  @ApiOperation({ summary: 'Get all tournament 🟢' })
  @Delete()
  delete() {
    return this.tournamentTransactionService.delete();
  }
}
