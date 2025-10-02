'use client'
import styles from './location.module.scss'
import clsx from 'clsx'
import { MyImage } from '@/shared'
import BasikImg from '@/images/basik.jpg'
import RestikImg from '@/images/restik.jpg'
import MapImg from '@/images/map.jpg'
import { useEffect, useRef, useState } from 'react'

export function LocationSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const scrollbarRef = useRef<HTMLDivElement | null>(null)
  const thumbRef = useRef<HTMLDivElement | null>(null)
  const [thumbWidth, setThumbWidth] = useState(0)
  const [thumbLeft, setThumbLeft] = useState(0)
  const [isMapLoad, setIsMapLoad] = useState(false)

  // scrollbar for image
  useEffect(() => {
    const el = scrollRef.current
    const scrollbar = scrollbarRef.current
    if (!isMapLoad || !el || !scrollbar) return

    const updateThumb = () => {
      if (window.innerWidth >= 1024) return
      const { scrollLeft, scrollWidth, clientWidth } = el
      const scrollbarWidth = scrollbar.clientWidth
      const ratio = clientWidth / scrollWidth
      const newWidth = scrollbarWidth * ratio
      const newLeft = (scrollLeft / scrollWidth) * scrollbarWidth
      if (newWidth === scrollbarWidth) setThumbWidth(0)
      else setThumbWidth(newWidth)
      setThumbLeft(newLeft)
    }

    updateThumb()
    el.addEventListener('scroll', updateThumb)
    window.addEventListener('resize', updateThumb)
    return () => {
      el.removeEventListener('scroll', updateThumb)
      window.removeEventListener('resize', updateThumb)
    }
  }, [isMapLoad])

  const isShowScrollbar = () => {
    console.log(thumbWidth)

    return thumbWidth !== 0
  }

  return (
    <section className={clsx(styles.section, 'black-section')}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperOuter1}>
            {/* transform: translateY(-500px) */}
            <div className={styles.wrapperInner1}>
              <div className={clsx(styles.slide1, 'mobile-slide')}>
                <div className={clsx(styles.container, 'container')}>
                  <h2 className="h2">
                    Сердце <br />
                    курортной <br />
                    Евпатории
                  </h2>
                  <div className={styles.image}>
                    <MyImage src={BasikImg} width={300} height={440} alt="" />
                  </div>
                </div>
              </div>
              <div className={clsx(styles.slide2, 'mobile-slide active')}>
                <div className={styles.slideInner}>
                  <div className={styles.image}>
                    <MyImage src={RestikImg} width={300} height={440} alt="" />
                  </div>
                  <div className={clsx(styles.container, 'container')}>
                    <ul className={styles.list} role="list">
                      <li>
                        <div className="green">1 минута</div>
                        <h3 className="h4">собственный пляж, набережная и центр города</h3>
                      </li>
                      <li>
                        <div className="green">5 минут</div>
                        <h3 className="h4">аквапарк</h3>
                      </li>
                      <li>
                        <div className="green">50 минут</div>
                        <h3 className="h4">аэропорт Симферополь</h3>
                      </li>
                      <li>
                        <div className="green">1 час</div>
                        <h3 className="h4">г. Симферополь</h3>
                      </li>
                      <li>
                        <div className="green">1 час</div>
                        <h3 className="h4">пляжи «Мальдивы»</h3>
                      </li>
                      <li>
                        <div className="green">1,5 часа</div>
                        <h3 className="h4">мыс Тарханкут</h3>
                      </li>
                      <li>
                        <div className="green">2 часа</div>
                        <h3 className="h4">Ай-Петри</h3>
                      </li>
                      <li>
                        <div className="green">2 часа</div>
                        <h3 className="h4">Большой каньон Крыма</h3>
                      </li>
                      <li>
                        <div className="green">3 часа</div>
                        <h3 className="h4">Крымский мост</h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* translate: none; */}
          <div className={clsx(styles.slide3, 'mobile-slide active')}>
            <div className={clsx(styles.image, 'hide-scroll')} ref={scrollRef}>
              <MyImage src={MapImg} onLoad={() => setIsMapLoad(true)} alt="" />
            </div>
            <button className={styles.btn} type="button">
              <span>
                Смотреть <br />
                на карте
              </span>
            </button>
            <div
              className={clsx(styles.scrollbar, isShowScrollbar() && styles.show)}
              ref={scrollbarRef}
            >
              <div
                className={styles.scrollThumb}
                style={{ width: `${thumbWidth}px`, left: `${thumbLeft}px` }}
                ref={thumbRef}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
