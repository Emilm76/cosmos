'use server'
import { Media, Plan as PayloadPlan } from '@/backend/admin/payload-types'
import { getAppPayload } from '@/shared/payload'
import { Plan } from '../domain/plan'

export const getPlansList = async () => {
  const payload = await getAppPayload()
  const plans = await payload.find({
    collection: 'plans',
    depth: 1,
    pagination: false,
  })
  return plans.docs.map(mapPlan)
}

function mapPlan(plan: PayloadPlan): Plan {
  return {
    id: plan.id,
    name: plan.name,
    rooms: plan.rooms,
    square: plan.square,
    floor: plan.floor,
    roomHeight: plan.roomHeight,
    view: plan.view,
    pay: (plan.pay ?? []).map((tag) => tag),
    posterUrl: mapMedia(plan.poster),
  }
}

function mapMedia(media: number | Media): string {
  if (typeof media === 'number') {
    return 'https://via.placeholder.com/150'
  }
  return media.url || ''
}
