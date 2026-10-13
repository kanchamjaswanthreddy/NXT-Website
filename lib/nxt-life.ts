export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  featured?: boolean
  body: ({ type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'ul'; items: string[] } | { type: 'callout'; text: string })[]
}

export const CATEGORIES = ['All', 'Company News', 'Industry Trends', 'Culture', 'Leadership', 'Innovation'] as const

export const articles: Article[] = [
  {
    slug: 'nxt-expands-to-all-50-states',
    title: 'NXT Financial Group now serves families and advisors in all 50 states',
    excerpt: 'From a single office in Massachusetts to coast-to-coast coverage — how disciplined carrier selection and a people-first culture made national expansion possible.',
    category: 'Company News',
    date: 'October 8, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80',
    featured: true,
    body: [
      { type: 'p', text: 'When NXT Financial Group opened its doors, the goal was never to become the biggest brokerage in the room. It was to become the most trusted. That mission has not changed, but the geography has. As of this month, NXT is licensed and actively writing business in every state in the country.' },
      { type: 'h2', text: 'Growing with intention' },
      { type: 'p', text: 'National expansion was not a sprint. Each new state required carrier contracts, compliance review, and local market knowledge. Rather than outsource that work, NXT built it in-house, ensuring that every family receives the same standard of independent advice regardless of zip code.' },
      { type: 'callout', text: 'Fifty states, one standard: independent advice backed by A-rated carriers.' },
      { type: 'p', text: 'The carrier wall now includes more than 70 top-rated insurance companies across annuities, life, Medicare, disability, care planning, and home and auto. That breadth means advisors can match products to needs instead of fitting needs into products.' },
    ],
  },
  {
    slug: 'future-of-retirement-planning-2027',
    title: 'What the next decade of retirement planning looks like',
    excerpt: 'Interest rates, longevity trends, and digital advice tools are reshaping how Americans prepare for retirement. Here is what advisors and families should watch.',
    category: 'Industry Trends',
    date: 'September 25, 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&q=80',
    body: [
      { type: 'p', text: 'The retirement landscape is shifting faster than most planning models can accommodate. Americans are living longer, working differently, and expecting more transparency from their financial partners. The advisors who thrive in the next decade will be those who treat planning as an ongoing conversation, not a one-time transaction.' },
      { type: 'h2', text: 'Three forces reshaping the industry' },
      { type: 'ul', items: [
        'Longevity risk is becoming the central planning challenge as life expectancy continues to climb',
        'Hybrid income strategies that combine guaranteed and growth assets are replacing all-or-nothing allocations',
        'Digital tools are raising client expectations for real-time visibility and scenario modeling',
      ] },
      { type: 'p', text: 'At NXT, we see these shifts as opportunities. Our advisors already use multi-carrier comparisons, transparent illustrations, and plain-language explanations as the baseline, not the exception.' },
      { type: 'callout', text: 'The future belongs to advisors who educate, not just sell.' },
    ],
  },
  {
    slug: 'building-a-culture-that-stays',
    title: 'Building a company culture that people do not want to leave',
    excerpt: 'In an industry with high turnover, NXT has built something different. It starts with how we define success and who we choose to celebrate.',
    category: 'Culture',
    date: 'September 12, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80',
    body: [
      { type: 'p', text: 'Insurance is not famous for retention. New agents burn out, experienced ones jump ship for higher commissions, and the cycle repeats. NXT Financial Group decided early on that this cycle was a choice, not a given.' },
      { type: 'h2', text: 'What we measure' },
      { type: 'p', text: 'Most agencies track premiums written. We track those too, but we also track client satisfaction, policy persistence, and how many families each advisor serves year over year. The advisors who earn recognition here are the ones whose clients stay.' },
      { type: 'ul', items: [
        'Mentorship pairing for every new advisor in their first 90 days',
        'Weekly roundtables where real cases are discussed openly',
        'A technology stack that removes paperwork so advisors can focus on people',
      ] },
      { type: 'callout', text: 'Culture is not a slide deck. It is what happens when nobody is watching.' },
    ],
  },
  {
    slug: 'insurance-literacy-crisis',
    title: 'America has an insurance literacy problem — and it is costing families',
    excerpt: 'Most Americans cannot explain the difference between term and whole life, or what Medicare Part B actually covers. The cost of that confusion is measured in unprotected families.',
    category: 'Industry Trends',
    date: 'August 30, 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=800&fit=crop&q=80',
    body: [
      { type: 'p', text: 'A recent industry survey found that fewer than one in three Americans can correctly identify what long-term care insurance covers. Nearly half believe Medicare will pay for extended nursing home stays. It will not. This gap between perception and reality leaves millions of families exposed to catastrophic financial risk.' },
      { type: 'h2', text: 'Why clarity matters more than products' },
      { type: 'p', text: 'The solution is not more products. It is better education. When a family understands what a policy does, what it costs, and what it does not cover, they make better decisions. They keep their policies longer. They refer their friends.' },
      { type: 'p', text: 'At NXT, every advisor is trained to explain before they recommend. Our articles, calculators, and planning tools exist for the same reason: an informed client is a protected client.' },
      { type: 'callout', text: 'The best policy is the one the client actually understands.' },
    ],
  },
  {
    slug: 'leadership-lessons-from-the-field',
    title: 'Five leadership lessons learned from twenty years in the field',
    excerpt: 'Our founding team did not start in corner offices. They started knocking on doors. Here is what they carried forward.',
    category: 'Leadership',
    date: 'August 15, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop&q=80',
    body: [
      { type: 'p', text: 'Before there was a brand, a website, or a carrier wall, there were conversations at kitchen tables. The founding team at NXT Financial Group spent years in the field, learning what families actually need versus what the industry assumes they want.' },
      { type: 'h2', text: 'What stuck' },
      { type: 'ul', items: [
        'Listen longer than you speak — the need reveals itself when you stop pitching',
        'Carrier relationships matter, but client relationships matter more',
        'Technology should remove friction, not replace human judgment',
        'Transparency is not a marketing strategy — it is the only sustainable one',
        'The best advisors are teachers first',
      ] },
      { type: 'p', text: 'These are not inspirational posters on a wall. They are operating principles that show up in how we onboard agents, how we structure compensation, and how we choose which carriers to work with.' },
    ],
  },
  {
    slug: 'ai-and-insurance-distribution',
    title: 'How AI is changing insurance distribution without replacing advisors',
    excerpt: 'Artificial intelligence is transforming quoting, underwriting, and compliance. But the human conversation at the center of a financial decision is not going anywhere.',
    category: 'Innovation',
    date: 'July 28, 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
    body: [
      { type: 'p', text: 'The insurance industry has historically been slow to adopt new technology. That is changing rapidly. Carriers are using machine learning for underwriting decisions, agencies are automating compliance workflows, and clients expect instant quotes on their phones.' },
      { type: 'h2', text: 'Where technology helps' },
      { type: 'ul', items: [
        'Multi-carrier quoting in minutes instead of days',
        'Automated compliance checks that reduce errors',
        'Client portals that give policyholders visibility into their coverage',
        'Data-driven recommendations that surface the best-fit products faster',
      ] },
      { type: 'h2', text: 'Where humans are irreplaceable' },
      { type: 'p', text: 'No algorithm can sit across from a widow and explain what her husband\'s policy actually means for her future. No chatbot can read the hesitation in a client\'s voice and know which question to ask next. Technology makes advisors faster. It does not make them unnecessary.' },
      { type: 'callout', text: 'The best technology makes the human conversation better, not shorter.' },
    ],
  },
]
