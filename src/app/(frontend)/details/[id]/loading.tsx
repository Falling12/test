import React from 'react'

export default function Loading() {
    return (
        <div className='flex flex-col px-[15%] pb-8 max-[1400px]:px-[10%] max-[900px]:px-[3%] max-[768px]:px-0'>
            {/* Mobile sticky bottom button skeleton */}
            <div className='bg-white p-4 border-t border-border px-4 py-4 gap-8 hidden max-[768px]:flex fixed bottom-0 z-10 w-full items-center justify-center'>
                <div className='w-full h-10 bg-gray-200 rounded animate-pulse' />
            </div>

            {/* Desktop sticky header skeleton */}
            <div className='flex items-start justify-between sticky top-0 bg-white/80 z-10 py-8 backdrop-blur-xs max-[768px]:hidden'>
                <div className='flex flex-col gap-2'>
                    {/* Title skeleton */}
                    <div className='h-9 w-80 bg-gray-200 rounded animate-pulse' />

                    {/* Subtitle skeleton */}
                    <div className='h-6 w-64 bg-gray-200 rounded animate-pulse' />

                    {/* Detail chips skeleton */}
                    <div className='flex items-center gap-2'>
                        <div className='h-8 w-16 bg-gray-200 rounded-full animate-pulse' />
                        <div className='h-8 w-12 bg-gray-200 rounded-full animate-pulse' />
                        <div className='h-8 w-20 bg-gray-200 rounded-full animate-pulse' />
                        <div className='h-8 w-18 bg-gray-200 rounded-full animate-pulse' />
                    </div>
                </div>

                {/* Desktop button skeleton */}
                <div className='w-48 h-10 bg-gray-200 rounded animate-pulse' />
            </div>

            <div className='flex flex-row items-start justify-between gap-4 max-[768px]:flex-col max-[768px]:pb-16'>
                {/* Mobile header section skeleton */}
                <div className='hidden max-[768px]:flex flex-col w-full'>
                    {/* Mobile image skeleton */}
                    <div className='w-full h-[400px] bg-gray-200 animate-pulse max-[768px]:rounded-none' />

                    <div className='hidden max-[768px]:flex flex-col px-3 py-2'>
                        {/* Mobile title skeleton */}
                        <div className='h-6 w-72 bg-gray-200 rounded animate-pulse mb-1' />

                        {/* Mobile subtitle skeleton */}
                        <div className='h-5 w-56 bg-gray-200 rounded animate-pulse mb-2' />

                        {/* Mobile detail chips skeleton */}
                        <div className='flex items-center gap-2 mt-1'>
                            <div className='h-7 w-14 bg-gray-200 rounded-full animate-pulse' />
                            <div className='h-7 w-10 bg-gray-200 rounded-full animate-pulse' />
                            <div className='h-7 w-18 bg-gray-200 rounded-full animate-pulse' />
                            <div className='h-7 w-16 bg-gray-200 rounded-full animate-pulse' />
                        </div>
                    </div>
                </div>

                {/* Desktop image skeleton */}
                <div className='max-w-[40%] w-full h-[490px] bg-gray-200 rounded-lg animate-pulse sticky top-44 z-10 max-[768px]:hidden' />

                {/* Content section skeleton */}
                <div className='flex flex-col gap-4 max-w-[60%] w-full max-[768px]:max-w-full max-[768px]:px-[3%]'>
                    {/* Subscription options section */}
                    <div className='flex flex-col gap-1.5'>
                        {/* Section title skeleton */}
                        <div className='h-5 w-32 bg-gray-200 rounded animate-pulse' />

                        {/* Subscription options skeleton */}
                        <div className='flex flex-col gap-3'>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className='flex items-center space-x-3 p-4 border border-gray-200 rounded-lg'>
                                    <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse' />
                                    <div className='flex-1 flex flex-col gap-1'>
                                        <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                                        <div className='h-3 w-32 bg-gray-200 rounded animate-pulse' />
                                    </div>
                                    <div className='h-6 w-16 bg-gray-200 rounded animate-pulse' />
                                </div>
                            ))}
                        </div>

                        {/* Yellow info box skeleton */}
                        <div className='flex items-center justify-center p-3 bg-gray-100 rounded-md gap-2'>
                            <div className='w-full space-y-2'>
                                <div className='h-3 w-full bg-gray-200 rounded animate-pulse' />
                                <div className='h-3 w-4/5 bg-gray-200 rounded animate-pulse' />
                                <div className='h-3 w-3/4 bg-gray-200 rounded animate-pulse' />
                            </div>
                        </div>
                    </div>

                    {/* Car details section */}
                    <div className='flex flex-col gap-1.5'>
                        {/* Section title skeleton */}
                        <div className='h-5 w-28 bg-gray-200 rounded animate-pulse' />

                        {/* Details card skeleton */}
                        <div className='flex flex-col gap-2 p-4 bg-card rounded-lg'>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                                <div key={i} className='flex items-center justify-between'>
                                    <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                                    <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
