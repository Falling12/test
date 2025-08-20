import React, { useState } from 'react'
import { FormControl } from '@/components/ui/form'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { InfoIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface SubscriptionDetailCardProps {
    type: 'daily' | 'monthly' | 'quarterly' | 'halfyearly' | 'yearly'
    price: number
    price_per_month: number
    price_per_quarter: number
    price_per_halfyear: number
    price_per_year: number
    value: string
    isSelected?: boolean
}

const getMainPrice = (type: string, props: SubscriptionDetailCardProps) => {
    switch (type) {
        case 'daily': return props.price
        case 'monthly': return props.price_per_month
        case 'quarterly': return props.price_per_quarter
        case 'halfyearly': return props.price_per_halfyear
        case 'yearly': return props.price_per_year
        default: return props.price
    }
}

const getSubText = (type: string) => {
    switch (type) {
        case 'daily': return '1 napos előfizetés esetén'
        case 'monthly': return '1 hónapos előfizetés esetén'
        case 'quarterly': return '3 hónapos előfizetés esetén'
        case 'halfyearly': return '6 hónapos előfizetés esetén'
        case 'yearly': return '12 hónapos előfizetés esetén'
        default: return ''
    }
}

export default function SubscriptionDetailCard({ type, value, isSelected, ...priceProps }: SubscriptionDetailCardProps) {
    const mainPrice = getMainPrice(type, { type, value, ...priceProps })

    return (
        <label className={`flex items-center justify-between bg-card rounded-lg p-4 gap-4 cursor-pointer transition-colors border border-transparent hover:border-slate-300 ${isSelected ? 'border !border-primary' : ''}`}>
            <div className='flex items-center gap-3'>
                <FormControl>
                    <RadioGroupItem value={value} className='size-6' />
                </FormControl>

                <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-base'>{mainPrice.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0, maximumFractionDigits: 0 })} / hónap</p>
                    <p className='text-xs text-muted-foreground'>{getSubText(type)}</p>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <InfoIcon className='size-5 text-slate-400 cursor-pointer hover:text-slate-500 transition-colors' />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Előfizetés részletei</DialogTitle>
                        <DialogDescription asChild>
                            <div className='flex flex-col gap-4'>
                                <div className='bg-card rounded-lg p-4 gap-2'>
                                    <h4 className='font-semibold text-base text-gray-800'>Muszáj minden hónapban új autót választanom?</h4>
                                    <p className='font-normal text-sm text-card-foreground-secondary'>
                                        Lorem ipsum dolor sit amet consectetur. Risus tellus felis rhoncus justo magna. Aliquet sodales commodo ac porta eget arcu. Ac quis cras a sit ut.
                                    </p>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </label>
    )
}
