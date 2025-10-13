import { CitySection, ObjectSection, LocationSection } from '@/entities'
import { SectionPreloader } from '@/shared'

export default function Page() {
  return (
    <SectionPreloader nextUrl="/comfort">
      <CitySection />
      <ObjectSection />
      <LocationSection />
    </SectionPreloader>
  )
}
