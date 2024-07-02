import {OfferPlaceholder} from "@/src/feature/offer/OfferPlaceholder";
import {Skeleton} from "@/components/ui/skeleton";

export default function loader() {
    return (
        <>
            <Skeleton className="w-1/3 h-9 mb-5"/>
            <div className="flex flex-col gap-3">
                {Array.from({length: 20}).map((_, index) => {
                    return <OfferPlaceholder key={index}/>;
                })}
            </div>
        </>)
}