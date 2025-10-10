import {
  WelcomeSection,
  CitySection,
  ObjectSection,
  LocationSection,
  InvestSection,
  RelaxSection,
  CultureSection,
  HorizontalSection,
  VideoSection,
  FeaturesSection,
  PlansSection,
} from '@/entities'
import { Header, InterstroyLogo } from '@/shared'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Концепция */}
        <WelcomeSection />

        {/* Локация */}
        <CitySection />
        <ObjectSection />
        {/* <LocationSection /> */}
        {/* <InvestSection /> */}

        {/* Комфорт */}
        {/* <RelaxSection /> */}
        {/* <CultureSection /> */}
        {/* <HorizontalSection /> */}
        {/* <VideoSection /> */}
        {/* <FeaturesSection /> */}

        {/* Выбор квартир */}
        {/* <PlansSection /> */}
      </main>
      <InterstroyLogo />
    </>
  )
}
