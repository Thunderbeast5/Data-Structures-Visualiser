"use client"

import { BacktrackingVisualizer } from "@/components/visualizer/backtracking/backtracking-visualizer"

function Content() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2>Backtracking Algorithm Visualization</h2>
      <p>
        Backtracking is a general algorithmic approach that incrementally builds candidates to the solutions, 
        and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly 
        be completed to a valid solution.
      </p>
      <h3>Key Features</h3>
      <ul>
        <li><strong>Play/Pause Controls:</strong> Start, stop, or restart the animation easily</li>
        <li><strong>Speed Control:</strong> Adjust the delay between steps for faster or slower visualization</li>
        <li><strong>Step Counter:</strong> Track every recursion call showing the algorithm's progress</li>
        <li><strong>Path Highlighting:</strong> Color-coded cells—green for valid moves and red for blocked paths</li>
        <li><strong>Recursion Stack:</strong> Display the last few recursive calls to trace the algorithm's path</li>
        <li><strong>Code Sync:</strong> Highlight the currently executing line of pseudocode for better understanding</li>
      </ul>
      <h3>Maze Solving Problem</h3>
      <p>
        Maze solving is a classic example of backtracking where you need to find a path from the start 
        position to the end position in a maze with walls and obstacles.
      </p>
      <h3>Algorithm Steps</h3>
      <ol>
        <li>Start from the entrance of the maze</li>
        <li>Try moving in each possible direction (up, down, left, right)</li>
        <li>Check if the move is valid (not a wall, not already visited)</li>
        <li>If valid, mark the cell as part of the path and continue</li>
        <li>If no valid moves are available, backtrack by unmarking the cell</li>
        <li>Continue until the exit is reached or all possibilities are exhausted</li>
      </ol>
      <h3>Time Complexity</h3>
      <p>
        The time complexity is O(4^(N*M)) in the worst case, where N and M are the maze dimensions, 
        as we might need to explore all possible paths. However, backtracking significantly reduces 
        the search space by pruning invalid branches early.
      </p>
    </div>
  )
}

export default function BacktrackingPage() {
  return <BacktrackingVisualizer content={<Content />} />
}
