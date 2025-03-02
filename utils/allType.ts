
export interface Coin {
    id: string
    name: string
    symbol: string
    current_price: number
}

export type ProfitResult = {
  myCoin: {
    id: number;
    name: string;
    quantity: number;
    totalSpent: number;
    owner: {
        id: number;
        name: string;
    };
  };
  avgPriceCoin: number;      // ราคาซื้อเฉลี่ยของเหรียญ
  hasPriceNow: number;       // มูลค่าปัจจุบันของเหรียญที่ถืออยู่
  hasPriceHold: number;      // มูลค่าต้นทุนของเหรียญที่ถืออยู่
  resultProfit: number;      // กำไร/ขาดทุนที่เกิดขึ้น
  resultProfitPercent: number; // เปอร์เซ็นต์กำไร/ขาดทุน
};


  
export  type ErrorResponse = {
    message: string;
  };