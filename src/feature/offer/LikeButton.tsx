"use client";

import {startTransition, useTransition} from "react";
import {clsx} from "clsx";
import {Loader} from "@/components/ui/loader";
import {Apple, Heart} from "lucide-react";
import {likeAction} from "@/src/feature/offer/like.action";
import {round} from "@floating-ui/utils";
import {Button} from "@/components/ui/button";

export function LikeButton({offerId, isLiked, countLike} : {
    offerId: string;
    isLiked: boolean;
    countLike: number;
}) {
    const [isPending, setIsPending] = useTransition();

    return (
        <Button className={clsx("flex items-center justify-start gap-1 min-w-[5rem]")} variant="ghost" onClick={() => {
            console.log("Like button clicked", isLiked ? "unlike" : "like");
            startTransition(() => likeAction(offerId))
        }}>
            {isPending ? <Loader size={16} /> : (isLiked ? <Heart size={16} fill={"#EC2756"} stroke={"#EC2756"} /> : <Heart size={16} />)}
            <span>{countLike}</span>
        </Button>
    );
}