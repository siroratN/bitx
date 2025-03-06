'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { addCash } from '@/actions/Cash/action';

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
        <div>
            <h1>จ่ายเงินสำเร็จ</h1>
        </div>
    );
};

export default SuccessPage;
