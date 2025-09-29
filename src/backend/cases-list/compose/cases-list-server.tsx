import { getCasesList } from "../repository/cases"
import { getCategoriesList } from "../repository/categories"
import { CasesList } from "./cases-list"

export async function CasesListServer({
  variant = "1",
}: {
  variant?: "1" | "2" | "3"
}) {
  const casesList = await getCasesList()
  const categoriesList = await getCategoriesList()

  return (
    <CasesList
      cases={casesList}
      categories={categoriesList}
      variant={variant}
    />
  )
}
