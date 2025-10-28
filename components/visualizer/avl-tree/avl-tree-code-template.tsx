"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, Play } from "lucide-react"
import { useState } from "react"

const cppCode = `#include <iostream>
using namespace std;

// =========================
// 📘 Node Structure
// =========================
class Node {
public:
    int key;
    Node* left;
    Node* right;
    int height;

    Node(int value) {
        key = value;
        left = right = nullptr;
        height = 1;
    }
};

// =========================
// ⚙️ AVL Tree Class
// =========================
class AVL {
public:
    Node* root;

    AVL() {
        root = nullptr;
    }

    // Get height of the node
    int height(Node* N) {
        if (N == nullptr)
            return 0;
        return N->height;
    }

    // Get balance factor of a node
    int getBalance(Node* N) {
        if (N == nullptr)
            return 0;
        return height(N->left) - height(N->right);
    }

    // Perform Right Rotation
    Node* rightRotate(Node* y) {
        Node* x = y->left;
        Node* T2 = x->right;

        // Perform rotation
        x->right = y;
        y->left = T2;

        // Update heights
        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;

        // Return new root
        return x;
    }

    // Perform Left Rotation
    Node* leftRotate(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;

        // Perform rotation
        y->left = x;
        x->right = T2;

        // Update heights
        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;

        // Return new root
        return y;
    }

    // =========================
    // 🌳 Insert a Node
    // =========================
    Node* insert(Node* node, int key) {
        // Step 1: Normal BST insert
        if (node == nullptr)
            return new Node(key);

        if (key < node->key)
            node->left = insert(node->left, key);
        else if (key > node->key)
            node->right = insert(node->right, key);
        else
            return node;

        // Step 2: Update height
        node->height = 1 + max(height(node->left), height(node->right));

        // Step 3: Get balance factor
        int balance = getBalance(node);

        // Step 4: Balance the tree
        // Left Left
        if (balance > 1 && key < node->left->key)
            return rightRotate(node);

        // Right Right
        if (balance < -1 && key > node->right->key)
            return leftRotate(node);

        // Left Right
        if (balance > 1 && key > node->left->key) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }

        // Right Left
        if (balance < -1 && key < node->right->key) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }

        return node;
    }

    // =========================
    // 🔍 Find Minimum Node
    // =========================
    Node* minValueNode(Node* node) {
        Node* current = node;
        while (current->left != nullptr)
            current = current->left;
        return current;
    }

    // =========================
    // ❌ Delete a Node
    // =========================
    Node* deleteNode(Node* root, int key) {
        // Step 1: Normal BST deletion
        if (root == nullptr)
            return root;

        if (key < root->key)
            root->left = deleteNode(root->left, key);
        else if (key > root->key)
            root->right = deleteNode(root->right, key);
        else {
            // Node with one or no child
            if ((root->left == nullptr) || (root->right == nullptr)) {
                Node* temp = root->left ? root->left : root->right;
                if (temp == nullptr) {
                    temp = root;
                    root = nullptr;
                } else
                    *root = *temp;
                delete temp;
            } else {
                // Node with two children
                Node* temp = minValueNode(root->right);
                root->key = temp->key;
                root->right = deleteNode(root->right, temp->key);
            }
        }

        if (root == nullptr)
            return root;

        // Step 2: Update height
        root->height = 1 + max(height(root->left), height(root->right));

        // Step 3: Balance factor
        int balance = getBalance(root);

        // Step 4: Balance the tree
        // Left Left
        if (balance > 1 && getBalance(root->left) >= 0)
            return rightRotate(root);

        // Left Right
        if (balance > 1 && getBalance(root->left) < 0) {
            root->left = leftRotate(root->left);
            return rightRotate(root);
        }

        // Right Right
        if (balance < -1 && getBalance(root->right) <= 0)
            return leftRotate(root);

        // Right Left
        if (balance < -1 && getBalance(root->right) > 0) {
            root->right = rightRotate(root->right);
            return leftRotate(root);
        }

        return root;
    }

    // =========================
    // 🌿 Traversals
    // =========================
    void preOrder(Node* root) {
        if (root != nullptr) {
            cout << root->key << " ";
            preOrder(root->left);
            preOrder(root->right);
        }
    }

    void inOrder(Node* root) {
        if (root != nullptr) {
            inOrder(root->left);
            cout << root->key << " ";
            inOrder(root->right);
        }
    }

    void postOrder(Node* root) {
        if (root != nullptr) {
            postOrder(root->left);
            postOrder(root->right);
            cout << root->key << " ";
        }
    }
};

// =========================
// 🧠 Main Function
// =========================
int main() {
    AVL tree;

    // Insert elements
    tree.root = tree.insert(tree.root, 10);
    tree.root = tree.insert(tree.root, 20);
    tree.root = tree.insert(tree.root, 30);
    tree.root = tree.insert(tree.root, 40);
    tree.root = tree.insert(tree.root, 50);
    tree.root = tree.insert(tree.root, 25);

    cout << "Preorder Traversal of AVL Tree: ";
    tree.preOrder(tree.root);
    cout << endl;

    cout << "Inorder Traversal of AVL Tree: ";
    tree.inOrder(tree.root);
    cout << endl;

    cout << "Postorder Traversal of AVL Tree: ";
    tree.postOrder(tree.root);
    cout << endl;

    // Delete operation
    tree.root = tree.deleteNode(tree.root, 40);
    cout << "\\nAfter deleting 40, Inorder Traversal: ";
    tree.inOrder(tree.root);
    cout << endl;

    return 0;
}`

