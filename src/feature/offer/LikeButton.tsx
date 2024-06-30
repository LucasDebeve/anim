"use client";

import {startTransition, useTransition} from "react";
import {clsx} from "clsx";
import {Loader} from "@/components/ui/loader";
import {Apple, Heart} from "lucide-react";
import {likeAction} from "@/src/feature/offer/like.action";
import {round} from "@floating-ui/utils";
import {Button} from "@/components/ui/button";

export function LikeButton({offerId, isLiked, countLike, size = 16} : {
    offerId: string;
    isLiked: boolean;
    countLike: number;
    size?: number;
}) {
    const [isPending, setIsPending] = useTransition();

    return (
        <Button className={clsx("flex items-center justify-start gap-1 min-w-[5rem]")} variant="ghost" onClick={() => {
            startTransition(() => likeAction(offerId))
        }}>
            {isPending ? <Loader size={size} /> : (isLiked ? <Heart size={size} fill={"#EC2756"} stroke={"#EC2756"} /> : <Heart size={size} />)}
            <span>{countLike}</span>
        </Button>
    );
}