import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_TERMS, useStore } from '../store';

export function Glossary() {
  const glossaryOpen = useStore(s => s.glossaryOpen);
  const toggleGlossary = useStore(s => s.toggleGlossary);
  const unlockedTerms = useStore(s => s.unlockedTerms);
  const [search, setSearch] = useState('');

  const unlocked = ALL_TERMS.filter(t => unlockedTerms.includes(t.id));
  const filtered = unlocked.filter(
    t => t.en.toLowerCase().includes(search.toLowerCase()) ||
         t.zh.includes(search) ||
         t.definition.includes(search)
  );

  const scrollToTerm = (id: string) => {
    const el = document.getElementById(`term-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-[#D97757]');
      setTimeout(() => el.classList.remove('ring-2', 'ring-[#D97757]'), 2000);
    }
  };

  return (
    <AnimatePresence>
      {glossaryOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/10 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleGlossary}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-[#FAF9F5] shadow-xl z-[95] flex flex-col"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-4 border-b border-[#B1ADA1]/20 flex items-center justify-between">
              <h3 className="font-[Poppins] font-semibold text-[#141413]">📖 术语词典</h3>
              <button onClick={toggleGlossary} className="text-[#B1ADA1] hover:text-[#141413] text-xl cursor-pointer">×</button>
            </div>
            <div className="p-3">
              <input
                type="text"
                placeholder="搜索术语..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#B1ADA1]/30 bg-white text-sm focus:outline-none focus:border-[#D97757]"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filtered.length === 0 ? (
                <p className="text-[#B1ADA1] text-sm text-center py-8">
                  {unlockedTerms.length === 0 ? '继续阅读来解锁术语吧！' : '没有找到匹配的术语'}
                </p>
              ) : (
                filtered.map(term => (
                  <button
                    key={term.id}
                    onClick={() => scrollToTerm(term.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#D97757]/5 transition-colors border border-transparent hover:border-[#D97757]/20 cursor-pointer"
                  >
                    <p className="font-[Poppins] text-sm font-bold text-[#D97757]">{term.en}</p>
                    <p className="text-[#141413] text-sm">{term.zh}</p>
                    <p className="text-[#B1ADA1] text-xs mt-1 line-clamp-2">{term.definition}</p>
                  </button>
                ))
              )}
            </div>
            <div className="p-3 text-center text-xs text-[#B1ADA1]">
              已解锁 {unlockedTerms.length} / {ALL_TERMS.length} 个术语
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
