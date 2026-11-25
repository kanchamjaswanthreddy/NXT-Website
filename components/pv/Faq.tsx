'use client'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { QA } from '@/lib/faq'

/** Questions as a ruled list; one opens at a time, and the open one is set larger. */
export default function PvFaq() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="pv-faq" data-rv="stagger">
      {QA.map(([q, a], i) => (
        <li key={q} className="pv-faq-item" data-open={open === i || undefined} style={{ '--i': i } as React.CSSProperties}>
          <h3>
            <button type="button" className="pv-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`pv-faq-${i}`}>
              <span>{q}</span>
              <span className="pv-faq-ic" aria-hidden="true">{open === i ? <Minus size={20} strokeWidth={1.75} /> : <Plus size={20} strokeWidth={1.75} />}</span>
            </button>
          </h3>
          <div id={`pv-faq-${i}`} className="pv-faq-a" inert={open !== i}>
            <div><p>{a}</p></div>
          </div>
        </li>
      ))}
    </ul>
  )
}
