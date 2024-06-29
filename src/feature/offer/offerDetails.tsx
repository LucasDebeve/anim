import {OfferHome} from "@/src/query/offer.query";

export function OfferDetails({offer}: { offer: OfferHome }) {
    return (
        <>
            <hr className="mt-2"/>
            <div className="py-2 flex flex-row gap-2 justify-between">
                <div className="text-sm md:text-base">
                    <p className="font-semibold">
                        Type
                    </p>
                    <p>
                        {offer.offerType.title}
                    </p>
                </div>
                <div className="text-sm md:text-base">
                    <p className="font-semibold">
                        Tranche d'âge
                    </p>
                    <p>
                        {offer.age_min} - {offer.age_max} ans
                    </p>
                </div>
                <div className="text-sm md:text-base">
                    <p className="font-semibold">
                        Contrat
                    </p>
                    <p>
                        {offer.contract.title}
                    </p>
                </div>
                <div className="text-sm md:text-base">
                    <p className="font-semibold">
                        Rémunération
                    </p>
                    <p>
                        {offer.contract.title === "CEE" ? `${offer.remuneration.toFixed(2)}€/jour` : `${offer.remuneration.toFixed(2)}€/h`}
                    </p>
                </div>
            </div>
        <hr className="mb-2"/>
        </>
    );
}