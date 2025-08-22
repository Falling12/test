"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { RadioGroup } from '@/components/ui/radio-group'
import SubscriptionDetailCard from '@/components/details/subscriptiondetailcard'
import { Car, SubscriptionsFaq } from '@/payload-types'
import EmailDialog from './emaildialog'
import { useSearchParams } from 'next/navigation'

const SUBSCRIPTION_TYPES = {
    QUARTERLY: 'quarterly',
    HALFYEARLY: 'halfyearly',
    YEARLY: 'yearly'
} as const

type SubscriptionType = typeof SUBSCRIPTION_TYPES[keyof typeof SUBSCRIPTION_TYPES]

export type FormValues = {
    subscription: SubscriptionType
}

const getSubscriptionPrice = (subscription: any, type: SubscriptionType): number => {
    const priceMap = {
        [SUBSCRIPTION_TYPES.QUARTERLY]: subscription?.subscription_price_per_quarter,
        [SUBSCRIPTION_TYPES.HALFYEARLY]: subscription?.subscription_price_per_half_year,
        [SUBSCRIPTION_TYPES.YEARLY]: subscription?.subscription_price_per_year
    }
    return priceMap[type] ?? 0
}

const getAvailableOptions = (subscription: any): SubscriptionType[] => {
    return Object.values(SUBSCRIPTION_TYPES).filter(type =>
        getSubscriptionPrice(subscription, type) > 0
    )
}

interface SubscriptionOptionsFormProps {
    car: Car
    imageUrl: string
    type?: string
    faqData?: SubscriptionsFaq
    times?: {
        pickupOptions?: string[]
        dropoffOptions?: string[]
        pickupWarnHour?: number | null
        dropoffWarnHour?: number | null
        pickupWarnMsg?: string
        dropoffWarnMsg?: string
    }
}

export default function SubscriptionOptionsForm({ car, imageUrl, type, faqData, times }: SubscriptionOptionsFormProps) {
    const subscription = car.packages_prices?.subscription
    const options = getAvailableOptions(subscription)
    const defaultPlan = options[2]

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionType>(defaultPlan)
    const searchParams = useSearchParams()
    const rentalStart = searchParams.get('startDate')
    const rentalEnd = searchParams.get('endDate')

    const form = useForm<FormValues>({
        defaultValues: {
            subscription: defaultPlan,
        }
    })

    const handleSubmit = (values: FormValues) => {
        if (type === 'is_rentable') {
            setSelectedPlan('quarterly')
        } else if (type === 'is_leasable') {
            // For leasing, we don't need a subscription plan
            setSelectedPlan('quarterly') // Default value, won't be used
        } else {
            setSelectedPlan(values.subscription)
        }
        setIsDialogOpen(true)
    }

    if (type === 'is_leasable') {
        // For leasing, we don't show subscription options, just handle the form
        return (
            <Form {...form}>
                <form id="subscription-form" onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-3'>
                    <EmailDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        carInfo={{
                            id: car.id.toString(),
                            manufacturer: car.car_details.manufacturer,
                            model: car.car_details.model,
                            subscriptionPlan: undefined, // No subscription for leasing
                            additionalInfo: car.car_details.additional_info || undefined,
                            imageUrl: encodeURIComponent(imageUrl),
                            year: car.car_details.year?.toString(),
                            kilometers: car.car_details.kilometers?.toString(),
                            fuelType: car.car_details.fuel_type,
                            gearbox: car.car_details.gearbox,
                            type: type,
                            leasingPrice: car.packages_prices?.lease?.lease_price_per_month ?? undefined,
                            rentalPrice: car.packages_prices?.renting?.renting_price_per_month ?? undefined
                        }}
                        times={times}
                    />
                </form>
            </Form>
        )
    }

    if (type !== 'is_rentable' && (!subscription || options.length === 0)) {
        return null
    }

    return (
        <Form {...form}>
            <form id="subscription-form" onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-3'>
                <FormField
                    control={form.control}
                    name="subscription"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className='grid gap-3'
                                >
                                    {options.map((type) => (
                                        <SubscriptionDetailCard
                                            key={type}
                                            type={type}
                                            value={type}
                                            isSelected={field.value === type}
                                            price={getSubscriptionPrice(subscription, type)}
                                            price_per_quarter={getSubscriptionPrice(subscription, SUBSCRIPTION_TYPES.QUARTERLY)}
                                            price_per_halfyear={getSubscriptionPrice(subscription, SUBSCRIPTION_TYPES.HALFYEARLY)}
                                            price_per_year={getSubscriptionPrice(subscription, SUBSCRIPTION_TYPES.YEARLY)}
                                            faqData={faqData}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <EmailDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    carInfo={{
                        id: car.id.toString(),
                        manufacturer: car.car_details.manufacturer,
                        model: car.car_details.model,
                        subscriptionPlan: type === 'is_rentable' ? undefined : selectedPlan,
                        additionalInfo: car.car_details.additional_info || undefined,
                        imageUrl: encodeURIComponent(imageUrl),
                        year: car.car_details.year?.toString(),
                        kilometers: car.car_details.kilometers?.toString(),
                        fuelType: car.car_details.fuel_type,
                        gearbox: car.car_details.gearbox,
                        type: type,
                        leasingPrice: car.packages_prices?.lease?.lease_price_per_month ?? undefined,
                        rentalPrice: car.packages_prices?.renting?.renting_price_per_month ?? undefined,
                        rentalStartDateStr: rentalStart || undefined,
                        rentalEndDateStr: rentalEnd || undefined
                    }}
                    times={times}
                />
            </form>
        </Form>
    )
}