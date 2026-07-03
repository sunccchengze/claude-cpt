import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';
import { LogoImage } from '../components/Navbar';
import { useStore } from '../store';

const floors = [
  { label: '① 分词（Tokenization）', color: '#D97757' },
  { label: '② 嵌入（Embedding）', color: '#D97757' },
  { label: '③ 位置编码（Positional Encoding）', color: '#D97757' },
  { label: '④ 自注意力（Self-Attention） ⭐', color: '#D97757', star: true },
  { label: '④ 自注意力（续）', color: '#D97757', star: true },
  { label: '④ 自注意力（续）', color: '#D97757', star: true },
  { label: '⑤ 前馈网络（FFN）', color: '#D97757' },
  { label: '⑥ 输出预测', color: '#D97757' },
];

export function Chapter1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const setCurrentChapter = useStore(s => s.setCurrentChapter);
  const buildingRef = useRef<HTMLDivElement>(null);
  const buildingInView = useInView(buildingRef, { once: true, amount: 0.3 });
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [paperVisible, setPaperVisible] = useState(false);
  const paperRef = useRef<HTMLDivElement>(null);
  const paperInView = useInView(paperRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) setCurrentChapter(1);
  }, [isInView, setCurrentChapter]);

  useEffect(() => {
    if (paperInView) setPaperVisible(true);
  }, [paperInView]);

  const [paperTooltip, setPaperTooltip] = useState(false);

  return (
    <section id="chapter-1" ref={sectionRef} className="py-20 px-4">
      {/* Chapter Title */}
      <motion.div
        className="max-w-3xl mx-auto mb-16"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-[#F0EDE8] border border-[#B1ADA1]/30 rounded-lg p-4 text-center">
          <h2 className="font-[Poppins] text-xl md:text-2xl font-bold text-[#141413]">
            第一章：地基——Transformer架构
          </h2>
        </div>
      </motion.div>

      {/* Transformer Term Card */}
      <div id="term-transformer">
        <InlineTermCard id="transformer" showFull />
      </div>

      {/* First-time instruction */}
      <motion.p
        className="text-[#B1ADA1] text-sm text-center max-w-lg mx-auto my-8 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        从这里开始，每当出现一个新的专业术语，你都会看到这样的术语卡。别怕这些词——每一个我们都会彻底讲透。而且你随时可以点击右下角的📖按钮，打开术语词典复习。
      </motion.p>

      {/* Intro text */}
      <div className="max-w-2xl mx-auto space-y-4 my-12">
        <motion.p
          className="text-[#141413] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          不管是Claude还是GPT，它们的核心引擎都是Transformer。
        </motion.p>
        <motion.p
          className="text-[#141413] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          为了让你对整个架构有一个全景式的认识，我们用一栋大厦来比喻——
        </motion.p>
      </div>

      {/* Building Animation */}
      <div ref={buildingRef} className="max-w-4xl mx-auto my-16">
        <div ref={paperRef} className="relative bg-blue-50/50 border border-[#B1ADA1]/20 rounded-xl p-6 md:p-10">
          {/* Blueprint Grid */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(#6A9BCC 1px, transparent 1px), linear-gradient(90deg, #6A9BCC 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          {/* Building */}
          <div className="relative flex flex-col-reverse gap-1 max-w-md mx-auto">
            {floors.map((floor, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-md border-2 cursor-pointer transition-all"
                style={{
                  borderColor: hoveredFloor === idx ? '#D97757' : '#B1ADA1',
                  backgroundColor: hoveredFloor === idx ? 'rgba(217,119,87,0.1)' : 'rgba(255,255,255,0.5)',
                  height: floor.star ? 52 : 40,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={buildingInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ delay: 0.3 + idx * 0.25, duration: 0.4 }}
                onMouseEnter={() => setHoveredFloor(idx)}
                onMouseLeave={() => setHoveredFloor(null)}
              >
                <motion.div
                  className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs md:text-sm font-[Poppins] font-semibold"
                  style={{ color: floor.star ? '#D97757' : '#141413' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={buildingInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.25 }}
                >
                  {floor.label}
                  {floor.star && idx === 3 && (
                    <motion.span
                      className="ml-1 inline-block"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      ⭐
                    </motion.span>
                  )}
                </motion.div>

                {/* Windows */}
                <div className="flex gap-1.5 justify-center items-center h-full px-2">
                  {[...Array(Math.floor(3 + Math.random() * 3))].map((_, wi) => (
                    <div
                      key={wi}
                      className="w-3 h-3 md:w-4 md:h-4 rounded-sm transition-colors duration-300"
                      style={{
                        backgroundColor: hoveredFloor === idx ? '#fbbf24' : '#B1ADA1',
                        opacity: hoveredFloor === idx ? 0.8 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Roof */}
            <motion.div
              className="w-0 h-0 mx-auto"
              style={{
                borderLeft: '100px solid transparent',
                borderRight: '100px solid transparent',
                borderBottom: '40px solid #B1ADA1',
                opacity: 0.4,
              }}
              initial={{ opacity: 0 }}
              animate={buildingInView ? { opacity: 0.4 } : {}}
              transition={{ delay: 2.5 }}
            />
          </div>

          {/* Star annotation */}
          <motion.p
            className="text-center text-sm text-[#D97757] mt-6 font-[Poppins]"
            initial={{ opacity: 0 }}
            animate={buildingInView ? { opacity: 1 } : {}}
            transition={{ delay: 3 }}
          >
            ⭐ 自注意力是整栋楼最关键的部分——稍后重点讲！
          </motion.p>

          {/* Paper citation */}
          <div className="relative mt-4 text-right">
            <motion.button
              className="text-xs italic text-[#B1ADA1] hover:text-[#D97757] transition-colors cursor-pointer"
              initial={{ opacity: 0 }}
              animate={paperVisible ? { opacity: 1 } : {}}
              transition={{ delay: 3.5 }}
              onMouseEnter={() => setPaperTooltip(true)}
              onMouseLeave={() => setPaperTooltip(false)}
              onClick={() => setPaperTooltip(!paperTooltip)}
            >
              Attention is All You Need, 2017
            </motion.button>
            {paperTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 bg-[#141413] text-white text-xs p-3 rounded-lg w-72 text-left z-20"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                这是Google在2017年发表的论文标题，意思是"你只需要注意力（机制）就够了"。这篇论文彻底改变了AI领域的走向，是现代所有大语言模型的源头。截止2026年，它的引用次数已超过15万次。
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Two Buildings - Claude vs GPT */}
      <div className="max-w-4xl mx-auto my-16">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <motion.div
            className="flex-1 bg-[#6A9BCC]/5 border border-[#6A9BCC]/30 rounded-xl p-6 text-center"
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="mb-2">
              <LogoImage type="claude" size={40} />
            </div>
            <p className="font-[Poppins] font-semibold text-[#6A9BCC]">Claude Fable 5</p>
            <div className="mt-3 space-y-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 border border-dashed border-white/50 rounded bg-[#6A9BCC]/10" />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 bg-[#788C5D]/5 border border-[#788C5D]/30 rounded-xl p-6 text-center"
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="mb-2">
              <LogoImage type="gpt" size={40} />
            </div>
            <p className="font-[Poppins] font-semibold text-[#788C5D]">GPT-5.6 Sol</p>
            <div className="mt-3 space-y-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 border border-dashed border-white/50 rounded bg-[#788C5D]/10" />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-[#141413] mt-6 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          建筑方法一样（都是Transformer），但楼的大小、内部装修、训练方式各有不同。
        </motion.p>

        {/* "脱掉类比的真话" */}
        <motion.div
          className="max-w-2xl mx-auto mt-8 p-4 bg-[#FAF9F5] border-l-2 border-[#B1ADA1] rounded-r-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#141413] text-sm leading-relaxed">
            <span className="font-semibold">🎯 脱掉类比的真话：</span>用技术语言来说：Claude和GPT都基于Transformer架构，但它们的参数规模、训练数据、训练方法、微调策略各不相同。就像两个用同一本教材学习的学生，最终掌握的知识和能力会有差异。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
