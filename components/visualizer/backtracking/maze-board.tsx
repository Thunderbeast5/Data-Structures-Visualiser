"use client"

import { motion } from "framer-motion"
import { Target, Navigation, X } from "lucide-react"
import { Position, BacktrackingStep } from "./types"

interface MazeBoardProps {
  maze: number[][]
  path: Position[]
  currentPosition?: Position
  currentStep?: BacktrackingStep
  startPos: Position
  endPos: Position
  className?: string
}

export function MazeBoard({ 
  maze, 
  path, 
  currentPosition, 
  currentStep,
  startPos,
  endPos,
  className = ""
}: MazeBoardProps) {
  const rows = maze.length
  const cols = maze[0]?.length || 0

  const isWall = (row: number, col: number) => {
    return maze[row][col] === 1
  }

  const isInPath = (row: number, col: number) => {
    return path.some(pos => pos.row === row && pos.col === col)
  }

  const isCurrentPosition = (row: number, col: number) => {
    return currentPosition?.row === row && currentPosition?.col === col
  }

  const isStartPosition = (row: number, col: number) => {
    return startPos.row === row && startPos.col === col
  }

  const isEndPosition = (row: number, col: number) => {
    return endPos.row === row && endPos.col === col
  }

  const getCellColor = (row: number, col: number) => {
    // Start position
    if (isStartPosition(row, col)) {
      return "bg-green-500"
    }
    
    // End position
    if (isEndPosition(row, col)) {
      return "bg-red-500"
    }
    
    // Current position gets priority
    if (isCurrentPosition(row, col)) {
      if (currentStep?.action === 'move') {
        return "bg-blue-400 animate-pulse" // Moving
      } else if (currentStep?.action === 'backtrack') {
        return "bg-orange-400 animate-pulse" // Backtracking
      } else if (currentStep?.action === 'blocked') {
        return "bg-red-300 animate-pulse" // Blocked
      }
      return "bg-yellow-400 animate-pulse" // General current position
    }
    
    // Wall
    if (isWall(row, col)) {
      return "bg-gray-800"
    }
    
    // Path
    if (isInPath(row, col)) {
      return "bg-blue-200"
    }
    
    // Empty space
    return "bg-white border border-gray-200"
  }

  const getCellIcon = (row: number, col: number) => {
    if (isStartPosition(row, col)) {
      return <Navigation className="w-4 h-4 text-white" />
    }
    if (isEndPosition(row, col)) {
      return <Target className="w-4 h-4 text-white" />
    }
    if (isWall(row, col)) {
      return <X className="w-3 h-3 text-gray-400" />
    }
    return null
  }

  return (
    <div className={`inline-block p-4 bg-gray-100 rounded-lg shadow-lg ${className}`}>
      <div 
        className="grid gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: rows * cols }, (_, index) => {
          const row = Math.floor(index / cols)
          const col = index % cols
          
          return (
            <motion.div
              key={`${row}-${col}`}
              className={`
                relative flex items-center justify-center
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                ${getCellColor(row, col)}
                transition-colors duration-300
                rounded-sm
              `}
              initial={{ scale: 1 }}
              animate={{ 
                scale: isCurrentPosition(row, col) ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {getCellIcon(row, col)}
              
              {/* Step indicator */}
              {isCurrentPosition(row, col) && currentStep && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                  {currentStep.action === 'move' ? '→' : 
                   currentStep.action === 'backtrack' ? '←' : 
                   currentStep.action === 'blocked' ? '!' : '•'}
                </div>
              )}

              {/* Coordinates for debugging */}
              <div className="absolute -bottom-4 left-0 text-xs text-gray-400 font-mono">
                {row},{col}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded flex items-center justify-center">
            <Navigation className="w-2 h-2 text-white" />
          </div>
          <span>Start</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded flex items-center justify-center">
            <Target className="w-2 h-2 text-white" />
          </div>
          <span>End</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-800 rounded"></div>
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-200 rounded"></div>
          <span>Path</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <span>Backtrack</span>
        </div>
      </div>
    </div>
  )
}
