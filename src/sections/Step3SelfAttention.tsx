import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';
import { Quiz } from '../components/Quiz';

const attentionScores = [
  { word: '天气', score: 0.82, pct: '38%', color: '#D97757', width: '38%' },
  { word: '明天', score: 0.45, pct: '25%', color: '#6A9BCC', width: '25%' },
  { word: '真', score: 0.21, pct: '15%', color: '#B1ADA1', width: '15%' },
  { word: '好', score: 0.15, pct: '10%', color: '#B1ADA1', width: '10%' },
  { word: '温度', score: 0.12, pct: '8%', color: '#B1ADA1', width: '8%' },
  { word: '坏', score: 0.03, pct: '4%', color: '#B1ADA1', width: '4%' },
];

const detectives = [
  { emoji: '🔍', name: '语法侦探', desc: '关注主谓宾结构', connections: [['天气', '好']], color: '#6A9BCC' },
  { emoji: '🔍', name: '语义侦探', desc: '关注近义词和相关概念', connections: [['天气', '真'], ['真', '好']], color: '#788C5D' },
  { emoji: '🔍', name: '时间侦探', desc: '关注时间信息', connections: [['今天', '天气']], color: '#D97757' },
  { emoji: '🔍', name: '情感侦探', desc: '关注情感色彩', connections: [['好', '真']], color: '#C25B4A' },
  { emoji: '🔍', name: '位置侦探', desc: '关注词与词的前后关系', connections: [['今天', '天气'], ['天气', '真'], ['真', '好']], color: '#B1ADA1' },
  { emoji: '🔍', name: '隐藏侦探', desc: '关注人类叫不出名字的模式', connections: [['今天', '好'], ['天气', '真']], color: '#8B5CF6' },
];

