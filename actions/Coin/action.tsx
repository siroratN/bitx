'use server'

import db from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server';

export async function createCash() {
    try {
        const user = await currentUser();
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
                ownerId: getUser.id
            },
        });

        if (existingCash) {
            return { message: "Cash already exists", cash: existingCash };
        }


        const cash = await db.asset.create({
            data: { name: "Cash", totalSpent: 10000, ownerId: getUser.id }
        });

        return { message: "Create cash success", cash };
    } catch (err) {
        console.log(err);
        return { message: "An error occurred", error: err };
    }
}


export async function getAllAsset(){
    try{
        const user = await currentUser();
        const getUser = db.profile.findFirst({
            where:{
                clerkId : user.id
            }
        })
        return {result: getUser}
    }catch(error){
        console.log(error)
        return {message: 'error now???', error: error}
    }
}
