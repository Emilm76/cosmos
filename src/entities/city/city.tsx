'use client'
import styles from './city.module.scss'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ImagePriority, MyImage } from '@/shared'
import DeminImg from '@/images/demin-plan-dark.jpg'
import BeachImg from '@/images/beach.jpg'

gsap.registerPlugin(ScrollTrigger)
const mm = gsap.matchMedia()

type DivRef = HTMLDivElement | null

const animationHeightCount = 1.3
const animationHeightCSS = animationHeightCount * 100 + 'vh'

const steps = {
  slide2Start: 0,
  slide2End: 99,
}

export function CitySection() {
  const wrapper = useRef<DivRef>(null)
  const content = useRef<DivRef>(null)
  const title = useRef<DivRef>(null)
  const text = useRef<DivRef>(null)
  const image = useRef<DivRef>(null)
  const side = useRef<DivRef>(null)
  const subtitle = useRef<DivRef>(null)

  useGSAP(() => {
    mm.add('(min-width: 1024px)', () => {
      const animationHeight = () => window.innerHeight * animationHeightCount

      // For pinning effect
      ScrollTrigger.create({
        trigger: content.current,
        start: 'top top',
        end: 'max',
        scrub: true,
        pin: true,
        pinSpacing: false,
      })

      // For animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          scrub: 0.4,
          start: 'top top',
          end: () => 'top+=' + animationHeight(),
        },
      })

      gsap.to(title.current, {
        ease: 'sine.inOut',
        duration: 2,
        delay: 1.3,
        keyframes: {
          0: { y: '12rem', opacity: 0 },
          100: { y: 0, opacity: 1 },
        },
      })
      gsap.to(text.current, {
        ease: 'sine.inOut',
        duration: 2,
        delay: 1.3,
        keyframes: {
          0: { y: '12rem', opacity: 0 },
          100: { y: 0, opacity: 1 },
        },
      })

      tl.to(
        title.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { y: 0, opacity: 1 },
            [steps.slide2End]: { y: 0, opacity: 0 },
          },
        },
        0,
      )
      tl.to(
        side.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.slide2Start]: { x: 0 }, [steps.slide2End]: { x: '-100%' } },
        },
        0,
      )
      tl.to(
        subtitle.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.slide2Start]: { x: '-20rem' }, [steps.slide2End]: { x: 0 } },
        },
        0,
      )
      tl.to(
        image.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.slide2Start]: { x: 0 }, [steps.slide2End]: { x: '-50%' } },
        },
        0,
      )
    })
  })

  return (
    <section
      className={clsx(styles.section, 'black-section')}
      style={{ marginBottom: animationHeightCSS }}
      ref={wrapper}
    >
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <div className={styles.image} ref={image}>
              <ImagePriority src={DeminImg} alt="" />
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

        <div className={clsx(styles.rep, 'mobile-slide m2-slide2')} ref={side}>
          <div className={clsx(styles.repContainer, 'container')}>
            <h2 className="h2" ref={subtitle}>
              Начало новой истории
            </h2>
            <div className={clsx(styles.beachImage, 'm2-slide2-img')}>
              <MyImage src={BeachImg} alt="" />
            </div>
            <div className={clsx(styles.beachText, 'm2-slide2-text')}>
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
