import {getAuthSession} from "@/lib/auth";
import {getOfferView} from "@/src/query/offer.query";
import {notFound} from "next/navigation";
import {OfferDetails} from "@/src/feature/offer/offerDetails";
import {Card} from "@/components/ui/card";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";

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
        <>
            <img src={"https://images.unsplash.com/photo-1496718412302-96e78da39b72?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                 alt={offer.title}
                 className="fixed left-0 w-[50svw] top-14 h-[calc(100%-3.5rem)] object-cover"/>
            <div className="fixed left-[50svw] w-[50svw] top-14 h-[calc(100%-3.5rem)] overflow-y-auto py-6 px-12 bg-background z-20">
                <h1 className="text-2xl font-bold">{offer.title}</h1>
                <p>{offer.description}</p>
                <OfferDetails offer={offer}/>
                <p>{offer._count.comments} commenatires</p>
                <div className="flax flex-col gap-2">
                    {offer.comments.map((comment) => (
                        <OfferLayout user={comment.user} createdAt={comment.createdAt}>
                            <p>{comment.content}</p>
                        </OfferLayout>
                    ))}
                </div>
            </div>
        </>
    )
}