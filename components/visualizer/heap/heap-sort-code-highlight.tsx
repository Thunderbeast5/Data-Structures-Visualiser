"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HEAP_SORT_CODE_LINES } from "./types"
import { cn } from "@/lib/utils"

interface HeapSortCodeHighlightProps {
  currentLine: number
}

export function HeapSortCodeHighlight({ currentLine }: HeapSortCodeHighlightProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Heap Sort Algorithm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm">
            {HEAP_SORT_CODE_LINES.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "leading-6 px-2 py-1 rounded transition-colors duration-200",
                  index === currentLine && "bg-blue-500/20 border-l-4 border-blue-500",
                  line.trim() === "" && "h-4"
                )}
              >
                <span className="text-gray-400 mr-4 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <code className={cn(
                  "text-gray-300",
                  index === currentLine && "text-white font-medium"
                )}>
                  {line}
                </code>
              </div>
            ))}
          </pre>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Algorithm Steps:</strong></p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li><strong>Build Max Heap:</strong> Convert array into a max heap structure</li>
            <li><strong>Extract Maximum:</strong> Move the root (maximum) to the end</li>
            <li><strong>Heapify:</strong> Restore heap property for the remaining elements</li>
            <li><strong>Repeat:</strong> Continue until all elements are sorted</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
