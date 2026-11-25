/**
 * Film and photography used across the site.
 *
 * To change footage, replace the files in /public/videos (keep the names), or point an entry
 * here at a new file. Every film needs a wide (16:9) and a tall (9:16) version plus a still
 * frame for each, which is what loads first and what shows when motion is turned off.
 */
export interface FilmSource {
  wide: string
  tall: string
  posterWide: string
  posterTall: string
}

export const FILMS = {
  /** Home page opening: daylight. */
  hero: { wide: '/videos/hero-wide.mp4', tall: '/videos/hero-tall.mp4', posterWide: '/videos/hero-wide.jpg', posterTall: '/videos/hero-tall.jpg' },
  /** Closing frame above the footer: the same shore in evening light. */
  closing: { wide: '/videos/dusk-wide.mp4', tall: '/videos/dusk-tall.mp4', posterWide: '/videos/dusk-wide.jpg', posterTall: '/videos/dusk-tall.jpg' },
} satisfies Record<string, FilmSource>

/** A photograph with its depth map (white = near). The depth map drives the parallax. */
export interface DepthImage {
  src: string
  depth: string
  alt: string
}

/** One photograph per discipline, all cropped 5:4. */
export const CHAPTER_MEDIA: Record<string, DepthImage> = {
  annuities: { src: '/media/chapters/annuities.jpg', depth: '/media/chapters/annuities-depth.jpg', alt: 'A retired couple laughing with their advisor across a table' },
  'life-insurance': { src: '/media/chapters/life-insurance.jpg', depth: '/media/chapters/life-insurance-depth.jpg', alt: 'New parents holding their baby' },
  'care-planning': { src: '/media/chapters/care-planning.jpg', depth: '/media/chapters/care-planning-depth.jpg', alt: 'A caregiver helping an older man up from his chair' },
  'medicare-planning': { src: '/media/chapters/medicare-planning.jpg', depth: '/media/chapters/medicare-planning-depth.jpg', alt: 'A nurse with an older patient' },
  'disability-income': { src: '/media/chapters/disability-income.jpg', depth: '/media/chapters/disability-income-depth.jpg', alt: 'Two colleagues talking at a desk' },
}

/** Depth map for a photograph in /public/media, if one was generated for it. */
const WITH_DEPTH = new Set(['family', 'retirement', 'medicare', 'care', 'professional', 'advisors', 'team-meeting', 'health', 'family-advisor', 'team', 'atrium', 'desk', 'knot'])
export function depthFor(src: string): string | undefined {
  const m = /^\/media\/([a-z-]+)\.jpg$/.exec(src)
  return m && WITH_DEPTH.has(m[1]) ? `/media/depth/${m[1]}.jpg` : undefined
}

/**
 * The 800px copy of a photograph in /public/media, for cards and other small frames. The site
 * serves images exactly as stored (next.config: images.unoptimized), so the right size has to be
 * asked for by name.
 */
export function small(src: string): string {
  return /^\/media\/.+\.jpg$/.test(src) && !src.endsWith('-800.jpg') && !src.includes('/depth/') && !src.includes('/avatars/') ? src.replace(/\.jpg$/, '-800.jpg') : src
}
