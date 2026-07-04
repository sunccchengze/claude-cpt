import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { InlineTermCard } from '../../components/TermCard';

export function Ch3RLHF() {
  const rlhfRef = useRef<HTMLDivElement>(null);
  const rlhfInView = useInView(rlhfRef, { once: true, amount: 0.2 });
  const [dogPhase, setDogPhase] = useState(0);

  useEffect(() => {
    if (!rlhfInView) return;
    const t1 = setTimeout(() => setDogPhase(1), 800);
    const t2 = setTimeout(() => setDogPhase(2), 2500);
    const t3 = setTimeout(() => setDogPhase(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [rlhfInView]);

  return (
    <section ref={rlhfRef} className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h3 className="font-[Poppins] text-lg font-bold text-[#D97757] mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center text-sm">3</span>
          阶段三：RLHF——"学会什么是'好'"
        </motion.h3>
        <div id="term-rlhf"><InlineTermCard id="rlhf" showFull /></div>
        <div id="term-reinforcement-learning"><InlineTermCard id="reinforcement-learning" showFull /></div>

        <div className="bg-amber-50/50 rounded-2xl p-6 my-6 relative min-h-[200px]">
          <p className="font-[Poppins] text-sm font-semibold text-[#141413] mb-4">🐕 训练小狗</p>
          <div className="flex items-end justify-center gap-8 h-32">
            <motion.div className="flex flex-col items-center" animate={{ scale: dogPhase >= 1 && dogPhase < 2 ? 1.1 : 1 }}>
              <div className="text-xs text-center mb-1 max-w-[100px]">{dogPhase === 0 ? '回答A：地球是圆的' : dogPhase < 3 ? '回答A：详细分析...' : ''}</div>
              <div className="flex gap-0.5 mb-1">{[...Array(dogPhase === 0 ? 5 : 4)].map((_, i) => (<span key={i} className="text-yellow-400 text-xs">⭐</span>))}</div>
              <div className="text-2xl">🥣</div>
            </motion.div>
            <motion.div className="text-4xl" animate={{ x: dogPhase >= 1 ? -30 : 0, rotate: dogPhase >= 2 ? [0, -5, 5, 0] : 0 }} transition={{ duration: 0.5 }}>
              {dogPhase >= 2 ? '🐕😋' : '🐕'}
            </motion.div>
            <motion.div className="flex flex-col items-center opacity-50">
              <div className="text-xs text-center mb-1 max-w-[100px]">{dogPhase === 0 ? '回答B：可能是方的...' : dogPhase < 3 ? '回答B：我不知道' : ''}</div>
              <div className="flex gap-0.5 mb-1">{[...Array(dogPhase === 0 ? 2 : 1)].map((_, i) => (<span key={i} className="text-yellow-400 text-xs">⭐</span>))}</div>
              <div className="text-2xl">🥣</div>
            </motion.div>
          </div>
          <AnimatePresence>{dogPhase >= 2 && (<motion.div className="absolute top-1/2 left-1/3 text-2xl" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }} transition={{ type: 'spring' }}>🦴</motion.div>)}</AnimatePresence>
          {dogPhase >= 3 && (<motion.div className="absolute top-4 right-4 text-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }}>💡</motion.div>)}
        </div>
        <p className="text-[#141413] text-sm leading-relaxed">RLHF的核心：不是告诉模型"标准答案是什么"，而是告诉模型"在多个可能的回答中，哪个更好"。模型通过大量比较，学会了人类偏好的回答风格。</p>
      </div>
    </section>
  );
}
