import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { KpiAccent } from '../data'

const accentStyles: Record<KpiAccent, string> = {
  blue: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  violet: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
}

type KpiCardProps = {
  label: string
  value: string
  delta: number
  icon: LucideIcon
  accent: KpiAccent
}

export default function KpiCard({ label, value, delta, icon: Icon, accent }: KpiCardProps) {
  const isUp = delta >= 0
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-colors hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <span className={`shrink-0 rounded-xl p-2.5 ring-1 ${accentStyles[accent]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs">
        <span
          className={`inline-flex items-center gap-0.5 font-semibold ${
            isUp ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {Math.abs(delta).toLocaleString('es-AR', { minimumFractionDigits: 1 })}%
        </span>
        <span className="text-slate-500">vs. mes anterior</span>
      </div>
    </article>
  )
}
