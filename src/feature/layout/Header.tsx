import {Button, buttonVariants} from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {ThemeToggle} from "@/src/theme/ThemeToggle";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="border-b border-b-accent">
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
                <Avatar>
                    <AvatarImage src="https://avatars.dicebear.com" alt="Avatar" />
                    <AvatarFallback>SC</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}