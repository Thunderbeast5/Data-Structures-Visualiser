# Binary Search Tree (BST)

A Binary Search Tree is a hierarchical data structure composed of nodes, where each node contains a value and has up to two children (left and right). The key property is that for any node, all values in its left subtree are smaller, and all values in its right subtree are larger.

## Core Concept

A BST maintains a sorted order that enables efficient searching, insertion, and deletion operations. The tree structure allows for O(log n) operations in balanced cases, making it much faster than linear data structures for large datasets.

## Properties

### BST Property (Most Important)
- **Left Subtree**: All nodes in the left subtree have values **less than** the parent node
- **Right Subtree**: All nodes in the right subtree have values **greater than** the parent node
- **Recursive Property**: This property holds for every node in the tree
- **No Duplicates**: Typically, BSTs don't allow duplicate values (though some implementations do)

### Structural Properties
- Each node has at most two children
- Each node contains a key/value and references to left and right children
- The root is the topmost node
- Nodes with no children are called leaf nodes
- Height of tree affects performance

## Operations

### Search (O(log n) average, O(n) worst)
- **Description**: Find if a value exists in the tree
- **Process**:
  1. Start at root
  2. If target equals current node, found!
  3. If target < current node, go left
  4. If target > current node, go right
  5. Repeat until found or reach null
- **Use Case**: Dictionary lookups, database indexing

### Insertion (O(log n) average, O(n) worst)
- **Description**: Add a new value to the tree
- **Process**:
  1. Start at root
  2. Compare value with current node
  3. Go left if smaller, right if larger
  4. When you reach null, insert there
  5. Maintain BST property
- **Use Case**: Adding new records, building index

### Deletion (O(log n) average, O(n) worst)
- **Description**: Remove a value from the tree
- **Three Cases**:
  
  **Case 1: Leaf Node (No Children)**
  - Simply remove the node
  - Update parent's pointer to null
  
  **Case 2: One Child**
  - Replace node with its child
  - Connect parent directly to child
  
  **Case 3: Two Children (Most Complex)**
  - Find inorder successor (smallest in right subtree) OR
  - Find inorder predecessor (largest in left subtree)
  - Replace node's value with successor/predecessor
  - Delete the successor/predecessor node

### Find Minimum (O(log n) average)
- **Description**: Find the smallest value
- **Process**: Keep going left until you can't go further
- **Use Case**: Finding minimum element, inorder successor

### Find Maximum (O(log n) average)
- **Description**: Find the largest value
- **Process**: Keep going right until you can't go further
- **Use Case**: Finding maximum element, inorder predecessor

## Tree Traversals

### 1. Inorder Traversal (Left, Root, Right)
- **Order**: Left subtree → Root → Right subtree
- **Result**: Visits nodes in **sorted ascending order**
- **Use Case**: Getting sorted data, validating BST
- **Example**: For tree with 5 as root, 3 left, 7 right → Output: 3, 5, 7

### 2. Preorder Traversal (Root, Left, Right)
- **Order**: Root → Left subtree → Right subtree
- **Result**: Root comes first
- **Use Case**: Creating copy of tree, prefix expressions
- **Example**: For tree with 5 as root, 3 left, 7 right → Output: 5, 3, 7

### 3. Postorder Traversal (Left, Right, Root)
- **Order**: Left subtree → Right subtree → Root
- **Result**: Root comes last
- **Use Case**: Deleting tree, postfix expressions
- **Example**: For tree with 5 as root, 3 left, 7 right → Output: 3, 7, 5

### 4. Level Order Traversal (Breadth-First)
- **Order**: Level by level, left to right
- **Implementation**: Uses a queue
- **Use Case**: Finding shortest path, level-wise processing

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| Search    | O(log n)    | O(n)       |
| Insert    | O(log n)    | O(n)       |
| Delete    | O(log n)    | O(n)       |
| Traversal | O(n)        | O(n)       |

**Note**: Worst case O(n) occurs when tree becomes skewed (like a linked list)

## Space Complexity
- **Storage**: O(n) for n nodes
- **Recursion Stack**: O(h) where h is height
- **Balanced Tree**: O(log n) stack space
- **Skewed Tree**: O(n) stack space

## Real-World Applications

### 1. Database Indexing
- B-trees and B+ trees (variants of BST)
- Fast record retrieval
- Efficient range queries

### 2. File Systems
- Directory structure
- File organization
- Quick file lookup

### 3. Expression Trees
- Parsing mathematical expressions
- Compiler design
- Calculator implementations

### 4. Auto-Complete Features
- Search suggestions
- Text editors
- Search engines

### 5. Decision Trees
- Machine learning algorithms
- Game AI
- Classification problems

## Advantages

- **Efficient Search**: O(log n) average case
- **Sorted Order**: Inorder traversal gives sorted data
- **Dynamic Size**: Can grow and shrink as needed
- **Flexible Operations**: Supports various operations efficiently
- **Range Queries**: Easy to find elements in a range

## Disadvantages

- **Can Become Unbalanced**: Worst case O(n) if skewed
- **No Random Access**: Unlike arrays
- **Extra Memory**: Requires space for pointers
- **Complex Deletion**: Especially for nodes with two children
- **Not Cache-Friendly**: Nodes scattered in memory

## Common Problems

1. **Validate BST**: Check if a tree is a valid BST
2. **Lowest Common Ancestor**: Find LCA of two nodes
3. **Convert Sorted Array to BST**: Build balanced BST
4. **Kth Smallest Element**: Find kth smallest value
5. **Inorder Successor**: Find next larger element

## Best Practices

1. **Keep Tree Balanced**: Use self-balancing trees (AVL, Red-Black) for guaranteed O(log n)
2. **Handle Duplicates**: Decide policy - reject, allow, or count
3. **Validate Input**: Check for null nodes and edge cases
4. **Consider Alternatives**: Use hash tables for simple lookups
5. **Memory Management**: Properly delete nodes to avoid memory leaks