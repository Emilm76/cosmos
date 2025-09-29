import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.scss'
import { LenisScrollProvider } from './providers/lenis-provider'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'COSMOS',
  description: '',
}

const TTFirstNeue = localFont({
  src: './TTFirstNeue-Regular.woff2',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru" className={TTFirstNeue.className}>
      <body>
        <LenisScrollProvider>{children}</LenisScrollProvider>
      </body>
    </html>
  )
}
