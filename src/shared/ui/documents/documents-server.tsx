import { Documents } from '@/shared'
import { getDocumentList } from './document'

export async function DocumentsServer() {
  const documentsList = await getDocumentList()

  return <Documents documents={documentsList} />
}
