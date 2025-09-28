export interface Position {
  row: number
  col: number
}

export interface NQueensState {
  board: number[][]
  queens: Position[]
  currentRow: number
  isComplete: boolean
  solutionCount: number
}

export interface SolutionStep {
  board: number[][]
  queens: Position[]
  action: 'place' | 'remove' | 'check' | 'complete'
  row: number
  col: number
  message: string
  isBacktrack?: boolean
}

export type AnimationSpeed = 'slow' | 'medium' | 'fast'

export const ANIMATION_SPEEDS = {
  slow: 1000,
  medium: 500,
  fast: 200
} as const
