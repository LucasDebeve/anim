import {getAuthSession} from "@/lib/auth";
import {getOfferView} from "@/src/query/offer.query";
import {notFound} from "next/navigation";
import {OfferDetails} from "@/src/feature/offer/offerDetails";
import {Card} from "@/components/ui/card";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import {Reply} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";

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

    // Order replies by createdAt
    offer.comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return (
        <>
            <img src={"https://images.unsplash.com/photo-1496718412302-96e78da39b72?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                 alt={offer.title}
                 className="fixed left-0 w-[50svw] top-14 h-[calc(100%-3.5rem)] object-cover"/>
            <div className="fixed left-[50svw] w-[50svw] top-14 h-[calc(100%-3.5rem)] flex flex-col overflow-y-auto py-6 px-12 bg-background z-20">
                <h1 className="text-2xl font-bold">{offer.title}</h1>
                <p>{offer.description}</p>
                <OfferDetails offer={offer}/>
                <p>{offer._count.comments} commentaires</p>
                <div className="flex-1 flex flex-col gap-4">
                    {offer.comments.map((comment) => {
                        if (!comment.parent) {
                            return (
                                <OfferLayout user={comment.user} createdAt={comment.createdAt} hasHeart={false}>
                                    <p>{comment.content}</p>
                                    <div className="flex flex-row justify-end gap-2">
                                        <Link href={`/offers/${offer.id}/comment/`} className={buttonVariants({
                                            size: "icon",
                                            variant: "ghost",
                                        })}>
                                            <Reply size={20}/>
                                        </Link>
                                    </div>
                                    <div className="flex flex-col gap-2 divide-black">
                                        {offer.comments.map((reply) => {
                                            if (reply.parent?.id === comment.id) {
                                                return (
                                                    <OfferLayout user={reply.user} createdAt={reply.createdAt} hasHeart={false} className="border-none shadow-none">
                                                        <p>{reply.content}</p>
                                                    </OfferLayout>
                                                );
                                            }
                                        })}
                                    </div>
                                </OfferLayout>);
                        }
                    })}
                </div>
            </div>
        </>
    )
}