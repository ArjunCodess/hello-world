import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ title, icon, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between border-b border-border hover:bg-muted/50 transition-colors"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h2>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
} 