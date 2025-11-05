'use server'
import { getAppPayload } from '@/shared/payload'
import { File, Document as PayloadDocument } from '@/admin/payload-types'

export type Document = {
  id: number
  name: string
  date: string
  url: string
  type: 1 | 2
}

export const getDocumentList = async () => {
  const payload = await getAppPayload()
  const gallery = await payload.findGlobal({
    slug: 'documents',
    depth: 1,
  })
  return (gallery.documents ?? []).map(mapDocument)
}

function mapDocument(document: NonNullable<PayloadDocument['documents']>[number]): Document {
  return {
    id: Number(document.id ?? 0),
    name: document.name,
    date: document.date,
    url: mapUrl(document.file),
    type: mapType(document.type),
  }
}

function mapUrl(file: number | File): string {
  if (typeof file === 'number') {
    return 'https://via.placeholder.com/150'
  }
  return file.url || ''
}

function mapType(type: NonNullable<PayloadDocument['documents']>[number]['type']): 1 | 2 {
  if (type === 'allow') return 2
  return 1
}
