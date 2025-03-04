'use client'
import CoinCard from "@/components/asset/CoinCard"
import { getAllAsset } from "@/actions/Coin/action"
import { useEffect, useState } from "react"
import { UserRound } from 'lucide-react';
import BalanceCard from "@/components/asset/BalanceCard";
import { Button } from "@/components/ui/button";

const Assets = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchAsset = async () => {
      const response = await getAllAsset()
      if (response) {
        setUser(response.result)
        console.log('Fetched assets:', response.result)
      }
    }
    fetchAsset()
  }, [])

  

  return (
    <div className="content2 flex flex-col gap-[13px]">
      <div className='flex items-center gap-3 justify-between px-[5px]'>
        <div className='flex gap-4'>
          <UserRound />
          <p className='text-xl'>Account: {user?.firstName} {user?.lastName}</p>
        </div>
        <div className="flex flex-col gap-2 w-[600px]">
          <BalanceCard allMyAssets={user?.assets} />
        </div>
      </div>

      <div className='w-full'>
        <div className='flex flex-col gap-10'>
          <div className="sm:w-full flex flex-col">
            <p className='mb-7 mt-10 text-xl'>Your Assets : {user?.assets.length}</p>
            <div className={ 'grid grid-cols-3 gap-5'}>
              {user?.assets ? (
                user.assets.map((data) => (
                  <CoinCard
                    key={data.id} 
                    data={data}  />
                ))
              ) : (
                <p>Loading assets...</p>
              )}
            </div>
          </div>
        </div>

      </div>

     
    </div>
  )
}

export default Assets
