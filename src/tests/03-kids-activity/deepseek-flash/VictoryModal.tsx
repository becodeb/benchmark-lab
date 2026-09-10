import { RotateCcw, Sparkles, Star, Trophy } from 'lucide-react'

type VictoryModalProps = {
  steps: number
  onPlayAgain: () => void
}

export default function VictoryModal({ steps, onPlayAgain }: VictoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-[bench-pop_0.35s_ease-out] rounded-[2rem] border-4 border-yellow-300 bg-gradient-to-b from-yellow-50 to-amber-100 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-lg ring-8 ring-yellow-200">
          <Trophy className="h-14 w-14 text-white" strokeWidth={2.5} />
        </div>

        <h2 className="mt-5 text-4xl font-black tracking-tight text-amber-900">
          ¡Ganaste!
        </h2>
        <p className="mt-2 text-lg font-bold text-amber-800">
          El robot llego a la meta usando {steps}{' '}
          {steps === 1 ? 'bloque' : 'bloques'}.
        </p>

        <div className="mt-4 flex justify-center gap-2 text-amber-400">
          <Star className="h-7 w-7" fill="currentColor" />
          <Star className="h-9 w-9 -translate-y-1" fill="currentColor" />
          <Star className="h-7 w-7" fill="currentColor" />
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-amber-700">
          <Sparkles className="h-4 w-4" />
          Podes intentarlo con menos bloques
        </p>

        <button
          type="button"
          onClick={onPlayAgain}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-lime-400 to-green-600 px-6 py-4 text-xl font-black uppercase tracking-wide text-white shadow-lg ring-4 ring-lime-300 transition active:scale-95 hover:brightness-110"
        >
          <RotateCcw className="h-6 w-6" strokeWidth={3} />
          Jugar otra vez
        </button>
      </div>
    </div>
  )
}
