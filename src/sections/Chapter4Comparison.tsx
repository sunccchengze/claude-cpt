import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';
import { LogoImage } from '../components/Navbar';
import { useStore } from '../store';

const benchmarks = [
  { name: 'Sol Ultra', score: 91.9, color: '#788C5D' },
  { name: 'Sol', score: 88.8, color: '#788C5D' },
  { name: 'Claude Mythos 5', score: 88.0, color: '#6A9BCC' },
  { name: 'Luna', score: 82.5, color: '#788C5D' },
  { name: 'Claude Opus 4.8', score: 78.9, color: '#6A9BCC' },
];

export function Chapter4Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const setCurrentChapter = useStore(s => s.setCurrentChapter);
  const benchRef = useRef<HTMLDivElement>(null);
  const benchInView = useInView(benchRef, { once: true, amount: 0.3 });
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([null, null, null]);

  useEffect(() => {
    if (isInView) setCurrentChapter(4);
  }, [isInView, setCurrentChapter]);

  const handleQuizAnswer = (qIdx: number, aIdx: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[qIdx] = aIdx;
    setQuizAnswers(newAnswers);
    if (qIdx < 2) {
      setTimeout(() => setQuizStep(qIdx + 1), 1500);
    }
  };

  return (
    <section id="chapter-4" ref={sectionRef} className="py-20 px-4">
      {/* Chapter Title */}
      <motion.div
        className="max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="bg-[#F0EDE8] border border-[#B1ADA1]/30 rounded-lg p-4 text-center">
          <h2 className="font-[Poppins] text-xl md:text-2xl font-bold text-[#141413]">
            第四章：Claude Fable 5 vs GPT-5.6 Sol——各自的独门绝技
          </h2>
        </div>
      </motion.div>

      {/* Side by side comparison */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
        {/* Claude Side */}
        <motion.div
          className="bg-[#6A9BCC]/5 border border-[#6A9BCC]/30 rounded-2xl p-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <LogoImage type="claude" size={80} />
            <div>
              <h3 className="font-[Poppins] text-xl font-bold text-[#6A9BCC]">Claude Fable 5</h3>
              <p className="text-[#B1ADA1] text-sm">Anthropic</p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="space-y-4">
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-[Poppins] font-semibold text-[#6A9BCC] text-sm mb-2">🗓️ 连续工作数天</p>
              <div id="term-agentic"><InlineTermCard id="agentic" showFull /></div>
              <p className="text-[#141413] text-xs mt-2 leading-relaxed">
                Fable 5可以在智能体框架中连续工作数天，完成大型编码项目。它会跨阶段规划，不是只执行一步就停。
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="font-[Poppins] font-semibold text-[#6A9BCC] text-sm mb-2">🔗 思维链推理</p>
              <div id="term-chain-of-thought"><InlineTermCard id="chain-of-thought" showFull /></div>
              <div className="flex items-center gap-1 mt-2 flex-wrap">
                {['理解问题', '分析条件', '尝试方法', '验证结果', '给出答案'].map((step, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 bg-[#6A9BCC]/10 rounded text-[10px] text-[#6A9BCC]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    {step} {i < 4 && '→'}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-[Poppins] font-semibold text-[#6A9BCC] text-sm mb-2">🛡️ 安全防护</p>
              <p className="text-[#141413] text-xs leading-relaxed">
                在某些高风险领域，Fable 5会自动将查询转交给更谨慎的Opus 4.8模型来回应。
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* GPT Side */}
        <motion.div
          className="bg-[#788C5D]/5 border border-[#788C5D]/30 rounded-2xl p-6"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <LogoImage type="gpt" size={80} />
            <div>
              <h3 className="font-[Poppins] text-xl font-bold text-[#788C5D]">GPT-5.6 Sol</h3>
              <p className="text-[#B1ADA1] text-sm">OpenAI</p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="space-y-4">
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-[Poppins] font-semibold text-[#788C5D] text-sm mb-2">🎛️ 推理力度旋钮</p>
              <div className="flex items-center gap-3 my-3">
                <span className="text-xs text-[#B1ADA1]">普通</span>
                <div className="flex-1 h-2 bg-gradient-to-r from-[#788C5D]/30 to-[#788C5D] rounded-full" />
                <span className="text-xs font-bold text-[#788C5D]">Max</span>
              </div>
              <p className="text-[#141413] text-xs leading-relaxed">
                GPT-5.6引入了"最大推理力度"模式，让Sol进行更深度、更长时间的推理。
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="font-[Poppins] font-semibold text-[#788C5D] text-sm mb-2">⚡ Ultra模式</p>
              <p className="text-[#141413] text-xs leading-relaxed">
                Ultra模式超越了单个智能体的能力范围，通过调用子智能体来分工加速。
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-[Poppins] font-semibold text-[#788C5D] text-sm mb-2">🌍 三个版本</p>
              <div className="flex items-end justify-center gap-3 my-3">
                {[
                  { name: 'Luna', size: 'text-lg', desc: '轻量' },
                  { name: 'Terra', size: 'text-2xl', desc: '均衡' },
                  { name: 'Sol', size: 'text-3xl', desc: '最强' },
                ].map((v, i) => (
                  <motion.div
                    key={v.name}
                    className="text-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, type: 'spring' }}
                  >
                    <span className={`${v.size} text-[#788C5D]`}>🌐</span>
                    <p className="text-[10px] font-[Poppins] font-semibold">{v.name}</p>
                    <p className="text-[8px] text-[#B1ADA1]">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Benchmark comparison */}
      <div ref={benchRef} className="max-w-3xl mx-auto mb-16">
        <div id="term-benchmark"><InlineTermCard id="benchmark" showFull /></div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-md mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="font-[Poppins] font-semibold text-[#141413] mb-4">TerminalBench 2.1 得分对比</h4>
          <div className="space-y-3">
            {benchmarks.map((b, i) => (
              <div key={b.name} className="flex items-center gap-3">
                <span className="w-32 text-sm font-[Poppins] text-right">{b.name}</span>
                <div className="flex-1 h-6 bg-[#F0EDE8] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ backgroundColor: b.color }}
                    initial={{ width: 0 }}
                    animate={benchInView ? { width: `${b.score}%` } : {}}
                    transition={{ delay: i * 0.15, duration: 0.8, ease: 'easeOut' }}
                  >
                    <span className="text-white text-xs font-mono">{b.score}%</span>
                  </motion.div>
                </div>
                {i === 0 && <span className="text-lg">🏆</span>}
              </div>
            ))}
          </div>

          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={benchInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs text-[#B1ADA1]">Sol 和 Claude Mythos 5 仅差 </span>
            <span className="text-[#D97757] font-bold">0.8%</span>
            <span className="text-xs text-[#B1ADA1]"> — 竞争非常激烈！</span>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-[#B1ADA1] text-sm text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          在顶尖模型之间，这样的差距已经是极其微小的了——就像百米赛跑里的0.01秒之差。不同的测试考察不同的能力，没有"绝对第一"。
        </motion.p>
      </div>

      {/* Quiz */}
      <div className="max-w-lg mx-auto">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-[Poppins] font-semibold text-[#141413] mb-4">🎯 你来当裁判</p>

          {quizStep >= 0 && (
            <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm text-[#141413] mb-2">1. 如果你要让AI帮你连续工作三天完成一个大型项目，你会选择哪个？</p>
              <div className="flex gap-2">
                {['Claude Fable 5', 'GPT-5.6 Sol Ultra'].map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => quizAnswers[0] === null && handleQuizAnswer(0, i)}
                    className={`flex-1 p-2 rounded-lg text-xs border transition-all cursor-pointer ${
                      quizAnswers[0] === i
                        ? 'bg-green-50 border-green-400'
                        : quizAnswers[0] !== null
                        ? 'opacity-50'
                        : 'hover:bg-[#FAF9F5] border-[#B1ADA1]/30'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[0] !== null && (
                <p className="text-xs text-green-600 mt-1">✅ 两个都可以！各有优势。</p>
              )}
            </motion.div>
          )}

          {quizStep >= 1 && (
            <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm text-[#141413] mb-2">2. TerminalBench 2.1上分数最高的是哪个版本？</p>
              <div className="flex gap-2 flex-wrap">
                {['Claude Mythos 5', 'GPT-5.6 Sol', 'GPT-5.6 Sol Ultra'].map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => quizAnswers[1] === null && handleQuizAnswer(1, i)}
                    className={`flex-1 min-w-[80px] p-2 rounded-lg text-xs border transition-all cursor-pointer ${
                      quizAnswers[1] === i
                        ? i === 2
                          ? 'bg-green-50 border-green-400'
                          : 'bg-red-50 border-[#C25B4A]'
                        : quizAnswers[1] !== null
                        ? 'opacity-50'
                        : 'hover:bg-[#FAF9F5] border-[#B1ADA1]/30'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[1] !== null && (
                <p className={`text-xs mt-1 ${quizAnswers[1] === 2 ? 'text-green-600' : 'text-[#C25B4A]'}`}>
                  {quizAnswers[1] === 2 ? '✅ 正确！Sol Ultra 91.9%' : '❌ Sol Ultra 91.9% 是最高的'}
                </p>
              )}
            </motion.div>
          )}

          {quizStep >= 2 && (
            <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm text-[#141413] mb-2">3. 思维链推理的代价是什么？</p>
              <div className="space-y-2">
                {['更慢、更贵', '更不准确', '没有代价'].map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => quizAnswers[2] === null && handleQuizAnswer(2, i)}
                    className={`w-full p-2 rounded-lg text-xs border text-left transition-all cursor-pointer ${
                      quizAnswers[2] === i
                        ? i === 0
                          ? 'bg-green-50 border-green-400'
                          : 'bg-red-50 border-[#C25B4A]'
                        : quizAnswers[2] !== null
                        ? 'opacity-50'
                        : 'hover:bg-[#FAF9F5] border-[#B1ADA1]/30'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[2] !== null && (
                <p className={`text-xs mt-1 ${quizAnswers[2] === 0 ? 'text-green-600' : 'text-[#C25B4A]'}`}>
                  {quizAnswers[2] === 0
                    ? '✅ 正确！思维链消耗更多token、响应更慢——但准确率更高。'
                    : '❌ 思维链让模型先想后答，更慢更贵，但更准确。'}
                </p>
              )}
            </motion.div>
          )}

          {quizAnswers.every(a => a !== null) && (
            <motion.p
              className="text-center text-[#D97757] text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              知识小测验完成 🎉 继续往下看！
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
