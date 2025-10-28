"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, Play } from "lucide-react"
import { useState } from "react"

const cppCode = `// ==========================================================
// 🌳 BINARY SEARCH TREE (BST) IMPLEMENTATION IN C++
// ==========================================================
// Includes:
// 1️⃣ Node creation
// 2️⃣ Insertion
// 3️⃣ Searching
// 4️⃣ Deletion
// 5️⃣ Traversals: Inorder, Preorder, Postorder
// 6️⃣ Finding Minimum & Maximum nodes
// ==========================================================

#include <iostream>
using namespace std;

// ==========================================================
// 🧩 Node Structure
// ==========================================================
class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};

// ==========================================================
// 🧠 Insert Node into BST
// ==========================================================
Node* insert(Node* root, int val) {
    if (root == nullptr) {
        return new Node(val);
    }
    if (val < root->data)
        root->left = insert(root->left, val);
    else if (val > root->data)
        root->right = insert(root->right, val);
    return root;
}

// ==========================================================
// 🔍 Search in BST
// ==========================================================
Node* search(Node* root, int key) {
    if (root == nullptr || root->data == key)
        return root;
    if (key < root->data)
        return search(root->left, key);
    return search(root->right, key);
}

// ==========================================================
// 🚮 Find Minimum Value Node (Helper for Deletion)
// ==========================================================
Node* findMin(Node* root) {
    while (root && root->left != nullptr)
        root = root->left;
    return root;
}

// ==========================================================
// ❌ Delete a Node from BST
// ==========================================================
Node* deleteNode(Node* root, int key) {
    if (root == nullptr) return root;

    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        // Node found
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        } 
        else if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        // Node with two children
        Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}

// ==========================================================
// 🌿 Traversal Functions
// ==========================================================
void inorder(Node* root) {
    if (root == nullptr) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

void preorder(Node* root) {
    if (root == nullptr) return;
    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

void postorder(Node* root) {
    if (root == nullptr) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}

// ==========================================================
// 📈 Find Minimum and Maximum Value in BST
// ==========================================================
int findMinValue(Node* root) {
    Node* temp = root;
    while (temp && temp->left != nullptr)
        temp = temp->left;
    return temp->data;
}

int findMaxValue(Node* root) {
    Node* temp = root;
    while (temp && temp->right != nullptr)
        temp = temp->right;
    return temp->data;
}

// ==========================================================
// 🚀 Demonstration Function
// ==========================================================
void BSTDemo() {
    cout << "\\n===== Binary Search Tree Operations =====" << endl;

    Node* root = nullptr;

    // Insertion
    int elements[] = {50, 30, 70, 20, 40, 60, 80};
    for (int val : elements)
        root = insert(root, val);

    cout << "Inorder Traversal (Sorted Order): ";
    inorder(root);
    cout << endl;

    cout << "Preorder Traversal: ";
    preorder(root);
    cout << endl;

    cout << "Postorder Traversal: ";
    postorder(root);
    cout << endl;

    // Searching
    int key = 40;
    cout << "\\nSearching for " << key << " ... ";
    Node* found = search(root, key);
    if (found)
        cout << "Found!" << endl;
    else
        cout << "Not Found!" << endl;

    // Deletion
    cout << "\\nDeleting 20, 30, and 50 ..." << endl;
    root = deleteNode(root, 20);
    root = deleteNode(root, 30);
    root = deleteNode(root, 50);

    cout << "Inorder Traversal after Deletion: ";
    inorder(root);
    cout << endl;

    // Minimum and Maximum
    cout << "\\nMinimum Value in BST: " << findMinValue(root) << endl;
    cout << "Maximum Value in BST: " << findMaxValue(root) << endl;
}

// ==========================================================
// 🧩 MAIN FUNCTION — Run BST Demonstration
// ==========================================================
int main() {
    cout << "=========== BINARY SEARCH TREE IMPLEMENTATION ===========\\n";
    BSTDemo();
    cout << "----------------------------------------------------------\\n";
    cout << "✅ All BST Operations Executed Successfully.\\n";
    return 0;
}`

const expectedOutput = `=========== BINARY SEARCH TREE IMPLEMENTATION ===========

===== Binary Search Tree Operations =====
Inorder Traversal (Sorted Order): 20 30 40 50 60 70 80 
Preorder Traversal: 50 30 20 40 70 60 80 
Postorder Traversal: 20 40 30 60 80 70 50 

Searching for 40 ... Found!

Deleting 20, 30, and 50 ...
Inorder Traversal after Deletion: 40 60 70 80 

Minimum Value in BST: 40
Maximum Value in BST: 80
----------------------------------------------------------
✅ All BST Operations Executed Successfully.`

