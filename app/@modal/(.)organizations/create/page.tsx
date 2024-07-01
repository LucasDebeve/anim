import {getUser} from "@/src/query/user.query";
import {OrganizationModal} from "@/app/@modal/(.)organizations/create/OrganizationModal";
import {createOrganizationAction} from "@/app/organizations/create/create-organization.action";

export default async function Page() {
    const user = await getUser();

    return (
        <OrganizationModal user={user} createOrganizationAction={createOrganizationAction}/>
    );
}