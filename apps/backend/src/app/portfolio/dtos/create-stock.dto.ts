  import { IsString, IsNumber } from 'class-validator';

  export class CreateStockDto {
    @IsString()
    symbol: string;
  
    @IsString()
    name: string;
  
    @IsNumber()
    quantity: number;
  
    @IsNumber()
    price: number;
  
    @IsString()
    userId: string;
  }