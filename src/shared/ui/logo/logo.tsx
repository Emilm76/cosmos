import styles from './logo.module.scss'
import { InterstroyLogoIcon } from '../icons/interstroy-logo'

// TODO: изменять цвет логотипа, в зависимости от того, над каким блоком он находится

export function InterstroyLogo() {
  return <InterstroyLogoIcon className={styles.logo} />
}
