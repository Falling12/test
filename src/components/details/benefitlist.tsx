import React from 'react'
import BenefitCard from './benefitcard'
import { Car } from '@/payload-types'

const defaultBenefits: {
    title: string
    icon: string
}[] = [
    {
        title: 'Minden hónapban új autó a Te változó igényeidre szabva!',
        icon: '/icons/refresh.svg'
    },
    {
        title: 'Fizess elő több hónapra, és férj hozzá a legkedvezőbb árakhoz!',
        icon: '/icons/calendar.svg'
    },
    {
        title: 'Nyaralsz? Elutazol? Szüneteltesd az előfizetésedet évente akár 4 hétre!',
        icon: '/icons/pause.svg'
    },
    {
        title: 'All inclusive: casco, kgfb, gumi, szerviz, assistance',
        icon: '/icons/stars.svg'
    },
    {
        title: 'Minden pár kattintásra. Előfizetés, csere, ügyintézés digitálisan, egyszerűen!',
        icon: '/icons/shield.svg'
    }
]

interface BenefitListProps {
    car?: Car
    type?: 'is_rentable' | 'is_subscribable' | 'is_leasable'
}

export default function BenefitList({ car, type }: BenefitListProps) {
    let items: { title: string; icon: string }[] = []

    if (car && type === 'is_rentable') {
        const benefits = car.packages_prices?.renting?.benefits
        if (Array.isArray(benefits) && benefits.length > 0) {
            items = benefits.map((b: any) => ({
                title: b.text,
                icon: (typeof b.icon === 'object' && b.icon?.url) ? b.icon.url : '/icons/stars.svg'
            }))
        }
    } else if (car && type === 'is_subscribable') {
        const benefits = car.packages_prices?.subscription?.benefits
        if (Array.isArray(benefits) && benefits.length > 0) {
            items = benefits.map((b: any) => ({
                title: b.text,
                icon: (typeof b.icon === 'object' && b.icon?.url) ? b.icon.url : '/icons/stars.svg'
            }))
        }
    } else if (car && type === 'is_leasable') {
        const benefits = car.packages_prices?.lease?.benefits
        if (Array.isArray(benefits) && benefits.length > 0) {
            items = benefits.map((b: any) => ({
                title: b.text,
                icon: (typeof b.icon === 'object' && b.icon?.url) ? b.icon.url : '/icons/stars.svg'
            }))
        }
    }

    if (items.length === 0) items = defaultBenefits

    return (
        <div className='flex flex-wrap gap-2 w-full max-[768px]:flex-col'>
            {items.map((benefit) => (
                <BenefitCard key={benefit.title} title={benefit.title} icon={benefit.icon} />
            ))}
        </div>
    )
}
