"use server";

import {getAuthSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const likeAction = async (offerId: string) => {
    const session = await getAuthSession();

    if (!session?.user.id) {
        return;
    }

    const isLiked = await prisma.like.findFirst({
        where: {
            offerId,
            userId: session.user.id
        }
    })

    if(isLiked) {
        await prisma.like.delete({
            where: {
                id: isLiked.id
            }
        });
    } else {
        await prisma.like.create({
            data: {
                offerId,
                userId: session.user.id
            }
        });
    }

    revalidatePath("/");
    revalidatePath(`/offers/${offerId}`);
};