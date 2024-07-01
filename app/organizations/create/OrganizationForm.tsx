"use client";

import {z} from "zod";
import {User} from "@prisma/client";
import {Form, FormField, FormItem, FormLabel, FormMessage, useZodForm} from "@/components/ui/form";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {ContentTextArea} from "@/src/feature/offer/ContentTextArea";
import {Button} from "@/components/ui/button";
import {URLViewerInput} from "@/src/feature/organization/URLViewerInput";

const Schema = z.object({
    name: z.string().min(1),
    bio: z.string().min(1),
    image: z.string().url(),
});

export type OrganizationFormValues = z.infer<typeof Schema>;

type OrganizationFormProps = {
    user: User;
    onSubmit: (values: OrganizationFormValues) => Promise<string>;
};

export function OrganizationForm({user, onSubmit}: OrganizationFormProps) {
    const form = useZodForm({
        schema: Schema,
    });

    const router = useRouter();

    return (
        <Form className="flex flex-col gap-3" form={form} onSubmit={async (values) => {
            const result = await onSubmit(values);
            router.push(`/organizations/${result}`);
            router.refresh();
        }}>
            <FormField control={form.control} name="name" render={({field}) => (
                <FormItem>
                    <FormLabel htmlFor="name">Nom de l&apos;organisme<span className="text-red-600">*</span></FormLabel>
                    <Input {...field} id="name" placeholder="Nom de l'organisme"/>
                    <FormMessage />
                </FormItem>
            )}/>

            <FormField control={form.control} name="image" render={({field}) => (
                <FormItem>
                    <FormLabel htmlFor="image">Logo de l&apos;organisme</FormLabel>
                    {/*<Input {...field} type="url" id="image" placeholder="URL du logo de l'organisme"/>*/}
                    <URLViewerInput {...field} id="image" placeholder="URL du logo de l'organisme" />
                    <FormMessage />
                </FormItem>
            )}/>

            <FormField control={form.control} name="bio" render={({field}) => (
                <FormItem>
                    <FormLabel htmlFor="bio">Description de l&apos;organisme<span
                        className="text-red-600">*</span></FormLabel>
                    <ContentTextArea {...field} id="name" placeholder="Taper ici une description de l'organisme"
                                     className="text-sm"/>
                    <FormMessage />
                </FormItem>
            )}/>

            <div className="flex w-full justify-between items-center">
                <p className="text-muted-foreground text-sm">Les champs marqués d&apos;un <span
                    className="text-red-600">*</span> sont obligatoires</p>
                <Button type="submit">
                    Créer l&apos;organisme
                </Button>
            </div>
        </Form>
    );
}