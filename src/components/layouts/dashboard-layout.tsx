import { ThemeToggle } from '../theme/theme-toggle'
import { TimeDisplay } from '../widgets/time-display'
import { TodoList } from '../widgets/todo-list'
import { NotesEditor } from '../widgets/notes-editor'
import { ContentFeed } from '../widgets/content-feed'
import { QuoteDisplay } from '../widgets/quote-display'
import { CollapsibleSection } from '../ui/collapsible-section'

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Full width header section */}
      <div className="w-full border-b border-border bg-card relative">
        {/* Theme Toggle in top-right corner */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Centered content */}
        <div className="container mx-auto px-4 pt-12 pb-10">
          <div className="max-w-3xl mx-auto space-y-8 text-center">
            <TimeDisplay />
            <QuoteDisplay />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Productivity Column */}
          <div className="space-y-6">
            <CollapsibleSection title="Todo List" icon="✨">
              <TodoList />
            </CollapsibleSection>
            <CollapsibleSection title="Quick Notes" icon="📝">
              <NotesEditor />
            </CollapsibleSection>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <CollapsibleSection title="Top Products" icon="🎯" defaultOpen={false}>
              <div className="divide-y divide-border">
                <ContentFeed type="products" />
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Dev.to Posts" icon="👩‍💻" defaultOpen={false}>
              <div className="divide-y divide-border">
                <ContentFeed type="posts" />
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </div>
  )
} 