const javaCode = `import java.util.*;

// ==========================================================
// 🌳 BINARY SEARCH TREE (BST) IMPLEMENTATION IN JAVA
// ==========================================================

// ==========================================================
// 🧩 Node Class
// ==========================================================
class Node {
    int data;
    Node left, right;

    public Node(int val) {
        data = val;
        left = right = null;
    }
}

// ==========================================================
// 🌳 Binary Search Tree Class
// ==========================================================
class BinarySearchTree {
    Node root;

    public BinarySearchTree() {
        root = null;
    }

    // ==========================================================
    // 🧠 Insert Node into BST
    // ==========================================================
    public Node insert(Node root, int val) {
        if (root == null) {
            return new Node(val);
        }
        if (val < root.data)
            root.left = insert(root.left, val);
        else if (val > root.data)
            root.right = insert(root.right, val);
        return root;
    }

    public void insert(int val) {
        root = insert(root, val);
    }

    // ==========================================================
    // 🔍 Search in BST
    // ==========================================================
    public Node search(Node root, int key) {
        if (root == null || root.data == key)
            return root;
        if (key < root.data)
            return search(root.left, key);
        return search(root.right, key);
    }

    public boolean search(int key) {
        return search(root, key) != null;
    }

    // ==========================================================
    // 🚮 Find Minimum Value Node
    // ==========================================================
    public Node findMin(Node root) {
        while (root != null && root.left != null)
            root = root.left;
        return root;
    }

    // ==========================================================
    // ❌ Delete a Node from BST
    // ==========================================================
    public Node deleteNode(Node root, int key) {
        if (root == null) return root;

        if (key < root.data)
            root.left = deleteNode(root.left, key);
        else if (key > root.data)
            root.right = deleteNode(root.right, key);
        else {
            // Node found
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;

            // Node with two children
            Node temp = findMin(root.right);
            root.data = temp.data;
            root.right = deleteNode(root.right, temp.data);
        }
        return root;
    }

    public void delete(int key) {
        root = deleteNode(root, key);
    }

    // ==========================================================
    // 🌿 Traversal Functions
    // ==========================================================
    public void inorder(Node root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    public void preorder(Node root) {
        if (root == null) return;
        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }

    public void postorder(Node root) {
        if (root == null) return;
        postorder(root.left);
        postorder(root.right);
        System.out.print(root.data + " ");
    }

    // ==========================================================
    // 📈 Find Minimum and Maximum Value in BST
    // ==========================================================
    public int findMinValue() {
        Node temp = root;
        while (temp != null && temp.left != null)
            temp = temp.left;
        return temp.data;
    }

    public int findMaxValue() {
        Node temp = root;
        while (temp != null && temp.right != null)
            temp = temp.right;
        return temp.data;
    }

    // ==========================================================
    // 🚀 Demonstration Function
    // ==========================================================
    public void BSTDemo() {
        System.out.println("\\n===== Binary Search Tree Operations =====");

        // Insertion
        int[] elements = {50, 30, 70, 20, 40, 60, 80};
        for (int val : elements)
            insert(val);

        System.out.print("Inorder Traversal (Sorted Order): ");
        inorder(root);
        System.out.println();

        System.out.print("Preorder Traversal: ");
        preorder(root);
        System.out.println();

        System.out.print("Postorder Traversal: ");
        postorder(root);
        System.out.println();

        // Searching
        int key = 40;
        System.out.print("\\nSearching for " + key + " ... ");
        if (search(key))
            System.out.println("Found!");
        else
            System.out.println("Not Found!");

        // Deletion
        System.out.println("\\nDeleting 20, 30, and 50 ...");
        delete(20);
        delete(30);
        delete(50);

        System.out.print("Inorder Traversal after Deletion: ");
        inorder(root);
        System.out.println();

        // Minimum and Maximum
        System.out.println("\\nMinimum Value in BST: " + findMinValue());
        System.out.println("Maximum Value in BST: " + findMaxValue());
    }
}

// ==========================================================
// 🧩 Main Class
// ==========================================================
public class BSTDemo {
    public static void main(String[] args) {
        System.out.println("=========== BINARY SEARCH TREE IMPLEMENTATION ===========");
        BinarySearchTree bst = new BinarySearchTree();
        bst.BSTDemo();
        System.out.println("----------------------------------------------------------");
        System.out.println("✅ All BST Operations Executed Successfully.");
    }
}`

