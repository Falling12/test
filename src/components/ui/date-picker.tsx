"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    value?: Date
    onChange?: (date: Date | undefined) => void
    placeholder?: string
    disabled?: (date: Date) => boolean
    className?: string
    id?: string
}

export function DatePicker({
    value,
    onChange,
    placeholder = "Válasszon dátumot",
    disabled,
    className,
    id,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id={id}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "yyyy. MM. dd.") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                        onChange?.(date)
                        setOpen(false)
                    }}
                    disabled={disabled}
                    captionLayout="dropdown"
                />
            </PopoverContent>
        </Popover>
    )
}

interface DateRangePickerProps {
    startDate?: Date
    endDate?: Date
    onStartDateChange?: (date: Date | undefined) => void
    onEndDateChange?: (date: Date | undefined) => void
    startPlaceholder?: string
    endPlaceholder?: string
    startDisabled?: (date: Date) => boolean
    endDisabled?: (date: Date) => boolean
    className?: string
    endDateReadonly?: boolean
}

export function DateRangePicker({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    startPlaceholder = "Kezdő dátum",
    endPlaceholder = "Befejező dátum",
    startDisabled,
    endDisabled,
    className,
    endDateReadonly = false,
}: DateRangePickerProps) {
    return (
        <div className={cn("flex gap-2", className)}>
            <div className="flex-1">
                <DatePicker
                    value={startDate}
                    onChange={onStartDateChange}
                    placeholder={startPlaceholder}
                    disabled={startDisabled}
                    id="start-date"
                />
            </div>
            <div className="flex-1">
                <DatePicker
                    value={endDate}
                    onChange={endDateReadonly ? undefined : onEndDateChange}
                    placeholder={endPlaceholder}
                    disabled={endDisabled}
                    className={endDateReadonly ? "cursor-not-allowed opacity-60" : ""}
                    id="end-date"
                />
            </div>
        </div>
    )
}
