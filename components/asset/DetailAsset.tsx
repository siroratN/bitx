'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { calProfit } from "@/actions/Coin/action";

const DetailAsset = ({ view }:{view:string}) => {
    const [assetData, setAssetData] = useState(null);

    useEffect(() => {
        if (!view) return;
        console.log("Calling calProfit with:", view); // ตรวจสอบค่า view ที่ถูกส่งเข้าไป
    
        const getAsset = async () => {
            try {
                const asset = await calProfit(view);
                console.log("Received asset:", asset);
                setAssetData(asset);
            } catch (error) {
                console.error("Error fetching asset data:", error);
            }
        };
    
        getAsset();
    }, []);
    

    return (
        <div className="p-3 shadow-xl mt-[20px]">
            <Card>
                <CardHeader>
                    <CardTitle>{view}</CardTitle>
                    <p className="text-3xl font-bold">${assetData?.hasPriceNow || "0.00"}</p>
                    {/* <p className="text-sm text-gray-500">
                        Profit: {assetData?.myCoin.totalSpent.tpLocalString() || "0.00"} USD ({assetData?.resultProfitPercent?.toFixed(2) || "0.00"}%)
                    </p> */}
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                    <p className="text-sm text-gray-500">Finbank, Inc. 546 Payton Route Apt. 973</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                        <div>
                            <p className="font-bold">Google, Inc.</p>
                            <p className="text-sm text-gray-500">4 Apr, 2020</p>
                        </div>
                        <div className="text-right">
                            <p className="text-red-500 font-bold">DUE</p>
                            <p className="font-bold">$744.00</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50">
                        <UploadCloud className="w-5 h-5" /> Upload Invoice
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

export default DetailAsset;
