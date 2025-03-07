import { Coins } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Profit = () => {
  return (
    <div className='p-5  rounded-md shadow-lg'>
        <div className='flex item-center justify-between'>
            <div className='flex gap-2'>
                <Coins className='text-sm' />
                <p className='text-sm'>Summary Total</p>
            </div>
            <div>
                <Link  href='/portfolio'>
                    <ChevronRight />
                </Link>
            </div>

        </div>
        <div className='m-2 pl-10'>
            <div >
                <p className='text-3xl'>100,000 ฿ <span className='text-sm text-green-400'>+ 10.02 (3.25%)</span></p>
            </div>
            
            
        </div>
    </div>
  )
}
export default Profit