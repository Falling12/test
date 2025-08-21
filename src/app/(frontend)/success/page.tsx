import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { Car } from '@/payload-types'
import { getImageUrl } from '@/lib/server-utils'
import SuccessPageClient from '@/components/success/success-client'

const getCar = async (id: string): Promise<Car | null> => {
    try {
        const payload = await getPayload({
            config: payloadConfig
        })

        const car = await payload.find({
            collection: 'cars',
            depth: 1,
            where: {
                id: { equals: id }
            },
            limit: 1
        })

        return car.docs[0] || null
    } catch (error) {
        console.error('Error fetching car:', error)
        return null
    }
}

interface SuccessPageProps {
    searchParams: Promise<{
        carId?: string
    }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const params = await searchParams
    const { carId } = params

    if (!carId) {
        return notFound()
    }

    const car = await getCar(carId)

    if (!car) {
        return notFound()
    }

    const imageUrl = await getImageUrl(car.preview?.image)

    return (
        <SuccessPageClient
            carData={car}
            imageUrl={imageUrl}
        />
    )
}
