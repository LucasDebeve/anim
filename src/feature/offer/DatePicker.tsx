"use client"

import * as React from "react"
import { CalendarIcon} from "lucide-react";
import { addDays, format } from "date-fns"
import {fr} from "date-fns/locale"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({field, className, defaultStartDate, defaultEndDate}: {field: any, className?: string, defaultStartDate?: Date, defaultEndDate?: Date}) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: defaultStartDate ?? new Date(2022, 0, 20),
        to: defaultEndDate ?? (defaultStartDate ? addDays(defaultStartDate, 20) : new Date(2022, 1, 10)),
    })

    return (
        <div className={cn("grid gap-2 w-full", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
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
                        defaultMonth={field.value.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={fr}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
