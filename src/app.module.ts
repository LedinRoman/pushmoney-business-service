import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './configs/config.module';
import { MongoConfig } from './configs/mongo.config';
import { RabbitmqConfig } from './configs/rabbitmq.config';
import { AuthrorizationModule } from './modules/authorization/authorization.module';
import { CardModule } from './modules/cards/cards.module';
import { HealthModule } from './modules/health/health.module';
import { SystemModule } from './modules/system/system.module';
import { TransactionsModule } from './modules/transactions/transaction.module';
import { RabbitModule } from './shared/rabbit/module/rabbit.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongoConfig,
    }),
    RabbitModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: RabbitmqConfig,
    }),
    HealthModule,
    AuthrorizationModule,
    CardModule,
    TransactionsModule,
    SystemModule,
  ],
})
export class AppModule {}
