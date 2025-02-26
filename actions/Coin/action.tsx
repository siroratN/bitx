'use server'

import db from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server';

export async function createCash() {
    try {
        const user = await currentUser();
        if (!user) {
            return { message: "User not authenticated" };
        }

        const getuser = await db.profile.findFirst({
            where: {
                clerkId: user.id
            },
        });

        if (!getuser) {
            return { message: "User profile not found" };
        }

        const existingCash = await db.asset.findFirst({
            where: {
                name: "Cash",
                ownerId: getuser.id
            },
        });

        if (existingCash) {
            return { message: "Cash already exists", cash: existingCash };
        }


        const cash = await db.asset.create({
            data: { name: "Cash", totalSpent: 10000, ownerId: getuser.id }
        });

        return { message: "Create cash success", cash };
    } catch (err) {
        console.log(err);
        return { message: "An error occurred", error: err };
    }
}
