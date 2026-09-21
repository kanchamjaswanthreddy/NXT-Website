'use client'
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts'
import { usd } from './Slider'

interface Series { key: string; label: string; color: string }

interface Props {
  type: 'dual-area' | 'stacked-area' | 'bar' | 'horizontal-bar' | 'donut'
  data: Record<string, number | string>[]
  xKey?: string
  xLabel?: string
  series: Series[]
  formatValue?: (v: number) => string
}

const fmt = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}k`
  return usd(v)
}

const CustomTooltip = ({ active, payload, label, formatValue }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string; formatValue: (v: number) => string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-platinum bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
      {label !== undefined && <p className="mb-1.5 text-xs font-medium text-ink-soft">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-ink-soft">{p.name}:</span>
          <span className="mono font-semibold text-navy">{formatValue(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function CalcChart({ type, data, xKey = 'name', xLabel, series, formatValue = fmt }: Props) {
  return (
    <div className="flex flex-col justify-center rounded-[24px] bg-stone p-5 md:p-8">
      <p className="label-sm mb-4">Live projection</p>
      <div className="h-[320px] w-full md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'dual-area' || type === 'stacked-area' ? (
            <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 24, left: 8 }}>
              <defs>
                {series.map((s) => (
                  <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={s.color} stopOpacity={0.03} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DB" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#9A978F" label={xLabel ? { value: xLabel, position: 'bottom', offset: 8, style: { fontSize: 12, fill: '#9A978F' } } : undefined} />
              <YAxis tickFormatter={formatValue} tick={{ fontSize: 11 }} stroke="#9A978F" width={56} />
              <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 13 }} />
              {series.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2.5}
                  fill={`url(#grad-${s.key})`}
                  stackId={type === 'stacked-area' ? 'stack' : undefined}
                  animationDuration={500}
                />
              ))}
            </AreaChart>
          ) : type === 'bar' || type === 'horizontal-bar' ? (
            <BarChart
              data={data}
              layout={type === 'horizontal-bar' ? 'vertical' : 'horizontal'}
              margin={{ top: 8, right: 8, bottom: 24, left: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DB" />
              {type === 'horizontal-bar' ? (
                <>
                  <YAxis dataKey={xKey} type="category" tick={{ fontSize: 12 }} stroke="#9A978F" width={100} />
                  <XAxis type="number" tickFormatter={formatValue} tick={{ fontSize: 11 }} stroke="#9A978F" />
                </>
              ) : (
                <>
                  <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#9A978F" />
                  <YAxis tickFormatter={formatValue} tick={{ fontSize: 11 }} stroke="#9A978F" width={56} />
                </>
              )}
              <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 13 }} />
              {series.map((s) => (
                <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[4, 4, 0, 0]} animationDuration={500} />
              ))}
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={3}
                animationDuration={500}
                label={({ name, value }: { name?: string; value?: number }) => `${name ?? ''}: ${formatValue(value ?? 0)}`}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={series[i]?.color ?? '#C8A951'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 13 }} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
