import { useState, useCallback, useRef } from "react"
import { HeapSortStep, HeapSortState, AnimationSpeed, ANIMATION_SPEEDS } from "@/components/visualizer/heap/types"

export function useHeapSort() {
  const [state, setState] = useState<HeapSortState>({
    array: [],
    originalArray: [],
    currentStep: 0,
    steps: [],
    isPlaying: false,
    isComplete: false,
    heapSize: 0,
  })
  
  const [speed, setSpeed] = useState<AnimationSpeed>('medium')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateHeapSortSteps = useCallback((inputArray: number[]): HeapSortStep[] => {
    const steps: HeapSortStep[] = []
    const arr = [...inputArray]
    const n = arr.length

    // Helper function to add a step
    const addStep = (
      action: HeapSortStep['action'],
      currentIndex: number,
      compareIndices: number[] = [],
      swapIndices: number[] = [],
      message: string,
      codeLineIndex: number,
      heapSize: number = n,
      isHeapifyCall: boolean = false,
      heapifyIndex?: number
    ) => {
      steps.push({
        array: [...arr],
        heapSize,
        action,
        currentIndex,
        compareIndices,
        swapIndices,
        message,
        codeLineIndex,
        isHeapifyCall,
        heapifyIndex,
      })
    }

    // Heapify function that generates steps
    const heapify = (arr: number[], n: number, i: number, heapSize: number): void => {
      addStep('heapify', i, [], [], `Heapifying subtree rooted at index ${i}`, 1, heapSize, true, i)
      
      let largest = i
      addStep('heapify', largest, [], [], `Initialize largest as root (index ${i})`, 3, heapSize, true, i)
      
      const l = 2 * i + 1
      const r = 2 * i + 2
      
      addStep('heapify', largest, [l], [], `Check left child at index ${l}`, 5, heapSize, true, i)
      
      if (l < n && arr[l] > arr[largest]) {
        largest = l
        addStep('heapify', largest, [l, i], [], `Left child ${arr[l]!} > parent ${arr[i]!}, update largest`, 10, heapSize, true, i)
      }
      
      addStep('heapify', largest, [r], [], `Check right child at index ${r}`, 7, heapSize, true, i)
      
      if (r < n && arr[r] > arr[largest]) {
        largest = r
        addStep('heapify', largest, [r, largest === l ? l : i], [], `Right child ${arr[r]!} > current largest, update largest`, 13, heapSize, true, i)
      }

      if (largest !== i) {
        const valueI = arr[i]
        const valueLargest = arr[largest]
        addStep('heapify', largest, [i, largest], [i, largest], `Swap ${valueI} and ${valueLargest}`, 16, heapSize, true, i)
        
        // Perform the swap
        [arr[i], arr[largest]] = [arr[largest], arr[i]]
        
        addStep('heapify', largest, [], [], `Recursively heapify affected subtree at index ${largest}`, 18, heapSize, true, i)
        heapify(arr, n, largest, heapSize)
      }
    }

    // Initial state
    addStep('build_heap', -1, [], [], 'Starting Heap Sort algorithm', 22, n)
    
    // Build heap (rearrange array)
    addStep('build_heap', -1, [], [], 'Building max heap from bottom up', 25, n)
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      addStep('build_heap', i, [], [], `Heapifying subtree rooted at index ${i}`, 26, n)
      heapify(arr, n, i, n)
    }
    
    addStep('build_heap', -1, [], [], 'Max heap built successfully', 27, n)

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      const rootValue = arr[0]
      addStep('extract_max', 0, [0, i], [0, i], `Move current root ${rootValue} to end position ${i}`, 30, i)
      
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]]
      
      addStep('heapify', 0, [], [], `Heapify reduced heap of size ${i}`, 32, i)
      heapify(arr, i, 0, i)
    }

    addStep('complete', -1, [], [], 'Heap sort completed! Array is now sorted.', 33, 0)

    return steps
  }, [])

  const startSort = useCallback((inputArray: number[]) => {
    const steps = generateHeapSortSteps(inputArray)
    setState({
      array: [...inputArray],
      originalArray: [...inputArray],
      currentStep: 0,
      steps,
      isPlaying: true,
      isComplete: false,
      heapSize: inputArray.length,
    })
    
    // Start animation
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.currentStep >= prev.steps.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          return { ...prev, isPlaying: false, isComplete: true }
        }
        return { ...prev, currentStep: prev.currentStep + 1 }
      })
    }, ANIMATION_SPEEDS[speed])
  }, [speed, generateHeapSortSteps])

  const pauseSort = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState(prev => ({ ...prev, isPlaying: false }))
  }, [])

  const resumeSort = useCallback(() => {
    if (state.isComplete) return
    
    setState(prev => ({ ...prev, isPlaying: true }))
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.currentStep >= prev.steps.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          return { ...prev, isPlaying: false, isComplete: true }
        }
        return { ...prev, currentStep: prev.currentStep + 1 }
      })
    }, ANIMATION_SPEEDS[speed])
  }, [state.isComplete, speed])

  const stopSort = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState(prev => ({ ...prev, isPlaying: false }))
  }, [])

  const nextStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStep < prev.steps.length - 1) {
        const newStep = prev.currentStep + 1
        const isComplete = newStep >= prev.steps.length - 1
        return { 
          ...prev, 
          currentStep: newStep,
          isComplete 
        }
      }
      return prev
    })
  }, [])

  const prevStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStep > 0) {
        return { 
          ...prev, 
          currentStep: prev.currentStep - 1,
          isComplete: false 
        }
      }
      return prev
    })
  }, [])

  const resetSort = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState(prev => ({
      ...prev,
      currentStep: 0,
      isPlaying: false,
      isComplete: false,
      array: [...prev.originalArray],
    }))
  }, [])

  const changeSpeed = useCallback((newSpeed: AnimationSpeed) => {
    setSpeed(newSpeed)
    
    // If currently playing, restart with new speed
    if (state.isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      intervalRef.current = setInterval(() => {
        setState(prev => {
          if (prev.currentStep >= prev.steps.length - 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            return { ...prev, isPlaying: false, isComplete: true }
          }
          return { ...prev, currentStep: prev.currentStep + 1 }
        })
      }, ANIMATION_SPEEDS[newSpeed])
    }
  }, [state.isPlaying])

  // Cleanup interval on unmount
  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  return {
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
    currentStep: state.steps[state.currentStep] || null,
    canGoNext: state.currentStep < state.steps.length - 1,
    canGoPrev: state.currentStep > 0,
  }
}
