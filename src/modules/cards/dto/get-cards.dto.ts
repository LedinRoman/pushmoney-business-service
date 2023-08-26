import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { IGetCardsRequest } from '../../../models/request/cards.requests';
import { transofrmNum } from '../../../shared/utils';

export class GetCardsDto implements IGetCardsRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(transofrmNum)
  public page!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(transofrmNum)
  public size!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsMongoId()
  public userId?: string;
}
