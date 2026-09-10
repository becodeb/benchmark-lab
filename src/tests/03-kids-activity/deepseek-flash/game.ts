export type Direction = 0 | 1 | 2 | 3

export type Instruction = 'forward' | 'turn' | 'jump'

export const DIRECTIONS = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
] as const

export const INSTRUCTION_INFO: Record<
  Instruction,
  { label: string; hint: string }
> = {
  forward: { label: 'Avanzar', hint: 'Mueve 1 casilla' },
  turn: { label: 'Girar', hint: 'Gira a la derecha' },
  jump: { label: 'Saltar', hint: 'Salta 2 casillas' },
}

export type Level = {
  size: number
  start: { x: number; y: number; dir: Direction }
  goal: { x: number; y: number }
  walls: ReadonlyArray<{ x: number; y: number }>
}

export const LEVEL: Level = {
  size: 5,
  start: { x: 0, y: 0, dir: 1 },
  goal: { x: 4, y: 4 },
  walls: [
    { x: 2, y: 2 },
    { x: 4, y: 2 },
  ],
}

export const cellKey = (x: number, y: number) => `${x},${y}`

export function buildWallSet(level: Level): Set<string> {
  return new Set(level.walls.map((w) => cellKey(w.x, w.y)))
}

export type Position = { x: number; y: number; dir: Direction }

export function startPosition(level: Level): Position {
  return { x: level.start.x, y: level.start.y, dir: level.start.dir }
}

export type StepOutcome =
  | { kind: 'turn'; position: Position }
  | { kind: 'move'; position: Position; jumped: boolean }
  | { kind: 'blocked'; position: Position; at: { x: number; y: number } }
  | { kind: 'won'; position: Position }

export function applyInstruction(
  instruction: Instruction,
  position: Position,
  level: Level,
  walls: Set<string>,
): StepOutcome {
  if (instruction === 'turn') {
    const dir = ((position.dir + 1) % 4) as Direction
    return { kind: 'turn', position: { ...position, dir } }
  }

  const distance = instruction === 'jump' ? 2 : 1
  const { dx, dy } = DIRECTIONS[position.dir]
  const x = position.x + dx * distance
  const y = position.y + dy * distance
  const inBounds = x >= 0 && y >= 0 && x < level.size && y < level.size

  if (!inBounds || walls.has(cellKey(x, y))) {
    return { kind: 'blocked', position, at: { x, y } }
  }

  const moved: Position = { ...position, x, y }
  if (x === level.goal.x && y === level.goal.y) {
    return { kind: 'won', position: moved }
  }
  return { kind: 'move', position: moved, jumped: instruction === 'jump' }
}

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
