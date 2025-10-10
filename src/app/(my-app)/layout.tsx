import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.scss'
import { LenisScrollProvider } from './providers/lenis-provider'
import localFont from 'next/font/local'
import { FontSizeProvider } from './providers/font-size-provider'
import { HeaderProvider } from '@/context/header-context'

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
      <head>
        <script>{`history.scrollRestoration = "manual"`}</script>
      </head>
      <body>
        <HeaderProvider>
          <FontSizeProvider>
            <LenisScrollProvider>{children}</LenisScrollProvider>
          </FontSizeProvider>
        </HeaderProvider>
      </body>
    </html>
  )
}
