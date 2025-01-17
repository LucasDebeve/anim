import {OfferHome} from "@/src/query/offer.query";
import {PropsWithChildren} from "react";
import {clsx} from "clsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {formatDate} from "@/lib/date";
import {Heart, Reply} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import * as repl from "node:repl";

type OfferLayoutProps = PropsWithChildren<{
    user: OfferHome["user"],
    createdAt?: Date,
    className?: string,
    offerId?: string,
    hasHeart?: boolean,
    reply?: {
        commentId: string,
        offerId: string,
    },
    avatarSize?: "default" | "sm" | "lg",
}>;

export function OfferLayout({className, user, createdAt, children, hasHeart = true, reply, avatarSize = "default"}: OfferLayoutProps) {
    return (
        <Card className={clsx("flex w-full flex-row items-start p-4", className)}>
            <Avatar size={avatarSize}>
                {user.image ? <AvatarImage src={user.image} alt={user.name}/> : null}
                <AvatarFallback>
                    {user.username ? user.username.slice(0, 2).toUpperCase() : user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="ml-4 flex w-full flex-col gap-2">
                <Link href={`/users/${user.id}`}>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-muted-foreground">{user.name}</p>
                        {createdAt ? (
                            <p className="text-xs font-light text-muted-foreground">
                                {formatDate(createdAt)}
                            </p>
                        ) : null}
                    </div>
                </Link>
                {children}
            </div>
            {hasHeart ? (
                <Button size="icon" variant="ghost">
                    <Heart size={20} />
                </Button>
            ) : null}
            {(reply?.commentId && reply?.offerId) ? (
                <Link href={{ pathname: `/offers/${reply.offerId}/comment`, query: { 'replyTo': reply.commentId }}} className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                })}>
                    <Reply size={20}/>
                </Link>
            ) : null}
        </Card>
    );
}