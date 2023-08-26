/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IGetTransactionsRequest } from '../../models/request/transactions.requests';
import { IGetResponse } from '../../models/responses/shared.responses';
import { SchemaName } from '../../models/schemas/schemas.models';
import { ITransaction, ITransactionDocument } from '../../models/schemas/transaction.models';


@Injectable()
export class TransactionsService {

  private readonly transactionModel: Model<
  ITransactionDocument<Types.ObjectId>
  >;
  constructor(
  @InjectModel(SchemaName.transactions)
    transactionModel: Model<ITransactionDocument<Types.ObjectId>>,
  ) {
    this.transactionModel = transactionModel;
  }

  public async getTransactions(query: IGetTransactionsRequest, bank: string): Promise<IGetResponse<ITransaction>> {
    const { page, size, userId } = query;

    // Хочется простого человеческого поспать 😢
    let filter: any = {
      $or: [{ sender_bank: bank }, { receiver_bank: bank }],
    };
    if (userId) {
      filter = {
        $and: [
          { $or: [{ sender_user_id: userId }, { receiver_bank: userId }] },
          { $or: [{ sender_bank: bank }, { receiver_bank: bank }] },
        ],
      };
    }

    const data = await this.transactionModel.find(filter).limit(size).skip(page * size);
    const count = await this.transactionModel.count({});

    return { data, count };
  }

}
