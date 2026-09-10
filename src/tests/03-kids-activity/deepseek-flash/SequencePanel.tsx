import { useState, type DragEvent } from 'react'
import {
  ArrowUp,
  ChevronsUp,
  GripVertical,
  Play,
  RotateCcw,
  RotateCw,
  Trash2,
  X,
} from 'lucide-react'
import { INSTRUCTION_INFO, type Instruction } from './game'

const BLOCKS: Record<
  Instruction,
  { Icon: typeof ArrowUp; color: string; ring: string }
> = {
  forward: {
    Icon: ArrowUp,
    color: 'from-emerald-400 to-emerald-600',
    ring: 'ring-emerald-300',
  },
  turn: {
    Icon: RotateCw,
    color: 'from-sky-400 to-sky-600',
    ring: 'ring-sky-300',
  },
  jump: {
    Icon: ChevronsUp,
    color: 'from-violet-400 to-violet-600',
    ring: 'ring-violet-300',
  },
}

type SequencePanelProps = {
  sequence: Instruction[]
  running: boolean
  activeStep: number
  onAdd: (instruction: Instruction) => void
  onRemove: (index: number) => void
  onReorder: (from: number, to: number) => void
  onRun: () => void
  onReset: () => void
  onClear: () => void
}

export default function SequencePanel({
  sequence,
  running,
  activeStep,
  onAdd,
  onRemove,
  onReorder,
  onRun,
  onReset,
  onClear,
}: SequencePanelProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  function handleDrop(event: DragEvent<HTMLDivElement>, target: number) {
    event.preventDefault()
    if (dragIndex !== null) onReorder(dragIndex, target)
    setDragIndex(null)
    setOverIndex(null)
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <section>
        <h2 className="mb-3 text-lg font-black text-white">
          1. Elegi los bloques
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(BLOCKS) as Instruction[]).map((instruction) => {
            const { Icon, color, ring } = BLOCKS[instruction]
            const info = INSTRUCTION_INFO[instruction]
            return (
              <button
                key={instruction}
                type="button"
                disabled={running}
                onClick={() => onAdd(instruction)}
                className={`group flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b ${color} px-2 py-4 text-white shadow-lg ring-4 ${ring} transition active:scale-95 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <Icon className="h-9 w-9" strokeWidth={3} />
                <span className="text-base font-black uppercase tracking-wide">
                  {info.label}
                </span>
                <span className="text-[11px] font-semibold text-white/80">
                  {info.hint}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-black text-white">2. Tu secuencia</h2>
          <span className="rounded-full bg-slate-700 px-3 py-1 text-sm font-bold text-slate-200">
            {sequence.length} pasos
          </span>
        </div>

        <div
          className="min-h-[7.5rem] rounded-2xl border-4 border-dashed border-slate-600 bg-slate-900/60 p-3"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            if (dragIndex !== null) onReorder(dragIndex, sequence.length - 1)
            setDragIndex(null)
            setOverIndex(null)
          }}
        >
          {sequence.length === 0 ? (
            <p className="flex h-[6rem] items-center justify-center text-center text-base font-semibold text-slate-500">
              Toca los bloques de arriba para armar tu plan
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sequence.map((instruction, index) => {
                const { Icon, color } = BLOCKS[instruction]
                const isActive = running && activeStep === index
                return (
                  <div
                    key={index}
                    draggable={!running}
                    onDragStart={() => setDragIndex(index)}
                    onDragEnd={() => {
                      setDragIndex(null)
                      setOverIndex(null)
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                      setOverIndex(index)
                    }}
                    onDrop={(event) => handleDrop(event, index)}
                    className={`flex items-center gap-2 rounded-xl bg-gradient-to-b ${color} pl-2 pr-1 py-2 text-white shadow-md ring-2 transition ${
                      isActive
                        ? 'scale-110 ring-4 ring-yellow-300'
                        : 'ring-white/30'
                    } ${overIndex === index && dragIndex !== index ? 'ring-4 ring-white' : ''} ${
                      running ? '' : 'cursor-grab active:cursor-grabbing'
                    }`}
                  >
                    <GripVertical className="h-4 w-4 text-white/60" />
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/25 text-xs font-black">
                      {index + 1}
                    </span>
                    <Icon className="h-5 w-5" strokeWidth={3} />
                    <span className="text-sm font-black uppercase">
                      {INSTRUCTION_INFO[instruction].label}
                    </span>
                    <button
                      type="button"
                      disabled={running}
                      onClick={() => onRemove(index)}
                      title="Borrar bloque"
                      className="ml-1 rounded-lg bg-black/20 p-1 transition hover:bg-black/40 disabled:opacity-40"
                    >
                      <X className="h-4 w-4" strokeWidth={3} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={running || sequence.length === 0}
          onClick={onRun}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-lime-400 to-green-600 px-6 py-4 text-xl font-black uppercase tracking-wide text-white shadow-lg ring-4 ring-lime-300 transition active:scale-95 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-7 w-7" fill="currentColor" />
          {running ? 'Ejecutando...' : 'Ejecutar'}
        </button>
        <button
          type="button"
          disabled={running}
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-700 px-6 py-4 text-lg font-black uppercase text-white shadow-lg ring-4 ring-slate-500 transition active:scale-95 hover:bg-slate-600 disabled:opacity-50"
        >
          <RotateCcw className="h-6 w-6" strokeWidth={3} />
          Reiniciar
        </button>
      </div>

      {sequence.length > 0 && (
        <button
          type="button"
          disabled={running}
          onClick={onClear}
          className="mx-auto flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-rose-300 disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" />
          Borrar toda la secuencia
        </button>
      )}
    </div>
  )
}
