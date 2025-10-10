'use client'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import Img from '@/images/burger.jpg'
import { useHeader } from '@/context/header-context'
import { Gallery, Documents, ArrowLeftIcon, LogoIcon, PhoneIcon } from '@/shared'
import { useMediaQuery } from 'react-responsive'

export function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [isLoadImg, setIsLoadImg] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const lenis = useLenis()
  const { transparent } = useHeader()

  useEffect(() => {
    if (!lenis) return

    if (isBurgerOpen || isGalleryOpen || isDocumentsOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }

    return () => {
      lenis.start()
    }
  }, [isBurgerOpen, isGalleryOpen, isDocumentsOpen, lenis])

  function toggleBurger() {
    setIsBurgerOpen((lastState) => !lastState)
    if (document.documentElement.clientWidth >= 768 && !isLoadImg) setIsLoadImg(true)
  }

  function handleShowGalleryClick() {
    setIsBurgerOpen(false)
    setIsGalleryOpen(true)
  }
  function handleShowDocumentsClick() {
    setIsBurgerOpen(false)
    setIsDocumentsOpen(true)
  }

  function handleBackButtonClick() {
    if (isGalleryOpen) setIsGalleryOpen(false)
    if (isDocumentsOpen) setIsDocumentsOpen(false)
  }

  const isCurtainOpen = isGalleryOpen || isDocumentsOpen

  return (
    <>
      <header
        className={clsx(
          styles.header,
          isBurgerOpen && styles.open,
          (isBurgerOpen || isDocumentsOpen) && styles.dark,
          transparent && styles.transparent,
        )}
      >
        <div className={clsx(styles.container, 'container')}>
          <div className={styles.left}>
            <button className={styles.phoneBtn} type="button">
              <PhoneIcon />
              <span className="bullet-link">Заказать звонок</span>
            </button>
            <button
              className={clsx(styles.backBtn, !isBurgerOpen && isCurtainOpen && styles.show)}
              onClick={handleBackButtonClick}
              type="button"
            >
              <ArrowLeftIcon />
              <span>Назад</span>
            </button>
          </div>

          <div className={styles.right}>
            <button
              className={clsx('bullet-link', isMobile && isCurtainOpen && styles.displayNone)}
              type="button"
            >
              Выбрать планировку
            </button>
            <button
              type="button"
              className={clsx(styles.burgerBtn, isBurgerOpen ? styles.close : styles.open)}
              onClick={toggleBurger}
              aria-label="Открыть или закрыть меню"
            ></button>
          </div>
        </div>

        <LogoIcon className={clsx(styles.logo, isCurtainOpen && styles.show)} />
      </header>

      <div className={clsx(styles.burger, isBurgerOpen && styles.open)}>
        <div className={clsx(styles.burgerWrapper, 'container lenis-prevent')}>
          <nav>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Концепция</div>
              <div className="green">Пролог</div>
            </a>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Локация</div>
              <div className="green">Глава 1</div>
            </a>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Комфорт</div>
              <div className="green">Глава 2</div>
            </a>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Выбор квартир</div>
              <div className="green">Глава 3</div>
            </a>
          </nav>

          <div className={styles.burgerNav2}>
            <div className={styles.list2}>
              <button
                className={clsx('subtitle bullet-link bullet-link--md', isGalleryOpen && 'active')}
                onClick={handleShowGalleryClick}
                type="button"
              >
                Галерея
              </button>
              <button
                className={clsx(
                  'subtitle bullet-link bullet-link--md',
                  isDocumentsOpen && 'active',
                )}
                onClick={handleShowDocumentsClick}
                type="button"
              >
                Документы
              </button>
            </div>
            {isLoadImg && <Image className={styles.burgerImg} src={Img} loading="eager" alt="" />}
          </div>
        </div>
      </div>

      <Gallery isOpen={isGalleryOpen} />
      <Documents isOpen={isDocumentsOpen} />
    </>
  )
}
