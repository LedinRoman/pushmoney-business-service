import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConsumeMessage, Channel } from 'amqplib';
import { Model, Types } from 'mongoose';
import { ICardDocument } from '../../models/schemas/card.models';
import { SchemaName } from '../../models/schemas/schemas.models';
import { ITransactionDocument } from '../../models/schemas/transaction.models';
import { RabbitClient } from '../../shared/rabbit/client/rabbit.client';
import { InjectRabbit } from '../../shared/rabbit/module/rabbit.decorators';
// TODO : send alerts to TELEGRAMM
@Injectable()
export class SystemService {

  private cardModel: Model<ICardDocument<Types.ObjectId>>;
  private transactionModel: Model<
  ITransactionDocument<Types.ObjectId>
  >;
  private readonly rabbitClient: RabbitClient;
  private channelNewCards: Channel | null = null;
  private channelUpdateCards: Channel | null = null;
  private channelTransactions: Channel | null = null;

  private readonly logger = new Logger(SystemService.name);

  constructor(
  @InjectModel(SchemaName.cards)
    cardModel: Model<ICardDocument<Types.ObjectId>>,
    @InjectModel(SchemaName.transactions)
    transactionModel: Model<ITransactionDocument<Types.ObjectId>>,
    @InjectRabbit() rabbitClient: RabbitClient,
  ) {
    this.cardModel = cardModel;
    console.log(this.cardModel);
    this.transactionModel = transactionModel;
    this.rabbitClient = rabbitClient;
    this.init();
  }

  async init(): Promise<void> {
    this.channelNewCards = await this.rabbitClient.createChannel();
    this.channelUpdateCards = await this.rabbitClient.createChannel();
    this.channelTransactions = await this.rabbitClient.createChannel();
    // TODO: move queries to enum ?

    this.channelNewCards.consume('requestCards', async(msg: ConsumeMessage | null) => {
      if (!msg) {
        this.logger.warn('Handled null msg');
        return;
      }
      const stringMessage = msg.content.toString();
      const data = JSON.parse(stringMessage);
      await this.cardModel.create(data);
      this.channelNewCards?.ack(msg);
    });
    this.channelUpdateCards.consume(
      'updateCards',
      async(msg: ConsumeMessage | null) => {
        try {
          if (!msg) {
            this.logger.warn('Handled null msg');
            return;
          }
          const stringMessage = msg.content.toString();
          const data = JSON.parse(stringMessage);
          await this.cardModel.updateOne(
            { _id: data.card_id, user_id: data.user_id },
            data,
          );
        }
        catch (error) {
          console.log(error);
        }
      },
    );
    this.channelTransactions.consume(
      'newTransactions',
      async(msg: ConsumeMessage | null) => {
        try {
          if (!msg) {
            this.logger.warn('Handled null msg');
            return;
          }
          const stringMessage = msg.content.toString();
          const data = JSON.parse(stringMessage);
          const transaction = await this.transactionModel.create(data);
          console.log(transaction);
        }
        catch (error) {
          console.log(error);
        }
      },
    );
  }

}
