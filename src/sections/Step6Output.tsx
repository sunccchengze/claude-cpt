import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';

const predictions = [
  {
    candidates: [
      { word: '真', pct: 32, color: '#D97757' },
      { word: '不', pct: 28, color: '#D97757CC' },
      { word: '很', pct: 25, color: '#D97757AA' },
      { word: '挺', pct: 8, color: '#D9775777' },
      { word: '太', pct: 5, color: '#D9775755' },
      { word: '其他', pct: 2, color: '#D9775733' },
    ],
    selected: '真',
  },
  {
    candidates: [
      { word: '好', pct: 45, color: '#D97757' },
      { word: '热', pct: 20, color: '#D97757CC' },
      { word: '冷', pct: 15, color: '#D97757AA' },
      { word: '不错', pct: 10, color: '#D9775777' },
      { word: '棒', pct: 6, color: '#D9775755' },
      { word: '其他', pct: 4, color: '#D9775733' },
    ],
    selected: '好',
  },
];

// "Be the AI" game data
const sentenceStarters = [
  { id: 0, text: '今天我想吃', label: '日常对话' },
  { id: 1, text: '从前有一个', label: '故事开头' },
  { id: 2, text: '学习最好的方法是', label: '知识分享' },
];

const gameRounds: Record<number, Array<Array<{ word: string; pct: number }>>> = {
  0: [
    [{ word: '火锅', pct: 35 }, { word: '汉堡', pct: 28 }, { word: '寿司', pct: 20 }, { word: '拖拉机', pct: 2 }],
    [{ word: '因为', pct: 40 }, { word: '但是', pct: 25 }, { word: '和', pct: 20 }, { word: '紫色', pct: 1 }],
    [{ word: '天气', pct: 32 }, { word: '心情', pct: 28 }, { word: '价格', pct: 25 }, { word: '键盘', pct: 2 }],
  ],
  1: [
    [{ word: '小孩', pct: 30 }, { word: '国王', pct: 28 }, { word: '老人', pct: 25 }, { word: '电脑', pct: 3 }],
    [{ word: '住在', pct: 38 }, { word: '喜欢', pct: 25 }, { word: '发现', pct: 22 }, { word: '二进制', pct: 1 }],
    [{ word: '森林', pct: 30 }, { word: '城堡', pct: 28 }, { word: '村庄', pct: 27 }, { word: '服务器', pct: 2 }],
  ],
  2: [
    [{ word: '多练习', pct: 35 }, { word: '理解', pct: 30 }, { word: '坚持', pct: 22 }, { word: '睡觉', pct: 3 }],
    [{ word: '并且', pct: 35 }, { word: '然后', pct: 28 }, { word: '因为', pct: 22 }, { word: '月亮', pct: 2 }],
    [{ word: '复习', pct: 32 }, { word: '思考', pct: 30 }, { word: '总结', pct: 25 }, { word: '跳舞', pct: 2 }],
  ],
};

