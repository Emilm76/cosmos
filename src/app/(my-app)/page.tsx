import {
  WelcomeSection,
  CitySection,
  ObjectSection,
  LocationSection,
  InvestSection,
} from '@/entities'
import { Header, InterstroyLogo } from '@/shared'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* <WelcomeSection /> */}
        {/* <CitySection /> */}
        {/* <ObjectSection /> */}
        {/* <LocationSection /> */}
        <InvestSection />
      </main>
      <InterstroyLogo />
    </>
  )
}
