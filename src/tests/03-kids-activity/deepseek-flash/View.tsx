import { useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Bot, Goal, Info } from 'lucide-react'
import GameGrid from './GameGrid'
import SequencePanel from './SequencePanel'
import VictoryModal from './VictoryModal'
import {
  LEVEL,
  applyInstruction,
  buildWallSet,
  sleep,
  startPosition,
  type Instruction,
  type Position,
} from './game'

type Notice = { tone: 'info' | 'error' | 'success'; text: string }

const NOTICE_STYLE: Record<Notice['tone'], string> = {
  info: 'border-sky-400 bg-sky-950/70 text-sky-100',
  error: 'border-rose-400 bg-rose-950/80 text-rose-100',
  success: 'border-lime-400 bg-lime-950/80 text-lime-100',
}

export default function View() {
  const walls = useMemo(() => buildWallSet(LEVEL), [])
  const [sequence, setSequence] = useState<Instruction[]>([])
  const [position, setPosition] = useState<Position>(() => startPosition(LEVEL))
  const [running, setRunning] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const [blockedAt, setBlockedAt] = useState<{ x: number; y: number } | null>(null)
  const [won, setWon] = useState(false)
  const [notice, setNotice] = useState<Notice>({
    tone: 'info',
    text: 'Arma la secuencia y toca Ejecutar para llevar al robot hasta el trofeo.',
  })
  const runIdRef = useRef(0)

  useEffect(() => {
    return () => {
      runIdRef.current += 1
    }
  }, [])

  useEffect(() => {
    if (!won) return
    const burst = (ratio: number) =>
      confetti({
        particleCount: Math.round(200 * ratio),
        spread: 90,
        startVelocity: 45,
        origin: { y: 0.65 },
        colors: ['#facc15', '#34d399', '#38bdf8', '#f472b6', '#a78bfa'],
      })
    burst(1)
    const t1 = window.setTimeout(() => burst(0.6), 220)
    const t2 = window.setTimeout(() => burst(0.4), 460)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [won])

  function addInstruction(instruction: Instruction) {
    setSequence((prev) => (prev.length >= 20 ? prev : [...prev, instruction]))
    setNotice({ tone: 'info', text: 'Bloque agregado. Podes arrastrarlos para cambiar el orden.' })
  }

  function removeInstruction(index: number) {
    setSequence((prev) => prev.filter((_, i) => i !== index))
  }

  function reorder(from: number, to: number) {
    setSequence((prev) => {
      if (from === to || from < 0 || from >= prev.length) return prev
      const next = [...prev]
      const [item] = next.splice(from, 1)
      next.splice(Math.max(0, Math.min(to, next.length)), 0, item)
      return next
    })
  }

  function clearSequence() {
    setSequence([])
    setNotice({ tone: 'info', text: 'Secuencia borrada. ¡Proba de nuevo!' })
  }

  function reset() {
    runIdRef.current += 1
    setSequence([])
    setPosition(startPosition(LEVEL))
    setRunning(false)
    setActiveStep(-1)
    setBlockedAt(null)
    setWon(false)
    setNotice({
      tone: 'info',
      text: 'Arma la secuencia y toca Ejecutar para llevar al robot hasta el trofeo.',
    })
  }

  async function run() {
    if (running || sequence.length === 0) return
    const id = runIdRef.current + 1
    runIdRef.current = id
    setRunning(true)
    setWon(false)
    setBlockedAt(null)
    setActiveStep(-1)

    let current = startPosition(LEVEL)
    setPosition(current)
    setNotice({ tone: 'info', text: '¡A ejecutar! Mirando al robot...' })
    await sleep(420)
    if (id !== runIdRef.current) return

    for (let i = 0; i < sequence.length; i++) {
      if (id !== runIdRef.current) return
      setActiveStep(i)
      const outcome = applyInstruction(sequence[i], current, LEVEL, walls)
      await sleep(170)
      if (id !== runIdRef.current) return

      if (outcome.kind === 'turn') {
        current = outcome.position
        setPosition(current)
        await sleep(320)
        continue
      }

      if (outcome.kind === 'blocked') {
        setBlockedAt(outcome.at)
        setNotice({
          tone: 'error',
          text: '¡Pum! El robot choco con un obstaculo. Mira el bloque rojo y cambia tu plan.',
        })
        setRunning(false)
        return
      }

      if (outcome.kind === 'move') {
        current = outcome.position
        setPosition(current)
        await sleep(380)
        if (outcome.jumped) {
          setNotice({ tone: 'info', text: '¡Salto genial por encima del obstaculo!' })
        }
        continue
      }

      current = outcome.position
      setPosition(current)
      await sleep(420)
      setActiveStep(i)
      setNotice({ tone: 'success', text: '¡El robot llego a la meta! 🎉' })
      setWon(true)
      setRunning(false)
      return
    }

    if (id !== runIdRef.current) return
    setRunning(false)
    setActiveStep(-1)
    setNotice({
      tone: 'error',
      text: 'El robot termino la secuencia pero no llego a la meta. ¡Proba otra vez!',
    })
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-900 px-4 py-6 text-slate-100">
      <style>{`
        @keyframes bench-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px) rotate(-1deg); }
          40% { transform: translateX(8px) rotate(1deg); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes bench-pop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl">
        <header className="mb-5 flex items-center justify-center gap-3 text-center">
          <Bot className="h-10 w-10 text-sky-300" strokeWidth={2.5} />
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Robot Programador
          </h1>
          <Goal className="h-10 w-10 text-amber-300" strokeWidth={2.5} />
        </header>

        <p className="mx-auto mb-5 max-w-2xl text-center text-base font-semibold text-slate-300">
          Ordena los bloques para que el robot <span className="text-emerald-300">avance</span>,
          <span className="text-sky-300"> gire</span> y
          <span className="text-violet-300"> salte</span> los obstaculos hasta el trofeo.
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <GameGrid
            level={LEVEL}
            walls={walls}
            position={position}
            blockedAt={blockedAt}
            won={won}
            running={running}
          />

          <SequencePanel
            sequence={sequence}
            running={running}
            activeStep={activeStep}
            onAdd={addInstruction}
            onRemove={removeInstruction}
            onReorder={reorder}
            onRun={run}
            onReset={reset}
            onClear={clearSequence}
          />
        </div>

        <div
          className={`mt-5 flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-center text-base font-bold ${NOTICE_STYLE[notice.tone]}`}
        >
          <Info className="h-5 w-5 shrink-0" />
          <span>{notice.text}</span>
        </div>
      </div>

      {won && <VictoryModal steps={sequence.length} onPlayAgain={reset} />}
    </div>
  )
}
