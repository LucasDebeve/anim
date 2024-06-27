import Image from "next/image";
import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import {getAuthSession} from "@/lib/auth";

export default async function Home() {
    const session = await getAuthSession();
    return (
        <>
            <p>
                {JSON.stringify(session, null, 2)}
            </p>
            <Button>
                Click me
            </Button>
        </>
  );
}
