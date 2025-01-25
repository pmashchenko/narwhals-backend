import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

@Injectable()
export class StockService {
  private readonly apiKey = process.env.FINNHUB_API_KEY;
  private readonly baseUrl = process.env.BASE_URL;
  private readonly cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

  async getStockQuote(symbol: string): Promise<any> {
    const cachedData = this.cache.get(symbol);

    if (cachedData) {
      return cachedData; // Return cached data
    }

    try {
      const { data } = await axios.get(`${this.baseUrl}/quote`, {
        params: {
          symbol,
          token: this.apiKey,
        },
      });

      this.cache.set(symbol, data);

      return data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch stock data from Finnhub',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}