import CoinCard from "@/components/asset/CoinCard"

const Assets = () => {
  return (
    <div className='content2 flex flex-col gap-[15px]'>
      <div className='bg-green-800 w-full h-[150px]'>

      </div>
      <div>
        <p className='font-semibold'>My Assets</p>
        <CoinCard/>

      </div>
    </div>
  )
}
export default Assets