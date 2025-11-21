import type { CollectionConfig } from 'payload'

export const FloorsCollection: CollectionConfig = {
  slug: 'floors',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: { placeholder: 'Тип 1', width: '33.3%' },
          label: 'Название',
        },
        {
          name: 'rooms',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
          admin: { step: 1, placeholder: '1', width: '33.3%' },
          label: 'Количество комнат',
        },
        {
          name: 'square',
          type: 'number',
          min: 1,
          max: 999,
          required: true,
          admin: { step: 0.1, placeholder: '33', width: '33.3%' },
          label: 'Площадь (м²)',
        },
        {
          name: 'floor',
          type: 'number',
          min: 1,
          max: 10,
          required: true,
          admin: { step: 1, placeholder: '4', width: '50%' },
          label: 'Этаж',
        },
        {
          name: 'roomHeight',
          type: 'number',
          min: 1,
          max: 10,
          required: true,
          admin: { step: 0.1, placeholder: '3.2', width: '50%' },
          label: 'Высота потолков (м)',
        },
        {
          name: 'view',
          type: 'text',
          defaultValue: 'На море',
          maxLength: 30,
          required: true,
          admin: { placeholder: 'На море', width: '50%' },
          label: 'Вид из окна',
        },
        {
          name: 'pay',
          type: 'text',
          hasMany: true,
          admin: { placeholder: 'Введите значение и нажмите Enter', width: '50%' },
          label: 'Доступные способы оплаты',
        },
      ],
    },

    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Изображение',
    },
  ],
  admin: {
    defaultColumns: ['name', 'poster', 'rooms', 'square'],
    useAsTitle: 'name',
  },
}
