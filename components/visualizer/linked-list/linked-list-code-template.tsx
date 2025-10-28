"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, Play } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const cppCode = `#include <iostream>
using namespace std;

// ==========================================================
// 🧩 1. Singly Linked List (SLL)
// ==========================================================
class NodeSLL {
public:
    int data;
    NodeSLL* next;

    NodeSLL(int new_data) {
        data = new_data;
        next = nullptr;
    }
};

void singlyLinkedListDemo() {
    NodeSLL* head = new NodeSLL(10);
    head->next = new NodeSLL(20);
    head->next->next = new NodeSLL(30);
    head->next->next->next = new NodeSLL(40);

    cout << "\\nSingly Linked List: ";
    NodeSLL* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

// ==========================================================
// 🧩 2. Doubly Linked List (DLL)
// ==========================================================
class NodeDLL {
public:
    int data;
    NodeDLL* prev;
    NodeDLL* next;

    NodeDLL(int d) {
        data = d;
        prev = nullptr;
        next = nullptr;
    }
};

void doublyLinkedListDemo() {
    NodeDLL* head = new NodeDLL(10);
    NodeDLL* second = new NodeDLL(20);
    NodeDLL* third = new NodeDLL(30);

    head->next = second;
    second->prev = head;
    second->next = third;
    third->prev = second;

    cout << "Doubly Linked List (Forward): ";
    NodeDLL* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }

    cout << "\\nDoubly Linked List (Backward): ";
    temp = third;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->prev;
    }
    cout << endl;
}

// ==========================================================
// 🧩 3. Circular Singly Linked List (CSLL)
// ==========================================================
class NodeCSLL {
public:
    int data;
    NodeCSLL* next;

    NodeCSLL(int val) {
        data = val;
        next = nullptr;
    }
};

void circularSinglyLinkedListDemo() {
    NodeCSLL* head = new NodeCSLL(10);
    NodeCSLL* second = new NodeCSLL(20);
    NodeCSLL* third = new NodeCSLL(30);

    head->next = second;
    second->next = third;
    third->next = head; // last node points to head (circular)

    cout << "Circular Singly Linked List: ";
    NodeCSLL* temp = head;
    if (head != nullptr) {
        do {
            cout << temp->data << " ";
            temp = temp->next;
        } while (temp != head);
    }
    cout << endl;
}

// ==========================================================
// 🧩 4. Circular Doubly Linked List (CDLL)
// ==========================================================
class NodeCDLL {
public:
    int data;
    NodeCDLL* prev;
    NodeCDLL* next;

    NodeCDLL(int val) {
        data = val;
        prev = nullptr;
        next = nullptr;
    }
};

void circularDoublyLinkedListDemo() {
    NodeCDLL* head = new NodeCDLL(10);
    NodeCDLL* second = new NodeCDLL(20);
    NodeCDLL* third = new NodeCDLL(30);

    // Linking nodes
    head->next = second;
    second->prev = head;
    second->next = third;
    third->prev = second;

    // Making it circular
    third->next = head;
    head->prev = third;

    cout << "Circular Doubly Linked List (Forward): ";
    NodeCDLL* temp = head;
    if (head != nullptr) {
        do {
            cout << temp->data << " ";
            temp = temp->next;
        } while (temp != head);
    }

    cout << "\\nCircular Doubly Linked List (Backward): ";
    temp = head->prev;
    if (temp != nullptr) {
        NodeCDLL* start = temp;
        do {
            cout << temp->data << " ";
            temp = temp->prev;
        } while (temp != start);
    }
    cout << endl;
}

// ==========================================================
// 🚀 Main Function – Run All Demonstrations
// ==========================================================
int main() {
    cout << "===== Linked List Implementations =====\\n";
    singlyLinkedListDemo();
    cout << "---------------------------------------\\n";
    doublyLinkedListDemo();
    cout << "---------------------------------------\\n";
    circularSinglyLinkedListDemo();
    cout << "---------------------------------------\\n";
    circularDoublyLinkedListDemo();
    cout << "---------------------------------------\\n";
    cout << "✅ All Linked List Demonstrations Completed Successfully.\\n";
    return 0;
}`

const expectedOutput = `===== Linked List Implementations =====

