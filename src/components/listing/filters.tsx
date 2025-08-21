'use client'

import React from 'react'
import Filter from './filter'
import { useRouter, useSearchParams } from 'next/navigation'

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
        router.push(`/?${params.toString()}`, { scroll: false })
    }

    return (
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
    )
}
