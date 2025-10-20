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
      { threshold: 0.95 },
    )

    observer.observe(wrapperItem)
    return () => observer?.disconnect()
  }, [isLoading, prevUrl, setLoadingUrl])

  /*useEffect(() => {
    if (!lenis || !wrapperInner.current || !isLoading || !prevUrl) return

    console.log('PREV setLoadingUrl')

    lenis.stop()
    lenis.scrollTo(wrapperInner.current, { duration: 0.6, lock: true, force: true })

    setTimeout(() => {
      setLoadingUrl(prevUrl, true)
    }, 600)
  }, [isLoading, lenis, prevUrl, setLoadingUrl])*/

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
      { threshold: 0.95 },
    )

    observer.observe(wrapperItem)
    return () => observer?.disconnect()
  }, [isLoading, nextUrl, setLoadingUrl])

  /*useEffect(() => {
    if (!lenis || !wrapper.current || !isLoading || !nextUrl) return

    console.log('NEXT setLoadingUrl', isLoading, nextUrl)

    lenis.stop()
    lenis.scrollTo(wrapper.current, { duration: 0.6, lock: true, force: true })

    setTimeout(() => {
      setLoadingUrl(nextUrl, false)
    }, 600)
  }, [isLoading, lenis, nextUrl, setLoadingUrl])*/

  return (
    <div className={clsx(styles.wrapper, !nextUrl && styles.hide)} ref={wrapper}>
      <div className={styles.wrapperInner} ref={wrapperInner}></div>
    </div>
  )
}

export function SectionLoaderMobile() {
  const router = useRouter()
  const pathname = usePathname()
  const wrapper = useRef<DivRef>(null)
  const isInitial = useRef(true)

  const loadingUrl = useSectionLoaderStore((s) => s.loadingUrl)
  const isLoadPreviousUrl = useSectionLoaderStore((s) => s.isLoadPreviousUrl)

  // Показываем прелоадер, переходим на другой url
  useEffect(() => {
    if (!loadingUrl || loadingUrl === pathname) return

    gsap.to(wrapper.current, {
      duration: 0.75,
      keyframes: {
        0: { y: isLoadPreviousUrl ? '-100%' : '100%' },
        100: { y: 0 },
      },
    })

    setTimeout(() => {
      router.push(loadingUrl.toString())
    }, 800)
  }, [loadingUrl, pathname, router, isLoadPreviousUrl])

  // Убираем preloader после загрузки страницы
  useGSAP(() => {
    const keyframes = {
      0: { y: 0 },
      100: { y: isLoadPreviousUrl ? '100%' : '-100%' },
    }

    console.log(isInitial.current)

    if (isInitial.current) {
      setTimeout(animation, 3500)
      isInitial.current = false
    } else animation()

    function animation() {
      gsap.to(wrapper.current, {
        duration: 0.75,
        delay: 0.8,
        keyframes: keyframes,
      })
    }
  }, [pathname])

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
    lenis.scrollTo(preloader.current, { duration: 0.6, lock: true, force: true })

    setTimeout(() => {
      gsap.to(preloader.current, { position: 'fixed' })
      router.push(loadingUrl.toString())
    }, 600)
  }, [loadingUrl, startLoading, router, lenis])

  // Убираем preloader после загрузки страницы
  useGSAP(() => {
    if (!lenis) return
    if (isLoadingAnimation) return
    // TODO: check if preloader animation end && loading page end

    lenis.start()
    lenis.scrollTo('main', { immediate: true, force: true, offset: 20 })
    //ScrollTrigger.refresh()
    //sectionLoadingEnd()

    const keyframes = {
      0: { position: 'fixed', y: 0 },
      99: { position: 'fixed', y: isLoadPreviousUrl ? '100%' : '-100%' },
      100: { position: 'absolute', y: 0 },
    }

    gsap.to(preloader.current, {
      duration: 0.75,
      delay: 0.8,
      keyframes: keyframes,
      onComplete: () => {
        stopLoading()
      },
    })
  }, [isLoadingAnimation, lenis])

  return (
    <div className={clsx(styles.preloader, isPrevDirection && styles.prev)} ref={preloader}>
      <PreloaderLayout />
    </div>
  )
}
