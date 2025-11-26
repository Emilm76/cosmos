'use client'
import styles from './object.module.scss'
import { useRef } from 'react'
import clsx from 'clsx'
import SeaImg from '@/images/sea.jpg'
import BeachImg from '@/images/beach-2.jpg'
import Beach2Img from '@/images/beach-3.jpg'
import RichManImg from '@/images/rich-man.jpg'
import FriendsImg from '@/images/friends.jpg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useIsLoadingStore } from '@/store'
import { MobileSlider } from '@/shared/ui/slider/mobile-slider'
import { MyImage } from '@/shared/ui/image/image'

gsap.registerPlugin(ScrollTrigger)
const mm = gsap.matchMedia()

const animationHeightCount = 3
const animationHeightCSS = animationHeightCount * 100 + 'vh'

const steps = {
  sideBarsStart: 0,
  subtitleStart: 5,
  imgOpacityStart: 10,
  imgOpacityEnd: 18,
  sideBarsEnd: 20,
  sideBarsBackStart: 21,
  sideBarsBackEnd: 40,
  slide2Start: 41,
  subtitle2Start: 50,
  slide2End: 99,
}

export function ObjectSection() {
  const isLoading = useIsLoadingStore((s) => s.isLoading)

  const content = useRef(null)
  const slide2 = useRef(null)
  const slide3 = useRef(null)
  const leftSide = useRef(null)
  const rightSide = useRef(null)
  const bg = useRef(null)
  const subtitle = useRef(null)
  const img = useRef(null)
  const text = useRef(null)
  const hr = useRef(null)
  const t1 = useRef(null)
  const t2 = useRef(null)
  const t3 = useRef(null)
  const t4 = useRef(null)
  const t5 = useRef(null)
  const t6 = useRef(null)

  useGSAP(() => {
    if (isLoading) return

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

      tl.to(
        leftSide.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.sideBarsStart]: { x: '-100%' },
            [steps.sideBarsEnd]: { x: 0 },
            [steps.sideBarsBackStart]: { y: 0 },
            [steps.sideBarsBackEnd]: { y: '-20vh' },
          },
        },
        0,
      )
      tl.to(
        rightSide.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.sideBarsStart]: { x: '100%' },
            [steps.sideBarsEnd]: { x: 0 },
            [steps.sideBarsBackStart]: { y: 0 },
            [steps.sideBarsBackEnd]: { y: '-20vh' },
          },
        },
        0,
      )

      Array.from([t1, t2, t3, t4, t5, t6]).forEach((t, index: number) => {
        const start = Math.floor(((steps.sideBarsBackEnd - steps.subtitleStart) / 6) * index)
        const end = Math.floor(((steps.sideBarsBackEnd - steps.subtitleStart) / 6) * (index + 1))
        tl.to(
          t.current,
          {
            ease: 'sine.inOut',
            keyframes: {
              [steps.subtitleStart + start]: { '--fill-percent': '100%' },
              [steps.subtitleStart + end]: { '--fill-percent': '0%' },
            },
          },
          0,
        )
      })

      tl.to(
        hr.current,
        {
          ease: 'none',
          keyframes: {
            [steps.sideBarsEnd]: { opacity: 0 },
            [steps.sideBarsBackStart]: { opacity: 1 },
          },
        },
        0,
      )

      tl.to(
        bg.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.imgOpacityStart]: { opacity: 0 },
            [steps.imgOpacityEnd]: { opacity: 1 },
          },
        },
        0,
      )

      tl.to(
        slide2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { x: 0 },
            [steps.slide2End]: { x: '-140vw' },
          },
        },
        0,
      )
      tl.to(
        slide3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { x: '100vw' },
            [steps.slide2End]: { x: '-40vw' },
          },
        },
        0,
      )

      tl.to(
        subtitle.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.subtitle2Start]: { x: '-12rem' }, [steps.slide2End]: { x: 0 } },
        },
        0,
      )
      tl.to(
        img.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.subtitle2Start]: { x: '5rem' }, [steps.slide2End]: { x: 0 } },
        },
        0,
      )
      tl.to(
        text.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.subtitle2Start]: { x: '25rem' }, [steps.slide2End]: { x: 0 } },
        },
        0,
      )
    })
  }, [isLoading])

  return (
    <section
      className={clsx(styles.section, 'white-section')}
      style={{ marginBottom: animationHeightCSS }}
    >
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide1, 'slide mobile-slide m2-slide3')}>
            <div className={styles.imageWrapper}>
              <MyImage
                className={styles.image}
                src={SeaImg}
                sizes="(max-width: 768px) 100vh, 100vw"
                alt=""
              />
              <div className={styles.imageOverlay}>
                <div className={clsx(styles.imageText, 'container')}>
                  <h2 className="h2 m1-videSubtitle2">Ваша привилегия</h2>
                  <p className="subtitle m1-videSubtitle2">Этот объект — не для всех</p>
                </div>
              </div>
            </div>
          </div>

          <div className={clsx(styles.slide2, 'slide mobile-slide m2-slide4')} ref={slide2}>
            {/* isMobile */}
            <MobileSlider
              className={clsx(styles.slider, 'm2-slide4-slider max-1024')}
              slides={[
                { content: <MyImage src={BeachImg} alt="" />, className: styles.sliderSlide },
                { content: <MyImage src={RichManImg} alt="" />, className: styles.sliderSlide },
                { content: <MyImage src={FriendsImg} alt="" />, className: styles.sliderSlide },
              ]}
            />

            {/* isDesktop */}
            <div className="min-1024">
              <div className={styles.imgBg} ref={bg}>
                <MyImage src={BeachImg} alt="" />
              </div>
              <div className={styles.leftBlock} ref={leftSide}>
                <div className={styles.img1}>
                  <MyImage src={RichManImg} alt="" />
                </div>
                <div className={styles.img2}>
                  <MyImage src={FriendsImg} alt="" />
                </div>
              </div>
            </div>

            <div className={clsx(styles.container2, 'container m2-slide4-text')} ref={rightSide}>
              <h3 className="h3 max-1024">Быть может, вам ближе джаз, а может — классика</h3>
              <h3 className={clsx('h3 min-1024', styles.subtitle)} ref={subtitle}>
                <span ref={t1} data-text="Быть">
                  Быть
                </span>
                <span ref={t2} data-text="может,">
                  может,
                </span>
                <span ref={t3} data-text="вам ближе">
                  вам ближе
                </span>
                <span ref={t4} data-text="джаз,">
                  джаз,
                </span>
                <span ref={t5} data-text="а может —">
                  а может —
                </span>
                <span ref={t6} data-text="классика">
                  классика
                </span>
              </h3>
              <p>
                Может быть, вы цените изысканную кухню, и ваш любимый предмет интерьера — канделябр.
                Или, напротив, вы любитель нарочито простых и понятных вкусов.
                <br />
                <br />
                Но здесь всё соединяется в одном пространстве — в апарт-отеле, открывающем новый
                формат жизни у моря.
                <br />
                <br />
                Это выбор, полный надёжности и лёгкой интриги, которую хочется открыть первым.
              </p>
            </div>
          </div>

          <div className={clsx(styles.slide3, 'slide mobile-slide m2-slide5')} ref={slide3}>
            <div className={styles.hr} ref={hr}></div>
            <div className={clsx(styles.container3, 'container m2-slide5-container')}>
              <h2 className="h2" ref={subtitle}>
                Сердце курортной Евпатории
              </h2>
              <div className={clsx(styles.beachImage, 'm2-slide5-img')} ref={img}>
                <MyImage src={Beach2Img} alt="" />
              </div>
              <div className={styles.beachText} ref={text}>
                <p>
                  Здесь начинаются маршруты к самым красивым местам Крыма — от золотых пляжей
                  до диких скал и заповедных бухт.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
