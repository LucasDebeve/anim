import {prisma} from "@/lib/prisma";

export const getAllContracts = () => prisma.contract.findMany({
    select: {
        id: true,
        title: true,
    }
});
