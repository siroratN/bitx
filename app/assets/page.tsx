'use client'
import CoinCard from "@/components/asset/CoinCard"
import { getAllAsset } from "@/actions/Coin/action"
import { useEffect, useState } from "react"
import { UserRound } from 'lucide-react';
import BalanceCard from "@/components/asset/BalanceCard";

const Assets = () => {
  const [user, setUser] = useState(null)
  const [view, setView] = useState(null)

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
          <p>Account: {user?.firstName} {user?.lastName}</p>
        </div>
        <div className="flex flex-col gap-2 w-[350px]">
          <BalanceCard allMyAssets={user?.assets} />
        </div>
      </div>

      <div className={view ? "grid grid-cols-[47%_53%]" : ""}>
        <div className='flex flex-col gap-10'>
          <div className="sm:w-full flex flex-col">
            <p className='mb-5'>Your Assets</p>
            <div className={view ?'px-5 flex flex-col gap-1 transition-all duration-500 ease-in-out' : 'grid grid-cols-3 gap-5'}>
              {user?.assets ? (
                user.assets.map((data) => (
                  <CoinCard
                    key={data.id} 
                    data={data}
                    setView = {setView}                  />
                ))
              ) : (
                <p>Loading assets...</p>
              )}
            </div>
          </div>
        </div>

        <div className='w-full '>
          
        {view && (
            <div className="w-full transition-all duration-500 ease-out-in opacity-100 transform translate-y-0">
              <p>Viewing: {view}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Assets
