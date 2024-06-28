import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export const getLatestOffers = (userId?:string) => prisma.offer.findMany({
    take: 20,
    orderBy: {
        createdAt: 'desc',
    },
    select: {
        id: true,
        title: true,
        description: true,
        remuneration: true,
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
    }
});

export type OfferHome = Prisma.PromiseReturnType<typeof getLatestOffers>[number];