"use client"

import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { HeapSortControls } from "./heap-sort-controls"
import { HeapSortDisplay } from "./heap-sort-display"
import { HeapSortCodeHighlight } from "./heap-sort-code-highlight"
import { HeapSortCodeTemplate } from "./heap-sort-code-template"
import { useHeapSort } from "@/hooks/use-heap-sort"

interface HeapSortVisualizerProps {
  content: React.ReactNode
}

export function HeapSortVisualizer({ content }: HeapSortVisualizerProps) {
  const {
    state,
    speed,
    startSort,
    pauseSort,
    resumeSort,
    stopSort,
    nextStep,
    prevStep,
    resetSort,
    changeSpeed,
    cleanup,
    currentStep,
    canGoNext,
    canGoPrev,
  } = useHeapSort()

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Heap Sort Algorithm
        </h1>
        <p className="text-muted-foreground">
          Interactive visualization of the heap sort algorithm. Watch the step-by-step process of building a max heap and extracting elements to create a sorted array.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="code-template">Code Template</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Controls */}
            <div className="xl:col-span-1 space-y-6">
              <HeapSortControls
                onStart={startSort}
                onPause={pauseSort}
                onResume={resumeSort}
                onStop={stopSort}
                onNext={nextStep}
                onPrev={prevStep}
                onReset={resetSort}
                onSpeedChange={changeSpeed}
                isPlaying={state.isPlaying}
                isComplete={state.isComplete}
                canGoNext={canGoNext}
                canGoPrev={canGoPrev}
                speed={speed}
              />
              
              {/* Code Highlight */}
              <HeapSortCodeHighlight
                currentLine={currentStep?.codeLineIndex ?? -1}
              />
            </div>

            {/* Main Display */}
            <div className="xl:col-span-3">
              <HeapSortDisplay
                step={currentStep}
                currentStepIndex={state.currentStep}
                totalSteps={state.steps.length}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code-template" className="space-y-6">
          <HeapSortCodeTemplate />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
