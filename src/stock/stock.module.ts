import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockResolver } from './stock.resolver';

@Module({
  providers: [StockService, StockResolver],
})
export class StockModule {}
