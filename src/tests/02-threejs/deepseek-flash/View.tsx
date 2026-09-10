import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { createPlanetScene, type PlanetSceneHandle } from './planetScene'

export default function View() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<PlanetSceneHandle | null>(null)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handle = createPlanetScene(container)
    sceneRef.current = handle

    return () => {
      sceneRef.current = null
      handle.dispose()
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.setPaused(!running)
  }, [running])

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#05060f]">
      <div ref={containerRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute left-5 top-5 z-30 space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-indigo-300/80">
          Aurora Prime
        </p>
        <p className="text-xs text-slate-400">1 planet · 1 ring · 5 moons</p>
      </div>

      <p className="pointer-events-none absolute bottom-7 left-6 z-30 hidden text-xs text-slate-500 sm:block">
        Drag to orbit · Scroll to zoom
      </p>

      <button
        type="button"
        onClick={() => setRunning((value) => !value)}
        aria-pressed={running}
        className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-slate-900/75 px-5 py-2.5 text-sm font-medium text-slate-100 shadow-xl backdrop-blur transition hover:border-indigo-400/60 hover:bg-slate-800/80 active:scale-95"
      >
        {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {running ? 'Pause rotation' : 'Resume rotation'}
      </button>
    </div>
  )
}
