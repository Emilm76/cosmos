'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLoaderStore } from '@/store'
import { PreloaderLayout } from './preloader-layout'
import styles from './preloader.module.scss'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

export function Preloader({ isShow, isPageLoad }: { isShow: boolean; isPageLoad: boolean }) {
  const wrapper = useRef<DivRef>(null)
  const hide = useLoaderStore((s) => s.hide)

  useGSAP(() => {
    if (!isShow) return

    gsap.to(wrapper.current, {
      duration: 3,
      ease: 'power2.inOut',
      keyframes: {
        0: { y: 0, opacity: 0 },
        5: { y: 0, opacity: 1, pointerEvents: 'none' },
        75: { y: 0, opacity: 1, pointerEvents: 'none' },
        100: { y: '-100%', opacity: 1, pointerEvents: 'auto' },
      },
    })

    const timeout = setTimeout(() => hide(), 400)
    return () => clearTimeout(timeout)
  }, [isShow, hide])

  useGSAP(() => {
    gsap.to(wrapper.current, {
      y: '-100%',
      pointerEvents: 'none',
      duration: 0.75,
      delay: 0.6,
      ease: 'power2.inOut',
    })
  }, [isPageLoad, hide])

  return (
    <div className={clsx(styles.wrapper)} ref={wrapper}>
      <PreloaderLayout />
    </div>
  )
}
