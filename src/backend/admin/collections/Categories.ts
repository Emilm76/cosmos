import type { CollectionConfig } from "payload"

export const CategoriesCollection: CollectionConfig = {
  slug: "categories",
  fields: [{ type: "text", name: "name", required: true }],
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
  },
}
