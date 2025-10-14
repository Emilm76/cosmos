'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PreloaderLayout } from './preloader-layout'
import styles from './section-preloader.module.scss'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { usePathname, useRouter } from 'next/navigation'
import Lenis from 'lenis'
import { useLoaderStore } from '@/store'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

export function NextSectionPreloader({ nextUrl }: { nextUrl?: string }) {
  const [start, setStart] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()
  const router = useRouter()
  const pathname = usePathname()
  const wrapper = useRef<DivRef>(null)
  const wrapperInner = useRef<DivRef>(null)
  const preloader = useRef<DivRef>(null)

  const loading = useLoaderStore((s) => s.loading)

  // добавляем IntersectionObserver
  useEffect(() => {
    const wrapperItem = wrapper.current
    if (!wrapperItem) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.95 },
    )

    observer.observe(wrapperItem)
    return () => observer.disconnect()
  }, [])

  // убираем preloader после загрузки страницы
  // useEffect(() => {
  //   if (!lenis || loading) return

  //   console.log('hide preloader')

  //   setTimeout(() => {
  //     gsap.to(wrapperInner.current, {
  //       duration: 0.75,
  //       keyframes: {
  //         0: { position: 'fixed', y: 0 },
  //         99: { position: 'fixed', y: '-100%' },
  //         100: { position: 'relative', y: 0 },
  //       },
  //       onEnd: () => {
  //         console.log('end')
  //         setIsVisible(false)
  //         lenis.start()
  //       },
  //     })
  //   }, 400)
  // }, [pathname, lenis])

  useEffect(() => {
    if (!lenis || !wrapper.current || !isVisible || !nextUrl) return

    lenis.stop()
    lenis.scrollTo(wrapper.current, { duration: 0.6, lock: true, force: true })

    setTimeout(() => {
      //   gsap.to(wrapperInner.current, { position: 'fixed' })
      //   router.push(nextUrl.toString())
    }, 600)
  }, [isVisible, lenis])

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <div className={styles.wrapperInner} ref={wrapperInner}></div>
    </div>
  )
}

let observer: IntersectionObserver | undefined

export function PrevSectionPreloader({ prevUrl }: { prevUrl?: string }) {
  const [start, setStart] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [direction, setDirection] = useState<0 | 1>(0) // 0 - вверх, 1 - вниз
  const lenis = useLenis()
  const router = useRouter()
  const pathname = usePathname()
  const wrapper = useRef<DivRef>(null)
  const wrapperInner = useRef<DivRef>(null)
  const preloader = useRef<DivRef>(null)

  const loading = useLoaderStore((s) => s.loading)

  // добавляем IntersectionObserver
  useEffect(() => {
    const wrapperItem = wrapper.current
    if (!wrapperItem || !lenis) return
    if (loading) return

    lenis.scrollTo('main', { immediate: true, force: true })

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.95 },
    )

    observer.observe(wrapperItem)
    return () => observer?.disconnect()
  }, [pathname, lenis])

  useEffect(() => {
    if (!lenis || !wrapperInner.current || !isVisible || !prevUrl) return

    lenis.stop()
    lenis.scrollTo(wrapperInner.current, { duration: 0.6, lock: true, force: true })
    observer?.disconnect()

    setTimeout(() => {
      //   gsap.to(wrapperInner.current, { position: 'fixed' })
      //   router.push(prevUrl.toString())
    }, 600)
  }, [isVisible, lenis])

  if (!prevUrl) return

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <div className={styles.wrapperInner} ref={wrapperInner}>
        <div className={clsx(styles.preloader)} ref={preloader}>
          <PreloaderLayout />
        </div>
      </div>
    </div>
  )
}

export function SectionPreloader({ prevUrl }: { prevUrl?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()
  const router = useRouter()
  const pathname = usePathname()
  const wrapper = useRef<DivRef>(null)
  const wrapperInner = useRef<DivRef>(null)
  const preloader = useRef<DivRef>(null)

  const loading = useLoaderStore((s) => s.loading)

  // убираем preloader после загрузки страницы
  useEffect(() => {
    if (!lenis || loading) return

    console.log('hide preloader')

    setTimeout(() => {
      gsap.to(wrapperInner.current, {
        duration: 0.75,
        keyframes: {
          0: { position: 'fixed', y: 0 },
          99: { position: 'fixed', y: '-100%' },
          100: { position: 'relative', y: 0 },
        },
        onEnd: () => {
          console.log('end')
          setIsVisible(false)
          lenis.start()
        },
      })
    }, 400)
  }, [pathname, lenis])

  return (
    <div className={clsx(styles.preloader)} ref={preloader}>
      <PreloaderLayout />
    </div>
  )
}
