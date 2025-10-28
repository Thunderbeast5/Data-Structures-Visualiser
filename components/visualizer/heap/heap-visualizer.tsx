"use client"

import { HeapControls } from "@/components/visualizer/heap/heap-controls"
import { HeapDisplay } from "@/components/visualizer/heap/heap-display"
import { HeapArray } from "@/components/visualizer/heap/heap-array"
import { HeapSortVisualizer } from "@/components/visualizer/heap/heap-sort-visualizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useHeap } from "@/hooks/use-heap"

interface HeapVisualizerProps {
  content: React.ReactNode
}

export function HeapVisualizer({ content }: HeapVisualizerProps) {
  const { 
    heap,
    heapArray,
    heapType,
    highlightedNodes,
    insert,
    insertMany,
    toggleHeapType,
    clear,
  } = useHeap()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Heap Data Structure
        </h1>
        <p className="text-muted-foreground">
          Explore heap operations and heap sort algorithm with interactive visualizations.
        </p>
      </div>

      <Tabs defaultValue="heap-operations" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="heap-operations">Heap Operations</TabsTrigger>
          <TabsTrigger value="heap-sort">Heap Sort</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="heap-operations" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <HeapControls 
                onInsert={insert}
                onInsertMany={insertMany}
                onClear={clear}
                onToggleType={toggleHeapType}
                heapType={heapType}
              />
              <HeapArray array={heapArray} />
            </div>
            <div className="xl:col-span-2">
              <HeapDisplay 
                heap={heap}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="heap-sort" className="space-y-6">
          <HeapSortVisualizer content={content} />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 