"use client"

import { PolynomialVisualizer } from "@/components/visualizer/polynomial/polynomial-visualizer"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { getDataStructureContent } from "@/lib/content-utils"
import { useEffect, useState } from "react"

function Content() {
  const [content, setContent] = useState<string>("Loading...")

  useEffect(() => {
    const loadContent = async () => {
      const markdownContent = await getDataStructureContent('polynomial')
      setContent(markdownContent)
    }

    loadContent()
  }, [])

  return <MarkdownContent content={content} />
}

export default function PolynomialPage() {
  return <PolynomialVisualizer content={<Content />} />
}