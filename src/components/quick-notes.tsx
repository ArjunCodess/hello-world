import { useState, useEffect } from 'react'
import { Pencil, Save, HelpCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MARKDOWN_GUIDE = `### Markdown Guide
- Use **bold** or __bold__
- Use *italic* or _italic_
- # Heading 1
- ## Heading 2
- ### Heading 3
- - Bullet points
- 1. Numbered lists
- \`inline code\`
- \`\`\`
  Code blocks
\`\`\`
- [Links](https://example.com)
- > Blockquotes
- *** for horizontal rule
`

export function QuickNotes() {
  const [note, setNote] = useState(() => {
    const savedNote = localStorage.getItem('quick-note')
    return savedNote || ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      localStorage.setItem('quick-note', note)
    }
  }, [note, isEditing])

  const handleSave = () => {
    setIsEditing(false)
    localStorage.setItem('quick-note', note)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Quick Notes</h2>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            title="Markdown Guide"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Toggle markdown guide</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <span className="text-xs text-yellow-500 dark:text-yellow-400">Editing...</span>
              <button
                onClick={handleSave}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                title="Save"
              >
                <Save className="h-4 w-4" />
                <span className="sr-only">Save note</span>
              </button>
            </>
          ) : (
            <>
              <span className="text-xs text-muted-foreground">Saved</span>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit note</span>
              </button>
            </>
          )}
        </div>
      </div>

      {showGuide && (
        <div className="mb-4 p-4 rounded-md bg-muted text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{MARKDOWN_GUIDE}</ReactMarkdown>
        </div>
      )}

      {isEditing ? (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot down your thoughts using markdown..."
          className="w-full h-[200px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono"
          autoFocus
        />
      ) : (
        <div 
          className="w-full h-[200px] overflow-auto rounded-md border border-input bg-background px-3 py-2 text-sm prose dark:prose-invert prose-sm max-w-none"
        >
          {note ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note}
            </ReactMarkdown>
          ) : (
            <div className="text-muted-foreground">No notes yet. Click the edit button to add some.</div>
          )}
        </div>
      )}
    </div>
  )
} 