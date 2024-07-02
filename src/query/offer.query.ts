import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export const offerSelectQuery = (userId?: string) => ({
    id: true,
    title: true,
    description: true,
    remuneration: true,
    image: true,
    age_min: true,
    age_max: true,
    beginAt: true,
    endAt: true,
    city: true,
    complete: true,
    postal_code: true,
    country: true,
    interAccepted: true,
    organization: {
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    evaluations: true,
                }
            },
        }
    },
    contract: {
        select: {
            id: true,
            title: true,
        }
    },
    user: {
        select: {
            id: true,
            name: true,
            username: true,
            image: true,
        }
    },
    offerType: {
        select: {
            id: true,
            title: true,
        }
    },
    createdAt: true,
    _count: {
        select: {
            likes: true,
            comments: true,
        }
    },
    likes: {
        select: {
            userId: true,
        },
        where: {
            userId: userId ?? 'error',
        }
    },
} satisfies Prisma.OfferSelect);

export const getLatestOffers = (userId?:string) => prisma.offer.findMany({
    take: 20,
    orderBy: {
        createdAt: 'desc',
    },
    where: {
        endAt: {
            gte: new Date(),
        },
        complete: false,
    },
    select: offerSelectQuery(userId),
});

export const getAllOffers = (page: number, pageLength: number, userId?:string, search?: string,) => {
    const where: Prisma.OfferWhereInput = {};

    if (search) {
        where.OR = [
            {title: {contains: search}},
            {description: {contains: search}},
            {city: {contains: search}},
            {country: {contains: search}},
        ];
    }

    return prisma.offer.findMany({
        take: pageLength,
        skip: (page - 1) * pageLength,
        orderBy: {
            createdAt: 'desc',
        },
        where,
        select: offerSelectQuery(userId),
    })
};

export const getOfferView = async (offerId: string, userId?: string) => {
    return prisma.offer.findUnique({
        where: {
            id: offerId,
        },
        select: {
            ...offerSelectQuery(userId),
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    parent: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            image: true,
                        }
                    }
                }
            }
        }
    })
};

export const getOffer = (offerId: string, userId?: string) => prisma.offer.findUnique({
    where: {
        id: offerId,
    },
    select: {
        ...offerSelectQuery(userId),
    }
});

export const getOfferCount = (search?: string) => {
    const where: Prisma.OfferWhereInput = {};

    if (search) {
        where.OR = [
            {title: {contains: search}},
            {description: {contains: search}},
            {city: {contains: search}},
            {country: {contains: search}},
        ];
    }

    return prisma.offer.count({
        where,
    })
};

export type OfferHome = Prisma.PromiseReturnType<typeof getLatestOffers>[number];