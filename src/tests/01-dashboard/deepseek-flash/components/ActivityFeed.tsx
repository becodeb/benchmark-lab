import { CircleCheckBig, Clock, FileText, TrendingUp, UserPlus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ActivityTone = 'blue' | 'emerald' | 'amber' | 'violet'

type Activity = {
  id: number
  icon: LucideIcon
  text: string
  time: string
  tone: ActivityTone
}

const activities: Activity[] = [
  { id: 1, icon: UserPlus, text: 'Nueva inscripción: Renata Escobar en Química 5°A', time: 'Hace 12 min', tone: 'blue' },
  { id: 2, icon: CircleCheckBig, text: 'Valentina Ríos completó el módulo "Álgebra II"', time: 'Hace 48 min', tone: 'emerald' },
  { id: 3, icon: FileText, text: 'Se publicó la evaluación de Historia 5°C', time: 'Hace 2 h', tone: 'violet' },
  { id: 4, icon: TrendingUp, text: 'El promedio de Física 6°A subió 0,6 puntos', time: 'Hace 5 h', tone: 'amber' },
  { id: 5, icon: Clock, text: 'Recordatorio enviado a 14 estudiantes inactivos', time: 'Ayer', tone: 'blue' },
]

const toneStyles: Record<ActivityTone, string> = {
  blue: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  violet: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
}

export default function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h2 className="text-sm font-semibold text-white">Actividad reciente</h2>
      <p className="text-xs text-slate-500">Últimos eventos del campus</p>
      <ul className="mt-4 space-y-4">
        {activities.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${toneStyles[item.tone]}`}
            >
              <item.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-snug text-slate-300">{item.text}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
