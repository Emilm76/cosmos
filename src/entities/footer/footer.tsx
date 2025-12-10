'use client'
import { useHeader } from '@/context/header-context'
import styles from './footer.module.scss'
import { LogoWithDescriptor3 } from '@/shared/ui/icons/logo-with-descriptor-3'
import { useEffect, useRef } from 'react'
import clsx from 'clsx'

export function Footer() {
  const contentRef = useRef<HTMLDivElement>(null)
  const { setFooter } = useHeader()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFooter(entry.isIntersecting)
        })
      },
      { threshold: 0.9 },
    )
    if (contentRef.current) observer.observe(contentRef.current)
    return () => {
      observer.disconnect()
      setFooter(false)
    }
  }, [setFooter])

  return (
    <section className={clsx(styles.section, 'mobile-slide m4-slide2')}>
      <div className={styles.content} ref={contentRef}>
        <div className={styles.wrapper}>
          <Video />
          <LogoWithDescriptor3 className={styles.logo} />
          <p className={styles.text}>
            ООО &quot;Интерстрой&quot; 295051, Республика Крым, г.&nbsp;Симферополь,
            б-р&nbsp;Ленина, д.&nbsp;12
          </p>
        </div>
      </div>
    </section>
  )
}

function Video() {
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    // eslint-disable-next-line
    return <img src="/video-preview.jpg" alt="" />
  }

  return (
    <iframe
      src="https://kinescope.io/embed/xsixvE7hBVpjFSFEnhmg4J"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
      allowFullScreen
      width="100%"
      height="100%"
    ></iframe>
  )
}
