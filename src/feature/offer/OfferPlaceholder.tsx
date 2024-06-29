import {clsx} from "clsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";

export function OfferPlaceholder({isCard = true}: {isCard?: boolean}) {
    return (
        <Card className={clsx("flex w-full flex-row items-start p-4", {
            "border-none shadow-none": !isCard
        })}>
            <Avatar size="default">
                <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="ml-4 flex w-full flex-col gap-2">
                <Skeleton className="w-1/4 h-4" />
                <Skeleton className="w-1/6 h-3" />
                <Skeleton className="w-1/2 h-5 mt-1 mb-3" />

                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <hr className="mt-2"/>
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
                    <Skeleton className="w-[5rem] h-4"/>
                    <Skeleton className="w-[5rem] h-4" />
                </div>
            </div>
            <Skeleton className="w-5" />
        </Card>
    );
}