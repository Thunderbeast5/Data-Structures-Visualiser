/**
 * Client-side utility to fetch markdown content from the API
 * @param dataStructure - The data structure name (e.g., 'stack', 'queue', 'binary-tree')
 * @returns Promise that resolves to the markdown content as a string
 */
export async function getDataStructureContent(dataStructure: string): Promise<string> {
  try {
    const response = await fetch(`/api/content?dataStructure=${encodeURIComponent(dataStructure)}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.content
  } catch (error) {
    console.error(`Error fetching content for ${dataStructure}:`, error)
    return `# ${dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)}\n\nError loading content.`
  }
}

/**
 * Get all available data structure names
 * @returns Array of data structure names
 */
export function getAvailableDataStructures(): string[] {
  // Return a static list since we can't read the filesystem from the browser
  return [
    'stack',
    'queue',
    'binary-tree',
    'avl-tree',
    'heap',
    'linked-list',
    'stack-applications',
    'queue-applications',
    'polynomial'
  ]
}
