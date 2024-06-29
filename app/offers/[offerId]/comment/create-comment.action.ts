"use server";

import {getUser} from "@/src/query/user.query";
import {prisma} from "@/lib/prisma";
import {CreateCommentFormValues} from "@/app/offers/[offerId]/comment/CreateCommentForm";
import {revalidatePath} from "next/cache";


export async function createComment(offerId: string, parentId: string, values: CreateCommentFormValues) {
    // Create offer
    const user = await getUser();
    const comment = await prisma.comment.create({
        data: {
            userId: user.id,
            offerId: offerId,
            content: values.content,
            parentId: parentId === "" ? null : parentId,
        }
    });

    revalidatePath(`/offers/${offerId}`)
    return offerId;
}

