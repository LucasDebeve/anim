import {getUser} from "@/src/query/user.query";
import {OrganizationForm} from "@/app/organizations/create/OrganizationForm";
import {createOrganizationAction} from "@/app/organizations/create/create-organization.action";

export default async function CreateOrganization() {
    const user = await getUser();

    return (
        <OrganizationForm user={user} onSubmit={createOrganizationAction}/>
    );
}