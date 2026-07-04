import { useEffect, useRef, useCallback, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, TOTAL_PAGES } from '../store';

interface PageContainerProps {
  pages: ReactNode[];
}

export function PageContainer({ pages }: PageContainerProps) {
  const currentPage = useStore(s => s.currentPage);
  const setCurrentPage = useStore(s => s.setCurrentPage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const go = useCallback((target: number) => {
    if (target < 0 || target >= TOTAL_PAGES || target === currentPage) return;
    if (Date.now() < lockUntil.current) return;
    lockUntil.current = Date.now() + 420;
    setDirection(target > currentPage ? 1 : -1);
    setCurrentPage(target);
  }, [currentPage, setCurrentPage]);

  const goNext = useCallback(() => go(currentPage + 1), [go, currentPage]);
  const goPrev = useCallback(() => go(currentPage - 1), [go, currentPage]);

  // Keyboard: arrow keys + space/pgdn/pgup
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault(); goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); goPrev();
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [goNext, goPrev]);

  // Reset scroll position on page change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);

  // Animation: pure opacity + gentle translateY, no blur/scale
  const enterY = direction > 0 ? 36 : -36;

  return (
    <div className="relative h-[calc(100vh-3rem)] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentPage}
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          initial={{ opacity: 0, y: enterY }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -enterY }}
          transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{ willChange: 'opacity, transform', scrollbarGutter: 'stable' }}
        >
          <div className="min-h-full pb-24">
            {pages[currentPage]}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-4xl mx-auto px-6 pb-5 flex items-center justify-between pointer-events-auto">
          <button
            onClick={goPrev}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer
              disabled:opacity-0 disabled:pointer-events-none
              bg-white/80 backdrop-blur-sm border border-[#e8e6dc] text-[#141413]
              hover:bg-[#D97757] hover:text-white hover:border-[#D97757]"
            style={{ boxShadow: '0 2px 8px rgba(60,50,40,0.08)' }}
          >
            <span>←</span>
            <span className="hidden sm:inline font-[Poppins] text-xs">上一页</span>
          </button>

          {/* Mobile dots */}
          <div className="flex md:hidden items-center gap-1.5">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button key={i} onClick={() => go(i)} className="cursor-pointer">
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentPage ? 16 : 5,
                    height: 5,
                    backgroundColor: i === currentPage ? '#D97757' : i < currentPage ? '#141413' : '#B1ADA1',
                  }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === TOTAL_PAGES - 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer
              disabled:opacity-0 disabled:pointer-events-none
              bg-[#D97757] text-white border border-[#D97757]
              hover:bg-[#c5664a]"
            style={{ boxShadow: '0 2px 8px rgba(60,50,40,0.10)' }}
          >
            <span className="hidden sm:inline font-[Poppins] text-xs">下一页</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
