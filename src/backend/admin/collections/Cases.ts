import type { CollectionConfig } from "payload"

export const CasesCollection: CollectionConfig = {
  slug: "cases",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "modalName", type: "text", required: true },
    { name: "description", type: "text" },
    { name: "url", type: "text" },
    { name: "poster", type: "upload", relationTo: "media", required: true },
    {
      type: "relationship",
      relationTo: ["categories"],
      name: "categories",
      required: true,
      hasMany: true,
    },
    {
      name: "tags",
      type: "array",
      label: "Теги",
      minRows: 1,
      maxRows: 2,
      labels: {
        singular: "Тег",
        plural: "Теги",
      },
      fields: [{ name: "name", type: "text", required: true }],
    },
  ],
  admin: {
    defaultColumns: ["name", "poster", "categories"],
  },
}
