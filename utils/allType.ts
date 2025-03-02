
export interface Coin {
    id: string
    name: string
    symbol: string
    current_price: number
}

export type ProfitResult = {
    resultProfit: number;
    resultProfitPercent: number;
  };
  
export  type ErrorResponse = {
    message: string;
  };