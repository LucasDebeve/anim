import {OfferHome} from "@/src/query/offer.query";
import {PropsWithChildren} from "react";
import {clsx} from "clsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {formatDate} from "@/lib/date";

type OfferLayoutProps = PropsWithChildren<{
    user: OfferHome["user"],
    createdAt?: Date,
    className?: string,
    offerId?: string,
}>;

export function OfferLayout({className, user, offerId, createdAt, children}: OfferLayoutProps) {
    return (
        <div className={clsx("flex w-full flex-row items-start p-4 border", className)}>
            <Avatar>
                {user.image ? <AvatarImage src={user.image} alt={user.name}/> : null}
                <AvatarFallback>
                    {user.username ? user.username.slice(0, 2).toUpperCase() : user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>

            </Avatar>
            <div className="ml-4 flex w-full flex-col gap-2">
                <Link href={`/users/${user.id}`}>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-sm text-card-foreground mr-auto">{user.name}</p>
                        {createdAt ? (
                            <p className="text-sm text-muted-foreground">
                                il y a {formatDate(createdAt)}
                            </p>
                        ) : null}
                    </div>
                </Link>
                {children}
            </div>
        </div>
    );
}