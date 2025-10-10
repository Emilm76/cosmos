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

type DivRef = HTMLDivElement | null

const slides = [
  {
    img: <MyImage src={BeachImg} alt="" />,
    title: (
      <>
        Разнообразные <br />
        планировки
      </>
    ),
    text: 'Для комфортной жизни и отдыха',
  },
  {
    img: <MyImage src={RichManImg} alt="" />,
    title: (
      <>
        Панорамные виды <br />
        на море
      </>
    ),
    text: 'Каждое утро — как картина',
  },
  {
    img: <MyImage src={FriendsImg} alt="" />,
    title: (
      <>
        Дизайнерский <br />
        ремонт
      </>
    ),
    text: 'Эстетика премиального интерьера в каждом номере',
  },
]

export function ObjectSection() {
  const content = useRef<DivRef>(null)
  const imageOverlay = useRef<DivRef>(null)
  const overlayTitle = useRef<DivRef>(null)
  const overlayText = useRef<DivRef>(null)
  const rep = useRef<DivRef>(null)

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
            slides={slides.map((slide) => ({ className: styles.img, content: slide.img }))}
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
