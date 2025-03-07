import { calAssettotal } from "@/actions/Coin/action";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CirclePlus } from 'lucide-react';
import { addCash } from "@/actions/Cash/action";
import Link from 'next/link';



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
  // const handleSubmit = async () => {
  //   try {
  //     const price = 500;
  //     const { redirectUrl } = await addCash(price);
  //     window.location.href = redirectUrl;

  //   }
  //   catch (error) {
  //     console.log("Error adding cash:", error);
  //   }
// };

  return (
    <Card className="p-4 w-[350px] bg-white dark:bg-[#f0f0f0] rounded-xl shadow-md">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2">
            <div>
            <CardDescription className="font-normal text-lg ">Assets Balance</CardDescription>
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
              {balance.toFixed(2).toLocaleString()} THB 
              <span className={`ml-2 ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                {profit >= 0 ? `+${profit.toFixed(2).toLocaleString()} (${profitPercent.toFixed(2).toLocaleString()}%)` : `${profit.toFixed(2).toLocaleString()} (${profitPercent.toFixed(2).toLocaleString()}%)`}
              </span>
            </CardDescription>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BalanceCard;
