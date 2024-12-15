import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from '../../shared/schemas/stock.schema';
import { StockApiService } from '../../shared/third-party-api/stock-api.service';
import { ResponseModel } from '../../shared/models/response.model';
import { CreateStockDto } from './dtos/create-stock.dto';
import { UpdateStockDto } from './dtos/update-stock.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
    private readonly stockApiService: StockApiService
  ) {}

  async addStock(stockDto: CreateStockDto): Promise<ResponseModel<Stock>> {
    const newStock = await new this.stockModel(stockDto).save();
    return {
      success: true,
      data: newStock,
    };
  }

  async getPortfolio(userId: string): Promise<ResponseModel<Stock[]>> {
    try {
      const portfolio = await this.stockModel.find({ userId }).exec();
      if (!portfolio) {
        throw new NotFoundException(`No portfolio found for user ID: ${userId}`);
      }
      return {
        success: true,
        data: portfolio,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to retrieve portfolio: ${error.message}`);
    }
  }

  async updateStock(id: string, stockDto: UpdateStockDto): Promise<ResponseModel<Stock>> {
    const updatedStock = await this.stockModel.findByIdAndUpdate(id, stockDto, { new: true }).exec();
    if (!updatedStock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return {
      success: true,
      data: updatedStock,
    };
  }

  async deleteStock(id: string): Promise<ResponseModel<Stock>> {
    const deletedStock = await this.stockModel.findByIdAndDelete(id).exec();
    if (!deletedStock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return {
      success: true,
      data: deletedStock,
    };
  }

  async getStockDetails(symbol: string): Promise<ResponseModel<any>> {
    try {
      const stockDetails = await this.stockApiService.getStockDetails(symbol);
      return {
        success: true,
        data: stockDetails,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to fetch stock details: ${error.message}`);
    }
  }
}
