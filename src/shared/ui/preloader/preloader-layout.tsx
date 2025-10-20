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
  const dots = useRef<SVGRef>(null)
  const dot2 = useRef<SVGPathElement>(null)
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
        }, 1500)
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
      dots.current,
      {
        keyframes: {
          10: { opacity: 0, rotate: -320 },
          20: { opacity: 1, rotate: -320 },
          70: { opacity: 1, rotate: 0 },
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

    tl.to(
      dot2.current,
      {
        keyframes: {
          70: { y: 0 },
          80: { y: 150 },
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

        <svg
          className={clsx(styles.round, styles.dots)}
          ref={dots as RefObject<SVGSVGElement>}
          width="575"
          height="593"
          viewBox="0 0 575 593"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M538.985 143.553C538.985 147.024 537.96 150.417 536.039 153.303C534.118 156.189 531.388 158.438 528.193 159.767C524.999 161.095 521.484 161.442 518.093 160.765C514.702 160.088 511.587 158.417 509.142 155.962C506.697 153.508 505.032 150.381 504.357 146.977C503.683 143.573 504.029 140.044 505.352 136.837C506.675 133.631 508.916 130.89 511.791 128.962C514.666 127.033 518.046 126.004 521.503 126.004C523.8 126.002 526.074 126.454 528.196 127.335C530.318 128.216 532.246 129.509 533.87 131.139C535.493 132.769 536.781 134.705 537.659 136.835C538.537 138.965 538.987 141.248 538.985 143.553Z"
            fill="#A2C73B"
          />
          <path
            ref={dot2}
            d="M305.127 17.5323C305.127 20.9999 304.103 24.3895 302.183 27.2727C300.264 30.1559 297.537 32.4031 294.346 33.73C291.154 35.057 287.643 35.4042 284.255 34.7277C280.867 34.0512 277.755 32.3814 275.313 29.9295C272.87 27.4776 271.207 24.3536 270.533 20.9527C269.859 17.5517 270.205 14.0266 271.527 10.823C272.849 7.61937 275.087 4.8812 277.959 2.95472C280.831 1.02825 284.208 0 287.662 0C292.294 0 296.736 1.84715 300.012 5.13509C303.287 8.42304 305.127 12.8824 305.127 17.5323Z"
            fill="#A2C73B"
          />
          <path
            d="M71.2516 140.332C71.2549 143.803 70.2325 147.198 68.3136 150.086C66.3947 152.974 63.6656 155.226 60.4715 156.557C57.2775 157.888 53.7619 158.238 50.3697 157.563C46.9775 156.888 43.8609 155.218 41.4144 152.764C38.9678 150.31 37.3012 147.183 36.6252 143.779C35.9493 140.374 36.2945 136.844 37.6172 133.637C38.9398 130.429 41.1805 127.687 44.0557 125.758C46.9309 123.829 50.3115 122.799 53.7698 122.799C58.4033 122.799 62.8473 124.646 66.1253 127.933C69.4033 131.221 71.2471 135.68 71.2516 140.332Z"
            fill="#A2C73B"
          />
        </svg>

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
