"use client";

import {LogOut} from "lucide-react";
import {signOut} from "next-auth/react";
import {useTransition} from "react";
import {Loader} from "@/components/ui/loader";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

export function DropdownMenuItemLogout() {
    const [isPending, startTransition] = useTransition()

    return (
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {
            startTransition(() => signOut());
        }}>
            {isPending ?
                <Loader classname="mr-2 h-4 w-4" />
                : <LogOut className="mr-2 h-4 w-4" />
            }Déconnexion
        </DropdownMenuItem>
    );
}