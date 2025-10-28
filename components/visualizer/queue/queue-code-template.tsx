"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, Play } from "lucide-react"
import { useState } from "react"

const cppCode = `// ==========================================================
// 🚀 QUEUE IMPLEMENTATIONS IN C++
// ==========================================================
// Includes: 
// 1️⃣ Simple Queue (using array)
// 2️⃣ Circular Queue
// 3️⃣ Priority Queue
// 4️⃣ Double Ended Queue (Deque)
// Each has its own demo function and output section.
// ==========================================================

#include <iostream>
#include <queue> // for STL implementations
using namespace std;

// ==========================================================
// 🧩 1. Simple Queue (Linear Queue using Array)
// ==========================================================
class SimpleQueue {
private:
    int front, rear, size;
    int* arr;

public:
    SimpleQueue(int capacity) {
        size = capacity;
        arr = new int[size];
        front = rear = -1;
    }

    bool isFull() { return rear == size - 1; }
    bool isEmpty() { return front == -1 || front > rear; }

    void enqueue(int value) {
        if (isFull()) {
            cout << "Queue Overflow!" << endl;
            return;
        }
        if (front == -1) front = 0;
        arr[++rear] = value;
    }

    void dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow!" << endl;
            return;
        }
        cout << "Dequeued: " << arr[front++] << endl;
    }

    void display() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }
        cout << "Queue Elements: ";
        for (int i = front; i <= rear; i++) cout << arr[i] << " ";
        cout << endl;
    }
};

void simpleQueueDemo() {
    cout << "\\n===== Simple Queue Demo =====" << endl;
    SimpleQueue q(5);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();
    q.dequeue();
    q.display();
}

// ==========================================================
// 🧩 2. Circular Queue (using Array)
// ==========================================================
class CircularQueue {
private:
    int front, rear, size, count;
    int* arr;

public:
    CircularQueue(int capacity) {
        size = capacity;
        arr = new int[size];
        front = rear = -1;
        count = 0;
    }

    bool isFull() { return count == size; }
    bool isEmpty() { return count == 0; }

    void enqueue(int value) {
        if (isFull()) {
            cout << "Circular Queue Full!" << endl;
            return;
        }
        if (front == -1) front = 0;
        rear = (rear + 1) % size;
        arr[rear] = value;
        count++;
    }

    void dequeue() {
        if (isEmpty()) {
            cout << "Circular Queue Empty!" << endl;
            return;
        }
        cout << "Dequeued: " << arr[front] << endl;
        front = (front + 1) % size;
        count--;
    }

    void display() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return;
        }
        cout << "Circular Queue Elements: ";
        int i = front;
        for (int j = 0; j < count; j++) {
            cout << arr[i] << " ";
            i = (i + 1) % size;
        }
        cout << endl;
    }
};

void circularQueueDemo() {
    cout << "\\n===== Circular Queue Demo =====" << endl;
    CircularQueue cq(5);
    cq.enqueue(1);
    cq.enqueue(2);
    cq.enqueue(3);
    cq.enqueue(4);
    cq.display();
    cq.dequeue();
    cq.enqueue(5);
    cq.display();
}

// ==========================================================
// 🧩 3. Priority Queue (using STL)
// ==========================================================
void priorityQueueDemo() {
    cout << "\\n===== Priority Queue Demo =====" << endl;
    priority_queue<int> pq; // Max-Heap by default
    pq.push(30);
    pq.push(10);
    pq.push(50);
    pq.push(20);

    cout << "Priority Queue Elements (Highest to Lowest): ";
    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;
}

// ==========================================================
// 🧩 4. Double Ended Queue (Deque using STL)
// ==========================================================
void dequeDemo() {
    cout << "\\n===== Deque Demo =====" << endl;
    deque<int> dq;

    dq.push_back(10);
    dq.push_front(20);
    dq.push_back(30);
    dq.push_front(40);

    cout << "Deque Elements: ";
    for (int x : dq) cout << x << " ";
    cout << endl;

    dq.pop_front();
    dq.pop_back();

    cout << "After Deletion (Front and Back Removed): ";
    for (int x : dq) cout << x << " ";
    cout << endl;
}

// ==========================================================
// 🧩 MAIN FUNCTION — Run All Queue Demonstrations
// ==========================================================
int main() {
    cout << "=========== QUEUE IMPLEMENTATIONS ===========\\n";
    simpleQueueDemo();
    cout << "---------------------------------------------\\n";
    circularQueueDemo();
    cout << "---------------------------------------------\\n";
    priorityQueueDemo();
    cout << "---------------------------------------------\\n";
    dequeDemo();
    cout << "---------------------------------------------\\n";
    cout << "✅ All Queue Demonstrations Completed Successfully.\\n";
    return 0;
}`

