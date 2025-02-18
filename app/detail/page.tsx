import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { TrendingUp } from "lucide-react";
import React from "react";

const detail = () => {
    return <>
        <div className="flex flex-col gap-2">
            {/* <h1>Market stats</h1> */}
            <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-6 ">
                    <div className="flex flex-row gap-2">
                        <img className="size-20" src="https://scontent.finnomena.com/sites/1/2022/05/77d6cb10-btc.png" alt="" />
                        <p className="p-4 text-2xl">Bitcoin <span className="bg-slate-900 text-sm p-1 rounded-sm text-white">BTC</span>
                            <span className="p-2"><ButtonIcon /></span>
                        </p>
                    </div>
                    <div className="flex flex-row gap-10">
                        <span className="bg-slate-900 p-1 text-sm rounded-sm">Rank #1</span>
                    </div>
                    <div>
                    <p className="text-xl flex items-center gap-2">
                        3,227,198.87 ฿ 
                        <span className="text-green-500 text-sm flex items-center gap-1">
                            +2% <TrendingUp size={14} />
                        </span>
                    </p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </>
};

export default detail;
