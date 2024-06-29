import {AlertTriangle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {clsx} from "clsx";

export default function NotFound() {
    return (
        <Alert>
            <AlertTriangle className="w-6 h-6"/>
            <AlertTitle className="ml-3">
                Offre non trouvée
            </AlertTitle>
            <AlertDescription className="ml-3">
                Impossible de trouver cette offre
            </AlertDescription>
            <Link href={"/"} className={clsx("mt-3", buttonVariants({variant: "secondary"}))}>Retour aux offres</Link>
        </Alert>
    );
}