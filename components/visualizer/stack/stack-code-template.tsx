"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, Play } from "lucide-react"
import { useState } from "react"

const cppCode = `// ==========================================================
// 🚀 STACK IMPLEMENTATIONS IN C++
// ==========================================================
// Includes: 
// 1️⃣ Stack using Array
// 2️⃣ Stack using Linked List
// 3️⃣ Stack using STL (Standard Template Library)
// 4️⃣ Two Stacks in One Array
// Each section demonstrates push, pop, peek, and display operations.
// ==========================================================

#include <iostream>
#include <stack>
using namespace std;

// ==========================================================
// 🧩 1. Stack using Array
// ==========================================================
class StackArray {
private:
    int top;
    int size;
    int* arr;

public:
    StackArray(int capacity) {
        size = capacity;
        arr = new int[size];
        top = -1;
    }

    bool isFull() { return top == size - 1; }
    bool isEmpty() { return top == -1; }

    void push(int value) {
        if (isFull()) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top] = value;
    }

    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return;
        }
        cout << "Popped: " << arr[top--] << endl;
    }

    void peek() {
        if (isEmpty()) {
            cout << "Stack is Empty!" << endl;
            return;
        }
        cout << "Top Element: " << arr[top] << endl;
    }

    void display() {
        if (isEmpty()) {
            cout << "Stack is Empty!" << endl;
            return;
        }
        cout << "Stack Elements (Top to Bottom): ";
        for (int i = top; i >= 0; i--) cout << arr[i] << " ";
        cout << endl;
    }
};

void stackArrayDemo() {
    cout << "\\n===== Stack using Array =====" << endl;
    StackArray s(5);
    s.push(10);
    s.push(20);
    s.push(30);
    s.display();
    s.pop();
    s.peek();
    s.display();
}

// ==========================================================
// 🧩 2. Stack using Linked List
// ==========================================================
class Node {
public:
    int data;
    Node* next;
    Node(int val) {
        data = val;
        next = nullptr;
    }
};

class StackLinkedList {
private:
    Node* top;

public:
    StackLinkedList() { top = nullptr; }

    bool isEmpty() { return top == nullptr; }

    void push(int value) {
        Node* newNode = new Node(value);
        newNode->next = top;
        top = newNode;
    }

    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return;
        }
        cout << "Popped: " << top->data << endl;
        Node* temp = top;
        top = top->next;
        delete temp;
    }

    void peek() {
        if (isEmpty()) {
            cout << "Stack is Empty!" << endl;
            return;
        }
        cout << "Top Element: " << top->data << endl;
    }

    void display() {
        if (isEmpty()) {
            cout << "Stack is Empty!" << endl;
            return;
        }
        cout << "Stack Elements (Top to Bottom): ";
        Node* temp = top;
        while (temp != nullptr) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }
};

void stackLinkedListDemo() {
    cout << "\\n===== Stack using Linked List =====" << endl;
    StackLinkedList s;
    s.push(5);
    s.push(15);
    s.push(25);
    s.display();
    s.pop();
    s.peek();
    s.display();
}

// ==========================================================
// 🧩 3. Stack using STL
// ==========================================================
void stackSTLDemo() {
    cout << "\\n===== Stack using STL =====" << endl;
    stack<int> st;
    st.push(100);
    st.push(200);
    st.push(300);

    cout << "Stack Elements (Top to Bottom): ";
    stack<int> temp = st;
    while (!temp.empty()) {
        cout << temp.top() << " ";
        temp.pop();
    }
    cout << endl;

    cout << "Top Element: " << st.top() << endl;
    st.pop();
    cout << "After One Pop, New Top: " << st.top() << endl;
}

// ==========================================================
// 🧩 4. Two Stacks in One Array
// ==========================================================
class TwoStacks {
private:
    int* arr;
    int size;
    int top1, top2;

public:
    TwoStacks(int n) {
        size = n;
        arr = new int[size];
        top1 = -1;
        top2 = size;
    }

    bool isFull() { return top1 + 1 == top2; }
    bool isEmpty1() { return top1 == -1; }
    bool isEmpty2() { return top2 == size; }

    void push1(int value) {
        if (isFull()) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top1] = value;
    }

    void push2(int value) {
        if (isFull()) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[--top2] = value;
    }

    void pop1() {
        if (isEmpty1()) {
            cout << "Stack1 Underflow!" << endl;
            return;
        }
        cout << "Popped from Stack1: " << arr[top1--] << endl;
    }

    void pop2() {
        if (isEmpty2()) {
            cout << "Stack2 Underflow!" << endl;
            return;
        }
        cout << "Popped from Stack2: " << arr[top2++] << endl;
    }

    void display() {
        cout << "Stack1 (Top to Bottom): ";
        for (int i = top1; i >= 0; i--) cout << arr[i] << " ";
        cout << "\\nStack2 (Top to Bottom): ";
        for (int i = top2; i < size; i++) cout << arr[i] << " ";
        cout << endl;
    }
};

void twoStacksDemo() {
    cout << "\\n===== Two Stacks in One Array =====" << endl;
    TwoStacks ts(10);
    ts.push1(10);
    ts.push1(20);
    ts.push2(100);
    ts.push2(200);
    ts.display();
    ts.pop1();
    ts.pop2();
    ts.display();
}

// ==========================================================
// 🧩 MAIN FUNCTION — Run All Stack Demonstrations
// ==========================================================
int main() {
    cout << "=========== STACK IMPLEMENTATIONS ===========\\n";
    stackArrayDemo();
    cout << "---------------------------------------------\\n";
    stackLinkedListDemo();
    cout << "---------------------------------------------\\n";
    stackSTLDemo();
    cout << "---------------------------------------------\\n";
    twoStacksDemo();
    cout << "---------------------------------------------\\n";
    cout << "✅ All Stack Demonstrations Completed Successfully.\\n";
    return 0;
}`

