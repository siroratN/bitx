'use server'

import db from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server';

export async function FetchCash () {
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

        const cash = await db.asset.findFirst({
            where: {
                ownerId: getuser.id,
                name: 'Cash',
            },
        });

        return { cash };
    } catch (error) {
        console.error("Error fetching cash:", error);
        return { error };
    }
}