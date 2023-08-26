import { Injectable } from '@nestjs/common';
import { AuthConfig } from '../../configs/auth.config';

@Injectable()
export class AuthorizationService {

  private readonly authConfig: AuthConfig;

  constructor(
    authConfig: AuthConfig,
  ) {
    this.authConfig = authConfig;
  }

  public verifyApiKey(key: string): string {
    const bankItem = this.authConfig.bankSettings.find((e) => e.bankApiKey === key);
    return bankItem?.bankName ?? '';
  }

}