const expectedOutput = `=========== QUEUE IMPLEMENTATIONS ===========

===== Simple Queue Demo =====
Queue Elements: 10 20 30 
Dequeued: 10
Queue Elements: 20 30 
---------------------------------------------

===== Circular Queue Demo =====
Circular Queue Elements: 1 2 3 4 
Dequeued: 1
Circular Queue Elements: 2 3 4 5 
---------------------------------------------

===== Priority Queue Demo =====
Priority Queue Elements (Highest to Lowest): 50 30 20 10 
---------------------------------------------

===== Deque Demo =====
Deque Elements: 40 20 10 30 
After Deletion (Front and Back Removed): 20 10 
---------------------------------------------
✅ All Queue Demonstrations Completed Successfully.`

const javaCode = `import java.util.*;

// ==========================================================
// 🚀 QUEUE IMPLEMENTATIONS IN JAVA
// ==========================================================

// ==========================================================
// 🧩 1. Simple Queue (Linear Queue using Array)
// ==========================================================
class SimpleQueue {
    private int front, rear, size;
    private int[] arr;

    public SimpleQueue(int capacity) {
        size = capacity;
        arr = new int[size];
        front = rear = -1;
    }

    public boolean isFull() { return rear == size - 1; }
    public boolean isEmpty() { return front == -1 || front > rear; }

    public void enqueue(int value) {
        if (isFull()) {
            System.out.println("Queue Overflow!");
            return;
        }
        if (front == -1) front = 0;
        arr[++rear] = value;
    }

    public void dequeue() {
        if (isEmpty()) {
            System.out.println("Queue Underflow!");
            return;
        }
        System.out.println("Dequeued: " + arr[front++]);
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is Empty!");
            return;
        }
        System.out.print("Queue Elements: ");
        for (int i = front; i <= rear; i++) System.out.print(arr[i] + " ");
        System.out.println();
    }
}

// ==========================================================
// 🧩 2. Circular Queue (using Array)
// ==========================================================
class CircularQueue {
    private int front, rear, size, count;
    private int[] arr;

    public CircularQueue(int capacity) {
        size = capacity;
        arr = new int[size];
        front = rear = -1;
        count = 0;
    }

    public boolean isFull() { return count == size; }
    public boolean isEmpty() { return count == 0; }

    public void enqueue(int value) {
        if (isFull()) {
            System.out.println("Circular Queue Full!");
            return;
        }
        if (front == -1) front = 0;
        rear = (rear + 1) % size;
        arr[rear] = value;
        count++;
    }

    public void dequeue() {
        if (isEmpty()) {
            System.out.println("Circular Queue Empty!");
            return;
        }
        System.out.println("Dequeued: " + arr[front]);
        front = (front + 1) % size;
        count--;
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is Empty!");
            return;
        }
        System.out.print("Circular Queue Elements: ");
        int i = front;
        for (int j = 0; j < count; j++) {
            System.out.print(arr[i] + " ");
            i = (i + 1) % size;
        }
        System.out.println();
    }
}

// ==========================================================
// 🧩 Main Class with All Demonstrations
// ==========================================================
public class QueueDemo {
    
    public static void simpleQueueDemo() {
        System.out.println("\\n===== Simple Queue Demo =====");
        SimpleQueue q = new SimpleQueue(5);
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        q.display();
        q.dequeue();
        q.display();
    }

    public static void circularQueueDemo() {
        System.out.println("\\n===== Circular Queue Demo =====");
        CircularQueue cq = new CircularQueue(5);
        cq.enqueue(1);
        cq.enqueue(2);
        cq.enqueue(3);
        cq.enqueue(4);
        cq.display();
        cq.dequeue();
        cq.enqueue(5);
        cq.display();
    }

    public static void priorityQueueDemo() {
        System.out.println("\\n===== Priority Queue Demo =====");
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        pq.add(30);
        pq.add(10);
        pq.add(50);
        pq.add(20);

        System.out.print("Priority Queue Elements (Highest to Lowest): ");
        while (!pq.isEmpty()) {
            System.out.print(pq.poll() + " ");
        }
        System.out.println();
    }

    public static void dequeDemo() {
        System.out.println("\\n===== Deque Demo =====");
        Deque<Integer> dq = new ArrayDeque<>();

        dq.addLast(10);
        dq.addFirst(20);
        dq.addLast(30);
        dq.addFirst(40);

        System.out.print("Deque Elements: ");
        for (int x : dq) System.out.print(x + " ");
        System.out.println();

        dq.removeFirst();
        dq.removeLast();

        System.out.print("After Deletion (Front and Back Removed): ");
        for (int x : dq) System.out.print(x + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("=========== QUEUE IMPLEMENTATIONS ===========");
        simpleQueueDemo();
        System.out.println("---------------------------------------------");
        circularQueueDemo();
        System.out.println("---------------------------------------------");
        priorityQueueDemo();
        System.out.println("---------------------------------------------");
        dequeDemo();
        System.out.println("---------------------------------------------");
        System.out.println("✅ All Queue Demonstrations Completed Successfully.");
    }
}`

