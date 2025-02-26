'use server'

import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";

export async function createProfile() {
  try {
    const user = await currentUser();
    if (!user) return { error: "User not found" };

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const email = user.emailAddresses?.[0]?.emailAddress || "";

    const existingProfile = await db.profile.findUnique({
      where: { clerkId: user.id },
    });

    if (existingProfile) {
      console.log(existingProfile)
      return { success: true, profile: existingProfile };
    }

    const profile = await db.profile.create({
      data: { clerkId: user.id, firstName, lastName, email },
    });

    return { message: "Profile created", profile };
  } catch (error) {
    console.error("Error creating profile:", error.message || error);
    return { error: "Something went wrong", details: error.message };
  }
}
