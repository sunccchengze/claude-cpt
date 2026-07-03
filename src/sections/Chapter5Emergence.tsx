import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';
import { Quiz } from '../components/Quiz';
import { useStore } from '../store';

const formulaLines = [
  { text: '超大规模参数（数千亿甚至万亿个数字）', note: '参数就是模型权重——决定了模型的全部能力' },
  { text: '超大规模数据（数万亿token的训练语料）', note: '书籍、网页、代码、论文……' },
  { text: 'Transformer架构（自注意力机制理解上下文）', note: '第一、二章详细讲的那套机制' },
  { text: '思维链推理（一步一步思考的能力）', note: null },
  { text: '三阶段训练（预训练 + 指令微调 + RLHF）', note: null },
  { text: '智能体能力（调用工具、拆分任务、自我检查）', note: null },
];

const scaleMarkers = [
  { val: '1,000', label: '一千', desc: '一排小豆子🫘' },
  { val: '1,000,000', label: '一百万', desc: '中国人口的1/1400' },
  { val: '1,000,000,000', label: '十亿', desc: '全球人口的⅛' },
  { val: '100,000,000,000', label: '一千亿', desc: '大模型参数量级 ← 每秒数一个要数3,170年' },
];

export function Chapter5Emergence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const setCurrentChapter = useStore(s => s.setCurrentChapter);

  // Formula animation
  const formulaRef = useRef<HTMLDivElement>(null);
  const formulaInView = useInView(formulaRef, { once: true, amount: 0.3 });
  const [formulaStep, setFormulaStep] = useState(-1);
  const [showResult, setShowResult] = useState(false);

  // Ants animation
  const antsRef = useRef<HTMLDivElement>(null);
  const antsInView = useInView(antsRef, { once: true, amount: 0.3 });
  const [antCount, setAntCount] = useState(1);
  const [antsPhase, setAntsPhase] = useState(0);

  useEffect(() => {
    if (isInView) setCurrentChapter(5);
  }, [isInView, setCurrentChapter]);

  useEffect(() => {
    if (!formulaInView) return;
    const interval = setInterval(() => {
      setFormulaStep(s => {
        if (s >= formulaLines.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowResult(true), 1500);
          return s;
        }
        return s + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [formulaInView]);

  useEffect(() => {
    if (!antsInView) return;
    // Phase 1: Single ant
    setTimeout(() => setAntsPhase(1), 500);
    // Phase 2: Multiple ants
    setTimeout(() => {
      setAntsPhase(2);
      const interval = setInterval(() => {
        setAntCount(c => {
          if (c >= 150) {
            clearInterval(interval);
            setTimeout(() => setAntsPhase(3), 1000);
            return c;
          }
          return Math.min(c + Math.ceil(c * 0.3), 150);
        });
      }, 300);
    }, 2000);
  }, [antsInView]);

  const generateAnts = useCallback((count: number) => {
    const ants = [];
    for (let i = 0; i < Math.min(count, 80); i++) {
      const organized = antsPhase >= 3 && count >= 100;
      // Create organized "highways" when emerged
      let x, y;
      if (organized && Math.random() > 0.3) {
        // Follow one of several "highways"
        const highway = Math.floor(Math.random() * 4);
        const progress = Math.random();
        if (highway === 0) { x = 50 + progress * 40; y = 50 - progress * 40; }
        else if (highway === 1) { x = 50 - progress * 40; y = 50 - progress * 40; }
        else if (highway === 2) { x = 50 + progress * 40; y = 50 + progress * 40; }
        else { x = 50 - progress * 40; y = 50 + progress * 40; }
        x += (Math.random() - 0.5) * 10;
        y += (Math.random() - 0.5) * 10;
      } else {
        x = 10 + Math.random() * 80;
        y = 10 + Math.random() * 80;
      }
      ants.push({ id: i, x, y });
    }
    return ants;
  }, [antsPhase]);

  return (
    <section id="chapter-5" ref={sectionRef} className="py-20 px-4">
      {/* Cosmic intro */}
      <motion.div
        className="min-h-[30vh] flex items-center justify-center relative overflow-hidden rounded-2xl mb-8 mx-auto max-w-4xl"
        initial={{ backgroundColor: '#0B1120' }}
        whileInView={{ backgroundColor: '#FAF9F5' }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(217,119,87,0.3) 0%, transparent 70%)',
          }}
        />
        <motion.h2
          className="font-[Poppins] text-xl md:text-3xl font-bold text-center px-4 relative z-10"
          initial={{ color: '#ffffff' }}
          whileInView={{ color: '#141413' }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          第五章：涌现的奇迹——为什么加在一起就这么强？
        </motion.h2>
      </motion.div>

      {/* Emergence term card - special treatment */}
      <div className="max-w-2xl mx-auto mb-12">
        <motion.div
          className="bg-[#141413] rounded-xl p-6 text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="font-[Poppins] text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Emergence
          </motion.p>
          <motion.p
            className="text-[#D97757] text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            涌现
          </motion.p>
        </motion.div>

        <div id="term-emergence"><InlineTermCard id="emergence" showFull /></div>

        <motion.p
          className="text-center text-[#D97757] text-sm mt-4 font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          理解涌现，就理解了AI为什么"突然"变得这么聪明。
        </motion.p>
      </div>

      {/* Formula stacking */}
      <div ref={formulaRef} className="max-w-2xl mx-auto mb-16">
        <motion.p
          className="text-[#141413] text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          把前面所有章节学过的东西叠加在一起——
        </motion.p>

        <div className="space-y-2">
          {formulaLines.map((line, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              initial={{ x: 100, opacity: 0 }}
              animate={formulaStep >= i ? { x: 0, opacity: 1 } : {}}
              transition={{ type: 'spring', damping: 20 }}
            >
              {i > 0 && (
                <span className="text-[#D97757] font-bold text-lg w-6 text-center">×</span>
              )}
              <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-[#B1ADA1]/20">
                <p className="text-[#141413] text-sm font-mono">{line.text}</p>
                {line.note && (
                  <p className="text-[#B1ADA1] text-xs mt-1">{line.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result */}
        {showResult && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className="h-1 bg-[#D97757] rounded mb-4" />
            <motion.div
              className="text-2xl md:text-3xl font-[Poppins] font-bold"
              initial={{ color: '#B1ADA1' }}
              animate={{ color: '#D97757' }}
              transition={{ duration: 1 }}
            >
              🧠 涌现出"类似智能"的行为！
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Ant emergence animation */}
      <div ref={antsRef} className="max-w-3xl mx-auto mb-16">
        <motion.div
          className="bg-amber-100/50 rounded-xl p-2 text-xs text-[#B1ADA1] mb-2 inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          以下是关于"涌现"的最好比喻。请专心看——
        </motion.div>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            height: '350px',
            background: 'linear-gradient(to bottom, #8B7355, #6B5344)',
          }}
        >
          {/* Ant nest (appears in phase 3) */}
          {antsPhase >= 3 && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#3D2817]"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: 60, height: 60, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ backgroundColor: '#2D1F14' }}
            />
          )}

          {/* Highway lines (phase 3) */}
          {antsPhase >= 3 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[
                'M50%,50% L90%,10%',
                'M50%,50% L10%,10%',
                'M50%,50% L90%,90%',
                'M50%,50% L10%,90%',
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d.replace(/%/g, '%')}
                  stroke="rgba(217,119,87,0.3)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </svg>
          )}

          {/* Ants */}
          {generateAnts(antCount).map((ant) => (
            <motion.div
              key={ant.id}
              className="absolute w-2 h-2 rounded-full bg-[#1a1a1a]"
              style={{ left: `${ant.x}%`, top: `${ant.y}%` }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                x: antsPhase < 3 ? [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0] : 0,
                y: antsPhase < 3 ? [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.3 },
                x: { repeat: Infinity, duration: 2 + Math.random(), ease: 'linear' },
                y: { repeat: Infinity, duration: 2 + Math.random(), ease: 'linear' },
              }}
            />
          ))}

          {/* Counter */}
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
            🐜 {antCount} 只蚂蚁
          </div>

          {/* Phase descriptions */}
          <motion.div
            className="absolute bottom-3 left-3 right-3 bg-black/60 text-white text-xs p-2 rounded"
            key={antsPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {antsPhase === 1 && '一只蚂蚁——随机游走，完全没有"规划"能力。'}
            {antsPhase === 2 && antCount < 50 && `${antCount}只蚂蚁——还是看不出什么规律。`}
            {antsPhase === 2 && antCount >= 50 && antCount < 100 && '数量增加中……'}
            {antsPhase === 2 && antCount >= 100 && '正在接近临界点……'}
            {antsPhase >= 3 && (
              <>
                <span className="text-[#D97757] font-semibold">150只蚂蚁——突然出现了组织！</span>
                <span> 它们自发形成了运输线路，开始协作建巢。</span>
                <span className="text-[#D97757]">没有任何一只蚂蚁"发号施令"。</span>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Emergence explanation */}
      <div className="max-w-2xl mx-auto space-y-4 mb-16">
        {[
          '每一只蚂蚁都只遵循简单的规则——闻气味、跟着其他蚂蚁走、搬起能搬动的东西。',
          '没有蚂蚁知道整个蚁巢的设计图。',
          '但成千上万只蚂蚁按照这些简单规则协作——就涌现出了令人惊叹的复杂结构。',
        ].map((text, i) => (
          <motion.p
            key={i}
            className="text-[#141413] leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3 }}
          >
            {text}
          </motion.p>
        ))}

        <motion.div
          className="bg-[#D97757]/10 border border-[#D97757]/30 rounded-xl p-4 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#141413] mb-2">大语言模型也是一样——</p>
          <p className="text-[#141413] text-sm">
            每一个神经元（每一个参数）都只做一件极其简单的数学运算：把输入的数字加权求和，通过一个激活函数。没有任何一个参数"知道"什么是语言、什么是推理。
          </p>
          <p className="text-[#141413] text-sm mt-2">但当数千亿个参数按照训练好的权重协作运算——</p>
          <p className="text-[#D97757] font-bold text-center mt-3">
            就涌现出了推理、创作、编程、理解甚至"智慧"的能力。
          </p>
        </motion.div>
      </div>

      {/* Scale visualization */}
      <div className="max-w-3xl mx-auto mb-16">
        <motion.p
          className="text-[#141413] text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          我们一直说"数千亿个参数"——但这到底有多大？
        </motion.p>

        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-[#B1ADA1]/30 via-[#D97757]/50 to-[#D97757] rounded-full mb-8" />
          <div className="flex justify-between">
            {scaleMarkers.map((marker, i) => (
              <motion.div
                key={i}
                className="text-center flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-[#D97757] mx-auto -mt-5 mb-2" />
                <p className="font-mono text-xs text-[#D97757] font-bold">{marker.val}</p>
                <p className="text-[10px] text-[#141413]">{marker.label}</p>
                <p className="text-[8px] text-[#B1ADA1] mt-1">{marker.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          className="text-center text-[#141413] text-sm mt-8 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          一千亿个参数，被数万亿个token的文字反复调整——<br/>
          这种规模的信息处理，在人类历史上从未发生过。<br/>
          <span className="text-[#D97757] font-semibold">它涌现出类似智能的行为，并不是"神迹"——它是必然的结果。</span>
        </motion.p>
      </div>

      {/* Quiz */}
      <Quiz
        question="以下哪个例子最能说明'涌现'的概念？"
        options={['一台电脑变得更快了', '一只蚂蚁找到了食物', '成千上万只蚂蚁自发形成了复杂的蚁巢', 'AI被更新了一个版本']}
        correctIndex={2}
        explanation="涌现是指大量简单个体按简单规则相互作用，产生单个个体不具备的复杂能力。成千上万只蚂蚁自发形成蚁巢，没有任何一只蚂蚁知道整体设计——这就是典型的涌现现象。"
      />
    </section>
  );
}
