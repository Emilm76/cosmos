import { MyImage } from '@/shared'
import styles from './culture.module.scss'
import MainImg from '@/images/architecture.jpg'
import Img1 from '@/images/yacht.jpg'
import Img2 from '@/images/diving.jpg'
import Img3 from '@/images/fishing.jpg'
import Img4 from '@/images/kiting.jpg'
import Img5 from '@/images/sapboard.jpg'
import Img6 from '@/images/windserf.jpg'
import clsx from 'clsx'

export function CultureSection() {
  return (
    <section className={clsx(styles.section, 'black-section')}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide1, 'slide mobile-slide')}>
            <div className={styles.image}>
              <MyImage src={MainImg} sizes="(max-width: 768px) 50vh" alt="" />
            </div>
            <div className={clsx(styles.container, 'container')}>
              <h2 className="h3">
                Культура <br />и архитектура
              </h2>
              <p>
                Евпатория — город с историей более 2500 лет, сохранивший уникальные памятники,
                старинные улочки и атмосферу разных эпох. С 1914 года символом города по праву
                считается легендарный трамвай желаний.
              </p>
            </div>
          </div>

          <div
            className={clsx(styles.slide2, 'black-section slide mobile-slide lenis-prevent active')}
            // style={{ translate: '0 -100%' }}
          >
            <div className={clsx(styles.container, 'container')}>
              <h2 className="h3">Активный отдых</h2>
              <div className={styles.cardsGrid}>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img1} alt="" />
                    </div>
                    <h3 className="subtitle">Яхтинг</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img2} alt="" />
                    </div>
                    <h3 className="subtitle">Дайвинг</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img3} alt="" />
                    </div>
                    <h3 className="subtitle">Морская рыбалка</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img4} alt="" />
                    </div>
                    <h3 className="subtitle">Сапборды</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img5} alt="" />
                    </div>
                    <h3 className="subtitle">Виндсёрфинг</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img6} alt="" />
                    </div>
                    <h3 className="subtitle">Кайтинг</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
