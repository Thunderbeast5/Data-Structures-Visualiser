"use client"

import { MessageQueueVisualizer } from "@/components/visualizer/queue-applications/message-queue-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { getDataStructureContent } from "@/lib/content-utils"
import { useEffect, useState } from "react"

function Content() {
  const [content, setContent] = useState<string>("Loading...")

  useEffect(() => {
    const loadContent = async () => {
      const markdownContent = await getDataStructureContent('queue-applications')
      setContent(markdownContent)
    }

    loadContent()
  }, [])

  return <MarkdownContent content={content} />
}

export default function MessageQueuePage() {
  return <MessageQueueVisualizer content={<Content />} />
}