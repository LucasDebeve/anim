import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

export function URLViewerInput({id, placeholder, ...fields}: {
    id?: string;
    placeholder?: string;
    [key: string]: any;
}) {
    const [url, setUrl] = useState<string | undefined>(undefined);

    console.log(fields);

    return (
        <div className="flex gap-5">
            <Input type="url" id={id} placeholder={placeholder} onChange={(e) => {
                fields.onChange(e);
                setUrl(e.target.value);
            }}/>
            <Avatar size="xl">
                <AvatarImage src={url ? url : "https://via.placeholder.com/50"} className="object-cover"/>
            </Avatar>
        </div>
    );
}