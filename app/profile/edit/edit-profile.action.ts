"use server";

import {ProfileFormType} from "@/app/profile/edit/ProfileForm";
import {getAuthSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";

export const editProfile = async (values: ProfileFormType) => {
    const session = await getAuthSession();

    if(!session) {
        throw new Error("L'utilisateur n'est pas connecté");
    }

    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: values
    });

    return "/profile";
};