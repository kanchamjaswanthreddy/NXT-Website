export interface SubProduct { name: string; summary: string }
export interface Solution {
  slug: string
  index: string
  title: string
  short: string
  headline: string
  intro: string
  image: string
  sub: SubProduct[]
  fit: string[]
  process: string[]
}

export const solutions: Solution[] = [
  {
    slug: 'annuities', index: 'I', title: 'Annuities', short: 'Guaranteed income you cannot outlive.',
    headline: 'Turn savings into income that arrives every month, for life.',
    intro: 'An annuity converts part of what you have saved into a contractual promise from an insurance company: a rate you can count on, principal that is protected from market losses, or a paycheck that continues as long as you do. We compare contracts from the highest-rated carriers and explain every term before you sign one.',
    image: '/images/retirement.png',
    sub: [
      { name: 'Fixed annuities', summary: 'A guaranteed interest rate for a set term, similar to a CD but tax-deferred.' },
      { name: 'Multi-year guaranteed (MYGA)', summary: 'Lock a fixed rate for three to ten years with full principal protection.' },
      { name: 'Fixed indexed annuities', summary: 'Growth linked to a market index with a floor that protects you from losses.' },
      { name: 'Income riders', summary: 'Add a guaranteed lifetime withdrawal benefit that pays whether the account balance is up or down.' },
    ],
    fit: ['You are within ten years of retirement and want a floor under part of your savings', 'You want a predictable income stream alongside Social Security', 'You have money in a CD or money market and want tax deferral and a better rate'],
    process: ['We review your income needs, timeline and existing accounts', 'We compare rates, caps and rider costs across carriers side by side', 'You choose; we handle the application, transfer and delivery'],
  },
  {
    slug: 'life-insurance', index: 'II', title: 'Life Insurance', short: 'Protection for the people who depend on you.',
    headline: 'The right amount, from the right carrier, at a price that fits.',
    intro: 'Life insurance replaces your income, clears your mortgage and funds your children\'s education if you are not there to do it. Some policies also build cash value you can use while you are alive. We place term, permanent and indexed policies with carriers rated A or better and help you size coverage honestly, not by rule of thumb.',
    image: '/images/family.png',
    sub: [
      { name: 'Term life', summary: 'Affordable coverage for 10, 20 or 30 years, the years your family relies on your income most.' },
      { name: 'Whole life', summary: 'Permanent protection with guaranteed premiums, guaranteed cash value and dividends.' },
      { name: 'Indexed universal life', summary: 'Flexible permanent coverage with cash value linked to a market index and downside protection.' },
      { name: 'Final expense', summary: 'Simplified-issue whole life that covers funeral and end-of-life costs, no exam required.' },
    ],
    fit: ['You have a mortgage, young children or a spouse who depends on your income', 'You want a tax-advantaged place to build cash value', 'You want to leave a legacy or cover estate costs for your heirs'],
    process: ['We calculate what your family would actually need using the DIME method', 'We shop carriers for your health profile and preferred policy type', 'We manage underwriting and deliver the policy'],
  },
  {
    slug: 'care-planning', index: 'III', title: 'Care Planning', short: 'A plan for long-term care that protects your savings.',
    headline: 'Seven in ten of us will need care. Plan for it while you can still choose how.',
    intro: 'Long-term care (help with daily living at home, in assisted living or in a nursing facility) is not covered by Medicare and can cost more than $100,000 a year. Care planning puts a funded plan in place so the decision is yours, your family is not the default caregiver and your retirement savings stay intact.',
    image: '/images/care.png',
    sub: [
      { name: 'Traditional long-term care', summary: 'Stand-alone coverage that pays a daily or monthly benefit for qualified care.' },
      { name: 'Hybrid life and LTC', summary: 'Life insurance with a long-term care benefit; if care is never needed, your heirs receive the death benefit.' },
      { name: 'LTC annuities', summary: 'An annuity that multiplies its value when used for qualified care, often with simplified underwriting.' },
    ],
    fit: ['You are in your fifties or sixties and in reasonably good health', 'You want to protect a spouse or children from becoming full-time caregivers', 'You have assets you would rather not spend down to qualify for Medicaid'],
    process: ['We estimate care costs in your area and your likely timeline', 'We compare traditional, hybrid and annuity-based designs', 'We place coverage while your health still qualifies you for the best rates'],
  },
  {
    slug: 'medicare-planning', index: 'IV', title: 'Medicare Planning', short: 'Coverage that fits your doctors, prescriptions and budget.',
    headline: 'Medicare has a hundred moving parts. You need one person who knows them all.',
    intro: 'Turning 65 opens a seven-month window with decisions that follow you for years: Original Medicare with a Supplement, or a Medicare Advantage plan; which Part D drug plan; whether to delay Part B. We review your doctors, medications and travel plans and compare every plan available in your county, at no cost to you.',
    image: '/images/medicare.png',
    sub: [
      { name: 'Medicare Supplement (Medigap)', summary: 'Fills the gaps in Original Medicare (deductibles, coinsurance) and works with any doctor who takes Medicare.' },
      { name: 'Medicare Advantage (Part C)', summary: 'All-in-one plans from private insurers, often with drug, dental and vision coverage and a $0 premium.' },
      { name: 'Part D prescription plans', summary: 'Stand-alone drug coverage matched to the medications you actually take.' },
    ],
    fit: ['You are turning 65 in the next six months', 'You are retiring and leaving employer coverage', 'Your current plan no longer covers your doctors or prescriptions'],
    process: ['We map your doctors, prescriptions and pharmacies', 'We compare every Supplement, Advantage and Part D plan in your area', 'We enroll you and review your plan every Annual Enrollment Period'],
  },
  {
    slug: 'disability-income', index: 'V', title: 'Disability Income', short: 'Your paycheck, protected.',
    headline: 'Your ability to earn is your largest asset. Insure it like one.',
    intro: 'A serious illness or injury is far more likely to interrupt your career than to end your life, and the average long-term disability lasts nearly three years. Disability income insurance replaces a portion of your paycheck, typically 60 percent, so the mortgage, tuition and retirement contributions keep going while you recover.',
    image: '/images/professional.png',
    sub: [
      { name: 'Individual disability income', summary: 'Portable, own-occupation coverage that stays with you between jobs and tops up group benefits.' },
      { name: 'Business overhead expense', summary: 'Keeps rent, payroll and loan payments covered if a business owner cannot work.' },
      { name: 'Key person and buy-sell funding', summary: 'Protects a practice or partnership when a principal becomes disabled.' },
    ],
    fit: ['You are a physician, attorney, owner or specialist whose income depends on your skills', 'Your employer plan covers less than 60 percent of pay, or is taxable', 'You are self-employed with no group coverage'],
    process: ['We assess your income, occupation class and existing group benefits', 'We compare definitions of disability, benefit periods and riders across carriers', 'We manage financial and medical underwriting to bind coverage'],
  },
]

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)
