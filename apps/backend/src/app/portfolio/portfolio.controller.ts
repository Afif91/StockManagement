import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { StockApiService } from '../../shared/third-party-api/stock-api.service';
import { CreateStockDto } from './dtos/create-stock.dto';
import { UpdateStockDto } from './dtos/update-stock.dto';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService, private readonly stockApiService: StockApiService) {}
  
    @Post()
    addStock(@Body() stock: CreateStockDto) {
      return this.portfolioService.addStock(stock);
    }
  
    @Get(':userId')
    getPortfolio(@Param('userId') userId: string) {
      return this.portfolioService.getPortfolio(userId);
    }  

    @Get('stockDetails/:symbol')
    async getStockDetails(@Param('symbol') symbol: string) {
      return await this.stockApiService.getStockDetails(symbol);
    }

    @Put(':id')
    updateStock(@Param('id') id: string, @Body() stock: UpdateStockDto) {
      return this.portfolioService.updateStock(id, stock);
    }
  
    @Delete(':id')
    deleteStock(@Param('id') id: string) {
      return this.portfolioService.deleteStock(id);
    }

}
