import {getUser} from "@/src/query/user.query";
import {getAllContracts} from "@/src/query/contract.query";
import {getAllTypes} from "@/src/query/types.query";
import {getAllOrganizations} from "@/src/query/organization.query";
import {CreateModal} from "@/app/@modal/(.)offers/create/CreateModal";
import {createOfferAction} from "@/app/offers/create/create-offer.action";

export default async function Page() {
    const user = await getUser();

    const contracts = await getAllContracts();

    const types = await getAllTypes();

    const organizations = await getAllOrganizations();

    return (
            <CreateModal user={user} allContracts={contracts} allTypes={types} allOrganizations={organizations} createOfferAction={createOfferAction}/>
    );
}