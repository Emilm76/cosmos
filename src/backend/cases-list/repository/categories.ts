"use server"
import { Category as PayloadCategories } from "@/backend/admin/payload-types"
import { getAppPayload } from "@/shared/payload"
import { Category } from "../domain/category"

export const getCategoriesList = async () => {
  const payload = await getAppPayload()
  const cases = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
  })
  return cases.docs.map(mapCategory)
}

function mapCategory(category: PayloadCategories): Category {
  return category.name
}
