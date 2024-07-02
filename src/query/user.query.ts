import {getAuthSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import {offerSelectQuery} from "@/src/query/offer.query";

const userQuery = {
    id: true,
    name: true,
    username: true,
    email: true,
    image: true,
    createdAt: true,
    bio: true,
} satisfies Prisma.UserSelect;

export const getUser = async () => {
    const session = await getAuthSession();

    if (!session?.user.id) {
        throw new Error("User not found");
    }

    return prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        }
    });
};

export const GetUserProfile = async (userId: string, connectedUserId?: string) => {
    await new Promise((resolve) => {setTimeout(resolve, 1000)});

    return prisma.user.findFirst({
        where: {
            OR: [
                {
                    username: userId
                },
                {
                    id: userId
                }
            ]
        },
        select: {
            ...userQuery,
            _count: {
                select: {
                    offers: true,
                    likes: true,
                    comments: true
                }
            },
            offers: {
                select: offerSelectQuery(connectedUserId ?? userId),
                take: 10,
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });
};

export const getUserEdit = async () => {
    const session = await getAuthSession();

    if (!session?.user.id) {
        throw new Error("Pas de session utilisateur");
    }

    return prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        },
        select: userQuery,
    });
}

export type UserEdit = NonNullable<Prisma.PromiseReturnType<typeof getUserEdit>>;

export type UserProfile = NonNullable<Prisma.PromiseReturnType<typeof GetUserProfile>>;