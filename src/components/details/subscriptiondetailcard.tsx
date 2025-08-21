import React, { useState, useEffect } from 'react'
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
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

type SubscriptionType = 'quarterly' | 'halfyearly' | 'yearly'

interface SubscriptionDetailCardProps {
    type: SubscriptionType
    price: number
    price_per_quarter: number
    price_per_halfyear: number
    price_per_year: number
    value: string
    isSelected?: boolean
}

const getMainPrice = (type: SubscriptionType, props: SubscriptionDetailCardProps) => {
    const priceMap = {
        quarterly: props.price_per_quarter,
        halfyearly: props.price_per_halfyear,
        yearly: props.price_per_year
    }
    return priceMap[type] ?? props.price
}

const getSubText = (type: SubscriptionType) => {
    const textMap = {
        quarterly: '3 hónapos előfizetés esetén',
        halfyearly: '6 hónapos előfizetés esetén',
        yearly: '12 hónapos előfizetés esetén'
    }
    return textMap[type] ?? ''
}

export default function SubscriptionDetailCard({ type, value, isSelected, ...priceProps }: SubscriptionDetailCardProps) {
    const [isMobile, setIsMobile] = useState(false)
    const mainPrice = getMainPrice(type, { type, value, ...priceProps })

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const contentDetails = (
        <div className='flex flex-col gap-4'>
            <div className='bg-card rounded-lg p-4 gap-2'>
                <h4 className='font-semibold text-base text-gray-800'>Muszáj minden hónapban új autót választanom?</h4>
                <p className='font-normal text-sm text-card-foreground-secondary'>
                    Lorem ipsum dolor sit amet consectetur. Risus tellus felis rhoncus justo magna. Aliquet sodales commodo ac porta eget arcu. Ac quis cras a sit ut.
                </p>
            </div>
        </div>
    )

    const InfoModal = isMobile ? (
        <Drawer>
            <DrawerTrigger asChild>
                <InfoIcon className='size-5 text-slate-400 cursor-pointer hover:text-slate-500 transition-colors' />
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Előfizetés részletei</DrawerTitle>
                    <DrawerDescription asChild>
                        <div className="px-4 pb-4">
                            {contentDetails}
                        </div>
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    ) : (
        <Dialog>
            <DialogTrigger asChild>
                <InfoIcon className='size-5 text-slate-400 cursor-pointer hover:text-slate-500 transition-colors' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Előfizetés részletei</DialogTitle>
                    <DialogDescription asChild>
                        {contentDetails}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

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

            {InfoModal}
        </label>
    )
}
