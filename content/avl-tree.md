# AVL Tree

An AVL tree (named after inventors Adelson-Velsky and Landis) is a self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes. It automatically maintains balance through rotations, guaranteeing O(log n) time complexity for all operations.

## Core Concept

While regular BSTs can become unbalanced and degrade to O(n) performance, AVL trees maintain strict balance by performing rotations whenever an insertion or deletion causes imbalance. This ensures the tree height never exceeds O(log n), providing consistent performance.

## Properties

### Balance Factor
- **Definition**: Balance Factor (BF) = Height(Left Subtree) - Height(Right Subtree)
- **Valid Range**: BF must be -1, 0, or +1 for every node
- **Imbalance Detection**: If |BF| > 1, the tree needs rebalancing

### Height Property
- For each node, the heights of its left and right subtrees differ by at most 1
- Tree height is always O(log n) where n is the number of nodes
- Maximum height ≈ 1.44 * log₂(n)

### BST Property
- Maintains all BST properties (left < root < right)
- All nodes follow the balance constraint
- Inorder traversal gives sorted sequence

### Performance Guarantee
- **Search**: Always O(log n)
- **Insert**: Always O(log n)
- **Delete**: Always O(log n)
- No worst-case degradation to O(n) like regular BST

## Balance Factor States

- **BF = 0**: Perfectly balanced (both subtrees same height)
- **BF = +1**: Left subtree is 1 level taller (left-heavy)
- **BF = -1**: Right subtree is 1 level taller (right-heavy)
- **BF = +2**: Left subtree too tall - needs right rotation
- **BF = -2**: Right subtree too tall - needs left rotation

## Rotations

Rotations are the key mechanism for maintaining balance. They restructure the tree while preserving BST properties.

### 1. Left Rotation (LL Rotation)
- **When**: Right subtree is too tall (BF = -2) and right child is right-heavy (BF = -1)
- **Action**: Rotate the imbalanced node to the left
- **Process**:
  1. Right child becomes new root
  2. Old root becomes left child of new root
  3. Left subtree of right child becomes right subtree of old root
- **Use Case**: Fixing right-right imbalance

### 2. Right Rotation (RR Rotation)
- **When**: Left subtree is too tall (BF = +2) and left child is left-heavy (BF = +1)
- **Action**: Rotate the imbalanced node to the right
- **Process**:
  1. Left child becomes new root
  2. Old root becomes right child of new root
  3. Right subtree of left child becomes left subtree of old root
- **Use Case**: Fixing left-left imbalance

### 3. Left-Right Rotation (LR Rotation)
- **When**: Left subtree too tall (BF = +2) and left child is right-heavy (BF = -1)
- **Action**: First left rotation on left child, then right rotation on root
- **Process**:
  1. Perform left rotation on left child
  2. Perform right rotation on root
- **Use Case**: Fixing left-right imbalance

### 4. Right-Left Rotation (RL Rotation)
- **When**: Right subtree too tall (BF = -2) and right child is left-heavy (BF = +1)
- **Action**: First right rotation on right child, then left rotation on root
- **Process**:
  1. Perform right rotation on right child
  2. Perform left rotation on root
- **Use Case**: Fixing right-left imbalance

## Operations

### Insertion (O(log n))
- **Process**:
  1. Insert node like in regular BST
  2. Update heights of ancestor nodes
  3. Calculate balance factors
  4. If imbalance detected (|BF| > 1), perform appropriate rotation
  5. Continue checking up to root
- **Key Point**: Only one rotation (or double rotation) needed per insertion

### Deletion (O(log n))
- **Process**:
  1. Delete node like in regular BST
  2. Update heights of ancestor nodes
  3. Calculate balance factors
  4. If imbalance detected, perform appropriate rotation
  5. Continue checking and rotating up to root
- **Key Point**: May need multiple rotations along the path to root

### Search (O(log n))
- **Process**: Same as BST search
- **Advantage**: Guaranteed O(log n) due to balanced height
- No rebalancing needed for search operations

## Time Complexity

| Operation | Time Complexity | Explanation |
|-----------|----------------|-------------|
| Search    | O(log n)       | Guaranteed balanced height |
| Insert    | O(log n)       | Insert + at most 2 rotations |
| Delete    | O(log n)       | Delete + O(log n) rotations |
| Find Min  | O(log n)       | Go left until null |
| Find Max  | O(log n)       | Go right until null |
| Rotation  | O(1)           | Constant pointer changes |

