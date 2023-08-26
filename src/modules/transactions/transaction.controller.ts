import { Controller, UseFilters, UseGuards, Get, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IGetResponse } from '../../models/responses/shared.responses';
import { ITransaction } from '../../models/schemas/transaction.models';
import { GetBankName } from '../../shared/decorators/extract-user-id.decorator';
import { CustomHttpExceptionFilter } from '../../shared/filters/exception-filter';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { TransactionsService } from './transaction.service';

@ApiTags('Transactions')
@ApiSecurity('apiKey')
@UseFilters(CustomHttpExceptionFilter)
@UseGuards(AuthorizationGuard)
@Controller('transactions')
export class TransactionsController {

  private readonly transactionsService: TransactionsService;

  constructor(transactionsService: TransactionsService) {
    this.transactionsService = transactionsService;
  }

  @Get('/get-transactions')
  async getTransactions(
    @Query() query: GetTransactionsDto, // TODO: better to shared
      @GetBankName() bank: string,
  ): Promise<IGetResponse<ITransaction>> {
    const transactions = await this.transactionsService.getTransactions(
      query,
      bank,
    );
    return transactions;
  }

}
