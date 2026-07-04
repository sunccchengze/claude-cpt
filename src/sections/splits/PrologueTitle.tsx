import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TypewriterText({ text, delay = 0, speed = 80, onComplete }: {
  text: string; delay?: number; speed?: number; onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(t);
    } else { onComplete?.(); }
  }, [started, displayed, text, speed, onComplete]);
  return (
    <span>
      {displayed.split('').map((char, i) => (
        <span key={i} className={(char === '聪' || char === '明') ? 'text-[#D97757] font-semibold' : ''}>{char}</span>
      ))}
      {displayed.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}

export function PrologueTitle() {
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  return (
    <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4">
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <motion.h1
          className="font-[Poppins] text-3xl md:text-5xl font-bold text-[#141413] mb-4"
          initial={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          onAnimationComplete={() => setTitleDone(true)}
        >
          当今最强AI大模型的工作原理
        </motion.h1>
        {titleDone && (
          <div className="text-lg md:text-2xl text-[#141413] font-[Lora]">
            <TypewriterText text='——它们凭什么这么"聪明"？' delay={200} speed={80} onComplete={() => setSubtitleDone(true)} />
          </div>
        )}
      </motion.div>
      {subtitleDone && (
        <motion.div className="mt-8 text-[#B1ADA1] text-sm animate-bounce" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          翻到下一页开始探索 →
        </motion.div>
      )}
    </section>
  );
}
