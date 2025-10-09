'use client'
import styles from './city.module.scss'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CitySection() {
  const content = useRef<HTMLDivElement | null>(null)
  const imageOverlay = useRef<HTMLDivElement | null>(null)
  const overlayTitle = useRef<HTMLDivElement | null>(null)
  const overlayText = useRef<HTMLDivElement | null>(null)
  const rep = useRef<HTMLDivElement | null>(null)

  // useGSAP(() => {
  //   if (content.current === null) return

  //   const animationHeight = () => (content.current?.offsetHeight || 0) * 2
  //   const animationHeight10 = () => animationHeight() * 0.1
  //   //const animationHeight25 = () => animationHeight() * 0.25
  //   const animationHeight50 = () => animationHeight() * 0.5

  //   const tlOverlay = gsap.timeline({
  //     defaults: { ease: 'none' },
  //     scrollTrigger: {
  //       trigger: content.current,
  //       scrub: true,
  //       start: 'top top',
  //       end: () => 'top+=' + animationHeight(),
  //       //markers: true,
  //     },
  //   })

  //   gsap.to(content.current, {
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: content.current,
  //       scrub: true,
  //       start: 'top top',
  //       end: () => 'top+=' + animationHeight(),
  //       /*end: function () {},*/
  //       pin: true,
  //       pinSpacing: true, // false
  //       //markers: true,
  //     },
  //   })

  //   gsap.to(rep.current, {
  //     ease: 'none',
  //     x: '-100%',
  //     scrollTrigger: {
  //       trigger: content.current,
  //       scrub: true,
  //       //pin: true,
  //       start: () => `top+=${animationHeight50()} bottom`,
  //       end: () => `top+=${animationHeight()} bottom`,
  //       markers: true,
  //     },
  //   })

  //   tlOverlay
  //     .fromTo(overlayTitle.current, { top: '20%' }, { top: 0 })
  //     .fromTo(overlayText.current, { top: '20%' }, { top: 0 }, '<')
  // })

  return (
    <section className={clsx(styles.section, 'black-section')}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src="img/demin-plan-dark.jpg" alt="" />
            <div className={styles.imageOverlay} ref={imageOverlay}>
              <div className={clsx(styles.imageText, 'container')}>
                <h2 className="h2" ref={overlayTitle}>
                  Евпатория — курорт будущего
                </h2>
                <p ref={overlayText}>
                  Это город с историей и один из самых солнечных в Крыму. Культурная столица
                  западного побережья, где более 280 солнечных дней в году, мягкий климат, тёплое
                  море и всеми любимые песчаные пляжи создают идеальные условия сравнимые с Ниццей.
                  <br />
                  <br />
                  Город активно развивается: реализуется федеральный проект «Пять морей и озеро
                  Байкал» с новой набережной протяжённостью более 11 км.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* style={{ translate: '-100% 0' }} */}
        <div className={styles.rep} ref={rep}>
          <div className={clsx(styles.repContainer, 'container')}>
            <h2 className="h2">Начало новой истории</h2>
            <div className={styles.beachImage}>
              <img src="img/beach.jpg" alt="" />
            </div>
            <div className={styles.beachText}>
              <h3 className="subtitle">Cosmos Smart Evpatoriya Hotel</h3>
              <p>
                новый символ курортной Евпатории. Мы создали пространство, в котором каждый гость
                почувствует себя особенным. Первая линия, собственный пляж, панорамные виды, SPA,
                европейский сервис — всё для того, чтобы время, проведённое здесь, стало вашей
                лучшей историей.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
