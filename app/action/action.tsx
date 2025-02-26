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
