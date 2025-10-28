"use client"

import { Badge } from "@/components/ui/badge"
import { RecursionCall } from "./types"
import { motion, AnimatePresence } from "framer-motion"

interface RecursionStackProps {
  calls: RecursionCall[]
  maxVisible?: number
}

export function RecursionStack({ calls, maxVisible = 8 }: RecursionStackProps) {
  // Show the most recent calls (top of stack)
  const visibleCalls = calls.slice(-maxVisible).reverse()

  if (calls.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        No recursive calls yet
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      <div className="text-xs text-muted-foreground mb-2">
        Showing {Math.min(maxVisible, calls.length)} of {calls.length} calls
      </div>
      
      <AnimatePresence>
        {visibleCalls.map((call, index) => {
          const isTop = index === 0
          const depth = call.depth
          
          return (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`
                p-3 rounded-lg border-l-4 
                ${isTop 
                  ? 'bg-blue-50 border-l-blue-500 dark:bg-blue-950/30' 
                  : 'bg-muted/50 border-l-muted-foreground/30'
                }
                transition-colors duration-200
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Badge variant={isTop ? "default" : "outline"} className="text-xs">
                    Depth {depth}
                  </Badge>
                  {isTop && (
                    <Badge variant="secondary" className="text-xs animate-pulse">
                      Current
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  Row {call.row + 1}
                </span>
              </div>
              
              <div className="text-sm font-mono">
                solveMaze(maze, {call.row}, {call.col >= 0 ? call.col : 'n'})
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                {call.action}
              </div>
              
              {/* Visual depth indicator */}
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: Math.min(depth, 10) }, (_, i) => (
                  <div
                    key={i}
                    className={`
                      w-2 h-2 rounded-full
                      ${i < depth 
                        ? (isTop ? 'bg-blue-500' : 'bg-muted-foreground/50')
                        : 'bg-muted-foreground/20'
                      }
                    `}
                  />
                ))}
                {depth > 10 && (
                  <span className="text-xs text-muted-foreground">+{depth - 10}</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
      
      {calls.length > maxVisible && (
        <div className="text-center text-xs text-muted-foreground py-2 border-t">
          ... {calls.length - maxVisible} more calls below
        </div>
      )}
    </div>
  )
}
