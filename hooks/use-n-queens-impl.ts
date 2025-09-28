"use client"

import { useState, useCallback, useEffect } from "react"
import { Position, SolutionStep, NQueensState, AnimationSpeed, ANIMATION_SPEEDS } from "@/components/visualizer/n-queens/types"

export function useNQueens(boardSize: number = 8) {
  const [state, setState] = useState<NQueensState>({
    board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)),
    queens: [],
    currentRow: 0,
    isComplete: false,
    solutionCount: 0,
  })

  const [steps, setSteps] = useState<SolutionStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('medium')
  const [allSolutions, setAllSolutions] = useState<Position[][]>([])
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0)

  // when board size changes, reset board
  useEffect(() => {
    setState({
      board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)),
      queens: [],
      currentRow: 0,
      isComplete: false,
      solutionCount: 0,
    })
    setSteps([])
    setCurrentStep(-1)
    setAllSolutions([])
    setCurrentSolutionIndex(0)
    setIsAnimating(false)
    setIsPaused(false)
  }, [boardSize])

  const createBoard = useCallback((size: number) => {
    return Array(size).fill(null).map(() => Array(size).fill(0))
  }, [])

  const isSafe = useCallback((board: number[][], row: number, col: number, size: number) => {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
      if (board[i][j] === 1) return false
    }
    return true
  }, [])

  const getAttackedSquares = useCallback((queens: Position[], size: number) => {
    const attacked = new Set<string>()
    queens.forEach(queen => {
      for (let i = 0; i < size; i++) {
        attacked.add(`${queen.row}-${i}`)
        attacked.add(`${i}-${queen.col}`)
      }
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (Math.abs(i - queen.row) === Math.abs(j - queen.col)) {
            attacked.add(`${i}-${j}`)
          }
        }
      }
    })
    return attacked
  }, [])

  const solveNQueensRecursive = useCallback((
    board: number[][],
    row: number,
    size: number,
    solutions: Position[][],
    currentSolution: Position[],
    stepList: SolutionStep[]
  ): boolean => {
    if (row === size) {
      solutions.push([...currentSolution])
      stepList.push({
        board: board.map(r => [...r]),
        queens: [...currentSolution],
        action: 'complete',
        row: row - 1,
        col: 0,
        message: `Solution ${solutions.length} found! All ${size} queens placed successfully.`
      })
      return true
    }

    let foundSolution = false

    for (let col = 0; col < size; col++) {
      stepList.push({
        board: board.map(r => [...r]),
        queens: [...currentSolution],
        action: 'check',
        row,
        col,
        message: `Checking row ${row + 1}, column ${String.fromCharCode(65 + col)}`
      })

      if (isSafe(board, row, col, size)) {
        board[row][col] = 1
        currentSolution.push({ row, col })
        stepList.push({
          board: board.map(r => [...r]),
          queens: [...currentSolution],
          action: 'place',
          row,
          col,
          message: `Placed queen at row ${row + 1}, column ${String.fromCharCode(65 + col)}. Moving to next row.`
        })

        const result = solveNQueensRecursive(board, row + 1, size, solutions, currentSolution, stepList)
        foundSolution = foundSolution || result

        board[row][col] = 0
        currentSolution.pop()
        if (row < size - 1 || col < size - 1) {
          stepList.push({
            board: board.map(r => [...r]),
            queens: [...currentSolution],
            action: 'remove',
            row,
            col,
            message: `Backtracking from row ${row + 1}, column ${String.fromCharCode(65 + col)}`,
            isBacktrack: true,
          })
        }
      }
    }

    return foundSolution
  }, [isSafe])

  const solve = useCallback(async (findAllSolutions: boolean = false) => {
    if (isAnimating) return

    const newBoard = createBoard(boardSize)
    const solutions: Position[][] = []
    const newSteps: SolutionStep[] = []

    setIsAnimating(true)
    setIsPaused(false)
    setSteps([])
    setCurrentStep(-1)
    setAllSolutions([])
    setCurrentSolutionIndex(0)

    solveNQueensRecursive(newBoard, 0, boardSize, solutions, [], newSteps)

    setSteps(newSteps)
    setAllSolutions(solutions)

    for (let i = 0; i < newSteps.length; i++) {
      while (isPaused) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEEDS[animationSpeed]))

      setCurrentStep(i)
      setState({
        board: newSteps[i].board,
        queens: newSteps[i].queens,
        currentRow: newSteps[i].row,
        isComplete: newSteps[i].action === 'complete',
        solutionCount: solutions.length,
      })

      if (!findAllSolutions && newSteps[i].action === 'complete') {
        break
      }
    }

    setIsAnimating(false)
  }, [boardSize, isAnimating, animationSpeed, createBoard, solveNQueensRecursive, isPaused])

  const reset = useCallback(() => {
    if (isAnimating) return
    setState({
      board: createBoard(boardSize),
      queens: [],
      currentRow: 0,
      isComplete: false,
      solutionCount: 0,
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
      setState(prev => ({
        ...prev,
        queens: allSolutions[index],
        isComplete: true,
      }))
    }
  }, [allSolutions])

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      setState({
        board: steps[nextStep].board,
        queens: steps[nextStep].queens,
        currentRow: steps[nextStep].row,
        isComplete: steps[nextStep].action === 'complete',
        solutionCount: allSolutions.length,
      })
    }
  }, [currentStep, steps, allSolutions.length])

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      setState({
        board: steps[prevStep].board,
        queens: steps[prevStep].queens,
        currentRow: steps[prevStep].row,
        isComplete: steps[prevStep].action === 'complete',
        solutionCount: allSolutions.length,
      })
    }
  }, [currentStep, steps, allSolutions.length])

  const checkSafe = useCallback((row: number, col: number) => {
    return isSafe(state.board, row, col, state.board.length)
  }, [isSafe, state.board])

  const placeQueen = useCallback((row: number, col: number) => {
    if (isAnimating) return { ok: false, reason: 'Animation in progress' as const }
    if (!checkSafe(row, col)) return { ok: false, reason: 'Unsafe position' as const }
    if (state.board[row][col] === 1) return { ok: false, reason: 'Already placed' as const }

    const newBoard = state.board.map(r => [...r])
    newBoard[row][col] = 1
    const newQueens = [...state.queens, { row, col }]
    setState(prev => ({
      ...prev,
      board: newBoard,
      queens: newQueens,
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
    return { ok: true as const }
  }, [isAnimating, checkSafe, state.board, state.queens])

  const removeQueen = useCallback((row: number, col: number) => {
    if (isAnimating) return { ok: false, reason: 'Animation in progress' as const }
    if (state.board[row][col] !== 1) return { ok: false, reason: 'No queen here' as const }

    const newBoard = state.board.map(r => [...r])
    newBoard[row][col] = 0
    const newQueens = state.queens.filter(q => !(q.row === row && q.col === col))
    setState(prev => ({
      ...prev,
      board: newBoard,
      queens: newQueens,
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
    return { ok: true as const }
  }, [isAnimating, state.board, state.queens])

  const pause = useCallback(() => { if (isAnimating) setIsPaused(true) }, [isAnimating])
  const resume = useCallback(() => { if (isAnimating) setIsPaused(false) }, [isAnimating])

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
    checkSafe,
    placeQueen,
    removeQueen,
    pause,
    resume,
  }
}