const expectedOutput = `Preorder Traversal of AVL Tree: 30 20 10 25 40 50 
Inorder Traversal of AVL Tree: 10 20 25 30 40 50 
Postorder Traversal of AVL Tree: 10 25 20 50 40 30 

After deleting 40, Inorder Traversal: 10 20 25 30 50 

AVL Tree After Insertions:
        30
       /  \\
     20    40
    / \\      \\
  10  25      50

After deleting 40:
        30
       /  \\
     20    50
    / \\
  10  25`

const templates = {
  cpp: { name: "C++", code: cppCode, extension: "cpp" }
}

export function AVLTreeCodeTemplate() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(templates.cpp.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadCode = () => {
    const template = templates.cpp
    const blob = new Blob([template.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `avl_tree.${template.extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">AVL Tree - Complete Implementation</CardTitle>
            <div className="flex gap-2">
              <Button variant="default" size="sm">C++</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy Code"}
              </Button>
              <Button
                onClick={downloadCode}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96">
              <pre className="text-sm text-gray-300">
                <code>{templates.cpp.code}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Play className="h-5 w-5" />
            Expected Output
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
              <code>{expectedOutput}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">AVL Tree Operations Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-400">⚖️ Self-Balancing</h4>
                <p className="text-sm text-muted-foreground">Height difference between left and right subtrees is at most 1.</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-400">🔄 Rotations</h4>
                <p className="text-sm text-muted-foreground">Left, Right, Left-Right, Right-Left rotations maintain balance.</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-400">📏 Height Tracking</h4>
                <p className="text-sm text-muted-foreground">Each node stores its height for efficient balance factor calculation.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <h4 className="font-semibold text-orange-400">⚡ Performance</h4>
                <p className="text-sm text-muted-foreground">Guaranteed O(log n) for search, insert, and delete operations.</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <h4 className="font-semibold text-red-400">🎯 Balance Factor</h4>
                <p className="text-sm text-muted-foreground">BF = height(left) - height(right). Must be -1, 0, or 1.</p>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-cyan-400">🌿 Traversals</h4>
                <p className="text-sm text-muted-foreground">Inorder gives sorted sequence. All traversals work like BST.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
