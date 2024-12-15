import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Global access to env variables
    MongooseModule.forRoot(process.env.MONGO_URI),
    PortfolioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
