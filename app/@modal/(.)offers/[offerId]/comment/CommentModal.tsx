"use client";

import {usePathname, useRouter} from "next/navigation";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {User} from "@prisma/client";
import {CreateCommentForm, CreateCommentFormValues} from "@/app/offers/[offerId]/comment/CreateCommentForm";
import {OfferHome} from "@/src/query/offer.query";
import Link from "next/link";
import {OfferDetails} from "@/src/feature/offer/offerDetails";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

export function CreateCommentModal({user, offer, createComment}: {
    user: User,
    offer: OfferHome,
    createComment: (values: CreateCommentFormValues) => Promise<string>,
}) {
    const router = useRouter();

    const pathname = usePathname();

    return (
        <Dialog open={pathname?.includes('comment')}
                onOpenChange={() => {
                    router.back();
                }}>
            <DialogContent className="max-h-[100svh] overflow-y-auto">
                <OfferLayout user={offer.user} offerId={offer.id} createdAt={offer.createdAt} hasHeart={false}
                             className="border-none shadow-none">
                    <Link href={`/offers/${offer.id}`} className="text-foreground font-semibold">
                        {offer.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        {offer.description}
                    </p>
                    <OfferDetails offer={offer}/>
                    <div className="flex justify-center items-center gap-4 my-3">
                        <Avatar size="default">
                            <AvatarFallback>
                                {offer.organization.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <Link href={`/organization/${offer.organization.id}`}>
                                <p className="font-semibold text-muted-foreground">{offer.organization.name}</p>
                            </Link>
                        </div>
                    </div>
                </OfferLayout>
                <OfferLayout user={user} createdAt={undefined} hasHeart={false} className="border-none shadow-none">
                    <CreateCommentForm user={user} onSubmit={createComment} offer={offer}/>
                </OfferLayout>
            </DialogContent>
        </Dialog>
    );
}