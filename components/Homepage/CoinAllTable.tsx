'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FetchCoinData } from "@/data/fetchCoinData";
import { Coin } from "@/util/allType";
import { MoveDiagonal } from 'lucide-react';

import { TrendingUp } from 'lucide-react';
import { Input } from "../ui/input";
import Link from "next/link";

export default function CoinAllTable() {
  const [coin, setCoin] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await FetchCoinData();
        setCoin(data);
        setFilteredCoins(data); // Initially set filtered coins to all fetched data
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredCoins.length / itemsPerPage)); 
  const currentData = filteredCoins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  function handleSearch(searchInput: string) {
    if (searchInput === '') {
      setFilteredCoins(coin);
    } else {
      const searchCoin = coin.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCoins(searchCoin); 
    }
    setCurrentPage(1);
  }

  return (
    <div className='my-16'>
      <div className='flex items-center justify-between gap-3  mb-10 rounded-sm'>
        <div className="flex gap-5 items-center">
          <p className='text-4xl font-bold'>Cryptocurrency Market</p>
          <p className='text-red-700'><TrendingUp/></p>
        </div>
        <Input type="text" className="w-[250px] text-sm rounded-sm" onChange={(e) => handleSearch(e.target.value)} placeholder="Search Cryptocurrency Coin..."/>
      </div>

      <Table>
        <TableHeader className="border-b border-gray-300">
          <TableRow className="border-b border-gray-300">
            <TableHead>Coin</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Price (THB)</TableHead>
            <TableHead className="text-center">24h Change</TableHead>
            <TableHead className="text-center">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id} className="border-b border-gray-300 m-10 text-center">
              <TableCell className='flex items-center'>
                <img src={item.image} alt={item.name} className="w-10 h-10" />
              </TableCell>
              <TableCell>{item.name} ({item.symbol.toUpperCase()})</TableCell>
              <TableCell>{item.current_price.toLocaleString()} ฿</TableCell>
              <TableCell className={`${item.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>{item.market_cap.toLocaleString()} ฿</TableCell>
              <TableCell><Link href={`/coin/${item.id}`}>    <MoveDiagonal className="text-blue" size={16} />
              </Link></TableCell>
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
