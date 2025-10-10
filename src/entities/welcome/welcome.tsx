'use client'
import { LogoWithDescriptor } from '@/shared/ui/icons/logo-with-descriptor'
import styles from './welcome.module.scss'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

export function WelcomeSection() {
  const content = useRef<DivRef>(null)
  const wrapper = useRef<DivRef>(null)
  const curtainInner = useRef<DivRef>(null)
  const overlay = useRef<DivRef>(null)
  const title = useRef<DivRef>(null)
  const text = useRef<DivRef>(null)
  const video = useRef<DivRef>(null)
  const logo = useRef<DivRef>(null)
  const side = useRef<DivRef>(null)

  useGSAP(() => {
    const windowHeight = () => window.innerHeight
    const animationHeight = () => windowHeight() * 5

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper.current,
        scrub: 0.4,
        start: 'top top',
        end: animationHeight,
      },
    })

    tl.to(
      curtainInner.current,
      {
        ease: 'sine.inOut',
        keyframes: { 0: { y: 0 }, 40: { y: '-100%' } }, // 0 70
      },
      0,
    )
    tl.to(
      logo.current,
      {
        keyframes: { 25: { opacity: 0 }, 46: { y: '-20rem' } }, // 40 70
      },
      0,
    )
    tl.to(
      overlay.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          13: { opacity: 0 },
          35: { opacity: 1 },
          65: { opacity: 1 },
          80: { opacity: 0 },
        },
      },
      0,
    )
    tl.to(
      title.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          20: { y: '20rem', opacity: 0 },
          45: { y: 0, opacity: 1 },
        },
      },
      0,
    )
    tl.to(
      text.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          18: { y: '20rem', opacity: 0 },
          45: { y: 0, opacity: 1 },
        },
      },
      0,
    )
    tl.to(
      video.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          0: { y: '23%', scale: 1 },
          45: { y: 0, scale: 1.1 },
          55: { x: 0, scale: 1.1 },
          99: { x: '-20%', scale: 1 },
        },
      },
      0,
    )

    tl.to(
      side.current,
      {
        ease: 'sine.inOut',
        keyframes: { 65: { x: 0 }, 99: { x: '-100%' } },
      },
      0,
    )
  })

  return (
    <section className={clsx(styles.section, 'black-section')} style={{ marginBottom: '500vh' }}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper} ref={wrapper}>
          <div className={clsx(styles.curtain, 'mobile-slide')}>
            <div className={styles.curtainInner} ref={curtainInner}>
              <div className={clsx(styles.logoWrapper, 'container')}>
                <h1 className="subtitle">Эксклюзивный апарт-отель на первой береговой линии</h1>
                <div ref={logo}>
                  <LogoWithDescriptor className={styles.logo} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
              <div className={styles.videoWrapper}>
                <div className={styles.video} ref={video}>
                  {/* <img src="/img/video-preview.jpg" alt="" /> */}
                  <iframe
                    src="https://kinescope.io/embed/15PdvWrUBUi7JmBA1zhraz"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                    allowFullScreen
                    width="100%"
                    height="100%"
                  ></iframe>
                </div>
              </div>
              <div className={styles.videoOverlay} ref={overlay}>
                <div className={clsx(styles.videoText, 'container')}>
                  <h2 className="h2" ref={title}>
                    Статус <br />
                    Комфорт <br />
                    Престиж
                  </h2>
                  <p className="subtitle" ref={text}>
                    Лимитированная коллекция апартаментов с панорамным видом и европейским сервисом
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rep} ref={side}>
            <div className={clsx(styles.repContainer, 'container')}>
              <h2 className="h2">Ваши гарантии — наша репутация</h2>
              <p>
                Проект реализует федеральный застройщик ГК Интерстрой с более чем 20-летним опытом
                и безупречной репутацией. Строительство ведётся по 214-ФЗ с использованием
                эскроу-счётов. Управление отелем осуществляет Cosmos Hotel Group — топовый отельный
                оператор.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
