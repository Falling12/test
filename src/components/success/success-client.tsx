"use client"

import React from 'react'
import { motion } from 'motion/react'
import CarCardClient from '../listing/carcard-client'
import { Car } from '@/payload-types'
import Image from 'next/image'
import { Button } from '../ui/button'

interface SuccessPageClientProps {
    carData: Car
    imageUrl: string
}

export default function SuccessPageClient({ carData, imageUrl }: SuccessPageClientProps) {
    return (
        <div className="flex justify-center p-4 px-[15%] max-[768px]:px-[3%] pb-24">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col gap-8"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col gap-4 items-start"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center"
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
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-xl font-semibold text-black"
                    >
                        Sikeres e-mail cím regisztráció!
                    </motion.h1>

                    <div className='flex flex-col'>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-sm text-[#303030] font-medium"
                        >
                            Az alábbi telefonszámon tudsz elérni minket a rendeléssel kapcsolatban!
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-xl font-semibold text-black"
                        >
                            +36 30 654 2802
                        </motion.p>
                    </div>
                </motion.div>

                <CarCardClient
                    car={carData}
                    imageUrl={imageUrl}
                />

                <div className='fixed bottom-0 left-0 right-0 bg-white p-4 border-border border-t flex items-center justify-center'>
                    <Button variant={'success'} className='w-full text-sm font-medium' asChild>
                        <a href='tel:+36306542802'>Hívás</a>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
