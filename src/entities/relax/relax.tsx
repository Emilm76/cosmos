import { MobileSlider, MyImage } from '@/shared'
import styles from './relax.module.scss'
import clsx from 'clsx'
import SeaImg from '@/images/sea-2.jpg'
import Slide1Img from '@/images/person-on-beach.jpg'
import Slide2Img from '@/images/meditation-view.jpg'
import Slide3Img from '@/images/sunset-and-mountains.jpg'

export function RelaxSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide1, 'slide mobile-slide')}>
            <MyImage src={SeaImg} sizes="(max-width: 768px) 100vh, 100vw" alt="" />
            <h2 className={clsx(styles.title, 'h1')}>Когда каждый день — открытие</h2>
          </div>

          <div
            className={clsx(styles.slide2, 'white-section slide mobile-slide active')}
            style={{ translate: 'none' }}
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
        </div>
      </div>
    </section>
  )
}
