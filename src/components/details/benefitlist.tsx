import React from 'react'
import BenefitCard from './benefitcard'

const benefits: {
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

export default function BenefitList() {
    return (
        <div className='flex flex-wrap gap-2 w-full max-[768px]:flex-col'>
            {benefits.map((benefit) => (
                <BenefitCard key={benefit.title} title={benefit.title} icon={benefit.icon} />
            ))}
        </div>
    )
}
