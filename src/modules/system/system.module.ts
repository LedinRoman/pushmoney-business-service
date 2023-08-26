import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaName } from '../../models/schemas/schemas.models';
import { CardSchema } from '../../schemas/card.schema';
import { TransactionSchema } from '../../schemas/transactions.schema';
import { SystemService } from './system.service';

@Module({
  providers: [SystemService],
  imports: [
    MongooseModule.forFeature([
      { schema: TransactionSchema, name: SchemaName.transactions },
      { schema: CardSchema, name: SchemaName.cards },
    ]),
  ],
})
export class SystemModule {}
