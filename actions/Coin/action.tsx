'use server'

import { FetchCoinData, FetchCoinDataDetail } from "@/data/fetchCoinData";
import { ErrorResponse, ProfitResult } from "@/utils/allType";
import db from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server';
import { Profit } from '@/components/Profit/Profit';

export async function createCash() {
    try {
        const user = await currentUser();
        // console.log(user);
        if (!user) {
            return { message: "User not authenticated" };
        }

        const getUser = await db.profile.findFirst({
            where: {
                clerkId: user.id
            },
        });

        if (!getUser) {
            return { message: "User profile not found" };
        }

        const existingCash = await db.asset.findFirst({
            where: {
                name: "Cash",
                ownerId: getUser.id,
            },
        });

        if (existingCash) {
            return { message: "Cash already exists", cash: existingCash };
        }


        const cash = await db.asset.create({
            data: { name: "Cash", totalSpent: 100000, ownerId: getUser.id }
        });

        return { message: "Create cash success", cash };
    } catch (err) {
        console.log(err);
        return { message: "error", error: err };
    }
}


export async function getAllAsset() {
    try {
        const user = await currentUser();
        const profile = await db.profile.findFirst({
            where: {
                clerkId: user.id
            },
            include: {
                assets: true
            }
        });

        if (!profile) {
            return { message: 'Profile not found' };
        }

        return { result: profile, massage: 'success' };
    } catch (error) {
        console.log(error);
        return { message: 'Error', error: error };
    }
}

export async function calProfit(coinName: string): Promise<ProfitResult | ErrorResponse> {
    console.log('กุส่งออะไรไป' , coinName)
    const user = await currentUser();
    if (!user) {
        return { success: false, errorType: "AUTH_ERROR", message: "User not authenticated" };
    }

    const getUser = await db.profile.findFirst({ where: { clerkId: user.id } });
    console.log(getUser)
    
    if (!getUser) {
        return { success: false, errorType: "PROFILE_NOT_FOUND", message: "User profile not found" };
    }

    const myCoin = await db.asset.findFirst({
        where: { ownerId: getUser.id, name: coinName }
    });

    console.log('ควยยย : ',myCoin)

    if (!myCoin) {
        return { success: false, errorType: "ASSET_NOT_FOUND", message: "No asset found or quantity is zero" };
    }

    if (myCoin.totalSpent === 0) {
        return { success: false, errorType: "INVALID_DATA", message: "Total spent cannot be zero" };
    }

    const nowCoin = await FetchCoinDataDetail(coinName);
    if (!nowCoin || !nowCoin.current_price || nowCoin.current_price <= 0) {
        return { success: false, errorType: "FETCH_ERROR", message: "Failed to fetch valid coin price" };
    }

    const avgPriceCoin = myCoin.totalSpent / myCoin.quantity;
    const hasPriceNow = nowCoin.current_price * myCoin.quantity;
    const hasPriceHold = avgPriceCoin * myCoin.quantity;
    const profitPercent = ((hasPriceNow - hasPriceHold) / hasPriceHold) * 100;

    return {
        myCoin,
        avgPriceCoin,
        hasPriceNow,
        hasPriceHold,
        resultProfit: hasPriceNow - hasPriceHold,
        resultProfitPercent: profitPercent
    };
}


export async function calAssettotal(allAssets) {
    try {
        let total_current_price = 0;
        const noCash = allAssets.filter((item) => item.name !== 'Cash');
        const Cash = allAssets.filter((item) => item.name === 'Cash');

        const totalSpent = noCash.reduce((result, item) => result + item.totalSpent, 0);

        for (const item of noCash) {
            const current_price = await FetchCoinDataDetail(item.name);
            total_current_price += (current_price.current_price * item.quantity);
        }

        const profitTotal = total_current_price - totalSpent;
        const profitTotalPecent = totalSpent > 0 ? (profitTotal / totalSpent) * 100 : 0;

        const total = totalSpent + (Cash[0]?.totalSpent || 0);

        return {
            total: Number(total),
            profitTotal: Number(profitTotal),
            profitTotalPecent: Number(profitTotalPecent),
          };
          
    } catch (error) {
        console.log("Error calculating total assets:", error);
        return {
            total: 0,
            profitTotal: 0,
            profitTotalPecent: 0
        };
    }
}

