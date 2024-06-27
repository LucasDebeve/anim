import {OfferHome} from "@/src/query/offer.query";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import Link from "next/link";

type OfferProps = {
    offer: OfferHome;
}

export function Offer({offer}: OfferProps) {
    return (
        <OfferLayout user={offer.user} offerId={offer.id} createdAt={offer.createdAt}>
            <Link href={`/offer/${offer.id}`} className="text-sm text-foreground">{offer.title}</Link>
        </OfferLayout>
    );
}