import type { GlobalConfig } from 'payload'

import { revalidatePlans } from './hooks/revalidatePlans'

export const PlansGlobal: GlobalConfig = {
  slug: 'plans',
  label: 'Планировки',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'plansSlider',
      type: 'array',
      label: 'Слайдер',
      fields: [
        {
          name: 'plan',
          type: 'relationship',
          relationTo: 'floors',
          required: true,
          unique: true,
          label: 'Планировка',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePlans],
  },
}
