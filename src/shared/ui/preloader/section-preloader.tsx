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
import { useLoaderStore, useSectionLoaderStore } from '@/store'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

let observerPrev: IntersectionObserver | undefined
let observerNext: IntersectionObserver | undefined

export function PrevSectionPreloader({ prevUrl }: { prevUrl?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()
  const pathname = usePathname()
  const wrapper = useRef<DivRef>(null)
  const wrapperInner = useRef<DivRef>(null)

  //const loading = useLoaderStore((s) => s.loading)
  const sectionLoading = useSectionLoaderStore((s) => s.loadingPage)
  const sectionLoadingStart = useSectionLoaderStore((s) => s.start)

  // scroll to main
  useEffect(() => {
    const wrapperItem = wrapper.current
    if (!wrapperItem || !lenis) return

    lenis.scrollTo('main', { immediate: true, force: true })
  }, [pathname, lenis])

  // добавляем IntersectionObserver
  useEffect(() => {
    const wrapperItem = wrapper.current
    if (!wrapperItem) return

    observerPrev = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (prevUrl && sectionLoading === null) {
            setIsVisible(entry.isIntersecting)
            console.log('PREV IntersectionObserver', entry.isIntersecting)
          }
        })
      },
      { threshold: 0.95 },
    )

    observerPrev.observe(wrapperItem)
    return () => observerPrev?.disconnect()
  }, [sectionLoading, prevUrl])

  useEffect(() => {
    if (!lenis || !wrapperInner.current || !isVisible || !prevUrl) return

    lenis.stop()
    lenis.scrollTo(wrapperInner.current, { duration: 0.6, lock: true, force: true })

    setTimeout(() => {
      sectionLoadingStart(prevUrl, true)

      setIsVisible(false)
    }, 600)
  }, [isVisible, lenis, prevUrl, sectionLoadingStart])

  return (
    <div className={clsx(styles.wrapper, !prevUrl && styles.hide)} ref={wrapper}>
      <div className={styles.wrapperInner} ref={wrapperInner}></div>
    </div>
  )
}

export function NextSectionPreloader({ nextUrl }: { nextUrl?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()
  const wrapper = useRef<DivRef>(null)
  const wrapperInner = useRef<DivRef>(null)

  const sectionLoading = useSectionLoaderStore((s) => s.loadingPage)
  const sectionLoadingStart = useSectionLoaderStore((s) => s.start)

  // добавляем IntersectionObserver
  useEffect(() => {
    const wrapperItem = wrapper.current
    if (!wrapperItem) return

    observerNext = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (nextUrl && sectionLoading === null) {
            setIsVisible(entry.isIntersecting)
            console.log('NEXT IntersectionObserver', entry.isIntersecting)
          }
        })
      },
      { threshold: 0.95 },
    )

    observerNext.observe(wrapperItem)
    return () => observerNext?.disconnect()
  }, [sectionLoading, nextUrl])

  useEffect(() => {
    if (!lenis || !wrapper.current || !isVisible || !nextUrl) return

    lenis.stop()
    lenis.scrollTo(wrapper.current, { duration: 0.6, lock: true, force: true })

    setTimeout(() => {
      sectionLoadingStart(nextUrl, false)

      setIsVisible(false)
    }, 600)
  }, [isVisible, lenis, nextUrl, sectionLoadingStart])

  return (
    <div className={clsx(styles.wrapper, !nextUrl && styles.hide)} ref={wrapper}>
      <div className={styles.wrapperInner} ref={wrapperInner}></div>
    </div>
  )
}

export function SectionPreloader({ url }: { url?: { prev?: string; next?: string } }) {
  const [isSecondHalf, setIsSecondHalf] = useState(false)
  const lenis = useLenis(handleScroll)
  const router = useRouter()
  const pathname = usePathname()
  const preloader = useRef<DivRef>(null)

  const loading = useLoaderStore((s) => s.loading)
  const sectionLoadingUrl = useSectionLoaderStore((s) => s.loadingPage)
  const isLoadingPrev = useSectionLoaderStore((s) => s.isLoadingPrev)
  const sectionLoadingEnd = useSectionLoaderStore((s) => s.end)

  // Определяем позицию при скролле
  function handleScroll() {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const fullHeight = document.body.scrollHeight

    // Проверяем, достиг ли пользователь второй половины страницы
    const halfwayPoint = fullHeight / 2 - windowHeight / 2
    setIsSecondHalf(scrollTop > halfwayPoint)
  }

  // Переходим на другой url
  useEffect(() => {
    if (!sectionLoadingUrl || sectionLoadingUrl === pathname) return

    gsap.to(preloader.current, { position: 'fixed' })
    router.push(sectionLoadingUrl.toString())
  }, [sectionLoadingUrl, pathname, router])

  // Убираем preloader после загрузки страницы
  useGSAP(() => {
    if (!lenis || loading) return

    const keyframes = {
      0: { position: 'fixed', y: 0 },
      99: { position: 'fixed', y: isLoadingPrev ? '100%' : '-100%' },
      100: { position: 'absolute', y: 0 },
    }

    gsap.to(preloader.current, {
      duration: 0.75,
      delay: 0.8,
      keyframes: keyframes,
      onEnd: () => {
        lenis.start()
        sectionLoadingEnd()
      },
    })
  }, [pathname, lenis])

  const isPrevDirection = (url?.prev && !isSecondHalf) || !url?.next

  return (
    <div className={clsx(styles.preloader, isPrevDirection && styles.prev)} ref={preloader}>
      <PreloaderLayout />
    </div>
  )
}
