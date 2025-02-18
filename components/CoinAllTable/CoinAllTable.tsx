'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CoinAllTable() {
  const data = Array.from({ length: 52 }, (_, i) => ({
    coin: `Coin ${i + 1}`,
    symbol: `SYM${i + 1}`,
    price: `$${(43000 + i * 100).toFixed(2)}`,
    holdings: (0.1 + i * 0.01).toFixed(5),
    value: `$${(1000 + i * 50).toFixed(2)}`,
    profit: i % 2 === 0 ? `+$${(i * 100).toFixed(2)}` : `-$${(i * 100).toFixed(2)}`,
    change: i % 2 === 0 ? `+${(0.5 + i * 0.1).toFixed(2)}%` : `-${(0.5 + i * 0.1).toFixed(2)}%`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pair / Holdings</TableHead>
            <TableHead>Price / Avg Buy</TableHead>
            <TableHead>Holdings Assets</TableHead>
            <TableHead>Total Asset Value</TableHead>
            <TableHead>Profit / Loss</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {currentData.map((item, index) => (
            <TableRow key={index} className="p-10">
              <TableCell >{item.coin} ({item.symbol})</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.holdings}</TableCell>
              <TableCell>{item.value}</TableCell>
              <TableCell className={item.profit.includes('-') ? 'text-red-500' : 'text-green-500'}>
                {item.profit} {item.change}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" onClick={prevPage} disabled={currentPage === 1}>Previous</Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button variant="outline" onClick={nextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </div>
  );
}
