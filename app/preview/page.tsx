import Image from 'next/image'
import Link from 'next/link'
import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, CalendarCheck, ChevronRight, HeartHandshake, Home, Sunrise, Users, Wallet, type LucideIcon } from 'lucide-react'
import PvNav from '@/components/pv/Nav'
import PvMotion from '@/components/pv/Motion'
import HeroFilm from '@/components/pv/HeroFilm'
import FootFilm from '@/components/pv/FootFilm'
import Advantages from '@/components/pv/Advantages'
import SolutionTabs from '@/components/pv/SolutionTabs'
import Voices from '@/components/pv/Voices'
import PvFaq from '@/components/pv/Faq'
import { Counter } from '@/components/motion'
import { solutions } from '@/lib/solutions'
import { allCarriers } from '@/lib/carriers'
import { leadership } from '@/lib/team'
import { TESTIMONIALS } from '@/lib/testimonials'
import { QA } from '@/lib/faq'

const v = (vars: Record<string, string | number>) => vars as CSSProperties

const HERO_LINES = ['Income you can’t outlive.', 'Care you can choose.', 'A legacy that lands.']

/** Carriers whose marks read cleanly as one-colour silhouettes over the film. */
const TICKER = ['massmutual', 'prudential', 'transamerica', 'athene', 'john-hancock', 'pacific-life', 'americo', 'humana', 'protective', 'securian', 'foresters', 'unum']
/** Twelve for the diagram, across all five disciplines. */
const NETWORK = ['allianz', 'massmutual', 'prudential', 'transamerica', 'john-hancock', 'pacific-life', 'corebridge', 'guardian', 'humana', 'unitedhealthcare', 'cigna', 'unum']
const bySlug = (list: string[]) => list.map((s) => allCarriers.find((c) => c.slug === s)).filter((c): c is NonNullable<typeof c> => !!c && !!c.logo)

const SITUATIONS: { title: string; slug: string; icon: LucideIcon }[] = [
  { title: 'Retiring within\nten years', slug: 'annuities', icon: Sunrise },
  { title: 'Protecting\na family', slug: 'life-insurance', icon: Users },
  { title: 'Turning 65', slug: 'medicare-planning', icon: CalendarCheck },
  { title: 'Thinking about\nfuture care', slug: 'care-planning', icon: HeartHandshake },
  { title: 'Living on\none paycheck', slug: 'disability-income', icon: Wallet },
  { title: 'Insuring a home\nor a car', slug: 'home-auto', icon: Home },
]

const ADVANTAGES = [
  { title: 'Many carriers, one comparison', text: 'We are independent and hold appointments with many carriers rated A- or better by AM Best. The recommendation is the one that fits.' },
  { title: 'No quota with any of them', text: 'A captive agent recommends from one company’s products and works toward a sales quota. We carry no quota with any carrier.' },
  { title: 'No cost to you', text: 'We are compensated by the carrier that issues your policy or contract. You never pay us a fee, and our compensation does not change the rate you receive.' },
  { title: 'One advisor who stays', text: 'The person who meets you first is the person who places your coverage, reviews it with you every year and picks up the phone when something changes.' },
  { title: 'Licensed in all 50 states', text: 'Our headquarters is in Malden, Massachusetts, and we are licensed to serve clients across the country.' },
]

const SOLUTION_ALT: Record<string, string> = {
  annuities: 'A retired couple laughing with their advisor',
  'life-insurance': 'A family holding hands at the water’s edge',
  'care-planning': 'A caregiver helping an older man from his chair',
  'medicare-planning': 'A nurse caring for an older woman',
  'disability-income': 'Two women going through paperwork at a desk',
  'home-auto': 'A bright office atrium',
}

const STEPS = [
  ['Listen', 'We map your income gap, your health, your family and your timeline before any product comes up.'],
  ['Compare', 'Rates, caps and rider costs from the carriers that fit, side by side.'],
  ['Place', 'You choose. We handle the application, underwriting, transfer and delivery.'],
  ['Review', 'The person who met you first goes through the plan with you every year.'],
]

