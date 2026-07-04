import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';

const tokens = ['今天', '天气', '真', '好'];

export function Step2_5PositionalEncoding() {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const animInView = useInView(animRef, { once: true, amount: 0.3 });
  const [badgesPlaced, setBadgesPlaced] = useState<boolean[]>([false, false, false, false]);
  const [showMerge, setShowMerge] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  useInView(counterRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!animInView) return;
    const timers = tokens.map((_, i) =>
      setTimeout(() => setBadgesPlaced(prev => { const n = [...prev]; n[i] = true; return n; }), 500 + i * 600)
    );
    const mergeTimer = setTimeout(() => setShowMerge(true), 500 + tokens.length * 600 + 500);
    return () => { timers.forEach(clearTimeout); clearTimeout(mergeTimer); };
  }, [animInView]);

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center font-[Poppins] font-bold text-sm">2.5</div>
          <span className="font-[Poppins] font-semibold text-[#141413]">Step 2.5: 位置编码</span>
        </motion.div>

        {/* Why needed */}
        <div className="space-y-4 my-8">
          <motion.p className="text-[#D97757] font-semibold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            等一下——我们漏掉了一件重要的事。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            在上一步中，我们把每个token变成了一个向量。但是——
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed font-semibold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            "今天天气真好"和"好真气天天今"用的是完全相同的四个token，只是顺序不同！
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            如果只有嵌入向量，模型分不清这两句话的区别。它不知道哪个词在前、哪个词在后。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            词的顺序在语言中至关重要。<span className="text-[#D97757] font-semibold">"小明打了小红"</span>和<span className="text-[#D97757] font-semibold">"小红打了小明"</span>意思完全不同！
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            所以，模型需要一个额外的步骤来记录每个token的位置信息。这就是——位置编码。
          </motion.p>
        </div>

        <div id="term-positional-encoding">
          <InlineTermCard id="positional-encoding" showFull />
        </div>
      </div>

      {/* Badge Animation */}
      <div ref={animRef} className="max-w-xl mx-auto my-12">
        <div className="flex flex-wrap justify-center gap-4">
          {tokens.map((tk, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={animInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              {/* Badge */}
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-[Poppins] font-bold text-sm mb-2"
                style={{
                  backgroundColor: badgesPlaced[i] ? '#D97757' : 'transparent',
                  border: badgesPlaced[i] ? '2px solid #D97757' : '2px dashed #B1ADA1',
                }}
                animate={badgesPlaced[i] ? { scale: [0.8, 1.1, 1] } : {}}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {badgesPlaced[i] ? `${i + 1}` : ''}
              </motion.div>

              {/* Token card */}
              <div className="px-4 py-2 bg-[#D97757]/10 border border-[#D97757]/30 rounded-lg text-center">
                <span className="font-bold">{tk}</span>
              </div>

              {/* Merge info */}
              {showMerge && (
                <motion.div
                  className="mt-2 text-[10px] font-mono text-[#B1ADA1] text-center leading-tight max-w-[120px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="text-[#6A9BCC]">词义 + 位置{i + 1}</div>
                  <div>= 最终向量</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-[#141413] text-sm mt-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={showMerge ? { opacity: 1 } : {}}
        >
          现在，每个token的向量里既包含了"这个词是什么意思"的信息，也包含了"这个词在句子中的什么位置"的信息。
        </motion.p>
      </div>

      {/* Counterexample */}
      <div ref={counterRef} className="max-w-lg mx-auto my-12">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-md border border-[#B1ADA1]/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-[Poppins] font-semibold text-[#141413] mb-4">如果没有位置编码会怎样？</p>

          <div className="space-y-4">
            {/* Without */}
            <div className="p-3 rounded-lg bg-red-50 border border-[#C25B4A]/20">
              <p className="text-sm mb-2">没有位置编码：</p>
              <div className="flex gap-2 mb-1">
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">小明</span>
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">打了</span>
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">小红</span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">小红</span>
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">打了</span>
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">小明</span>
              </div>
              <p className="text-[#C25B4A] text-sm font-semibold">❌ 分不清！两句话的token集合完全一样</p>
            </div>

            {/* With */}
            <div className="p-3 rounded-lg bg-green-50 border border-green-300/30">
              <p className="text-sm mb-2">有位置编码：</p>
              <div className="flex gap-2 mb-1">
                <span className="px-2 py-1 bg-[#D97757]/10 rounded text-xs">小明<sup className="text-[#D97757]">①</sup></span>
                <span className="px-2 py-1 bg-[#D97757]/10 rounded text-xs">打了<sup className="text-[#D97757]">②</sup></span>
                <span className="px-2 py-1 bg-[#D97757]/10 rounded text-xs">小红<sup className="text-[#D97757]">③</sup></span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-[#D97757]/10 rounded text-xs">小红<sup className="text-[#D97757]">①</sup></span>
                <span className="px-2 py-1 bg-[#D97757]/10 rounded text-xs">打了<sup className="text-[#D97757]">②</sup></span>
                <span className="px-2 py-1 bg-[#D97757]/10 rounded text-xs">小明<sup className="text-[#D97757]">③</sup></span>
              </div>
              <p className="text-green-600 text-sm font-semibold">✅ 这下能分清了！位置不同 = 含义不同</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
