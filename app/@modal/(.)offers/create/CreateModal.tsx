"use client";

import {usePathname, useRouter} from "next/navigation";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {CreateForm, CreateFormValues} from "@/app/offers/create/CreateForm";
import {User} from "@prisma/client";
import {SelectItem} from "@/components/ui/select";

export function CreateModal({user, allContracts, allTypes, allOrganizations, createOfferAction}: {
    user: User,
    allContracts: any,
    allTypes: any,
    allOrganizations: any,
    createOfferAction: (values: CreateFormValues) => Promise<string>,
}) {
    const router = useRouter();

    const pathname = usePathname();

    return (
        <Dialog open={pathname === '/offers/create'}
                onOpenChange={() => {
                    router.back();
                }}>
            <DialogContent className="max-h-[100svh] overflow-y-auto">
                <CreateForm user={user} onSubmit={createOfferAction} allContracts={(
                    allContracts ? allContracts.map((contract: any) => (
                        <SelectItem value={contract.id} key={contract.id}>
                            {contract.title}
                        </SelectItem>
                    )) : (
                        <SelectItem value="0">
                            Aucun contrat
                        </SelectItem>
                    )
                )
                } allTypes={(
                    allTypes ? allTypes.map((type: any) => (
                        <SelectItem value={type.id} key={type.id}>
                            {type.title}
                        </SelectItem>
                    )) : (
                        <SelectItem value="0">
                            Aucun type
                        </SelectItem>
                    )
                )} allOrganization={allOrganizations}/>
            </DialogContent>
        </Dialog>
    );
}