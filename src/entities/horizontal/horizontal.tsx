'use client'
import styles from './horizontal.module.scss'
import Img1 from '@/images/service.jpg'
import Img2 from '@/images/family.jpg'
import Img3 from '@/images/holl.jpg'
import Img4 from '@/images/spa-2.jpg'
import Img5 from '@/images/sport.jpg'
import Img6 from '@/images/bar.jpg'
import clsx from 'clsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { useIsLoadingStore } from '@/store'
import { MyImage } from '@/shared/ui/image/image'

gsap.registerPlugin(ScrollTrigger)

const animationHeightCount = 6
const animationHeightCSS = animationHeightCount * 100 + 'vh'

export function HorizontalSection() {
  const content = useRef(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const slide1 = useRef(null)
  const slide2 = useRef(null)
  const slide3 = useRef(null)
  const slide4 = useRef(null)
  const slide5 = useRef(null)
  const slide6 = useRef(null)
  const img1 = useRef(null)
  const img2 = useRef(null)
  const img3 = useRef(null)
  const img4 = useRef(null)
  const img5 = useRef(null)
  const img6 = useRef(null)
  const img2Wrap = useRef(null)
  const img3Wrap = useRef(null)
  const img4Wrap = useRef(null)
  const img5Wrap = useRef(null)
  const img6Wrap = useRef(null)

  const isLoading = useIsLoadingStore((s) => s.isLoading)

  useGSAP(() => {
    if (isLoading) return

    const mm = gsap.matchMedia()

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
          trigger: content.current,
          scrub: 0.4,
          start: 'top top',
          end: () => 'top+=' + animationHeight(),
        },
      })

      const xOffset = () => ((wrapper.current?.offsetWidth || 0) - window.innerWidth) * -1

      tl.to(
        wrapper.current,
        {
          ease: 'none',
          keyframes: {
            0: { x: 0 },
            20: { x: xOffset() * 0.2 },
            40: { x: xOffset() * 0.4 },
            60: { x: xOffset() * 0.6 },
            80: { x: xOffset() * 0.8 },
            100: { x: xOffset },
          },
        },
        0,
      )

      tl.to(
        img2Wrap.current,
        {
          ease: 'none',
          keyframes: {
            0: { height: '27.5rem', width: '22%' },
            20: { height: '100vh', width: '45%' },
          },
        },
        0,
      )
      tl.to(
        img2.current,
        {
          ease: 'none',
          keyframes: {
            0: { scale: 1.2 },
            20: { scale: 1 },
          },
        },
        0,
      )

      tl.to(
        img3Wrap.current,
        {
          ease: 'none',
          keyframes: {
            20: { height: '27.5rem', width: '22%' },
            40: { height: '100vh', width: '45%' },
          },
        },
        0,
      )
      tl.to(
        img3.current,
        {
          ease: 'none',
          keyframes: {
            20: { scale: 1.2 },
            40: { scale: 1 },
          },
        },
        0,
      )

      tl.to(
        img4Wrap.current,
        {
          ease: 'none',
          keyframes: {
            40: { height: '27.5rem', width: '22%' },
            60: { height: '100vh', width: '45%' },
          },
        },
        0,
      )
      tl.to(
        img4.current,
        {
          ease: 'none',
          keyframes: {
            40: { scale: 1.2 },
            60: { scale: 1 },
          },
        },
        0,
      )

      tl.to(
        img5Wrap.current,
        {
          ease: 'none',
          keyframes: {
            60: { height: '27.5rem', width: '22%' },
            80: { height: '100vh', width: '45%' },
          },
        },
        0,
      )
      tl.to(
        img5.current,
        {
          ease: 'none',
          keyframes: {
            60: { scale: 1.2 },
            80: { scale: 1 },
          },
        },
        0,
      )
      tl.to(
        img6Wrap.current,
        {
          ease: 'none',
          keyframes: {
            80: { height: '27.5rem', width: '22%' },
            100: { height: '100vh', width: '45%' },
          },
        },
        0,
      )
      tl.to(
        img6.current,
        {
          ease: 'none',
          keyframes: {
            80: { scale: 1.2 },
            100: { scale: 1 },
          },
        },
        0,
      )
    })
  }, [isLoading])

  return (
    <section className={styles.section} style={{ marginBottom: animationHeightCSS }}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper} ref={wrapper}>
          <div className={clsx(styles.slide, 'slide mobile-slide m3-slide6')} ref={slide1}>
            <div className={styles.image} ref={img1}>
              <MyImage src={Img1} alt="" />
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2 m1-videTitle2">
                  Сервис <br />
                  мирового <br />
                  уровня
                </h2>
                <p className="m1-videSubtitle2">
                  Круглосуточный консьерж, рум-сервис и услуги химчистки — всё, чтобы вы отдыхали
                  без забот.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide m3-slide7')} ref={slide2}>
            <div className={styles.image} ref={img2Wrap}>
              <div className={styles.imageInner} ref={img2}>
                <MyImage src={Img2} alt="" />
              </div>
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2 m1-videTitle2">
                  Атмосфера, <br />
                  созданная природой <br />
                  и дизайном
                </h2>
                <p className="m1-videSubtitle2">
                  Авторское ландшафтное озеленение и охраняемая территория 24/7 создают гармонию
                  и чувство уединения.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide m3-slide8')} ref={slide3}>
            <div className={styles.image} ref={img3Wrap}>
              <div className={styles.imageInner} ref={img3}>
                <MyImage src={Img3} alt="" />
              </div>
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2 m1-videTitle2">
                  Вкус <br />
                  и стиль
                </h2>
                <p className="m1-videSubtitle2">
                  Современный лобби-бар и ресторан а-ля карт со шведской линией и авторскими блюдами
                  от шеф-повара.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide m3-slide9')} ref={slide4}>
            <div className={styles.image} ref={img4Wrap}>
              <div className={styles.imageInner} ref={img4}>
                <MyImage src={Img4} alt="" />
              </div>
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2 m1-videTitle2">
                  Территория <br />
                  SPA-релакса
                </h2>
                <p className="m1-videSubtitle2">
                  Бани, расслабляющие процедуры, массажные и косметологические кабинеты —
                  для красоты, здоровья и отдыха.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide m3-slide10')} ref={slide5}>
            <div className={styles.image} ref={img5Wrap}>
              <div className={styles.imageInner} ref={img5}>
                <MyImage src={Img5} alt="" />
              </div>
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2 m1-videTitle2">Для активных</h2>
                <p className="m1-videSubtitle2">
                  Современный тренажёрный зал, массажные комнаты для восстановления, солярий
                  для безупречного загара.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide m3-slide11')} ref={slide6}>
            <div className={styles.image} ref={img6Wrap}>
              <div className={styles.imageInner} ref={img2}>
                <MyImage src={Img6} alt="" />
              </div>
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2 m1-videTitle2">
                  Территория <br />
                  у моря
                </h2>
                <p className="m1-videSubtitle2">
                  Собственный пляж и круглогодичный бассейн с детской зоной и стильным баром.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
