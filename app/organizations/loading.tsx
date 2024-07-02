import {OfferPlaceholder} from "@/src/feature/offer/OfferPlaceholder";
import {Skeleton} from "@/components/ui/skeleton";
import {ListedOrganizationPlaceholder} from "@/src/feature/organization/ListedOrganizationPlaceholder";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export default function loader() {
    return (
        <>
            <Skeleton className="w-1/3 h-9 mb-5"/>
            <div className="pb-5 flex items-start">
                <Input
                    type="search"
                    placeholder="Rechercher un organisme"
                    name="search"
                    defaultValue={""}
                    disabled={true}
                    className="w-full rounded-r-none"/>
                <Button type="submit" className="rounded-l-none" disabled={true}>
                    <Search size={20}/>
                    <span className="sr-only">Rechercher</span>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({length: 6}).map((_, index) => {
                    return <ListedOrganizationPlaceholder key={index} isCard={false}/>;
                })}
            </div>
            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className="pointer-events-none opacity-50" href={""}/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis className="pointer-events-none opacity-50"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href={`/organizations?page=${2}`}
                                        className="pointer-events-none opacity-50"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>)
}