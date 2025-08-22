"use client"

import React from 'react'
import { motion } from 'motion/react'
import { Car } from '@/payload-types'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import DetailChip from '../listing/detailchip'
import { getCarColor, getDriveType, getFuelType, getInteriorMaterial, getTransmissionType } from '@/lib/listingutils'
import DetailLine from '../details/detailline'
import DetailParser from '../details/detailparser'

interface SuccessPageClientProps {
    carData: Car
    imageUrl: string
}

export default function SuccessPageClient({ carData, imageUrl }: SuccessPageClientProps) {
    return (
        <div className='flex flex-col px-[15%] pb-8 max-[1400px]:px-[10%] max-[900px]:px-[3%] max-[768px]:px-0 pt-8 max-[768px]:pt-0 h-full'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='flex flex-row items-stretch justify-between gap-4 max-[768px]:flex-col flex-1 h-full'
            >
                <div className='hidden max-[768px]:flex flex-col w-full'>
                    <Image
                        src={imageUrl}
                        alt={`${carData.car_details.manufacturer} ${carData.car_details.model}`}
                        width={550}
                        height={490}
                        priority
                        className='max-w-[40%] w-full h-fit object-contain rounded-lg sticky top-44 z-10 max-[768px]:max-w-full max-[768px]:static max-[768px]:rounded-none max-[768px]:w-full max-[768px]:max-h-[400px] max-[768px]:object-cover'
                    />

                    <div className='hidden max-[768px]:flex flex-col px-3 py-2'>
                        <h1 className='font-semibold text-xl'>
                            {carData.car_details.manufacturer} {carData.car_details.model}
                        </h1>

                        <p className='text-sm text-black'>
                            {carData.car_details.additional_info}
                        </p>

                        <div className='flex items-center gap-2 mt-1'>
                            {carData.car_details.kilometers && <DetailChip label={`${carData.car_details.kilometers} km`} />}
                            {carData.car_details.year && <DetailChip label={`${carData.car_details.year}`} />}
                            {carData.car_details.fuel_type && <DetailChip label={`${getFuelType(carData.car_details.fuel_type)}`} />}
                            {carData.car_details.gearbox && <DetailChip label={`${getTransmissionType(carData.car_details.gearbox)}`} />}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className='max-[768px]:hidden w-full max-w-[40%]'
                >
                    <div className="relative w-full h-full aspect-[378/339] rounded-lg overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={`${carData.car_details.manufacturer} ${carData.car_details.model}`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className='rounded-lg object-cover'
                        />

                        <div className='absolute inset-0 w-full h-full flex flex-col justify-between rounded-lg overflow-hidden'>
                            <div className='flex flex-col py-6 px-4'>
                                <h3 className='text-xl font-semibold text-white'>{carData.car_details.manufacturer} {carData.car_details.model}</h3>
                                <p className='text-sm text-white font-medium'>{carData.car_details.additional_info}</p>
                            </div>

                            <div className='flex flex-col gap-2 py-6 px-4' style={{
                                backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
                            }}>
                                <div className='flex items-center gap-2'>
                                    {carData.car_details.kilometers && <DetailChip label={`${carData.car_details.kilometers} km`} variant='light' />}
                                    {carData.car_details.year && <DetailChip label={`${carData.car_details.year}`} variant='light' />}
                                    {carData.car_details.fuel_type && <DetailChip label={`${getFuelType(carData.car_details.fuel_type)}`} variant='light' />}
                                    {carData.car_details.gearbox && <DetailChip label={`${getTransmissionType(carData.car_details.gearbox)}`} variant='light' />}
                                </div>

                                <p className='text-white text-xl font-bold'>Havi {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(carData.packages_prices?.subscription?.subscription_price_per_year ?? 0)} -tól</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div
                    className='flex flex-col gap-4 max-w-[60%] w-full min-h-max max-[768px]:max-w-full max-[768px]:px-[3%]'
                >
                    <div className="flex flex-col gap-4 justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
                            className="flex items-center"
                        >
                            <Image
                                src={'/icons/success.svg'}
                                alt='success'
                                width={40}
                                height={40}
                            />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-2xl font-semibold text-black max-[768px]:text-xl"
                        >
                            Sikeres foglalás!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                            className="text-base text-[#303030] font-medium max-[768px]:text-sm"
                        >
                            Hamarosan felvesszük veled a kapcsolatot!
                        </motion.p>
                    </div>

                    <Button variant={'default'} className='w-full text-sm font-medium max-[768px]:hidden' asChild>
                        <Link href='/'>Vissza a főoldalra</Link>
                    </Button>
                </div>
            </motion.div>

            <div className='fixed hidden bottom-0 left-0 right-0 bg-white p-4 border-border border-t max-[768px]:flex items-center justify-center'>
                <Button variant={'default'} className='w-full text-sm font-medium' asChild>
                    <Link href='/'>Vissza a főoldalra</Link>
                </Button>
            </div>
        </div >
    )
}
