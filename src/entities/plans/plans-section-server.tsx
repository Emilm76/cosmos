import { getPlansList } from './plan'
import { PlansSection } from './plans'

export async function PlansSectionServer() {
  const plansList = await getPlansList()

  return <PlansSection plans={plansList || []} />
}
