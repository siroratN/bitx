'use server'

import db from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server';

export async function FetchTransaction () {
    try {
        const user = await currentUser();
        if (!user) {
            return { message: "User not authenticated" };
        }

        const userProfile = await db.profile.findFirst({
            where: { clerkId: user.id },
        });

        if (!userProfile) {
            return { message: "User profile not found" };
        }

        const transaction = await db.transaction.findMany({
            where: {
                profileId: userProfile.id,
            },
            include: { 
                asset: true
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
        

        return { transaction };
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return { error };
    }
}