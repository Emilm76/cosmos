import { Gallery } from './gallery'
import { getGalleryList } from './gallery-image'

export async function GalleryServer() {
  const imagesList = await getGalleryList()

  return <Gallery images={imagesList} />
}
