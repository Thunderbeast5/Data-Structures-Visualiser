"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SolutionStep } from "./types"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"

interface SolutionStepsProps {
  steps: SolutionStep[]
  currentStep: number
}

export function SolutionSteps({ steps, currentStep }: SolutionStepsProps) {
  if (steps.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Start solving to see the step-by-step process
        </CardContent>
      </Card>
    )
  }

  const visibleSteps = steps.slice(Math.max(0, currentStep - 2), currentStep + 3)
  const startIndex = Math.max(0, currentStep - 2)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Algorithm Steps
          <Badge variant="outline">
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleSteps.map((step, index) => {
          const stepIndex = startIndex + index
          const isCurrent = stepIndex === currentStep
          const isPast = stepIndex < currentStep
          
          return (
            <div
              key={stepIndex}
              className={`
                p-3 rounded-lg border transition-all duration-200
                ${isCurrent 
                  ? 'bg-primary/10 border-primary shadow-sm' 
                  : isPast 
                    ? 'bg-muted/50 border-muted' 
                    : 'bg-background border-border'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${isCurrent 
                    ? 'bg-primary text-primary-foreground' 
                    : isPast 
                      ? 'bg-muted-foreground text-background' 
                      : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {stepIndex + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {step.action === 'place' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {step.action === 'remove' && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    {step.isBacktrack && (
                      <ArrowLeft className="w-4 h-4 text-orange-500" />
                    )}
                    
                    <Badge 
                      variant={
                        step.action === 'place' ? 'default' :
                        step.action === 'remove' ? 'destructive' :
                        step.action === 'complete' ? 'default' :
                        'secondary'
                      }
                      className="text-xs"
                    >
                      {step.action === 'place' ? 'Place Queen' :
                       step.action === 'remove' ? 'Remove Queen' :
                       step.action === 'check' ? 'Check Position' :
                       'Solution Found'}
                    </Badge>
                  </div>
                  
                  <p className={`text-sm ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.message}
                  </p>
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    Position: Row {step.row + 1}, Column {String.fromCharCode(65 + step.col)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        {steps.length > 5 && (
          <div className="text-center text-xs text-muted-foreground pt-2">
            Showing {visibleSteps.length} of {steps.length} steps
          </div>
        )}
      </CardContent>
    </Card>
  )
}
