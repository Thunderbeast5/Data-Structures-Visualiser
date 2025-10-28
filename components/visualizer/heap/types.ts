export interface HeapNode {
  id: string
  value: number
  left: HeapNode | null
  right: HeapNode | null
}

export type HeapType = 'max' | 'min'

export interface HeapSortStep {
  array: number[]
  heapSize: number
  action: 'build_heap' | 'heapify' | 'extract_max' | 'swap' | 'complete'
  currentIndex: number
  compareIndices: number[]
  swapIndices: number[]
  message: string
  codeLineIndex: number
  isHeapifyCall?: boolean
  heapifyIndex?: number
}

export interface HeapSortState {
  array: number[]
  originalArray: number[]
  currentStep: number
  steps: HeapSortStep[]
  isPlaying: boolean
  isComplete: boolean
  heapSize: number
}

export type AnimationSpeed = 'slow' | 'medium' | 'fast'

export const ANIMATION_SPEEDS: Record<AnimationSpeed, number> = {
  slow: 1500,
  medium: 800,
  fast: 300,
}

export const HEAP_SORT_CODE_LINES = [
  "// To heapify a subtree rooted with node i",
  "void heapify(vector<int>& arr, int n, int i){",
  "    // Initialize largest as root",
  "    int largest = i;",
  "    // left index = 2*i + 1",
  "    int l = 2 * i + 1;",
  "    // right index = 2*i + 2", 
  "    int r = 2 * i + 2;",
  "    // If left child is larger than root",
  "    if (l < n && arr[l] > arr[largest])",
  "        largest = l;",
  "    // If right child is larger than largest so far",
  "    if (r < n && arr[r] > arr[largest])",
  "        largest = r;",
  "    // If largest is not root",
  "    if (largest != i) {",
  "        swap(arr[i], arr[largest]);",
  "        // Recursively heapify the affected sub-tree",
  "        heapify(arr, n, largest);",
  "    }",
  "}",
  "",
  "// Main function to do heap sort",
  "void heapSort(vector<int>& arr){",
  "    int n = arr.size();",
  "    // Build heap (rearrange vector)",
  "    for (int i = n / 2 - 1; i >= 0; i--)",
  "        heapify(arr, n, i);",
  "    // One by one extract an element from heap",
  "    for (int i = n - 1; i > 0; i--) {",
  "        // Move current root to end",
  "        swap(arr[0], arr[i]);",
  "        // Call max heapify on the reduced heap",
  "        heapify(arr, i, 0);",
  "    }",
  "}"
]