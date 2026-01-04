import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Theme, ReaderSettings } from '../types';
import { THEMES } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReaderProps {
  content: string;
  title: string;
  settings: ReaderSettings;
  onExit: () => void;
}

export const Reader: React.FC<ReaderProps> = ({ content, title, settings, onExit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const theme = THEMES[settings.theme];

  // Logic: CSS Multi-column layout handles the content flow.
  // We translate the container horizontally to show one "page" (viewport width) at a time.
  
  const calculatePages = () => {
    if (!containerRef.current) return;
    const { scrollWidth, clientWidth } = containerRef.current;
    // We add a small buffer because sometimes browser rounding causes an extra sliver page
    const pages = Math.ceil(scrollWidth / (clientWidth + 1)); 
    setTotalPages(Math.max(1, pages));
    
    // Ensure current page is valid after resize
    setCurrentPage(p => Math.min(p, Math.max(0, pages - 1)));
    setIsReady(true);
  };

  useLayoutEffect(() => {
    calculatePages();
    // Re-calculate on resize
    const observer = new ResizeObserver(() => {
        // Debounce slightly to avoid flicker
        requestAnimationFrame(calculatePages);
    });
    if (containerRef.current) {
        observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [content, settings.fontSize, settings.lineHeight]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, onExit]);

  // Formatting content: Ensure paragraphs are wrapped in <p> tags if not already
  const formattedContent = React.useMemo(() => {
    return content.split(/\n\s*\n/).map((para, i) => (
      <p key={i} className="mb-4 text-justify indent-8">
        {para.trim()}
      </p>
    ));
  }, [content]);

  return (
    <div className={`fixed inset-0 flex flex-col ${theme.bg} ${theme.text} transition-colors duration-300`}>
      {/* Header Info - Fades out when not hovering near top? Or just static minimal. Static is better for usability. */}
      <div className={`h-12 flex items-center justify-between px-6 select-none ${theme.uiBg} border-b ${theme.uiBorder} transition-colors duration-300 z-20`}>
        <button 
            onClick={onExit}
            className={`text-xs uppercase tracking-widest font-bold opacity-60 hover:opacity-100 transition-opacity`}
        >
          &larr; Library
        </button>
        <span className="text-sm font-medium truncate max-w-md opacity-80">{title}</span>
        <span className="text-xs tabular-nums opacity-60 font-mono">
           {isReady ? `${currentPage + 1} / ${totalPages}` : '...'}
        </span>
      </div>

      {/* Main Reading Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* CSS Column Container */}
        <div 
          ref={containerRef}
          className="absolute inset-0 px-8 py-8 md:px-16 md:py-12 h-full transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
            columnWidth: 'calc(100vw - 4rem)', // approximate, corrected by columnCount usually
            columnGap: '4rem', // Gap between pages
            columnFill: 'auto',
            height: '100%',
            // We force columns to be viewport width minus padding
            // In CSS columns, content flows to the right. 
            // We need width to be auto so it expands.
            width: 'auto',
            maxWidth: 'none', // Allow infinite width
            
            // Text styling
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
          }}
        >
          <div 
             className="font-serif max-w-none prose prose-p:my-0 prose-headings:mb-4"
             style={{
                // Ensure the content actually creates columns horizontally
                // columns: 'calc(100vw - 64px) 1' // This is sometimes flaky
                // Better approach for horizontal pagination:
                columnWidth: 'auto',
                columnCount: 'auto', 
                columns: `calc(100vw - var(--page-padding-x, 4rem)) auto`,
             }}
          >
             {/* Dynamic style injection for exact column width based on container width */}
             <style>{`
                .reader-content {
                   columns: calc(100vw - 0px) auto; /* Adjusted via JS logic usually better but CSS calc works */
                }
             `}</style>
             
             {formattedContent}
             
             {/* End marker */}
             <div className="h-32 flex items-center justify-center text-center italic opacity-40 mt-12 break-inside-avoid">
                The End
             </div>
          </div>
        </div>
      </div>

       {/* Progress Bar */}
       <div className={`h-1 w-full ${theme.uiBg}`}>
         <div 
            className={`h-full ${theme.text} opacity-30 transition-all duration-300`}
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
         />
       </div>

       {/* Navigation Hover Zones (optional visual cues) */}
       {currentPage > 0 && (
          <button 
             onClick={() => setCurrentPage(c => c - 1)}
             className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
             aria-label="Previous page"
          >
             <ChevronLeft size={24} className="opacity-50" />
          </button>
       )}
       {currentPage < totalPages - 1 && (
          <button 
             onClick={() => setCurrentPage(c => c + 1)}
             className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
             aria-label="Next page"
          >
             <ChevronRight size={24} className="opacity-50" />
          </button>
       )}
    </div>
  );
};
