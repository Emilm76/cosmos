import { WelcomeSection } from '@/entities'
import { Header } from '@/shared'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <WelcomeSection />
      </main>
      <footer></footer>
    </>
  )
}
