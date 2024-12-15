import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class StockApiService {
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
  }

  async getStockDetails(symbol: string): Promise<any> {
    try {
      const stockDetails = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${this.apiKey}`
      );
      if (!stockDetails) {
        throw new NotFoundException(`No stock details found for symbol: ${symbol}`);
      }
      return {
        success: true,
        data: stockDetails.data[0],
      }
    } catch (error) {
      throw new BadRequestException(`Failed to retrieve portfolio: ${error.message}`);
    }
  }
  
}
