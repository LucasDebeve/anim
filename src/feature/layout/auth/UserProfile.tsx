import {getAuthSession} from "@/lib/auth";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Settings2, User2} from "lucide-react";
import {DropdownMenuItemLogout} from "@/src/feature/layout/auth/LogoutButton";

export async function UserProfile() {
    const session = await getAuthSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} />
                    <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User2 className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <Settings2 className="mr-2 h-4 w-4" />
                        Paramètres
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItemLogout />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}