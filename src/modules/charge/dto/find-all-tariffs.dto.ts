import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class FindAllTariffsRequest {
  @ApiProperty({
    default: '2021-12-01',
    description: 'Date from',
  })
  @IsDefined()
  @IsString()
  from: string;

  @ApiProperty({
    default: '2021-12-02',
    description: 'Date to',
  })
  @IsDefined()
  @IsString()
  to: string;
}
