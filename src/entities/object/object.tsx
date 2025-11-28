'use client'
import styles from './object.module.scss'
import { useRef } from 'react'
import clsx from 'clsx'
import SeaImg from '@/images/sea.jpg'
import BeachImg from '@/images/beach-2.jpg'
import Swim1Img from '@/images/swim-1.jpg'
import Swim2Img from '@/images/swim-2.jpg'
import Beach2Img from '@/images/beach-3.jpg'
import RichManImg from '@/images/rich-man.jpg'
import FriendsImg from '@/images/friends.jpg'
import ListImg1 from '@/images/list-1.jpg'
import ListImg2 from '@/images/list-2.jpg'
import FeetImg from '@/images/feet.jpg'
import CoffeeImg from '@/images/coffee-table.jpg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useIsLoadingStore } from '@/store'
import { MobileSlider } from '@/shared/ui/slider/mobile-slider'
import { MyImage } from '@/shared/ui/image/image'

gsap.registerPlugin(ScrollTrigger)
const mm = gsap.matchMedia()

const animationHeightCount = 4
const animationHeightCSS = animationHeightCount * 100 + 'vh'

const steps = {
  aside: 0,
  span1: 1,
  span2: 4,
  asideEnd: 10,
  subtitle: 11,
  bg1: 11,
  bg1End: 28.5,
  bg2: 29,
  bg2End: 46,
  bg3: 47,
  bg3End: 64,
  asideBackEnd: 64,
  slide2Start: 65,
  subtitle2: 70,
  slide2End: 100,
}

const title = [
  'Быть',
  'может,',
  'вам ближе',
  'джаз,',
  'а может —',
  'классика',
  'Это выбор,',
  'полный',
  'надёжности',
  'и лёгкой',
  'интриги,',
  'которую',
  'хочется',
  'открыть',
  'первым.',
]

