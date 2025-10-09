'use client'
import { MobileSlider, MyImage } from '@/shared'
import styles from './video.module.scss'
import Img1 from '@/images/hall.jpg'
import Img2 from '@/images/sauna.jpg'
import Img3 from '@/images/bar-2.jpg'
import Img4 from '@/images/sofa.jpg'
import Img5 from '@/images/stairs.jpg'
import Img6 from '@/images/sauna-2.jpg'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'

export function VideoSection() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
            {isMobile && (
              <MobileSlider
                className={styles.slider}
                slides={[
                  { className: styles.img, img: <img src="img/video-preview.jpg" alt="" /> },
                  { className: styles.img, img: <MyImage src={Img1} alt="" /> },
                  { className: styles.img, img: <MyImage src={Img2} alt="" /> },
                  { className: styles.img, img: <MyImage src={Img3} quality={60} alt="" /> },
                  { className: styles.img, img: <MyImage src={Img4} quality={60} alt="" /> },
                  { className: styles.img, img: <MyImage src={Img5} alt="" /> },
                  { className: styles.img, img: <MyImage src={Img6} alt="" /> },
                ]}
              />
            )}

            {isDesktop && (
              <div className={styles.gridContainer}>
                <img className={styles.videoContainer} src="img/video-preview.jpg" alt="" />

                <div className={styles.grid}>
                  <div className={styles.column}>
                    <div className={styles.columnInner}>
                      <div className={styles.item}>
                        <MyImage src={Img1} alt="" />
                      </div>
                      <div className={styles.item}>
                        <MyImage src={Img2} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className={clsx(styles.column, styles.centerColumn)}>
                    <div className={styles.columnInner}>
                      <div className={styles.item}>
                        <MyImage src={Img3} alt="" />
                      </div>
                      <div className={styles.item}>
                        {/* <img src="img/video-preview.jpg" alt="" /> */}
                      </div>
                      <div className={styles.item}>
                        <MyImage src={Img4} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.columnInner}>
                      <div className={styles.item}>
                        <MyImage src={Img5} alt="" />
                      </div>
                      <div className={styles.item}>
                        <MyImage src={Img6} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
