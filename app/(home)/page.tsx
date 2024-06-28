import {getAuthSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {Card} from "@/components/ui/card";
import {getLatestOffers} from "@/src/query/offer.query";
import {Offer} from "@/src/feature/offer/Offer";

export default async function Home() {
    const session = await getAuthSession();

    const offers = await getLatestOffers()

    return (
        <div className="flex flex-col gap-3">
            {offers.map((offer, index) => {
               return (
                   <Offer offer={offer} key={offer.id} />
               );
            })}
        </div>
    );
}