import { Documents } from '@/shared'
import { getDocumentList } from '../repository/document'

export async function DocumentsServer() {
  const documentsList = await getDocumentList()

  return <Documents documents={documentsList} />
}
