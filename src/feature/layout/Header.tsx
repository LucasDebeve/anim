import {Button} from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {ThemeToggle} from "@/src/theme/ThemeToggle";

export const Header = () => {
    return (
        <header className="border-b border-b-accent">
            <div className="container flex items-center py-2 m-auto gap-1">
                <h2 className="text-2xl font-bold pr-8">Anim</h2>
                <nav className="flex gap-4 mr-auto">
                    <a href="#" className="text-accent-foreground font-semibold hover:font-bold">Offres d'emploi</a>
                    <a href="#" className="text-accent-foreground font-semibold hover:font-bold">Organisme</a>
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