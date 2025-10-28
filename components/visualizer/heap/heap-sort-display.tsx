"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeapSortStep } from "./types"
import { cn } from "@/lib/utils"

interface HeapSortDisplayProps {
  step: HeapSortStep | null
  currentStepIndex: number
  totalSteps: number
}

export function HeapSortDisplay({ step, currentStepIndex, totalSteps }: HeapSortDisplayProps) {
  if (!step) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Heap Sort Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Start the heap sort to see the visualization</p>
        </CardContent>
      </Card>
    )
  }

  const getArrayItemClass = (index: number) => {
    const baseClass = "w-12 h-12 flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-300"
    
    if (step.swapIndices.includes(index)) {
      return cn(baseClass, "bg-red-500 text-white scale-110 shadow-lg")
    }
    if (step.compareIndices.includes(index)) {
      return cn(baseClass, "bg-yellow-500 text-black scale-105 shadow-md")
    }
    if (index === step.currentIndex) {
      return cn(baseClass, "bg-blue-500 text-white scale-105 shadow-md")
    }
    if (index >= step.heapSize) {
      return cn(baseClass, "bg-green-500 text-white") // Sorted portion
    }
    
    return cn(baseClass, "bg-gray-200 dark:bg-gray-700 text-foreground")
  }

  const getTreeNodeClass = (index: number) => {
    const baseClass = "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300"
    
    if (step.swapIndices.includes(index)) {
      return cn(baseClass, "bg-red-500 text-white scale-110 shadow-lg")
    }
    if (step.compareIndices.includes(index)) {
      return cn(baseClass, "bg-yellow-500 text-black scale-105 shadow-md")
    }
    if (index === step.currentIndex) {
      return cn(baseClass, "bg-blue-500 text-white scale-105 shadow-md")
    }
    if (index >= step.heapSize) {
      return cn(baseClass, "bg-green-500 text-white opacity-50") // Sorted portion
    }
    
    return cn(baseClass, "bg-gray-200 dark:bg-gray-700 text-foreground")
  }

  const renderTreeLevel = (level: number, startIndex: number, count: number) => {
    const nodes = []
    for (let i = 0; i < count && startIndex + i < step.array.length; i++) {
      const index = startIndex + i
      if (index < step.heapSize) {
        nodes.push(
          <div key={index} className={getTreeNodeClass(index)}>
            {step.array[index]}
          </div>
        )
      }
    }
    
    return (
      <div className={cn(
        "flex justify-center gap-4",
        level === 0 && "gap-8",
        level === 1 && "gap-6",
        level === 2 && "gap-4",
        level >= 3 && "gap-2"
      )}>
        {nodes}
      </div>
    )
  }

  const renderTree = () => {
    const levels = []
    let levelStart = 0
    let level = 0
    
    while (levelStart < Math.min(step.heapSize, step.array.length)) {
      const nodesInLevel = Math.pow(2, level)
      levels.push(renderTreeLevel(level, levelStart, nodesInLevel))
      levelStart += nodesInLevel
      level++
      
      if (level > 4) break // Limit tree depth for display
    }
    
    return (
      <div className="space-y-4 py-4">
        {levels}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Heap Sort Visualization</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Step {currentStepIndex + 1} of {totalSteps}
              </Badge>
              <Badge variant={step.action === 'complete' ? 'default' : 'secondary'}>
                {step.action.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Current State:</h3>
              <p className="text-sm text-muted-foreground">{step.message}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Array Representation:</h3>
              <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
                {step.array.map((value, index) => (
                  <div key={index} className={getArrayItemClass(index)}>
                    {value}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Heap Size: {step.heapSize}</span>
                <span>Sorted: {step.array.length - step.heapSize} elements</span>
              </div>
            </div>

            {step.heapSize > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Tree Representation:</h3>
                <div className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                  {renderTree()}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Comparing</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Swapping</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Sorted</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
