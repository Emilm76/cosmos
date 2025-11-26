'use client'
import styles from './city.module.scss'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import DeminImg from '@/images/demin-plan-dark.jpg'
import BeachImg from '@/images/woman-with-beach.jpg'
import ManImg from '@/images/man-with-tie.jpg'
import { useIsLoadingStore } from '@/store'
import { ImagePriority, MyImage } from '@/shared/ui/image/image'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

const animationHeightCount = 3.5
const animationHeightCSS = animationHeightCount * 100 + 'vh'

export function CitySection() {
  const wrapper = useRef<DivRef>(null)
  const content = useRef<DivRef>(null)
  const title = useRef<DivRef>(null)
  const text = useRef<DivRef>(null)
  const imageBg = useRef<DivRef>(null)
  const side = useRef<DivRef>(null)
  const subtitle = useRef<DivRef>(null)
  const text2 = useRef<DivRef>(null)
  const rep2Wrapper = useRef<DivRef>(null)
  const round = useRef<DivRef>(null)
  const round2 = useRef<DivRef>(null)
  const image1 = useRef<DivRef>(null)
  const image2 = useRef<DivRef>(null)
  const img1 = useRef<DivRef>(null)
  const img2 = useRef<DivRef>(null)

  const isLoading = useIsLoadingStore((s) => s.isLoading)

  useGSAP(() => {
    if (isLoading) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const animationHeight = () => window.innerHeight * animationHeightCount

      const steps = {
        start: 0,
        slide2Start: 42,
        roundStart: window.innerWidth >= 1600 ? 67.6 : window.innerWidth >= 1300 ? 68 : 68,
        roundEnd: window.innerWidth >= 1600 ? 73 : window.innerWidth >= 1300 ? 75.7 : 74.5,
        end: 100,
      }

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
        duration: 0.8,
        keyframes: {
          0: { y: '10rem', opacity: 0 },
          100: { y: 0, opacity: 1 },
        },
      })
      gsap.to(text.current, {
        ease: 'sine.inOut',
        duration: 0.8,
        keyframes: {
          0: { y: '10rem', opacity: 0 },
          100: { y: 0, opacity: 1 },
        },
      })

      tl.to(
        side.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.start]: { x: 0 }, [steps.slide2Start]: { x: '-100%' } },
        },
        0,
      )
      tl.to(
        subtitle.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.start]: { x: window.innerWidth >= 1300 ? '-10rem' : 0 },
            [steps.slide2Start]: { x: 0 },
          },
        },
        0,
      )
      tl.to(
        image1.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.start]: { x: '56rem' }, [steps.slide2Start]: { x: 0 } },
        },
        0,
      )
      tl.to(
        text2.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.start]: { x: '97rem' }, [steps.slide2Start]: { x: 0 } },
        },
        0,
      )
      tl.to(
        imageBg.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.start]: { x: 0 }, [steps.slide2Start]: { x: '-50%' } },
        },
        0,
      )

      tl.to(
        rep2Wrapper.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.slide2Start]: { width: 0 }, [steps.end]: { width: '100vw' } },
        },
        0,
      )

      const roundX = window.innerWidth >= 1300 ? '16rem' : '10rem'

      gsap.set(round.current, { x: roundX })
      tl.to(
        round.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.roundStart]: { x: roundX }, [steps.roundEnd]: { x: 0 } },
        },
        0,
      )

      gsap.set(round2.current, { x: roundX })
      tl.to(
        round2.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.roundStart]: { x: roundX }, [steps.roundEnd]: { x: 0 } },
        },
        0,
      )
    })
  }, [isLoading])

  return (
    <section
      className={clsx(styles.section, 'black-section')}
      style={{ marginBottom: animationHeightCSS }}
      ref={wrapper}
    >
      <div className={styles.content} ref={content}>
        <div className={clsx(styles.wrapper, 'm2-slide1')}>
          <div className={styles.imageWrapper}>
            <div className={styles.image} ref={imageBg}>
              <ImagePriority src={DeminImg} alt="" />
            </div>
            <div className={styles.imageOverlay}>
              <div className={clsx(styles.imageText, 'container')}>
                <h2 className="h2 m1-videTitle2" ref={title}>
                  Евпатория — курорт будущего
                </h2>
                <p className="m1-videSubtitle2" ref={text}>
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
              Начало <br />
              новой <br />
              истории
            </h2>
            <div className={clsx(styles.beachImage, 'm2-slide2-img')} ref={image1}>
              <div className={styles.img} ref={img1}>
                <MyImage src={BeachImg} alt="" />
              </div>
              <div className={styles.round} ref={round}></div>
            </div>
            <div className={clsx(styles.beachText, 'm2-slide2-text')} ref={text2}>
              <h3 className="subtitle">Cosmos Smart Evpatoriya Hotel</h3>
              <p>
                новый символ курортной Евпатории. Мы создали пространство, в котором каждый гость
                почувствует себя особенным. Первая линия, собственный пляж, панорамные виды, SPA,
                европейский сервис — всё для того, чтобы время, проведённое здесь, стало лучшей
                историей для гостей.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rep2Wrapper} ref={rep2Wrapper}>
          <div className={clsx(styles.rep2, 'mobile-slide m2-slide22')}>
            <div className={clsx(styles.repContainer, 'container')}>
              <h2 className="h2">
                ИСТОРИИ <br />
                ВАШЕГО <br />
                КАПИТАЛА
              </h2>
              <div className={clsx(styles.beachImage, 'm2-slide22-img')} ref={image2}>
                <div className={styles.img} ref={img2}>
                  <MyImage src={ManImg} alt="" />
                </div>
                <div className={styles.round} ref={round2}></div>
              </div>
              <div className={clsx(styles.beachText, 'm2-slide22-text')}>
                <h3 className="subtitle">Cosmos Smart Evpatoriya Hotel</h3>
                <p>
                  Это не просто место у моря. Это актив, который растёт в цене и приносит доход.
                  <br />
                  <br />
                  Управление Cosmos, высокий спрос,
                  <br />
                  <br />
                  престижная локация — всё работает на вашу выгоду.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