const STATEMENT: { text: string; href?: string }[] = [
  { text: 'An independent agency for the five decisions that shape retirement:' },
  { text: 'annuities,', href: '/solutions/annuities' },
  { text: 'life insurance,', href: '/solutions/life-insurance' },
  { text: 'care planning,', href: '/solutions/care-planning' },
  { text: 'Medicare', href: '/solutions/medicare-planning' },
  { text: 'and' },
  { text: 'disability income.', href: '/solutions/disability-income' },
  { text: 'We compare A-rated carriers and explain every term before you sign one.' },
]
const STATEMENT_WORDS = STATEMENT.reduce((n, p) => n + p.text.split(' ').length, 0)

/** Smallest to largest, so the columns climb from left to right. */
const NUMBERS = [
  { value: 1, suffix: ' day', label: 'To hear back from us', h: 30 },
  { value: 5, suffix: '', label: 'Disciplines, practiced daily', h: 50 },
  { value: 50, suffix: '', label: 'States licensed', h: 75 },
  { value: 70, suffix: '+', label: 'Carrier partners', h: 100 },
]

const VALUES = [
  { letter: 'P', word: 'Partnership', key: 'Win together or not at all.', text: 'We only succeed when our advisors and clients succeed.' },
  { letter: 'R', word: 'Responsibility', key: 'Especially when no one is watching.', text: 'Do the right thing. Integrity is not a policy. It is a standard.' },
  { letter: 'O', word: 'Ownership', key: 'Advisors own their book, their team and their future.', text: 'The people doing the work keep what they earn.' },
  { letter: 'T', word: 'Transparency', key: 'Never buried in fine print.', text: 'Every fee, every split, every recommendation, explained clearly.' },
  { letter: 'E', word: 'Education', key: 'We teach before we sell.', text: 'An informed client makes the best decision. An educated advisor builds the strongest business.' },
  { letter: 'C', word: 'Commitment', key: 'We show up, fully, every single time.', text: 'To our clients. To our advisors. To the communities we serve.' },
  { letter: 'T', word: 'Trust', key: 'Earned, never assumed.', text: 'Trust is earned through consistency, honesty, and results. Everything we do is designed to deserve it.' },
]

const TEAM_PHOTO: Record<string, string> = {
  'Shiv Thakur': 'shiv-thakur', 'James R. Vigeant': 'james-vigeant', 'Ashish Sood': 'ashish-sood', 'Sandeep Charaya': 'sandeep-charaya',
  'Sony Pradhan': 'sony-pradhan', 'Rigoberto Ayala': 'rigoberto-ayala', 'Alana Malla': 'alana-malla', 'Minakshi Rajbanshi': 'minakshi-rajbanshi',
}
const TEAM = leadership.filter((m) => TEAM_PHOTO[m.name])

const VOICES = ['Bimlesh Yadav', 'Makeshwar Yadav', 'Carmelo Aguilar', 'Pankaj Mandal', 'Andy M. Martinez', 'Rigoberto Ayala Rodas']
  .map((n) => TESTIMONIALS.find((t) => t.name === n)).filter((t): t is NonNullable<typeof t> => !!t)

