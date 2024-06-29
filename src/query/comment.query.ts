import {prisma} from "@/lib/prisma";

export const getComment = (commentId: string) => prisma.comment.findUnique({
    where: {
        id: commentId,
    },
    select: {
        id: true,
        content: true,
        createdAt: true,
        parentId: true,
        user: {
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
            }
        }
    }
});