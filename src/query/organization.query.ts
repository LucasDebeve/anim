import {prisma} from "@/lib/prisma";

export const getAllOrganizations = () => prisma.organization.findMany({
    select: {
        id: true,
        name: true,
    }
});
