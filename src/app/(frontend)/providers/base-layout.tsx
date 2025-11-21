'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { LenisScrollProvider } from './lenis-provider'
import { FontSizeProvider } from './font-size-provider'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useIsLoadingStore, useSectionLoaderStore } from '@/store'
import { InterstroyLogo } from '@/shared/ui/logo/logo'
import { Modal } from '@/shared/ui/modal/modal'
import {
  NextSectionLoaderDesktop,
  PrevSectionLoaderDesktop,
  SectionLoaderMobile,
  SectionPreloader,
} from '@/shared/ui/preloader/section-preloader'

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
  // Hydration-safe media query evaluation
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)

  const isLoading = useIsLoadingStore((s) => s.isLoading)
  const loadingUrl = useSectionLoaderStore((s) => s.loadingUrl)
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
      '/location': 16,
      '/comfort': 15,
      '/apartments': 0,
    }[pathname] ?? 0

  // Ensure server and first client render match; compute media after mount
  useEffect(() => {
    setMounted(true)
    const updateMediaFlags = () => {
      const desktop = window.matchMedia('(min-width: 1024px)').matches
      setIsDesktop(desktop)
      setIsMobile(!desktop)
    }
    updateMediaFlags()
    window.addEventListener('resize', updateMediaFlags)
    return () => window.removeEventListener('resize', updateMediaFlags)
  }, [])

  // swipes on mobile with hammer.js
  useEffect(() => {
    if (!mounted || isDesktop || !wrapperRef.current) return

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
          if (url?.next) setLoadingUrl(url.next, false)
          return
        }
        setIndex(nextIndex)
      })
      hammer.on('swipedown', () => {
        if (isLoading) return
        const nextIndex = indexRef.current - 1
        if (nextIndex < 0) {
          if (url?.prev) setLoadingUrl(url.prev, true)
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
  }, [mounted, isDesktop, statesCount, url, setLoadingUrl, isLoading])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    indexRef.current = 0
    setTimeout(() => setIndex(0), 800)
  }, [loadingUrl])

  return (
    <FontSizeProvider>
      <LenisScrollProvider>
        <div
          className={clsx(
            'slides-wrapper',
            Array.from({ length: index + 1 }, (_, i) => `state-${i}`),
          )}
          ref={wrapperRef}
        >
          {mounted && isDesktop && <SectionPreloader url={url} />}
          {mounted && isDesktop && <PrevSectionLoaderDesktop prevUrl={url?.prev} />}
          {mounted && isMobile && <SectionLoaderMobile />}

          <main id="root-main">{children}</main>

          {mounted && isDesktop && <NextSectionLoaderDesktop nextUrl={url?.next} />}
        </div>

        <Modal />

        <InterstroyLogo />
      </LenisScrollProvider>
    </FontSizeProvider>
  )
}
