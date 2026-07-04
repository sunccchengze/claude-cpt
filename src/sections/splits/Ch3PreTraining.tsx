import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { InlineTermCard } from '../../components/TermCard';

const books = ['维基百科', '学术论文', '新闻', '小说', '代码', '法律', '医学', '社交媒体'];

export function Ch3PreTraining() {
  const preRef = useRef<HTMLDivElement>(null);
  const preInView = useInView(preRef, { once: true, amount: 0.2 });
  const [booksAbsorbed, setBooksAbsorbed] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    if (!preInView) return;
    const interval = setInterval(() => {
      setBooksAbsorbed(b => { if (b >= books.length) { clearInterval(interval); return b; } return b + 1; });
    }, 400);
    return () => clearInterval(interval);
  }, [preInView]);

  useEffect(() => {
    if (booksAbsorbed < books.length) return;
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5000000000);
      if (count > 10000000000000) { count = 10000000000000; clearInterval(interval); }
      setTokenCount(count);
    }, 50);
    return () => clearInterval(interval);
  }, [booksAbsorbed]);

  return (
    <section ref={preRef} className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h3 className="font-[Poppins] text-lg font-bold text-[#D97757] mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center text-sm">1</span>
          阶段一：预训练——"读遍天下书"
        </motion.h3>
        <div id="term-pre-training"><InlineTermCard id="pre-training" showFull /></div>

        <div className="relative bg-gradient-to-b from-blue-50/30 to-amber-50/30 rounded-2xl p-8 my-6 overflow-hidden min-h-[220px]">
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl z-10" animate={{ scale: 1 + booksAbsorbed * 0.08 }} transition={{ type: 'spring', stiffness: 100 }}>
            {booksAbsorbed < books.length ? '🤖' : '🧠'}
          </motion.div>
          <div className="absolute top-4 left-4 right-4">
            <div className="text-xs text-[#B1ADA1] mb-1">知识量</div>
            <div className="h-2 bg-[#F0EDE8] rounded-full overflow-hidden"><motion.div className="h-full bg-[#D97757] rounded-full" animate={{ width: `${(booksAbsorbed / books.length) * 100}%` }} /></div>
          </div>
          <AnimatePresence>
            {books.slice(0, booksAbsorbed).map((book, i) => (
              <motion.div key={book} className="absolute px-2 py-1 bg-white rounded shadow text-xs font-[Poppins]"
                initial={{ x: (i % 2 === 0 ? -100 : 300), y: 50 + (i % 3) * 50, opacity: 1, scale: 1 }}
                animate={{ x: '50%', y: '50%', opacity: 0, scale: 0.3 }} transition={{ duration: 0.8 }}>📚 {book}</motion.div>
            ))}
          </AnimatePresence>
          {tokenCount > 0 && (
            <motion.div className="absolute bottom-4 left-4 right-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-[#B1ADA1] text-xs">已读 </span>
              <span className="font-mono text-[#D97757] font-bold">{tokenCount >= 10000000000000 ? '数万亿' : (tokenCount / 1000000000000).toFixed(1) + '万亿'}</span>
              <span className="text-[#B1ADA1] text-xs"> token</span>
            </motion.div>
          )}
        </div>
        <div className="space-y-2 my-4">
          {[{ q: '中国的首都是____', a: '北京' }, { q: '水的化学式是____', a: 'H₂O' }, { q: 'def hello():____', a: "print('Hello')" }].map((item, i) => (
            <motion.div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
              <span className="text-[#141413] text-sm font-mono">{item.q}</span>
              <span className="text-[#D97757] font-semibold text-sm">→ {item.a}</span><span className="text-green-500">✅</span>
            </motion.div>
          ))}
        </div>
        <p className="text-[#141413] text-sm leading-relaxed">经过预训练，模型学会了语言的语法规律、大量的事实性知识、甚至编程技能。但是——它现在只会"补全文本"，还不会"回答问题"。</p>
      </div>
    </section>
  );
}
