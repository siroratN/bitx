import { calAssettotal } from "@/actions/Coin/action";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const BalanceCard = ({ allMyAssets }) => {
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!allMyAssets || allMyAssets.length === 0) return;
      
      const { total, profitTotal, profitTotalPecent } = await calAssettotal(allMyAssets);
      
      setBalance(total);
      setProfit(profitTotal);
      setProfitPercent(profitTotalPecent);
      
      console.log("Total Balance:", total);
    };

    fetchBalance();
  }, [allMyAssets]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <CardDescription className="font-normal">Assets Balance</CardDescription>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center justify-between">
            <CardDescription className="text-xl my-3 text-center w-full">
              {balance.toLocaleString()} THB 
              <span className={`ml-2 ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                {profit >= 0 ? `+${profit.toFixed(2).toLocaleString()} (${profitPercent.toFixed(2).toLocaleString()}%)` : `${profit} (${profitPercent.toFixed(2)}%)`}
              </span>
            </CardDescription>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BalanceCard;
