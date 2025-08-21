"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createReservation } from '@/actions/customeractions'
import { toast } from 'sonner'
import { Reservation } from '@/payload-types'
import * as z from 'zod'

interface EmailDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    carInfo: {
        id: string
        manufacturer: string
        model: string
        subscriptionPlan?: string
        additionalInfo?: string
        imageUrl?: string
        year?: string
        kilometers?: string
        fuelType?: string
        gearbox?: string
        type?: string
        leasingPrice?: number
        rentalPrice?: number
    }
}

const formSchema = z.object({
    email: z.string().min(1, "E-mail cím kötelező").email("Érvényes e-mail címet adjon meg"),
    name: z.string().min(2, "Név kötelező (minimum 2 karakter)"),
    phone: z.string().min(1, "Telefonszám kötelező").regex(/^[+]?[0-9\s\-\(\)]+$/, "Érvényes telefonszámot adjon meg")
})

type EmailFormValues = z.infer<typeof formSchema>

export default function EmailDialog({ open, onOpenChange, carInfo }: EmailDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkScreenSize()

        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const form = useForm<EmailFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            name: '',
            phone: ''
        }
    })

    const handleSubmit = async (values: EmailFormValues) => {
        setIsSubmitting(true)
        console.log(carInfo)
        try {
            const reservationType = carInfo.type === 'is_rentable' ? 'rental' : 'subscription'

            const result = await createReservation({
                car: parseInt(carInfo.id),
                email: values.email,
                name: values.name,
                phone: values.phone,
                subscription_type: carInfo.subscriptionPlan,
                type: reservationType,
                leasing_price: carInfo.leasingPrice,
                rental_price: carInfo.rentalPrice
            } as Reservation)

            if (result.success) {

                const params = new URLSearchParams({
                    carId: carInfo.id,
                    email: values.email,
                    name: values.name,
                    phone: values.phone
                })

                if (carInfo.subscriptionPlan) {
                    params.set('subscriptionPlan', carInfo.subscriptionPlan)
                }

                router.push(`/success?${params.toString()}`)
                onOpenChange(false)
                form.reset()
            } else {
                console.error('Error creating customer:', result.error)
            }
        } catch (error) {
            console.error('Error submitting email:', error)
            toast.error('Hiba történt! Próbálja újra később.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formContent = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Név</FormLabel>
                            <FormControl>
                                <input
                                    type="text"
                                    placeholder="Teljes név"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...field}
                                />
                            </FormControl>
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>E-mail cím</FormLabel>
                            <FormControl>
                                <input
                                    type="email"
                                    placeholder="pelda@email.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...field}
                                />
                            </FormControl>
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Telefonszám</FormLabel>
                            <FormControl>
                                <input
                                    type="tel"
                                    placeholder="+36 30 123 4567"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...field}
                                />
                            </FormControl>
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                <div className="flex gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1"
                    >
                        Mégse
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1"
                    >
                        {isSubmitting ? '...' : 'Tovább'}
                    </Button>
                </div>
            </form>
        </Form>
    )

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false}>
                <DrawerContent className="max-h-[80vh]">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Kapcsolati adatok megadása</DrawerTitle>
                        <DrawerDescription>
                            Kérjük, adja meg a kapcsolati adatait a további információkért.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-4">
                        {formContent}
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Kapcsolati adatok megadása</DialogTitle>
                    <DialogDescription>
                        Kérjük, adja meg a kapcsolati adatait a további információkért.
                    </DialogDescription>
                </DialogHeader>
                {formContent}
            </DialogContent>
        </Dialog>
    )
}
