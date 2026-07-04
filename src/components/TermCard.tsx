import { motion, AnimatePresence } from 'framer-motion';
import { ALL_TERMS, useStore } from '../store';

export function TermCardPopup() {
  const activeTermCard = useStore(s => s.activeTermCard);
  const showTermCard = useStore(s => s.showTermCard);
  const term = ALL_TERMS.find(t => t.id === activeTermCard);

  return (
    <AnimatePresence>
      {term && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => showTermCard(null)}
        >
          <div className="absolute inset-0 bg-black/20" />
          <motion.div
            className="relative bg-[#FAF9F5] rounded-xl shadow-xl max-w-md w-full border-l-4 border-[#D97757] p-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => showTermCard(null)}
              className="absolute top-3 right-3 text-[#B1ADA1] hover:text-[#141413] text-xl leading-none cursor-pointer"
            >×</button>
            <p className="font-[Poppins] text-xl font-bold text-[#D97757] mb-1">{term.en}</p>
            <p className="text-[#141413] font-semibold mb-2">{term.zh}</p>
            <p className="text-[#141413] text-sm leading-relaxed mb-3">{term.definition}</p>
            <p className="text-[#B1ADA1] text-sm italic">{term.analogy}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InlineTermCard({ id, showFull = false }: { id: string; showFull?: boolean }) {
  const term = ALL_TERMS.find(t => t.id === id);
  const unlockTerm = useStore(s => s.unlockTerm);
  const showTermCard = useStore(s => s.showTermCard);

  if (!term) return null;

  if (showFull) {
    return (
      <motion.div
        className="bg-[#FAF9F5] rounded-xl shadow-lg border-l-4 border-[#D97757] p-5 my-6 max-w-lg mx-auto"
        initial={{ x: -120, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', damping: 18, stiffness: 200 }}
        onViewportEnter={() => unlockTerm(id)}
      >
        <p className="font-[Poppins] text-xl font-bold text-[#D97757] mb-1">{term.en}</p>
        <p className="text-[#141413] font-semibold mb-2">{term.zh}</p>
        <p className="text-[#141413] text-sm leading-relaxed mb-3">{term.definition}</p>
        <p className="text-[#B1ADA1] text-sm italic">{term.analogy}</p>
        <motion.span
          className="inline-block mt-2 text-xs text-[#D97757] bg-[#D97757]/10 px-2 py-1 rounded"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 }}
        >
          已收录 📖
        </motion.span>
      </motion.div>
    );
  }

  return (
    <span
      className="term-highlight cursor-pointer"
      onClick={() => showTermCard(id)}
    >
      {term.zh}
    </span>
  );
}
