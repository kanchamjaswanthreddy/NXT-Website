'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, type Article } from '@/lib/nxt-life'

export default function NxtLifeFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<string>('All')

  const filtered = active === 'All' ? articles : articles.filter((a) => a.category === active)

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <p className="eyebrow mr-4">Browse</p>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? 'border-navy bg-navy text-white shadow-md shadow-navy/20'
                  : 'border-platinum bg-white text-ink hover:border-navy/30 hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/nxt-life/${article.slug}`}
                className="card card-hover group flex h-full flex-col overflow-hidden rounded-[20px]"
              >
                <div className="relative aspect-[16/10] bg-stone">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ filter: 'saturate(0.85)' }}
                  />
                  <div className="absolute left-4 top-4">
                    <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mono text-xs text-gold">
                    {article.date} · {article.readTime}
                  </p>
                  <h3 className="mt-3 text-lg font-display font-bold leading-snug text-navy group-hover:text-command">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {article.excerpt}
                  </p>
                  <span className="link mt-4 text-sm">
                    Read more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-ink-soft">
            No articles in this category yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
