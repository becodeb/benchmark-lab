import { Bell, Menu, Search } from 'lucide-react'

type TopbarProps = {
  title: string
  subtitle: string
  onOpenSidebar: () => void
  query: string
  onQueryChange: (value: string) => void
}

export default function Topbar({ title, subtitle, onOpenSidebar, query, onQueryChange }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onOpenSidebar}
          title="Abrir menú"
          className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 transition-colors hover:text-white lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-white sm:text-lg">{title}</h1>
          <p className="hidden truncate text-xs text-slate-500 sm:block">{subtitle}</p>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar estudiante..."
              className="w-48 rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/40 lg:w-64"
            />
          </div>

          <button
            title="Notificaciones"
            className="relative rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-colors hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
          </button>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
            MD
          </span>
        </div>
      </div>
    </header>
  )
}
