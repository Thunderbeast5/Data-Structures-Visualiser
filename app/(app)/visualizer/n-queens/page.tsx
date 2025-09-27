"use client"

import { NQueensVisualizer } from "@/components/visualizer/n-queens/n-queens-visualizer"

function Content() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2>N-Queens Problem</h2>
      <p>
        The N-Queens problem is a classic backtracking algorithm problem where you need to place N chess queens 
        on an N×N chessboard so that no two queens attack each other.
      </p>
      <h3>Rules</h3>
      <ul>
        <li>Queens can attack horizontally, vertically, and diagonally</li>
        <li>No two queens can be in the same row, column, or diagonal</li>
        <li>The goal is to find all possible solutions for placing N queens</li>
      </ul>
      <h3>Algorithm</h3>
      <p>
        The solution uses backtracking:
      </p>
      <ol>
        <li>Start with the first row</li>
        <li>Try placing a queen in each column of the current row</li>
        <li>Check if the placement is safe (no conflicts with existing queens)</li>
        <li>If safe, move to the next row and repeat</li>
        <li>If no safe position is found, backtrack to the previous row</li>
        <li>Continue until all queens are placed or all possibilities are exhausted</li>
      </ol>
      <h3>Time Complexity</h3>
      <p>
        The time complexity is O(N!) in the worst case, as we might need to try all possible 
        arrangements of queens.
      </p>
    </div>
  )
}

export default function NQueensPage() {
  return <NQueensVisualizer content={<Content />} />
}
