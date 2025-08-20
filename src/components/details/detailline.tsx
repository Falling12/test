import React from 'react'

interface DetailLineProps {
    label: string
    value: string
}

export default function DetailLine({ label, value }: DetailLineProps) {
    return (
        <div className='flex items-center justify-between'>
            <p className='text-sm text-card-foreground-secondary'>{label}</p>
            <p className='text-sm font-medium text-color-gray-800'>{value}</p>
        </div>
    )
}
