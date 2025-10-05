import {
  WelcomeSection,
  CitySection,
  ObjectSection,
  LocationSection,
  InvestSection,
  RelaxSection,
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
        <RelaxSection />
      </main>
      <InterstroyLogo />
    </>
  )
}
