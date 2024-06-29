import {getAuthSession} from "@/lib/auth";
import {GetUserProfile} from "@/src/query/user.query";
import {notFound} from "next/navigation";
import { redirect } from 'next/navigation'

export default async function Page() {
    const session = await getAuthSession();
    const user = await GetUserProfile(session?.user.id ?? "");

    if (!user) {
        return notFound();
    }

    redirect(`/users/${user.id}`)
}