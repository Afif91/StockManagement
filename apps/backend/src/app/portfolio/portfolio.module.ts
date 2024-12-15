import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from '../../shared/schemas/stock.schema';
import { StockApiService } from '../../shared/third-party-api/stock-api.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }])],
  providers: [PortfolioService, StockApiService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
