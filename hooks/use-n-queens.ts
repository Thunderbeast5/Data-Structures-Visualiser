"use client"

import { useState, useCallback } from "react"
import { Position, SolutionStep, NQueensState, AnimationSpeed, ANIMATION_SPEEDS } from "@/components/visualizer/n-queens/types"

export function useNQueens(boardSize: number = 8) {
  const [state, setState] = useState<NQueensState>({
    board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)),
    queens: [],
    currentRow: 0,
    isComplete: false,
  const [steps, setSteps] = useState<SolutionStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('medium')
  const [allSolutions, setAllSolutions] = useState<Position[][]>([])
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0)

  const createBoard = useCallback((size: number) => {
{{ ... }}
    const newBoard = createBoard(boardSize)
    const solutions: Position[][] = []
    const newSteps: SolutionStep[] = []

    setIsAnimating(true)
    setIsPaused(false)
    setSteps([])
    setCurrentStep(-1)
    setAllSolutions([])
    setCurrentSolutionIndex(0)

    // Solve the problem
    solveNQueensRecursive(newBoard, 0, boardSize, solutions, [], newSteps)

    setSteps(newSteps)
    setAllSolutions(solutions)

    // Animate through steps
    for (let i = 0; i < newSteps.length; i++) {
      // Handle pause
      while (isPaused) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEEDS[animationSpeed]))
      
      setCurrentStep(i)
      setState({
        board: newSteps[i].board,
{{ ... }}
        break
      }
    }

    setIsAnimating(false)
  }, [boardSize, isAnimating, animationSpeed, createBoard, solveNQueensRecursive, isPaused])

  const reset = useCallback(() => {
    if (isAnimating) return
    
    setState({
{{ ... }}
    })
    setSteps([])
    setCurrentStep(-1)
    setAllSolutions([])
    setCurrentSolutionIndex(0)
    setIsPaused(false)
  }, [boardSize, isAnimating, createBoard])

  const showSolution = useCallback((index: number) => {
    if (index >= 0 && index < allSolutions.length) {
      setCurrentSolutionIndex(index)
{{ ... }}
        solutionCount: allSolutions.length
      })
    }
  }, [currentStep, steps, allSolutions.length])

  // Interactive mode helpers
  const checkSafe = useCallback((row: number, col: number) => {
    return isSafe(state.board, row, col, state.board.length)
  }, [isSafe, state.board])

  const placeQueen = useCallback((row: number, col: number) => {
    if (isAnimating) return { ok: false, reason: 'Animation in progress' }
    if (!checkSafe(row, col)) return { ok: false, reason: 'Unsafe position' }
    if (state.board[row][col] === 1) return { ok: false, reason: 'Already placed' }

    const newBoard = state.board.map(r => [...r])
    newBoard[row][col] = 1
    const newQueens = [...state.queens, { row, col }]
    setState(prev => ({
      ...prev,
      board: newBoard,
      queens: newQueens
    }))
    setSteps(prev => ([...prev, {
      board: newBoard,
      queens: newQueens,
      action: 'place',
      row,
      col,
      message: `Placed queen at row ${row + 1}, column ${String.fromCharCode(65 + col)} (manual)`
    }]))
    setCurrentStep(prev => prev + 1)
    return { ok: true }
  }, [isAnimating, checkSafe, state.board, state.queens])

  const removeQueen = useCallback((row: number, col: number) => {
    if (isAnimating) return { ok: false, reason: 'Animation in progress' }
    if (state.board[row][col] !== 1) return { ok: false, reason: 'No queen here' }

    const newBoard = state.board.map(r => [...r])
    newBoard[row][col] = 0
    const newQueens = state.queens.filter(q => !(q.row === row && q.col === col))
    setState(prev => ({
      ...prev,
      board: newBoard,
      queens: newQueens
    }))
    setSteps(prev => ([...prev, {
      board: newBoard,
      queens: newQueens,
      action: 'remove',
      row,
      col,
      message: `Removed queen from row ${row + 1}, column ${String.fromCharCode(65 + col)} (manual)`
    }]))
    setCurrentStep(prev => prev + 1)
    return { ok: true }
  }, [isAnimating, state.board, state.queens])

  const pause = useCallback(() => {
    if (isAnimating) setIsPaused(true)
  }, [isAnimating])

  const resume = useCallback(() => {
    if (isAnimating) setIsPaused(false)
  }, [isAnimating])

  return {
    state,
    steps,
    currentStep,
    isAnimating,
    isPaused,
    animationSpeed,
    allSolutions,
    currentSolutionIndex,
    solve,
    reset,
    showSolution,
    stepForward,
    stepBackward,
    setAnimationSpeed,
    getAttackedSquares,
    // interactive
    checkSafe,
    placeQueen,
    removeQueen,
    pause,
    resume
  }
}
