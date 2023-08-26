import { Injectable } from '@nestjs/common';
import { IAuthConfig, IBankItem } from '../models/configs/auth.models';
import { ConfigService } from './config.service';

@Injectable()
export class AuthConfig implements IAuthConfig {

  public readonly bankSettings: IBankItem[];

  constructor(configService: ConfigService) {
    this.bankSettings = configService
      .getString('BANK_ITEMS')
      .split(';')
      .map((item) => {
        const [bankName, bankApiKey] = item.split(',');
        return {
          bankName,
          bankApiKey,
        };
      });
  }

}
