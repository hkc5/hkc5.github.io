import { useState, useEffect } from 'react'

export const useMarkdownContent = (filename: string) => {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        // Import the markdown file as raw text
        const response = await import(`../content/${filename}.md?raw`)
        setContent(response.default)
        setError(null)
      } catch (err) {
        console.error(`Error loading ${filename}.md:`, err)
        setError(`Failed to load content`)
        setContent(`# Error\n\nFailed to load content for ${filename}`)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [filename])

  return { content, loading, error }
}
