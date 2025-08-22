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
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { addMonths } from 'date-fns'
import Link from 'next/link'

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
        leasingPrice?: string
        rentalPrice?: string
        rentalStartDateStr?: string
        rentalEndDateStr?: string
    }
    times?: {
        pickupOptions?: string[]
        dropoffOptions?: string[]
        pickupWarnHour?: number | null
        dropoffWarnHour?: number | null
        pickupWarnMsg?: string
        dropoffWarnMsg?: string
    }
}

const formSchema = z.object({
    email: z.string().min(1, "E-mail cím kötelező").email("Érvényes e-mail címet adjon meg"),
    name: z.string().min(2, "Név kötelező (minimum 2 karakter)"),
    phone: z.string().min(1, "Telefonszám kötelező").regex(/^[+]?[0-9\s\-\(\)]+$/, "Érvényes telefonszámot adjon meg"),
    acceptTermsAndConditions: z.boolean().refine((val) => val, {
        message: "Kérjük, fogadja el a feltételeket!"
    }),
    rentalStartDate: z.date().optional(),
    rentalEndDate: z.date().optional(),
    subscriptionStartDate: z.date().optional(),
    pickupTime: z.string().optional(),
    dropoffTime: z.string().optional(),
})

type EmailFormValues = z.infer<typeof formSchema>

export default function EmailDialog({ open, onOpenChange, carInfo, times }: EmailDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const router = useRouter()
    const pickupOptions = times?.pickupOptions ?? []
    const dropoffOptions = times?.dropoffOptions ?? []
    const pickupWarnHour = times?.pickupWarnHour ?? 12
    const dropoffWarnHour = times?.dropoffWarnHour ?? 14
    const pickupWarnMsg = times?.pickupWarnMsg ?? '12:00 vagy az előtti átvétel esetén extra egyeztetés szükséges.'
    const dropoffWarnMsg = times?.dropoffWarnMsg ?? '14:00 vagy az utáni leadás esetén extra egyeztetés szükséges.'

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
            phone: '',
            rentalStartDate: carInfo.rentalStartDateStr ? new Date(carInfo.rentalStartDateStr) : undefined,
            rentalEndDate: carInfo.rentalEndDateStr ? new Date(carInfo.rentalEndDateStr) : undefined,
            subscriptionStartDate: undefined,
            pickupTime: undefined,
            dropoffTime: undefined
        }
    })

    const subscriptionStartDate = form.watch('subscriptionStartDate')
    const pickupTime = form.watch('pickupTime')
    const dropoffTime = form.watch('dropoffTime')

    React.useEffect(() => {
        if (carInfo.type === 'is_subscribable' && subscriptionStartDate) {
            addMonths(subscriptionStartDate, 1)
        }
    }, [subscriptionStartDate, carInfo.type])

    const handleSubmit = async (values: EmailFormValues) => {
        setIsSubmitting(true)
        console.log(carInfo)
        try {
            let reservationType: 'rental' | 'leasing' | 'subscription'
            if (carInfo.type === 'is_rentable') {
                reservationType = 'rental'
            } else if (carInfo.type === 'is_leasable') {
                reservationType = 'leasing'
            } else {
                reservationType = 'subscription'
            }

            if (reservationType === 'rental') {
                if (!values.rentalStartDate || !values.rentalEndDate) {
                    toast.error('Kérjük, válassza ki a bérlési időszakot!')
                    setIsSubmitting(false)
                    return
                }
                if (values.rentalEndDate <= values.rentalStartDate) {
                    toast.error('A befejező dátum későbbi kell legyen, mint a kezdő dátum!')
                    setIsSubmitting(false)
                    return
                }
                if (!values.pickupTime || !values.dropoffTime) {
                    toast.error('Kérjük, válassza ki az átvételi és leadási időpontot!')
                    setIsSubmitting(false)
                    return
                }
            } else if (reservationType === 'subscription') {
                if (!values.subscriptionStartDate) {
                    toast.error('Kérjük, válassza ki az előfizetés kezdő dátumát!')
                    setIsSubmitting(false)
                    return
                }
            }

            let dateData = {}
            if (reservationType === 'rental') {
                dateData = {
                    rental_period_start: values.rentalStartDate?.toISOString(),
                    rental_period_end: values.rentalEndDate?.toISOString(),
                    pickup_time: values.pickupTime,
                    dropoff_time: values.dropoffTime
                }
            } else if (reservationType === 'subscription') {
                const endDate = values.subscriptionStartDate ? addMonths(values.subscriptionStartDate, 1) : undefined
                dateData = {
                    subscription_period_start: values.subscriptionStartDate?.toISOString(),
                    subscription_period_end: endDate?.toISOString()
                }
            }

            const result = await createReservation({
                car: parseInt(carInfo.id),
                email: values.email,
                name: values.name,
                phone: values.phone,
                subscription_type: carInfo.subscriptionPlan,
                type: reservationType,
                ...dateData
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

                {carInfo.type === 'is_rentable' && (
                    <div className="space-y-4">
                        {!(carInfo.rentalStartDateStr && carInfo.rentalEndDateStr) && (
                            <>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Bérlési időszak</label>
                                    <FormField
                                        control={form.control}
                                        name="rentalStartDate"
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel>Kezdő dátum</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Válassza ki a kezdő dátumot"
                                                        disabled={(date) => date < new Date()}
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
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="rentalEndDate"
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel>Befejező dátum</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Válassza ki a befejező dátumot"
                                                        disabled={(date) => {
                                                            const startDate = form.getValues('rentalStartDate')
                                                            return date < new Date() || (startDate ? date <= startDate : false)
                                                        }}
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
                                </div>
                            </>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="pickupTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Átvételi idő</FormLabel>
                                        <FormControl>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={field.value || ''}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            >
                                                <option value="">Válasszon</option>
                                                {pickupOptions.map((t) => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        {pickupTime && pickupWarnHour !== null && parseInt(pickupTime.split(':')[0], 10) <= pickupWarnHour && (
                                            <div className="mt-2 p-2 bg-yellow-100 rounded text-sm text-[#575757]">
                                                {pickupWarnMsg}
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dropoffTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Leadási idő</FormLabel>
                                        <FormControl>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                value={field.value || ''}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            >
                                                <option value="">Válasszon</option>
                                                {dropoffOptions.map((t) => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        {dropoffTime && dropoffWarnHour !== null && parseInt(dropoffTime.split(':')[0], 10) >= dropoffWarnHour && (
                                            <div className="mt-2 p-2 bg-yellow-100 rounded text-sm text-[#575757]">
                                                {dropoffWarnMsg}
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}

                {carInfo.subscriptionPlan && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Előfizetési időszak</label>
                            <FormField
                                control={form.control}
                                name="subscriptionStartDate"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Kezdő dátum</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Válassza ki a kezdő dátumot"
                                                disabled={(date) => date < new Date()}
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Minimum időszak: 1 hónap
                                            {field.value && (
                                                <span className="block">
                                                    Befejező dátum: {addMonths(field.value, 1).toLocaleDateString('hu-HU', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            )}
                                        </p>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="acceptTermsAndConditions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <p>Elfogadom az <Link href="/aszf" className='text-blue-500 underline'>Adatkezelési tájékoztató</Link> feltételeit</p>
                            </FormLabel>
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
                        {isSubmitting ? 'Foglalás folyamatban...' : 'Foglalás'}
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
