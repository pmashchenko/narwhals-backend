import { Resolver, Query, Args } from '@nestjs/graphql';
import { StockService } from './stock.service';
import { StockQuote } from './stock.types';

@Resolver(() => StockQuote)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Query(() => StockQuote)
  async getStockQuote(@Args('symbol') symbol: string): Promise<StockQuote> {
    return this.stockService.getStockQuote(symbol);
  }
}
