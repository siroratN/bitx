import CoinAllTable from "@/components/CoinAllTable/CoinAllTable"
import Profit from "@/components/Profit/Profit"
import { SignedOut, SignedIn ,SignUpButton, SignInButton } from '@clerk/nextjs'
import { TrendingUp } from 'lucide-react';


const page = () => {
  return (
    <div>
        <SignedIn>
          <div>
            <Profit/>
          </div>
        </SignedIn>
        <div className='my-10 flex item-center gap-3  p-4 rounded-sm'>
          <p className='text-2xl  font-bold'>Crypto Market Today</p>
          <p className='text-red-700'><TrendingUp/></p>
        </div>
        <CoinAllTable/>
    </div>
  )
}
export default page