import styles from './welcome.module.scss'

export function WelcomeSection() {
  return (
    <section className={styles.section}>
      <div className="content">
        <div className={styles.curtain}>
          <div className={styles.curtainInner}>
            <div className={styles.logoWrapper}>
              <h1 className="subtitle">Эксклюзивный апарт-отель на первой береговой линии</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
