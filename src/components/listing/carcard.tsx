import { getImageAlt, getImageUrl } from '@/lib/server-utils'
import { Car } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import DetailChip from './detailchip'
import { getFuelType, getTransmissionType } from '@/lib/listingutils'
import Link from 'next/link'

interface CarCardProps {
    car: Car
    filter?: string
}

export default async function CarCard({ car, filter }: CarCardProps) {
    const href = filter ? `/details/${car.id}?type=${filter}` : `/details/${car.id}`

    const getPriceDisplay = () => {
        switch (filter) {
            case 'is_rentable':
                const rentalPrice = car.packages_prices?.renting?.renting_price_per_month
                if (rentalPrice) {
                    return {
                        price: rentalPrice,
                        label: '',
                        suffix: '-tól'
                    }
                }
                break
            case 'is_leasable':
                const leasePrice = car.packages_prices?.lease?.lease_price_per_month
                return {
                    price: leasePrice,
                    label: '',
                    suffix: '-tól'
                }

            case 'is_subscribable':
            default:
                const subscriptionPrice = car.packages_prices?.subscription?.subscription_price_per_year ?? 0
                return {
                    price: subscriptionPrice.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                    label: 'Havi',
                    suffix: 'Ft-tól'
                }
        }
        return {
            price: 0,
            label: 'Havi',
            suffix: '-tól'
        }
    }

    const { price, label, suffix } = getPriceDisplay()

    return (
        <Link href={href} className="relative w-full aspect-[378/339] group hover:translate-y-[-5px] transition-all duration-300" scroll={false}>
            <Image
                src={await getImageUrl(car.preview?.image)}
                alt={getImageAlt(car.preview?.image)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className='rounded-lg object-cover'
            />

            <div className='absolute inset-0 w-full h-full flex flex-col justify-between rounded-lg overflow-hidden'>
                <div className='flex flex-col py-6 px-4'>
                    <h3 className='text-xl font-semibold text-white' aria-label={`${car.car_details.manufacturer} ${car.car_details.model}`}>{car.car_details.manufacturer} {car.car_details.model}</h3>
                    <p className='text-sm text-white font-medium'>{car.car_details.additional_info}</p>
                </div>

                <div className='flex flex-col gap-2 py-6 px-4' style={{
                    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
                }}>
                    <div className='border rounded-full py-1 px-2 border-white/30 flex items-center justify-center w-fit'>
                        <p className='text-white text-xs font-medium'>
                            Átvehető: {new Date(car.car_details.handover?.handover_date ?? '').toLocaleDateString('hu-HU', { day: '2-digit', month: '2-digit', year: 'numeric' })}-tól
                        </p>
                    </div>

                    <div className='flex items-center gap-2'>
                        {car.car_details.kilometers && <DetailChip label={`${car.car_details.kilometers} km`} variant='light' />}
                        {car.car_details.year && <DetailChip label={`${car.car_details.year}`} variant='light' />}
                        {car.car_details.fuel_type && <DetailChip label={`${getFuelType(car.car_details.fuel_type)}`} variant='light' />}
                        {car.car_details.gearbox && <DetailChip label={`${getTransmissionType(car.car_details.gearbox)}`} variant='light' />}
                    </div>

                    <p className='text-white text-xl font-bold'>{label} {price} {suffix}</p>
                </div>
            </div>

            {
                car.car_details.promotion?.is_promotional && (
                    <div className='absolute top-[96%] left-1/2 -translate-x-1/2 bg-yellow-300 rounded-full text-black px-2 py-1 text-xs w-[90%] font-medium text-center'>
                        {car.car_details.promotion?.promotion_text}
                    </div>
                )
            }
        </Link>
    )
}
