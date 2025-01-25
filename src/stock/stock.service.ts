import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class StockService {
  private readonly apiKey = process.env.FINNHUB_API_KEY;
  private readonly baseUrl = process.env.BASE_URL;

  async getStockQuote(symbol: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/quote`, {
        params: {
          symbol,
          token: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch stock data from Finnhub',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}