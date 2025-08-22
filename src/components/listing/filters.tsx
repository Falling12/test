'use client'

import React from 'react'
import Filter from './filter'
import { useRouter, useSearchParams } from 'next/navigation'
import { DateRangePicker } from '@/components/ui/date-picker'

const filters = [
    {
        label: 'Autókölcsönzés',
        key: 'is_rentable',
    },
    {
        label: 'Autóelőfizetés',
        key: 'is_subscribable',
    },
    {
        label: 'Autólízing',
        key: 'is_leasable',
    }
]

export default function Filters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeFilter = searchParams.get('filter') as 'is_rentable' | 'is_subscribable' | 'is_leasable' || 'is_rentable'

    const handleFilterChange = (filterKey: 'is_rentable' | 'is_subscribable' | 'is_leasable') => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('filter', filterKey)
        params.delete('page') // Reset to first page when filter changes

        // If leaving rental, drop dates; if switching to rental and missing dates, add defaults
        if (filterKey !== 'is_rentable') {
            params.delete('startDate')
            params.delete('endDate')
        } else {
            const startParam = searchParams.get('startDate')
            const endParam = searchParams.get('endDate')
            if (!startParam || !endParam) {
                const today = new Date()
                const tomorrow = new Date(today)
                tomorrow.setDate(today.getDate() + 1)
                params.set('startDate', today.toISOString().split('T')[0])
                params.set('endDate', tomorrow.toISOString().split('T')[0])
            }
        }

        router.push(`/?${params.toString()}`, { scroll: false })
    }

    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')
    const startDate = startDateParam ? new Date(startDateParam) : undefined
    const endDate = endDateParam ? new Date(endDateParam) : undefined

    const updateDate = (which: 'start' | 'end', date: Date | undefined) => {
        if (activeFilter !== 'is_rentable') return
        const params = new URLSearchParams(searchParams.toString())
        if (which === 'start') {
            if (date) params.set('startDate', date.toISOString().split('T')[0])
            else params.delete('startDate')
            // Auto-adjust end if missing
            const currentEnd = params.get('endDate')
            if (!currentEnd && date) {
                const next = new Date(date)
                next.setDate(next.getDate() + 1)
                params.set('endDate', next.toISOString().split('T')[0])
            }
        } else {
            if (date) params.set('endDate', date.toISOString().split('T')[0])
            else params.delete('endDate')
        }
        params.delete('page')
        router.push(`/?${params.toString()}`, { scroll: false })
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
                {
                    filters.map((filter) => (
                        <Filter
                            key={filter.key}
                            label={filter.label}
                            isActive={activeFilter === filter.key}
                            onClick={() => handleFilterChange(filter.key as 'is_rentable' | 'is_subscribable' | 'is_leasable')}
                        />
                    ))
                }
            </div>

            {activeFilter === 'is_rentable' && (
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={(d) => updateDate('start', d)}
                    onEndDateChange={(d) => updateDate('end', d)}
                    startPlaceholder="Kezdő dátum"
                    endPlaceholder="Befejező dátum"
                    startDisabled={(date) => date < new Date(new Date().toDateString())}
                    endDisabled={(date) => {
                        const min = startDate ? new Date(startDate.toDateString()) : new Date(new Date().toDateString())
                        return date < min
                    }}
                />
            )}
        </div>
    )
}
