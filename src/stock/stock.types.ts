import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class StockQuote {
  @Field(() => Float)
  c: number; // Current price

  @Field(() => Float)
  h: number; // High price of the day

  @Field(() => Float)
  l: number; // Low price of the day

  @Field(() => Float)
  o: number; // Open price of the day

  @Field(() => Float)
  d: number; // Change

  @Field(() => Float)
  pc: number; // Previous close price

  @Field(() => Float)
  dp: number; // Percentage change
}
