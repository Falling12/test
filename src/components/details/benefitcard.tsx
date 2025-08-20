import React from 'react'
import Image from 'next/image'

interface BenefitCardProps {
    title: string
    icon: string
}

export default function BenefitCard({ title, icon }: BenefitCardProps) {
    return (
        <div className='flex items-center gap-4 rounded-md p-4 bg-card flex-1 basis-[calc(50%-0.25rem)] min-w-0'>
            <Image src={icon} alt={title} width={30} height={30} className='object-contain' />

            <p className='text-sm text-color-gray-800 font-semibold'>{title}</p>
        </div>
    )
}
