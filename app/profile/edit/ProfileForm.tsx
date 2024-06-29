"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {UserEdit} from "@/src/query/user.query";

const Schema = z.object({
    name: z.string().min(1).max(70),
    username: z.string().min(1).max(70),
    bio: z.string().max(500),
    email: z.string().email(),
});

export type ProfileFormType = z.infer<typeof Schema>;

type ProfileFormProps = {
    onSubmit: (values: ProfileFormType) => Promise<string | void>;
    user: UserEdit;
};

export function ProfileForm({onSubmit, user}: ProfileFormProps) {
    const form = useZodForm({
        schema: Schema,
        defaultValues: {
            name: user.name ?? "",
            username: user.username ?? "",
            bio: user.bio ?? "",
            email: user.email ?? "",
        },
    });

    const router = useRouter();

    return (
        <Form
            className="space-y-4"
            form={form}
            onSubmit={async (values) => {
                const url = await onSubmit(values);

                if (url) {
                    router.push(url);
                    router.refresh();
                }
            }}>
            <FormField control={form.control} name="name" render={({field}) => (
                <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                        <Input placeholder={"Nom et Prénom"} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>

            <FormField control={form.control} name="username" render={({field}) => (
                <FormItem>
                    <FormLabel>Nom d&apos;utilisateur</FormLabel>
                    <FormControl>
                        <Input placeholder={"Nom d'utilisateur"} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>

            <FormField control={form.control} name="bio" render={({field}) => (
                <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                        <Textarea placeholder={"Animateur en or"} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>

            <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder={"anim.en.or@anim.com"} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>

            <div className="flex w-full justify-end items-center">
                <Button type="submit">
                    Enregistrer
                </Button>
            </div>
        </Form>
    );
}