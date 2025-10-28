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
    maze: generateMaze(mazeSize),
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

  // Reset when maze size changes
  useEffect(() => {
    setState({
      maze: generateMaze(mazeSize),
      path: [],
      currentPosition: { row: 0, col: 0 },
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
  }, [mazeSize])

  // Generate a deterministic maze with walls and paths (no random values)
  function generateMaze(size: number): number[][] {
    const maze = Array(size).fill(null).map(() => Array(size).fill(0))
    
    // Create a deterministic pattern of walls
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Don't block start or end positions
        if ((i === 0 && j === 0) || (i === size - 1 && j === size - 1)) {
          maze[i][j] = 0 // Keep as path
        } else {
          // Create a deterministic pattern based on position
          // This creates walls in a checkerboard-like pattern with some modifications
          const isWall = (i + j) % 3 === 0 && i % 2 === 1 && j % 2 === 1
          maze[i][j] = isWall ? 1 : 0
        }
      }
    }
    
    // Ensure there's always a clear path along the edges
    for (let i = 0; i < size; i++) {
      maze[i][0] = 0 // Left edge
      maze[0][i] = 0 // Top edge
    }
    
    // Add some strategic walls for interesting paths
    if (size > 5) {
      maze[2][2] = 1
      maze[3][4] = 1
      if (size > 8) {
        maze[5][3] = 1
        maze[4][6] = 1
      }
    }
    
    return maze
  }

  const isValidMove = useCallback((maze: number[][], row: number, col: number, visited: boolean[][]) => {
    const size = maze.length
    return (
      row >= 0 && row < size &&
      col >= 0 && col < size &&
      maze[row][col] === 0 && // Not a wall
      !visited[row][col] // Not already visited
    )
  }, [])

  const getVisitedCells = useCallback((path: Position[], size: number) => {
    const visited = new Set<string>()
    path.forEach(pos => {
      visited.add(`${pos.row}-${pos.col}`)
    })
    return visited
  }, [])

  const addRecursionCall = useCallback((row: number, col: number, action: string, depth: number) => {
    const call: RecursionCall = {
      id: `call-${row}-${col}-${depth}-${recursionStack.length}`,
      row,
      col,
      depth,
      action,
      timestamp: 0 // Use deterministic value
    }
    
    setRecursionStack(prev => [...prev, call])
  }, [recursionStack.length])

  const removeRecursionCall = useCallback(() => {
    setRecursionStack(prev => prev.slice(0, -1))
  }, [])

  const solveMazeRecursive = useCallback((
    maze: number[][],
    row: number,
    col: number,
    endRow: number,
    endCol: number,
    visited: boolean[][],
    path: Position[],
    stepList: BacktrackingStep[],
    depth: number = 0
  ): boolean => {
    const size = maze.length

    // Base case: reached destination
    if (row === endRow && col === endCol) {
      path.push({ row, col })
      stepList.push({
        maze: maze.map(r => [...r]),
        path: [...path],
        action: 'complete',
        row,
        col,
        message: `Success! Reached destination at (${row}, ${col})`,
        recursionDepth: depth,
        codeLineIndex: 2 // "return true" line
      })
      return true
    }

    // Check if current position is valid
    if (!isValidMove(maze, row, col, visited)) {
      stepList.push({
        maze: maze.map(r => [...r]),
        path: [...path],
        action: 'blocked',
        row,
        col,
        message: `Blocked at (${row}, ${col}) - invalid move`,
        isValid: false,
        recursionDepth: depth,
        codeLineIndex: 3 // "if isValidMove" line
      })
      return false
    }

    // Mark current cell as visited and add to path
    visited[row][col] = true
    path.push({ row, col })
    
    stepList.push({
      maze: maze.map(r => [...r]),
      path: [...path],
      action: 'move',
      row,
      col,
      message: `Moving to (${row}, ${col}) - exploring path`,
      recursionDepth: depth,
      codeLineIndex: 4 // "solution[x][y] = 1" line
    })

    // Try all 4 directions: right, down, left, up
    const directions = [
      { dr: 0, dc: 1, name: 'right' },   // right
      { dr: 1, dc: 0, name: 'down' },    // down  
      { dr: 0, dc: -1, name: 'left' },   // left
      { dr: -1, dc: 0, name: 'up' }      // up
    ]

    for (const dir of directions) {
      const newRow = row + dir.dr
      const newCol = col + dir.dc
      
      stepList.push({
        maze: maze.map(r => [...r]),
        path: [...path],
        action: 'check',
        row: newRow,
        col: newCol,
        message: `Checking ${dir.name} direction: (${newRow}, ${newCol})`,
        isValid: isValidMove(maze, newRow, newCol, visited),
        recursionDepth: depth,
        codeLineIndex: 6 // recursive call lines
      })

      if (solveMazeRecursive(maze, newRow, newCol, endRow, endCol, visited, path, stepList, depth + 1)) {
        return true
      }
    }

    // Backtrack: remove current cell from path
    visited[row][col] = false
    path.pop()
    
    stepList.push({
      maze: maze.map(r => [...r]),
      path: [...path],
      action: 'backtrack',
      row,
      col,
      message: `Backtracking from (${row}, ${col}) - no solution found`,
      recursionDepth: depth,
      codeLineIndex: 11 // "solution[x][y] = 0" line
    })

    return false
  }, [isValidMove])

  const solve = useCallback(async (findAll: boolean = false) => {
    if (isAnimating) return

    const maze = state.maze
    const size = maze.length
    const visited = Array(size).fill(null).map(() => Array(size).fill(false))
    const path: Position[] = []
    const stepList: BacktrackingStep[] = []
    const solutions: Position[][] = []

    // Add initial step
    stepList.push({
      maze: maze.map(r => [...r]),
      path: [],
      action: 'check',
      row: 0,
      col: 0,
      message: `Starting maze solver from (0, 0) to (${size-1}, ${size-1})`,
      recursionDepth: 0,
      codeLineIndex: 0 // Function start
    })

    solveMazeRecursive(maze, 0, 0, size - 1, size - 1, visited, path, stepList)

    if (path.length > 0) {
      solutions.push([...path])
    }

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
      if (step.action === 'move') {
        addRecursionCall(step.row, step.col, `Exploring (${step.row}, ${step.col})`, step.recursionDepth)
      } else if (step.action === 'backtrack') {
        removeRecursionCall()
      }

      // Update state
      setState({
        maze: stepList[i].maze,
        path: stepList[i].path,
        currentPosition: { row: stepList[i].row, col: stepList[i].col },
        isComplete: stepList[i].action === 'complete',
        solutionCount: solutions.length,
        recursionDepth: stepList[i].recursionDepth,
      })

      await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEEDS[animationSpeed]))
    }

    setIsAnimating(false)
    animationCancelRef.current = null
  }, [state.maze, isAnimating, animationSpeed, solveMazeRecursive, addRecursionCall, removeRecursionCall])

  const reset = useCallback(() => {
    if (animationCancelRef.current) {
      animationCancelRef.current()
    }
    
    setState({
      maze: generateMaze(mazeSize),
      path: [],
      currentPosition: { row: 0, col: 0 },
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
  }, [mazeSize])

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      setStepCounter(nextStep + 1)
      setCurrentCodeLine(steps[nextStep].codeLineIndex)
      
      setState({
        maze: steps[nextStep].maze,
        path: steps[nextStep].path,
        currentPosition: { row: steps[nextStep].row, col: steps[nextStep].col },
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
        maze: steps[prevStep].maze,
        path: steps[prevStep].path,
        currentPosition: { row: steps[prevStep].row, col: steps[prevStep].col },
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
      
      setState(prev => ({
        ...prev,
        path: solution,
        isComplete: true,
      }))
    }
  }, [allSolutions])

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
    getVisitedCells,
    pause,
    resume,
  }
}
