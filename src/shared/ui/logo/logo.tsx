import styles from './logo.module.scss'
import InterstroyLogoImg from '@/images/interstroy-logo.png'
import Image from 'next/image'

// TODO: изменять цвет логотипа, в зависимости от того, над каким блоком он находится

export function InterstroyLogo() {
  return <Image src={InterstroyLogoImg} className={styles.logo} alt="" />
}
