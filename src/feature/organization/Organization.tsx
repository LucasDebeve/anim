import {OrganizationHome} from "@/src/query/organization.query";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Rate} from "@/src/feature/organization/Rate";

type OrganizationProps = {
    organization: OrganizationHome;
    isCard?: boolean;
}

export function Organization({organization, isCard} : OrganizationProps) {
    let averageRate = 0;

    if (organization.evaluations.length > 0) {
        organization.evaluations.forEach((evaluation) => {
            const averageLocalRate = evaluation.rates.reduce((acc, rate) => acc + rate.value, 0) / evaluation.rates.length;
            averageRate += averageLocalRate;
        })
        averageRate = averageRate / organization.evaluations.length;
    }

    return (
        <Card className={isCard ? "" : "border-none shadow-none"}>
            <Avatar size="lg">
                <AvatarImage src={organization.image} alt={organization.name}/>
                <AvatarFallback>{organization.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Link href={`/organizations/${organization.id}`}
                  className="text-lg text-foreground font-semibold">{organization.name}</Link>
            <div className="flex gap-4 items-center py-1">
                <Rate value={averageRate}/>
                <span className="text-xs text-muted-foreground">
                    {organization._count.evaluations} {organization._count.evaluations > 1 ? "évaluations" : "évaluation"}
                </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
                {organization.bio}
            </p>
            <div className="mt-2 flex items-center justify-between gap-1 w-full">
                <span className="text-xs text-muted-foreground">
                    Créée le {new Date(organization.createdAt).toLocaleDateString()}
                </span>
                <div className="text-xs text-muted-foreground space-x-3">
                    <span>
                        {organization._count.offers} {organization._count.offers > 1 ? "offres" : "offre"}
                    </span>
                </div>
            </div>
        </Card>
    );
}