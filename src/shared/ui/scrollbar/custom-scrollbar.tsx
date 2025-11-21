'use client'
import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './scrollbar.module.scss'
import { useScrollbar } from '@/shared/model/use-scrollbar'

export function CustomScrollbar({
  children,
  isReady,
  scrollbarClassName,
  contentClassName,
}: {
  children: ReactNode
  isReady: boolean
  scrollbarClassName?: string
  contentClassName?: string
}) {
  const { scrollRef, thumbStyle, isShow } = useScrollbar(isReady)

  return (
    <>
      <div className={clsx(styles.content, contentClassName, 'hide-scroll')} ref={scrollRef}>
        {children}
      </div>
      <div className={clsx(styles.scrollbar, scrollbarClassName, isShow && styles.show)}>
        <div className={styles.scrollThumb} style={thumbStyle}></div>
      </div>
    </>
  )
}
