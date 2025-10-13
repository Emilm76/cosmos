'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PreloaderLayout } from './preloader-layout'
import styles from './section-preloader.module.scss'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

export function NextSectionPreloader({
  children,
  prevUrl,
  nextUrl,
}: Readonly<{
  children: ReactNode
  prevUrl?: string
  nextUrl?: string
}>) {
  const wrapper = useRef<DivRef>(null)
  const preloader = useRef<DivRef>(null)
  const [start, setStart] = useState(false)
  const lenis = useLenis()
  const router = useRouter()

  useEffect(() => {
    if (!lenis || !preloader.current) return
    if (!start) return

    if (nextUrl) {
      console.log(nextUrl)

      lenis.scrollTo(preloader.current, { immediate: true })
      lenis.stop()
      router.push(nextUrl.toString())
      setTimeout(() => {
        lenis.start()
      }, 200)
    }

    return () => {
      lenis.start()
    }
  }, [lenis, start, nextUrl, router])

  useGSAP(() => {
    if (nextUrl) {
      // For pinning effect
      ScrollTrigger.create({
        trigger: preloader.current,
        start: 'top top',
        end: 'max',
        scrub: true,
        pin: true,
        pinSpacing: false,
      })

      gsap.to(preloader.current, {
        onStart: () => setStart(true),
        scrollTrigger: {
          trigger: preloader.current,
          start: 'top top',
        },
      })
    }
  })

  return (
    <div className={clsx(styles.wrapper)} ref={wrapper}>
      {children}
      {nextUrl && (
        <div className={clsx(styles.preloader)} ref={preloader}>
          <PreloaderLayout />
        </div>
      )}
    </div>
  )
}
