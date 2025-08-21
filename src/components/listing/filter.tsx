import React from 'react'
import { cn } from '@/lib/utils'

interface FilterProps {
    label: string
    isActive: boolean
    onClick: () => void
}

export default function Filter({ label, isActive, onClick }: FilterProps) {
    return (
        <div onClick={onClick} className={cn('flex items-center justify-center bg-card rounded-md p-2 text-card-foreground cursor-pointer', isActive && 'bg-primary text-white')}>
            <p className='text-sm font-medium'>{label}</p>
        </div>
    )
}
