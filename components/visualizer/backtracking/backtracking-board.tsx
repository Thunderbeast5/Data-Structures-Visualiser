"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"
import { Position, BacktrackingStep } from "./types"

interface BacktrackingBoardProps {
  size: number
  queens: Position[]
  currentPosition?: Position
  conflictSquares?: Set<string>
  currentStep?: BacktrackingStep
  className?: string
}

export function BacktrackingBoard({ 
  size, 
  queens, 
  currentPosition, 
  conflictSquares = new Set(),
  currentStep,
  className = ""
}: BacktrackingBoardProps) {
  const isQueenAt = (row: number, col: number) => {
    return queens.some(queen => queen.row === row && queen.col === col)
  }

  const isCurrentPosition = (row: number, col: number) => {
    return currentPosition?.row === row && currentPosition?.col === col
  }

  const isConflictSquare = (row: number, col: number) => {
    return conflictSquares.has(`${row}-${col}`)
  }

  const getSquareColor = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0
    
    // Current position gets priority
    if (isCurrentPosition(row, col)) {
      if (currentStep?.action === 'move') {
        return "bg-green-400 animate-pulse" // Valid move
      } else if (currentStep?.action === 'check' && currentStep?.isValid === false) {
        return "bg-red-400 animate-pulse" // Invalid placement
      } else if (currentStep?.action === 'backtrack') {
        return "bg-orange-400 animate-pulse" // Backtracking
      } else if (currentStep?.action === 'blocked') {
        return "bg-red-400 animate-pulse" // Blocked path
      } else if (currentStep?.action === 'complete') {
        return "bg-green-500 animate-pulse" // Solution found
      }
      return "bg-yellow-400 animate-pulse" // General current position
    }
    
    // Conflict highlighting
    if (isConflictSquare(row, col)) {
      return isLight ? "bg-red-200" : "bg-red-300"
    }
    
    // Valid placement squares (safe squares)
    if (currentStep?.action === 'check' && !isConflictSquare(row, col) && !isQueenAt(row, col)) {
      return isLight ? "bg-green-100" : "bg-green-200"
    }
    
    // Default chessboard colors
    return isLight ? "bg-amber-100" : "bg-amber-800"
  }

  return (
    <div className={`inline-block p-4 bg-amber-900 rounded-lg shadow-lg ${className}`}>
      <div 
        className="grid gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          aspectRatio: '1'
        }}
      >
        {Array.from({ length: size * size }, (_, index) => {
          const row = Math.floor(index / size)
          const col = index % size
          const hasQueen = isQueenAt(row, col)
          
          return (
            <motion.div
              key={`${row}-${col}`}
              className={`
                relative flex items-center justify-center
                w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                ${getSquareColor(row, col)}
                transition-colors duration-300
                border border-amber-700/20
              `}
              initial={{ scale: 1 }}
              animate={{ 
                scale: isCurrentPosition(row, col) ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {hasQueen && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                  className="text-purple-800"
                >
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </motion.div>
              )}
              
              {/* Row and column labels */}
              {col === 0 && (
                <div className="absolute -left-6 text-xs font-medium text-muted-foreground">
                  {row + 1}
                </div>
              )}
              {row === size - 1 && (
                <div className="absolute -bottom-6 text-xs font-medium text-muted-foreground">
                  {String.fromCharCode(65 + col)}
                </div>
              )}

              {/* Step indicator */}
              {isCurrentPosition(row, col) && currentStep && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                  {currentStep.action === 'move' ? '+' : 
                   currentStep.action === 'backtrack' ? '-' : 
                   currentStep.action === 'check' ? '?' : 
                   currentStep.action === 'blocked' ? 'X' :
                   currentStep.action === 'complete' ? '✓' : '•'}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded"></div>
          <span>Valid Move</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span>Invalid Move</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <span>Backtrack</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-200 rounded"></div>
          <span>Conflict</span>
        </div>
      </div>
    </div>
  )
}
