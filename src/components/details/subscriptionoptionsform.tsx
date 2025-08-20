"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { RadioGroup } from '@/components/ui/radio-group'
import SubscriptionDetailCard from '@/components/details/subscriptiondetailcard'
import { Car } from '@/payload-types'

type FormValues = {
    subscription: 'daily' | 'monthly' | 'quarterly' | 'halfyearly' | 'yearly'
}

interface SubscriptionOptionsFormProps {
    car: Car
    formId?: string
    onSubmit?: (data: { carId: number, plan: FormValues['subscription'] }) => void
}

export default function SubscriptionOptionsForm({ car, formId = 'subscription-form', onSubmit }: SubscriptionOptionsFormProps) {
    const subscription = car.packages_prices?.subscription

    const options = [
        subscription?.subscription_price_per_day != null ? 'daily' : null,
        subscription?.subscription_price_per_month != null ? 'monthly' : null,
        subscription?.subscription_price_per_quarter != null ? 'quarterly' : null,
        subscription?.subscription_price_per_half_year != null ? 'halfyearly' : null,
        subscription?.subscription_price_per_year != null ? 'yearly' : null,
    ].filter(Boolean) as FormValues['subscription'][]

    const defaultPlan = options[0]

    const form = useForm<FormValues>({
        defaultValues: {
            subscription: defaultPlan,
        }
    })

    const handleSubmit = (values: FormValues) => {
        if (onSubmit) {
            onSubmit({ carId: car.id, plan: values.subscription })
        } else {
            console.log('Selected subscription', { carId: car.id, plan: values.subscription })
        }
    }

    if (!subscription || options.length === 0) {
        return null
    }

    return (
        <Form {...form}>
            <form id={formId} onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-3'>
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
                                    {options.map((opt) => (
                                        <SubscriptionDetailCard
                                            key={opt}
                                            type={opt}
                                            value={opt}
                                            isSelected={field.value === opt}
                                            price={subscription.subscription_price_per_day ?? 0}
                                            price_per_month={subscription.subscription_price_per_month ?? 0}
                                            price_per_quarter={subscription.subscription_price_per_quarter ?? 0}
                                            price_per_halfyear={subscription.subscription_price_per_half_year ?? 0}
                                            price_per_year={subscription.subscription_price_per_year ?? 0}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}


