export interface Position {
  row: number
  col: number
}

export interface BacktrackingStep {
  maze: number[][]
  path: Position[]
  action: 'move' | 'backtrack' | 'check' | 'complete' | 'blocked'
  row: number
  col: number
  message: string
  isValid?: boolean
  recursionDepth: number
  codeLineIndex: number
}

export interface BacktrackingState {
  maze: number[][]
  path: Position[]
  currentPosition: Position
  isComplete: boolean
  solutionCount: number
  recursionDepth: number
}

export type AnimationSpeed = 'slow' | 'medium' | 'fast'

export const ANIMATION_SPEEDS: Record<AnimationSpeed, number> = {
  slow: 1500,
  medium: 800,
  fast: 300,
}

export interface RecursionCall {
  id: string
  row: number
  col: number
  depth: number
  action: string
  timestamp: number
}

export const PSEUDOCODE_LINES = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "// Function prototypes",
  "bool isSolution(vector<int>& solution);",
  "void processSolution(vector<int>& solution);",
  "bool isValid(vector<int>& solution, int choice);",
  "",
  "void backtrack(vector<int>& solution, vector<int>& choices) {",
  "    if (isSolution(solution)) {",
  "        processSolution(solution);",
  "        return;",
  "    }",
  "",
  "    for (int choice : choices) {",
  "        if (isValid(solution, choice)) {",
  "            // Make the choice",
  "            solution.push_back(choice);",
  "",
  "            // Explore further",
  "            backtrack(solution, choices);",
  "",
  "            // Undo the choice (backtrack)",
  "            solution.pop_back();",
  "        }",
  "    }",
  "}"
]
