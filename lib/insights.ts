export type Block = { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'ul'; items: string[] } | { type: 'callout'; text: string }
export interface Post { slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; body: Block[] }

export const posts: Post[] = [
  { slug: 'how-much-guaranteed-income-do-you-need', title: 'How much of your retirement income should be guaranteed?', excerpt: 'Social Security covers part of the essentials. An annuity can cover the rest, so market swings never touch the bills that have to be paid.', category: 'Annuities', date: 'August 12, 2026', readTime: '6 min', image: '/images/retirement.png',
    body: [
      { type: 'p', text: 'Start with one number: what it costs to run your household each month once you stop working. Housing, food, utilities, insurance, healthcare premiums. That is your essential floor, and it should not depend on how the market did last quarter.' },
      { type: 'h2', text: 'The floor-and-upside approach' },
      { type: 'p', text: 'Add up your guaranteed sources (Social Security, any pension) and compare them to your essential floor. The gap is what an income annuity or a fixed indexed annuity with an income rider is designed to close. Everything above the floor stays invested for growth and flexibility.' },
      { type: 'ul', items: ['Essentials covered by guarantees', 'Discretionary spending funded by investments', 'A cash reserve so you never sell in a downturn'] },
      { type: 'callout', text: 'Guarantee the bills. Invest the rest.' },
      { type: 'p', text: 'How large the guaranteed slice should be depends on your other assets, your health and how much volatility you can live with. An advisor can model it in an hour.' },
    ] },
  { slug: 'term-vs-permanent-life-insurance', title: 'Term or permanent: which life insurance actually fits your life?', excerpt: 'Term is cheap and simple. Permanent builds value and never expires. The right answer usually depends on what the money has to do, and for how long.', category: 'Life insurance', date: 'July 28, 2026', readTime: '7 min', image: '/images/family.png',
    body: [
      { type: 'p', text: 'The most common mistake we see is not choosing the wrong type. It is choosing too little of either. Before comparing products, size the need: income to replace, debts to clear, education to fund, final expenses.' },
      { type: 'h2', text: 'When term is right' },
      { type: 'p', text: 'A 20- or 30-year term policy is the most efficient way to cover a temporary need: the years until the mortgage is paid and the children are independent. Premiums are fixed, and the coverage does exactly one job.' },
      { type: 'h2', text: 'When permanent is right' },
      { type: 'p', text: 'Whole life and indexed universal life cover needs that never go away: estate liquidity, a legacy, a special-needs dependent, or a tax-advantaged place to build cash value. They cost more because they are designed to pay out.' },
      { type: 'callout', text: 'Match the length of the policy to the length of the need.' },
    ] },
  { slug: 'what-medicare-does-not-cover', title: 'Five things Medicare will not pay for, and how to plan for them', excerpt: 'Medicare is excellent at what it covers. The surprises come from what it does not: long-term care, most dental, hearing, vision and overseas care.', category: 'Medicare planning', date: 'July 9, 2026', readTime: '5 min', image: '/images/advisors.png',
    body: [
      { type: 'p', text: 'Original Medicare covers hospital stays and doctor visits with deductibles and 20 percent coinsurance, and no cap on what you can owe in a year. Everything else on this list needs a plan.' },
      { type: 'ul', items: ['Long-term custodial care, the largest uncovered risk', 'Routine dental, vision and hearing', 'Prescription drugs without a Part D plan', 'Care while traveling outside the United States', 'The 20 percent coinsurance without a Supplement'] },
      { type: 'h2', text: 'Closing the gaps' },
      { type: 'p', text: 'A Medicare Supplement plus a Part D plan closes the coinsurance and drug gaps for people who want any doctor. A Medicare Advantage plan bundles extras for people comfortable with a network. Long-term care needs its own funded plan either way.' },
    ] },
  { slug: 'hybrid-long-term-care-explained', title: 'Hybrid long-term care: coverage you use either way', excerpt: 'Traditional LTC premiums can rise and the money is gone if you never need care. Hybrid policies fixed both problems, which is why they now dominate the market.', category: 'Care planning', date: 'June 20, 2026', readTime: '6 min', image: '/images/care.png',
    body: [
      { type: 'p', text: 'A hybrid policy combines life insurance or an annuity with a long-term care benefit. Need care, and it pays a monthly benefit for years. Never need care, and your beneficiaries receive a death benefit. Premiums are guaranteed never to increase.' },
      { type: 'h2', text: 'How the numbers work' },
      { type: 'p', text: 'A typical design funded with a single premium of $100,000 might provide $300,000 or more in care benefits, a $150,000 death benefit and a return-of-premium option. The leverage comes from the carrier pooling risk across many policyholders.' },
      { type: 'callout', text: 'Your health today determines what you qualify for tomorrow.' },
      { type: 'p', text: 'Underwriting is simpler than traditional LTC but still health-based. The best time to apply is while you are healthy enough that the question is which design, not whether you qualify.' },
    ] },
  { slug: 'disability-insurance-for-professionals', title: 'Why your group disability plan is probably not enough', excerpt: 'Employer plans typically replace 60 percent of base salary, cap the benefit, tax the payout and vanish when you change jobs.', category: 'Disability income', date: 'June 2, 2026', readTime: '5 min', image: '/images/professional.png',
    body: [
      { type: 'p', text: 'Read the definition of disability in your group plan. Many pay only if you cannot work in any occupation after 24 months. An individual own-occupation policy pays if you cannot do your job, even if you could do another.' },
      { type: 'h2', text: 'What an individual policy adds' },
      { type: 'ul', items: ['Own-occupation definition of disability', 'Tax-free benefits when you pay the premium', 'Portability between employers', 'Coverage of bonuses and self-employment income', 'Future increase options as your income grows'] },
      { type: 'p', text: 'For physicians, attorneys, owners and specialists, the individual policy is the foundation and the group plan is the supplement, not the other way around.' },
    ] },
]
