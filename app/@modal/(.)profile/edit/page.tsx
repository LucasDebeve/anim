import {getAuthSession} from "@/lib/auth";
import {GetUserProfile} from "@/src/query/user.query";
import {notFound} from "next/navigation";
import { redirect } from 'next/navigation'
import {editProfile} from "@/app/profile/edit/edit-profile.action";
import {EditProfileModal} from "@/app/@modal/(.)profile/edit/EditProfileModal";

export default async function Page() {
    const session = await getAuthSession();
    const user = await GetUserProfile(session?.user.id ?? "");

    if (!user) {
        return notFound();
    }

    return (
        <EditProfileModal user={user} editProfile={editProfile}/>
    );
}