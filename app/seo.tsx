import type { Metadata } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
}

type PageMetadataProps = PageSEOProps &
  Omit<Metadata, 'title' | 'description' | 'openGraph' | 'twitter'>

export function genPageMetadata({
  title,
  description,
  image,
  ...rest
}: PageMetadataProps): Metadata {
  return {
    title,
    description: description || SITE_METADATA.description,
    openGraph: {
      title: `${title} | ${SITE_METADATA.title}`,
      description: description || SITE_METADATA.description,
      url: './',
      siteName: SITE_METADATA.title,
      //images: image ? [image] : [SITE_METADATA.socialBanner],
      images: image ? [image] : [], // 修改这里：空数组而不是默认图片
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${SITE_METADATA.title}`,
      card: 'summary_large_image',
      //images: image ? [image] : [SITE_METADATA.socialBanner],
      images: image ? [image] : [], // 修改这里：空数组而不是默认图片
    },
    ...rest,
  }
}