Singly Linked List: 10 20 30 40 
---------------------------------------
Doubly Linked List (Forward): 10 20 30 
Doubly Linked List (Backward): 30 20 10 
---------------------------------------
Circular Singly Linked List: 10 20 30 
---------------------------------------
Circular Doubly Linked List (Forward): 10 20 30 
Circular Doubly Linked List (Backward): 30 20 10 
---------------------------------------
✅ All Linked List Demonstrations Completed Successfully.`

const javaCode = `import java.util.*;

// ==========================================================
// 🧩 1. Singly Linked List (SLL)
// ==========================================================
class NodeSLL {
    int data;
    NodeSLL next;

    NodeSLL(int data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    static void singlyLinkedListDemo() {
        NodeSLL head = new NodeSLL(10);
        head.next = new NodeSLL(20);
        head.next.next = new NodeSLL(30);
        head.next.next.next = new NodeSLL(40);

        System.out.print("Singly Linked List: ");
        NodeSLL temp = head;
        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.next;
        }
        System.out.println();
    }
}

// ==========================================================
// 🧩 2. Doubly Linked List (DLL)
// ==========================================================
class NodeDLL {
    int data;
    NodeDLL prev;
    NodeDLL next;

    NodeDLL(int data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    static void doublyLinkedListDemo() {
        NodeDLL head = new NodeDLL(10);
        NodeDLL second = new NodeDLL(20);
        NodeDLL third = new NodeDLL(30);

        head.next = second;
        second.prev = head;
        second.next = third;
        third.prev = second;

        System.out.print("Doubly Linked List (Forward): ");
        NodeDLL temp = head;
        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.next;
        }

        System.out.print("\\nDoubly Linked List (Backward): ");
        temp = third;
        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.prev;
        }
        System.out.println();
    }
}

// ==========================================================
// 🧩 3. Circular Singly Linked List (CSLL)
// ==========================================================
class NodeCSLL {
    int data;
    NodeCSLL next;

    NodeCSLL(int data) {
        this.data = data;
        this.next = null;
    }
}

class CircularSinglyLinkedList {
    static void circularSinglyLinkedListDemo() {
        NodeCSLL head = new NodeCSLL(10);
        NodeCSLL second = new NodeCSLL(20);
        NodeCSLL third = new NodeCSLL(30);

        head.next = second;
        second.next = third;
        third.next = head; // last node points to head (circular)

        System.out.print("Circular Singly Linked List: ");
        NodeCSLL temp = head;
        if (head != null) {
            do {
                System.out.print(temp.data + " ");
                temp = temp.next;
            } while (temp != head);
        }
        System.out.println();
    }
}

// ==========================================================
// 🧩 4. Circular Doubly Linked List (CDLL)
// ==========================================================
class NodeCDLL {
    int data;
    NodeCDLL prev;
    NodeCDLL next;

