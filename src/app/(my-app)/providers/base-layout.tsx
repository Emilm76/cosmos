'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { LenisScrollProvider } from './lenis-provider'
import { FontSizeProvider } from './font-size-provider'
import { HeaderProvider } from '@/context/header-context'
import {
  Header,
  InterstroyLogo,
  NextSectionLoaderDesktop,
  SectionLoaderMobile,
  PrevSectionLoaderDesktop,
  SectionPreloader,
  Modal,
} from '@/shared'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx'
import { useIsLoadingStore, useSectionLoaderStore } from '@/store'

type SwipeOptions = {
  direction: number
  threshold: number
  velocity: number
  pointers: number
}

type Recognizer = {
  set: (options: SwipeOptions) => void
}

type HammerManager = {
  get: (name: 'swipe') => Recognizer
  on: (name: 'swipeup' | 'swipedown', handler: () => void) => void
  destroy: () => void
}

type HammerStatic = {
  new (el: HTMLElement): HammerManager
  DIRECTION_VERTICAL: number
}

export function BaseLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  const wrapperRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)

  const isLoading = useIsLoadingStore((s) => s.isLoading)
  const setLoadingUrl = useSectionLoaderStore((s) => s.set)

  const url = {
    '/': { prev: undefined, next: '/location' },
    '/location': { prev: '/', next: '/comfort' },
    '/comfort': { prev: '/location', next: '/apartments' },
    '/apartments': { prev: '/comfort', next: undefined },
  }[pathname]

  const statesCount =
    {
      '/': 2,
      '/location': 15,
      '/comfort': 15,
      '/apartments': 0,
    }[pathname] ?? 0

  // swipes on mobile with hammer.js
  useEffect(() => {
    if (isDesktop || !wrapperRef.current) return

    let isCancelled = false
    let hammer: HammerManager | null = null

    const setupHammer = async () => {
      const mod = (await import('hammerjs')) as
        | HammerStatic
        | {
            default: HammerStatic
          }
      const Hammer: HammerStatic = 'default' in mod ? mod.default : mod
      if (isCancelled || !wrapperRef.current) return

      hammer = new Hammer(wrapperRef.current)
      hammer.get('swipe').set({
        direction: Hammer.DIRECTION_VERTICAL,
        threshold: 10,
        velocity: 0.3,
        pointers: 1,
      })

      hammer.on('swipeup', () => {
        if (isLoading) return
        const nextIndex = indexRef.current + 1
        if (nextIndex > statesCount) {
          if (url?.next) {
            setLoadingUrl(url.next, false)
            setTimeout(() => setIndex(0), 800)
          }
          return
        }
        setIndex(nextIndex)
      })
      hammer.on('swipedown', () => {
        if (isLoading) return
        const nextIndex = indexRef.current - 1
        if (nextIndex < 0) {
          if (url?.prev) {
            setLoadingUrl(url.prev, true)
            setTimeout(() => setIndex(0), 800)
          }
          return
        }
        setIndex(nextIndex)
      })
    }

    setupHammer()

    return () => {
      isCancelled = true
      if (hammer) hammer.destroy()
    }
  }, [isDesktop, statesCount, url, setLoadingUrl, isLoading])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  return (
    <HeaderProvider>
      <FontSizeProvider>
        <LenisScrollProvider>
          <Header />

          <div
            className={clsx(
              'slides-wrapper',
              Array.from({ length: index + 1 }, (_, i) => `state-${i}`),
            )}
            ref={wrapperRef}
          >
            {isDesktop && <SectionPreloader url={url} />}
            {isDesktop && <PrevSectionLoaderDesktop prevUrl={url?.prev} />}
            {isMobile && <SectionLoaderMobile />}

            <main>{children}</main>

            {isDesktop && <NextSectionLoaderDesktop nextUrl={url?.next} />}
          </div>

          <Modal />

          <InterstroyLogo />
        </LenisScrollProvider>
      </FontSizeProvider>
    </HeaderProvider>
  )
}
