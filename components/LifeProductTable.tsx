import { Reveal } from '@/components/motion'

const PRODUCT_TYPES = [
  {
    title: 'Term Life',
    description: 'Affordable coverage for a set period — 10, 20 or 30 years.',
    carriers: [
      'Banner Life', 'Protective', 'Prudential', 'John Hancock',
      'Lincoln Financial', 'Transamerica', 'Mutual of Omaha',
      'Nationwide', 'Securian', 'MassMutual', 'Guardian',
      'Principal', 'Equitable', 'Symetra', 'American National',
      'Corebridge', 'Foresters', 'Americo', 'Sagicor',
    ],
  },
  {
    title: 'Whole Life',
    description: 'Permanent coverage with guaranteed cash value growth.',
    carriers: [
      'MassMutual', 'Guardian', 'Penn Mutual', 'Prudential',
      'John Hancock', 'Nationwide', 'Mutual of Omaha',
      'Foresters', 'American National', 'Kansas City Life',
      'Principal', 'Securian', 'Transamerica', 'Americo',
    ],
  },
  {
    title: 'IUL',
    description: 'Cash value linked to a market index with downside protection.',
    carriers: [
      'Allianz', 'North American', 'Pacific Life', 'Lincoln Financial',
      'Nationwide', 'John Hancock', 'Protective', 'Corebridge',
      'Penn Mutual', 'Equitable', 'Transamerica', 'Symetra',
      'F&G', 'Global Atlantic', 'American National', 'Americo',
      'Brighthouse', 'Prudential',
    ],
  },
  {
    title: 'Final Expense',
    description: 'Smaller whole life policies designed to cover end-of-life costs.',
    carriers: [
      'Mutual of Omaha', 'Transamerica', 'Foresters', 'Americo',
      'Globe Life', 'Colonial Penn', 'Sagicor', 'American National',
    ],
  },
]

export default function LifeProductTable() {
  return (
    <section className="section bg-stone">
      <div className="container">
        <Reveal className="mb-12 max-w-[700px]">
          <p className="label-sm mb-5">Life insurance by product type</p>
          <h2 className="display">Which carriers offer what.</h2>
          <p className="lead mt-5 text-ink-soft">Our life insurance partners, organized by the four main policy types. Many carriers offer more than one.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_TYPES.map((type) => (
              <div key={type.title} className="card rounded-[20px] p-6">
                <h3 className="font-display text-xl font-semibold text-navy">{type.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{type.description}</p>
                <ul className="mt-4 space-y-2 border-t border-platinum pt-4">
                  {type.carriers.map((name) => (
                    <li key={name} className="flex items-center gap-2 text-[14px] text-ink">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {name}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-ink-soft">{type.carriers.length} carriers</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
