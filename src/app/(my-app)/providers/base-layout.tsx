'use client'
import { ReactNode, useEffect, useState } from 'react'
import { LenisScrollProvider } from './lenis-provider'
import { FontSizeProvider } from './font-size-provider'
import { HeaderProvider } from '@/context/header-context'
import { Header, InterstroyLogo, Preloader, SectionPreloader } from '@/shared'
import { useLoaderStore } from '@/store/loader-store'
import { usePathname } from 'next/navigation'

export function BaseLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const pathname = usePathname()
  const [isPageLoad, setIsPageLoad] = useState(false)
  const loading = useLoaderStore((s) => s.loading)

  const nextUrl = {
    '/': '/location',
    '/location': '/comfort',
    '/comfort': '/apartments',
    '/apartments': undefined,
  }[pathname]

  console.log(pathname, nextUrl)

  function handlePageLoad() {
    setIsPageLoad(true)
  }

  useEffect(() => {
    handlePageLoad()
  }, [])

  return (
    <HeaderProvider>
      <FontSizeProvider>
        <LenisScrollProvider>
          <Header />

          <main>{children}</main>

          <InterstroyLogo />
          <Preloader isShow={loading} isPageLoad={isPageLoad} />
        </LenisScrollProvider>
      </FontSizeProvider>
    </HeaderProvider>
  )
}
