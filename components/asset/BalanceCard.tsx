import { calAssettotal } from "@/actions/Coin/action";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

const BalanceCard = ({ allMyAssets = [] }) => {
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (allMyAssets.length === 0) {
        setBalance(0);
        setProfit(0);
        setProfitPercent(0);
        return;
      }

      const { total, profitTotal, profitTotalPecent } = await calAssettotal(allMyAssets);
      
      setBalance(total);
      setProfit(profitTotal);
      setProfitPercent(profitTotalPecent);
      
      console.log("Total Balance:", total);
    };

    fetchBalance();
  }, [allMyAssets]);

  return (
    <Card className="p-4 w-[350px] bg-white dark:bg-transparent rounded-xl shadow-md">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2">
            <div>
              <CardDescription className="font-normal text-lg">Assets Balance</CardDescription>
            </div>
            <div className="flex justify-end text-green-400">
              <Link href="/cash/">
                <CirclePlus size={22} />
              </Link>
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center justify-between">
            <CardDescription className="text-xl my-3 text-center w-full font-normal">
              {parseFloat(balance).toFixed(2).toLocaleString()} THB 
              {allMyAssets.length !== 1 && (
                <span className={`ml-2 ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {profit >= 0
                    ? `+${parseFloat(profit).toFixed(2).toLocaleString()} (${parseFloat(profitPercent).toFixed(2).toLocaleString()}%)`
                    : `${parseFloat(profit).toFixed(2).toLocaleString()} (${parseFloat(profitPercent).toFixed(2).toLocaleString()}%)`}
                </span>
              )}
            </CardDescription>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BalanceCard;
