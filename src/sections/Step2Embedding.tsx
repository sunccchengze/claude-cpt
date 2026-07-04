import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';
import { Quiz } from '../components/Quiz';

const tokens = ['今天', '天气', '真', '好'];
const vectors = [
  [0.12, -0.87, 0.43, 0.56],
  [0.78, 0.23, -0.44, 0.91],
  [-0.33, 0.67, 0.12, -0.55],
  [0.45, 0.89, -0.22, 0.34],
];

interface StarWord {
  word: string;
  x: number;
  y: number;
  related?: string[];
}

const starWords: StarWord[] = [
  { word: '今天', x: 45, y: 40 },
  { word: '天气', x: 55, y: 35 },
  { word: '真', x: 50, y: 55 },
  { word: '好', x: 60, y: 50 },
  { word: '开心', x: 25, y: 30 },
  { word: '快乐', x: 28, y: 25 },
  { word: '悲伤', x: 75, y: 75 },
  { word: '拖拉机', x: 80, y: 20 },
  { word: '猫', x: 15, y: 65 },
  { word: '狗', x: 18, y: 70 },
  { word: '太阳', x: 70, y: 45 },
  { word: '月亮', x: 72, y: 55 },
  { word: '北京', x: 35, y: 15 },
  { word: '首都', x: 38, y: 20 },
  { word: '中国', x: 32, y: 10 },
  { word: '巴黎', x: 65, y: 15 },
  { word: '法国', x: 68, y: 10 },
  { word: '明天', x: 42, y: 45 },
  { word: '温度', x: 58, y: 42 },
  { word: '非常', x: 52, y: 60 },
];

