# Queue Data Structure

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Think of it like a line of people waiting at a ticket counter - the first person to join the line is the first one to be served. Elements are added at the rear (back) and removed from the front.

## Core Concept

The queue operates on a fair principle: whoever arrives first gets served first. This makes it ideal for managing resources, scheduling tasks, and handling requests in the order they arrive.

## Operations

### Enqueue (O(1))
- **Description**: Adds an element to the rear (back) of the queue
- **Process**:
  1. Check if queue is full (in array implementation)
  2. Increment the rear pointer
  3. Place the new element at the rear position
- **Edge Case**: If queue is full, results in **queue overflow**
- **Use Case**: Adding a new task to process, queuing a print job

### Dequeue (O(1))
- **Description**: Removes and returns the element from the front of the queue
- **Process**:
  1. Check if queue is empty
  2. Retrieve the element at front position
  3. Increment the front pointer
  4. Return the retrieved element
- **Edge Case**: If queue is empty, results in **queue underflow**
- **Use Case**: Processing the next task, serving the next customer

### Front/Peek (O(1))
- **Description**: Returns the front element without removing it
- **Process**: Simply return the element at the front position
- **Edge Case**: Returns null/error if queue is empty
- **Use Case**: Checking what will be processed next without removing it

### Rear (O(1))
- **Description**: Returns the last element in the queue
- **Returns**: Element at the rear position

### isEmpty (O(1))
- **Description**: Checks if the queue is empty
- **Returns**: Boolean value (true if empty, false otherwise)

### isFull (O(1))
- **Description**: Checks if the queue is full (array implementation)
- **Returns**: Boolean value (true if full, false otherwise)

### Size (O(1))
- **Description**: Returns the number of elements in the queue
- **Returns**: Integer representing current size

## Properties

- **FIFO Principle**: First-In-First-Out ordering
- **Two Access Points**: Front for removal, rear for insertion
- **Dynamic/Fixed Size**: Can be implemented with arrays (fixed) or linked lists (dynamic)
- **Ordered by Arrival**: Elements maintain their arrival order
- **Fair Processing**: Ensures no element is starved
- **Two Pointers**: Maintains front and rear pointers

## Implementation Approaches

### 1. Simple Array Implementation
**Advantages**:
- Simple to implement
- Fast operations
- Cache-friendly

**Disadvantages**:
- Fixed size
- Wasted space (front elements can't be reused)
- Need to shift elements or use circular approach

### 2. Circular Array Implementation
**Advantages**:
- Efficient space utilization
- No wasted space
- Fixed size with optimal usage
- Fast O(1) operations

**Disadvantages**:
- Slightly complex logic
- Still fixed size
- Need to handle wrap-around

**How it works**:
- Use modulo operator to wrap around: `rear = (rear + 1) % capacity`
- Front and rear can wrap to beginning of array

### 3. Linked List Implementation
**Advantages**:
- Dynamic size (grows/shrinks as needed)
- No overflow until system memory exhausted
- No wasted space

**Disadvantages**:
- Extra memory for pointers
- Slightly slower due to pointer operations
- Not cache-friendly

### 4. Double-Ended Queue (Deque)
- Allows insertion and deletion from both ends
- More flexible than standard queue
- Can function as both stack and queue

## Time Complexity

| Operation | Time Complexity |
|-----------|----------------|
| Enqueue   | O(1)          |
| Dequeue   | O(1)          |
| Front     | O(1)          |
| Rear      | O(1)          |
| isEmpty   | O(1)          |
| Search    | O(n)          |

## Space Complexity
- **Array Implementation**: O(n) where n is the maximum capacity
- **Linked List Implementation**: O(n) where n is the number of elements
- **Circular Array**: O(n) with better space utilization

## Real-World Applications

### 1. Operating System Process Scheduling
- **CPU Scheduling**: Processes waiting for CPU time
- **Round-Robin Scheduling**: Each process gets equal time slice
- **Job Scheduling**: Managing batch jobs
- **I/O Request Handling**: Disk scheduling, printer spooling

### 2. Network and Communication
- **Router Packet Queues**: Managing network packets
- **Message Queues**: Asynchronous communication between services
- **Call Center Systems**: Managing incoming calls
- **Email Queues**: Sending emails in order

### 3. Web Servers
- **Request Handling**: Processing HTTP requests in order
- **Load Balancing**: Distributing requests across servers
- **Rate Limiting**: Throttling requests

### 4. Breadth-First Search (BFS)
- **Graph Traversal**: Exploring nodes level by level
- **Shortest Path**: Finding shortest path in unweighted graphs
- **Social networks**: Friend suggestions, connection degrees

### 5. Print Spooling
- **Print Queue**: Managing multiple print jobs
- **Document Processing**: Processing documents in order

### 6. Customer Service
- **Ticket Systems**: Support tickets processed in order
- **Queue Management**: Physical queues in banks, hospitals
- **Appointment Scheduling**: Managing appointments

### 7. Simulation Systems
- **Traffic Simulation**: Modeling vehicle queues
- **Banking Systems**: Customer service simulation
- **Manufacturing**: Production line management

### 8. Buffering
- **Video Streaming**: Buffering video data
- **Keyboard Buffer**: Storing keystrokes
- **I/O Buffers**: Managing input/output operations

## Queue Variants

### 1. Priority Queue
- Elements have associated priorities
- Higher priority elements dequeued first
- Used in: Dijkstra's algorithm, A* search, task scheduling

### 2. Circular Queue
- Last position connects to first position
- Efficient space utilization
- Used in: Memory management, traffic systems

### 3. Double-Ended Queue (Deque)
- Insertion and deletion at both ends
- More flexible operations
- Used in: Sliding window problems, palindrome checking

### 4. Blocking Queue
- Thread-safe queue with blocking operations
- Used in: Producer-consumer problems, thread pools

## Common Problems

1. **Implement Queue using Stacks**: Use two stacks to simulate queue
2. **Sliding Window Maximum**: Find maximum in each window of size k
3. **First Non-Repeating Character**: Find first unique character in stream
4. **Generate Binary Numbers**: Generate binary numbers from 1 to n
5. **Level Order Traversal**: Traverse tree level by level

## Advantages

- Fair and predictable ordering (FIFO)
- Efficient O(1) operations for enqueue and dequeue
- Natural fit for scheduling and buffering
- Prevents starvation (all elements eventually processed)
- Easy to implement and understand

## Disadvantages

- Limited access (only front and rear accessible)
- No random access to middle elements
- Fixed size in array implementation
- Wasted space in simple array implementation
- Cannot prioritize urgent items (use priority queue instead)

## Best Practices

1. Use circular array for fixed-size queues to avoid space waste
2. Use linked list for dynamic size requirements
3. Always check for underflow before dequeue
4. Check for overflow before enqueue (array implementation)
5. Consider priority queue if elements need prioritization
6. Use deque if you need flexibility at both ends
7. Implement thread-safe queues for concurrent access

## Comparison with Stack

| Feature | Stack | Queue |
|---------|-------|-------|
| Principle | LIFO | FIFO |
| Insertion | Top only | Rear only |
| Deletion | Top only | Front only |
| Access Points | One (top) | Two (front & rear) |
| Use Case | Recursion, Undo | Scheduling, Buffering |