import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Generates schema automatically
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time window in milliseconds
      limit: 50, // Max requests per time window
    }]),
    StockModule,
  ],
})
export class AppModule {}
