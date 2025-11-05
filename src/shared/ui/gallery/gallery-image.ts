'use server'
import { getAppPayload } from '@/shared/payload'
import { Media, Image as PayloadImage } from '@/admin/payload-types'

export type GalleryImage = {
  id: number
  url: string
  alt: string | null
}

export const getGalleryList = async () => {
  const payload = await getAppPayload()
  const gallery = await payload.findGlobal({
    slug: 'images',
    depth: 1,
  })
  return (gallery.images ?? []).map(mapGallery)
}

function mapGallery(image: NonNullable<PayloadImage['images']>[number]): GalleryImage {
  const media = image.image
  return {
    id: typeof media === 'number' ? media : media.id,
    url: mapMedia(media),
    alt: typeof media === 'number' ? null : (media.alt ?? null),
  }
}

function mapMedia(media: number | Media): string {
  if (typeof media === 'number') {
    return 'https://via.placeholder.com/150'
  }
  return media.url || ''
}
