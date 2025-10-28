"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { 
  Position, 
  BacktrackingStep, 
  BacktrackingState, 
  AnimationSpeed, 
  ANIMATION_SPEEDS,
  RecursionCall 
} from "@/components/visualizer/backtracking/types"

export function useBacktracking(mazeSize: number = 10) {
  const [state, setState] = useState<BacktrackingState>({
    maze: Array(mazeSize).fill(null).map(() => Array(mazeSize).fill(0)),
    path: [],
    currentPosition: { row: 0, col: 0 },
    isComplete: false,
    solutionCount: 0,
    recursionDepth: 0,
  })

  const [steps, setSteps] = useState<BacktrackingStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(false)
  const animationCancelRef = useRef<(() => void) | null>(null)
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('medium')
  const [allSolutions, setAllSolutions] = useState<Position[][]>([])
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0)
  const [stepCounter, setStepCounter] = useState(0)
  const [recursionStack, setRecursionStack] = useState<RecursionCall[]>([])
  const [currentCodeLine, setCurrentCodeLine] = useState(-1)

  // Reset when board size changes
  useEffect(() => {
    setState({
      board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)),
      queens: [],
      currentRow: 0,
      isComplete: false,
      solutionCount: 0,
      recursionDepth: 0,
    })
    setSteps([])
    setCurrentStep(-1)
    setAllSolutions([])
    setCurrentSolutionIndex(0)
    setStepCounter(0)
    setRecursionStack([])
    setCurrentCodeLine(-1)
    setIsAnimating(false)
    setIsPaused(false)
  }, [boardSize])

  const createBoard = useCallback((size: number) => {
    return Array(size).fill(null).map(() => Array(size).fill(0))
  }, [])

  const isSafe = useCallback((board: number[][], row: number, col: number, size: number) => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false
    }
    
    // Check diagonal (top-left to bottom-right)
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false
    }
    
    // Check diagonal (top-right to bottom-left)
    for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
      if (board[i][j] === 1) return false
    }
    
    return true
  }, [])

  const getConflictSquares = useCallback((queens: Position[], size: number) => {
    const conflicts = new Set<string>()
    
    queens.forEach(queen => {
      // Mark attacked squares
      for (let i = 0; i < size; i++) {
        // Same row and column
        conflicts.add(`${queen.row}-${i}`)
        conflicts.add(`${i}-${queen.col}`)
        
        // Diagonals
        for (let j = 0; j < size; j++) {
          if (Math.abs(i - queen.row) === Math.abs(j - queen.col)) {
            conflicts.add(`${i}-${j}`)
          }
        }
      }
    })
    
    return conflicts
  }, [])

  const addRecursionCall = useCallback((row: number, col: number, action: string, depth: number) => {
    const call: RecursionCall = {
      id: `${Date.now()}-${Math.random()}`,
      row,
      col,
      depth,
      action,
      timestamp: Date.now()
    }
    
    setRecursionStack(prev => [...prev, call])
  }, [])

  const removeRecursionCall = useCallback(() => {
    setRecursionStack(prev => prev.slice(0, -1))
  }, [])

  const solveNQueensRecursive = useCallback((
    board: number[][],
    row: number,
    size: number,
    solutions: Position[][],
    currentSolution: Position[],
    stepList: BacktrackingStep[],
    findAll: boolean = false,
    depth: number = 0
  ): boolean => {
    // Base case: all queens placed
    if (row === size) {
      solutions.push([...currentSolution])
      stepList.push({
        board: board.map(r => [...r]),
        queens: [...currentSolution],
        action: 'complete',
        row: row - 1,
        col: 0,
        message: `Solution ${solutions.length} found! All ${size} queens placed successfully.`,
        recursionDepth: depth,
        codeLineIndex: 2 // "return true" line
      })
      return true
    }

    let foundSolution = false

    // Try placing queen in each column of current row
    for (let col = 0; col < size; col++) {
      // Check if placement is safe
      stepList.push({
        board: board.map(r => [...r]),
        queens: [...currentSolution],
        action: 'check',
        row,
        col,
        message: `Checking if queen can be placed at row ${row + 1}, column ${String.fromCharCode(65 + col)}`,
        isValid: isSafe(board, row, col, size),
        recursionDepth: depth,
        codeLineIndex: 4 // "if isSafe" line
      })

      if (isSafe(board, row, col, size)) {
        // Place queen
        board[row][col] = 1
        currentSolution.push({ row, col })
        
        stepList.push({
          board: board.map(r => [...r]),
          queens: [...currentSolution],
          action: 'place',
          row,
          col,
          message: `Placed queen at row ${row + 1}, column ${String.fromCharCode(65 + col)}. Moving to next row.`,
          recursionDepth: depth,
          codeLineIndex: 5 // "board[row][col] = 1" line
        })

        // Recursive call
        if (solveNQueensRecursive(board, row + 1, size, solutions, currentSolution, stepList, findAll, depth + 1)) {
          foundSolution = true
          if (!findAll) return true
        }

        // Backtrack
        board[row][col] = 0
        currentSolution.pop()
        
        stepList.push({
          board: board.map(r => [...r]),
          queens: [...currentSolution],
          action: 'backtrack',
          row,
          col,
          message: `Backtracking: Removed queen from row ${row + 1}, column ${String.fromCharCode(65 + col)}`,
          recursionDepth: depth,
          codeLineIndex: 8 // "board[row][col] = 0" line
        })
      } else {
        stepList.push({
          board: board.map(r => [...r]),
          queens: [...currentSolution],
          action: 'remove',
          row,
          col,
          message: `Cannot place queen at row ${row + 1}, column ${String.fromCharCode(65 + col)} - conflicts detected`,
          isValid: false,
          recursionDepth: depth,
          codeLineIndex: 4 // Still on "if isSafe" line
        })
      }
    }

    return foundSolution
  }, [isSafe])

  const solve = useCallback(async (findAll: boolean = false) => {
    if (isAnimating) return

    const board = createBoard(boardSize)
    const solutions: Position[][] = []
    const stepList: BacktrackingStep[] = []

    // Add initial step
    stepList.push({
      board: board.map(r => [...r]),
      queens: [],
      action: 'check',
      row: 0,
      col: 0,
      message: `Starting N-Queens solver for ${boardSize}×${boardSize} board`,
      recursionDepth: 0,
      codeLineIndex: 0 // Function start
    })

    solveNQueensRecursive(board, 0, boardSize, solutions, [], stepList, findAll)

    setSteps(stepList)
    setAllSolutions(solutions)
    setCurrentSolutionIndex(0)
    setCurrentStep(-1)
    setIsAnimating(true)
    setIsPaused(false)
    isPausedRef.current = false

    // Animate through steps
    let cancelled = false
    animationCancelRef.current = () => { cancelled = true }

    for (let i = 0; i < stepList.length; i++) {
      if (cancelled) break

      while (isPausedRef.current && !cancelled) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      if (cancelled) break

      setCurrentStep(i)
      setStepCounter(i + 1)
      setCurrentCodeLine(stepList[i].codeLineIndex)
      
      // Update recursion stack based on step
      const step = stepList[i]
      if (step.action === 'place') {
        addRecursionCall(step.row, step.col, `Trying row ${step.row + 1}`, step.recursionDepth)
      } else if (step.action === 'backtrack') {
        removeRecursionCall()
      }

      // Update state
      setState({
        board: stepList[i].board,
        queens: stepList[i].queens,
        currentRow: stepList[i].row,
        isComplete: stepList[i].action === 'complete',
        solutionCount: solutions.length,
        recursionDepth: stepList[i].recursionDepth,
      })

      await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEEDS[animationSpeed]))
    }

    setIsAnimating(false)
    animationCancelRef.current = null
  }, [boardSize, isAnimating, animationSpeed, createBoard, solveNQueensRecursive, addRecursionCall, removeRecursionCall])

  const reset = useCallback(() => {
    if (animationCancelRef.current) {
      animationCancelRef.current()
    }
    
    setState({
      board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)),
      queens: [],
      currentRow: 0,
      isComplete: false,
      solutionCount: 0,
      recursionDepth: 0,
    })
    setSteps([])
    setCurrentStep(-1)
    setAllSolutions([])
    setCurrentSolutionIndex(0)
    setStepCounter(0)
    setRecursionStack([])
    setCurrentCodeLine(-1)
    setIsAnimating(false)
    setIsPaused(false)
    isPausedRef.current = false
  }, [boardSize])

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      setStepCounter(nextStep + 1)
      setCurrentCodeLine(steps[nextStep].codeLineIndex)
      
      setState({
        board: steps[nextStep].board,
        queens: steps[nextStep].queens,
        currentRow: steps[nextStep].row,
        isComplete: steps[nextStep].action === 'complete',
        solutionCount: allSolutions.length,
        recursionDepth: steps[nextStep].recursionDepth,
      })
    }
  }, [currentStep, steps, allSolutions.length])

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      setStepCounter(prevStep + 1)
      setCurrentCodeLine(steps[prevStep].codeLineIndex)
      
      setState({
        board: steps[prevStep].board,
        queens: steps[prevStep].queens,
        currentRow: steps[prevStep].row,
        isComplete: steps[prevStep].action === 'complete',
        solutionCount: allSolutions.length,
        recursionDepth: steps[prevStep].recursionDepth,
      })
    }
  }, [currentStep, steps, allSolutions.length])

  const showSolution = useCallback((index: number) => {
    if (index >= 0 && index < allSolutions.length) {
      setCurrentSolutionIndex(index)
      const solution = allSolutions[index]
      const board = createBoard(boardSize)
      
      solution.forEach(queen => {
        board[queen.row][queen.col] = 1
      })
      
      setState(prev => ({
        ...prev,
        board,
        queens: solution,
        isComplete: true,
      }))
    }
  }, [allSolutions, boardSize, createBoard])

  const pause = useCallback(() => {
    setIsPaused(true)
    isPausedRef.current = true
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
    isPausedRef.current = false
  }, [])

  return {
    state,
    steps,
    currentStep,
    isAnimating,
    isPaused,
    animationSpeed,
    stepCounter,
    recursionStack,
    currentCodeLine,
    allSolutions,
    currentSolutionIndex,
    solve,
    reset,
    showSolution,
    stepForward,
    stepBackward,
    setAnimationSpeed,
    getConflictSquares,
    pause,
    resume,
  }
}
