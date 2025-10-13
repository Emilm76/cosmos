import { WelcomeSection } from '@/entities'
import { SectionPreloader } from '@/shared'

export default function Home() {
  return (
    <SectionPreloader nextUrl="/location">
      <WelcomeSection />
    </SectionPreloader>
  )
}
