import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaName } from '../../models/schemas/schemas.models';
import { CardSchema } from '../../schemas/card.schema';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    MongooseModule.forFeature([
      { schema: CardSchema, name: SchemaName.cards },
    ]),
  ],
})
export class CardModule {}
