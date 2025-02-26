"use client";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FetchCoinDataDetail } from "@/data/fetchCoinData";
import { useParams } from "next/navigation";
import { CoinChart } from "@/data/fetchCoinData";
import LineChart from "@/components/LineChart/LineChart";
const Detail = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [coinChart, setCoinChart] = useState(null);
    const [isBuy, setIsBuy] = useState(true);
    useEffect(() => {
        if (!id) return;
        const getData = async () => {
            try {
                const data = await FetchCoinDataDetail(id as string);
                setCoin(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        const getChart = async () => {
            try {
                const data = await CoinChart(id as string);
                console.log(data);
                setCoinChart(data);
            } catch (error) {
                console.error(error);
            }
        };
        getChart();
        getData();
    }, [id]);
    return (
        <>
            {coin ? (
                <div className="flex flex-col gap-2 p-4 mt-6">
                    <div className="grid grid-cols-2 gap-14">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-2">
                                <img className="size-20" src={coin.image} alt={coin.name} />
                                <p className="p-4 text-2xl">
                                    {coin.id}{" "}
                                    <span className="bg-slate-900 text-sm p-1 rounded-sm text-white">
                                        {coin.symbol.toUpperCase()}
                                    </span>
                                    <span className="p-2">
                                        <ButtonIcon />
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-row gap-10">
                                <span className="bg-slate-900 p-1 text-sm rounded-sm text-white">
                                    Rank #{coin.market_cap_rank}
                                </span>
                            </div>
                            <div>
                                <div className="grid grid-cols-3 gap-6 items-center">
                                    <div className="flex flex-col">
                                        <p className="text-gray-500 text-sm text-center">ราคาล่าสุด</p>
                                        <div className="flex items-center gap-2 font-semibold text-sm">
                                            {coin.current_price.toLocaleString()} ฿
                                            <span
                                                className={`text-sm flex items-center gap-1 ${coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
                                                    }`}
                                            >
                                                {coin.price_change_percentage_24h.toFixed(2)}%
                                                {coin.price_change_percentage_24h < 0 ? (
                                                    <TrendingDown size={16} />
                                                ) : (
                                                    <TrendingUp size={16} />
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-center">
                                        <p className="text-gray-500 text-sm">ราคาสูงสุด (24 ชั่วโมง)</p>
                                        <h1 className="font-semibold text-green-600 text-sm">
                                            {coin.high_24h.toLocaleString()} ฿
                                        </h1>
                                    </div>

                                    <div className="flex flex-col text-center">
                                        <p className="text-gray-500 text-sm">ราคาต่ำสุด (24 ชั่วโมง)</p>
                                        <h1 className="font-semibold text-red-500 text-sm">
                                            {coin.low_24h.toLocaleString()} ฿
                                        </h1>
                                    </div>
                                </div>

                            </div>
                            <div className="">
                                <LineChart historicalData={coinChart} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div>
                                <div className="">
                                    <div className="grid grid-cols-2 bg-[#ebebeb] p-1 rounded-md gap-2 dark:bg-slate-500">
                                        <button
                                            onClick={() => setIsBuy(true)}
                                            className={`font-semibold py-3 rounded-md transition-all duration-200 ${isBuy
                                                ? "bg-white border-[1px] border-green-600 text-green-400"
                                                : "bg-[#ebebeb] text-gray-400 border hover:bg-[#d7d6d6]"
                                                }`}
                                        >
                                            ซื้อ
                                        </button>

                                        <button
                                            onClick={() => setIsBuy(false)}
                                            className={`font-semibold py-3 rounded-md transition-all duration-200 ${!isBuy
                                                ? "bg-white border-[1px] border-red-600 text-red-400"
                                                : "bg-[#ebebeb] text-gray-400 border hover:bg-[#d7d6d6]"
                                                }`}
                                        >
                                            ขาย
                                        </button>
                                    </div>
                                    {isBuy ? (
                                        <div>
                                            <h1 className="m-3">จำนวนที่ต้องจ่าย</h1>
                                            <div className="grid grid-cols-2 gap-2 p-2 m-6">
                                                <div className="flex flex-row gap-2">
                                                    <img
                                                        src="https://cdn.bitkubnow.com/coins/icon/32/THB.png"
                                                        alt=""
                                                        className="size-8"
                                                    />
                                                    <span className="text-2xl">THB</span>
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        className="p-2 w-full border-[1px] border-gray-300 rounded-md "
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <h1 className="m-3">ได้รับประมาณ</h1>
                                            <div className="grid grid-cols-2 gap-2 p-2 m-6">
                                                <div className="flex flex-row gap-2">
                                                    <img src={coin.image} alt="" className="size-8" />
                                                    <span className="text-2xl">
                                                        {coin.symbol.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="flex justify-end text-2xl">
                                                        0.00000000
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex mt-3">
                                                <button
                                                    type="submit"
                                                    className="w-full focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-lg px-5 py-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                >
                                                    ซื้อ
                                                </button>
                                                
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className="m-3">จำนวนที่ต้องจ่าย</h1>
                                            <div className="grid grid-cols-2 gap-2 p-2 m-6">
                                                <div className="flex flex-row gap-2">
                                                    <img src={coin.image} alt="" className="size-8" />
                                                    <span className="text-2xl">
                                                        {coin.symbol.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        className="p-2 w-full border-[1px] border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <h1 className="m-3">ได้รับประมาณ</h1>
                                            <div className="grid grid-cols-2 gap-2 p-2 m-6">
                                                <div className="flex flex-row gap-2">
                                                    <img
                                                        src="https://cdn.bitkubnow.com/coins/icon/32/THB.png"
                                                        alt=""
                                                        className="size-8"
                                                    />
                                                    <span className="text-2xl">THB</span>
                                                </div>
                                                <div>
                                                    <p className="flex justify-end text-2xl">0.00</p>{" "}
                                                </div>
                                            </div>
                                            <div className="flex mt-3">
                                                <button
                                                    type="submit"
                                                    className="w-full focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-lg px-5 py-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                >
                                                    ขาย
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Detail;
