import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';

const bookLabels = [
  '北京 = 中国首都', 'H₂O = 水', 'π ≈ 3.14159', '莎士比亚 → 英国剧作家',
  'def → Python关键字', '地球 → 太阳系', 'DNA → 双螺旋', 'E=mc²',
  '光速 → 3×10⁸', '元素周期表', '相对论', '量子力学',
];

export function Step4FFN() {
  const ref = useRef<HTMLDivElement>(null);
  const libRef = useRef<HTMLDivElement>(null);
  const libInView = useInView(libRef, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState(0); // 0=idle, 1=scanning, 2=absorbing, 3=done

  useEffect(() => {
    if (!libInView) return;
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t3 = setTimeout(() => setPhase(3), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [libInView]);

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center font-[Poppins] font-bold text-sm">4</div>
          <span className="font-[Poppins] font-semibold text-[#141413]">Step 4: 前馈网络</span>
        </motion.div>

        <div id="term-ffn"><InlineTermCard id="ffn" showFull /></div>

        <div className="space-y-4 my-8">
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            经过自注意力，每个token已经知道了"句子里谁跟谁有关系"。但光知道关系还不够——模型还需要调用它在训练中记住的知识来做进一步的理解。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            比如，模型在注意力层知道了"北京"和"首都"有关系。但<span className="font-semibold text-[#D97757]">"北京是中国的首都"</span>这个具体的知识事实，是存储在前馈网络中的。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed italic text-[#B1ADA1]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            💡 注意力层像是"理解能力"，前馈层像是"记忆仓库"。前者负责理解关系，后者负责提供知识。
          </motion.p>
        </div>
      </div>

      {/* Library animation */}
      <div ref={libRef} className="max-w-3xl mx-auto my-12">
        <motion.div
          className="relative bg-amber-50/50 rounded-2xl p-6 md:p-8 overflow-hidden"
          style={{ minHeight: '300px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-[Poppins] font-semibold text-[#141413] text-center mb-6">📚 知识仓库</p>

          {/* Bookshelf */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-8">
            {bookLabels.map((label, i) => {
              const isAbsorbed = phase >= 2 && (i === 0 || i === 5 || i === 3);
              return (
                <motion.div
                  key={i}
                  className="rounded-lg p-2 text-center text-xs font-mono"
                  style={{
                    backgroundColor: isAbsorbed ? 'rgba(217,119,87,0.2)' : 'rgba(180,140,100,0.1)',
                    borderLeft: `3px solid ${isAbsorbed ? '#D97757' : `hsl(${30 + i * 15}, 50%, ${45 + i * 2}%)`}`,
                  }}
                  animate={isAbsorbed ? {
                    scale: [1, 1.1, 0.3],
                    opacity: [1, 1, 0],
                    y: [0, -5, -30],
                  } : phase >= 1 ? {
                    borderLeftColor: ['#B1ADA1', '#D97757', '#B1ADA1'],
                  } : {}}
                  transition={isAbsorbed ? {
                    duration: 0.8,
                    delay: [0, 0.5, 1][bookLabels.slice(0, i).filter((_, j) => j === 0 || j === 5 || j === 3).length] || 0,
                  } : { duration: 2, repeat: phase === 1 ? 2 : 0, delay: i * 0.1 }}
                >
                  {label}
                </motion.div>
              );
            })}
          </div>

          {/* Info ball */}
          <motion.div
            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-white font-[Poppins] font-bold text-xs text-center"
            style={{ backgroundColor: '#D97757' }}
            animate={phase >= 3 ? {
              scale: [1, 1.2, 1],
              boxShadow: ['0 0 0 0 rgba(217,119,87,0)', '0 0 20px 8px rgba(217,119,87,0.4)', '0 0 0 0 rgba(217,119,87,0)'],
            } : {}}
            transition={{ duration: 1 }}
          >
            {phase < 2 ? '信息球' : phase < 3 ? '吸收中...' : '✨ 完成'}
          </motion.div>

          <motion.p
            className="text-center text-sm text-[#141413] mt-4"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
          >
            前馈网络层处理完毕。每个token的表示现在融入了训练时学到的世界知识。
          </motion.p>
        </motion.div>

        <motion.div
          className="text-center mt-8 bg-[#D97757]/10 border border-[#D97757]/30 rounded-xl p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-[Poppins] font-semibold text-[#D97757]">
            一轮注意力 + 一轮FFN = 一个完整的Transformer层
          </p>
        </motion.div>
      </div>
    </section>
  );
}