const pythonCode = `# ==========================================================
# 🌳 BINARY SEARCH TREE (BST) IMPLEMENTATION IN PYTHON
# ==========================================================

# ==========================================================
# 🧩 Node Class
# ==========================================================
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

# ==========================================================
# 🌳 Binary Search Tree Class
# ==========================================================
class BinarySearchTree:
    def __init__(self):
        self.root = None

    # ==========================================================
    # 🧠 Insert Node into BST
    # ==========================================================
    def insert(self, root, val):
        if root is None:
            return Node(val)
        if val < root.data:
            root.left = self.insert(root.left, val)
        elif val > root.data:
            root.right = self.insert(root.right, val)
        return root

    def insert_value(self, val):
        self.root = self.insert(self.root, val)

    # ==========================================================
    # 🔍 Search in BST
    # ==========================================================
    def search(self, root, key):
        if root is None or root.data == key:
            return root
        if key < root.data:
            return self.search(root.left, key)
        return self.search(root.right, key)

    def search_value(self, key):
        return self.search(self.root, key) is not None

    # ==========================================================
    # 🚮 Find Minimum Value Node
    # ==========================================================
    def find_min(self, root):
        while root and root.left is not None:
            root = root.left
        return root

    # ==========================================================
    # ❌ Delete a Node from BST
    # ==========================================================
    def delete_node(self, root, key):
        if root is None:
            return root

        if key < root.data:
            root.left = self.delete_node(root.left, key)
        elif key > root.data:
            root.right = self.delete_node(root.right, key)
        else:
            # Node found
            if root.left is None:
                return root.right
            elif root.right is None:
                return root.left

            # Node with two children
            temp = self.find_min(root.right)
            root.data = temp.data
            root.right = self.delete_node(root.right, temp.data)
        return root

    def delete_value(self, key):
        self.root = self.delete_node(self.root, key)

    # ==========================================================
    # 🌿 Traversal Functions
    # ==========================================================
    def inorder(self, root):
        if root is None:
            return
        self.inorder(root.left)
        print(root.data, end=" ")
        self.inorder(root.right)

    def preorder(self, root):
        if root is None:
            return
        print(root.data, end=" ")
        self.preorder(root.left)
        self.preorder(root.right)

    def postorder(self, root):
        if root is None:
            return
        self.postorder(root.left)
        self.postorder(root.right)
        print(root.data, end=" ")

    # ==========================================================
    # 📈 Find Minimum and Maximum Value in BST
    # ==========================================================
    def find_min_value(self):
        temp = self.root
        while temp and temp.left is not None:
            temp = temp.left
        return temp.data

    def find_max_value(self):
        temp = self.root
        while temp and temp.right is not None:
            temp = temp.right
        return temp.data

    # ==========================================================
    # 🚀 Demonstration Function
    # ==========================================================
    def bst_demo(self):
        print("\\n===== Binary Search Tree Operations =====")

        # Insertion
        elements = [50, 30, 70, 20, 40, 60, 80]
        for val in elements:
            self.insert_value(val)

        print("Inorder Traversal (Sorted Order): ", end="")
        self.inorder(self.root)
        print()

        print("Preorder Traversal: ", end="")
        self.preorder(self.root)
        print()

        print("Postorder Traversal: ", end="")
        self.postorder(self.root)
        print()

        # Searching
        key = 40
        print(f"\\nSearching for {key} ... ", end="")
        if self.search_value(key):
            print("Found!")
        else:
            print("Not Found!")

        # Deletion
        print("\\nDeleting 20, 30, and 50 ...")
        self.delete_value(20)
        self.delete_value(30)
        self.delete_value(50)

        print("Inorder Traversal after Deletion: ", end="")
        self.inorder(self.root)
        print()

        # Minimum and Maximum
        print(f"\\nMinimum Value in BST: {self.find_min_value()}")
        print(f"Maximum Value in BST: {self.find_max_value()}")

# ==========================================================
# 🧩 Main Function
# ==========================================================
if __name__ == "__main__":
    print("=========== BINARY SEARCH TREE IMPLEMENTATION ===========")
    bst = BinarySearchTree()
    bst.bst_demo()
    print("----------------------------------------------------------")
    print("✅ All BST Operations Executed Successfully.")`

const templates = {
  cpp: { name: "C++", code: cppCode, extension: "cpp" },
  java: { name: "Java", code: javaCode, extension: "java" },
  python: { name: "Python", code: pythonCode, extension: "py" }
}

export function BinaryTreeCodeTemplate() {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof templates>("cpp")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(templates[selectedLanguage].code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadCode = () => {
    const template = templates[selectedLanguage]
    const blob = new Blob([template.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `binary_search_tree.${template.extension}`
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
            <CardTitle className="text-lg">Binary Search Tree - Complete Implementation</CardTitle>
            <div className="flex gap-2">
              {Object.entries(templates).map(([key, template]) => (
                <Button
                  key={key}
                  variant={selectedLanguage === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(key as keyof typeof templates)}
                >
                  {template.name}
                </Button>
              ))}
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
                <code>{templates[selectedLanguage].code}</code>
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
          <CardTitle className="text-lg">BST Operations Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-400">🧠 Insertion</h4>
                <p className="text-sm text-muted-foreground">Add nodes maintaining BST property. Left &lt; Root &lt; Right.</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-400">🔍 Search</h4>
                <p className="text-sm text-muted-foreground">Efficient O(log n) search by comparing with root and going left/right.</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-400">❌ Deletion</h4>
                <p className="text-sm text-muted-foreground">Three cases: leaf node, one child, two children (replace with inorder successor).</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <h4 className="font-semibold text-orange-400">🌿 Traversals</h4>
                <p className="text-sm text-muted-foreground">Inorder gives sorted sequence. Preorder for tree copying. Postorder for deletion.</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <h4 className="font-semibold text-red-400">📈 Min/Max</h4>
                <p className="text-sm text-muted-foreground">Minimum: leftmost node. Maximum: rightmost node. O(log n) complexity.</p>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-cyan-400">⚡ Time Complexity</h4>
                <p className="text-sm text-muted-foreground">Average: O(log n) for all operations. Worst: O(n) for skewed trees.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
