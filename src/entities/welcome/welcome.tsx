'use client'
import { LogoWithDescriptor } from '@/shared/ui/icons/logo-with-descriptor'
import styles from './welcome.module.scss'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function WelcomeSection() {
  const content = useRef<HTMLDivElement | null>(null)
  const curtain = useRef<HTMLDivElement | null>(null)
  const curtainInner = useRef<HTMLDivElement | null>(null)
  const videoOverlay = useRef<HTMLDivElement | null>(null)
  const overlayTitle = useRef<HTMLDivElement | null>(null)
  const rep = useRef<HTMLDivElement | null>(null)

  // useGSAP(() => {
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
  // })

  return (
    <section className={clsx(styles.section, 'black-section')}>
      <div className={styles.content} ref={content}>
        <div className={styles.curtain} ref={curtain}>
          <div className={styles.curtainInner} ref={curtainInner}>
            <div className={clsx(styles.logoWrapper, 'container')}>
              <h1 className="subtitle">Эксклюзивный апарт-отель на первой береговой линии</h1>
              <LogoWithDescriptor className={styles.logo} />
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <img className={styles.video} src="img/test.jpg" alt="" />
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
    </section>
  )
}
