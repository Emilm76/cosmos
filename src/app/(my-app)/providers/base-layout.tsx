'use client'
import { ReactNode } from 'react'
import { LenisScrollProvider } from './lenis-provider'
import { FontSizeProvider } from './font-size-provider'
import { HeaderProvider } from '@/context/header-context'
import {
  Header,
  InterstroyLogo,
  NextSectionPreloader,
  Preloader,
  PrevSectionPreloader,
} from '@/shared'
import { usePathname } from 'next/navigation'
import { useLoaderStore } from '@/store'

export function BaseLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const loading = useLoaderStore((s) => s.loading)
  const pathname = usePathname()

  const url = {
    '/': { prev: undefined, next: '/location' },
    '/location': { prev: '/', next: '/comfort' },
    '/comfort': { prev: 'location', next: '/apartments' },
    '/apartments': { prev: '/comfort', next: undefined },
  }[pathname]

  return (
    <HeaderProvider>
      <FontSizeProvider>
        <LenisScrollProvider>
          <Preloader isShow={loading} />
          <Header />

          <PrevSectionPreloader prevUrl={url?.prev} />
          <main>{children}</main>
          <NextSectionPreloader nextUrl={url?.next} />

          <InterstroyLogo />
        </LenisScrollProvider>
      </FontSizeProvider>
    </HeaderProvider>
  )
}
