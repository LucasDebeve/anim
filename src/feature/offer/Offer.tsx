import {OfferHome} from "@/src/query/offer.query";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";
import {round} from "@floating-ui/utils";
import {OfferDetails} from "@/src/feature/offer/offerDetails";

type OfferProps = {
    offer: OfferHome;
}

export function Offer({offer}: OfferProps) {
    return (
        <OfferLayout user={offer.user} offerId={offer.id} createdAt={offer.createdAt}>
            <Link href={`/offers/${offer.id}`} className="text-foreground font-semibold">
                {offer.title}
            </Link>
            <p className="text-sm text-muted-foreground">
                {offer.description}
            </p>
            <OfferDetails offer={offer}/>
            <div>
                <Link href={`/offers/${offer.id}`}
                      className="text-sm">{offer._count.likes} {offer._count.likes === 1 ? "like" : "likes"}</Link>
            </div>
        </OfferLayout>
    );
}