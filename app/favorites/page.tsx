'use client'
import { getFav, unFav } from "@/actions/Fav/Fav";
import { FetchCoinData } from '@/data/fetchCoinData'
import Barcoin from "@/components/Homepage/barcoin";
import { MoveDiagonal, TrendingUp, Search } from 'lucide-react';
import { ButtonIconFav } from "@/components/ui/ButtonIconFav";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react";
import Link from "next/link";
  
const page = () => {
    const [fav, setFav] = useState([])
    useEffect(()=>{
       const getdata = async () => {
            let favdata = await getFav();
            const favdatanew = favdata.map((item)=> (
                item.coinName
            ))
            // console.log('favdatanew', favdatanew)
            const alldata = await FetchCoinData();
            if(favdata && alldata){
                const favReal = alldata.filter((item)=> favdatanew.includes(item.id))
                console.log('dsada', favReal)
                setFav(favReal)
            }
       } 

       getdata()
    },[])

    const handleFav = async (name : string) => {
        if(name){
            const unFavdata = fav.filter((item)=> item.id !== name)
            setFav(unFavdata)
            const un = await unFav(name)
            console.log('unfav : ', un)
        }
    }

  return (
    <div className='content2 mt-[-45px]'>
        <Barcoin />
        <p className='my-10 text-3xl'>Favorites Coin</p> {/* ย้ายออกมานอก div */}
        
        {fav.length > 0 ? (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="text-center">Coin</TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Price (THB)</TableHead>
                            <TableHead className="text-center">24h Change</TableHead>
                            <TableHead className="text-center">Market Cap</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fav.map((item) => (
                            <TableRow key={item.id} className="text-center border-none rounded-lg">
                                <TableCell>
                                    <div className='flex justify-start'>
                                        <ButtonIconFav onClick={() => handleFav(item.id)} />
                                    </div>
                                </TableCell>
                                <TableCell className='flex items-center justify-center'>
                                    <img src={item.image} alt={item.name} className="w-10 h-10" />
                                </TableCell>
                                <TableCell>{item.name} ({item.symbol.toUpperCase()})</TableCell>
                                <TableCell>{item.current_price.toLocaleString()} ฿</TableCell>
                                <TableCell className={`${item.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
                                    {item.price_change_percentage_24h.toFixed(2)}%
                                </TableCell>
                                <TableCell>{item.market_cap.toLocaleString()} ฿</TableCell>
                                <TableCell>
                                    <Link href={`/coin/${item.id}`}>
                                        <MoveDiagonal className="text-blue" size={16} />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        ) : (
            <p className="text-center text-lg text-gray-500">ยังไม่มีเหรียญที่ชอบ</p>
        )}
    </div>
    
  )
}
export default page