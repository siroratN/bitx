import { calProfit, getAllAsset } from "@/actions/Coin/action";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, WalletMinimal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SquareArrowOutUpRight } from 'lucide-react';



export default function HotCard2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const asset = await getAllAsset();
        if (!asset?.result?.assets) return;

        const formattedData = await Promise.all(
          asset.result.assets.slice(0, 4).map(async (item) => {
            if (item.name === "Cash") {
              return {
                name: item.name,
                total: item.totalSpent ?? 0,
              };
            } else {
              const profitData = await calProfit(item.name);
              return {
                name: item.name,
                profit: profitData?.resultProfit ?? 0,
                profitPercent: profitData?.resultProfitPercent ?? 0,
                totalSpent: profitData?.totalSpent ?? 0,
              };
            }
          })
        );
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if(data.length > 0){setLoading(false);}
      }
    };

    fetchData();
  }, [data]);

  return (
    <Card className="p-4 w-[350px] bg-white dark:bg-[#f0f0f0] rounded-xl shadow-md">
      <div className="flex justify-between items-center bg-[#6cc7fe] rounded-xl px-5 py-2">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg font-medium text-black">My Assets</h3>
          <WalletMinimal className="h-[15px] w-[15px] text-black" />
        </div>
        <Link
          href="/assets"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
              <SquareArrowOutUpRight className='w-[15px] h-[15px] text-[#6c027c]'/>

        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-3">Loading...</p>
      ) : (
        <div className="mt-3">
          {data.map((coin, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-5  border-b last:border-b-0"
            >
              <div className="w-full text-right flex justify-between ">
                <p className="text-sm font-sans text-black">{coin.name}</p>
                {coin.name === "Cash" ? (
                  <p className="text-xs font-normal text-black flex items-center">
                    {coin.total.toLocaleString()} THB
                  </p>
                ) : (
                  <p
                    className={`text-xs font-normal ${
                      coin.profit < 0 ? "text-red-500" : "text-green-500"
                    } flex items-center`}
                  >
                    {coin.profit < 0 ? (
                      <ArrowDown size={12} />
                    ) : (
                      <ArrowUp size={12} />
                    )}
                    {coin.profit.toLocaleString()}%
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