const expectedOutput = `=========== STACK IMPLEMENTATIONS ===========

===== Stack using Array =====
Stack Elements (Top to Bottom): 30 20 10 
Popped: 30
Top Element: 20
Stack Elements (Top to Bottom): 20 10 
---------------------------------------------

===== Stack using Linked List =====
Stack Elements (Top to Bottom): 25 15 5 
Popped: 25
Top Element: 15
Stack Elements (Top to Bottom): 15 5 
---------------------------------------------

===== Stack using STL =====
Stack Elements (Top to Bottom): 300 200 100 
Top Element: 300
After One Pop, New Top: 200
---------------------------------------------

===== Two Stacks in One Array =====
Stack1 (Top to Bottom): 20 10 
Stack2 (Top to Bottom): 200 100 
Popped from Stack1: 20
Popped from Stack2: 200
Stack1 (Top to Bottom): 10 
Stack2 (Top to Bottom): 100 
---------------------------------------------
✅ All Stack Demonstrations Completed Successfully.`

const javaCode = `import java.util.*;

// ==========================================================
// 🚀 STACK IMPLEMENTATIONS IN JAVA
// ==========================================================

// ==========================================================
// 🧩 1. Stack using Array
// ==========================================================
class StackArray {
    private int top;
    private int size;
    private int[] arr;

    public StackArray(int capacity) {
        size = capacity;
        arr = new int[size];
        top = -1;
    }

    public boolean isFull() { return top == size - 1; }
    public boolean isEmpty() { return top == -1; }

    public void push(int value) {
        if (isFull()) {
            System.out.println("Stack Overflow!");
            return;
        }
        arr[++top] = value;
    }

    public void pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow!");
            return;
        }
        System.out.println("Popped: " + arr[top--]);
    }

    public void peek() {
        if (isEmpty()) {
            System.out.println("Stack is Empty!");
            return;
        }
        System.out.println("Top Element: " + arr[top]);
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is Empty!");
            return;
        }
        System.out.print("Stack Elements (Top to Bottom): ");
        for (int i = top; i >= 0; i--) System.out.print(arr[i] + " ");
        System.out.println();
    }
}

// ==========================================================
// 🧩 2. Stack using Linked List
// ==========================================================
class Node {
    int data;
    Node next;
    
    Node(int val) {
        data = val;
        next = null;
    }
}

class StackLinkedList {
    private Node top;

    public StackLinkedList() { top = null; }

    public boolean isEmpty() { return top == null; }

    public void push(int value) {
        Node newNode = new Node(value);
        newNode.next = top;
        top = newNode;
    }

    public void pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow!");
            return;
        }
        System.out.println("Popped: " + top.data);
        top = top.next;
    }

    public void peek() {
        if (isEmpty()) {
            System.out.println("Stack is Empty!");
            return;
        }
        System.out.println("Top Element: " + top.data);
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is Empty!");
            return;
        }
        System.out.print("Stack Elements (Top to Bottom): ");
        Node temp = top;
        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.next;
        }
        System.out.println();
    }
}

// ==========================================================
// 🧩 3. Two Stacks in One Array
// ==========================================================
class TwoStacks {
    private int[] arr;
    private int size;
    private int top1, top2;

    public TwoStacks(int n) {
        size = n;
        arr = new int[size];
        top1 = -1;
        top2 = size;
    }

    public boolean isFull() { return top1 + 1 == top2; }
    public boolean isEmpty1() { return top1 == -1; }
    public boolean isEmpty2() { return top2 == size; }

    public void push1(int value) {
        if (isFull()) {
            System.out.println("Stack Overflow!");
            return;
        }
        arr[++top1] = value;
    }

    public void push2(int value) {
        if (isFull()) {
            System.out.println("Stack Overflow!");
            return;
        }
        arr[--top2] = value;
    }

    public void pop1() {
        if (isEmpty1()) {
            System.out.println("Stack1 Underflow!");
            return;
        }
        System.out.println("Popped from Stack1: " + arr[top1--]);
    }

    public void pop2() {
        if (isEmpty2()) {
            System.out.println("Stack2 Underflow!");
            return;
        }
        System.out.println("Popped from Stack2: " + arr[top2++]);
    }

    public void display() {
        System.out.print("Stack1 (Top to Bottom): ");
        for (int i = top1; i >= 0; i--) System.out.print(arr[i] + " ");
        System.out.print("\\nStack2 (Top to Bottom): ");
        for (int i = top2; i < size; i++) System.out.print(arr[i] + " ");
        System.out.println();
    }
}

// ==========================================================
// 🧩 Main Class with All Demonstrations
// ==========================================================
public class StackDemo {
    
    public static void stackArrayDemo() {
        System.out.println("\\n===== Stack using Array =====");
        StackArray s = new StackArray(5);
        s.push(10);
        s.push(20);
        s.push(30);
        s.display();
        s.pop();
        s.peek();
        s.display();
    }

    public static void stackLinkedListDemo() {
        System.out.println("\\n===== Stack using Linked List =====");
        StackLinkedList s = new StackLinkedList();
        s.push(5);
        s.push(15);
        s.push(25);
        s.display();
        s.pop();
        s.peek();
        s.display();
    }

    public static void stackSTLDemo() {
        System.out.println("\\n===== Stack using Collections =====");
        Stack<Integer> st = new Stack<>();
        st.push(100);
        st.push(200);
        st.push(300);

        System.out.print("Stack Elements (Top to Bottom): ");
        Stack<Integer> temp = (Stack<Integer>) st.clone();
        while (!temp.empty()) {
            System.out.print(temp.pop() + " ");
        }
        System.out.println();

        System.out.println("Top Element: " + st.peek());
        st.pop();
        System.out.println("After One Pop, New Top: " + st.peek());
    }

    public static void twoStacksDemo() {
        System.out.println("\\n===== Two Stacks in One Array =====");
        TwoStacks ts = new TwoStacks(10);
        ts.push1(10);
        ts.push1(20);
        ts.push2(100);
        ts.push2(200);
        ts.display();
        ts.pop1();
        ts.pop2();
        ts.display();
    }

    public static void main(String[] args) {
        System.out.println("=========== STACK IMPLEMENTATIONS ===========");
        stackArrayDemo();
        System.out.println("---------------------------------------------");
        stackLinkedListDemo();
        System.out.println("---------------------------------------------");
        stackSTLDemo();
        System.out.println("---------------------------------------------");
        twoStacksDemo();
        System.out.println("---------------------------------------------");
        System.out.println("✅ All Stack Demonstrations Completed Successfully.");
    }
}`

