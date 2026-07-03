import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useStore } from '../store';

export function Chapter2Intro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const setCurrentChapter = useStore(s => s.setCurrentChapter);
  const [typing, setTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = '今天天气真好';
  const inputRef = useRef<HTMLDivElement>(null);
  const inputInView = useInView(inputRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) setCurrentChapter(2);
  }, [isInView, setCurrentChapter]);

  useEffect(() => {
    if (inputInView && !typing) {
      setTyping(true);
    }
  }, [inputInView, typing]);

  useEffect(() => {
    if (!typing) return;
    if (typedText.length < fullText.length) {
      const t = setTimeout(() => setTypedText(fullText.slice(0, typedText.length + 1)), 150);
      return () => clearTimeout(t);
    }
  }, [typing, typedText]);

  return (
    <section id="chapter-2" ref={sectionRef} className="py-20 px-4">
      <motion.div
        className="max-w-3xl mx-auto mb-16"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-[#F0EDE8] border border-[#B1ADA1]/30 rounded-lg p-4 text-center">
          <h2 className="font-[Poppins] text-xl md:text-2xl font-bold text-[#141413]">
            第二章：从头到尾——AI怎么"读懂"你的话
          </h2>
        </div>
      </motion.div>

      {/* Chat input simulation */}
      <div ref={inputRef} className="max-w-md mx-auto">
        <motion.div
          className="bg-[#F0EDE8] rounded-2xl p-4 flex items-center gap-3 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex-1 bg-white rounded-xl px-4 py-2 min-h-[40px] flex items-center font-[Lora]">
            <span>{typedText}</span>
            {typedText.length < fullText.length && <span className="animate-pulse ml-0.5">|</span>}
          </div>
          <motion.button
            className="bg-[#D97757] text-white px-4 py-2 rounded-xl font-[Poppins] font-semibold text-sm"
            animate={typedText.length === fullText.length ? {
              boxShadow: ['0 0 0 0 rgba(217,119,87,0)', '0 0 0 8px rgba(217,119,87,0.3)', '0 0 0 0 rgba(217,119,87,0)']
            } : {}}
            transition={{ repeat: 2, duration: 1 }}
          >
            发送
          </motion.button>
        </motion.div>

        <motion.p
          className="text-center text-[#B1ADA1] text-sm mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
        >
          这句话现在进入了AI的处理流程 ↓
        </motion.p>

        {/* Flow line start */}
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-[#D97757] to-[#D97757]/30 mx-auto mt-4"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: 'top' }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>
    </section>
  );
}
