"use server";

import {CreateFormValues} from "@/app/offers/create/CreateForm";
import {getUser} from "@/src/query/user.query";
import {prisma} from "@/lib/prisma";

export async function createOfferAction(values: CreateFormValues) {
    // Create offer
    console.log("I'm on the server!");
    const user = await getUser();

    // console.log({
    //     data: {
    //         title: values.title,
    //         description: values.description,
    //         remuneration: values.remuneration,
    //         userId: user.id,
    //         contractId: values.contract,
    //         beginAt: values.dateRange.from,
    //         endAt: values.dateRange.to,
    //         offerTypeId: values.offerType,
    //         age_min: 0,
    //         age_max: 0,
    //         city: "",
    //         postal_code: "",
    //         country: "",
    //         organizationId: "0",
    //         interAccepted: false,
    //     }
    // });
    // console.log(user);

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
            age_min: 0,
            age_max: 0,
            city: "",
            postal_code: "",
            country: "",
            organizationId: "0",
            interAccepted: false,
        }
    });

    return offer.id;
}