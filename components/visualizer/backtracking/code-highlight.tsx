"use client"

import { PSEUDOCODE_LINES } from "./types"
import { motion } from "framer-motion"

interface CodeHighlightProps {
  currentLine: number
}

export function CodeHighlight({ currentLine }: CodeHighlightProps) {
  return (
    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
      <div className="space-y-1">
        {PSEUDOCODE_LINES.map((line, index) => {
          const isCurrentLine = index === currentLine
          const indentLevel = line.search(/\S/) // Find first non-whitespace character
          
          return (
            <motion.div
              key={index}
              className={`
                relative flex items-center py-1 px-2 rounded transition-all duration-300
                ${isCurrentLine 
                  ? 'bg-yellow-400/20 border-l-4 border-l-yellow-400' 
                  : 'hover:bg-slate-800/50'
                }
              `}
              initial={false}
              animate={{
                backgroundColor: isCurrentLine ? 'rgba(250, 204, 21, 0.2)' : 'transparent'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Line number */}
              <span className="text-slate-500 w-6 text-right mr-3 text-xs">
                {index + 1}
              </span>
              
              {/* Code line with syntax highlighting */}
              <div 
                className={`
                  flex-1 text-slate-300
                  ${isCurrentLine ? 'text-yellow-100 font-medium' : ''}
                `}
                style={{ paddingLeft: `${indentLevel * 8}px` }}
              >
                <CodeLine line={line.trim()} isActive={isCurrentLine} />
              </div>
              
              {/* Current line indicator */}
              {isCurrentLine && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 w-2 h-2 bg-yellow-400 rounded-full"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function CodeLine({ line, isActive }: { line: string; isActive: boolean }) {
  // Simple syntax highlighting for C++
  const highlightSyntax = (text: string) => {
    // C++ Keywords
    text = text.replace(
      /\b(include|using|namespace|std|bool|void|int|vector|if|for|return|true|false)\b/g,
      '<span class="text-blue-400">$1</span>'
    )
    
    // Numbers
    text = text.replace(/\b\d+\b/g, '<span class="text-green-400">$1</span>')
    
    // Strings
    text = text.replace(/"([^"]*)"/g, '<span class="text-orange-400">"$1"</span>')
    
    // Preprocessor directives
    text = text.replace(/(#\w+)/g, '<span class="text-pink-400">$1</span>')
    
    // Comments
    text = text.replace(/(\/\/.*$)/g, '<span class="text-slate-500">$1</span>')
    
    // Function names
    text = text.replace(/\b(\w+)(?=\()/g, '<span class="text-yellow-400">$1</span>')
    
    // Operators
    text = text.replace(/([=<>!+\-*/&])/g, '<span class="text-purple-400">$1</span>')
    
    // Brackets and braces
    text = text.replace(/([{}[\]()])/g, '<span class="text-cyan-400">$1</span>')
    
    return text
  }

  return (
    <span 
      dangerouslySetInnerHTML={{ 
        __html: highlightSyntax(line) 
      }}
      className={isActive ? 'animate-pulse' : ''}
    />
  )
}
