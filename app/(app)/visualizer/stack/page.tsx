"use client"

import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { getDataStructureContent } from "@/lib/content-utils"
import { useEffect, useState } from "react"

function Content() {
  const [content, setContent] = useState<string>("Loading...")

  useEffect(() => {
    const loadContent = async () => {
      const markdownContent = await getDataStructureContent('stack')
      setContent(markdownContent)
    }

    loadContent()
  }, [])

  return <MarkdownContent content={content} />
}

export default function StackPage() {
  return <StackVisualizer content={<Content />} />
}