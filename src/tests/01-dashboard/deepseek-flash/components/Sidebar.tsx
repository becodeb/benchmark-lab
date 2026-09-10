import {
  BookOpen,
  CalendarDays,
  ChartColumn,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type SectionId = 'dashboard' | 'students' | 'courses' | 'schedule' | 'reports' | 'settings'

type NavItem = { id: SectionId; label: string; icon: LucideIcon }

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Panel general', icon: LayoutDashboard },
  { id: 'students', label: 'Estudiantes', icon: Users },
  { id: 'courses', label: 'Cursos', icon: BookOpen },
  { id: 'schedule', label: 'Calendario', icon: CalendarDays },
  { id: 'reports', label: 'Reportes', icon: ChartColumn },
  { id: 'settings', label: 'Configuración', icon: Settings },
]

type SidebarContentProps = {
  collapsed: boolean
  active: SectionId
  onNavigate: (id: SectionId) => void
}

function SidebarContent({ collapsed, active, onNavigate }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex h-16 shrink-0 items-center gap-3 border-b border-slate-800 ${
          collapsed ? 'justify-center' : 'px-4'
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-950/40">
          <GraduationCap className="h-5 w-5 text-white" />
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">EduMetrics</p>
            <p className="truncate text-[11px] text-slate-500">Panel académico</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`flex w-full items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-colors ${
                collapsed ? 'justify-center' : 'px-3'
              } ${
                isActive
                  ? 'bg-blue-500/15 text-blue-300'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />}
            </button>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-slate-800 p-3">
        <div
          className={`flex items-center gap-3 rounded-xl bg-slate-800/50 ${
            collapsed ? 'justify-center p-2' : 'p-2.5'
          }`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold text-white">
            MD
          </span>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-200">Mariana Díaz</p>
                <p className="truncate text-[11px] text-slate-500">Coordinadora académica</p>
              </div>
              <LogOut className="h-4 w-4 shrink-0 text-slate-500" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

type SidebarProps = {
  collapsed: boolean
  active: SectionId
  mobileOpen: boolean
  onToggle: () => void
  onNavigate: (id: SectionId) => void
  onClose: () => void
}

export default function Sidebar({ collapsed, active, mobileOpen, onToggle, onNavigate, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-slate-800 bg-slate-900/95 backdrop-blur transition-[width] duration-300 lg:block ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent collapsed={collapsed} active={active} onNavigate={onNavigate} />
        <button
          onClick={onToggle}
          title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          className="absolute -right-3 top-20 hidden h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 shadow-lg transition-colors hover:text-white lg:flex"
        >
          {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
        </button>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-800 bg-slate-900 transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <SidebarContent collapsed={false} active={active} onNavigate={onNavigate} />
      </aside>
    </>
  )
}
