import {getAuthSession} from "@/lib/auth";
import {getAllOffers, getOfferCount} from "@/src/query/offer.query";
import {Offer} from "@/src/feature/offer/Offer";
import Link from "next/link";
import {PenBox} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import {SearchInput} from "@/src/feature/SearchInput";


export default async function Home({searchParams} : {
    searchParams: { [key: string]: string | undefined}
}) {
    const session = await getAuthSession();

    const pageLength = 6;

    const page = parseInt(searchParams['page'] || "1");

    const search = searchParams['search'];

    const offers = await getAllOffers(page, pageLength, session?.user.id, search?.trim());

    const offersCount = await getOfferCount(search?.trim());

    return (
        <>
            <div className="flex flex-row gap-4 justify-between mb-5">
                <h1 className="font-bold text-2xl">Offres d&apos;emploi</h1>
                {session?.user ? (
                    <Link href="/offers/create" className={buttonVariants({
                        variant: "outline",
                    })}>
                        <PenBox size={20} />
                    </Link>
                ) : null}
            </div>
            <SearchInput defaultValue={search} nbResults={offersCount}/>
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