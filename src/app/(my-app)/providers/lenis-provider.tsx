'use client'
import gsap from 'gsap'
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import 'lenis/dist/lenis.css'
import { LenisRef, ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

export function LenisScrollProvider({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    //gsap.registerPlugin(ScrollTrigger)
    if (!lenisRef) return

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    // ensure ScrollTrigger has correct measurements once Lenis is active
    //ScrollTrigger.refresh()

    return () => gsap.ticker.remove(update)
  }, [])

  return isDesktop ? (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        wheelMultiplier: 0.8,
        autoRaf: false,
        prevent: (node) => node.classList.contains('lenis-prevent'),
      }}
      //onScroll={ScrollTrigger.update}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  ) : (
    children
  )
}
