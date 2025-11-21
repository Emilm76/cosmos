import { PlansClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Plan } from '@/admin/payload-types'

export async function PlansSection() {
  const plansData: Plan = await getCachedGlobal('plans', 2)()

  return <PlansClient data={plansData} />
}
