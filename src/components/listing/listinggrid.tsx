import { Car } from '@/payload-types'
import React from 'react'
import CarCard from './carcard'

interface ListingGridProps {
  cars: Car[]
  filter?: string
}

export default function ListingGrid({ cars, filter }: ListingGridProps) {
  return (
    <div className='grid grid-cols-3 gap-2 max-[1400px]:grid-cols-2 max-[900px]:grid-cols-1 gap-y-8'>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} filter={filter} />
      ))}
    </div>
  )
}
