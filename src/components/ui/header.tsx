import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header: React.FC = () => {
    return (
        <nav className='flex items-center justify-between w-full h-[60px] bg-white border-b border-border px-[15%] max-[1400px]:px-[10%] max-[900px]:px-[3%]'>
            <Link href='/' className='flex items-center gap-2'>
                <Image src={'/leasetown_logo.svg'} alt='Leasetown Logo' priority width={128} height={60} />
            </Link>
        </nav>
    )
}

export default Header