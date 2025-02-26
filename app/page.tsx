"use client";
import { useEffect} from "react";
import { SignedIn, SignedOut, useAuth} from "@clerk/nextjs";
import Barcoin from "@/components/Homepage/barcoin";
import CoinAllTable from "@/components/Homepage/CoinAllTable";
import Profit from "@/components/Profit/Profit";
import { createProfile } from "@/actions/Profile/action";
import { createCash } from "@/actions/Coin/action";


const Page = () => {
  const { isSignedIn } = useAuth(); 

  useEffect(() => {
    const createProfileAndCash = async () => {
        if (isSignedIn) {
            try {
                const res = await createProfile();
                if (res.success) {
                    await createCash(); // รอให้ createCash เสร็จก่อน
                }
            } catch (err) {
                console.error("Error creating profile or cash:", err);
            }
        }
    };

    createProfileAndCash();
}, [isSignedIn]);


  return (
    <div>
      <Barcoin />

      <SignedOut>
        <div className="my-20">
          <p className="text-3xl font-semibold">
            Welcome to{" "}
            <span className="text-5xl text-[#FF8247] font-bold">BitX</span>{" "}
          </p>
          <p className="text-ml mt-2 text-gray-600">
            We are excited to have all crypto traders here to practice and
            enhance their trading skills.
          </p>
        </div>
      </SignedOut>

      {/* <SignedIn>
        {loading ? (
          <p>กำลังตรวจสอบโปรไฟล์...</p>
        ) : (
          <div className="mt-10">
            <Profit />
          </div>
        )}
      </SignedIn> */}

      <CoinAllTable />
    </div>
  );
};

export default Page;