const COMPANY = [['/about', 'About NXT'], ['/carriers', 'Carrier partners'], ['/nxt-life', 'NXT Life'], ['/insights', 'Insights'], ['/careers', 'Careers'], ['/partner', 'For advisors'], ['/referral', 'Refer a friend'], ['/contact', 'Contact']]
const TOOLS = [['/calculators', 'Calculators'], ['/resources', 'Planning tools'], ['/get-started', 'Get started']]
const SOCIAL = [
  ['https://www.linkedin.com/company/https-nxtfinancialgroup.com-/', 'LinkedIn'],
  ['https://www.instagram.com/nxtfinancialgroup', 'Instagram'],
  ['https://www.facebook.com/people/NXT-Financial-Group/61589938040020/', 'Facebook'],
  ['https://www.youtube.com/@NXTFinancialGroup', 'YouTube'],
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QA.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

/** Without JavaScript: the header stays at the top, the answers are open and every slide is listed. */
const NOSCRIPT = [
  '.pv-nav{position:absolute}',
  '.pv-faq-a{grid-template-rows:1fr}',
  '.pv-sl-head,.pv-voices-who,.pv-film-toggle,.pv-top{display:none}',
  '.pv-sl-stack{display:block}',
  '.pv-sl-stack>li{opacity:1;translate:none;margin-bottom:1.5rem}',
  '.pv-voices-card figcaption{position:static;width:auto;height:auto;clip-path:none;margin-top:.5rem;font-weight:700}',
].join('')

/** Heading text as lines that rise out of a mask, one after another. */
function Lines({ text }: { text: string }) {
  return <>{text.split('\n').map((line, i) => <span key={i} className="pv-ln"><span style={v({ '--i': i })}>{line}</span>{' '}</span>)}</>
}

/**
 * Section opener across the page's two halves: the heading in one, a small label and a few words
 * in the other. On a phone they simply follow each other: label, heading, words.
 */
function SHead({ id, title, label, text, link, flip = false }: { id: string; title: string; label: string; text?: string; link?: [href: string, label: string]; flip?: boolean }) {
  return (
    <header className="pv-shead" data-flip={flip || undefined}>
      <p className="pv-mono pv-label" data-rv="up">{label}</p>
      <h2 id={id} className="pv-h2" data-rv="lines"><Lines text={title} /></h2>
      {text || link ? (
        <div className="pv-shead-text" data-rv="up">
          {text ? <p className="pv-lead">{text}</p> : null}
          {link ? <TextLink href={link[0]}>{link[1]}</TextLink> : null}
        </div>
      ) : null}
    </header>
  )
}

function Btn({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={`pv-btn ${className}`}>{children}</Link>
}
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="pv-link">{children}<i><ArrowRight size={14} /></i></Link>
}

export default function Preview() {
  let word = 0
  const ticker = bySlug(TICKER)
  const network = bySlug(NETWORK)
  const tickerItems = (hidden: boolean) => ticker.map((c) => (
    // eslint-disable-next-line @next/next/no-img-element
    <li key={c.slug} aria-hidden={hidden || undefined}><img src={c.logo} alt={hidden ? '' : c.name} decoding="async" /></li>
  ))

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('pv-seen'))document.documentElement.setAttribute('data-pv-seen','');else sessionStorage.setItem('pv-seen','1')}catch(e){}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <noscript><style>{NOSCRIPT}</style></noscript>

      {/* Opening: the name typed on a dark screen, which then lifts. Plain CSS; skipped on later visits in the session. */}
      <div className="pv-intro" aria-hidden="true"><p className="pv-mono"><span>NXT Financial Group</span></p></div>

      <PvNav />

      <main id="main" className="pv-main">
        {/* HERO */}
        <section className="pv-hero pv-dark" data-tone="dark" data-prog="exit" aria-labelledby="pv-h1">
          <HeroFilm />
          <div className="pv-hero-shade" aria-hidden="true" />
          <div className="pv-wrap pv-hero-in">
            <div className="pv-hero-copy">
              <p className="pv-mono pv-hero-kicker"><i />Independent insurance agency</p>
              <h1 id="pv-h1" className="pv-h1">
                {HERO_LINES.map((line, i) => <span key={line} className="pv-ln"><span style={v({ '--i': i })}>{line}</span>{' '}</span>)}
              </h1>
              <p className="pv-hero-sub">We compare A-rated carriers for your retirement income, your protection and your care, and explain every term before you sign one.</p>
              <div className="pv-hero-cta">
                <Btn href="/contact">Book a free consultation</Btn>
                <TextLink href="/solutions">Explore solutions</TextLink>
              </div>
            </div>
          </div>
          <div className="pv-hero-foot">
            <div className="pv-wrap pv-hero-strip">
              <p className="pv-mono pv-hero-facts"><span>Licensed in 50 states</span><span>No cost to you</span></p>
              <div className="pv-ticker">
                <p className="pv-mono">Carriers we compare</p>
                <div className="pv-ticker-win"><ul>{tickerItems(false)}{tickerItems(true)}</ul></div>
              </div>
            </div>
          </div>
        </section>

        {/* WHERE ARE YOU RIGHT NOW */}
        <section className="pv-sec pv-mist" data-tone="light" aria-labelledby="pv-where-h">
          <div className="pv-wrap">
            <SHead id="pv-where-h" title={'Where are you\nright now?'} label="Start here" text="Pick the one closest to you. Each opens the plan that usually comes first." />
            <ul className="pv-cells" data-rv="stagger">
              {SITUATIONS.map((s, i) => {
                const sol = solutions.find((x) => x.slug === s.slug)!
                const Icon = s.icon
                return (
                  <li key={s.slug} style={v({ '--i': i })}>
                    <Link href={`/solutions/${s.slug}`} className="pv-cell">
                      <span className="pv-cell-top">
                        <Icon className="pv-cell-ic" strokeWidth={1.25} aria-hidden="true" />
                        <ChevronRight className="pv-cell-go" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="pv-cell-b">
                        <span className="pv-cell-t">{s.title}</span>
                        <span className="pv-cell-more"><span><span className="pv-mono">{sol.title}</span>{sol.short}</span></span>
                      </span>
                      <Icon className="pv-cell-big" strokeWidth={0.6} aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
              <li className="pv-cell-note" style={v({ '--i': 6 })}>
                <p className="pv-mono">Not sure where you fit?</p>
                <p className="pv-cell-note-t">Start with a conversation. We map where you stand before any product comes up.</p>
                <TextLink href="/contact">Book a free consultation</TextLink>
              </li>
            </ul>
          </div>
        </section>

        {/* WHY INDEPENDENT */}
        <section className="pv-sec" data-tone="light" aria-labelledby="pv-why-h">
          <div className="pv-wrap">
            <SHead id="pv-why-h" flip title={'Why families\nchoose independent'} label="Why NXT" text="A captive agent sells one company’s products. An independent agency compares many, and answers to you." />
            <Advantages items={ADVANTAGES} />
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="pv-sec pv-dark" data-tone="dark" aria-labelledby="pv-sol-h">
          <div className="pv-wrap">
            <SHead id="pv-sol-h" title={'Six kinds of cover,\none plan'} label="Solutions" text="Retirement income, protection and care, planned together by one advisor." link={['/solutions', 'All solutions']} />
            <SolutionTabs items={solutions.map((s) => ({ href: `/solutions/${s.slug}`, title: s.title, text: s.short, image: s.image, alt: SOLUTION_ALT[s.slug] ?? '' }))} />
          </div>
        </section>

        {/* HOW IT WORKS, then who we are */}
        <section className="pv-sec" data-tone="light" aria-labelledby="pv-how-h">
          <div className="pv-wrap">
            <SHead id="pv-how-h" flip title="How it works" label="Process" text="The same four steps, whichever plan you need." />
            <ol className="pv-steps" data-prog="" data-from="0.85" data-to="0.45" data-rv="stagger">
              {STEPS.map(([title, text], i) => (
                <li key={title} style={v({ '--i': i })}>
                  <p className="pv-steps-n" aria-hidden="true">0{i + 1}</p>
                  <div>
                    <h3 className="pv-h3">{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="pv-state">
              <p className="pv-mono pv-label" data-rv="up">Who we are</p>
              <p className="pv-state-t" data-prog="" data-from="0.92" data-to="0.5" style={v({ '--n': STATEMENT_WORDS })}>
                {STATEMENT.map((part, pi) => {
                  const list = part.text.split(' ')
                  const words = list.map((w, wi) => <Fragment key={wi}><span className="pv-sw" style={v({ '--i': word++ })}>{w}</span>{wi < list.length - 1 ? ' ' : null}</Fragment>)
                  return <Fragment key={pi}>{part.href ? <Link href={part.href}>{words}</Link> : words}{' '}</Fragment>
                })}
              </p>
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="pv-sec pv-dark" data-tone="dark" aria-labelledby="pv-num-h">
          <div className="pv-wrap">
            <SHead id="pv-num-h" title={'The numbers\nbehind the advice'} label="At a glance" text="Small enough that one advisor knows your file. Wide enough to compare carriers side by side." />
            <ul className="pv-bars" data-rv="bars">
              {NUMBERS.map((n, i) => (
                <li key={n.label} style={v({ '--h': `${n.h}%`, '--i': i })}>
                  <p className="pv-bars-n"><Counter value={n.value} suffix={n.suffix} /></p>
                  <p className="pv-mono pv-bars-l">{n.label}</p>
                  <i className="pv-bars-col" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CARRIERS */}
        <section className="pv-sec pv-mist" data-tone="light" aria-labelledby="pv-car-h">
          <div className="pv-wrap">
            <SHead id="pv-car-h" flip title={'Many carriers,\none desk'} label="Carriers" text="A promise to pay is only as good as the company making it. We place business only with carriers rated A- or better by AM Best, and we compare them for you." link={['/carriers', 'See all carriers by solution']} />
            <div className="pv-net" data-rv="net">
              <div className="pv-net-hub pv-brk">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/logo.png" alt="NXT Financial Group" width={420} height={186} loading="lazy" />
              </div>
              <div className="pv-net-wires" aria-hidden="true">
                <i /><i />
                {[0, 1, 2, 3, 4, 5].map((k) => <i key={k} style={v({ '--k': k })} />)}
              </div>
              <ul className="pv-net-logos">
                {network.map((c, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <li key={c.slug} style={v({ '--i': i })}><img src={c.logo} alt={c.name} loading="lazy" decoding="async" /></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* VALUES: a file of index cards whose tabs spell PROTECT */}
        <section className="pv-sec pv-dark pv-values" data-tone="dark" aria-labelledby="pv-val-h">
          <div className="pv-wrap">
            <SHead id="pv-val-h" title={'What we\nstand for'} label="Values" text="Seven promises behind every plan we place and every advisor we train. Read the letters down the stack." />
            <ol className="pv-stack" data-stack="">
              {VALUES.map((val, i) => (
                <li key={val.word} className="pv-vcard" style={v({ '--i': i })}>
                  <div className="pv-vcard-tab">
                    <span className="pv-mono" aria-hidden="true">0{i + 1}</span>
                    <span className="pv-vcard-chip" aria-hidden="true">{val.letter}</span>
                    <h3>{val.word}</h3>
                    <p className="pv-vcard-tabk" aria-hidden="true">{val.key}</p>
                  </div>
                  <div className="pv-vcard-body">
                    <p className="pv-vcard-k">{val.key}</p>
                    <p className="pv-vcard-t">{val.text}</p>
                  </div>
                  <span className="pv-vcard-l" aria-hidden="true">{val.letter}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="pv-sec" data-tone="light" aria-labelledby="pv-team-h">
          <div className="pv-wrap">
            <SHead id="pv-team-h" flip title="Leadership" label="Team" text="The people behind every plan we place and every advisor we train." link={['/about#team', 'Meet the whole team']} />
            <ul className="pv-team" data-rv="stagger">
              {TEAM.map((m, i) => {
                const inner = (
                  <>
                    <span className="pv-person-pic">
                      <Image src={`/media/team/${TEAM_PHOTO[m.name]}.jpg`} alt="" fill sizes="(min-width: 900px) 24vw, 46vw" />
                      {m.link ? <i aria-hidden="true"><ArrowUpRight size={18} /></i> : null}
                    </span>
                    <span className="pv-person-name">{m.name}</span>
                    <span className="pv-mono">{m.role}</span>
                  </>
                )
                return <li key={m.name} style={v({ '--i': i })}>{m.link ? <Link href={m.link} className="pv-person">{inner}</Link> : <div className="pv-person">{inner}</div>}</li>
              })}
            </ul>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="pv-sec pv-dark" data-tone="dark" aria-labelledby="pv-voices-h">
          <div className="pv-wrap">
            <SHead id="pv-voices-h" title={'What clients\nand advisors say'} label="Testimonials" />
            <Voices items={VOICES} />
          </div>
        </section>

        {/* CALL TO ACTION over a photograph */}
        <section className="pv-cta pv-dark" data-tone="dark" data-prog="" aria-labelledby="pv-cta-h">
          <div className="pv-cta-pic" aria-hidden="true">
            <picture>
              <source media="(max-aspect-ratio: 4/5)" srcSet="/videos/dusk-tall.jpg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/videos/dusk-wide.jpg" alt="" width={1920} height={1080} loading="lazy" decoding="async" />
            </picture>
          </div>
          <div className="pv-wrap">
            <h2 id="pv-cta-h" className="pv-h1" data-rv="lines"><Lines text={'See where\nyou stand.'} /></h2>
            <p className="pv-hero-sub" data-rv="up">A first conversation costs you nothing. We look at what you have, what it costs and whether it still does the job.</p>
            <div className="pv-hero-cta" data-rv="up">
              <Btn href="/contact">Book a free consultation</Btn>
              <TextLink href="/get-started">Get started online</TextLink>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pv-sec" data-tone="light" aria-labelledby="pv-faq-h">
          <div className="pv-wrap pv-faq-grid">
            <div className="pv-faq-left">
              <p className="pv-mono pv-label" data-rv="up">Questions</p>
              <h2 id="pv-faq-h" className="pv-h2" data-rv="lines"><Lines text={'What people ask\nbefore they call'} /></h2>
              <div className="pv-faq-side" data-rv="up">
                <p>If yours is not here, ask it. We answer every message within a business day.</p>
                <Btn href="/contact" className="pv-btn-line">Ask a question</Btn>
              </div>
            </div>
            <PvFaq />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pv-foot pv-dark" data-tone="dark">
        <div className="pv-wrap">
          <div className="pv-foot-top">
            <div className="pv-foot-contact">
              <p className="pv-mono pv-label">Talk to us</p>
              <a href="tel:8572053333">857-205-3333</a>
              <a href="mailto:info@nxtfinancialgroup.com">info@nxtfinancialgroup.com</a>
              <address>75 Pleasant Street, Unit 207<br />Malden, MA 02148</address>
            </div>
            <div className="pv-foot-cols">
              <nav aria-label="Solutions"><p className="pv-mono pv-label">Solutions</p><ul>{solutions.map((s) => <li key={s.slug}><Link href={`/solutions/${s.slug}`}>{s.title}</Link></li>)}</ul></nav>
              <nav aria-label="Company"><p className="pv-mono pv-label">Company</p><ul>{COMPANY.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul></nav>
              <nav aria-label="Tools and social">
                <p className="pv-mono pv-label">Tools</p><ul>{TOOLS.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
                <p className="pv-mono pv-label">Follow</p><ul>{SOCIAL.map(([h, l]) => <li key={l}><a href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul>
              </nav>
            </div>
          </div>
          <p className="pv-foot-legal">NXT Financial Group is a licensed independent insurance agency headquartered in Massachusetts. Annuity and insurance guarantees are backed by the claims-paying ability of the issuing carrier. Product availability, features and rates vary by carrier and state. We do not offer every plan available in your area; contact Medicare.gov or 1-800-MEDICARE for all options. Estimates on this site are illustrative and not an offer of coverage.</p>
          <FootFilm />
          <div className="pv-foot-base">
            <p className="pv-mono">© {new Date().getFullYear()} NXT Financial Group, NXT World Holdings, Inc. All Rights Reserved.</p>
            <ul className="pv-mono"><li><Link href="/privacy-policy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li></ul>
          </div>
        </div>
      </footer>

      <PvMotion />
    </>
  )
}
