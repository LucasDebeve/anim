import {getUser} from "@/src/query/user.query";
import {getOffer} from "@/src/query/offer.query";
import {Offer} from "@/src/feature/offer/Offer";
import {notFound} from "next/navigation";
import {CreateCommentForm} from "@/app/offers/[offerId]/comment/CreateCommentForm";
import {createComment} from "@/app/offers/[offerId]/comment/create-comment.action";
import {getComment} from "@/src/query/comment.query";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";

export default async function ReplyOffer({params, searchParams} : {
    params: {
        offerId: string;
    },
    searchParams: { [key: string]: string | undefined}
}) {
    const user = await getUser();
    const offer = await getOffer(params.offerId, user.id);

    const parentId = searchParams["replyTo"] ?? "";
    const parentComment = parentId ? await getComment(parentId) : null;

    if (!offer) {
        return notFound();
    }

    if (parentComment && parentComment.parentId !== null) {
        throw new Error("Il est impossible de répondre à une réponse.");
    }

    return (
        <div>
            {parentComment && (
                <OfferLayout user={parentComment.user} createdAt={parentComment.createdAt} hasHeart={false} className="border-none shadow-none">
                    <p>{parentComment.content}</p>
                </OfferLayout>
            )}
            <OfferLayout user={user} createdAt={undefined} hasHeart={false} className="border-none shadow-none ml-20">
                <CreateCommentForm offer={offer} user={user} onSubmit={async (values) => {
                    "use server";
                    return createComment(offer.id, parentId, values);
                } } />
            </OfferLayout>

        </div>
    );
}