export function ObjectSection() {
  const isLoading = useIsLoadingStore((s) => s.isLoading)

  const content = useRef(null)
  const slide2 = useRef(null)
  const slide3 = useRef(null)
  const leftSide = useRef(null)
  const rightSide = useRef(null)
  const subtitle = useRef(null)
  const img = useRef(null)
  const text = useRef(null)
  const hr = useRef(null)
  const bg1 = useRef(null)
  const bg1Img = useRef(null)
  const bg2 = useRef(null)
  const bg2Img = useRef(null)
  const bg3 = useRef(null)
  const bg3Img = useRef(null)
  const listImg = useRef(null)
  const span1 = useRef(null)
  const span2 = useRef(null)

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

      const asideHeight = window.innerWidth >= 1600 ? 2500 : 1900
      const asideYOffset = window.innerHeight - asideHeight

      tl.to(
        leftSide.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.aside]: { x: '-100%' },
            [steps.asideEnd]: { x: 0 },
            [steps.subtitle]: { y: 0 },
            [steps.asideBackEnd]: { y: asideYOffset },
          },
        },
        0,
      )
      tl.to(
        rightSide.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.aside]: { x: '100%' },
            [steps.asideEnd]: { x: 0 },
            [steps.subtitle]: { y: 0 },
            [steps.asideBackEnd]: { y: asideYOffset },
          },
        },
        0,
      )

      // text in center
      tl.to(
        span1.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.span1]: { y: 0 },
            [steps.span1 + 5]: { y: '-160%' },
          },
        },
        0,
      )
      tl.to(
        span2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.span2]: { y: 0 },
            [steps.span2 + 5]: { y: '-160%' },
          },
        },
        0,
      )

      const blocks: HTMLElement[] = gsap.utils.toArray('.t-item')
      blocks.forEach((t, index, array) => {
        const length = array.length + 1
        const start = Math.floor(((steps.asideBackEnd - steps.subtitle) / length) * index)
        const end = Math.floor(((steps.asideBackEnd - steps.subtitle) / length) * (index + 1))
        tl.to(
          t,
          {
            ease: 'sine.inOut',
            keyframes: {
              [steps.subtitle + start]: { '--fill-percent': '100%' },
              [steps.subtitle + end]: { '--fill-percent': '0%' },
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
            [steps.asideEnd]: { opacity: 0 },
            [steps.subtitle]: { opacity: 1 },
          },
        },
        0,
      )

      // slide image 1
      tl.to(
        bg1.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.bg1]: { height: 0 },
            [steps.bg1End]: { height: '100vh' },
          },
        },
        0,
      )
      tl.to(
        bg1Img.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.bg1]: { scale: 1.05 },
            [steps.bg1End]: { scale: 1 },
          },
        },
        0,
      )
      // slide image 2
      tl.to(
        bg2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.bg2]: { height: 0 },
            [steps.bg2End]: { height: '100vh' },
          },
        },
        0,
      )
      tl.to(
        bg2Img.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.bg2]: { scale: 1.05 },
            [steps.bg2End]: { scale: 1 },
          },
        },
        0,
      )
      // slide image 3
      tl.to(
        bg3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.bg3]: { height: 0 },
            [steps.bg3End]: { height: '100vh' },
          },
        },
        0,
      )
      tl.to(
        bg3Img.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.bg3]: { scale: 1.05 },
            [steps.bg3End]: { scale: 1 },
          },
        },
        0,
      )

      // list img
      tl.to(
        listImg.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.bg2]: { height: 0 },
            [steps.bg3]: { height: '100%' },
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
          keyframes: { [steps.subtitle2]: { x: '-12rem' }, [steps.slide2End]: { x: 0 } },
        },
        0,
      )
      tl.to(
        img.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.subtitle2]: { x: '5rem' }, [steps.slide2End]: { x: 0 } },
        },
        0,
      )
      tl.to(
        text.current,
        {
          ease: 'sine.inOut',
          keyframes: { [steps.subtitle2]: { x: '25rem' }, [steps.slide2End]: { x: 0 } },
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
                  <p className="subtitle m1-videSubtitle2">
                    <span ref={span1}>Этот объект — не для всех</span>
                  </p>
                  <h2 className="h2 m1-videSubtitle2">
                    <span ref={span2}>Ваша привилегия</span>
                  </h2>
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
              <div className={styles.imgBgWrap}>
                <div className={styles.imgBg} ref={bg1}>
                  <div className={styles.imgBgImg} ref={bg1Img}>
                    <MyImage src={BeachImg} alt="" />
                  </div>
                </div>
                <div className={styles.imgBg} ref={bg2}>
                  <div className={styles.imgBgImg} ref={bg2Img}>
                    <MyImage src={Swim1Img} alt="" />
                  </div>
                </div>
                <div className={styles.imgBg} ref={bg3}>
                  <div className={styles.imgBgImg} ref={bg3Img}>
                    <MyImage src={Swim2Img} alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.leftBlock} ref={leftSide}>
                <div className={styles.img1}>
                  <MyImage src={RichManImg} alt="" />
                </div>
                <div className={clsx(styles.img2, styles.list)}>
                  <MyImage src={ListImg1} alt="" />
                  <div className={styles.listImgWrap} ref={listImg}>
                    <div className={styles.listImg}>
                      <MyImage src={ListImg2} alt="" />
                    </div>
                  </div>
                </div>
                <div className={styles.img3}>
                  <MyImage src={FeetImg} alt="" />
                </div>
              </div>
            </div>

            <div className={clsx(styles.container2, 'container m2-slide4-text')} ref={rightSide}>
              <div className={clsx(styles.img4, 'min-1024')}>
                <MyImage src={CoffeeImg} alt="" />
              </div>
              <h3 className="h3 max-1024 m1-videTitle2">
                Быть может, вам ближе джаз, а может — классика
              </h3>
              <h3 className={clsx('h3 min-1024', styles.subtitle)} ref={subtitle}>
                {title.map((str, index) => (
                  <span className="t-item" data-text={str} key={index}>
                    {str}
                  </span>
                ))}
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
              <h2 className="h2 m1-videTitle2" ref={subtitle}>
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
