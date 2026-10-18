import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/donna`, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
