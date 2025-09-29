"use server"
import {
  Media,
  Case as PayloadCase,
  Category,
} from "@/backend/admin/payload-types"
import { getAppPayload } from "@/shared/payload"
import { Case } from "../domain/case"

export const getCasesList = async () => {
  const payload = await getAppPayload()
  const cases = await payload.find({
    collection: "cases",
    depth: 1,
    pagination: false,
  })
  return cases.docs.map(mapCase)
}

function mapCase(caseItem: PayloadCase): Case {
  return {
    id: caseItem.id,
    title: caseItem.name,
    modalTitle: caseItem.modalName,
    description: caseItem.description || null,
    url: caseItem.url || null,
    tags: (caseItem.tags ?? []).map((tag) => tag.name),
    posterPath: mapMedia(caseItem.poster),
    categories: caseItem.categories.map(
      (category) => (category.value as Category).name,
    ),
  }
}

function mapMedia(media: number | Media): string {
  if (typeof media === "number") {
    return "https://via.placeholder.com/150"
  }
  return media.url || ""
}
