import {OfferHome} from "@/src/query/offer.query";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {Heart, MessageCircle} from "lucide-react";
import {round} from "@floating-ui/utils";
import {OfferDetails} from "@/src/feature/offer/offerDetails";
import {clsx} from "clsx";

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
            <div className="flex gap-3">
                <Button className="flex items-center gap-1">
                    <Heart size={16}/>
                    <span>{round(offer._count.likes)}</span>
                </Button>
                <Link href={`/offers/${offer.id}/comment`} className={clsx("flex items-center gap-1", buttonVariants({
                    variant: "outline",
                }))}>
                    <MessageCircle size={16}/>
                    {offer._count.comments}
                </Link>
            </div>
        </OfferLayout>
    );
}