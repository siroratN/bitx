import CoinCard from "@/components/asset/CoinCard"

const Assets = () => {
  return (
    <div className='content2 flex flex-col gap-[15px]'>
      <div class='flex flex-col gap-10'>
        <p className='font-semibold text-xl'>My Assets</p>
        <CoinCard/>

      </div>
    </div>
  )
}
export default Assets