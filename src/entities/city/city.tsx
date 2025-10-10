'use client'
import styles from './city.module.scss'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MyImage } from '@/shared'
import DeminImg from '@/images/demin-plan-dark.jpg'
import BeachImg from '@/images/beach.jpg'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

export function CitySection() {
  const content = useRef<DivRef>(null)
  const wrapper = useRef<DivRef>(null)
  const title = useRef<DivRef>(null)
  const text = useRef<DivRef>(null)
  const image = useRef<DivRef>(null)
  const side = useRef<DivRef>(null)
  const subtitle = useRef<DivRef>(null)

  useGSAP(() => {
    const animationHeight = () => window.innerHeight * 3

    gsap.to(content.current, {
      ease: 'none',
      scrollTrigger: {
        trigger: content.current,
        scrub: true,
        start: 'top top',
        end: () => 'top+=' + animationHeight(),
        pin: true,
        pinSpacing: true,
        // markers: true,
      },
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper.current,
        scrub: 0.4,
        start: 'top top',
        end: () => 'top+=' + animationHeight(),
      },
    })

    tl.to(
      title.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          0: { y: '12rem', opacity: 0 },
          15: { y: 0, opacity: 1 },
          35: { y: 0, opacity: 1 },
          80: { y: 0, opacity: 0 },
        },
      },
      0,
    )
    tl.to(
      text.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          0: { y: '12rem', opacity: 0 },
          15: { y: 0, opacity: 1 },
          // 35: { y: 0, opacity: 1 },
          // 80: { y: 0, opacity: 0 },
        },
      },
      0,
    )

    tl.to(
      side.current,
      {
        ease: 'sine.inOut',
        keyframes: { 35: { x: 0 }, 99: { x: '-100%' } },
      },
      0,
    )
    tl.to(
      subtitle.current,
      {
        ease: 'sine.inOut',
        keyframes: { 35: { x: '-20rem' }, 99: { x: 0 } },
      },
      0,
    )
    tl.to(
      image.current,
      {
        ease: 'sine.inOut',
        keyframes: { 35: { x: 0 }, 99: { x: '-50%' } },
      },
      0,
    )
  })

  return (
    <section className={clsx(styles.section, 'black-section')} style={{ marginBottom: '200vh' }}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper} ref={wrapper}>
          <div className={styles.imageWrapper}>
            <div className={styles.image} ref={image}>
              <MyImage src={DeminImg} alt="" />
            </div>
            <div className={styles.imageOverlay}>
              <div className={clsx(styles.imageText, 'container')}>
                <h2 className="h2" ref={title}>
                  Евпатория — курорт будущего
                </h2>
                <p ref={text}>
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

        <div className={styles.rep} ref={side}>
          <div className={clsx(styles.repContainer, 'container')}>
            <h2 className="h2" ref={subtitle}>
              Начало новой истории
            </h2>
            <div className={styles.beachImage}>
              <MyImage src={BeachImg} alt="" />
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