    NodeCDLL(int data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class CircularDoublyLinkedList {
    static void circularDoublyLinkedListDemo() {
        NodeCDLL head = new NodeCDLL(10);
        NodeCDLL second = new NodeCDLL(20);
        NodeCDLL third = new NodeCDLL(30);

        // Linking nodes
        head.next = second;
        second.prev = head;
        second.next = third;
        third.prev = second;

        // Making it circular
        third.next = head;
        head.prev = third;

        System.out.print("Circular Doubly Linked List (Forward): ");
        NodeCDLL temp = head;
        if (head != null) {
            do {
                System.out.print(temp.data + " ");
                temp = temp.next;
            } while (temp != head);
        }

        System.out.print("\\nCircular Doubly Linked List (Backward): ");
        temp = head.prev;
        if (temp != null) {
            NodeCDLL start = temp;
            do {
                System.out.print(temp.data + " ");
                temp = temp.prev;
            } while (temp != start);
        }
        System.out.println();
    }
}

// ==========================================================
// 🚀 Main Class – Run All Demonstrations
// ==========================================================
public class LinkedListDemo {
    public static void main(String[] args) {
        System.out.println("===== Linked List Implementations =====");
        SinglyLinkedList.singlyLinkedListDemo();
        System.out.println("---------------------------------------");
        DoublyLinkedList.doublyLinkedListDemo();
        System.out.println("---------------------------------------");
        CircularSinglyLinkedList.circularSinglyLinkedListDemo();
        System.out.println("---------------------------------------");
        CircularDoublyLinkedList.circularDoublyLinkedListDemo();
        System.out.println("---------------------------------------");
        System.out.println("✅ All Linked List Demonstrations Completed Successfully.");
    }
}`

const pythonCode = `# ==========================================================
# 🧩 1. Singly Linked List (SLL)
# ==========================================================
class NodeSLL:
    def __init__(self, data):
        self.data = data
        self.next = None

def singly_linked_list_demo():
    head = NodeSLL(10)
    head.next = NodeSLL(20)
    head.next.next = NodeSLL(30)
    head.next.next.next = NodeSLL(40)

    print("Singly Linked List: ", end="")
    temp = head
    while temp is not None:
        print(temp.data, end=" ")
        temp = temp.next
    print()

# ==========================================================
# 🧩 2. Doubly Linked List (DLL)
# ==========================================================
class NodeDLL:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

def doubly_linked_list_demo():
    head = NodeDLL(10)
    second = NodeDLL(20)
    third = NodeDLL(30)

    head.next = second
    second.prev = head
    second.next = third
    third.prev = second

    print("Doubly Linked List (Forward): ", end="")
    temp = head
    while temp is not None:
        print(temp.data, end=" ")
        temp = temp.next

    print("\\nDoubly Linked List (Backward): ", end="")
    temp = third
    while temp is not None:
        print(temp.data, end=" ")
        temp = temp.prev
    print()

# ==========================================================
# 🧩 3. Circular Singly Linked List (CSLL)
# ==========================================================
class NodeCSLL:
    def __init__(self, data):
        self.data = data
        self.next = None

def circular_singly_linked_list_demo():
    head = NodeCSLL(10)
    second = NodeCSLL(20)
    third = NodeCSLL(30)

    head.next = second
    second.next = third
    third.next = head  # last node points to head (circular)

    print("Circular Singly Linked List: ", end="")
    temp = head
    if head is not None:
        while True:
            print(temp.data, end=" ")
            temp = temp.next
            if temp == head:
                break
    print()

# ==========================================================
# 🧩 4. Circular Doubly Linked List (CDLL)
# ==========================================================
class NodeCDLL:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

def circular_doubly_linked_list_demo():
    head = NodeCDLL(10)
    second = NodeCDLL(20)
    third = NodeCDLL(30)

    # Linking nodes
    head.next = second
    second.prev = head
    second.next = third
    third.prev = second

    # Making it circular
    third.next = head
    head.prev = third

    print("Circular Doubly Linked List (Forward): ", end="")
    temp = head
    if head is not None:
        while True:
            print(temp.data, end=" ")
            temp = temp.next
            if temp == head:
                break

    print("\\nCircular Doubly Linked List (Backward): ", end="")
    temp = head.prev
    if temp is not None:
        start = temp
        while True:
            print(temp.data, end=" ")
            temp = temp.prev
            if temp == start:
                break
    print()

# ==========================================================
# 🚀 Main Function – Run All Demonstrations
# ==========================================================
if __name__ == "__main__":
    print("===== Linked List Implementations =====")
    singly_linked_list_demo()
    print("---------------------------------------")
    doubly_linked_list_demo()
    print("---------------------------------------")
    circular_singly_linked_list_demo()
    print("---------------------------------------")
    circular_doubly_linked_list_demo()
    print("---------------------------------------")
    print("✅ All Linked List Demonstrations Completed Successfully.")`

const templates = {
  cpp: { name: "C++", code: cppCode, extension: "cpp" },
  java: { name: "Java", code: javaCode, extension: "java" },
  python: { name: "Python", code: pythonCode, extension: "py" }
}

export function LinkedListCodeTemplate() {
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
    a.download = `linked_list_demo.${template.extension}`
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
            <CardTitle className="text-lg">All Linked List Types - Complete Implementation</CardTitle>
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
          <CardTitle className="text-lg">Linked List Types Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-400">🧩 Singly Linked List (SLL)</h4>
                <p className="text-sm text-muted-foreground">Each node points to the next node. Traversal is unidirectional.</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-400">🧩 Doubly Linked List (DLL)</h4>
                <p className="text-sm text-muted-foreground">Each node has pointers to both next and previous nodes. Bidirectional traversal.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-400">🧩 Circular Singly Linked List (CSLL)</h4>
                <p className="text-sm text-muted-foreground">Last node points back to the first node, forming a circle.</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <h4 className="font-semibold text-orange-400">🧩 Circular Doubly Linked List (CDLL)</h4>
                <p className="text-sm text-muted-foreground">Combines features of DLL and circular structure. Both ends are connected.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
