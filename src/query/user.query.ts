import {getAuthSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";

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