## Space Complexity
- **Storage**: O(n) for n nodes
- **Extra Space per Node**: O(1) for height/balance factor
- **Recursion Stack**: O(log n) for operations

## Real-World Applications

### 1. Database Indexing
- **Use**: Maintaining sorted indices with frequent updates
- **Benefit**: Guaranteed fast lookups even with insertions/deletions
- **Example**: MySQL, PostgreSQL use variants of balanced trees

### 2. Memory Management
- **Use**: Tracking free memory blocks
- **Benefit**: Fast allocation and deallocation
- **Example**: Operating system memory allocators

### 3. File Systems
- **Use**: Directory structures, file indexing
- **Benefit**: Fast file lookup and navigation
- **Example**: Some file systems use balanced tree structures

### 4. In-Memory Databases
- **Use**: Maintaining sorted data in RAM
- **Benefit**: Fast queries with frequent updates
- **Example**: Redis sorted sets (uses skip lists, similar concept)

### 5. Network Routing
- **Use**: Routing table lookups
- **Benefit**: Fast route determination

### 6. Autocomplete Systems
- **Use**: Maintaining sorted suggestions
- **Benefit**: Fast prefix searches with updates

## AVL vs Regular BST

| Feature | AVL Tree | Regular BST |
|---------|----------|-------------|
| Balance | Always balanced | Can become skewed |
| Height | O(log n) guaranteed | O(n) worst case |
| Search | O(log n) always | O(n) worst case |
| Insert | O(log n) always | O(n) worst case |
| Delete | O(log n) always | O(n) worst case |
| Rotations | Required | Not needed |
| Overhead | Extra height storage | Minimal |
| Best For | Frequent searches | Simple use cases |

## AVL vs Red-Black Tree

| Feature | AVL Tree | Red-Black Tree |
|---------|----------|----------------|
| Balance | Strictly balanced | Loosely balanced |
| Height | ~1.44 log n | ~2 log n |
| Search | Faster | Slightly slower |
| Insert | Slower (more rotations) | Faster |
| Delete | Slower (more rotations) | Faster |
| Use Case | Read-heavy workloads | Write-heavy workloads |

## Advantages

- **Guaranteed Performance**: O(log n) for all operations, no worst case
- **Faster Searches**: More strictly balanced than Red-Black trees
- **Predictable**: No performance surprises
- **Self-Maintaining**: Automatically stays balanced
- **Sorted Order**: Inorder traversal gives sorted data

## Disadvantages

- **More Rotations**: Requires more rotations than Red-Black trees
- **Slower Insertions/Deletions**: Due to rebalancing overhead
- **Extra Storage**: Needs to store height or balance factor
- **Complex Implementation**: More complex than regular BST
- **Not Best for Write-Heavy**: Red-Black trees better for frequent updates

## Common Problems

1. **Implement AVL Tree**: Build complete AVL tree with all operations
2. **Check if Tree is Balanced**: Verify AVL property
3. **Convert BST to AVL**: Balance an existing BST
4. **Count Rotations**: Track rotations during operations
5. **Find Imbalanced Node**: Identify first imbalanced node

## Best Practices

1. **Update Heights Bottom-Up**: Always update heights after modifications
2. **Check Balance After Every Insert/Delete**: Don't skip balance checks
3. **Use Recursion Carefully**: Be mindful of stack space
4. **Test Edge Cases**: Single node, two nodes, long chains
5. **Consider Alternatives**: Use Red-Black for write-heavy workloads
6. **Visualize Rotations**: Draw diagrams to understand rotations
7. **Maintain Invariants**: Always preserve BST property during rotations

## When to Use AVL Trees

**Use AVL when**:
- Search operations dominate (read-heavy workload)
- Need guaranteed O(log n) performance
- Data size is moderate (not millions of nodes)
- Strict balance is important
- Predictable performance is critical

**Don't use AVL when**:
- Frequent insertions/deletions (use Red-Black instead)
- Simple lookups suffice (use hash table)
- Memory is very constrained
- Implementation complexity is a concern
