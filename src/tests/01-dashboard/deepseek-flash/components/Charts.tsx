import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { courseDistribution, enrollmentTrend, statusDistribution } from '../data'

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '0.75rem',
  fontSize: '12px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
}

const axisTick = { fill: '#64748b', fontSize: 12 }

export function EnrollmentChart() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 xl:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Evolución de estudiantes</h2>
          <p className="text-xs text-slate-500">Activos y nuevas inscripciones · 2026</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Activos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" /> Nuevos
          </span>
        </div>
      </div>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={enrollmentTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="activeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: '#334155' }} />
            <Area
              type="monotone"
              dataKey="active"
              name="Activos"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#activeFill)"
            />
            <Area
              type="monotone"
              dataKey="new"
              name="Nuevos"
              stroke="#22d3ee"
              strokeWidth={2}
              fillOpacity={0}
              strokeDasharray="5 4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export function StatusDonut() {
  const total = statusDistribution.reduce((sum, item) => sum + item.value, 0)
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h2 className="text-sm font-semibold text-white">Distribución por estado</h2>
      <p className="text-xs text-slate-500">Matrícula total actual</p>
      <div className="relative mt-2 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={80}
              paddingAngle={3}
              stroke="none"
            >
              {statusDistribution.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-white">{total.toLocaleString('es-AR')}</span>
          <span className="text-[11px] text-slate-500">estudiantes</span>
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {statusDistribution.map((item) => (
          <li key={item.name} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-slate-400">{item.name}</span>
            <span className="ml-auto font-medium text-slate-200">{item.value.toLocaleString('es-AR')}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CourseChart() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h2 className="text-sm font-semibold text-white">Estudiantes por curso</h2>
      <p className="text-xs text-slate-500">Cursos con mayor matrícula</p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={courseDistribution} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="course" width={104} tick={axisTick} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b' }} />
            <Bar dataKey="students" name="Estudiantes" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
