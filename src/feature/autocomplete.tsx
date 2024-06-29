import {Input} from "@/components/ui/input";
import {Popover} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {useEffect, useState} from "react";
import {searchCity} from "@/src/feature/city/city";
import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";

type City = {
    nom: string;
    codesPostaux: string;
    code: string;
    _score: number;
};

export function AutoComplete() {
    const [list, setList] = useState<City[]>([]);

    const [value, setValue] = useState("")
    const [city, zip] = value.split("_") || ["", ""]

    useEffect(() => {
        const inputZip = document.getElementById("zip") as HTMLInputElement;
        inputZip.value = zip;
        const inputSearch = document.getElementById("city-search") as HTMLInputElement;
        inputSearch.value = city;
    }, [value]);

    return (
        <Command>
            <div className="flex gap-2 p-2">
                <Input id="city-search" placeholder="Rechercher une ville" className="w-full"
                       defaultValue={value.split("_")[1] || ""}
                       onChange={(event) => {
                           const value = event.target.value
                           if (event.target.value.length < 3) {
                               setList([])
                               return
                           }
                           setList([])
                           searchCity(event.target.value).then((res) => {
                               setList(
                                   res.map((city: {nom: string, codesPostaux: string[], code: string, _score: number}) => ({
                                       nom: city.nom,
                                       codesPostaux: city.codesPostaux[0],
                                       code: city.code,
                                       _score: city._score
                                   }))
                               )
                           })
                       }
                       }/>
                <Input id="zip" placeholder="Code Postal" />
                <Button type="button" variant="ghost" onClick={() => {
                    setList([])
                }}>
                    <Trash2 className="w-6 h-6"/>
                </Button>
            </div>

            <CommandList>
                <CommandEmpty>Pas de ville trouvée</CommandEmpty>
                <CommandGroup>
                    {list.map((city: City) => (
                        <CommandItem
                            key={`${city.nom}-${city.code}`}
                            value={`${city.nom}_${city.codesPostaux}`}
                            onSelect={(currentValue) => {
                                setValue(currentValue)
                                setList([])
                            }}
                        >
                            {city.nom}
                            <span className="text-muted-foreground">, {city.codesPostaux}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>

        </Command>
    );
}