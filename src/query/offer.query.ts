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
    select: offerSelectQuery(userId),
});

export const getOfferView = (offerId: string, userId?: string) => prisma.offer.findUnique({
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
});

export const getOffer = (offerId: string, userId?: string) => prisma.offer.findUnique({
    where: {
        id: offerId,
    },
    select: {
        ...offerSelectQuery(userId),
    }
});

export type OfferHome = Prisma.PromiseReturnType<typeof getLatestOffers>[number];