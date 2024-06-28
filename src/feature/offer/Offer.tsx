import {OfferHome} from "@/src/query/offer.query";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";
import {round} from "@floating-ui/utils";

type OfferProps = {
    offer: OfferHome;
}

export function Offer({offer}: OfferProps) {
    return (
        <OfferLayout user={offer.user} offerId={offer.id} createdAt={offer.createdAt}>
            <Link href={`/offer/${offer.id}`} className="text-foreground font-semibold">
                {offer.title}
            </Link>
            <p className="text-sm text-muted-foreground">
                {offer.description}
            </p>
            <hr className="mt-2"/>
            <div className="py-2 flex flex-row gap-2 justify-between">
                <div>
                    <p className="font-semibold">
                        Type
                    </p>
                    <p>
                        {offer.offerType.title}
                    </p>
                </div>
                <div>
                    <p className="font-semibold">
                        Tranche d'âge
                    </p>
                    <p>
                        {offer.age_min} - {offer.age_max} ans
                    </p>
                </div>
                <div>
                    <p className="font-semibold">
                        Contrat
                    </p>
                    <p>
                        {offer.contract.title}
                    </p>
                </div>
                <div>
                    <p className="font-semibold">
                        Rémunération
                    </p>
                    <p>
                        {offer.contract.title === "CEE" ? `${offer.remuneration.toFixed(2)}€/jour` : `${offer.remuneration.toFixed(2)}€/h`}
                    </p>
                </div>
            </div>
            <hr  className="mb-2"/>
            <div>
                <Link href={`/offers/${offer.id}`}
                      className="text-sm">{offer._count.likes} {offer._count.likes === 1 ? "like" : "likes"}</Link>
            </div>
        </OfferLayout>
    );
}