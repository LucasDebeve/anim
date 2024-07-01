"use server";

import {OrganizationFormValues} from "@/app/organizations/create/OrganizationForm";
import {getUser} from "@/src/query/user.query";
import {prisma} from "@/lib/prisma";

export async function createOrganizationAction(values: OrganizationFormValues) {
    console.log(values);

    const user = await getUser();
    const organization = await prisma.organization.create({
        data: {
            name: values.name,
            bio: values.bio,
            userId: user.id,
            image: values.image,
        }
    });

    return organization.id;
}