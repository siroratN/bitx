'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { addCash } from '@/actions/Cash/action';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    console.log(session_id);

    useEffect(() => {
        if (session_id) {
            const getData = async () => {
                try {
                    const data = await addCash(session_id as string);
                    console.log(data);
                } catch (error) {
                    console.error(error);
                }
            };

            getData();
        }
    }, [session_id]);

    return (
        <div className=" flex flex-col items-center justify-center p-4 mt-24">
            <div className="max-w-lg w-full text-center bg-white p-8 ">
                <DotLottieReact
                    src="https://lottie.host/42dc71a3-24e0-493d-917b-18862d9f4db3/jo1Izvisyg.lottie"
                    loop
                    autoplay
                />
                <h1 className="text-3xl font-bold text-green-600 mb-4">จ่ายเงินสำเร็จ</h1>
                <p className="text-lg text-gray-700">การทำรายการของคุณเสร็จสมบูรณ์แล้ว ขอบคุณที่ใช้บริการ</p>
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
};

export default SuccessPage;
