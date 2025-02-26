'use server';

import db from "@/utils/db";

export async function getProfile(clerkId) {
    try {
        const profile = await db.profile.findUnique({
            where: { clerkId },
        });

        if (!profile) {
            throw new Error("Profile not found");
        }

        return profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { error: error.message };
    }
}

export async function buyCoin(params:type) {
    try {
        const { clerkId, coinId, amount, price } = params;
        const profile = await db.profile.findUnique({
            where: { clerkId },
        });

        if (!profile) {
            throw new Error("Profile not found");
        }


        await db.asset.create({
            data:{
                crypto: coinId,
                ownerId: profile.id,
                totalSpent: Number(totalSpent) + Number(price),
            }
        });

        // await db.transaction.create({
        //     data: {
        //         clerkId,
        //         coinId,
        //         amount,
        //         price,
        //     },
        // });

        await db.profile.update({
            where: { clerkId },
            data: {
                balance: profile.balance - amount * price,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error buying coin:", error);
        return { error: error.message };
    }
}