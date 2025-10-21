'use client'
import { LogoWithDescriptor2 } from '@/shared'
import styles from './preloader-layout.module.scss'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Ref, RefObject, useRef } from 'react'
import { useIsLoadingStore } from '@/store'

type SVGRef = SVGElement | null

export function PreloaderLayout() {
  const roundDotted1 = useRef<SVGRef>(null)
  const roundDotted2 = useRef<SVGRef>(null)
  const round1 = useRef<SVGRef>(null)
  const round2 = useRef<SVGRef>(null)
  const round3 = useRef<SVGRef>(null)
  const logo = useRef<SVGRef>(null)

  const isLoading = useIsLoadingStore((s) => s.isLoading)
  const stopAnimation = useIsLoadingStore((s) => s.stopAnimation)

  useGSAP(() => {
    if (!isLoading) return

    const tl = gsap.timeline({
      defaults: { duration: 3 },
      onComplete: function () {
        stopAnimation()
        setTimeout(() => {
          tl.time(0).kill()
        }, 500)
      },
    })

    tl.to(
      roundDotted1.current,
      {
        ease: 'none',
        keyframes: {
          0: { rotate: 0 },
          100: { rotate: 90 },
        },
      },
      0,
    )

    tl.to(
      round2.current,
      {
        keyframes: {
          0: { opacity: 0 },
          10: { opacity: 1 },
        },
      },
      0,
    )
    tl.to(
      roundDotted2.current,
      {
        keyframes: {
          0: { rotate: 0 },
          10: { opacity: 0 },
          20: { opacity: 1 },
          100: { rotate: 90 },
        },
      },
      0,
    )
    tl.to(
      round3.current,
      {
        keyframes: {
          20: { opacity: 0 },
          30: { opacity: 1 },
        },
      },
      0,
    )

    tl.to(
      logo.current,
      {
        keyframes: {
          30: { opacity: 0 },
          70: { opacity: 1 },
        },
      },
      0,
    )
  }, [isLoading])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <Round1
          className={clsx(styles.round, styles.round1)}
          ref={round1 as RefObject<SVGSVGElement>}
        />
        <RoundDotted1
          className={clsx(styles.round, styles.roundDotted1)}
          ref={roundDotted1 as RefObject<SVGSVGElement>}
        />
        <Round2
          className={clsx(styles.round, styles.round2)}
          ref={round2 as RefObject<SVGSVGElement>}
        />
        <RoundDotted2
          className={clsx(styles.round, styles.roundDotted2)}
          ref={roundDotted2 as RefObject<SVGSVGElement>}
        />

        <Round3
          className={clsx(styles.round, styles.round3)}
          ref={round3 as RefObject<SVGSVGElement>}
        />

        <LogoWithDescriptor2 className={styles.logo} ref={logo as RefObject<SVGSVGElement>} />
      </div>
    </div>
  )
}

function Round1({ className, ref }: { className?: string; ref?: Ref<SVGSVGElement> }) {
  return (
    <svg
      className={className}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1739 1739"
    >
      <circle cx="869.5" cy="869.5" r="869" stroke="url(#a)" />
      <defs>
        <linearGradient
          id="a"
          x1="869.5"
          x2="869.5"
          y1="0"
          y2="1739"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#404040" />
          <stop offset="1" stopColor="#737373" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Round2({ className, ref }: { className?: string; ref?: Ref<SVGSVGElement> }) {
  return (
    <svg
      className={className}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 921 921"
    >
      <circle cx="460.5" cy="460.5" r="460" stroke="url(#a)" />
      <defs>
        <linearGradient id="a" x1="460.5" x2="460.5" y1="0" y2="921" gradientUnits="userSpaceOnUse">
          <stop stopColor="#404040" />
          <stop offset="1" stopColor="#737373" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Round3({ className, ref }: { className?: string; ref?: Ref<SVGSVGElement> }) {
  return (
    <svg
      className={className}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 382 382"
    >
      <circle cx="191" cy="191" r="190.5" stroke="url(#a)" />
      <defs>
        <linearGradient id="a" x1="191" x2="191" y1="0" y2="382" gradientUnits="userSpaceOnUse">
          <stop stopColor="#404040" />
          <stop offset="1" stopColor="#737373" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function RoundDotted1({ className, ref }: { className?: string; ref?: Ref<SVGSVGElement> }) {
  return (
    <svg
      className={className}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="1342"
      height="1342"
      fill="none"
      viewBox="0 0 1342 1342"
    >
      <circle cx="671" cy="671" r="670.5" stroke="url(#a)" strokeDasharray="16 16" />
      <defs>
        <linearGradient id="a" x1="671" x2="671" y1="0" y2="1342" gradientUnits="userSpaceOnUse">
          <stop stopColor="#404040" />
          <stop offset="1" stopColor="#737373" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function RoundDotted2({ className, ref }: { className?: string; ref?: Ref<SVGSVGElement> }) {
  return (
    <svg
      className={className}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 575 575"
    >
      <circle
        cx="287.019"
        cy="287.019"
        r="286.519"
        stroke="url(#a)"
        strokeDasharray="16 16"
        transform="rotate(-45 287.019 287.019)"
      />
      <defs>
        <linearGradient
          id="a"
          x1="287.019"
          x2="287.019"
          y1="0"
          y2="574.038"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#404040" />
          <stop offset="1" stopColor="#737373" />
        </linearGradient>
      </defs>
    </svg>
  )
}
