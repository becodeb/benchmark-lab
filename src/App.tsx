import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react'

// Vite escanea automaticamente cada View.tsx dentro de src/tests/<test>/<modelo>/
// No hace falta registrar nada a mano: si el modelo crea la carpeta, aparece sola.
const modules = import.meta.glob('./tests/*/*/View.tsx')

type Route = {
  key: string
  test: string
  model: string
  load: () => Promise<unknown>
}

const routes: Route[] = Object.entries(modules).map(([key, load]) => {
  const [, , test, model] = key.split('/')
  return { key, test, model, load: load as () => Promise<unknown> }
})

const lazyCache = new Map<string, ComponentType>()
function componentFor(route: Route): ComponentType {
  let comp = lazyCache.get(route.key)
  if (!comp) {
    comp = lazy(async () => {
      const mod = (await route.load()) as { default?: ComponentType; View?: ComponentType }
      const resolved = mod.default ?? mod.View
      if (!resolved) {
        throw new Error('View.tsx debe exportar un componente por defecto (export default).')
      }
      return { default: resolved }
    })
    lazyCache.set(route.key, comp)
  }
  return comp
}

type BoundaryProps = { children: ReactNode; resetKey: string }
type BoundaryState = { error: Error | null }

class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error }
  }

  componentDidUpdate(prev: BoundaryProps) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-red-950 p-8 font-mono text-red-100">
          <h2 className="mb-4 text-xl font-bold">La vista rompio</h2>
          <pre className="overflow-auto rounded bg-black/40 p-4 text-xs leading-relaxed">
            {String(this.state.error.stack || this.state.error.message || this.state.error)}
          </pre>
          <p className="mt-4 text-sm text-red-300">
            Revisa la consola (F12) para mas detalle. Esto cuenta como fallo del modelo.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

function Placeholder({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-950 p-8 text-center text-slate-400">
      <p className="text-lg font-semibold text-slate-200">{title}</p>
      <p className="max-w-md text-sm">{hint}</p>
    </div>
  )
}

export default function App() {
  const tests = useMemo(
    () => Array.from(new Set(routes.map((r) => r.test))).sort(),
    [],
  )

  const [test, setTest] = useState(
    () => localStorage.getItem('bench:test') || tests[0] || '',
  )
  const [model, setModel] = useState(() => localStorage.getItem('bench:model') || '')
  const [barHidden, setBarHidden] = useState(false)
  const [nonce, setNonce] = useState(0)

  const modelsOfTest = useMemo(
    () => routes.filter((r) => r.test === test).map((r) => r.model).sort(),
    [test],
  )

  useEffect(() => {
    localStorage.setItem('bench:test', test)
  }, [test])
  useEffect(() => {
    localStorage.setItem('bench:model', model)
  }, [model])

  // Si el modelo activo no existe en este test, cae al primero disponible.
  useEffect(() => {
    if (modelsOfTest.length && !modelsOfTest.includes(model)) {
      setModel(modelsOfTest[0])
    }
  }, [modelsOfTest, model])

  // Atajo: presionar "b" oculta/muestra la barra (util para ver 3D a pantalla completa).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return
      if (e.key === 'b' || e.key === 'B') setBarHidden((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (routes.length === 0) {
    return (
      <Placeholder
        title="Todavia no hay ninguna View.tsx"
        hint="Pedile al agente: 'hace el 1' y va a crear src/tests/01-dashboard/<modelo>/View.tsx. El switcher aparece solo."
      />
    )
  }

  const active = routes.find((r) => r.test === test && r.model === model)
  const View = active ? componentFor(active) : null
  const testNumber = String(Number(test.split('-')[0]))

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100">
      {!barHidden && (
        <header className="fixed left-1/2 top-3 z-50 flex max-w-[95vw] -translate-x-1/2 flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Test
            </span>
            <select
              value={test}
              onChange={(e) => setTest(e.target.value)}
              className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tests.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Modelo
            </span>
            <div className="flex flex-wrap gap-1">
              {modelsOfTest.length === 0 && (
                <span className="text-xs text-slate-500">(sin modelos todavia)</span>
              )}
              {modelsOfTest.map((m) => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    model === m
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <button
            onClick={() => setNonce((n) => n + 1)}
            title="Remontar la vista activa"
            className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700"
          >
            Reiniciar
          </button>
          <button
            onClick={() => setBarHidden(true)}
            title="Ocultar barra (tecla B)"
            className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700"
          >
            Ocultar
          </button>
          <span className="hidden text-[11px] text-slate-500 sm:inline">
            pegue: «hace el {testNumber}»
          </span>
        </header>
      )}

      {barHidden && (
        <button
          onClick={() => setBarHidden(false)}
          title="Mostrar barra (tecla B)"
          className="fixed bottom-3 right-3 z-50 rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 text-xs text-slate-300 shadow-xl backdrop-blur hover:bg-slate-800"
        >
          Benchmark
        </button>
      )}

      <main key={`${test}/${model}/${nonce}`} className="min-h-screen w-full">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-500">
              Cargando vista...
            </div>
          }
        >
          <ErrorBoundary resetKey={`${active?.key || 'none'}-${nonce}`}>
            {View ? (
              <View />
            ) : (
              <Placeholder
                title="Este test todavia no tiene vistas"
                hint={`Pedile al agente: «hace el ${testNumber}» para que escriba en src/tests/${test}/<su-modelo>/View.tsx`}
              />
            )}
          </ErrorBoundary>
        </Suspense>
      </main>
    </div>
  )
}
