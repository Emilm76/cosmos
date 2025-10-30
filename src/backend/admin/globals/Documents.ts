import type { GlobalConfig } from 'payload'

export const DocumentsGlobal: GlobalConfig = {
  slug: 'documents',
  label: 'Документы',
  fields: [
    {
      name: 'documents',
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
}
