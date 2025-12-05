'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PreloaderLayout } from './preloader-layout'
import styles from './section-preloader.module.scss'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { useRouter } from 'next/navigation'
import { useIsLoadingStore, useSectionLoaderStore } from '@/store'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

export function PrevSectionLoaderDesktop({ prevUrl }: { prevUrl?: string }) {
  const wrapper = useRef<DivRef>(null)
  const wrapperInner = useRef<DivRef>(null)

  const isLoading = useIsLoadingStore((s) => s.isLoading)
  const setLoadingUrl = useSectionLoaderStore((s) => s.set)

  // добавляем IntersectionObserver
  useEffect(() => {
    const wrapperItem = wrapper.current
    if (!wrapperItem || isLoading || !prevUrl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //startLoading()
            setLoadingUrl(prevUrl, true)
            console.log('PREV IntersectionObserver', entry.isIntersecting)
          }
        })
      },
      { threshold: 0.9 },
    )

    observer.observe(wrapperItem)
    return () => observer?.disconnect()
  }, [isLoading, prevUrl, setLoadingUrl])

  return (
    <div className={clsx(styles.wrapper, !prevUrl && styles.hide)} ref={wrapper}>
      <div className={styles.wrapperInner} ref={wrapperInner}></div>
    </div>
  )
}

export function NextSectionLoaderDesktop({ nextUrl }: { nextUrl?: string }) {
  const wrapper = useRef<DivRef>(null)
  const wrapperInner = useRef<DivRef>(null)

  const isLoading = useIsLoadingStore((s) => s.isLoading)
  const setLoadingUrl = useSectionLoaderStore((s) => s.set)

  // добавляем IntersectionObserver
  useEffect(() => {
    const wrapperItem = wrapper.current
    if (!wrapperItem || isLoading || !nextUrl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //startLoading()
            setLoadingUrl(nextUrl, false)
            console.log('NEXT IntersectionObserver', entry.isIntersecting)
          }
        })
      },
      { threshold: 0.9 },
    )

    observer.observe(wrapperItem)
    return () => observer?.disconnect()
  }, [isLoading, nextUrl, setLoadingUrl])

  return (
    <div className={clsx(styles.wrapper, !nextUrl && styles.hide)} ref={wrapper}>
      <div className={styles.wrapperInner} ref={wrapperInner}></div>
    </div>
  )
}

export function SectionLoaderMobile() {
  const router = useRouter()
  const wrapper = useRef<DivRef>(null)

  const isLoadingAnimation = useIsLoadingStore((s) => s.isLoadingAnimation)
  const startLoading = useIsLoadingStore((s) => s.start)
  const stopLoading = useIsLoadingStore((s) => s.stop)
  const loadingUrl = useSectionLoaderStore((s) => s.loadingUrl)
  const isLoadPreviousUrl = useSectionLoaderStore((s) => s.isLoadPreviousUrl)

  // Показываем прелоадер, переходим на другой url
  useEffect(() => {
    if (!loadingUrl) return

    startLoading()

    gsap.to(wrapper.current, {
      duration: 0.75,
      keyframes: {
        0: { y: isLoadPreviousUrl ? '-100%' : '100%' },
        100: { y: 0 },
      },
      onComplete: () => {
        document.documentElement.classList.remove('is-load')
      },
    })

    setTimeout(() => {
      router.push(loadingUrl.toString())
    }, 800)
  }, [loadingUrl, startLoading, router, isLoadPreviousUrl])

  // Убираем preloader после загрузки страницы
  useGSAP(() => {
    if (isLoadingAnimation) return

    const keyframes = {
      0: { y: 0 },
      100: { y: isLoadPreviousUrl ? '100%' : '-100%' },
    }

    gsap.to(wrapper.current, {
      duration: 0.75,
      keyframes: keyframes,
      onComplete: () => {
        stopLoading()
        document.documentElement.classList.add('is-load')
      },
    })
  }, [isLoadingAnimation])

  return (
    <div className={clsx(styles.mobileWrapper)} ref={wrapper}>
      <div className={styles.wrapperInner}>
        <PreloaderLayout />
      </div>
    </div>
  )
}

export function SectionPreloader({ url }: { url?: { prev?: string; next?: string } }) {
  const [isSecondHalf, setIsSecondHalf] = useState(false)
  const lenis = useLenis(handleScroll)
  const router = useRouter()
  const preloader = useRef<DivRef>(null)

  const isLoadingAnimation = useIsLoadingStore((s) => s.isLoadingAnimation)
  const startLoading = useIsLoadingStore((s) => s.start)
  const stopLoading = useIsLoadingStore((s) => s.stop)
  const loadingUrl = useSectionLoaderStore((s) => s.loadingUrl)
  const isFromLink = useSectionLoaderStore((s) => s.isFromLink)
  const isLoadPreviousUrl = useSectionLoaderStore((s) => s.isLoadPreviousUrl)

  const isPrevDirection = (url?.prev && !isSecondHalf) || !url?.next

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
    if (!lenis || !loadingUrl || !preloader.current) return

    console.log('loadingUrl', loadingUrl)

    startLoading()
    lenis.stop()

    if (isFromLink) {
      gsap.to(preloader.current, {
        duration: 0.75,
        keyframes: {
          0: { position: 'fixed', y: isLoadPreviousUrl ? '-100%' : '100%' },
          100: { position: 'fixed', y: 0 },
        },
      })
    } else {
      lenis.scrollTo(preloader.current, { duration: 0.6, lock: true, force: true })
    }

    setTimeout(() => {
      gsap.to(preloader.current, { position: 'fixed' })
      router.push(loadingUrl.toString())
    }, 750)
  }, [loadingUrl, isFromLink, startLoading, isLoadPreviousUrl, router, lenis])

  // Убираем preloader после загрузки страницы
  useGSAP(() => {
    if (!lenis) return
    if (isLoadingAnimation) return
    // TODO: check if preloader animation end && loading page end

    lenis.start() // for fix bug, with ScrollTrigger when routing
    if (isLoadPreviousUrl) {
      const mainNode: HTMLDivElement | null = document.querySelector('#root-main')
      const offset = (mainNode?.offsetHeight || 0) - window.innerHeight
      lenis.scrollTo('#root-main', { offset: offset, immediate: true, force: true })
    } else {
      lenis.scrollTo('#root-main', { immediate: true, force: true })
    }
    lenis.stop()

    const keyframes = {
      0: { position: 'fixed', y: 0 },
      99: { position: 'fixed', y: isLoadPreviousUrl ? '100%' : '-100%' },
      100: { position: 'absolute', y: 0 },
    }

    gsap.to(preloader.current, {
      duration: 0.75,
      keyframes: keyframes,
      onComplete: () => {
        stopLoading()
        lenis.start()
      },
    })
  }, [isLoadingAnimation, lenis])

  return (
    <div className={clsx(styles.preloader, isPrevDirection && styles.prev)} ref={preloader}>
      <PreloaderLayout />
    </div>
  )
}
