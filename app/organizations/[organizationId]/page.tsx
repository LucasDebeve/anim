import {getAuthSession} from "@/lib/auth";
import {getOrganizationView} from "@/src/query/organization.query";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {notFound} from "next/navigation";

export default async function Page({params}: {
    params: {
        organizationId: string;
    }
}) {
    const session = await getAuthSession()

    const organization = await getOrganizationView(params.organizationId, session?.user.id);

    if (!organization) {
        return notFound();
    }

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-center">{organization.name}</h1>
            <div className="flex gap-4 my-3">
                <Avatar size="xl">
                    <AvatarImage src={organization.image} alt={organization.name}/>
                    <AvatarFallback>
                        {organization.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <Link href={""} className="text-sm font-semibold underline hover:text-secondary-foreground">Site web</Link>
                </div>
            </div>
            <p className="text-sm text-foreground">{organization.bio}</p>
        </div>
    );
}