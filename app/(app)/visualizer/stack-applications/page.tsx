"use client"

import { InfixPostfixVisualizer } from "@/components/visualizer/stack-applications/infix-postfix-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { getDataStructureContent } from "@/lib/content-utils"
import { useEffect, useState } from "react"

function Content() {
  const [content, setContent] = useState<string>("Loading...")

  useEffect(() => {
    const loadContent = async () => {
      const markdownContent = await getDataStructureContent('stack-applications')
      setContent(markdownContent)
    }

    loadContent()
  }, [])

  return <MarkdownContent content={content} />
}

export default function StackApplicationsPage() {
  return <InfixPostfixVisualizer content={<Content />} />
}