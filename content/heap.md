# Binary Heap

A binary heap is a complete binary tree that satisfies the heap property. In a **max heap**, every parent node has a value greater than or equal to its children. In a **min heap**, every parent node has a value less than or equal to its children. Heaps are the foundation of priority queues and heap sort.

## Core Concept

Unlike BSTs which maintain sorted order, heaps only guarantee that the parent is greater (max heap) or smaller (min heap) than its children. This partial ordering is sufficient for many applications and allows for efficient O(log n) insertions and deletions while maintaining O(1) access to the maximum/minimum element.

## Properties

### Heap Property
- **Max Heap**: Parent ≥ Children (root is maximum)
- **Min Heap**: Parent ≤ Children (root is minimum)
- **Applies to all nodes**: Every parent-child relationship follows this rule
- **No ordering between siblings**: Left and right children have no required relationship

### Complete Binary Tree
- **All levels filled**: Except possibly the last level
- **Last level filled left to right**: No gaps in the last level
- **Height**: Always O(log n) for n elements
- **Compact structure**: Enables efficient array representation

### Array Representation
Heaps can be efficiently stored in an array without pointers:

**For node at index i (0-based indexing)**:
- **Left child**: 2i + 1
- **Right child**: 2i + 2
- **Parent**: floor((i - 1) / 2)

**For node at index i (1-based indexing)**:
- **Left child**: 2i
- **Right child**: 2i + 1
- **Parent**: floor(i / 2)

**Example**: Array [90, 80, 70, 60, 50, 40, 30]
```
        90
       /  \
      80   70
     / \   / \
    60 50 40 30
```

## Operations

### Insertion (O(log n))
**Process (Heapify-Up / Bubble-Up)**:
1. Add element at the next available position (end of array)
2. Compare with parent
3. If heap property violated, swap with parent
4. Continue moving up until heap property satisfied or reach root

**Example (Max Heap)**: Insert 85 into [90, 80, 70, 60, 50, 40, 30]
1. Add 85 at end: [90, 80, 70, 60, 50, 40, 30, 85]
2. Compare with parent (60): 85 > 60, swap
3. Compare with new parent (80): 85 > 80, swap
4. Compare with root (90): 85 < 90, stop

**Use Case**: Adding tasks to priority queue

### Deletion / Extract Max/Min (O(log n))
**Process (Heapify-Down / Bubble-Down)**:
1. Remove root element (max/min)
2. Replace root with last element
3. Compare with children
4. Swap with larger child (max heap) or smaller child (min heap)
5. Continue moving down until heap property satisfied or reach leaf

**Example (Max Heap)**: Delete root from [90, 80, 70, 60, 50, 40, 30]
1. Remove 90, replace with 30: [30, 80, 70, 60, 50, 40]
2. Compare with children (80, 70): 30 < 80, swap with 80
3. Compare with children (60, 50): 30 < 60, swap with 60
4. No more children, stop

**Use Case**: Processing highest priority task

### Peek / Get Max/Min (O(1))
- **Description**: Return root element without removing it
- **Max Heap**: Returns maximum element
- **Min Heap**: Returns minimum element
- **Use Case**: Check next priority item without processing

### Build Heap (O(n))
**Process (Heapify)**:
1. Start with unsorted array
2. Begin from last non-leaf node (index n/2 - 1)
3. Heapify-down each node going backwards to root
4. Results in valid heap

**Why O(n) not O(n log n)**:
- Most nodes are near bottom (fewer swaps needed)
- Mathematical analysis shows linear time
- More efficient than n insertions

**Use Case**: Heap sort, converting array to priority queue

### Increase/Decrease Key (O(log n))
- **Description**: Change value of a specific element
- **Increase Key (Max Heap)**: Heapify-up if increased
- **Decrease Key (Max Heap)**: Heapify-down if decreased
- **Use Case**: Updating priorities in priority queue

### Delete Arbitrary Element (O(log n))
1. Replace element with last element
2. Remove last element
3. Heapify-up or heapify-down as needed

## Time Complexity

| Operation | Time Complexity | Explanation |
|-----------|----------------|-------------|
| Insert    | O(log n)       | Heapify-up through height |
| Delete Max/Min | O(log n)  | Heapify-down through height |
| Peek Max/Min | O(1)         | Just return root |
| Build Heap | O(n)          | Heapify all nodes |
| Search    | O(n)           | No ordering, must check all |
| Increase/Decrease Key | O(log n) | Heapify operation |

## Space Complexity
- **Storage**: O(n) for n elements
- **Array Implementation**: No extra space for pointers
- **Recursion Stack**: O(log n) for recursive heapify
- **Iterative Implementation**: O(1) extra space

## Types of Heaps

### 1. Max Heap
- Root contains maximum element
- Parent ≥ Children
- Used for: Descending priority, heap sort (descending)

### 2. Min Heap
- Root contains minimum element
- Parent ≤ Children
- Used for: Ascending priority, heap sort (ascending)

### 3. Binary Heap
- Each node has at most 2 children
- Most common implementation
- Efficient array representation

### 4. D-ary Heap
- Each node has d children
- Trade-off: Shorter height, more comparisons per level
- Used when insertions dominate

### 5. Fibonacci Heap
- Advanced heap with better amortized time
- Decrease-key: O(1) amortized
- Used in: Advanced graph algorithms

## Real-World Applications

### 1. Priority Queues
- **Use**: Process items by priority, not arrival order
- **Example**: 
  - Operating system task scheduling
  - Emergency room patient prioritization
  - Network packet routing
- **Benefit**: O(1) access to highest priority, O(log n) updates

### 2. Heap Sort
- **Use**: Sorting algorithm
- **Process**:
  1. Build max heap: O(n)
  2. Repeatedly extract max: O(n log n)
