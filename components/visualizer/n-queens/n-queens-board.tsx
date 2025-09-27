"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"
import { Position } from "./types"

interface NQueensBoardProps {
  size: number
  queens: Position[]
  currentPosition?: Position
  attackedSquares?: Set<string>
  className?: string
  interactive?: boolean
  onSquareClick?: (row: number, col: number) => void
}

export function NQueensBoard({ 
  size, 
  queens, 
  currentPosition, 
  attackedSquares = new Set(),
  className = "",
  interactive = false,
  onSquareClick
}: NQueensBoardProps) {
  const isQueenAt = (row: number, col: number) => {
    return queens.some(queen => queen.row === row && queen.col === col)
  }

  const isCurrentPosition = (row: number, col: number) => {
    return currentPosition?.row === row && currentPosition?.col === col
  }

  const isAttacked = (row: number, col: number) => {
    return attackedSquares.has(`${row}-${col}`)
  }

  const getSquareColor = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0
    
    if (isCurrentPosition(row, col)) {
      return "bg-yellow-400"
    }
    
    if (isAttacked(row, col)) {
      return isLight ? "bg-red-200" : "bg-red-300"
    }
    
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
                transition-colors duration-200
                ${interactive ? 'cursor-pointer hover:brightness-110' : ''}
              `}
              initial={{ scale: 1 }}
              animate={{ 
                scale: isCurrentPosition(row, col) ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
              onClick={() => onSquareClick?.(row, col)}
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
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
