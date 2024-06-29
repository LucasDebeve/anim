"use server";

import {CreateFormValues} from "@/app/offers/create/CreateForm";
import {getUser} from "@/src/query/user.query";
import {prisma} from "@/lib/prisma";

export async function createOfferAction(values: CreateFormValues) {
    // Create offer
    console.log("I'm on the server!");
    const user = await getUser();
    const offer = await prisma.offer.create({
        data: {
            title: values.title,
            description: values.description,
            remuneration: values.remuneration,
            userId: user.id,
            contractId: values.contract,
            beginAt: values.dateRange.from,
            endAt: values.dateRange.to,
            offerTypeId: values.offerType,
            age_min: values.age_min || 0,
            age_max: values.age_max || 18,
            city: values.city || "",
            postal_code: values.zip || "",
            country: values.country,
            organizationId: values.organization,
            interAccepted: values.intern || false,
        }
    });

    return offer.id;
}