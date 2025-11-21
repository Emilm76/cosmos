import type { GlobalConfig } from 'payload'
import { revalidateDocuments } from './hooks/revalidateDocuments'

export const DocumentsGlobal: GlobalConfig = {
  slug: 'documents',
  label: 'Документы',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'files',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: { date: { displayFormat: 'dd.MM.yyyy' } },
        },
        {
          name: 'type',
          type: 'radio',
          admin: {
            layout: 'horizontal',
            width: '50%',
          },
          defaultValue: 'project',
          options: [
            {
              label: 'Проектная документация',
              value: 'project',
            },
            {
              label: 'Разрешительная документация',
              value: 'allow',
            },
          ],
        },
        { name: 'file', type: 'upload', relationTo: 'files', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateDocuments],
  },
}
