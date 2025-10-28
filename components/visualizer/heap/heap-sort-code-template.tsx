"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { useState } from "react"

const cppTemplate = `#include <iostream>
#include <vector>
using namespace std;

// To heapify a subtree rooted with node i
void heapify(vector<int>& arr, int n, int i) {
    // Initialize largest as root
    int largest = i;
    
    // left index = 2*i + 1
    int l = 2 * i + 1;
    
    // right index = 2*i + 2
    int r = 2 * i + 2;

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Main function to do heap sort
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Build heap (rearrange vector)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // One by one extract an element from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(arr[0], arr[i]);

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

int main() {
    vector<int> arr = {9, 4, 3, 8, 10, 2, 5};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    heapSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`

const javaTemplate = `import java.util.Arrays;

public class HeapSort {
    
    // To heapify a subtree rooted with node i
    public static void heapify(int[] arr, int n, int i) {
        // Initialize largest as root
        int largest = i;
        
        // left index = 2*i + 1
        int l = 2 * i + 1;
        
        // right index = 2*i + 2
        int r = 2 * i + 2;

        // If left child is larger than root
        if (l < n && arr[l] > arr[largest])
            largest = l;

        // If right child is larger than largest so far
        if (r < n && arr[r] > arr[largest])
            largest = r;

        // If largest is not root
        if (largest != i) {
            // Swap
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }

    // Main function to do heap sort
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build heap (rearrange array)
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);

        // One by one extract an element from heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    public static void main(String[] args) {
        int[] arr = {9, 4, 3, 8, 10, 2, 5};
        
        System.out.println("Original array: " + Arrays.toString(arr));
        
        heapSort(arr);
        
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`

const pythonTemplate = `def heapify(arr, n, i):
    """
    To heapify a subtree rooted with node i
    """
    # Initialize largest as root
    largest = i
    
    # left index = 2*i + 1
    l = 2 * i + 1
    
    # right index = 2*i + 2
    r = 2 * i + 2

    # If left child is larger than root
    if l < n and arr[l] > arr[largest]:
        largest = l

    # If right child is larger than largest so far
    if r < n and arr[r] > arr[largest]:
        largest = r

    # If largest is not root
    if largest != i:
        # Swap
        arr[i], arr[largest] = arr[largest], arr[i]

        # Recursively heapify the affected sub-tree
        heapify(arr, n, largest)

def heap_sort(arr):
    """
    Main function to do heap sort
    """
    n = len(arr)

    # Build heap (rearrange array)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # One by one extract an element from heap
    for i in range(n - 1, 0, -1):
        # Move current root to end
        arr[0], arr[i] = arr[i], arr[0]

        # Call max heapify on the reduced heap
        heapify(arr, i, 0)

# Example usage
if __name__ == "__main__":
    arr = [9, 4, 3, 8, 10, 2, 5]
    
    print("Original array:", arr)
    
    heap_sort(arr)
    
    print("Sorted array:", arr)`

const templates = {
  cpp: { name: "C++", code: cppTemplate, extension: "cpp" },
  java: { name: "Java", code: javaTemplate, extension: "java" },
  python: { name: "Python", code: pythonTemplate, extension: "py" }
}

export function HeapSortCodeTemplate() {
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
    a.download = `heap_sort.${template.extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Heap Sort Code Templates</CardTitle>
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
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{templates[selectedLanguage].code}</code>
            </pre>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>Key Points:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Time Complexity:</strong> O(n log n) in all cases</li>
              <li><strong>Space Complexity:</strong> O(1) - in-place sorting</li>
              <li><strong>Stability:</strong> Not stable (equal elements may change order)</li>
              <li><strong>Use Cases:</strong> When consistent O(n log n) performance is needed</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
