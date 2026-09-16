interface Section { heading: string; body: string }
export default function LegalPage({ title, effective, sections }: { title: string; effective: string; sections: Section[] }) {
  return (
    <>
      <section className="bg-stone"><div className="container pb-16 pt-32 md:pb-20 md:pt-40"><p className="label-sm mb-5">Legal</p><h1 className="display-xl text-navy">{title}</h1><p className="mono mt-4 text-sm text-ink-soft">Effective {effective}</p></div></section>
      <section className="section bg-white"><div className="container grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
        <nav aria-label="Sections" className="hidden lg:block"><ol className="sticky top-28 space-y-2 border-l border-platinum text-sm">{sections.map(({ heading }, i) => <li key={heading}><a href={`#s${i + 1}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-ink-soft hover:border-gold hover:text-navy">{heading.replace(/^\d+\.\s*/, '')}</a></li>)}</ol></nav>
        <div className="max-w-[720px]">{sections.map(({ heading, body }, i) => <section key={heading} id={`s${i + 1}`} className="mb-10 scroll-mt-32"><h2 className="h2 mb-3">{heading}</h2><p className="leading-7">{body}</p></section>)}</div>
      </div></section>
    </>
  )
}
