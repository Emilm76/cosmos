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
  const curtain = useRef<DivRef>(null)
  const videoOverlay = useRef<DivRef>(null)
  const overlayTitle = useRef<DivRef>(null)
  const rep = useRef<DivRef>(null)

  const content = useRef<DivRef>(null)
  const wrapper = useRef<DivRef>(null)
  const curtainInner = useRef<DivRef>(null)
  const video = useRef<DivRef>(null)
  const logo = useRef<DivRef>(null)

  useGSAP(() => {
    const animationHeight = () => window.innerHeight * 3
    const animationHeight10 = () => animationHeight() * 0.1
    const animationHeight25 = () => animationHeight() * 0.25
    const animationHeight50 = () => animationHeight() * 0.5

    //gsap.set(o, c({ yPercent: 0 }, n))

    gsap.to(wrapper.current, {
      ease: 'none',
      lazy: false,
      scrollTrigger: {
        trigger: content.current,
        scrub: true,
        start: 'top top',
        end: animationHeight,
        pin: true,
        pinSpacing: false,
        markers: true,
      },
    })

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
        keyframes: { 0: { y: 0 }, 70: { y: '-100%' } },
      },
      0,
    )
    tl.to(
      logo.current,
      {
        keyframes: { 40: { opacity: 0 }, 70: { y: '-20rem' } },
      },
      0,
    )
    tl.to(
      video.current,
      {
        ease: 'sine.inOut',
        keyframes: { 0: { y: '23%', scale: 1 }, 90: { y: 0, scale: 1.1 } },
      },
      0,
    )

    //   if (content.current === null) return
    //   const animationHeight = () => (content.current?.offsetHeight || 0) * 3
    //   const animationHeight10 = () => animationHeight() * 0.1
    //   const animationHeight25 = () => animationHeight() * 0.25
    //   const animationHeight50 = () => animationHeight() * 0.5
    //   const tlCurtain = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: curtain.current,
    //       scrub: true,
    //       start: 'top top',
    //       end: animationHeight25,
    //       //markers: true,
    //     },
    //   })
    //   const tlOverlay = gsap.timeline({
    //     defaults: { ease: 'none' },
    //     scrollTrigger: {
    //       trigger: content.current,
    //       scrub: true,
    //       start: () => `top+=${animationHeight10()} top`,
    //       end: animationHeight,
    //       //markers: true,
    //     },
    //   })
    //   gsap.to(content.current, {
    //     ease: 'none',
    //     scrollTrigger: {
    //       trigger: content.current,
    //       scrub: true,
    //       start: 'top top',
    //       end: animationHeight,
    //       /*end: function () {},*/
    //       pin: true,
    //       pinSpacing: true, // false
    //       //markers: true,
    //     },
    //   })
    //   tlCurtain.to(curtainInner.current, {
    //     ease: 'none',
    //     y: '-100%',
    //   })
    //   gsap.to(rep.current, {
    //     ease: 'none',
    //     x: '-100%',
    //     scrollTrigger: {
    //       trigger: content.current,
    //       scrub: true,
    //       //pin: true,
    //       start: animationHeight50,
    //       end: animationHeight,
    //       //markers: true,
    //     },
    //   })
    //   tlOverlay
    //     .to(videoOverlay.current, { opacity: 1 })
    //     .fromTo(overlayTitle.current, { x: '50%', y: '-50%' }, { x: 0, y: 0, duration: 0.2 }, '<')
    //     .to(videoOverlay.current, { opacity: 0 })
  })

  return (
    <section className={clsx(styles.section, 'black-section')}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper} ref={wrapper}>
          <div className={clsx(styles.curtain, 'mobile-slide')} ref={curtain}>
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
                  <img src="/img/video-preview.jpg" alt="" />
                  {/* <iframe
                  src="https://kinescope.io/embed/15PdvWrUBUi7JmBA1zhraz"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                  allowFullScreen
                  width="100%"
                  height="100%"
                ></iframe> */}
                </div>
              </div>
              <div className={styles.videoOverlay} ref={videoOverlay}>
                <div className={clsx(styles.videoText, 'container')}>
                  <h2 className="h2" ref={overlayTitle}>
                    Статус <br />
                    Комфорт <br />
                    Престиж
                  </h2>
                  <p className="subtitle">
                    Лимитированная коллекция апартаментов с панорамным видом и европейским сервисом
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rep} ref={rep}>
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
