import { Gallery } from '@/shared'
import { getGalleryList } from '../repository/gallery'

export async function GalleryServer() {
  const galleryList = await getGalleryList()

  return <Gallery images={galleryList} />
}
