import {getAuthSession} from "@/lib/auth";
import {GetUserProfile} from "@/src/query/user.query";
import {Profile} from "@/app/users/[userId]/Profile";
import {notFound} from "next/navigation";

export default async function Page({params} : {
    params: {
        userId: string;
    }
}) {
    const session = await getAuthSession();
    const user = await GetUserProfile(params.userId);

    if (!user) {
        return notFound();
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <Profile user={user} canEdit={session?.user.id === user.id}/>
    );
}