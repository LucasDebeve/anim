"use client";

import {usePathname, useRouter} from "next/navigation";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {User} from "@prisma/client";
import {OrganizationForm, OrganizationFormValues} from "@/app/organizations/create/OrganizationForm";

export function OrganizationModal({user, createOrganizationAction}: {
    user: User,
    createOrganizationAction: (values: OrganizationFormValues) => Promise<string>,
}) {
    const router = useRouter();

    const pathname = usePathname();

    return (
        <Dialog open={pathname === '/organizations/create'}
                onOpenChange={() => {
                    router.back();
                }}>
            <DialogContent className="max-h-[100svh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Créer un organisme</DialogTitle>
                </DialogHeader>
                <OrganizationForm user={user} onSubmit={createOrganizationAction} />
            </DialogContent>
        </Dialog>
    );
}