import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API route to read markdown content from the content directory
 * This runs on the server side and can use Node.js APIs
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const dataStructure = url.searchParams.get('dataStructure')

    if (!dataStructure) {
      return NextResponse.json(
        { error: 'dataStructure parameter is required' },
        { status: 400 }
      )
    }

    // Map data structure names to content file names
    const contentFileMap: Record<string, string> = {
      'stack': 'stack.md',
      'queue': 'queue.md',
      'binary-tree': 'binary-tree.md',
      'binary-search-tree': 'binary-tree.md',
      'avl-tree': 'avl-tree.md',
      'heap': 'heap.md',
      'linked-list': 'linked-list.md',
      'stack-applications': 'stack-applications.md',
      'queue-applications': 'message-queue.md',
      'polynomial': 'polynomial.md',
    }

    const fileName = contentFileMap[dataStructure] || `${dataStructure}.md`
    const filePath = path.join(process.cwd(), 'content', fileName)

    if (!fs.existsSync(filePath)) {
      const title = dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)
      return NextResponse.json({
        content: `# ${title}\n\nContent coming soon...`
      })
    }

    const content = fs.readFileSync(filePath, 'utf8')

    return NextResponse.json({ content })
  } catch (error) {
    const dataStructure = new URL(request.url).searchParams.get('dataStructure')
    console.error(`Error reading content for ${dataStructure}:`, error)
    const title = dataStructure ? dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1) : 'Content'
    return NextResponse.json({
      content: `# ${title}\n\nError loading content.`
    })
  }
}
