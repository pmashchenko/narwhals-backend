import { Resolver, Query, Args } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { StockService } from './stock.service';
import { StockQuote } from './stock.types';

@Resolver(() => StockQuote)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Throttle({default:  { limit: 50, ttl: 60000 }}) // Limit: 50 requests per 60 seconds
  @Query(() => StockQuote)
  async getStockQuote(@Args('symbol') symbol: string): Promise<StockQuote> {
    return this.stockService.getStockQuote(symbol);
  }
}
