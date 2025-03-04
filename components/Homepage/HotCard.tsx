import { useState } from "react";
import { Button } from "@/components/ui/button";

const coins = [
  { name: "BNB", price: "$606.04", change: "-0.67%", color: "text-red-500", icon: "🔶" },
  { name: "BTC", price: "$92.30K", change: "+7.06%", color: "text-green-500", icon: "🟠" },
  { name: "ETH", price: "$2.38K", change: "+7.15%", color: "text-green-500", icon: "🔵" }
];

export default function HotCard() {
  const [index, setIndex] = useState(0);

  const nextCoin = () => setIndex((prev) => (prev + 1) % coins.length);
  const prevCoin = () => setIndex((prev) => (prev - 1 + coins.length) % coins.length);

  return (
    <div className="p-4 border rounded-xl w-72 text-center bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-3">Hot Coins</h2>
      <div className="flex items-center justify-center space-x-2">
        <span className="text-2xl">{coins[index].icon}</span>
        <span className="font-bold text-lg">{coins[index].name}</span>
      </div>
      <p className="text-xl font-medium mt-2">{coins[index].price}</p>
      <p className={`text-sm ${coins[index].color}`}>{coins[index].change}</p>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={prevCoin}>Prev</Button>
        <Button variant="outline" onClick={nextCoin}>Next</Button>
      </div>
    </div>
  );
}
