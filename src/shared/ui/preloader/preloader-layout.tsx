'use client'
import { LogoWithDescriptor, SpinnerIcon } from '@/shared'
import styles from './preloader-layout.module.scss'

export function PreloaderLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <LogoWithDescriptor className={styles.logo} />
        <SpinnerIcon className={styles.spinner} />
      </div>
    </div>
  )
}
