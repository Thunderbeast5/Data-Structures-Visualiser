"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useMemo, useState } from "react"
import { useNQueens } from "@/hooks/use-n-queens-impl"
import { NQueensBoard } from "./n-queens-board"
import { SolutionSteps } from "./solution-steps"
import { AnimationSpeed } from "./types"
import { 
  Play, 
  Square, 
  SkipForward, 
  SkipBack, 
  ChevronLeft, 
  ChevronRight,
  Crown,
  Timer,
  Target,
  Pause,
  PlayCircle,
} from "lucide-react"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface NQueensVisualizerProps {
  content: React.ReactNode
}

export function NQueensVisualizer({ content }: NQueensVisualizerProps) {
  const [boardSize, setBoardSize] = useState(8)
  const [showAttacked, setShowAttacked] = useState(true)
  const [interactive, setInteractive] = useState(true)
  const [helperMsg, setHelperMsg] = useState<string>("")
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner")
  const {
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
  } = useNQueens(boardSize)
  const { toast } = useToast()

  // Load persisted settings
  useEffect(() => {
    const savedSize = localStorage.getItem("nq_board_size")
    const savedSpeed = localStorage.getItem("nq_speed") as AnimationSpeed | null
    const savedAttacked = localStorage.getItem("nq_show_attacked")
    const savedInteractive = localStorage.getItem("nq_interactive")
    const savedDifficulty = localStorage.getItem("nq_difficulty") as
      | "beginner"
      | "intermediate"
      | "advanced"
      | null
    if (savedSize) setBoardSize(parseInt(savedSize))
    if (savedSpeed) setAnimationSpeed(savedSpeed)
    if (savedAttacked) setShowAttacked(savedAttacked === "true")
    if (savedInteractive) setInteractive(savedInteractive === "true")
    if (savedDifficulty) setDifficulty(savedDifficulty)
  }, [setAnimationSpeed])

  // Persist settings
  useEffect(() => { localStorage.setItem("nq_board_size", boardSize.toString()) }, [boardSize])
  useEffect(() => { localStorage.setItem("nq_speed", animationSpeed) }, [animationSpeed])
  useEffect(() => { localStorage.setItem("nq_show_attacked", String(showAttacked)) }, [showAttacked])
  useEffect(() => { localStorage.setItem("nq_interactive", String(interactive)) }, [interactive])
  useEffect(() => { localStorage.setItem("nq_difficulty", difficulty) }, [difficulty])

  const handleBoardSizeChange = (size: string) => {
    const newSize = parseInt(size)
    setBoardSize(newSize)
    reset()
  }

  // Hint system that triggers immediately after difficulty selection
  useEffect(() => {
    if (!interactive || isAnimating) return
    if (state.queens.length === boardSize) {
      // Solution completed - show congratulations
      setHelperMsg(`🎉 Congratulations! You've solved the ${boardSize}-Queens puzzle!`)
      return
    }

    const IDLE_MS = difficulty === "beginner" ? 10000 : difficulty === "intermediate" ? 20000 : 40000
    let timeoutId: NodeJS.Timeout

    const showHint = () => {
      // Check if still in interactive mode and not solved
      if (!interactive || isAnimating || state.queens.length === boardSize) return
      
      // Recompute a suggestion based on current state
      const row = state.queens.length < boardSize ? state.queens.length : boardSize - 1
      let suggestionCol: number | null = null
      
      for (let col = 0; col < boardSize; col++) {
        if (state.board[row] && state.board[row][col] === 0 && checkSafe(row, col)) {
          suggestionCol = col
          break
        }
      }

      if (suggestionCol !== null) {
        const colChar = String.fromCharCode(65 + suggestionCol)
        const description =
          difficulty === "advanced"
            ? `In row ${row + 1}, consider a column that is not aligned with any existing queen and avoids both diagonals.`
            : `Try placing a queen at row ${row + 1}, column ${colChar}.`
        
        if (difficulty === "advanced") {
          toast({
            title: "💡 Hint",
            description,
          })
        } else {
          toast({
            title: "💡 Hint",
            description,
            action: (
              <ToastAction altText="Place queen"
                onClick={() => {
                  const res = placeQueen(row, suggestionCol!)
                  if (!res.ok) setHelperMsg(res.reason)
                  else setHelperMsg(`Placed queen at ${row + 1}${colChar} (hint).`)
                }}
              >Place it</ToastAction>
            ),
          })
        }
      } else {
        // Need to backtrack
        if (state.queens.length > 0) {
          const last = state.queens[state.queens.length - 1]
          const lastCol = String.fromCharCode(65 + last.col)
          const description =
            difficulty === "advanced"
              ? `Current row has no safe squares. Think about reversing your previous choice in row ${last.row + 1}.`
              : `No safe move in current row. Consider backtracking: remove the queen at ${last.row + 1}${lastCol}.`
          
          if (difficulty === "advanced") {
            toast({
              title: "💡 Hint",
              description,
            })
          } else {
            toast({
              title: "💡 Hint",
              description,
              action: (
                <ToastAction altText="Backtrack"
                  onClick={() => {
                    const res = removeQueen(last.row, last.col)
                    if (!res.ok) setHelperMsg(res.reason)
                    else setHelperMsg(`Backtracked: removed queen at ${last.row + 1}${lastCol} (hint).`)
                  }}
                >Backtrack</ToastAction>
              ),
            })
          }
        } else {
          const description =
            difficulty === "advanced"
              ? `Row 1: choose a column that doesn't share a diagonal with your likely second-row choice.`
              : `Start by placing a queen in row 1 at a safe column (e.g., A or C).`
          toast({
            title: "💡 Hint",
            description,
          })
        }
      }
      
      // Schedule next hint
      timeoutId = setTimeout(showHint, IDLE_MS)
    }

    // Start the hint timer immediately after difficulty selection
    timeoutId = setTimeout(showHint, IDLE_MS)

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [interactive, isAnimating, state.queens.length, boardSize, difficulty, checkSafe, placeQueen, removeQueen, toast])

  const attackedSquares = useMemo(() => showAttacked ? getAttackedSquares(state.queens, boardSize) : new Set<string>(), [showAttacked, state.queens, boardSize, getAttackedSquares])
  const currentPosition = steps[currentStep] ? { row: steps[currentStep].row, col: steps[currentStep].col } : undefined

  const handleSquareClick = (row: number, col: number) => {
    if (!interactive || isAnimating) return
    
    if (state.board[row][col] === 1) {
      const res = removeQueen(row, col)
      if (!res.ok) setHelperMsg(res.reason)
      else setHelperMsg(`Removed queen from ${row + 1}${String.fromCharCode(65 + col)}`)
      return
    }
    
    if (!checkSafe(row, col)) {
      setHelperMsg(`❌ Unsafe: This position conflicts with another queen.`)
      return
    }
    
    const res = placeQueen(row, col)
    if (!res.ok) {
      setHelperMsg(res.reason)
    } else {
      const newQueenCount = state.queens.length + 1
      if (newQueenCount === boardSize) {
        // Check if this completes a valid solution
        setTimeout(() => {
          setHelperMsg(`🎉 Congratulations! You've successfully solved the ${boardSize}-Queens puzzle!`)
        }, 100)
      } else {
        setHelperMsg(`✅ Placed queen at ${row + 1}${String.fromCharCode(65 + col)}. Queens placed: ${newQueenCount}/${boardSize}`)
      }
    }
  }

  const validateBoard = () => {
    const queens = state.queens
    const n = boardSize
    
    if (queens.length === 0) {
      setHelperMsg(`No queens placed yet. Start by clicking on any square in the first row.`)
      return
    }
    
    // Check conflicts pairwise
    for (let i = 0; i < queens.length; i++) {
      for (let j = i + 1; j < queens.length; j++) {
        const a = queens[i]
        const b = queens[j]
        const sameRow = a.row === b.row
        const sameCol = a.col === b.col
        const sameDiag = Math.abs(a.row - b.row) === Math.abs(a.col - b.col)
        if (sameRow || sameCol || sameDiag) {
          setHelperMsg(`❌ Invalid: Queens at ${a.row + 1}${String.fromCharCode(65 + a.col)} and ${b.row + 1}${String.fromCharCode(65 + b.col)} are attacking each other.`)
          return
        }
      }
    }
    
    if (queens.length === n) {
      setHelperMsg(`🎉 Perfect! Valid solution with all ${n} queens placed safely.`)
    } else {
      setHelperMsg(`✅ Looking good! ${queens.length}/${n} queens placed with no conflicts. Keep going!`)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">N-Queens Problem</h1>
        <p className="text-muted-foreground">
          Solve the classic N-Queens problem using backtracking algorithm.
        </p>
      </div>

      <Tabs defaultValue="visualizer" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualizer" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Controls Panel */}
            <div className="xl:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Board Size</label>
                    <Select value={boardSize.toString()} onValueChange={handleBoardSizeChange} disabled={isAnimating}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4×4</SelectItem>
                        <SelectItem value="5">5×5</SelectItem>
                        <SelectItem value="6">6×6</SelectItem>
                        <SelectItem value="7">7×7</SelectItem>
                        <SelectItem value="8">8×8</SelectItem>
                        <SelectItem value="9">9×9</SelectItem>
                        <SelectItem value="10">10×10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      Animation Speed
                    </label>
                    <Select 
                      value={animationSpeed} 
                      onValueChange={(value: AnimationSpeed) => setAnimationSpeed(value)}
                      disabled={isAnimating}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="attacked" className="text-sm">Show attacked squares</Label>
                    <Switch id="attacked" checked={showAttacked} onCheckedChange={setShowAttacked} disabled={isAnimating} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="interactive" className="text-sm">Interactive mode</Label>
                    <Switch id="interactive" checked={interactive} onCheckedChange={setInteractive} disabled={isAnimating} />
                  </div>

                  {interactive && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Difficulty</label>
                      <Select 
                        value={difficulty}
                        onValueChange={(v: string) => setDifficulty(v as any)}
                        disabled={isAnimating}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {!interactive ? (
                    <>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => solve(false)}
                          disabled={isAnimating}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Solve
                        </Button>
                        <Button 
                          onClick={() => solve(true)}
                          disabled={isAnimating}
                          variant="outline"
                          className="flex-1"
                        >
                          <Target className="w-4 h-4 mr-2" />
                          All Solutions
                        </Button>
                      </div>

                      {isAnimating && (
                        <div className="flex gap-2">
                          <Button onClick={isPaused ? resume : pause} variant="secondary" className="w-full">
                            {isPaused ? (
                              <><PlayCircle className="w-4 h-4 mr-2" /> Resume</>
                            ) : (
                              <><Pause className="w-4 h-4 mr-2" /> Pause</>
                            )}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant={state.queens.length === boardSize ? "default" : "outline"}>
                          Queens placed: {state.queens.length}/{boardSize}
                          {state.queens.length === boardSize && " ✓"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={validateBoard} className="flex-1" disabled={state.queens.length === 0}>
                          Validate
                        </Button>
                        <Button onClick={reset} variant="outline" className="flex-1">
                          Clear
                        </Button>
                      </div>
                      
                      {/* Auto-solve controls for interactive mode */}
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => solve(false)}
                          disabled={isAnimating || state.queens.length === boardSize}
                          variant="secondary"
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Auto-Solve
                        </Button>
                        {isAnimating && (
                          <Button 
                            onClick={isPaused ? resume : pause} 
                            variant="outline" 
                            className="flex-1"
                          >
                            {isPaused ? (
                              <><PlayCircle className="w-4 h-4 mr-2" /> Resume</>
                            ) : (
                              <><Pause className="w-4 h-4 mr-2" /> Pause</>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={reset}
                    variant="outline"
                    className="w-full"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </CardContent>
              </Card>

              {/* Step Controls */}
              {steps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Step Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={() => {
                          console.log('Step backward clicked, currentStep:', currentStep, 'steps.length:', steps.length)
                          stepBackward()
                        }}
                        disabled={currentStep <= 0 || isAnimating}
                        variant="outline"
                        size="sm"
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      
                      <Badge variant="outline">
                        {Math.max(0, currentStep + 1)} / {steps.length}
                      </Badge>
                      
                      <Button
                        onClick={() => {
                          console.log('Step forward clicked, currentStep:', currentStep, 'steps.length:', steps.length)
                          stepForward()
                        }}
                        disabled={currentStep >= steps.length - 1 || isAnimating}
                        variant="outline"
                        size="sm"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Solutions */}
              {allSolutions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Solutions Found</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Badge variant="default" className="text-lg px-3 py-1">
                        {allSolutions.length} Solution{allSolutions.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    
                    {allSolutions.length > 1 && (
                      <div className="flex items-center justify-between">
                        <Button
                          onClick={() => {
                            console.log('Previous solution clicked, currentIndex:', currentSolutionIndex, 'allSolutions.length:', allSolutions.length)
                            showSolution(currentSolutionIndex - 1)
                          }}
                          disabled={currentSolutionIndex <= 0 || isAnimating}
                          variant="outline"
                          size="sm"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        
                        <span className="text-sm">
                          Solution {currentSolutionIndex + 1}
                        </span>
                        
                        <Button
                          onClick={() => {
                            console.log('Next solution clicked, currentIndex:', currentSolutionIndex, 'allSolutions.length:', allSolutions.length)
                            showSolution(currentSolutionIndex + 1)
                          }}
                          disabled={currentSolutionIndex >= allSolutions.length - 1 || isAnimating}
                          variant="outline"
                          size="sm"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Visualization Area */}
            <div className="xl:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chessboard</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <NQueensBoard
                    size={boardSize}
                    queens={state.queens}
                    currentPosition={currentPosition}
                    attackedSquares={attackedSquares}
                    interactive={interactive}
                    onSquareClick={handleSquareClick}
                  />
                </CardContent>
              </Card>

              {/* Helper message for interactive guidance */}
              {(interactive || helperMsg) && (
                <Card>
                  <CardContent className="py-4 text-sm text-muted-foreground">
                    {helperMsg || 'Interactive mode: Click any safe square to place a queen. Click a queen to remove it.'}
                  </CardContent>
                </Card>
              )}

              <SolutionSteps steps={steps} currentStep={currentStep} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
