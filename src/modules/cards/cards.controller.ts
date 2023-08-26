import { Controller, UseFilters, UseGuards, Get, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IGetResponse } from '../../models/responses/shared.responses';
import { ICard } from '../../models/schemas/card.models';
import { GetBankName } from '../../shared/decorators/extract-user-id.decorator';
import { CustomHttpExceptionFilter } from '../../shared/filters/exception-filter';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { CardsService } from './cards.service';
import { GetCardsDto } from './dto/get-cards.dto';

@ApiTags('Cards')
@ApiSecurity('apiKey')
@UseFilters(CustomHttpExceptionFilter)
@UseGuards(AuthorizationGuard)
@Controller('cards')
export class CardsController {

  private readonly cardsService: CardsService;

  constructor(cardsService: CardsService) {
    this.cardsService = cardsService;
  }

  @Get('/get-client-cards')
  async getCards(@Query() query: GetCardsDto, @GetBankName() bank: string): Promise<IGetResponse<ICard>> {
    const cards = await this.cardsService.getCards(query, bank);
    return cards;
  }

}
