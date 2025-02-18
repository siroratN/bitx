import CoinAllTable from "@/components/CoinAllTable/CoinAllTable"
import Profit from "@/components/Profit/Profit"
import { SignedOut, SignedIn ,SignUpButton, SignInButton } from '@clerk/nextjs'


const page = () => {
  return (
    <div>
        <SignedIn>
          <div>
            <Profit/>
          </div>
        </SignedIn>
        <CoinAllTable/>
    </div>
  )
}
export default page