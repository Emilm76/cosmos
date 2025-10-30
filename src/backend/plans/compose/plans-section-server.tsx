import { PlansSection } from '@/entities'
import { getPlansList } from '../repository/plans'

export async function PlansSectionServer() {
  const plansList = await getPlansList()

  return <PlansSection plans={plansList} />
}
