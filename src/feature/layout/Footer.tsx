"use client";

import Link from "next/link";
import {Home} from "lucide-react";
import {clsx} from "clsx";
import {buttonVariants} from "@/components/ui/button";

export function Footer() {
    return (
        <div className="container px-4 py-6 md:px-6 flex-col md:flex-row items-center border-t border-accent">
            <p className="text-sm text-center">&copy; {new Date().getFullYear() === 2024 ? 2024 : `2024 - ${new Date().getFullYear()}`} Lucas Debeve. Tout droits réservés.</p>
        </div>
    );
}
