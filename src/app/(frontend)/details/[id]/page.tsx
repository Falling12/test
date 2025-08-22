import payloadConfig from '@/payload.config'
import { Car } from '@/payload-types'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import DetailChip from '@/components/listing/detailchip'
import { getCarColor, getDriveType, getFuelType, getInteriorMaterial, getTransmissionType } from '@/lib/listingutils'
import Image from 'next/image'
import { getImageAlt, getImageUrl } from '@/lib/server-utils'
import { Button } from '@/components/ui/button'
import SubscriptionOptionsForm from '@/components/details/subscriptionoptionsform'
import DetailLine from '@/components/details/detailline'
import DetailParser from '@/components/details/detailparser'
import BenefitList from '@/components/details/benefitlist'

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

        return car.docs[0]
    } catch (error) {
        console.error(error)
        return null
    }
}

export default async function CarDetailsPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams?: Promise<{ type?: string }>
}) {
    const { id } = await params
    const { type } = await searchParams ?? {}

    const car = await getCar(id)

    if (!car) {
        return notFound()
    }

    return (
        <div className='flex flex-col px-[15%] pb-8 max-[1400px]:px-[10%] max-[900px]:px-[3%] max-[768px]:px-0'>
            <div className='bg-white p-4 border-t border-border px-4 py-4 gap-8 hidden max-[768px]:flex fixed bottom-0 z-10 w-full items-center justify-center'>
                {
                    type === 'is_subscribable' && (
                        <Button variant='default' className='w-full' form="subscription-form" type="submit">
                            Szeretném ezt az autót
                        </Button>
                    )
                }

                {
                    type === 'is_rentable' && (
                        <>
                            <p className='font-bold text-xl text-right'>
                                {car.packages_prices?.renting?.renting_price_per_month}
                            </p>

                            <Button variant='default' className='' form="subscription-form" type="submit">
                                Szeretném ezt az autót
                            </Button>
                        </>
                    )
                }

                {
                    type === 'is_leasable' && (
                        <>
                            <p className='font-bold text-xl text-right'>
                                {car.packages_prices?.lease?.lease_price_per_month}
                            </p>

                            <Button variant='default' className='' form="subscription-form" type="submit">
                                Szeretném ezt az autót
                            </Button>
                        </>
                    )
                }
            </div>

            <div className='flex items-start justify-between sticky top-0 bg-white/80 z-10 py-8 backdrop-blur-xs max-[768px]:hidden'>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-3xl'>
                        {car.car_details.manufacturer} {car.car_details.model}
                    </h1>

                    <p className='text-base text-gray-500'>
                        {car.car_details.additional_info}
                    </p>

                    <div className='flex items-center gap-2'>
                        {car.car_details.kilometers && <DetailChip label={`${car.car_details.kilometers} km`} />}
                        {car.car_details.year && <DetailChip label={`${car.car_details.year}`} />}
                        {car.car_details.fuel_type && <DetailChip label={`${getFuelType(car.car_details.fuel_type)}`} />}
                        {car.car_details.gearbox && <DetailChip label={`${getTransmissionType(car.car_details.gearbox)}`} />}
                    </div>
                </div>

                {
                    type === 'is_rentable' && (
                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-xl text-right'>
                                {car.packages_prices?.renting?.renting_price_per_month}
                            </p>

                            <Button variant='default' className='w-fit' form="subscription-form" type="submit">
                                Szeretném ezt az autót
                            </Button>
                        </div>
                    )
                }

                {
                    type === 'is_subscribable' && (
                        <Button variant='default' className='w-fit' form="subscription-form" type="submit">
                            Szeretném ezt az autót
                        </Button>
                    )
                }

                {
                    type === 'is_leasable' && (
                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-xl text-right'>
                                {car.packages_prices?.lease?.lease_price_per_month}
                            </p>

                            <Button variant='default' className='w-fit' form="subscription-form" type="submit">
                                Szeretném ezt az autót
                            </Button>
                        </div>
                    )
                }
            </div>

            <div className='flex flex-row items-start justify-between gap-4 max-[768px]:flex-col'>
                <div className='hidden max-[768px]:flex flex-col w-full'>
                    <div className='relative w-full'>
                        <Image
                            src={await getImageUrl(car.preview?.image)}
                            alt={getImageAlt(car.preview?.image)}
                            width={550}
                            height={490}
                            priority
                            className='max-w-[40%] w-full h-fit object-contain rounded-lg  max-[768px]:max-w-full max-[768px]:static max-[768px]:rounded-none max-[768px]:w-full max-[768px]:max-h-[400px] max-[768px]:object-cover'
                        />

                        <div className='absolute bottom-0 w-full h-28 flex flex-col justify-between rounded-lg overflow-hidden z-[5]' style={{
                            backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
                        }}>
                            <div className='border rounded-full py-1 px-2 border-white/30 flex items-center justify-center w-fit mt-auto mb-6 ml-3'>
                                <p className='text-white text-sm font-medium'>
                                    Átvehető: {new Date(car.car_details.handover?.handover_date ?? '').toLocaleDateString('hu-HU', { day: '2-digit', month: '2-digit', year: 'numeric' })}-tól
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className='hidden max-[768px]:flex flex-col px-3 py-2'>
                        <h1 className='font-semibold text-xl'>
                            {car.car_details.manufacturer} {car.car_details.model}
                        </h1>

                        <p className='text-sm text-black'>
                            {car.car_details.additional_info}
                        </p>

                        <div className='flex items-center gap-2 mt-1'>
                            {car.car_details.kilometers && <DetailChip label={`${car.car_details.kilometers} km`} />}
                            {car.car_details.year && <DetailChip label={`${car.car_details.year}`} />}
                            {car.car_details.fuel_type && <DetailChip label={`${getFuelType(car.car_details.fuel_type)}`} />}
                            {car.car_details.gearbox && <DetailChip label={`${getTransmissionType(car.car_details.gearbox)}`} />}
                        </div>
                    </div>
                </div>

                <div className='max-w-[40%] w-full max-[768px]:hidden sticky top-44 z-[5]'>
                    <Image
                        src={await getImageUrl(car.preview?.image)}
                        alt={getImageAlt(car.preview?.image)}
                        width={550}
                        height={490}
                        priority
                        className='w-full h-fit object-contain rounded-lg'
                    />

                    <div className='absolute bottom-0 w-full h-28 flex flex-col justify-between rounded-lg overflow-hidden z-[5]' style={{
                        backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
                    }}>
                        <div className='border rounded-full py-1 px-2 border-white/30 flex items-center justify-center w-fit mt-auto mb-6 ml-3'>
                            <p className='text-white text-sm font-medium'>
                                Átvehető: {new Date(car.car_details.handover?.handover_date ?? '').toLocaleDateString('hu-HU', { day: '2-digit', month: '2-digit', year: 'numeric' })}-tól
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-6 max-w-[60%] w-full max-[768px]:max-w-full max-[768px]:px-[3%]'>
                    {
                        type === 'is_subscribable' && (
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-medium text-sm'>
                                    Előfizetési opciók
                                </h3>

                                <SubscriptionOptionsForm car={car} imageUrl={await getImageUrl(car.preview?.image)} type={type} />

                                <div className='flex items-center justify-center p-3 bg-yellow-100 rounded-md gap-2'>
                                    <p className='text-sm text-[#575757]'>
                                        Előfizetés esetén válassz új autót havonta, elérhető modelljeink közül, változó igényeid szerint. Minden autó maximum egy hónapig használható, hogy számodra megfelelő kínálattal szolgálhassunk minden alkalommal.
                                    </p>
                                </div>

                                <Button variant='default' className='w-full' form="subscription-form" type="submit">
                                    Szeretném ezt az autót
                                </Button>
                            </div>
                        )
                    }

                    {
                        type === 'is_rentable' && (
                            <div className='hidden'>
                                <SubscriptionOptionsForm car={car} imageUrl={await getImageUrl(car.preview?.image)} type={type} />
                            </div>
                        )
                    }

                    {
                        type === 'is_leasable' && (
                            <div className='hidden'>
                                <SubscriptionOptionsForm car={car} imageUrl={await getImageUrl(car.preview?.image)} type={type} />
                            </div>
                        )
                    }


                    <div className='flex flex-col gap-2'>
                        <h3 className='font-medium text-sm'>
                            Gépjármű adatai
                        </h3>

                        <div className='flex flex-col gap-2 p-4 bg-card rounded-lg'>
                            <DetailLine label='Kivitel' value={car.car_details.design ?? 'Nem megadva'} />
                            <DetailLine label='Évjárat' value={car.car_details.year.toString() ?? 'Nem megadva'} />
                            <DetailLine label='Ülések száma' value={car.car_details.seats.toString() ?? 'Nem megadva'} />
                            <DetailLine label='Kilométeróra állása' value={`${car.car_details.kilometers.toString() ?? 'Nem megadva'} km`} />
                            <DetailParser />
                            <DetailLine label='Hajtás' value={getDriveType(car.car_details.drive) ?? 'Nem megadva'} />
                            <DetailLine label='Üzemanyag' value={getFuelType(car.car_details.fuel_type) ?? 'Nem megadva'} />
                            <DetailLine label='Teljesítmény' value={car.car_details.engine_power.toString() ?? 'Nem megadva'} />
                            <DetailLine label='Sebességváltó' value={getTransmissionType(car.car_details.gearbox) ?? 'Nem megadva'} />
                            <DetailLine label='Hengerűrtartalom' value={`${car.car_details.engine_displacements.toString() ?? 'Nem megadva'} cm³`} />
                            <DetailParser />
                            <DetailLine label='Külső szín' value={getCarColor(car.car_details.exterior_color) ?? 'Nem megadva'} />
                            <DetailLine label='Belső szín' value={getCarColor(car.car_details.interior_color) ?? 'Nem megadva'} />
                            <DetailLine label='Kárpit típusa' value={getInteriorMaterial(car.car_details.interior_material) ?? 'Nem megadva'} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col gap-1.5 py-6 max-[768px]:px-[3%] max-[768px]:pb-16 max-[768px]:pt-2'>
                <h3 className='font-medium text-sm'>Termék előnyei</h3>

                <BenefitList />
            </div>
        </div >
    )
}
