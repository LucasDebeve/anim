import {OfferHome} from "@/src/query/offer.query";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {Heart, MessageCircle} from "lucide-react";
import {round} from "@floating-ui/utils";
import {OfferDetails} from "@/src/feature/offer/offerDetails";
import {clsx} from "clsx";
import {LikeButton} from "@/src/feature/offer/LikeButton";

type OfferProps = {
    offer: OfferHome;
    isCard?: boolean;
    hasHeart?: boolean;
}

export function Offer({offer, isCard = true, hasHeart = true}: OfferProps) {
    return (
        <OfferLayout user={offer.user} offerId={offer.id} createdAt={offer.createdAt} className={isCard ? "" : "border-none shadow-none"} hasHeart={hasHeart}>
            <Link href={`/offers/${offer.id}`} className="text-foreground font-semibold">
                {offer.title}
            </Link>
            <p className="text-sm text-muted-foreground">
                {offer.description}
            </p>
            {offer.complete ? (
                <div className="bg-accent text-accent-foreground text-center py-2">
                    <p className="text-lg font-bold">Equipe complète</p>
                </div>
            ) : null}
            <OfferDetails offer={offer}/>
            <div className="flex gap-3">
                <LikeButton offerId={offer.id} isLiked={offer.likes.length > 0} countLike={round(offer._count.likes)}/>
                <Link href={`/offers/${offer.id}/comment`} className={clsx(buttonVariants({
                    variant: "ghost",
                }), "flex items-center !justify-start gap-1 min-w-[5rem]")}>
                    <MessageCircle size={16}/>
                    {offer._count.comments}
                </Link>
            </div>
        </OfferLayout>
    );
}