import { useState, useEffect } from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';

interface QuickLink {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export function QuickLinks() {
  const [links, setLinks] = useState<QuickLink[]>(() => {
    const saved = localStorage.getItem('quick-links');
    return saved ? JSON.parse(saved) : [];
  });
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('quick-links', JSON.stringify(links));
  }, [links]);

  const getFaviconUrl = (url: string): string | undefined => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return undefined;
    }
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const url = newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`;
      const favicon = getFaviconUrl(url);
      
      const newQuickLink: QuickLink = {
        id: Date.now().toString(),
        title: newLink.title,
        url,
        ...(favicon && { favicon })
      };
      
      setLinks([...links, newQuickLink]);
      setNewLink({ title: '', url: '' });
      setIsAdding(false);
    }
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="p-4">
      {/* Links Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {links.map((link) => (
          <div 
            key={link.id}
            className="group relative flex flex-col items-center p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-background rounded-full shadow-sm overflow-hidden">
                {link.favicon ? (
                  <img 
                    src={link.favicon}
                    alt={link.title}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      // If favicon fails to load, show globe icon
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <Globe className="w-6 h-6 text-muted-foreground" />
                )}
                <Globe className="w-6 h-6 text-muted-foreground fallback-icon hidden absolute" />
              </div>
              <span className="text-sm font-medium text-center line-clamp-1">
                {link.title}
              </span>
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeLink(link.id);
              }}
              className="absolute top-1 right-1 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
        ))}

        {/* Add Link Button */}
        <button
          onClick={() => setIsAdding(true)}
          className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 rounded-lg transition-colors"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-background rounded-full shadow-sm">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium mt-2">Add Link</span>
        </button>
      </div>

      {/* Add Link Form */}
      {isAdding && (
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              className="w-full p-2 rounded-md bg-background border border-border"
            />
            <input
              type="url"
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="w-full p-2 rounded-md bg-background border border-border"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-sm rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addLink}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 