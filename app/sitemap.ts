import type { MetadataRoute } from 'next'
import { solutions } from '@/lib/solutions'
import { posts } from '@/lib/insights'

const SITE = 'https://www.nxtfinancialgroup.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/carriers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/partner`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/calculators`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/referral`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const solutionPages: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${SITE}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const insightPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/insights/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...solutionPages, ...insightPages]
}
