import { useRef } from 'react';
import { motion } from 'framer-motion';
import { LogoImage } from '../components/Navbar';
import { useStore } from '../store';

const flowSteps = [
  { label: '输入文本', desc: '你说了一句话', icon: '💬' },
  { label: '分词 Tokenization', desc: '切成token碎片', note: '词元 · 最小处理单位', icon: '🔪' },
  { label: '嵌入 Embedding', desc: '每个token变成数字向量', note: '向量 · 语义宇宙坐标', icon: '🌌' },
  { label: '位置编码', desc: '记录每个token的位置', note: '"我是谁" + "我在哪儿"', icon: '📍' },
  { label: '自注意力 × N层', desc: '每个词去看所有其他词，找到最相关的', note: 'Q·K·V · 多头注意力', icon: '🎯', highlight: true },
  { label: '前馈网络 × N层', desc: '调取知识仓库', note: '存储事实性知识', icon: '📚' },
  { label: '输出预测', desc: '预测下一个最可能的词', note: '概率分布 · Softmax', icon: '🎰' },
  { label: 'AI的回答', desc: '词一个个蹦出来，拼成完整的句子', icon: '✨', final: true },
];

const trainingStages = [
  { icon: '👶', label: '预训练', desc: '疯狂读书，学知识' },
  { icon: '🎓', label: '指令微调', desc: '学会按指令做事' },
  { icon: '👔', label: 'RLHF', desc: '学会做得更好' },
];

export function Finale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const toggleGlossary = useStore(s => s.toggleGlossary);
  const unlockedTerms = useStore(s => s.unlockedTerms);
  const setCurrentPage = useStore(s => s.setCurrentPage);

  const scrollToTop = () => {
    setCurrentPage(0);
  };

  return (
    <section id="chapter-7" ref={sectionRef} className="py-20 px-4 bg-[#FAF9F5]">
      {/* Title */}
      <motion.p
        className="text-center text-[#B1ADA1] italic text-lg mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        最后，把今天学到的全部串起来——
      </motion.p>

      {/* Flow chart */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B1ADA1]/30 via-[#D97757] to-[#D97757]" />

          <div className="space-y-4">
            {flowSteps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 flex-shrink-0"
                  style={{
                    backgroundColor: step.highlight ? '#D97757' : step.final ? '#D97757' : 'white',
                    border: step.highlight || step.final ? 'none' : '2px solid #B1ADA1',
                    boxShadow: step.final ? '0 0 20px rgba(217,119,87,0.4)' : 'none',
                  }}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <p className={`font-[Poppins] font-semibold text-sm ${step.highlight ? 'text-[#D97757]' : 'text-[#141413]'}`}>
                    {step.label}
                  </p>
                  <p className="text-[#141413] text-xs">{step.desc}</p>
                  {step.note && (
                    <p className="text-[#B1ADA1] text-[10px] mt-0.5">{step.note}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Glossary celebration */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center gap-2 bg-[#D97757] text-white px-4 py-2 rounded-full font-[Poppins] text-sm cursor-pointer"
            onClick={toggleGlossary}
            animate={{
              boxShadow: ['0 0 0 0 rgba(217,119,87,0)', '0 0 0 8px rgba(217,119,87,0.2)', '0 0 0 0 rgba(217,119,87,0)'],
            }}
            transition={{ repeat: 3, duration: 1.5 }}
          >
            <span>📖</span>
            <span>全部 {unlockedTerms.length} 个术语已解锁！点击复习</span>
            <span>✨</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Training stages recap */}
      <div className="max-w-md mx-auto mb-16">
        <div className="flex items-center justify-around bg-white rounded-xl p-4 shadow-sm">
          {trainingStages.map((stage, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: 'spring' }}
            >
              <div className="text-3xl mb-1">{stage.icon}</div>
              <p className="font-[Poppins] text-xs font-semibold text-[#D97757]">{stage.label}</p>
              <p className="text-[10px] text-[#B1ADA1]">{stage.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center text-sm text-[#141413] mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          知识 + 执行力 + 人类认可 = 能对话的AI
        </motion.p>
      </div>

      {/* Emergence formula recap */}
      <motion.div
        className="max-w-lg mx-auto bg-white rounded-xl p-6 shadow-sm mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="font-mono text-sm text-center space-y-1">
          <p className="text-[#141413]">大规模参数 × 大规模数据 × Transformer架构</p>
          <p className="text-[#141413]">× 三阶段训练</p>
          <div className="h-0.5 bg-[#D97757] my-2" />
          <motion.p
            className="text-[#D97757] font-bold text-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🧠 涌现：类似智能的行为
          </motion.p>
        </div>
      </motion.div>

      {/* Final words */}
      <div className="max-w-2xl mx-auto text-center space-y-6 mb-16">
        {[
          { text: '你刚刚经历的，是人类目前最尖端技术之一的完整工作原理。', style: 'text-[#B1ADA1] italic' },
          { text: '这些不是魔法，也不是巧合。', style: 'text-[#141413]' },
          { text: '它是数学、数据、算力和人类智慧的结晶——', style: 'text-[#141413]' },
          { text: '是人类目前为止写出来的，最复杂的一封给语言的情书。', style: 'text-[#D97757] font-[Poppins] font-bold text-lg md:text-xl' },
        ].map((line, i) => (
          <motion.p
            key={i}
            className={line.style}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.5 }}
          >
            {line.text}
          </motion.p>
        ))}

        <motion.p
          className="text-[#141413] text-sm pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5 }}
        >
          而现在，你已经知道它是怎么写成的了。
        </motion.p>

        <motion.p
          className="text-[#B1ADA1] text-xs pt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3 }}
        >
          从 Tokenization 到 Emergence，你都学过了。
        </motion.p>
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-xl mx-auto flex items-center justify-between pt-8 border-t border-[#B1ADA1]/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2">
          <LogoImage type="claude" size={32} />
          <LogoImage type="gpt" size={32} />
          <span className="text-[#B1ADA1] text-xs ml-2">Claude Fable 5 & GPT-5.6 Sol</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg">🏢</div>
            <span className="text-[8px] text-[#B1ADA1]">Transformer</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#D97757] text-sm font-[Poppins] hover:underline cursor-pointer"
          >
            <span>↑</span>
            <span>从头开始</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