- **Characteristics**:
  - Time: O(n log n) worst case
  - Space: O(1) in-place
  - Not stable
- **Use Case**: When guaranteed O(n log n) needed with O(1) space

### 3. Graph Algorithms
- **Dijkstra's Algorithm**: Find shortest path
  - Min heap stores vertices by distance
  - Extract minimum distance vertex
- **Prim's Algorithm**: Minimum spanning tree
  - Min heap stores edges by weight
- **A* Search**: Pathfinding
  - Priority queue for nodes to explore

### 4. Event-Driven Simulation
- **Use**: Process events in time order
- **Example**: Discrete event simulation
- **Benefit**: Always process next earliest event

### 5. Median Maintenance
- **Use**: Find median in streaming data
- **Approach**: Two heaps (max heap for lower half, min heap for upper half)
- **Benefit**: O(1) median access, O(log n) insertion

### 6. K-way Merge
- **Use**: Merge k sorted arrays/lists
- **Approach**: Min heap of size k with smallest element from each array
- **Time**: O(n log k) where n is total elements

### 7. Top K Elements
- **Use**: Find k largest/smallest elements
- **Approach**: 
  - K largest: Min heap of size k
  - K smallest: Max heap of size k
- **Time**: O(n log k)

### 8. Memory Management
- **Use**: Track free memory blocks
- **Benefit**: Quick allocation of best-fit block

### 9. Load Balancing
- **Use**: Distribute tasks to servers
- **Approach**: Min heap tracks server with least load
- **Benefit**: Always assign to least loaded server

## Heap vs Other Data Structures

| Feature | Heap | BST | Array (Sorted) | Hash Table |
|---------|------|-----|----------------|------------|
| Find Max/Min | O(1) | O(log n) | O(1) | O(n) |
| Insert | O(log n) | O(log n) | O(n) | O(1) |
| Delete Max/Min | O(log n) | O(log n) | O(n) | O(n) |
| Search | O(n) | O(log n) | O(log n) | O(1) |
| Space | O(n) | O(n) | O(n) | O(n) |
| Ordered | Partial | Yes | Yes | No |
| Best For | Priority | Sorted ops | Static data | Lookups |

## Advantages

- **Fast Access to Extremes**: O(1) access to max/min
- **Efficient Updates**: O(log n) insert and delete
- **Space Efficient**: Array representation, no pointers
- **Cache Friendly**: Contiguous memory in array
- **Guaranteed Height**: Always O(log n)
- **Simple Implementation**: Easier than balanced BSTs

## Disadvantages

- **No Fast Search**: O(n) to find arbitrary element
- **Partial Ordering**: Not fully sorted
- **No Range Queries**: Can't efficiently find elements in range
- **Fixed Priority**: Changing priorities requires updates
- **Not Stable**: Heap sort is not stable

## Common Problems

1. **Kth Largest Element**: Find kth largest in array
2. **Merge K Sorted Lists**: Combine multiple sorted lists
3. **Top K Frequent Elements**: Find k most frequent items
4. **Median of Stream**: Maintain median as numbers arrive
5. **Task Scheduler**: Schedule tasks with cooldown
6. **Sliding Window Maximum**: Max in each window of size k
7. **Reorganize String**: Rearrange so no adjacent duplicates

## Implementation Tips

### Array Indexing
**0-based (more common)**:
```
Parent: (i - 1) / 2
Left: 2i + 1
Right: 2i + 2
```

**1-based (simpler math)**:
```
Parent: i / 2
Left: 2i
Right: 2i + 1
```

### Heapify Direction
- **Heapify-Up**: After insertion (bubble up)
- **Heapify-Down**: After deletion (bubble down)

### Comparison Function
- Make heap generic with custom comparator
- Allows same code for max/min heap
- Enables priority queues with custom priorities

## Best Practices

1. **Use Array Implementation**: More efficient than tree nodes
2. **Choose Correct Heap Type**: Max vs min based on needs
3. **Build Heap for Bulk**: Use O(n) build instead of n insertions
4. **Consider D-ary Heap**: For insert-heavy workloads
5. **Validate Heap Property**: Test with edge cases
6. **Handle Empty Heap**: Check before peek/delete
7. **Use Standard Library**: Most languages have built-in priority queues

## When to Use Heaps

**Use Heap when you need**:
- Fast access to maximum or minimum
- Priority queue functionality
- Repeatedly extract extremes
- Partial ordering is sufficient
- Space-efficient structure

**Don't use Heap when**:
- Need to search for arbitrary elements
- Need full sorted order
- Need range queries
- All elements have equal priority (use queue)
- Need stable sorting

## Heap Sort Algorithm

**Process**:
1. Build max heap from array: O(n)
2. Swap root with last element
3. Reduce heap size by 1
4. Heapify root: O(log n)
5. Repeat steps 2-4 until heap size is 1

**Characteristics**:
- **Time**: O(n log n) worst, average, best case
- **Space**: O(1) in-place sorting
- **Stability**: Not stable
- **Use**: When guaranteed O(n log n) with O(1) space needed

**Comparison with other sorts**:
- **vs Quick Sort**: Slower average case, but guaranteed O(n log n)
- **vs Merge Sort**: Same time, but O(1) space vs O(n)
- **vs Insertion Sort**: Much faster for large data

## Interesting Facts

- Heaps are the underlying structure for priority queues in most languages
- The heap property is weaker than BST property, allowing faster operations
- Binary heap is optimal for priority queue when all operations are equally likely
- Fibonacci heap has better amortized bounds but complex implementation
- Heaps are used in the heapsort algorithm, one of the few O(n log n) in-place sorts