const pythonCode = `# ==========================================================
# 🚀 STACK IMPLEMENTATIONS IN PYTHON
# ==========================================================

# ==========================================================
# 🧩 1. Stack using List (Array)
# ==========================================================
class StackArray:
    def __init__(self, capacity):
        self.size = capacity
        self.arr = [0] * self.size
        self.top = -1

    def is_full(self):
        return self.top == self.size - 1

    def is_empty(self):
        return self.top == -1

    def push(self, value):
        if self.is_full():
            print("Stack Overflow!")
            return
        self.top += 1
        self.arr[self.top] = value

    def pop(self):
        if self.is_empty():
            print("Stack Underflow!")
            return
        print(f"Popped: {self.arr[self.top]}")
        self.top -= 1

    def peek(self):
        if self.is_empty():
            print("Stack is Empty!")
            return
        print(f"Top Element: {self.arr[self.top]}")

    def display(self):
        if self.is_empty():
            print("Stack is Empty!")
            return
        print("Stack Elements (Top to Bottom): ", end="")
        for i in range(self.top, -1, -1):
            print(self.arr[i], end=" ")
        print()

# ==========================================================
# 🧩 2. Stack using Linked List
# ==========================================================
class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

class StackLinkedList:
    def __init__(self):
        self.top = None

    def is_empty(self):
        return self.top is None

    def push(self, value):
        new_node = Node(value)
        new_node.next = self.top
        self.top = new_node

    def pop(self):
        if self.is_empty():
            print("Stack Underflow!")
            return
        print(f"Popped: {self.top.data}")
        self.top = self.top.next

    def peek(self):
        if self.is_empty():
            print("Stack is Empty!")
            return
        print(f"Top Element: {self.top.data}")

    def display(self):
        if self.is_empty():
            print("Stack is Empty!")
            return
        print("Stack Elements (Top to Bottom): ", end="")
        temp = self.top
        while temp is not None:
            print(temp.data, end=" ")
            temp = temp.next
        print()

# ==========================================================
# 🧩 3. Two Stacks in One Array
# ==========================================================
class TwoStacks:
    def __init__(self, n):
        self.size = n
        self.arr = [0] * self.size
        self.top1 = -1
        self.top2 = self.size

    def is_full(self):
        return self.top1 + 1 == self.top2

    def is_empty1(self):
        return self.top1 == -1

    def is_empty2(self):
        return self.top2 == self.size

    def push1(self, value):
        if self.is_full():
            print("Stack Overflow!")
            return
        self.top1 += 1
        self.arr[self.top1] = value

    def push2(self, value):
        if self.is_full():
            print("Stack Overflow!")
            return
        self.top2 -= 1
        self.arr[self.top2] = value

    def pop1(self):
        if self.is_empty1():
            print("Stack1 Underflow!")
            return
        print(f"Popped from Stack1: {self.arr[self.top1]}")
        self.top1 -= 1

    def pop2(self):
        if self.is_empty2():
            print("Stack2 Underflow!")
            return
        print(f"Popped from Stack2: {self.arr[self.top2]}")
        self.top2 += 1

    def display(self):
        print("Stack1 (Top to Bottom): ", end="")
        for i in range(self.top1, -1, -1):
            print(self.arr[i], end=" ")
        print("\\nStack2 (Top to Bottom): ", end="")
        for i in range(self.top2, self.size):
            print(self.arr[i], end=" ")
        print()

# ==========================================================
# 🧩 Demo Functions
# ==========================================================
def stack_array_demo():
    print("\\n===== Stack using Array =====")
    s = StackArray(5)
    s.push(10)
    s.push(20)
    s.push(30)
    s.display()
    s.pop()
    s.peek()
    s.display()

def stack_linked_list_demo():
    print("\\n===== Stack using Linked List =====")
    s = StackLinkedList()
    s.push(5)
    s.push(15)
    s.push(25)
    s.display()
    s.pop()
    s.peek()
    s.display()

def stack_list_demo():
    print("\\n===== Stack using Python List =====")
    st = []
    st.append(100)
    st.append(200)
    st.append(300)

    print("Stack Elements (Top to Bottom): ", end="")
    temp = st.copy()
    while temp:
        print(temp.pop(), end=" ")
    print()

    print(f"Top Element: {st[-1]}")
    st.pop()
    print(f"After One Pop, New Top: {st[-1]}")

def two_stacks_demo():
    print("\\n===== Two Stacks in One Array =====")
    ts = TwoStacks(10)
    ts.push1(10)
    ts.push1(20)
    ts.push2(100)
    ts.push2(200)
    ts.display()
    ts.pop1()
    ts.pop2()
    ts.display()

# ==========================================================
# 🧩 Main Function — Run All Stack Demonstrations
# ==========================================================
if __name__ == "__main__":
    print("=========== STACK IMPLEMENTATIONS ===========")
    stack_array_demo()
    print("---------------------------------------------")
    stack_linked_list_demo()
    print("---------------------------------------------")
    stack_list_demo()
    print("---------------------------------------------")
    two_stacks_demo()
    print("---------------------------------------------")
    print("✅ All Stack Demonstrations Completed Successfully.")`

const templates = {
  cpp: { name: "C++", code: cppCode, extension: "cpp" },
  java: { name: "Java", code: javaCode, extension: "java" },
  python: { name: "Python", code: pythonCode, extension: "py" }
}

export function StackCodeTemplate() {
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
    a.download = `stack_implementations.${template.extension}`
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
            <CardTitle className="text-lg">All Stack Types - Complete Implementation</CardTitle>
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
          <CardTitle className="text-lg">Stack Implementation Types Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-400">🧩 Stack using Array</h4>
                <p className="text-sm text-muted-foreground">Fixed-size implementation with fast access. Memory efficient but size limited.</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-400">🧩 Stack using Linked List</h4>
                <p className="text-sm text-muted-foreground">Dynamic size with nodes. No size limit but uses extra memory for pointers.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-400">🧩 Stack using STL/Collections</h4>
                <p className="text-sm text-muted-foreground">Built-in library implementation. Easy to use with optimized performance.</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <h4 className="font-semibold text-orange-400">🧩 Two Stacks in One Array</h4>
                <p className="text-sm text-muted-foreground">Space-efficient technique. Two stacks grow from opposite ends of same array.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
