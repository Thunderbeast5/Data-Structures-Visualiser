"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider" // Component doesn't exist, will use Select instead
import { useEffect, useMemo, useState } from "react"
import { useBacktracking } from "@/hooks/use-maze-backtracking"
import { MazeBoard } from "./maze-board"
import { RecursionStack } from "./recursion-stack"
import { CodeHighlight } from "./code-highlight"
import { AnimationSpeed } from "./types"
import { 
  Play, 
  Square, 
  SkipForward, 
  SkipBack, 
  Crown,
  Timer,
  Target,
  Pause,
  PlayCircle,
  RotateCcw,
  Zap,
  Code,
  Layers,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface BacktrackingVisualizerProps {
  content: React.ReactNode
}

export function BacktrackingVisualizer({ content }: BacktrackingVisualizerProps) {
  const [isClient, setIsClient] = useState(false)
  const [mazeSize, setMazeSize] = useState(10)
  const [showPath, setShowPath] = useState(true)
  const [showRecursionStack, setShowRecursionStack] = useState(true)

  // Ensure client-side rendering to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const {
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
  } = useBacktracking(mazeSize)

  const handleMazeSizeChange = (size: string) => {
    const newSize = parseInt(size)
    setMazeSize(newSize)
    reset()
  }

  const visitedCells = useMemo(() => 
    showPath ? getVisitedCells(state.path, mazeSize) : new Set<string>(), 
    [showPath, state.path, mazeSize, getVisitedCells]
  )

  const currentPosition = steps[currentStep] ? { row: steps[currentStep].row, col: steps[currentStep].col } : undefined

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Backtracking Algorithm Visualization</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Backtracking Algorithm Visualization</h1>
        <p className="text-muted-foreground">
          Interactive visualization of backtracking with maze solving, featuring recursion stack, code sync, and path highlighting.
        </p>
      </div>

      <Tabs defaultValue="visualizer" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualizer" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
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
                    <label className="text-sm font-medium">Maze Size</label>
                    <Select value={mazeSize.toString()} onValueChange={handleMazeSizeChange} disabled={isAnimating}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8×8</SelectItem>
                        <SelectItem value="10">10×10</SelectItem>
                        <SelectItem value="12">12×12</SelectItem>
                        <SelectItem value="15">15×15</SelectItem>
                        <SelectItem value="20">20×20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      Speed Control
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
                    <Label htmlFor="path" className="text-sm">Path highlighting</Label>
                    <Switch id="path" checked={showPath} onCheckedChange={setShowPath} />
                  </div>


                  <div className="flex items-center justify-between">
                    <Label htmlFor="recursion-stack" className="text-sm">Recursion stack</Label>
                    <Switch id="recursion-stack" checked={showRecursionStack} onCheckedChange={setShowRecursionStack} />
                  </div>

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
                      <Button onClick={isPaused ? resume : pause} variant="secondary" className="flex-1">
                        {isPaused ? (
                          <><PlayCircle className="w-4 h-4 mr-2" /> Resume</>
                        ) : (
                          <><Pause className="w-4 h-4 mr-2" /> Pause</>
                        )}
                      </Button>
                    </div>
                  )}

                  <Button 
                    onClick={reset}
                    variant="outline"
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </CardContent>
              </Card>

              {/* Step Counter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Step Counter:</span>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {stepCounter}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Recursion Depth:</span>
                    <Badge variant="secondary">
                      {state.recursionDepth}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Path Length:</span>
                    <Badge variant={state.isComplete ? "default" : "outline"}>
                      {state.path.length}
                      {state.isComplete && " ✓"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Step Controls */}
              {steps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Step Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={stepBackward}
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
                        onClick={stepForward}
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
                          onClick={() => showSolution(currentSolutionIndex - 1)}
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
                          onClick={() => showSolution(currentSolutionIndex + 1)}
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
                  <CardTitle>Maze</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <MazeBoard
                    maze={state.maze}
                    path={state.path}
                    currentPosition={currentPosition}
                    currentStep={steps[currentStep]}
                    startPos={{row: 0, col: 0}}
                    endPos={{row: mazeSize-1, col: mazeSize-1}}
                  />
                </CardContent>
              </Card>

              {/* Current Step Message */}
              {steps[currentStep] && (
                <Card>
                  <CardContent className="py-4">
                    <div className="text-sm">
                      <Badge variant="outline" className="mb-2">
                        Step {currentStep + 1}
                      </Badge>
                      <p className="text-muted-foreground">
                        {steps[currentStep].message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Side Panel for Code and Stack */}
            <div className="xl:col-span-1 space-y-6">

              {/* Recursion Stack */}
              {showRecursionStack && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      Recursion Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecursionStack calls={recursionStack} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Backtracking Algorithm Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-slate-300 whitespace-pre-wrap">
{`#include <bits/stdc++.h>
using namespace std;

// Function prototypes
bool isSolution(vector<int>& solution);
void processSolution(vector<int>& solution);
bool isValid(vector<int>& solution, int choice);

void backtrack(vector<int>& solution, vector<int>& choices) {
    if (isSolution(solution)) {
        processSolution(solution);
        return;
    }

    for (int choice : choices) {
        if (isValid(solution, choice)) {
            // Make the choice
            solution.push_back(choice);

            // Explore further
            backtrack(solution, choices);

            // Undo the choice (backtrack)
            solution.pop_back();
        }
    }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Explanation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-invert max-w-none">
                <h3>How Backtracking Works</h3>
                <p>
                  Backtracking is a systematic method for solving problems by trying partial solutions 
                  and then abandoning them if they cannot lead to a complete solution.
                </p>
                
                <h4>Key Steps:</h4>
                <ol>
                  <li><strong>Choose:</strong> Make a choice from available options</li>
                  <li><strong>Explore:</strong> Recursively explore the consequences of that choice</li>
                  <li><strong>Unchoose:</strong> If the choice doesn't lead to a solution, undo it and try another</li>
                </ol>
                
                <h4>Generic Backtracking Template:</h4>
                <ul>
                  <li><strong>isSolution():</strong> Check if current partial solution is complete</li>
                  <li><strong>processSolution():</strong> Handle the found solution (print, count, etc.)</li>
                  <li><strong>isValid():</strong> Check if a choice is valid for current state</li>
                  <li><strong>Make Choice:</strong> Add the choice to current solution</li>
                  <li><strong>Explore:</strong> Recursively try to complete the solution</li>
                  <li><strong>Undo Choice:</strong> Remove the choice and try next option</li>
                </ul>
                
                <h4>Applications:</h4>
                <ul>
                  <li>N-Queens Problem</li>
                  <li>Sudoku Solver</li>
                  <li>Maze Solving</li>
                  <li>Subset Generation</li>
                  <li>Permutations and Combinations</li>
                </ul>
                
                <h4>Time Complexity:</h4>
                <p>
                  Generally exponential O(b^d) where b is the branching factor and d is the depth.
                  Backtracking prunes invalid branches early, significantly reducing the search space.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
