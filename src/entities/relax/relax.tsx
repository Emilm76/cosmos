'use client'
import { MobileSlider, MyImage } from '@/shared'
import styles from './relax.module.scss'
import clsx from 'clsx'
import SeaImg from '@/images/sea-2.jpg'
import Slide1Img from '@/images/person-on-beach.jpg'
import Slide2Img from '@/images/meditation-view.jpg'
import Slide3Img from '@/images/sunset-and-mountains.jpg'
import Slide4Img from '@/images/grapes.jpg'
import Slide5Img from '@/images/white-vine.jpg'
import Slide6Img from '@/images/red-vine.jpg'
import Sea2Img from '@/images/sea-3.jpg'
import { useMediaQuery } from 'react-responsive'

export function RelaxSection() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide1, 'slide mobile-slide')}>
            <MyImage src={SeaImg} sizes="(max-width: 768px) 100vh, 100vw" alt="" />
            <h2 className={clsx(styles.title, 'h1')}>Когда каждый день — открытие</h2>
          </div>

          <div
            className={clsx(styles.slide2, 'white-section slide mobile-slide')}
            style={{ translate: '-50% -100%' }}
          >
            <MobileSlider
              className={styles.slider}
              slides={[
                { className: styles.img1, img: { src: Slide1Img, alt: '' } },
                { className: styles.img2, img: { src: Slide2Img, alt: '' } },
                { className: styles.img3, img: { src: Slide3Img, alt: '' } },
              ]}
            />
            <div className={clsx(styles.text, 'container')}>
              <h2 className="h2">
                Природа <br />
                и здоровье
              </h2>
              <p>
                Природа Евпатории представлена степным ландшафтом, Чёрным морем и целебными
                лиманами, такими как Мойнакское и Сасык-Сиваш, богатыми лечебной грязью и рапой.
              </p>
            </div>
          </div>

          <div
            className={clsx(styles.slide3, 'white-section slide mobile-slide active')}
            style={{ translate: '0 -200%' }}
          >
            <div className={styles.bg}>
              <MyImage src={Sea2Img} alt="" />
              <div className={styles.shadow}></div>
            </div>
            <div className={styles.slideInner}>
              {isMobile && (
                <MobileSlider
                  slides={[
                    { img: { src: Slide4Img, alt: '' } },
                    { img: { src: Slide5Img, alt: '' } },
                    { img: { src: Slide6Img, alt: '' } },
                  ]}
                />
              )}
              {isDesktop && (
                <div className={styles.gastroGrid}>
                  <div className={styles.li}>
                    <div className={styles.img}>
                      <MyImage src={Slide4Img} alt="" />
                    </div>
                    <p>Более 70 виноделен с экскурсиями и дегустациями</p>
                  </div>
                  <div className={styles.li}>
                    <div className={styles.img}>
                      <MyImage src={Slide5Img} alt="" />
                    </div>
                    <p>Устричные и мидийные фермы</p>
                  </div>
                  <div className={styles.li}>
                    <div className={styles.img}>
                      <MyImage src={Slide6Img} alt="" />
                    </div>
                    <p>Ремесленные сыроварни и локальные продукты</p>
                  </div>
                </div>
              )}
              <div className={clsx(styles.text, 'container')}>
                <h2 className="h2">Гастрономия</h2>
                <p>Более 70 виноделен с экскурсиями и дегустациями</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
