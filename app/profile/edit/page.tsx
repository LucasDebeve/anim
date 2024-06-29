import {getUser} from "@/src/query/user.query";
import {ProfileForm} from "@/app/profile/edit/ProfileForm";
import {editProfile} from "@/app/profile/edit/edit-profile.action";

export default async function Page() {
    const user = await getUser();

    return (
        <div className="h-full flex items-center">
            <div className="bg-card border rounded-md border-border p-4 flex-1">
                <ProfileForm onSubmit={editProfile} user={user} />
            </div>
        </div>
    );
}