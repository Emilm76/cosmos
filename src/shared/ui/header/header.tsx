'use client'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import Img from '@/images/burger.jpg'
import { useHeader } from '@/context/header-context'
import { useMediaQuery } from 'react-responsive'
import { usePathname } from 'next/navigation'
import { useCurtainStore, useModalStore, useSectionLoaderStore } from '@/store'
import { PhoneIcon } from '../icons/phone'
import { ArrowLeftIcon } from '../icons/arrow-left'
import { MyLink } from '../link/link'
import { LogoWithDescriptor3 } from '../icons/logo-with-descriptor-3'
import { InterstroyLogo } from '../icons/interstroy-logo'

export function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [isLoadImg, setIsLoadImg] = useState(false)
  const isGalleryOpen = useCurtainStore((s) => s.isGalleryOpen)
  const isDocumentsOpen = useCurtainStore((s) => s.isDocumentsOpen)
  const openGallery = useCurtainStore((s) => s.openGallery)
  const openDocuments = useCurtainStore((s) => s.openDocuments)
  const closeAllCurtains = useCurtainStore((s) => s.closeAll)
  const [showLogo, setShowLogo] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const pathname = usePathname()
  const openModal = useModalStore((s) => s.open)
  const { transparent, footer } = useHeader()
  const setLoadingUrl = useSectionLoaderStore((s) => s.set)
  const lenis = useLenis(
    (lenis) => {
      if (pathname !== '/') return
      setShowLogo(lenis.animatedScroll > 750)
    },
    [pathname],
  )

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

  function handleLinkClick() {
    setIsBurgerOpen(false)
  }
  function handleShowGalleryClick() {
    setIsBurgerOpen(false)
    openGallery()
  }
  function handleShowDocumentsClick() {
    setIsBurgerOpen(false)
    openDocuments()
  }

  function handleBackButtonClick() {
    closeAllCurtains()
  }
  function handleLogoClick() {
    closeAllCurtains()
    setIsBurgerOpen(false)
  }

  useEffect(() => {
    setShowLogo(pathname !== '/')
  }, [pathname, setShowLogo])

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
        <div className="container">
          <div className={styles.containerInner}>
            <div className={clsx(styles.left, footer && styles.transparent)}>
              <button className={styles.phoneBtn} type="button" onClick={openModal}>
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

            <div className={clsx(styles.right, footer && styles.transparent)}>
              <div onClick={handleLinkClick}>
                <MyLink
                  href="/apartments"
                  className={clsx('bullet-link', isMobile && isCurtainOpen && styles.displayNone)}
                >
                  Выбрать планировку
                </MyLink>
              </div>

              <button
                type="button"
                className={clsx(styles.burgerBtn, isBurgerOpen ? styles.close : styles.open)}
                onClick={toggleBurger}
                aria-label="Открыть или закрыть меню"
              ></button>
            </div>

            <div className={clsx(styles.blockWrapper, footer && styles.show)}>
              <a
                href="https://интерстрой.рф/page/politic"
                className={clsx(styles.footerItem, 'bullet-link')}
              >
                Политика обработки персональных данных
              </a>
              <a
                href="https://интерстрой.рф/page/use-terms"
                className={clsx(styles.footerItem, 'bullet-link')}
              >
                Условия пользования сайтом
              </a>
            </div>
          </div>
        </div>

        <div
          className={clsx(styles.logo, (showLogo || isCurtainOpen) && styles.show)}
          onClick={handleLogoClick}
        >
          <MyLink href="/" isPreviousUrl={true}>
            <LogoWithDescriptor3 />
          </MyLink>
        </div>
      </header>

      <div className={clsx(styles.burger, isBurgerOpen && styles.open)}>
        <div className={clsx(styles.burgerWrapper, 'container lenis-prevent')}>
          <div className={styles.burgerInner}>
            <nav>
              <div className={styles.li} onClick={handleLinkClick}>
                <MyLink className={styles.liInner} href="/">
                  <div className={clsx(styles.burgerTitle, 'h2')}>Концепция</div>
                  <div className="green">Пролог</div>
                </MyLink>
              </div>
              <div className={styles.li} onClick={handleLinkClick}>
                <MyLink className={styles.liInner} href="/location">
                  <div className={clsx(styles.burgerTitle, 'h2')}>Локация</div>
                  <div className="green">Глава 1</div>
                </MyLink>
              </div>
              <div className={styles.li} onClick={handleLinkClick}>
                <MyLink className={styles.liInner} href="/comfort">
                  <div className={clsx(styles.burgerTitle, 'h2')}>Комфорт</div>
                  <div className="green">Глава 2</div>
                </MyLink>
              </div>
              <div className={styles.li} onClick={handleLinkClick}>
                <MyLink className={styles.liInner} href="/apartments">
                  <div className={clsx(styles.burgerTitle, 'h2')}>Выбор номеров</div>
                  <div className="green">Глава 3</div>
                </MyLink>
              </div>
            </nav>

            <div className={styles.burgerNav2}>
              <div className={styles.list2}>
                <button
                  className={clsx(
                    'subtitle bullet-link bullet-link--md',
                    isGalleryOpen && 'active',
                  )}
                  onClick={handleShowGalleryClick}
                  type="button"
                >
                  Галерея
                </button>
                {/*<button
                className={clsx(
                  'subtitle bullet-link bullet-link--md',
                  isDocumentsOpen && 'active',
                )}
                onClick={handleShowDocumentsClick}
                type="button"
              >
                Документы
              </button>*/}
                <a
                  href="https://xn--80az8a.xn--d1aqf.xn--p1ai/%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3-%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BA/%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82/66939"
                  target="_blank"
                  className="subtitle bullet-link bullet-link--md"
                >
                  Документы
                </a>
                <a
                  href="/apartments"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsBurgerOpen(false)
                    setLoadingUrl('/apartments', false, true, true)
                  }}
                  className="subtitle bullet-link bullet-link--md"
                >
                  Контакты
                </a>
              </div>
              {isLoadImg && <Image className={styles.burgerImg} src={Img} loading="eager" alt="" />}
            </div>

            <a className={styles.interstroylogo} href="https://интерстрой.рф" target="_blank">
              <InterstroyLogo />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
