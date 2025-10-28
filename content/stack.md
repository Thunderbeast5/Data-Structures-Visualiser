# Stack Data Structure

A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Think of it like a stack of plates - you can only add or remove plates from the top. The last plate you put on the stack is the first one you'll take off.

## Core Concept

The stack operates on a simple principle: the most recently added element is the first one to be removed. This makes it perfect for scenarios where you need to reverse the order of operations or keep track of nested structures.

## Operations

### Push (O(1))
- **Description**: Adds an element to the top of the stack
- **Process**: 
  1. Check if stack is full (in array implementation)
  2. Increment the top pointer
  3. Place the new element at the top position
- **Edge Case**: If stack is full, results in **stack overflow**
- **Use Case**: Adding a new function call, pushing an operand in expression evaluation

### Pop (O(1))
- **Description**: Removes and returns the top element from the stack
- **Process**:
  1. Check if stack is empty
  2. Retrieve the element at top position
  3. Decrement the top pointer
  4. Return the retrieved element
- **Edge Case**: If stack is empty, results in **stack underflow**
- **Use Case**: Returning from a function, completing an operation

### Peek/Top (O(1))
- **Description**: Returns the top element without removing it
- **Process**: Simply return the element at the top position
- **Edge Case**: Returns null/error if stack is empty
- **Use Case**: Checking the next operation without committing to it

### isEmpty (O(1))
- **Description**: Checks if the stack is empty
- **Returns**: Boolean value (true if empty, false otherwise)

### isFull (O(1))
- **Description**: Checks if the stack is full (array implementation)
- **Returns**: Boolean value (true if full, false otherwise)

### Size (O(1))
- **Description**: Returns the number of elements in the stack
- **Returns**: Integer representing current size

## Properties

- **LIFO Principle**: Last-In-First-Out ordering
- **Single Access Point**: Only the top element is directly accessible
- **Dynamic/Fixed Size**: Can be implemented with arrays (fixed) or linked lists (dynamic)
- **Ordered by Time**: Elements maintain their insertion order
- **No Random Access**: Cannot access middle elements without popping top elements

## Implementation Approaches

### 1. Array-Based Implementation
**Advantages**:
- Simple and efficient
- Cache-friendly (contiguous memory)
- Fast access to top element

**Disadvantages**:
- Fixed size (needs resizing)
- Memory waste if not fully utilized
- Stack overflow possible

### 2. Linked List Implementation
**Advantages**:
- Dynamic size (grows/shrinks as needed)
- No overflow (until system memory exhausted)
- Efficient memory usage

**Disadvantages**:
- Extra memory for pointers
- Slightly slower due to pointer dereferencing
- Not cache-friendly

## Time Complexity

| Operation | Time Complexity |
|-----------|----------------|
| Push      | O(1)          |
| Pop       | O(1)          |
| Peek      | O(1)          |
| isEmpty   | O(1)          |
| Search    | O(n)          |

## Space Complexity
- **Array Implementation**: O(n) where n is the maximum size
- **Linked List Implementation**: O(n) where n is the number of elements

## Real-World Applications

### 1. Function Call Stack
- Programming languages use stacks to manage function calls
- Each function call is pushed onto the call stack
- When a function returns, it's popped from the stack
- Enables recursion and nested function calls

### 2. Expression Evaluation
- **Infix to Postfix Conversion**: Converting mathematical expressions
- **Postfix Evaluation**: Evaluating reverse Polish notation
- **Syntax Parsing**: Checking balanced parentheses, brackets, and braces

### 3. Undo/Redo Operations
- Text editors maintain stacks of operations
- Undo: Pop from undo stack, push to redo stack
- Redo: Pop from redo stack, push to undo stack

### 4. Browser History
- Back button: Pop from history stack
- Forward button: Uses a separate forward stack
- Each visited page is pushed onto the stack

### 5. Backtracking Algorithms
- **Maze Solving**: Store path decisions
- **N-Queens Problem**: Track queen placements
- **Sudoku Solver**: Store cell value attempts
- **Tree/Graph Traversal**: Depth-First Search (DFS)

### 6. Memory Management
- **Stack Memory**: Local variables and function parameters
- **Activation Records**: Store function state during execution

### 7. String Reversal
- Push each character onto stack
- Pop all characters to get reversed string

## Common Problems

1. **Balanced Parentheses**: Check if brackets are properly matched
2. **Next Greater Element**: Find next greater element for each array element
3. **Stock Span Problem**: Calculate span of stock prices
4. **Largest Rectangle in Histogram**: Find maximum rectangular area
5. **Implement Queue using Stacks**: Use two stacks to simulate queue behavior

## Advantages

- Simple and intuitive operations
- Efficient O(1) time for all basic operations
- Useful for reversing order
- Natural fit for recursive algorithms
- Memory efficient for temporary storage

## Disadvantages

- Limited access (only top element)
- No random access to elements
- Fixed size in array implementation
- Can lead to stack overflow if not managed properly

## Best Practices

1. Always check for underflow before pop/peek
2. Check for overflow before push (array implementation)
3. Initialize with appropriate size for array implementation
4. Use linked list for unknown/variable size requirements
5. Clear stack when no longer needed to free memory