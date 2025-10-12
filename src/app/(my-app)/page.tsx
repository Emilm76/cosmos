import {
  WelcomeSection,
  CitySection,
  ObjectSection,
  LocationSection,
  RelaxSection,
  HorizontalSection,
  VideoSection,
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
        <LocationSection />

        {/* Комфорт */}
        <RelaxSection />
        <HorizontalSection />
        <VideoSection />

        {/* Выбор квартир */}
        <PlansSection />
      </main>
      <InterstroyLogo />
    </>
  )
}
