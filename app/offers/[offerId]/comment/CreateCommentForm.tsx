"use client";

import {z} from "zod";
import {User} from "@prisma/client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useZodForm
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon} from "lucide-react";
import { addDays, format } from "date-fns"
import {fr} from "date-fns/locale"
import { DateRange } from "react-day-picker"
import {OfferLayout} from "@/src/feature/offer/OfferLayout";
import {ContentTextArea} from "@/src/feature/offer/ContentTextArea";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DatePickerWithRange} from "@/src/feature/offer/DatePicker";
import {useState} from "react";
import {Command, CommandEmpty, CommandInput, CommandGroup, CommandItem} from "@/components/ui/command";
import {ChevronUp, CheckIcon} from "lucide-react";
import Link from "next/link";
import {Slider} from "@/components/ui/slider";
import {AutoComplete} from "@/src/feature/autocomplete";
import {Checkbox} from "@/components/ui/checkbox";
import {OfferHome} from "@/src/query/offer.query";

const Schema = z.object({
    content: z.string().min(1),
});

export type CreateCommentFormValues = z.infer<typeof Schema>;

type CreateCommentFormProps = {
    user: User;
    offer: OfferHome;
    onSubmit: (values: CreateCommentFormValues) => Promise<string>;
};

export function CreateCommentForm({user, offer, onSubmit}: CreateCommentFormProps) {
    const form = useZodForm({
        schema: Schema,
    });

    const router = useRouter();

    return (
        <Form className="flex flex-col gap-3" form={form} onSubmit={async (values) => {
            const result = await onSubmit(values);
            router.push(`/offers/${offer.id}`);
            router.refresh();
        }}>
            <FormField control={form.control} name="content" render={({field}) => (
                <FormItem>
                    <ContentTextArea className="text-sm" id="content" {...field} placeholder="Veulliez taper le contenu de votre commentaire" />
                    <FormMessage />
                </FormItem>
            )} />

            <hr/>

            <div className="flex w-full justify-end items-center">
                <Button type="submit">
                    Publier
                </Button>
            </div>
        </Form>
    );
}