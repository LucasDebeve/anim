import {Button, buttonVariants} from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {ThemeToggle} from "@/src/theme/ThemeToggle";
import Link from "next/link";
import {LoginButton} from "@/src/feature/layout/auth/LoginButton";
import {getAuthSession} from "@/lib/auth";
import {UserProfile} from "@/src/feature/layout/auth/UserProfile";

export const Header = async () => {
    const session = await getAuthSession();

    return (
        <header className="border-b border-b-accent z-40 fixed top-0 left-0 bg-background w-full">
            <div className="container flex items-center py-2 m-auto gap-1">
                <h2 className="text-2xl font-bold pr-8">Anim</h2>
                <nav className="flex gap-4 mr-auto">
                    <Link href="/" className={buttonVariants({
                        variant: "ghost",
                    })}>Offres d'emploi</Link>
                    <Link href="/organisme" className={buttonVariants({
                        variant: "ghost",
                    })}>Organisme</Link>
                </nav>
                <ThemeToggle />
                {session?.user ? <UserProfile /> : <LoginButton />}
            </div>
        </header>
    );
}