import {
  Card,
  CardDescription,
  CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { FetchCoinDataDetail } from "@/data/fetchCoinData";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { calProfit } from "@/actions/Coin/action";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


const CoinCard = (props) => {
  const { data } = props;
  const [coindetail, setCoindetail] = useState(' ');
  const [view, setView] = useState(false);
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);
  const [alldetail, setAllDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (data.name !== "Cash") {
        const detail = await FetchCoinDataDetail(data.name);
        setCoindetail(detail);


        const profitData = await calProfit(data.name);
        setAllDetail(profitData)
        setProfit(profitData.resultProfit);
        setProfitPercent(profitData.resultProfitPercent);
      }
    };
    fetchData();
  }, [data.name]);

  if (!coindetail ) {
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
        <Card onClick={() => alldetail && setView(!view)}>
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
                  <p className="ml-2 text-[13px]">{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
                </div>
                <div className='flex item-center gap-1 '>
                  <span>{data.totalSpent.toLocaleString()} THB</span>
                  <span className={profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {profit !== null && profit >= 0 ? '+' : '-'}
                  </span>
                  <span className={profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {profit !== null ? `${Math.abs(Number(profit.toFixed(2)))}` : '0'}
                  </span>
                  <span className={profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {profit !== null ? `(${Math.abs(Number(profitPercent.toFixed(2)))})%` : ' '}
                  </span>
                  <span >{view? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
                  </div>
              </div>
            </CardDescription>
          </CardHeader>

          {view && (
              <div className={`mt-4 p-4 border-t transition-height ${view ? 'open' : ''}`}>
                
                      <p>Detail : {data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
                      <hr className='mt-2'/>
                      <div className='flex flex-col gap-1 mt-2'>
                        <div className='flex justify-between items-center text-sm'>
                            <CardDescription className='text-sm' >จำนวนเหรียญ</CardDescription>
                            <CardDescription className='text-sm'>{alldetail.myCoin.quantity}</CardDescription>
                        </div>
                        <div className='flex justify-between items-center text-sm '>
                            <CardDescription className='text-sm'>เงินรวมที่จ่ายไป </CardDescription>
                            <CardDescription className='text-sm'>{alldetail.myCoin.totalSpent}</CardDescription>
                        </div>
                        <div className='flex justify-between items-center text-sm '>
                            <CardDescription className='text-sm'>ราคาเฉลี่ยต่อเหรียญ</CardDescription>
                            <CardDescription className='text-sm'>{alldetail.avgPriceCoin.toLocaleString()}</CardDescription>
                        </div>
                        <div className='flex justify-between items-center text-sm '>
                            <CardDescription className='text-sm'>ราคาเฉลี่ยต่อเหรียญ * เหรียญ</CardDescription>
                            <CardDescription className='text-sm'>{alldetail.hasPriceHold.toLocaleString()}</CardDescription>
                        </div>
                        <div className='flex justify-between items-center text-sm '>
                            <CardDescription className='text-sm'>ราคาเหรียญตอนนี้</CardDescription>
                            <CardDescription className='text-sm'>{coindetail.current_price.toLocaleString()}</CardDescription>
                        </div>
                        <div className='flex justify-between items-center text-sm '>
                            <CardDescription className='text-sm'>ราคาเหรียญตอนนี้ * เหรียญ</CardDescription>
                            <CardDescription className='text-sm'>{alldetail.hasPriceNow.toLocaleString()}</CardDescription>
                        </div>
                        <hr/>
                        <div className='flex justify-between items-center text-sm '>
                            <CardDescription className='text-sm'>กำไร-ขาดทุน</CardDescription>
                            <CardDescription className='text-sm'>{profit.toLocaleString()}</CardDescription>
                        </div>
                        <div className='w-full mt-3 grid grid-cols-2 bg-[#ebebeb] p-1 rounded-md gap-2 dark:bg-slate-500'>
                          <Button className='bg-[#ebebeb] text-sm text-black py-1 px-2 rounded-sm hover:text-green-400 hover:border-green-500 transition-colors duration-200 hover:bg-white'>
                            <Link href={`./coin/${data.name}`}>Buy</Link>
                          </Button>

                          <Button className='bg-[#ebebeb] text-sm text-black py-1 px-2 rounded-sm hover:text-red-400 hover:border-red-500 transition-colors duration-200 hover:bg-white'>
                            <Link href={`./coin/${data.name}`}>Sell</Link>
                          </Button>
                                            
                        </div>
                      </div>

                     

            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default CoinCard;