const pythonCode = `from collections import deque
import heapq

# ==========================================================
# 🚀 QUEUE IMPLEMENTATIONS IN PYTHON
# ==========================================================

# ==========================================================
# 🧩 1. Simple Queue (Linear Queue using List)
# ==========================================================
class SimpleQueue:
    def __init__(self, capacity):
        self.size = capacity
        self.arr = [0] * self.size
        self.front = self.rear = -1

    def is_full(self):
        return self.rear == self.size - 1

    def is_empty(self):
        return self.front == -1 or self.front > self.rear

    def enqueue(self, value):
        if self.is_full():
            print("Queue Overflow!")
            return
        if self.front == -1:
            self.front = 0
        self.rear += 1
        self.arr[self.rear] = value

    def dequeue(self):
        if self.is_empty():
            print("Queue Underflow!")
            return
        print(f"Dequeued: {self.arr[self.front]}")
        self.front += 1

    def display(self):
        if self.is_empty():
            print("Queue is Empty!")
            return
        print("Queue Elements: ", end="")
        for i in range(self.front, self.rear + 1):
            print(self.arr[i], end=" ")
        print()

# ==========================================================
# 🧩 2. Circular Queue (using List)
# ==========================================================
class CircularQueue:
    def __init__(self, capacity):
        self.size = capacity
        self.arr = [0] * self.size
        self.front = self.rear = -1
        self.count = 0

    def is_full(self):
        return self.count == self.size

    def is_empty(self):
        return self.count == 0

    def enqueue(self, value):
        if self.is_full():
            print("Circular Queue Full!")
            return
        if self.front == -1:
            self.front = 0
        self.rear = (self.rear + 1) % self.size
        self.arr[self.rear] = value
        self.count += 1

    def dequeue(self):
        if self.is_empty():
            print("Circular Queue Empty!")
            return
        print(f"Dequeued: {self.arr[self.front]}")
        self.front = (self.front + 1) % self.size
        self.count -= 1

    def display(self):
        if self.is_empty():
            print("Queue is Empty!")
            return
        print("Circular Queue Elements: ", end="")
        i = self.front
        for j in range(self.count):
            print(self.arr[i], end=" ")
            i = (i + 1) % self.size
        print()

# ==========================================================
# 🧩 Demo Functions
# ==========================================================
def simple_queue_demo():
    print("\\n===== Simple Queue Demo =====")
    q = SimpleQueue(5)
    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    q.display()
    q.dequeue()
    q.display()

def circular_queue_demo():
    print("\\n===== Circular Queue Demo =====")
    cq = CircularQueue(5)
    cq.enqueue(1)
    cq.enqueue(2)
    cq.enqueue(3)
    cq.enqueue(4)
    cq.display()
    cq.dequeue()
    cq.enqueue(5)
    cq.display()

def priority_queue_demo():
    print("\\n===== Priority Queue Demo =====")
    pq = []
    heapq.heappush(pq, -30)  # Using negative for max heap
    heapq.heappush(pq, -10)
    heapq.heappush(pq, -50)
    heapq.heappush(pq, -20)

    print("Priority Queue Elements (Highest to Lowest): ", end="")
    while pq:
        print(-heapq.heappop(pq), end=" ")
    print()

def deque_demo():
    print("\\n===== Deque Demo =====")
    dq = deque()

    dq.append(10)
    dq.appendleft(20)
    dq.append(30)
    dq.appendleft(40)

    print("Deque Elements: ", end="")
    for x in dq:
        print(x, end=" ")
    print()

    dq.popleft()
    dq.pop()

    print("After Deletion (Front and Back Removed): ", end="")
    for x in dq:
        print(x, end=" ")
    print()

# ==========================================================
# 🧩 Main Function — Run All Queue Demonstrations
# ==========================================================
if __name__ == "__main__":
    print("=========== QUEUE IMPLEMENTATIONS ===========")
    simple_queue_demo()
    print("---------------------------------------------")
    circular_queue_demo()
    print("---------------------------------------------")
    priority_queue_demo()
    print("---------------------------------------------")
    deque_demo()
    print("---------------------------------------------")
    print("✅ All Queue Demonstrations Completed Successfully.")`

const templates = {
  cpp: { name: "C++", code: cppCode, extension: "cpp" },
  java: { name: "Java", code: javaCode, extension: "java" },
  python: { name: "Python", code: pythonCode, extension: "py" }
}

export function QueueCodeTemplate() {
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
    a.download = `queue_implementations.${template.extension}`
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
            <CardTitle className="text-lg">All Queue Types - Complete Implementation</CardTitle>
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
          <CardTitle className="text-lg">Queue Types Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-400">🧩 Simple Queue (Linear)</h4>
                <p className="text-sm text-muted-foreground">Basic FIFO structure using array. Elements added at rear, removed from front.</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-400">🧩 Circular Queue</h4>
                <p className="text-sm text-muted-foreground">Efficient space utilization by connecting end to beginning. No memory waste.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-400">🧩 Priority Queue</h4>
                <p className="text-sm text-muted-foreground">Elements served based on priority, not insertion order. Highest priority first.</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <h4 className="font-semibold text-orange-400">🧩 Double Ended Queue (Deque)</h4>
                <p className="text-sm text-muted-foreground">Insertion and deletion allowed at both ends. Combines stack and queue features.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
