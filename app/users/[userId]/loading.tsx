import {OfferPlaceholder} from "@/src/feature/offer/OfferPlaceholder";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {clsx} from "clsx";
import {buttonVariants} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Offer} from "@/src/feature/offer/Offer";

export default function loader() {
    return (
        <div className="mt-4">
            <div className=" w-full flex gap-2 items-start justify-between">
                <div className="flex flex-col gap-0.5 w-full">
                    <Skeleton className="w-1/3 h-9 mb-1"/>
                    <Skeleton className="w-1/3 h-4 mb-4"/>
                </div>
                <Avatar size="lg">
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </div>
            <Skeleton className="w-full h-4 mb-1"/>
            <Skeleton className="w-full h-4 mb-1"/>
            <Skeleton className="w-full h-4 mb-1"/>

            <div className="flex gap-3 text-muted-foreground items-center py-3 text-sm mb-3">
                <Skeleton className="w-12 h-4"/>
                <Skeleton className="w-16 h-4"/>
                <Skeleton className="w-16 h-4"/>
                <Skeleton className="w-20 h-4"/>
            </div>
            <Skeleton className="w-1/3 h-6 mb-3"/>
            {Array.from({length: 5}).map((_, index) => {
                return <OfferPlaceholder key={index} isCard={false}/>;
            })}
        </div>
    )
}