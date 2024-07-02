import {getAuthSession} from "@/lib/auth";
import {getOfferView} from "@/src/query/offer.query";
import {notFound} from "next/navigation";
import {OfferDetails} from "@/src/feature/offer/offerDetails";
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import {Heart, MessageCircle} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {LikeButton} from "@/src/feature/offer/LikeButton";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {formatDate} from "@/lib/date";
import {Skeleton} from "@/components/ui/skeleton";

export default async function OfferView() {
    return (
        <>
            <img src="https://via.placeholder.com/600x800" className="fixed left-0 w-[50svw] top-14 h-[calc(100%-3.5rem)] object-cover"/>
            <div
                className="fixed left-[50svw] w-[50svw] top-14 h-[calc(100%-3.5rem)] flex flex-col overflow-y-auto py-6 px-12 bg-background z-20">
                <Skeleton className="w-1/2 h-6 mt-1 mb-1"/>
                <div className="flex gap-5 justify-between">
                    <div className="flex gap-4 my-3 w-full">
                        <Avatar size="default">
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <Skeleton className="w-1/3 h-5"/>
                    </div>
                    <div className="flex gap-4 my-3">
                        <Avatar size="sm">
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <Skeleton className="w-[5rem] h-4"/>
                    </div>
                </div>
                <Skeleton className="w-full h-5 mb-1 mt-1"/>
                <Skeleton className="w-full h-5 mb-1"/>
                <Skeleton className="w-full h-5 mb-1"/>
                <hr className="mt-1"/>
                <div className="py-2 flex flex-row gap-2 justify-between w-full">
                    <div className="w-full my-1">
                        <Skeleton className="w-full h-4 mb-2"/>
                        <Skeleton className="w-full h-4"/>
                    </div>
                    <div className="w-full my-1">
                        <Skeleton className="w-full h-4 mb-2"/>
                        <Skeleton className="w-full h-4"/>
                    </div>
                    <div className="w-full my-1">
                        <Skeleton className="w-full h-4 mb-2"/>
                        <Skeleton className="w-full h-4"/>
                    </div>
                    <div className="w-full my-1">
                        <Skeleton className="w-full h-4 mb-2"/>
                        <Skeleton className="w-full h-4"/>
                    </div>
                </div>
                <hr className="mb-2"/>
                <div className="flex gap-3">
                    <Button size="icon" variant="ghost">
                        <MessageCircle size={20}/>
                    </Button>
                    <Button variant="ghost">
                        <Heart size={20}/>
                        <Skeleton className="w-5 h-5 ml-2"/>
                    </Button>
                </div>
                <Skeleton className="h-4 w-1/4 mt-4 mb-2" />
            </div>
        </>
    )
}