import {prisma} from "@/lib/prisma";

export const getAllTypes = () => prisma.offerType.findMany({
    select: {
        id: true,
        title: true,
    }
});
