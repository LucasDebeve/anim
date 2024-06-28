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

const Schema = z.object({
    description: z.string({
        required_error: "Veuillez saisir une description",
    }).min(1).max(500),
    title: z.string({
        required_error: "Veuillez saisir un titre",
    }).min(1).max(100),
    remuneration: z.coerce.number({
        required_error: "Veuillez saisir une rémunération",
    }).min(0),
    contract: z.string({
        required_error: "Veuillez sélectionner un type de contrat",
    }),
    dateRange: z.object({
        from: z.date({
            required_error: "Veuillez sélectionner une date de début",
        }),
        to: z.date({
            required_error: "Veuillez sélectionner une date de fin",
        }),
    }, {
        required_error: "Veuillez sélectionner une période de travail",
    }).refine(
        (data) => data.from < data.to, "La date de fin doit être supérieure à la date de début"
    ),
    offerType: z.string({
        required_error: "Veuillez sélectionner un type d'offre",
    }),
    organization: z.string({
        required_error: "Veuillez sélectionner un organisme",
    }),
    age_min: z.coerce.number( {
        required_error: "Veuillez sélectionner un âge minimum",
    }).refine(
        (data) => data > 0 && data <= 18, "L'âge maximum doit être entre 1 et 18 ans"
    ),
    // Verify age_max is upper than age_min
    age_max: z.coerce.number( {
        required_error: "Veuillez sélectionner un âge maximum",
    }).refine(
        (data) => data > 0 && data <= 18, "L'âge maximum doit être entre 1 et 18 ans"
    ),
    city: z.string().optional(),
    zip: z.string().optional(),
    country: z.string({
        required_error: "Veuillez saisir un pays",
    }).min(1),
    intern: z.boolean().default(false).optional(),
}).superRefine((data, context) => {
    if (data.age_min > data.age_max) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["age_max"],
            message: "L'âge maximum doit être supérieur à l'âge minimum",
        });
    }
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
                  <FormLabel htmlFor="contract">Titre de l'offre<span className="text-red-600">*</span></FormLabel>
                  <Input {...field} id="title" placeholder="Titre de l'offre"/>
                  <FormMessage />
              </FormItem>
          )} />

          <FormField control={form.control} name="offerType" render={({field}) => (
              <FormItem className="flex-1">
                  <FormLabel htmlFor="contract">Type d&apos;offre<span className="text-red-600">*</span></FormLabel>
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
                      <FormLabel htmlFor="contract">Type de contrat<span className="text-red-600">*</span></FormLabel>
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
                          <FormLabel htmlFor="dateRange">Période de travail<span
                              className="text-red-600">*</span></FormLabel>
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
                      <FormItem className="flex-1">
                          <FormLabel className="mt-auto">Organisme<span className="text-red-600">*</span></FormLabel>
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
                            <FormMessage />
                            <p className="text-sm text-muted-foreground mt-1">
                                Si l'organisme n'est pas dans la liste, veuillez le créer <Link href={`/organizations/create`} className={"underline"}>ici</Link>.
                            </p>
                      </FormItem>
                  )}
              />
          </div>

          <FormField control={form.control} name="age_min" defaultValue={1} render={({field}) => (
                <FormItem>
                    <FormLabel htmlFor="description">Age minimum <span className="text-red-600">*</span> ({field.value ?? ""} {field.value ? (field.value > 1 ? "ans" : "an") : ""})</FormLabel>
                    <Slider defaultValue={field.value ?? 1} max={18} min={1} step={1} {...field} onValueChange={(vals) => {
                        field.onChange(vals)
                    }} value={[form.getValues("age_min") ?? 1]} />
                    <FormMessage />
                </FormItem>
            )} />

          <FormField control={form.control} name="age_max" defaultValue={18} render={({field}) => (
              <FormItem>
                  <FormLabel htmlFor="description">Age maximum <span className="text-red-600">*</span> ({field.value ?? ""} {field.value ? (field.value > 1 ? "ans" : "an") : ""})</FormLabel>
                  <Slider defaultValue={field.value ?? 18} max={18} min={1} step={1} {...field} onValueChange={(vals) => {
                      field.onChange(vals)
                  }} value={[form.getValues("age_max") ?? 18]} />
                  <FormMessage />
              </FormItem>
          )} />

          <div className="flex gap-5 w-full">
              <FormField control={form.control} name="city" render={({field}) => (
                  <FormItem className="flex-1">
                      <FormLabel htmlFor="city">Ville</FormLabel>
                      <Input {...field} id="city" placeholder="Ville" />
                      <FormMessage />
                  </FormItem>
              )} />

              <FormField control={form.control} name="zip" render={({field}) => (
                  <FormItem className="flex-1">
                      <FormLabel htmlFor="zip">Code postal</FormLabel>
                      <Input {...field} id="zip" placeholder="Code Postal" />
                      <FormMessage />
                  </FormItem>
              )} />

              <FormField control={form.control} name="country" render={({field}) => (
                  <FormItem className="flex-1">
                      <FormLabel htmlFor="country">Code postal<span className="text-red-600">*</span></FormLabel>
                      <Input {...field} id="country" placeholder="Pays" />
                      <FormMessage />
                  </FormItem>
              )} />
          </div>

          <FormField control={form.control} name="intern" render={({field}) => (
              <FormItem className="mt-3">
                  <div className="flex items-center space-x-2">
                      <FormControl>
                          <Checkbox id="intern" checked={field.value} onCheckedChange={field.onChange}/>
                      </FormControl>
                      <FormLabel
                          htmlFor="intern"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                          Accepter les candidatures de stagiaires
                      </FormLabel>
                  </div>
                  <FormMessage/>
              </FormItem>
          )}/>

          <FormField control={form.control} name="description" render={({field}) => (
              <FormItem>
                  <FormLabel htmlFor="description">Description<span className="text-red-600">*</span></FormLabel>
                  <ContentTextArea className="text-sm" id="description" {...field} placeholder="Veuillez taper une la description de votre offre" />
                  <FormMessage />
              </FormItem>
          )} />

          <hr/>

          <div className="flex w-full justify-between items-center">
              <p className="text-muted-foreground text-sm">Les champs marqués d&apos;un <span
                  className="text-red-600">*</span> sont obligatoires</p>
              <Button type="submit">
                  Publier
              </Button>
          </div>
      </Form>
    </OfferLayout>
    );
}