'use server'

import db from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server';


async function getUserProfile() {
    const user = await currentUser();
    if (!user) {
        return null;
    }

    const getUser = await db.profile.findFirst({
        where: {
            clerkId: user.id
        }
    });

    return getUser;
}

export async function getFav() {
    try {
        const getUser = await getUserProfile();
        
        if (!getUser) {
            return { message: 'User profile not found' }; 
        }

        const getFav = await db.favorite.findMany({
            where: {
                profileId: getUser.id
            }
        });

        return getFav.length > 0 ? getFav : []; 

    } catch (error) {
        console.log('Error in getFav:', error);
        return { message: 'An error occurred while fetching favorites' }; 
    }
}

export async function addFav(coinName: string) {
    try {
        const getUser = await getUserProfile();
        
        if (!getUser) {
            return { message: 'User profile not found' };
        }


        const addFavTable = await db.favorite.create({
            data: {
                profileId: getUser.id,
                coinName: coinName,
            }
        });
        
        console.log('เพิ่มสำเร็จ')
        return { data: addFavTable, message: 'Add favorite success' };

    } catch (error) {
        return { message: 'Error adding favorite', error: error };
    }
}

export async function unFav(coinName: string) {
    try {
        const getUser = await getUserProfile();

        if (!getUser) {
            return { message: 'User profile not found' };
        }

        const favorite = await db.favorite.findFirst({
            where: {
                    profileId: getUser.id,
                    coinName: coinName
            }
        });

        if (!favorite) {
            return { message: 'Favorite not found' };
        }

        await db.favorite.delete({
            where: {
                id: favorite.id
            }
        });

        return { message: 'Removed favorite success' };

    } catch (error) {
        console.log('Error in unFav:', error);
        return { message: 'Error removing favorite' };
    }
}
