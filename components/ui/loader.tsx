import {Loader2} from "lucide-react";
import {clsx} from "clsx";

export function Loader ({size, classname}: {size?:number, classname?:string}) {
    return <Loader2 className={clsx('animate-spin', classname)} size={size} />
}