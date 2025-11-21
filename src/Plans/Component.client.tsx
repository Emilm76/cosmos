'use client'
import React from 'react'
import type { Plan } from '@/admin/payload-types'
import { PlansSlider } from './PlansSlider'

interface PlansClientProps {
  data: Plan
}

export const PlansClient: React.FC<PlansClientProps> = ({ data }) => {
  return <PlansSlider data={data} />
}
