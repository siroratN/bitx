'use client'
import React from 'react'
// import { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const cancel = () => {
    return (
        <div className=" flex flex-col items-center justify-center p-4 mt-24">
            <div className="max-w-lg w-full text-center bg-white dark:bg-transparent p-8 ">
                <DotLottieReact
                    src="https://lottie.host/68b13b30-7c98-47a7-b4bb-a4b9bb04d23b/ePmv7lb6u4.lottie"
                    loop
                    autoplay
                />
                <h1 className="text-3xl font-bold text-red-600 mb-4">ยกเลิกการทำรายการ</h1>
                <p className="text-lg text-gray-700 dark:text-white">การทำรายการของคุณถูกยกเลิกแล้ว ขอบคุณที่ใช้บริการ</p>
                <div className="mt-8">
                    {/* <button
                        onClick={() => window.location.href = '/'}
                        className="bg-green-400 text-white px-6 py-3 rounded-sm hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300">
                        กลับไปหน้าหลัก
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default cancel
