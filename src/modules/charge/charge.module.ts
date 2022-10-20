import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';
import { ChargeEntity } from './entities/charge.entity';
import { Charge, ChargeSchema } from './schemas/charge.schema';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChargeEntity]),
    MongooseModule.forFeature([{ name: Charge.name, schema: ChargeSchema }]),
  ],
  controllers: [ChargeController],
  providers: [ChargeService, TasksService],
  exports: [ChargeService],
})
export class ChargeModule {}
