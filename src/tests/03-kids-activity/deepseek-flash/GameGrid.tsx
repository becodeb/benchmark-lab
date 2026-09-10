import { Mountain, Trophy } from 'lucide-react'
import { cellKey, type Level, type Position } from './game'

type GameGridProps = {
  level: Level
  walls: Set<string>
  position: Position
  blockedAt: { x: number; y: number } | null
  won: boolean
  running: boolean
}

export default function GameGrid({
  level,
  walls,
  position,
  blockedAt,
  won,
  running,
}: GameGridProps) {
  const cells = Array.from({ length: level.size * level.size }, (_, index) => {
    const x = index % level.size
    const y = Math.floor(index / level.size)
    return { x, y, id: index }
  })

  const cellPercent = 100 / level.size

  return (
    <div className="relative mx-auto w-full max-w-[30rem] select-none">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] border-4 border-white bg-emerald-200 shadow-2xl shadow-emerald-900/20"
        style={blockedAt ? { animation: 'bench-shake 0.45s ease-in-out' } : undefined}
      >
        <div
          className="grid h-full w-full"
          style={{ gridTemplateColumns: `repeat(${level.size}, minmax(0, 1fr))` }}
        >
          {cells.map(({ x, y, id }) => {
            const isWall = walls.has(cellKey(x, y))
            const isGoal = level.goal.x === x && level.goal.y === y
            const isBlocked = blockedAt?.x === x && blockedAt?.y === y
            const tone = (x + y) % 2 === 0 ? 'bg-emerald-50' : 'bg-emerald-100'

            return (
              <div
                key={id}
                className={`relative flex items-center justify-center border border-white/70 ${
                  isGoal ? 'bg-gradient-to-br from-amber-200 to-yellow-300' : tone
                } ${isBlocked ? 'bg-rose-300' : ''}`}
              >
                {isWall && (
                  <div className="flex h-[82%] w-[82%] items-center justify-center rounded-xl bg-gradient-to-b from-stone-500 to-stone-700 shadow-inner ring-2 ring-stone-800/30">
                    <Mountain className="h-[62%] w-[62%] text-stone-200" strokeWidth={2.4} />
                  </div>
                )}
                {isGoal && !isWall && (
                  <div className="flex h-[70%] w-[70%] flex-col items-center justify-center rounded-full bg-white/60 shadow-inner ring-4 ring-amber-400/70">
                    <Trophy className="h-[80%] w-[80%] text-amber-500" strokeWidth={2.6} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div
          className="pointer-events-none absolute z-20"
          style={{
            left: `${position.x * cellPercent}%`,
            top: `${position.y * cellPercent}%`,
            width: `${cellPercent}%`,
            height: `${cellPercent}%`,
            transition: running ? 'left 360ms ease, top 360ms ease' : 'none',
          }}
        >
          <div
            className="flex h-full w-full items-center justify-center p-[11%]"
            style={{
              transform: `rotate(${position.dir * 90}deg)`,
              transition: 'transform 320ms ease',
            }}
          >
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg ring-4 ring-white">
              <div className="absolute -top-[16%] h-[30%] w-[30%] rotate-45 rounded-md bg-yellow-300 ring-2 ring-yellow-500/60" />
              <div className="flex gap-[16%]">
                <span className="h-[16%] w-[16%] rounded-full bg-white shadow" />
                <span className="h-[16%] w-[16%] rounded-full bg-white shadow" />
              </div>
            </div>
          </div>
        </div>

        {won && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-yellow-300/30">
            <span className="text-6xl drop-shadow-lg">🏆</span>
          </div>
        )}
      </div>
    </div>
  )
}
