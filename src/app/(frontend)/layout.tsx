import React from 'react'
import './globals.css'
import Header from '@/components/ui/header'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Viewport } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
