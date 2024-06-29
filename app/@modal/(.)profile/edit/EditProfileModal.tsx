"use client";

import {UserEdit} from "@/src/query/user.query";
import {ProfileForm, ProfileFormType} from "@/app/profile/edit/ProfileForm";
import {usePathname, useRouter} from "next/navigation";
import {Dialog, DialogContent} from "@/components/ui/dialog";

export function EditProfileModal({user, editProfile} : {
    user: UserEdit;
    editProfile: (values: ProfileFormType) => Promise<string>;
}) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Dialog open={pathname?.includes('/profile/edit')}
                onOpenChange={() => {
                    router.back();
                }}>
            <DialogContent className="max-h-[100svh] overflow-y-auto">
                <ProfileForm user={user} onSubmit={editProfile}/>
            </DialogContent>
        </Dialog>
    );
}