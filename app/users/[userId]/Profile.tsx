import {PropsWithChildren} from "react";
import {UserProfile} from "@/src/query/user.query";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Offer} from "@/src/feature/offer/Offer";
import Link from "next/link";
import {clsx} from "clsx";
import {buttonVariants} from "@/components/ui/button";
import {Pencil} from "lucide-react";

export function Profile({user, canEdit} : PropsWithChildren<{user:UserProfile, canEdit:boolean}>) {
    return (
        <div className="mt-4">
            <div className="flex gap-2 items-start justify-between">

                <div className="flex flex-col gap-0.5">
                    <h3 className="text-2xl font-bold">
                        {user.name}
                        {canEdit && (
                            <Link href={`/profile/edit`}
                                  className={clsx("ml-5", buttonVariants({
                                      variant: "ghost"
                                  }))}>
                                <Pencil size={20}/>
                                <span className="sr-only">Editer</span>
                            </Link>)}
                    </h3>
                    <p>{user.username}</p>
                </div>
                <Avatar size="lg">
                    {user.image ? <AvatarImage src={user.image} alt={user.name}/> : null}
                    <AvatarFallback>
                        {user.username ? user.username.slice(0, 2).toUpperCase() : user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
            {user.bio ? <p className="mt-2">{user.bio}</p> : <p className="text-muted-foreground">Pas de bio</p>}

            <div className="flex gap-3 text-muted-foreground items-center py-3 text-sm">
                <h4 className="font-semibold">Bilan</h4>
                <p>{user._count.offers} {user._count.offers > 1 ? "offres" : "offre"}</p>
                <p>{user._count.likes} {user._count.likes > 1 ? "likes" : "like"}</p>
                <p>{user._count.comments} {user._count.comments > 1 ? "commentaires" : "commentaire"}</p>
            </div>

            <h3 className="font-bold text-xl text-foreground">Offres publiés</h3>
            <div className="mt-4">
            {user.offers.map((offer) => (
                  <Offer offer={offer} key={offer.id} isCard={false} hasHeart={false}/>
                ))}
            </div>
        </div>
    );
}