export function Step2Embedding() {
  const ref = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const flipInView = useInView(flipRef, { once: true, amount: 0.3 });
  const universeRef = useRef<HTMLDivElement>(null);
  const universeInView = useInView(universeRef, { once: true, amount: 0.3 });
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false]);
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(0); // 0=none, 1=similar, 2=distant, 3=analogy

  useEffect(() => {
    if (!flipInView) return;
    const timers = tokens.map((_, i) =>
      setTimeout(() => setFlippedCards(prev => { const n = [...prev]; n[i] = true; return n; }), 800 + i * 700)
    );
    return () => timers.forEach(clearTimeout);
  }, [flipInView]);

  useEffect(() => {
    if (!universeInView) return;
    const t1 = setTimeout(() => setShowDemo(1), 1500);
    const t2 = setTimeout(() => setShowDemo(2), 4000);
    const t3 = setTimeout(() => setShowDemo(3), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [universeInView]);



  return (
    <section ref={ref} className="py-16 px-4">
      {/* Step indicator */}
      <div className="max-w-2xl mx-auto mb-8">
        <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center font-[Poppins] font-bold text-sm">2</div>
          <span className="font-[Poppins] font-semibold text-[#141413]">Step 2: 嵌入</span>
        </motion.div>

        <div id="term-embedding"><InlineTermCard id="embedding" showFull /></div>
        <div id="term-vector"><InlineTermCard id="vector" showFull /></div>

        {/* Explanation */}
        <div className="space-y-4 my-8">
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            好了，我们现在有四个token了：[今天] [天气] [真] [好]。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            但问题是——<span className="font-semibold text-[#D97757]">计算机只认数字，不认文字。</span>
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            "今天"这两个字对计算机来说就是一个毫无意义的图案。计算机需要的是数字。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            所以，我们需要把每一个token翻译成一组数字——一个<InlineTermCard id="vector" />。这个翻译过程，就叫做<InlineTermCard id="embedding" />。
          </motion.p>
        </div>
      </div>

      {/* Card Flip Animation */}
      <div ref={flipRef} className="max-w-xl mx-auto my-12">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {tokens.map((tk, i) => (
            <motion.div
              key={i}
              className="w-[140px] md:w-[160px] h-[80px] md:h-[90px] relative"
              style={{ perspective: '600px' }}
              initial={{ opacity: 0 }}
              animate={flipInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.2 }}
            >
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flippedCards[i] ? 180 : 0 }}
                transition={{ duration: 0.6, delay: 0 }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 rounded-xl bg-[#D97757]/10 border-2 border-[#D97757]/30 flex items-center justify-center font-bold text-lg"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {tk}
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 rounded-xl bg-[#141413] text-[#D97757] flex flex-col items-center justify-center p-2"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="text-xs text-white/60 mb-1">"{tk}" →</span>
                  <span className="font-mono text-[10px] md:text-xs leading-tight text-center">
                    [{vectors[i].join(', ')}, ...]
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={flippedCards.every(Boolean) ? { opacity: 1 } : {}}
        >
          <p className="text-[#141413]">每个token现在变成了一个包含</p>
          <motion.span
            className="font-[Poppins] text-3xl font-bold text-[#D97757] inline-block my-1"
            initial={{ scale: 1 }}
            animate={flippedCards.every(Boolean) ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            768
          </motion.span>
          <p className="text-[#141413]">个数字的向量。</p>
          <p className="text-[#B1ADA1] text-xs mt-2">768只是一个例子。不同的模型使用不同的维度——小的模型可能用256维，大的模型可能用几千维甚至上万维。</p>
        </motion.div>
      </div>

      {/* Universe Scene */}
      <div ref={universeRef} className="my-16">
        <motion.div
          className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden"
          style={{ height: '500px', maxHeight: '70vh' }}
          initial={{ backgroundColor: '#FAF9F5' }}
          whileInView={{ backgroundColor: '#0B1120' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          {/* Star nebula bg */}
          <div className="absolute inset-0 opacity-20" style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(106,155,204,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(217,119,87,0.2) 0%, transparent 50%)',
          }} />

          {/* Stars */}
          {starWords.map((star, i) => {
            const isMain = ['今天', '天气', '真', '好'].includes(star.word);
            const isHighlighted =
              (showDemo === 1 && (star.word === '开心' || star.word === '快乐')) ||
              (showDemo === 2 && (star.word === '开心' || star.word === '拖拉机')) ||
              (showDemo === 3 && (star.word === '北京' || star.word === '首都' || star.word === '中国' || star.word === '巴黎' || star.word === '法国'));

            return (
              <motion.button
                key={star.word}
                className="absolute flex flex-col items-center cursor-pointer group z-10"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.05 }}
                onClick={() => setSelectedStar(selectedStar === star.word ? null : star.word)}
              >
                <motion.div
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                  style={{
                    backgroundColor: isMain ? '#D97757' : isHighlighted ? '#6A9BCC' : 'rgba(255,255,255,0.6)',
                    boxShadow: isMain ? '0 0 12px #D97757' : isHighlighted ? '0 0 10px #6A9BCC' : '0 0 4px rgba(255,255,255,0.3)',
                  }}
                  animate={isHighlighted ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ repeat: isHighlighted ? Infinity : 0, duration: 1.5 }}
                />
                <span className="text-white/70 text-[10px] md:text-xs mt-1 whitespace-nowrap group-hover:text-white transition-colors">
                  {star.word}
                </span>
              </motion.button>
            );
          })}

          {/* Connection lines for demos */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            {showDemo >= 1 && (() => {
              const w1 = starWords.find(s => s.word === '开心')!;
              const w2 = starWords.find(s => s.word === '快乐')!;
              return (
                <motion.line
                  x1={`${w1.x}%`} y1={`${w1.y}%`}
                  x2={`${w2.x}%`} y2={`${w2.y}%`}
                  stroke="#6A9BCC" strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: showDemo === 1 ? 1 : 0.3 }}
                  transition={{ duration: 0.8 }}
                />
              );
            })()}
            {showDemo >= 2 && (() => {
              const w1 = starWords.find(s => s.word === '开心')!;
              const w2 = starWords.find(s => s.word === '拖拉机')!;
              return (
                <motion.line
                  x1={`${w1.x}%`} y1={`${w1.y}%`}
                  x2={`${w2.x}%`} y2={`${w2.y}%`}
                  stroke="#B1ADA1" strokeWidth="1" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: showDemo === 2 ? 1 : 0.3 }}
                  transition={{ duration: 0.8 }}
                />
              );
            })()}
            {showDemo >= 3 && (() => {
              const bj = starWords.find(s => s.word === '北京')!;
              const cn = starWords.find(s => s.word === '中国')!;
              const pa = starWords.find(s => s.word === '巴黎')!;
              const fr = starWords.find(s => s.word === '法国')!;
              return (
                <>
                  <motion.line x1={`${bj.x}%`} y1={`${bj.y}%`} x2={`${cn.x}%`} y2={`${cn.y}%`} stroke="#D97757" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} markerEnd="url(#arrow)" />
                  <motion.line x1={`${pa.x}%`} y1={`${pa.y}%`} x2={`${fr.x}%`} y2={`${fr.y}%`} stroke="#D97757" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#D97757" />
                    </marker>
                  </defs>
                </>
              );
            })()}
          </svg>

          {/* Demo text overlays */}
          {showDemo === 1 && (
            <motion.div
              className="absolute bottom-4 left-4 right-4 bg-black/60 text-white text-xs md:text-sm p-3 rounded-lg z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-[#6A9BCC] font-semibold">语义距离：很近</span> — 在向量空间中，"开心"和"快乐"的坐标非常接近，因为它们意思相似。
            </motion.div>
          )}
          {showDemo === 2 && (
            <motion.div
              className="absolute bottom-4 left-4 right-4 bg-black/60 text-white text-xs md:text-sm p-3 rounded-lg z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-[#B1ADA1] font-semibold">语义距离：很远</span> — "开心"和"拖拉机"毫无语义关系，所以它们在向量空间中的坐标相距甚远。
            </motion.div>
          )}
          {showDemo === 3 && (
            <motion.div
              className="absolute bottom-4 left-4 right-4 bg-black/60 text-white text-xs md:text-sm p-3 rounded-lg z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-[#D97757] font-semibold">关系类比</span> — 更神奇的是——"北京→中国"这个箭头，和"巴黎→法国"这个箭头，方向和长度几乎一样！这意味着模型学到了"XX是XX的首都"这种抽象关系。这就是嵌入的力量。
            </motion.div>
          )}

          {/* Selected star info */}
          {selectedStar && (
            <motion.div
              className="absolute top-4 right-4 bg-black/70 text-white text-xs p-3 rounded-lg z-20 w-48"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="font-[Poppins] font-semibold text-[#D97757] mb-1">"{selectedStar}"</p>
              <p className="font-mono text-[10px] text-white/70">
                向量前5分量: [{Array.from({ length: 5 }, () => (Math.random() * 2 - 1).toFixed(2)).join(', ')}]
              </p>
            </motion.div>
          )}
        </motion.div>

        <p className="text-center text-[#B1ADA1] text-xs mt-3">点击任意星球查看其向量分量</p>
      </div>

      {/* Truth */}
      <motion.div
        className="max-w-2xl mx-auto my-8 p-4 bg-[#FAF9F5] border-l-2 border-[#B1ADA1] rounded-r-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-[#141413] text-sm leading-relaxed">
          <span className="font-semibold">🎯 脱掉类比的真话：</span>嵌入层（Embedding Layer）本质上是一个巨大的查找表。模型的词汇表中每一个token都对应一个固定长度的向量，这个向量的值是在训练过程中学习得到的。训练的过程会自动让语义相似的词获得相似的向量值。嵌入就像是AI的"词典"，只不过这个词典里每个词的解释不是文字，而是一串数字。
        </p>
      </motion.div>

      {/* Quiz */}
      <Quiz
        question="以下哪对词，在语义向量空间中距离最近？"
        options={['开心 / 拖拉机', '开心 / 快乐', '北京 / 香蕉', '飞机 / 方程式']}
        correctIndex={1}
        explanation="'开心'和'快乐'意思相似，所以在向量空间中它们的坐标非常接近。其他选项中的词对在语义上没有直接关联，距离会很远。"
      />
    </section>
  );
}
