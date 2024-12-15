export interface Stock {
    _id: string;
    symbol: string;
    name: string;
    quantity: number;
    price: number;
    userId: string;
    changesPercentage: number
  }  