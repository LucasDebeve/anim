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

const Schema = z.object({
    description: z.string().min(1).max(500),
    title: z.string().min(1).max(100),
    remuneration: z.coerce.number().min(0),
    contract: z.string({
        required_error: "Veuillez sélectionner un type de contrat",
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }).refine(
        (data) => data.from < data.to, "La date de fin doit être supérieure à la date de début"
    ),
    offerType: z.string({
        required_error: "Veuillez sélectionner un type d'offre",
    }),
    organization: z.string({
        required_error: "Veuillez sélectionner un organisme",
    }),
});

export type CreateFormValues = z.infer<typeof Schema>;

type CreateFormProps = {
    user: User;
    onSubmit: (values: CreateFormValues) => Promise<string>;
    allContracts: any;
    allTypes: any;
    allOrganization: any;
};

export function CreateForm({user, onSubmit, allContracts, allTypes, allOrganization}: CreateFormProps) {
    const form = useZodForm({
        schema: Schema,
    });

    const router = useRouter();

    console.log(allOrganization)

    return (
    <OfferLayout user={user}>
      <Form className="flex flex-col gap-3" form={form} onSubmit={async (values) => {
          console.log(values);
          const result = await onSubmit(values);
          console.log("Submit client side", result);
          router.push(`/offers/${result}`);
      }}>
          <FormField control={form.control} name="title" render={({field}) => (
              <FormItem>
                  <Input {...field} id="title" placeholder="Titre de l'offre"/>
                  <FormMessage />
              </FormItem>
          )} />

          <FormField control={form.control} name="offerType" render={({field}) => (
              <FormItem className="flex-1">
                  <FormLabel htmlFor="contract">Type d&apos;offre</FormLabel>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder="Type d'offres"/>
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {allTypes}
                      </SelectContent>
                  </Select>
                  <FormMessage />
              </FormItem>
          )} />

          <div className="flex gap-5 w-full">
              <FormField control={form.control} name="contract" render={({field}) => (
                  <FormItem className="flex-1">
                      <FormLabel htmlFor="contract">Type de contrat</FormLabel>
                      <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                              <SelectTrigger>
                                  <SelectValue placeholder="Type de contrat"/>
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              {allContracts}
                          </SelectContent>
                      </Select>
                      <FormMessage />
                  </FormItem>
              )} />

              <FormField control={form.control} name="remuneration" render={({field}) => (
                  <FormItem className="flex-1">
                      <FormLabel htmlFor="remuneration">Rémunération (en €/jour)</FormLabel>
                      {/* get the number */}
                      <Input {...field} type="number" step={0.01} min={0} id="remuneration" placeholder="Rémunération" />
                      <FormMessage />
                  </FormItem>
              )} />
          </div>

          <div className="flex gap-5 w-full">
              <FormField control={form.control} name="dateRange" render={({field}) => {
                  return (
                      <FormItem className="flex-1">
                          <FormLabel htmlFor="dateRange">Période de travail</FormLabel>
                          <FormControl>
                              <Popover>
                                  <PopoverTrigger asChild>
                                      <Button
                                          variant={"outline"}
                                          className={cn(
                                              "w-full justify-start text-left font-normal",
                                              !field.value && "text-muted-foreground",
                                          )}
                                      >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {field.value?.from ? (
                                              field.value.to ? (
                                                  <>
                                                      {format(field.value.from, "LLL dd, y")} -{" "}
                                                      {format(field.value.to, "LLL dd, y")}
                                                  </>
                                              ) : (
                                                  format(field.value.from, "LLL dd, y")
                                              )
                                          ) : (
                                              <span>Période</span>
                                          )}
                                      </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                          initialFocus
                                          mode="range"
                                          defaultMonth={field.value?.from}
                                          selected={{from: field.value?.from, to: field.value?.to}}
                                          onSelect={(date) => {
                                              field.onChange({
                                                  from: date?.from,
                                                  to: date?.to,
                                              });
                                              console.log("date", date);
                                          }}
                                          numberOfMonths={2}
                                          locale={fr}
                                      />
                                  </PopoverContent>
                              </Popover>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  );
                }
              } />

              {/* Organisme */}
              <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                      <FormItem className="flex flex-col">
                          <FormLabel>Organisme</FormLabel>
                            <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Organisme" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {allOrganization.map((organization: {id: string, name: string}) => (
                                        <SelectItem value={organization.id} key={organization.id}>
                                            {organization.name}
                                        </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                      </FormItem>
                  )}
              />
          </div>

          <FormField control={form.control} name="description" render={({field}) => (
              <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <ContentTextArea className="text-sm" id="description" {...field} placeholder="Hello" />
                  <FormMessage />
              </FormItem>
          )} />

          <div className="flex w-full justify-end">
            <Button size="sm" type="submit">
                Publier
            </Button>
          </div>
      </Form>
    </OfferLayout>
  );
}