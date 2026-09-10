import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SearchX,
} from 'lucide-react'
import { students } from '../data'
import type { SortDirection, SortKey, StudentStatus } from '../types'

type StudentsTableProps = {
  query: string
  onQueryChange: (value: string) => void
}

type StatusFilter = 'all' | StudentStatus

const statusMeta: Record<StudentStatus, { label: string; className: string; dot: string }> = {
  active: {
    label: 'Activo',
    className: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  inactive: {
    label: 'Inactivo',
    className: 'bg-slate-500/10 text-slate-400 ring-slate-500/20',
    dot: 'bg-slate-400',
  },
  scholarship: {
    label: 'Becado',
    className: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
    dot: 'bg-violet-400',
  },
}

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Activos' },
  { value: 'scholarship', label: 'Becados' },
  { value: 'inactive', label: 'Inactivos' },
]

const columns: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Estudiante' },
  { key: 'course', label: 'Curso' },
  { key: 'status', label: 'Estado' },
  { key: 'progress', label: 'Progreso' },
  { key: 'grade', label: 'Promedio' },
  { key: 'lastActive', label: 'Última actividad' },
]

const avatarPalette = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
]

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

const avatarTone = (name: string) =>
  avatarPalette[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % avatarPalette.length]

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short' }).format(new Date(`${iso}T12:00:00`))

const formatGrade = (grade: number) =>
  grade.toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

const progressTone = (progress: number) => {
  if (progress >= 80) return 'bg-emerald-500'
  if (progress >= 60) return 'bg-blue-500'
  if (progress >= 40) return 'bg-amber-500'
  return 'bg-rose-500'
}

const gradeTone = (grade: number) => {
  if (grade >= 8) return 'text-emerald-400'
  if (grade >= 7) return 'text-blue-400'
  if (grade >= 6) return 'text-amber-400'
  return 'text-rose-400'
}

function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) return <ArrowUpDown className="h-3.5 w-3.5 text-slate-600" />
  return direction === 'asc' ? (
    <ArrowUp className="h-3.5 w-3.5 text-blue-400" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5 text-blue-400" />
  )
}

export default function StudentsTable({ query, onQueryChange }: StudentsTableProps) {
  const [status, setStatus] = useState<StatusFilter>('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    setPage(1)
  }, [query, status, pageSize])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return students.filter((student) => {
      const matchesQuery =
        !term ||
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.course.toLowerCase().includes(term)
      const matchesStatus = status === 'all' || student.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  const sorted = useMemo(() => {
    const rows = [...filtered]
    rows.sort((a, b) => {
      const valueA = a[sortKey]
      const valueB = b[sortKey]
      const comparison =
        typeof valueA === 'number' && typeof valueB === 'number'
          ? valueA - valueB
          : String(valueA).localeCompare(String(valueB), 'es')
      return sortDir === 'asc' ? comparison : -comparison
    })
    return rows
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const rows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const from = sorted.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, sorted.length)

  const pages = useMemo(() => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
    const end = Math.min(totalPages, start + 4)
    const list: number[] = []
    for (let index = start; index <= end; index += 1) list.push(index)
    return list
  }, [currentPage, totalPages])

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((direction) => (direction === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDir('asc')
  }

  const sortLabel = columns.find((column) => column.key === sortKey)?.label.toLowerCase()

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="flex flex-col gap-4 border-b border-slate-800 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Estudiantes</h2>
          <p className="text-xs text-slate-500">
            {sorted.length} resultados · ordenado por {sortLabel}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar por nombre, email o curso"
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/40 sm:w-72"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950/60 p-1">
            {statusFilters.map((item) => (
              <button
                key={item.value}
                onClick={() => setStatus(item.value)}
                className={`flex-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:flex-none ${
                  status === item.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-3 font-medium">
                  <button
                    onClick={() => toggleSort(column.key)}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-200"
                  >
                    {column.label}
                    <SortIcon active={sortKey === column.key} direction={sortDir} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {rows.map((student) => (
              <tr key={student.id} className="transition-colors hover:bg-slate-800/30">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${avatarTone(student.name)}`}
                    >
                      {initials(student.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-200">{student.name}</p>
                      <p className="truncate text-xs text-slate-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-400">{student.course}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusMeta[student.status].className}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${statusMeta[student.status].dot}`} />
                    {statusMeta[student.status].label}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${progressTone(student.progress)}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-300">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`font-semibold ${gradeTone(student.grade)}`}>{formatGrade(student.grade)}</span>
                </td>
                <td className="px-5 py-3.5 text-slate-400">{formatDate(student.lastActive)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-14 text-center">
            <SearchX className="h-8 w-8 text-slate-600" />
            <p className="text-sm font-medium text-slate-300">Sin resultados</p>
            <p className="text-xs text-slate-500">
              Probá con otro término de búsqueda o cambiá el filtro de estado.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            Mostrando {from}-{to} de {sorted.length}
          </span>
          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
            className="rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-300 focus:border-blue-500/60 focus:outline-none"
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            title="Página anterior"
            className="rounded-lg border border-slate-800 p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition-colors ${
                pageNumber === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Página siguiente"
            className="rounded-lg border border-slate-800 p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
