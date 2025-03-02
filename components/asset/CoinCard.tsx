import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { FetchCoinDataDetail } from "@/data/fetchCoinData";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { calProfit } from "@/actions/Coin/action";

const CoinCard = (props) => {
  const { data, setView } = props;
  const [coindetail, setCoindetail] = useState('  ');
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      if (data.name !== "Cash") {
        const detail = await FetchCoinDataDetail(data.name);
        setCoindetail(detail);

        const profitData = await calProfit(data.name);
        setProfit(profitData.resultProfit)
        setProfitPercent(profitData.resultProfitPercent)
      }
    };
    fetchData();
  }, [data.name]);


  if (!coindetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4 cursor-pointer hover:scale-105 transition-transform">
      {data.name === "Cash" ? (
        <Card>
          <CardHeader>
            <CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-[5px] h-5 bg-red-500"></div>
                  <Wallet className="ml-2" />
                  <p className="ml-2">Cash</p>
                </div>
                <span>{data.totalSpent.toLocaleString()} THB</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card onClick={()=>(setView(coindetail?.name))} >
          <CardHeader>
            <CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-[5px] h-5 bg-red-500"></div>
                  <img 
                    src={coindetail?.image} 
                    alt="Coin image" 
                    className="w-6 h-6 object-cover ml-2" 
                  />
                  <p className="ml-2">{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
                </div>
                <div>
                  <span>{data.totalSpent.toLocaleString()} THB</span>
                  <span className={profit>=0 ? 'text-green-500' : 'text-red-500'}> {profit !== null && profit >= 0 ? '+' : '-' } </span>
                  <span className={profit>=0 ? 'text-green-500' : 'text-red-500'}> {profit !== null ? `${Math.abs(Number(profit.toFixed(2)))}` : '0'}</span>
                  {/* <span className={profit>=0 ? 'text-green-500' : 'text-red-500'}> {profitPercent}</span> */}
                  <span className={profit>=0 ? 'text-green-500' : 'text-red-500'}> {profit !== null ? `(${Math.abs(Number(profitPercent.toFixed(2)))})%` : ' '}</span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
        )}
    </div>
  );
};

export default CoinCard;
