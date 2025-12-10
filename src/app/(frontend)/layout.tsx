import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

import './globals.scss'
import { Gallery } from '@/Gallery/Component'
import { Documents } from '@/Documents/Component'
import { HeaderProvider } from '@/context/header-context'
import { Header } from '@/shared/ui/header/header'
import { BaseLayout } from './providers/base-layout'
import clsx from 'clsx'

export const metadata: Metadata = {
  title: 'COSMOS',
  description: '',
}

const TTFirstNeue = localFont({
  src: [
    {
      path: './TTFirstNeue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './TTFirstNeue-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
})
const LogoFont = localFont({
  src: './logo.woff2',
  variable: '--logo-font',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={clsx(TTFirstNeue.className, LogoFont.variable)}
      suppressHydrationWarning
    >
      <head>
        <script>{`history.scrollRestoration = "manual"`}</script>
      </head>
      <body>
        <Gallery />
        <Documents />

        <HeaderProvider>
          <Header />

          <BaseLayout>{children}</BaseLayout>
        </HeaderProvider>
      </body>
    </html>
  )
}
