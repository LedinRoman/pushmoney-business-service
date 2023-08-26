import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaName } from '../../models/schemas/schemas.models';
import { TransactionSchema } from '../../schemas/transactions.schema';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    MongooseModule.forFeature([
      { schema: TransactionSchema, name: SchemaName.transactions },
    ]),
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
