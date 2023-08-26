import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const GetBankName = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest < FastifyRequest & { bank: string }>();
  if (!request?.bank) {
    throw new UnauthorizedException();
  }

  return request.bank;
});
