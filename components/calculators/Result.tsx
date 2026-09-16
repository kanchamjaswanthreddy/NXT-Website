'use client'
import Link from 'next/link'
export default function Result({ label, value, note, cta = 'Talk it through with an advisor' }: { label: string; value: string; note: string; cta?: string }) {
  return (<div className="mt-6 rounded-2xl bg-navy p-6 text-white"><p className="text-sm text-platinum">{label}</p><p className="mono mt-1 text-4xl text-sunrise" aria-live="polite">{value}</p><p className="mono mt-3 text-xs leading-relaxed text-silver">{note}</p><Link href="/contact" className="btn btn-cta btn-sm mt-5">{cta}</Link></div>)
}
