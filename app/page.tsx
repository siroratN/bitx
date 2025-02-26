import Barcoin from "@/components/Homepage/barcoin";
import CoinAllTable from "@/components/Homepage/CoinAllTable"
import Profit from "@/components/Profit/Profit"
import { SignedIn,SignedOut } from '@clerk/nextjs'


const page = () => {
  return (
    <div>
        
        <Barcoin/>

        <SignedOut>
          <div className="my-20">
            <p className='text-3xl font-semibold'>Welcome to <span className='text-5xl text-[#FF8247] font-bold'>BitX </span> </p>
            <p className='text-ml mt-2 text-gray-600'>We are excited to have all crypto traders here to practice and enhance their trading skills.</p>
          </div>
        </SignedOut>

        {/* <SignedIn>
          
          <div className='mt-10'>
            <Profit/>
          </div>
        </SignedIn> */}

        <CoinAllTable/>
    </div>
  )
}
export default page