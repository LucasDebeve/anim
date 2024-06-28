import {getAuthSession} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {Card} from "@/components/ui/card";
import {getLatestOffers} from "@/src/query/offer.query";
import {Offer} from "@/src/feature/offer/Offer";
import Link from "next/link";
import {PenBox} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import {clsx} from "clsx";

export default async function Home() {
    const session = await getAuthSession();

    const offers = await getLatestOffers()

    return (
        <>
            <div className="flex flex-row gap-4 justify-between mb-5">
                <h1 className="font-bold text-2xl">Offres d'emploi</h1>
                {session?.user ? (
                    <Link href="/offers/create" className={buttonVariants({
                        variant: "outline",
                    })}>
                        <PenBox size={20} />
                    </Link>
                ) : null}
            </div>
            <div className="flex flex-col gap-3">
                {offers.map((offer, index) => {
                   return (
                       <Offer offer={offer} key={offer.id} />
                   );
                })}
            </div>
        </>
    );
}