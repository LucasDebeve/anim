import {getUser} from "@/src/query/user.query";
import {CreateForm} from "@/app/offers/create/CreateForm";
import {createOfferAction} from "@/app/offers/create/create-offer.action";
import {getAllContracts} from "@/src/query/contract.query";
import {getAllOrganizationsShort} from "@/src/query/organization.query";
import {SelectItem} from "@/components/ui/select";
import {getAllTypes} from "@/src/query/types.query";

export default async function CreateOffer() {
    const user = await getUser();

    const contracts = await getAllContracts();

    const types = await getAllTypes();

    const organizations = await getAllOrganizationsShort();

    return (
        <CreateForm user={user} onSubmit={createOfferAction} allContracts={(
            contracts ? contracts.map((contract: any) => (
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
            types ? types.map((type: any) => (
                <SelectItem value={type.id} key={type.id}>
                    {type.title}
                </SelectItem>
            )) : (
                <SelectItem value="0">
                    Aucun type
                </SelectItem>
            )
        )} allOrganization={organizations}/>
    );
}