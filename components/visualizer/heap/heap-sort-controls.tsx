"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { AnimationSpeed } from "./types"
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  RotateCcw,
  Shuffle
} from "lucide-react"

interface HeapSortControlsProps {
  onStart: (array: number[]) => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onNext: () => void
  onPrev: () => void
  onReset: () => void
  onSpeedChange: (speed: AnimationSpeed) => void
  isPlaying: boolean
  isComplete: boolean
  canGoNext: boolean
  canGoPrev: boolean
  speed: AnimationSpeed
}

export function HeapSortControls({
  onStart,
  onPause,
  onResume,
  onStop,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
  isPlaying,
  isComplete,
  canGoNext,
  canGoPrev,
  speed,
}: HeapSortControlsProps) {
  const [arrayInput, setArrayInput] = useState("9, 4, 3, 8, 10, 2, 5")

  const handleStart = () => {
    const values = arrayInput
      .split(',')
      .map(v => parseInt(v.trim()))
      .filter(v => !isNaN(v))
    
    if (values.length > 0) {
      onStart(values)
    }
  }

  const generateRandomArray = () => {
    const size = 7 + Math.floor(Math.random() * 6) // 7-12 elements
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    setArrayInput(values.join(', '))
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Heap Sort Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Array Input (comma-separated)</Label>
            <div className="flex gap-2">
              <Input
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                placeholder="e.g., 9, 4, 3, 8, 10, 2, 5"
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={generateRandomArray}
                title="Generate Random Array"
              >
                <Shuffle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Animation Speed</Label>
            <Select value={speed} onValueChange={(value: AnimationSpeed) => onSpeedChange(value)}>
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

          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleStart}
              disabled={isPlaying}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Sort
            </Button>
            
            {isPlaying ? (
              <Button 
                onClick={onPause}
                variant="outline"
                size="icon"
              >
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={onResume}
                variant="outline"
                size="icon"
                disabled={isComplete}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}

            <Button 
              onClick={onStop}
              variant="outline"
              size="icon"
              disabled={!isPlaying && !isComplete}
            >
              <Square className="h-4 w-4" />
            </Button>

            <Button 
              onClick={onReset}
              variant="outline"
              size="icon"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={onPrev}
              variant="outline"
              size="icon"
              disabled={!canGoPrev}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={onNext}
              variant="outline"
              size="icon"
              disabled={!canGoNext}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
