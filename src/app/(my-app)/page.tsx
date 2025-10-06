import {
  WelcomeSection,
  CitySection,
  ObjectSection,
  LocationSection,
  InvestSection,
  RelaxSection,
  CultureSection,
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
        {/* <InvestSection /> */}
        {/* <RelaxSection /> */}
        <CultureSection />
      </main>
      <InterstroyLogo />
    </>
  )
}
