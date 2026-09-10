import { FlaskConical, MousePointerClick, Terminal, Eye, Layers, MonitorPlay } from 'lucide-react'

const steps = [
  {
    icon: Terminal,
    title: '1. Elegi un modelo',
    text: 'Abri otra sesion de opencode en este repo y selecciona el modelo que quieras probar.',
  },
  {
    icon: MousePointerClick,
    title: '2. Pedi el test',
    text: 'Decile simplemente: "hace el 1". El agente lee prompts/01-dashboard.md y escribe solo en su carpeta.',
  },
  {
    icon: Layers,
    title: '3. Repeti con otro modelo',
    text: 'Nueva sesion, otro modelo, mismo "hace el 1". Cada uno escribe en su propia carpeta de modelo.',
  },
  {
    icon: MonitorPlay,
    title: '4. Compara en vivo',
    text: 'Arriba, cambia entre modelos del mismo test. No hay que levantar mas servidores.',
  },
]

const tests = [
  { n: '1', name: 'Dashboard', desc: 'Layout denso, estado, tablas y graficos.' },
  { n: '2', name: '3D', desc: 'Three.js, camara, animacion, OrbitControls.' },
  { n: '3', name: 'Actividad para ninos', desc: 'Logica de juego, drag-and-drop, UX.' },
  { n: '4', name: 'Copiar una imagen', desc: 'Vision: replicar una UI de una captura.' },
  { n: '5', name: 'Landing page', desc: 'Marketing, animaciones, responsive.' },
]

export default function View() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-20 text-slate-200">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Benchmark Lab</h1>
        </div>
        <p className="mt-3 text-slate-400">
          Un solo proyecto, un solo puerto. Cada modelo resuelve la misma tarea en su carpeta
          y vos comparas los resultados con un clic. Esta vista es la de ejemplo: la podes
          borrar cuando quieras.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <s.icon className="h-5 w-5 text-blue-400" />
              <h3 className="mt-3 font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{s.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 flex items-center gap-2 text-lg font-semibold text-white">
          <Eye className="h-5 w-5 text-blue-400" /> Los tests disponibles
        </h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
          {tests.map((t) => (
            <div
              key={t.n}
              className="flex items-center gap-4 border-b border-slate-800 bg-slate-900/40 px-5 py-3 last:border-b-0"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {t.n}
              </span>
              <span className="font-medium text-white">{t.name}</span>
              <span className="ml-auto text-right text-sm text-slate-500">{t.desc}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
          Proba los prompts tal cual: solo cambia el numero. Todo el detalle esta en{' '}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-200">prompts/</code> y el
          metodo de puntuacion en{' '}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-200">RESULTS.md</code>.
        </p>
      </div>
    </div>
  )
}
