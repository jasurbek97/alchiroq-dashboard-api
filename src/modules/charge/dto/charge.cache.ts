import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsDateArray } from '../../../common/is.date.array';

export class ChargeCacheRequest {
  @ApiProperty({
    default: '!=',
    description: 'Date to cache charge information',
  })
  @IsDefined()
  @IsString()
  sign: string | '!=';

  @ApiProperty({
    default: [
      '2021-11-10',
      '2021-11-11',
      '2021-11-12',
      '2021-11-13',
      '2021-11-14',
      '2021-11-15',
      '2021-11-16',
      '2021-11-17',
      '2021-11-18',
      '2021-11-19',
      '2021-11-20',
      '2021-11-21',
      '2021-11-22',
      '2021-11-23',
      '2021-11-24',
      '2021-11-25',
      '2021-11-26',
      '2021-11-27',
      '2021-11-28',
      '2021-11-29',
      '2021-11-30',
      '2021-12-01',
    ],
    description: 'Date to cache charge information',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsDateArray()
  dates: string[];
}
