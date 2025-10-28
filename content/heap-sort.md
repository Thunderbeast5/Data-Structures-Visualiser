# Heap Sort Algorithm

Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It's an efficient, in-place sorting algorithm with a time complexity of O(n log n) in all cases.

## Algorithm Overview

Heap Sort works in two main phases:

1. **Build Max Heap**: Convert the input array into a max heap structure
2. **Extract Elements**: Repeatedly extract the maximum element and place it at the end

## How It Works

### Phase 1: Build Max Heap
- Start from the last non-leaf node and heapify each subtree
- Work backwards to the root, ensuring the max heap property is maintained
- After this phase, the largest element is at the root (index 0)

### Phase 2: Extract Maximum Elements
- Swap the root (maximum element) with the last element
- Reduce the heap size by 1
- Heapify the root to restore the max heap property
- Repeat until the heap size becomes 1

## Key Concepts

### Max Heap Property
In a max heap, every parent node is greater than or equal to its children:
- `parent >= left_child`
- `parent >= right_child`

### Array Representation
For an element at index `i`:
- **Left child**: `2*i + 1`
- **Right child**: `2*i + 2`
- **Parent**: `(i-1)/2`

## Algorithm Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

// To heapify a subtree rooted with node i
void heapify(vector<int>& arr, int n, int i) {
    // Initialize largest as root
    int largest = i;
    
    // left index = 2*i + 1
    int l = 2 * i + 1;
    
    // right index = 2*i + 2
    int r = 2 * i + 2;

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Main function to do heap sort
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Build heap (rearrange vector)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // One by one extract an element from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(arr[0], arr[i]);

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

int main() {
    vector<int> arr = {9, 4, 3, 8, 10, 2, 5};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    heapSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}
```

## Time and Space Complexity

### Time Complexity
- **Best Case**: O(n log n)
- **Average Case**: O(n log n)
- **Worst Case**: O(n log n)

The time complexity is consistent across all cases because:
- Building the heap takes O(n) time
- Each of the n-1 extractions takes O(log n) time

### Space Complexity
- **Space Complexity**: O(1) - Heap sort is an in-place sorting algorithm
- **Auxiliary Space**: O(log n) - Due to the recursive calls in heapify

## Advantages

1. **Consistent Performance**: O(n log n) time complexity in all cases
2. **In-Place**: Requires only O(1) additional memory
3. **Not Stable**: But this can be an advantage when stability is not required
4. **No Worst-Case Degradation**: Unlike Quick Sort, performance doesn't degrade

## Disadvantages

1. **Not Stable**: Equal elements may not maintain their relative order
2. **Not Adaptive**: Doesn't perform better on partially sorted arrays
3. **Cache Performance**: Poor cache locality compared to algorithms like Merge Sort

## Applications

1. **Priority Queues**: Heap sort is the foundation of heap-based priority queues
2. **Selection Algorithms**: Finding the k largest or smallest elements
3. **Memory-Constrained Environments**: When O(1) space complexity is crucial
4. **Real-Time Systems**: Predictable O(n log n) performance

## Comparison with Other Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |

## Visualization Features

Our interactive heap sort visualizer provides:

- **Step-by-Step Execution**: Watch each phase of the algorithm
- **Dual Representation**: See both array and tree views simultaneously
- **Color-Coded Elements**: Track comparisons, swaps, and sorted portions
- **Code Highlighting**: Follow along with the algorithm implementation
- **Interactive Controls**: Play, pause, step forward/backward through the process
- **Adjustable Speed**: Control the animation speed for better understanding

## Practice Problems

1. Implement heap sort for strings
2. Modify heap sort to sort in descending order (using min heap)
3. Find the k largest elements using partial heap sort
4. Implement heap sort iteratively instead of recursively

Try the interactive visualizer above to see heap sort in action and understand how the max heap is built and how elements are extracted to create the final sorted array!
