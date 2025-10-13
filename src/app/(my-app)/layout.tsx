import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.scss'
import localFont from 'next/font/local'
import { BaseLayout } from './providers/base-layout'

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
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  )
}
