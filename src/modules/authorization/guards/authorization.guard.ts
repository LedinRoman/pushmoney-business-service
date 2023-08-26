/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  private readonly authorizationService: AuthorizationService;

  constructor(authorizationService: AuthorizationService) {
    this.authorizationService = authorizationService;
  }

  public canActivate(context: ExecutionContext): boolean {
    try {
      const http = context.switchToHttp().getRequest();
      if (!http.headers?.['x-api-key']) {
        return false;
      }

      const key = http.headers['x-api-key'];
      const bank = this.authorizationService.verifyApiKey(key);
      if (bank) {
        http.bank = bank;
        return true;
      }
      return false;
    }
    catch (error) {
      return false;
    }
  }

}
