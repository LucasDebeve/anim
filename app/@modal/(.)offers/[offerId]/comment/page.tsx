import {getUser} from "@/src/query/user.query";
import {CreateCommentModal} from "@/app/@modal/(.)offers/[offerId]/comment/CommentModal";
import {createComment} from "@/app/offers/[offerId]/comment/create-comment.action";
import {getOffer} from "@/src/query/offer.query";
import {notFound} from "next/navigation";
import {getComment} from "@/src/query/comment.query";

export default async function Page({params, searchParams} : {
    params: {
        offerId: string;
    },
    searchParams: { [key: string]: string | undefined}
}) {
    const user = await getUser();
    const offer = await getOffer(params.offerId, user.id);

    if (!offer) {
        return notFound();
    }

    return (
        <CreateCommentModal
            offer={offer}
            user={user}
            parentComment={searchParams["replyTo"] ? await getComment(searchParams["replyTo"]) : undefined}
            createComment={async (values) => {
            "use server";

            return await createComment(params.offerId, searchParams["replyTo"] ?? "", values);
        }} />
    );
}