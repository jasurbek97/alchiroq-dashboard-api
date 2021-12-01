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
    default: ['2021-11-30'],
    description: 'Date to cache charge information',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsDateArray()
  dates: string[];
}
