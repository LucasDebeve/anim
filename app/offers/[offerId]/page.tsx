import {getAuthSession} from "@/lib/auth";
import {getOfferView} from "@/src/query/offer.query";
import {notFound} from "next/navigation";
import {OfferDetails} from "@/src/feature/offer/offerDetails";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import {MessageCircle} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {LikeButton} from "@/src/feature/offer/LikeButton";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {formatDate} from "@/lib/date";

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
            <div
                className="fixed left-[50svw] w-[50svw] top-14 h-[calc(100%-3.5rem)] flex flex-col overflow-y-auto py-6 px-12 bg-background z-20">
                <h1 className="text-2xl font-bold">{offer.title}</h1>
                <div className="flex gap-5 justify-between">
                    <div className="flex gap-4 my-3">
                        <Avatar size="default">
                            <AvatarFallback>
                                {offer.organization.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <Link href={`/organizations/${offer.organization.id}`}>
                                <p className="font-semibold text-muted-foreground">{offer.organization.name}</p>
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-4 my-3">
                        <Avatar size="sm">
                            {offer.user.image ? <AvatarImage src={offer.user.image} alt={offer.user.name}/> : null}
                            <AvatarFallback>
                                {offer.user.username ? offer.user.username.slice(0, 2).toUpperCase() : offer.user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <Link href={`/users/${offer.user.id}`}>
                                <p className="text-sm font-semibold text-muted-foreground">{offer.user.name}</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <p>{offer.description}</p>
                <OfferDetails offer={offer}/>
                <div className="flex gap-3">
                    <Link href={`/offers/${offer.id}/comment/`} className={buttonVariants({
                        size: "icon",
                        variant: "ghost",
                    })}>
                        <MessageCircle size={20}/>
                    </Link>
                    <LikeButton offerId={offer.id} isLiked={offer.likes.length > 0} countLike={offer._count.likes}
                                size={20}/>
                </div>
                <p className="text-sm text-muted-foreground mt-4 mb-2">{offer._count.comments} commentaires</p>
                <div className="flex-1 flex flex-col gap-2">
                    {offer.comments.map((comment) => {
                        if (!comment.parent) {
                            return (
                                <OfferLayout
                                    key={`comment-${comment.id}`}
                                    user={comment.user}
                                    createdAt={comment.createdAt}
                                    hasHeart={false}
                                    reply={{commentId: comment.id, offerId: offer.id}}
                                    avatarSize={"sm"}
                                    className="shadow-none border-none">
                                    <p>{comment.content}</p>
                                    <div className="flex flex-col">
                                        {offer.comments.map((reply) => {
                                            if (reply.parent?.id === comment.id) {
                                                return (
                                                    <OfferLayout
                                                        key={`comment-reply-${comment.id}`}
                                                        user={reply.user}
                                                        createdAt={reply.createdAt}
                                                        hasHeart={false}
                                                        avatarSize={"sm"}
                                                        className="border-none shadow-none">
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