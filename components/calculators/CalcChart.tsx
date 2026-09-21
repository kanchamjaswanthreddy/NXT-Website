'use client'
import { ReactNode } from 'react'
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts'
import { usd } from './Slider'
import { TrendingUp, TrendingDown, ArrowRight, DollarSign, Shield, Percent, Clock, PiggyBank, Heart, Home, GraduationCap, Flame, Coffee } from 'lucide-react'

/* ── Shared helpers ── */
export const fmt = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}k`
  return usd(v)
}

const ICONS: Record<string, typeof DollarSign> = {
  dollar: DollarSign, shield: Shield, percent: Percent, clock: Clock,
  piggy: PiggyBank, heart: Heart, home: Home, grad: GraduationCap,
  trending: TrendingUp, down: TrendingDown, arrow: ArrowRight,
  flame: Flame, coffee: Coffee,
}

/* ── KPI Card ── */
export interface Kpi {
  label: string
  value: string
  sub?: string
  icon?: string
  color?: 'gold' | 'navy' | 'sunrise' | 'green' | 'red'
  trend?: 'up' | 'down' | 'neutral'
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = kpi.icon ? ICONS[kpi.icon] ?? DollarSign : DollarSign
  const ring = {
    gold: 'ring-gold/20 bg-gold/5',
    navy: 'ring-navy/20 bg-navy/5',
    sunrise: 'ring-sunrise/20 bg-sunrise/5',
    green: 'ring-emerald-500/20 bg-emerald-50',
    red: 'ring-red-500/20 bg-red-50',
  }[kpi.color ?? 'navy']
  const iconColor = {
    gold: 'text-gold', navy: 'text-navy', sunrise: 'text-sunrise',
    green: 'text-emerald-600', red: 'text-red-500',
  }[kpi.color ?? 'navy']

  return (
    <div className={`rounded-2xl p-4 ring-1 ${ring}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${ring}`}>
          <Icon size={16} className={iconColor} />
        </span>
        {kpi.trend && kpi.trend !== 'neutral' && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          </span>
        )}
      </div>
      <p className="mono text-2xl font-extrabold tracking-tight text-navy">{kpi.value}</p>
      <p className="mt-1 text-[13px] font-semibold text-ink">{kpi.label}</p>
      {kpi.sub && <p className="mono mt-1 text-xs font-medium text-ink-soft">{kpi.sub}</p>}
    </div>
  )
}

/* ── Progress Bar ── */
export interface ProgressItem { label: string; value: number; max: number; color: string; displayValue: string }

function ProgressBar({ item }: { item: ProgressItem }) {
  const pct = Math.min(100, (item.value / item.max) * 100)
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-semibold text-ink">{item.label}</span>
        <span className="mono text-[13px] font-bold text-navy">{item.displayValue}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-platinum/60">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: item.color }} />
      </div>
    </div>
  )
}

/* ── Comparison Row ── */
export interface ComparisonItem { label: string; value: string; color: string }

function ComparisonRow({ items }: { items: ComparisonItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5 rounded-xl bg-white/60 px-3 py-2.5 ring-1 ring-platinum/40">
          <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
          <div>
            <p className="mono text-sm font-extrabold text-navy">{item.value}</p>
            <p className="text-xs font-medium text-ink">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Mini Chart wrapper ── */
interface ChartSection {
  title: string
  height?: number
  children: ReactNode
}

/* ── Tooltip ── */
const CustomTooltip = ({ active, payload, label, formatValue }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string; formatValue: (v: number) => string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-platinum bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
      {label !== undefined && <p className="mb-1.5 text-xs font-bold text-ink">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="font-medium text-ink">{p.name}:</span>
          <span className="mono font-extrabold text-navy">{formatValue(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Chart types ── */
interface Series { key: string; label: string; color: string }

export function MiniArea({ data, xKey = 'name', series, formatValue = fmt, height = 200 }: { data: Record<string, number | string>[]; xKey?: string; series: Series[]; formatValue?: (v: number) => string; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`mg-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DB" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fontWeight: 600, fill: '#3D3A34' }} stroke="#9A978F" />
          <YAxis tickFormatter={formatValue} tick={{ fontSize: 11, fontWeight: 600, fill: '#3D3A34' }} stroke="#9A978F" width={48} />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          {series.length > 1 && <Legend verticalAlign="top" height={28} iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />}
          {series.map((s) => (
            <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} strokeWidth={2} fill={`url(#mg-${s.key})`} animationDuration={400} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MiniBar({ data, xKey = 'name', series, layout = 'horizontal', formatValue = fmt, height = 200 }: { data: Record<string, number | string>[]; xKey?: string; series: Series[]; layout?: 'horizontal' | 'vertical'; formatValue?: (v: number) => string; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout={layout} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DB" />
          {layout === 'vertical' ? (
            <>
              <YAxis dataKey={xKey} type="category" tick={{ fontSize: 11, fontWeight: 600, fill: '#3D3A34' }} stroke="#9A978F" width={90} />
              <XAxis type="number" tickFormatter={formatValue} tick={{ fontSize: 11, fontWeight: 600, fill: '#3D3A34' }} stroke="#9A978F" />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} tick={{ fontSize: 11, fontWeight: 600, fill: '#3D3A34' }} stroke="#9A978F" />
              <YAxis tickFormatter={formatValue} tick={{ fontSize: 11, fontWeight: 600, fill: '#3D3A34' }} stroke="#9A978F" width={48} />
            </>
          )}
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          {series.map((s) => (
            <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[4, 4, 0, 0]} animationDuration={400} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MiniDonut({ data, series, formatValue = fmt, height = 200 }: { data: { name: string; value: number }[]; series: Series[]; formatValue?: (v: number) => string; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="50%" outerRadius="78%" paddingAngle={3} animationDuration={400}>
            {data.map((_, i) => <Cell key={i} fill={series[i]?.color ?? '#C8A951'} />)}
          </Pie>
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ── Dashboard Panel (the right side) ── */
export interface DashboardProps {
  kpis: Kpi[]
  children: ReactNode
  progress?: ProgressItem[]
  comparisons?: ComparisonItem[]
}

export default function CalcDashboard({ kpis, children, progress, comparisons }: DashboardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-[24px] bg-stone p-5 md:p-7">
      {/* KPI cards */}
      <div className={`grid gap-3 ${kpis.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {kpis.map((k) => <KpiCard key={k.label} kpi={k} />)}
      </div>

      {/* Progress bars */}
      {progress && progress.length > 0 && (
        <div className="space-y-3 rounded-2xl bg-white/60 p-4 ring-1 ring-platinum/40">
          <p className="text-[13px] font-bold tracking-tight text-navy">Breakdown</p>
          {progress.map((p) => <ProgressBar key={p.label} item={p} />)}
        </div>
      )}

      {/* Charts */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Comparison legend */}
      {comparisons && comparisons.length > 0 && <ComparisonRow items={comparisons} />}
    </div>
  )
}

/** Labeled chart section wrapper */
export function ChartBlock({ title, children }: ChartSection) {
  return (
    <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-platinum/40">
      <p className="mb-3 text-[13px] font-bold tracking-tight text-navy">{title}</p>
      {children}
    </div>
  )
}
