import {getAuthSession} from "@/lib/auth";
import {getOfferView} from "@/src/query/offer.query";
import {notFound} from "next/navigation";
import {OfferDetails} from "@/src/feature/offer/offerDetails";

export default async function OfferView({
    params,
}: {params: {
    offerId: string
}
}) {
    const session = await getAuthSession()

    const offer = await getOfferView(params.offerId, session?.user.id);

    if (!offer) {
        return notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">{offer.title}</h1>
            <p>{offer.description}</p>
            <OfferDetails offer={offer}/>
        </div>
    )
}