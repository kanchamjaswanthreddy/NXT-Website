'use client'
interface Props { id: string; label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void; minLabel: string; maxLabel: string }
export default function Slider({ id, label, value, display, min, max, step, onChange, minLabel, maxLabel }: Props) {
  return (
    <div className="border-b border-platinum pb-5 last:border-0">
      <div className="mb-3 flex items-baseline justify-between gap-4"><label htmlFor={id} className="text-sm font-semibold">{label}</label><output htmlFor={id} className="mono text-lg text-navy">{display}</output></div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <div className="mono mt-1 flex justify-between text-[11px] text-ink-soft"><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
  )
}
export const usd = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
