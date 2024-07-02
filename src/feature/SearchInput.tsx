import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";

export function SearchInput({defaultValue, nbResults}: {
    defaultValue?: string;
    nbResults?: number;
}) {
    return (
        <div className="pb-5">
            <form method="GET" className="flex items-start">
                <Input
                    type="search"
                    placeholder="Rechercher un organisme"
                    name="search"
                    defaultValue={defaultValue || ""}
                    className="w-full rounded-r-none"/>
                <Button type="submit" className="rounded-l-none">
                    <Search size={20}/>
                    <span className="sr-only">Rechercher</span>
                </Button>
            </form>
            {nbResults ? (
                <p className="text-sm text-muted-foreground mt-1">
                    {nbResults} résultat{nbResults > 1 ? 's' : ''} trouvé{nbResults > 1 ? 's' : ''}
                </p>
            ) : null}
        </div>
    );
}