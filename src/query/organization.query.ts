import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import {offerSelectQuery} from "@/src/query/offer.query";

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

export const getOrganizations = async (page: number, pageLength: number, search: string | undefined, orderBy: OrderBy[]) => {
    const where: Prisma.OrganizationWhereInput = {};
    if (search) {
        where.name = {
            contains: search,
        }
    }

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

export const getOrganizationView = (organizationId: string, userId?: string) => prisma.organization.findUnique({
    where: {
        id: organizationId,
    },
    select: {
        ...OrganizationSelect,
        offers: {
            select: offerSelectQuery(userId),
            orderBy: {
                createdAt: 'desc',
            }
        },
        _count: {
            select: {
                offers: true,
                evaluations: true,
            }
        }
    }
});

export const getOrganizationCount = (search?: string) => {
    const where: Prisma.OrganizationWhereInput = {};

    if (search) {
        where.name = {
            contains: search,
        }
    }

    return prisma.organization.count({
        where,
    })
};

export type OrganizationHome = Prisma.PromiseReturnType<typeof getOrganizations>[number];