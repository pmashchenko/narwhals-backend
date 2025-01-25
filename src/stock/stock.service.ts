import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

dotenv.config();

@Injectable()
export class StockService {
  private readonly apiKey = process.env.FINNHUB_API_KEY;
  private readonly baseUrl = process.env.BASE_URL;

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getStockQuote(symbol: string): Promise<any> {
    const cachedData = await this.redis.get(symbol);

    if (cachedData) {
      console.log(`Cache hit for symbol: ${symbol}`);
      return JSON.parse(cachedData); // Return cached data
    }

    console.log(`Cache miss for symbol: ${symbol}. Fetching from Finnhub API.`);
    try {
      const { data } = await axios.get(`${this.baseUrl}/quote`, {
        params: {
          symbol,
          token: this.apiKey,
        },
      });

      await this.redis.set(symbol, JSON.stringify(data), 'EX', 60);

      return data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch stock data from Finnhub',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}