export function Step3SelfAttention() {
  const ref = useRef<HTMLDivElement>(null);
  const pronRef = useRef<HTMLDivElement>(null);
  const pronInView = useInView(pronRef, { once: true, amount: 0.3 });
  const [pronStep, setPronStep] = useState(0);
  const qkvRef = useRef<HTMLDivElement>(null);
  const qkvInView = useInView(qkvRef, { once: true, amount: 0.3 });
  const [qkvStep, setQkvStep] = useState(0);
  const partyRef = useRef<HTMLDivElement>(null);
  const partyInView = useInView(partyRef, { once: true, amount: 0.2 });
  const [partyStep, setPartyStep] = useState(0);
  const [showDotProduct, setShowDotProduct] = useState(false);
  const [expandedDetective, setExpandedDetective] = useState<number | null>(null);

  useEffect(() => {
    if (!pronInView) return;
    const t1 = setTimeout(() => setPronStep(1), 800);
    const t2 = setTimeout(() => setPronStep(2), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pronInView]);

  useEffect(() => {
    if (!qkvInView) return;
    const t1 = setTimeout(() => setQkvStep(1), 500);
    const t2 = setTimeout(() => setQkvStep(2), 1500);
    const t3 = setTimeout(() => setQkvStep(3), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [qkvInView]);

  useEffect(() => {
    if (!partyInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPartyStep(1), 800));
    timers.push(setTimeout(() => setPartyStep(2), 2500));
    timers.push(setTimeout(() => setPartyStep(3), 5000));
    timers.push(setTimeout(() => setPartyStep(4), 7500));
    timers.push(setTimeout(() => setPartyStep(5), 10000));
    return () => timers.forEach(clearTimeout);
  }, [partyInView]);

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center font-[Poppins] font-bold text-sm">3</div>
          <span className="font-[Poppins] font-semibold text-[#141413]">Step 3 ★ 核心：自注意力</span>
        </motion.div>

        <div id="term-self-attention"><InlineTermCard id="self-attention" showFull /></div>

        <motion.div
          className="text-center my-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-[Poppins] text-lg md:text-xl font-semibold text-[#141413]">
            如果整个Transformer架构只让你记住一个概念，就记住这个。
          </p>
          <motion.div
            className="h-0.5 bg-[#D97757] mx-auto mt-2"
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.div>
      </div>

      {/* Sub A: Intuition */}
      <div className="max-w-2xl mx-auto my-12">
        <motion.p className="text-[#141413] leading-relaxed mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          在讲技术细节之前，我们先用一个例子来感受一下自注意力到底在做什么。
        </motion.p>

        {/* Pronoun resolution */}
        <div ref={pronRef} className="bg-white rounded-xl p-6 shadow-md border border-[#B1ADA1]/20 my-8">
          <p className="font-[Poppins] font-semibold text-[#141413] mb-4">看这句话——</p>
          <div className="flex flex-wrap gap-1 text-lg leading-loose mb-6">
            {['小明', '把', '书', '还给了', '他₁', '，因为', '他₂', '之前', '借了', '。'].map((word, i) => {
              const isPron1 = word === '他₁';
              const isPron2 = word === '他₂';
              const highlight1 = pronStep === 1 && isPron1;
              const highlight2 = pronStep === 2 && isPron2;
              return (
                <motion.span
                  key={i}
                  className="px-1 rounded"
                  animate={{
                    backgroundColor: (highlight1 || highlight2) ? 'rgba(217,119,87,0.2)' : 'transparent',
                    color: (highlight1 || highlight2) ? '#D97757' : '#141413',
                    scale: (highlight1 || highlight2) ? 1.15 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {word.replace('₁', '').replace('₂', '')}
                </motion.span>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {pronStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-[#D97757]/5 rounded-lg p-3 text-sm">
                <p>💭 第一个<span className="text-[#D97757] font-semibold">"他"</span>在想："我指的是谁？"</p>
                <p className="mt-2">→ 结合上下文，这个"他"指的是<span className="font-semibold">书的原主人</span>（不是小明）</p>
                <p className="text-[#D97757] mt-1">✅ 自注意力帮助模型从上下文中推断出正确的指代。</p>
              </motion.div>
            )}
            {pronStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-[#D97757]/5 rounded-lg p-3 text-sm">
                <p>💭 第二个<span className="text-[#D97757] font-semibold">"他"</span>在想："我指的是谁？"</p>
                <p className="mt-2">→ 这个"他"指的是<span className="font-semibold">小明</span>（因为是小明之前借了书）</p>
                <p className="text-[#D97757] mt-1">✅ 同一个字"他"，在不同位置有不同含义。注意力机制能区分这一点。</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p className="text-[#141413] leading-relaxed my-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          人类是怎么判断"他"指谁的？靠的是对上下文的理解——你读了整句话，结合常识，就知道了。AI模型靠的就是<InlineTermCard id="self-attention" />——它让每个词去检查句子里的所有其他词，计算出"谁和我关系最大"，然后根据这些关系来理解这个词在当前语境下的真正含义。
        </motion.p>
      </div>

      {/* Sub B: QKV */}
      <div className="max-w-2xl mx-auto my-12">
        <motion.p className="text-[#141413] leading-relaxed mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          好，现在你知道了自注意力在做什么——让每个词去找跟自己最相关的词。
        </motion.p>
        <motion.p className="text-[#141413] leading-relaxed mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          但具体怎么做到的呢？答案是——每个token会被变换成三个向量，分别叫做 <span className="font-[Poppins] font-bold text-[#D97757]">Q</span>、<span className="font-[Poppins] font-bold text-[#D97757]">K</span>、<span className="font-[Poppins] font-bold text-[#D97757]">V</span>。
        </motion.p>

        {/* QKV Trifold */}
        <div ref={qkvRef} className="my-8 space-y-3">
          {[
            { id: 'query', show: qkvStep >= 1 },
            { id: 'key', show: qkvStep >= 2 },
            { id: 'value', show: qkvStep >= 3 },
          ].map(({ id, show }) => (
            <div key={id} id={`term-${id}`}>
              {show && <InlineTermCard id={id} showFull />}
            </div>
          ))}
        </div>

        <motion.div
          className="bg-[#D97757]/10 border border-[#D97757]/30 rounded-xl p-4 text-center my-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-[Poppins] font-bold text-[#141413]">
            <span className="text-[#6A9BCC]">Q</span>问问题，
            <span className="text-[#788C5D]">K</span>亮名牌，
            <span className="text-[#D97757]">V</span>给答案。
          </p>
          <p className="text-sm text-[#141413] mt-1">
            自注意力就是用Q去和所有人的K对比，找到最匹配的，然后取走对方的V。
          </p>
        </motion.div>
      </div>

      {/* Party Scene */}
      <div ref={partyRef} className="max-w-3xl mx-auto my-16">
        <motion.div
          className="relative rounded-2xl overflow-hidden p-6 md:p-8"
          style={{ minHeight: '400px', backgroundColor: '#FDF8F4' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-[Poppins] font-semibold text-[#141413] text-center mb-6">🍸 鸡尾酒派对 — 注意力演示</p>

          {/* People */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {['今天', '天气', '真', '好', '明天', '温度', '坏'].map((word) => {
              const isMain = word === '今天';
              const isTarget = word === '天气' && partyStep >= 5;
              return (
                <motion.div
                  key={word}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.random() * 0.5 }}
                >
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      backgroundColor: isMain ? '#D97757' : isTarget ? '#6A9BCC' : '#B1ADA1',
                      boxShadow: isMain ? '0 0 12px rgba(217,119,87,0.4)' : 'none',
                    }}
                  >
                    {word[0]}
                  </div>
                  <span className="text-xs mt-1 font-[Poppins]">{word}</span>
                  {isMain && partyStep >= 1 && (
                    <motion.span
                      className="bg-[#6A9BCC] text-white text-[10px] px-1.5 py-0.5 rounded-full mt-1 font-[Poppins] font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >Q</motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Party steps */}
          <div className="space-y-4 text-sm">
            {partyStep >= 1 && (
              <motion.div className="bg-white/80 rounded-lg p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="font-[Poppins] font-semibold text-[#6A9BCC]">第1幕：</span> "今天"带着Q（查询）标志，想知道"今天具体怎样？"
              </motion.div>
            )}
            {partyStep >= 2 && (
              <motion.div className="bg-white/80 rounded-lg p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="font-[Poppins] font-semibold text-[#788C5D]">第2幕：</span> "今天"扫视所有人的名牌（K）—— "天气"的名牌是"天气/气候信息" 🟢匹配度高
              </motion.div>
            )}
            {partyStep >= 3 && (
              <motion.div className="bg-white/80 rounded-lg p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="font-[Poppins] font-semibold text-[#D97757]">第3幕：</span> 计算相关度分数（Q·K 点积）：
                <div className="mt-2 space-y-1">
                  {attentionScores.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-12 text-right font-[Poppins] text-xs">{s.word}</span>
                      <motion.div
                        className="h-4 rounded-full"
                        style={{ backgroundColor: s.color }}
                        initial={{ width: 0 }}
                        animate={{ width: s.width }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      />
                      <span className="text-[#B1ADA1] text-xs font-mono">{s.score}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="text-[#D97757] text-xs mt-2 underline cursor-pointer"
                  onClick={() => setShowDotProduct(!showDotProduct)}
                >
                  {showDotProduct ? '收起' : '什么是点积？点击了解 →'}
                </button>
                {showDotProduct && (
                  <motion.div className="bg-[#FAF9F5] p-2 rounded mt-2 text-xs font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p>比如 Q=[1, 0, 1] 和 K=[1, 1, 0] 的点积</p>
                    <p>= 1×1 + 0×1 + 1×0 = <span className="text-[#D97757]">1</span></p>
                    <p className="mt-1">Q=[1, 0, 1] 和 K=[1, 0, 1] 的点积</p>
                    <p>= 1×1 + 0×0 + 1×1 = <span className="text-[#D97757]">2</span> ← 更大，更匹配！</p>
                  </motion.div>
                )}
              </motion.div>
            )}
            {partyStep >= 4 && (
              <motion.div className="bg-white/80 rounded-lg p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="font-[Poppins] font-semibold text-[#8B5CF6]">第4幕：Softmax</span> — 把分数变成百分比
                <div id="term-softmax" className="my-2"><InlineTermCard id="softmax" showFull /></div>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {attentionScores.map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-[#B1ADA1]">{s.score}</div>
                      <div className="text-[#D97757]">↓</div>
                      <div className="text-xs font-semibold">{s.pct}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[#B1ADA1] text-xs mt-2">现在所有分数加起来 = 100%</p>
              </motion.div>
            )}
            {partyStep >= 5 && (
              <motion.div className="bg-white/80 rounded-lg p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="font-[Poppins] font-semibold text-[#D97757]">第5幕：V传递</span> — "今天"从"天气"获取了最多信息（38%），也从其他词获取了少量信息。
                <p className="mt-2 text-[#141413]">经过这一步，"今天"不再只是一个孤立的时间词——它现在携带了关于"天气"的语境信息。</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Summary flow */}
      <div className="max-w-lg mx-auto my-12">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-md border border-[#B1ADA1]/20 space-y-2 text-sm font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-[Poppins] font-semibold text-[#141413] mb-3 text-base">自注意力完整流程</p>
          {[
            '每个token的嵌入向量',
            '  ↓ 变换为',
            'Q（查询）+ K（键）+ V（值）',
            '  ↓',
            'Q 和所有 K 做点积 → 相关度分数',
            '  ↓ Softmax',
            '转换为注意力权重（百分比）',
            '  ↓',
            '用权重加权求和所有 V',
            '  ↓',
            '输出：携带了上下文信息的新表示',
          ].map((line, i) => (
            <motion.p
              key={i}
              className={line.includes('↓') ? 'text-[#D97757]' : 'text-[#141413]'}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Truth */}
      <motion.div
        className="max-w-2xl mx-auto my-8 p-4 bg-[#FAF9F5] border-l-2 border-[#B1ADA1] rounded-r-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-[#B1ADA1] text-sm leading-relaxed">
          <span className="font-semibold text-[#141413]">🎯 脱掉类比的真话：</span> 自注意力计算的公式是 <span className="font-mono text-xs">Attention(Q,K,V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) × V</span>。其中QK<sup>T</sup>是查询向量和键向量的点积矩阵，除以√d<sub>k</sub>是为了防止点积值过大，softmax将分数转换为概率分布，最后用这个概率分布对V做加权求和。你不需要记住这个公式——但知道它存在可以帮助你理解，这一切不是魔法，而是严格的数学运算。
        </p>
      </motion.div>

      {/* Sub C: Multi-Head */}
      <div className="max-w-2xl mx-auto my-16">
        <div className="space-y-4 mb-8">
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            现在你已经明白了一个注意力计算的完整过程。但这里有一个问题——一个注意力头只能关注一种关系。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            但语言是多维度的！同一句话可以从语法、语义、情感、时间、逻辑等很多角度来理解。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            所以，Transformer同时运行很多个注意力头，每个头从不同角度分析同一句话——最后把所有角度的分析结果汇总起来。
          </motion.p>
        </div>

        <div id="term-multi-head-attention"><InlineTermCard id="multi-head-attention" showFull /></div>
      </div>

      {/* Detective boards */}
      <div className="max-w-4xl mx-auto my-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {detectives.map((det, i) => (
            <motion.button
              key={i}
              className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-[#B1ADA1]/20 text-left cursor-pointer hover:shadow-md transition-shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setExpandedDetective(expandedDetective === i ? null : i)}
            >
              <p className="text-lg mb-1">{det.emoji}</p>
              <p className="font-[Poppins] font-semibold text-sm" style={{ color: det.color }}>{det.name}</p>
              <p className="text-[#B1ADA1] text-xs">{det.desc}</p>

              {/* Mini connection visualization */}
              <div className="mt-2 flex flex-wrap gap-1">
                {['今天', '天气', '真', '好'].map(w => (
                  <span
                    key={w}
                    className="text-[10px] px-1 py-0.5 rounded"
                    style={{
                      backgroundColor: det.connections.some(c => c.includes(w)) ? `${det.color}20` : '#F0EDE8',
                      color: det.connections.some(c => c.includes(w)) ? det.color : '#B1ADA1',
                      fontWeight: det.connections.some(c => c.includes(w)) ? 'bold' : 'normal',
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Expanded detective */}
        <AnimatePresence>
          {expandedDetective !== null && (
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border-2 mt-4"
              style={{ borderColor: detectives[expandedDetective].color }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="font-[Poppins] font-semibold" style={{ color: detectives[expandedDetective].color }}>
                {detectives[expandedDetective].emoji} {detectives[expandedDetective].name}
              </p>
              <p className="text-sm mt-2">关注重点：{detectives[expandedDetective].desc}</p>
              <div className="mt-3 flex gap-2 items-center">
                {detectives[expandedDetective].connections.map((conn, ci) => (
                  <span key={ci} className="text-sm">
                    <span className="font-semibold" style={{ color: detectives[expandedDetective].color }}>{conn[0]}</span>
                    <span className="text-[#B1ADA1] mx-1">↔</span>
                    <span className="font-semibold" style={{ color: detectives[expandedDetective].color }}>{conn[1]}</span>
                    {ci < detectives[expandedDetective].connections.length - 1 && <span className="text-[#B1ADA1] mx-2">|</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p className="text-center text-[#141413] mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          六个侦探各自发现了不同的线索。汇总在一起——这就是多头注意力的输出。
          在实际的大模型中，注意力头的数量可以达到 <span className="font-[Poppins] text-2xl font-bold text-[#D97757]">128</span> 个。
        </motion.p>
      </div>

      {/* Quiz */}
      <Quiz
        question='在QKV机制中，"Q"代表什么？'
        options={['我能提供什么信息', '我实际要传递的内容', '我在找什么信息', '我和其他词的距离']}
        correctIndex={2}
        explanation="Q代表Query（查询），它表示当前这个词正在寻找什么样的信息。K是名牌（能提供什么），V是实际传递的内容。"
      />
    </section>
  );
}
