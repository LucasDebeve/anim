import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";

const OrganizationSelect = {
    id: true,
    name: true,
    bio: true,
    image: true,
    createdAt: true,
    evaluations: {
        select: {
            id: true,
            rates: {
                select: {
                    value: true,
                }
            },
        }
    },
};

export const getAllOrganizationsShort = () => prisma.organization.findMany({
    select: {
        id: true,
        name: true,
    }
});

type OrderBy = {
    [key: string]: 'asc' | 'desc';
}

export const getOrganizations = (page: number, pageLength: number, search: string | undefined, orderBy: OrderBy[]) => {
    const where: Prisma.OrganizationWhereInput = {};
    if (search) {
        where['name'] = {
            contains: search,
        }
    }

    console.log(where);

    return prisma.organization.findMany({
        skip: (page - 1) * pageLength,
        take: pageLength,
        where,
        orderBy: orderBy,
        select: {
            ...OrganizationSelect,
            _count: {
                select: {
                    evaluations: true,
                    offers: true,
                }
            }
        }
    })
};

export const getOrganizationCount = () => prisma.organization.count();

export type OrganizationHome = Prisma.PromiseReturnType<typeof getOrganizations>[number];