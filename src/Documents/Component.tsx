import { DocumentsClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Document } from '@/admin/payload-types'

export async function Documents() {
  const documentsData: Document = await getCachedGlobal('documents', 1)()

  return <DocumentsClient data={documentsData} />
}
