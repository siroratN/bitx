'use client'
import { getAllAsset } from "@/actions/Coin/action"
import { useEffect } from "react"


const page = () => {
  // const [test, setTest] = useState()
  useEffect(()=>{
    const test = async()=>{
      const response = await getAllAsset(); 
      console.log('Response:', response.result); 
    }
    test()
  },[])
  return (
    <button onClick={getAllAsset}>test</button>
  )
}
export default page