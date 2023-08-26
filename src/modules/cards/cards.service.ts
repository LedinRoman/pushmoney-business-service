import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IGetCardsRequest } from '../../models/request/cards.requests';
import { IGetResponse } from '../../models/responses/shared.responses';
import { ICard, ICardDocument } from '../../models/schemas/card.models';
import { SchemaName } from '../../models/schemas/schemas.models';

@Injectable()
export class CardsService {

  private readonly cardModel: Model<ICardDocument<Types.ObjectId>>;

  constructor(
  @InjectModel(SchemaName.cards)
    cardModel: Model<ICardDocument<Types.ObjectId>>,
  ) {
    this.cardModel = cardModel;
  }

  public async getCards(query: IGetCardsRequest, bank: string): Promise<IGetResponse<ICard>> {
    const { page, size, user_id } = query;
    const filter: Partial<ICard> = { bank };
    if (user_id) {
      filter.user_id = user_id;
    }

    const data = await this.cardModel.find(filter).limit(size).skip(page * size).lean();
    const count = await this.cardModel.count({ bank }).lean();
    return { data, count };
  }

  // TODO: approve/block cards

}
