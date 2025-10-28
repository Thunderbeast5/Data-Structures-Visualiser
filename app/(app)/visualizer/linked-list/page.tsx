"use client"

import { LinkedListVisualizer } from "@/components/visualizer/linked-list/linked-list-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { getDataStructureContent } from "@/lib/content-utils"
import { useEffect, useState } from "react"

function Content() {
  const [content, setContent] = useState<string>("Loading...")

  useEffect(() => {
    const loadContent = async () => {
      const markdownContent = await getDataStructureContent('linked-list')
      setContent(markdownContent)
    }

    loadContent()
  }, [])

  return <MarkdownContent content={content} />
}

export default function LinkedListPage() {
  return <LinkedListVisualizer content={<Content />} />
}