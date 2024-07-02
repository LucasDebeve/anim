import {clsx} from "clsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";
import {Rate} from "@/src/feature/organization/Rate";

export function ListedOrganizationPlaceholder({isCard = true}: {isCard?: boolean}) {
    return (
        <Card className={isCard ? "" : "border-none shadow-none" }>
            <Avatar size="lg">
                <AvatarFallback></AvatarFallback>
            </Avatar>
            <Skeleton className="w-1/2 h-5 mt-1" />
            <div className="flex gap-4 items-center py-1 mt-1">
                <Rate value={0}/>
                <Skeleton className="w-[4rem] h-4"/>
            </div>
            <Skeleton className="w-full h-4 mt-1" />
            <Skeleton className="w-full h-4 mt-1" />
            <div className="flex justify-between mt-2">
                <Skeleton className="w-[6rem] h-4"/>
                <Skeleton className="w-[5rem] h-4"/>
            </div>
        </Card>
);
}