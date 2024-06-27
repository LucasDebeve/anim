"use client";

import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import {signIn} from "next-auth/react";
import {useTransition} from "react";
import {Loader} from "@/components/ui/loader";

export function LoginButton() {
  const [isPending, startTransition] = useTransition()

    return (
    <Button onClick={() => {
        startTransition(() => signIn());
    }}>
        {isPending ?
            <Loader classname="mr-2 h-4 w-4" />
            : <LogIn className="mr-2 h-4 w-4" />
        }Login
    </Button>
  );
}