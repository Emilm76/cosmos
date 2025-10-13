import { RelaxSection, HorizontalSection, VideoSection } from '@/entities'
import { SectionPreloader } from '@/shared'

export default function Page() {
  return (
    <SectionPreloader nextUrl="apartments">
      <RelaxSection />
      <HorizontalSection />
      <VideoSection />
    </SectionPreloader>
  )
}
