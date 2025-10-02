'use client'
import styles from './object.module.scss'
//import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MyImage } from '@/shared'
import SeaImg from '@/images/sea.jpg'
import BeachImg from '@/images/beach-2.jpg'
import Beach2Img from '@/images/beach-3.jpg'
import RichManImg from '@/images/rich-man.jpg'
import FriendsImg from '@/images/friends.jpg'
import { MobileSlider } from '@/shared'

gsap.registerPlugin(ScrollTrigger)

export function ObjectSection() {
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
    <section className={clsx(styles.section, 'white-section')}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <MyImage
              className={styles.image}
              src={SeaImg}
              sizes="(max-width: 768px) 100vh, 100vw"
              alt=""
            />
            <div className={styles.imageOverlay} ref={imageOverlay}>
              <div className={clsx(styles.imageText, 'container')}>
                <h2 className="h2" ref={overlayTitle}>
                  Ваша привилегия
                </h2>
                <p className="subtitle" ref={overlayText}>
                  Этот объект — не для всех
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.wrapper2}>
          <MobileSlider
            className={styles.slider}
            slides={[
              { src: BeachImg, alt: '' },
              { src: RichManImg, alt: '' },
              { src: FriendsImg, alt: '' },
            ]}
          />
          <div className={clsx(styles.container2, 'container')}>
            <h3 className="h3">Быть может, вам ближе джаз, а может — классика</h3>
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

        {/* style={{ translate: '-100% 0' }} */}
        <div className={styles.wrapper3} ref={rep}>
          <div className={clsx(styles.container3, 'container')}>
            <h2 className="h2">Сердце курортной Евпатории</h2>
            <div className={styles.beachImage}>
              <MyImage src={Beach2Img} alt="" />
            </div>
            <div className={styles.beachText}>
              <p>
                Здесь начинаются маршруты к самым красивым местам Крыма — от золотых пляжей до диких
                скал и заповедных бухт.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
