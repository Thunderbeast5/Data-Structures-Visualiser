"use client"

import { HeapSortVisualizer } from "@/components/visualizer/heap/heap-sort-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { getDataStructureContent } from "@/lib/content-utils"
import { useEffect, useState } from "react"

function Content() {
  const [content, setContent] = useState<string>("Loading...")

  useEffect(() => {
    const loadContent = async () => {
      const markdownContent = await getDataStructureContent('heap-sort')
      setContent(markdownContent)
    }

    loadContent()
  }, [])

  return <MarkdownContent content={content} />
}

export default function HeapSortPage() {
  return <HeapSortVisualizer content={<Content />} />
}
