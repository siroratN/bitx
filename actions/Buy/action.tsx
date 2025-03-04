'use server'

import db from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server';

export async function buyCoin(params: { coinId: string; price: number; quantity: number }) {
    try {
        const user = await currentUser();
        if (!user) {
            return { message: "User not authenticated" };
        }

        const getuser = await db.profile.findFirst({
            where: { clerkId: user.id },
        });

        if (!getuser) {
            return { message: "User profile not found" };
        }

        const { coinId, price, quantity } = params;

        const existingAsset = await db.asset.findFirst({
            where: {
                ownerId: getuser.id,
                name: coinId,
            },
        });

        const cash = await db.asset.findFirst({
            where: {
                ownerId: getuser.id,
                name: 'Cash',
            },
        });

        if (!cash) {
            return { message: "No cash" };
        }

        if (cash.totalSpent < price) {
            return { message: "เงินไม่พอ" };
        }

        await db.asset.update({
            where: { id: cash.id },
            data: {
                totalSpent: cash.totalSpent - price,
            },
        });

        let asset;

        if (existingAsset) {
            asset = await db.asset.update({
                where: { id: existingAsset.id },
                data: {
                    totalSpent: { increment: Number(price) },
                    quantity: { increment: Number(quantity) },
                },
            });
        } else {
            asset = await db.asset.create({
                data: {
                    name: coinId,
                    ownerId: getuser.id,
                    totalSpent: Number(price),
                    quantity: Number(quantity),
                },
            });
        }

        await db.transaction.create({
            data: {
                type: "BUY",
                profileId: getuser.id,
                assetId: asset.id,
                quantity: Number(quantity),
                price: Number(price),
            },
        });

        return { success: true, asset };
    } catch (error) {
        console.error("Error buying coin:", error);
        return { error};
    }
}

export async function sellCoin(params: { coinId: string; price: number; quantity: number }) {
    try {
        const user = await currentUser();
        if (!user) {
            return { message: "User not authenticated" };
        }

        const getuser = await db.profile.findFirst({
            where: { clerkId: user.id },
        });

        if (!getuser) {
            return { message: "User profile not found" };
        }

        const { coinId, price, quantity } = params;
        console.log('edok', params);

        const existingAsset = await db.asset.findFirst({
            where: {
                ownerId: getuser.id,
                name: coinId,
            },
        });

        if (!existingAsset) {
            return { message: "No asset" };
        }

        if (existingAsset.quantity < quantity) {
            return { message: "เหรียญไม่พอ" };
        }

        const totalSpentdeduct = (existingAsset.totalSpent / existingAsset.quantity) * quantity;
        const profit = (price * quantity) - totalSpentdeduct;
        console.log('profit', profit);
        console.log('totalSpentdeduct', totalSpentdeduct);

        await db.asset.update({
            where: { id: existingAsset.id },
            data: {
                quantity: { decrement: Number(quantity) },
                totalSpent: existingAsset.totalSpent - totalSpentdeduct, // ✅ แก้ตรงนี้
            },
        });

        await db.asset.update({
            where: {
                ownerId_name: {
                    ownerId: getuser.id,
                    name: 'Cash',
                },
            },
            data: {
                totalSpent: {
                    increment: totalSpentdeduct + profit,
                },
            },
        });

        await db.transaction.create({
            data: {
                type: "SELL",
                profileId: getuser.id,
                assetId: existingAsset.id,
                quantity: Number(quantity),
                price: Number(price),
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error selling coin:", error);
        return { error };
    }
}
