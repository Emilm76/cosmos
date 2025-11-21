import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

import './globals.scss'
import { Gallery } from '@/Gallery/Component'
import { Documents } from '@/Documents/Component'
import { HeaderProvider } from '@/context/header-context'
import { Header } from '@/shared/ui/header/header'
import { BaseLayout } from './providers/base-layout'

export const metadata: Metadata = {
  title: 'COSMOS',
  description: '',
}

const TTFirstNeue = localFont({
  src: './TTFirstNeue-Regular.woff2',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={TTFirstNeue.className} suppressHydrationWarning>
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
