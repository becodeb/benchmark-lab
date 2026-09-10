import { useState } from 'react'
import ActivityFeed from './components/ActivityFeed'
import { CourseChart, EnrollmentChart, StatusDonut } from './components/Charts'
import KpiCard from './components/KpiCard'
import Sidebar, { type SectionId } from './components/Sidebar'
import StudentsTable from './components/StudentsTable'
import Topbar from './components/Topbar'
import { kpis } from './data'

const sectionMeta: Record<SectionId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Panel general', subtitle: 'Resumen académico · Septiembre 2026' },
  students: { title: 'Estudiantes', subtitle: 'Matrícula, seguimiento y rendimiento' },
  courses: { title: 'Cursos', subtitle: 'Oferta académica y programas activos' },
  schedule: { title: 'Calendario', subtitle: 'Clases, exámenes y eventos institucionales' },
  reports: { title: 'Reportes', subtitle: 'Métricas e informes del período' },
  settings: { title: 'Configuración', subtitle: 'Preferencias del panel y de la cuenta' },
}

export default function View() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [section, setSection] = useState<SectionId>('dashboard')
  const [query, setQuery] = useState('')

  const handleNavigate = (id: SectionId) => {
    setSection(id)
    setMobileOpen(false)
  }

  const meta = sectionMeta[section]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar
        collapsed={collapsed}
        active={section}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed((value) => !value)}
        onNavigate={handleNavigate}
        onClose={() => setMobileOpen(false)}
      />

      <div className={`pt-14 transition-[padding] duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenSidebar={() => setMobileOpen(true)}
          query={query}
          onQueryChange={setQuery}
        />

        <main className="space-y-5 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.id} {...kpi} />
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-3">
            <EnrollmentChart />
            <StatusDonut />
          </section>

          <StudentsTable query={query} onQueryChange={setQuery} />

          <section className="grid gap-5 xl:grid-cols-2">
            <CourseChart />
            <ActivityFeed />
          </section>
        </main>
      </div>
    </div>
  )
}
