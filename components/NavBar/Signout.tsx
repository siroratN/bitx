'use client'

import { useToast } from "@/hooks/use-toast"
import { SignOutButton } from '@clerk/nextjs'

const Signout = () => {
    const { toast } = useToast()

    const handlelogout = () => {
        toast({
            title: "Logout Succesful!!",
            description: "BitX : Hope to Meet You Again",
        })
    }

  return (
    <SignOutButton redirectUrl='/' >
      <button onClick={handlelogout}>Log out</button>
    </SignOutButton>
  )
}
export default Signout