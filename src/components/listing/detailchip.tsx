import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils'

interface DetailChipProps {
    label: string
    variant?: "dark" | "light"
}

const detailChipVariants = cva(
    "flex items-center justify-center py-2 px-[6px] rounded-full bg-white/10",
    {
        variants: {
            variant: {
                dark: "bg-[#F3F4F6] text-[#4A5871]",
                light: "bg-white/10 text-white"
            }
        }
    }

)

export default function DetailChip({ label, variant = "dark" }: DetailChipProps) {
    return (
        <div className={cn(detailChipVariants({ variant }))}>
            <p className='text-xs font-medium'>{label}</p>
        </div>
    )
}