export function Step6Output() {
  const ref = useRef<HTMLDivElement>(null);
  const predRef = useRef<HTMLDivElement>(null);
  const predInView = useInView(predRef, { once: true, amount: 0.3 });
  const [predStep, setPredStep] = useState(0);
  const [currentOutput, setCurrentOutput] = useState('');

  // Game state
  const [selectedStarter, setSelectedStarter] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [sentence, setSentence] = useState('');
  const [selections, setSelections] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (!predInView) return;
    const t1 = setTimeout(() => setPredStep(1), 500);
    const t2 = setTimeout(() => { setPredStep(2); setCurrentOutput('真'); }, 3500);
    const t3 = setTimeout(() => { setPredStep(3); setCurrentOutput('真好'); }, 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [predInView]);

  const handleStarterSelect = (id: number) => {
    setSelectedStarter(id);
    setSentence(sentenceStarters[id].text);
    setCurrentRound(0);
    setSelections([]);
    setGameComplete(false);
  };

  const handleWordSelect = (word: string, _pct: number) => {
    const newSentence = sentence + word;
    setSentence(newSentence);
    setSelections([...selections, word]);

    if (currentRound < 2) {
      setTimeout(() => setCurrentRound(r => r + 1), 800);
    } else {
      setTimeout(() => setGameComplete(true), 800);
    }
  };

  const resetGame = () => {
    setSelectedStarter(null);
    setCurrentRound(0);
    setSentence('');
    setSelections([]);
    setGameComplete(false);
  };

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center font-[Poppins] font-bold text-sm">6</div>
          <span className="font-[Poppins] font-semibold text-[#141413]">Step 6: 输出预测</span>
        </motion.div>

        <div className="space-y-4 my-8">
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            经过了80层的处理，信息从最底层的原始token向量，一层一层地变得越来越丰富、越来越抽象。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            现在到了最后一步——模型要给出答案了。但这个答案不是一整句话一次性蹦出来的。而是——
          </motion.p>
          <motion.p
            className="font-[Poppins] text-2xl md:text-3xl font-bold text-[#D97757] text-center my-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            一次只预测一个词。
          </motion.p>
        </div>

        <div id="term-next-token-prediction"><InlineTermCard id="next-token-prediction" showFull /></div>
      </div>

      {/* Slot machine prediction */}
      <div ref={predRef} className="max-w-2xl mx-auto my-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#141413] text-white px-4 py-2 font-[Poppins] text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D97757]" />
            <span>AI 对话</span>
          </div>

          <div className="p-4 md:p-6">
            <div className="flex justify-end mb-4">
              <div className="bg-[#6A9BCC]/10 rounded-2xl rounded-tr-none px-4 py-2 text-sm max-w-[70%]">
                今天天气
              </div>
            </div>

            <div className="flex justify-start mb-4">
              <div className="bg-[#F0EDE8] rounded-2xl rounded-tl-none px-4 py-2 text-sm min-w-[60px]">
                {currentOutput || <span className="animate-pulse">▌</span>}
                {predStep < 3 && currentOutput && <span className="animate-pulse">▌</span>}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {(predStep === 1 || predStep === 2) && (
                <motion.div
                  key={predStep}
                  className="bg-[#FAF9F5] rounded-xl p-4 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="text-xs text-[#B1ADA1] mb-3 font-[Poppins]">
                    {predStep === 1 ? '第1轮预测 — 候选token概率' : '第2轮预测 — 候选token概率'}
                  </p>
                  <div className="space-y-2">
                    {predictions[predStep - 1].candidates.map((c, i) => (
                      <motion.div key={i} className="flex items-center gap-2">
                        <span className="w-10 text-right text-sm font-[Poppins] font-semibold">{c.word}</span>
                        <div className="flex-1 bg-[#F0EDE8] rounded-full h-5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full flex items-center pl-2"
                            style={{ backgroundColor: c.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${c.pct}%` }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                          >
                            <span className="text-white text-[10px] font-mono">{c.pct}%</span>
                          </motion.div>
                        </div>
                        {i === 0 && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>✅</motion.span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {predStep === 3 && (
              <motion.div className="mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-center gap-2 text-sm font-mono flex-wrap">
                  <span className="px-2 py-1 bg-[#F0EDE8] rounded">今天天气</span>
                  <span className="text-[#D97757]">→</span>
                  <span className="px-2 py-1 bg-[#D97757]/10 rounded text-[#D97757] font-bold">真</span>
                  <span className="text-[#D97757]">→</span>
                  <span className="px-2 py-1 bg-[#F0EDE8] rounded">今天天气真</span>
                  <span className="text-[#D97757]">→</span>
                  <span className="px-2 py-1 bg-[#D97757]/10 rounded text-[#D97757] font-bold">好</span>
                  <span className="text-[#D97757]">→ ✅</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          className="bg-[#D97757]/10 border border-[#D97757]/30 rounded-xl p-4 md:p-6 text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#141413] leading-relaxed">
            本质上，AI在做的事情就是——<span className="font-semibold text-[#D97757]">基于前文，不断地预测"下一个词最可能是什么"</span>，一个词一个词地往外蹦，最终拼成一段话。
          </p>
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
          <span className="font-semibold text-[#141413]">🎯 脱掉类比的真话：</span>模型最后一层的输出向量经过一个"反嵌入"操作，得到每个token的分数（logits），然后通过softmax转换为概率分布。接下来的"采样"策略决定如何选择下一个token——可以总是选概率最高的（贪心采样），也可以引入一定的随机性，让输出更有创意和多样性。
        </p>
      </motion.div>

      {/* Interactive game: Be the AI */}
      <motion.div
        className="max-w-lg mx-auto my-16 bg-white rounded-xl p-6 shadow-md border border-[#B1ADA1]/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-[Poppins] font-semibold text-[#141413] mb-1">🎮 你来当一回AI</p>
        <p className="text-[#B1ADA1] text-sm mb-4">选择一个句子开头，然后像AI一样一个词一个词地预测！</p>

        {selectedStarter === null ? (
          // Starter selection
          <div className="space-y-2">
            {sentenceStarters.map((starter) => (
              <button
                key={starter.id}
                onClick={() => handleStarterSelect(starter.id)}
                className="w-full p-3 rounded-lg border border-[#B1ADA1]/30 hover:border-[#D97757] hover:bg-[#D97757]/5 text-left transition-all cursor-pointer"
              >
                <span className="font-mono text-sm">"{starter.text}..."</span>
                <span className="text-[#B1ADA1] text-xs ml-2">({starter.label})</span>
              </button>
            ))}
          </div>
        ) : gameComplete ? (
          // Game complete
          <div className="text-center">
            <div className="bg-[#D97757]/10 rounded-lg p-4 mb-4">
              <p className="font-mono text-lg text-[#D97757] font-semibold">{sentence}</p>
            </div>
            <p className="text-sm text-[#141413] mb-4">
              🎉 <span className="font-semibold">恭喜！</span>你刚刚手动模拟了一次大语言模型的推理过程。
            </p>
            <p className="text-xs text-[#B1ADA1] mb-4">就是这么简单——一个词接一个词。</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-[#D97757] text-white rounded-lg font-[Poppins] text-sm cursor-pointer hover:bg-[#c5664a] transition-colors"
            >
              再玩一次
            </button>
          </div>
        ) : (
          // Word prediction rounds
          <div>
            <div className="bg-[#F0EDE8] rounded-lg p-3 mb-4">
              <span className="font-mono text-sm">{sentence}</span>
              <span className="font-mono text-[#D97757] animate-pulse ml-1">___</span>
            </div>

            <p className="text-xs text-[#B1ADA1] mb-3">第 {currentRound + 1}/3 轮 — 选择下一个词：</p>

            <div className="space-y-2">
              {gameRounds[selectedStarter][currentRound].map((option, i) => (
                <motion.button
                  key={option.word}
                  onClick={() => handleWordSelect(option.word, option.pct)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg border border-[#B1ADA1]/20 hover:border-[#D97757] hover:bg-[#D97757]/5 transition-all cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="font-[Poppins] font-semibold text-sm w-16">{option.word}</span>
                  <div className="flex-1 h-4 bg-[#F0EDE8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D97757] rounded-full"
                      style={{ width: `${option.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#B1ADA1] w-10 text-right">{option.pct}%</span>
                </motion.button>
              ))}
            </div>

            <p className="text-[10px] text-[#B1ADA1] mt-3 text-center">
              提示：你选了概率第X高的词。AI可能也会做出同样的选择——或者不同的选择，取决于采样策略。
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
