import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const CoinCard = ({props}) => {
    
  return (
    <div>
        <Card className='w-full max-w-sm'>
        <CardHeader>
            <CardTitle>
            <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <div className="w-[5px] h-5 bg-red-500"></div>
                        <p className='ml-3'>Cash</p>
                    </div>
                    <CardDescription>Total Balance</CardDescription>
                </div>
                
                    
            </CardTitle>
            <CardDescription>
                <div className='flex items-center justify-between'>
                    <CardDescription>Popo's Account</CardDescription>
                    <CardDescription>100,000 THB</CardDescription>
                </div>
                    
            </CardDescription>
        </CardHeader>
        {/* <CardFooter>
            <p>Detail</p>
        </CardFooter> */}
        </Card>

        <Card className='w-full max-w-sm'>
        <CardHeader>
            <CardTitle>
            <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <div className="w-[5px] h-5 bg-red-500"></div>
                        <p className='ml-3'>Cash</p>
                    </div>
                    <CardDescription>Total Balance</CardDescription>
                </div>
                
                    
            </CardTitle>
            <CardDescription>
                <div className='flex items-center justify-between'>
                    <CardDescription>Popo's Account</CardDescription>
                    <CardDescription>100,000 THB</CardDescription>
                </div>
                    
            </CardDescription>
        </CardHeader>
        {/* <CardFooter>
            <p>Detail</p>
        </CardFooter> */}
        </Card>
    </div>
  )
}
export default CoinCard