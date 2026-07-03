import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';

const tokens = ['今天', '天气', '真', '好'];

function simpleTokenize(text: string): string[] {
  if (!text.trim()) return [];
  const result: string[] = [];
  // Simple Chinese: greedily match common 2-char words, else single chars
  const commonWords = ['今天','天气','明天','昨天','你好','我们','他们','她们','大家','什么','怎么','这个','那个',
    '因为','所以','但是','而且','不过','可以','应该','非常','特别','已经','正在','学习','工作',
    '学生','老师','朋友','美丽','漂亮','高兴','开心','快乐','难过','伤心','世界','中国','北京',
    '上海','人工','智能','模型','语言','自然','机器','计算','数据','算法','网络','深度'];
  let i = 0;
  while (i < text.length) {
    // Try English word
    if (/[a-zA-Z]/.test(text[i])) {
      let word = '';
      while (i < text.length && /[a-zA-Z']/.test(text[i])) {
        word += text[i]; i++;
      }
      result.push(word);
      continue;
    }
    // Try space/punctuation
    if (/[\s,.!?;:，。！？；：、]/.test(text[i])) {
      i++; continue;
    }
    // Try common 2-char word
    if (i + 1 < text.length && commonWords.includes(text.slice(i, i + 2))) {
      result.push(text.slice(i, i + 2));
      i += 2; continue;
    }
    // Single char
    result.push(text[i]);
    i++;
  }
  return result;
}

export function Step1Tokenization() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [cutPhase, setCutPhase] = useState(0);
  const [knifePos, setKnifePos] = useState(-1);
  const [userInput, setUserInput] = useState('');
  const [userTokens, setUserTokens] = useState<string[] | null>(null);
  const [counterVal, setCounterVal] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterInView = useInView(counterRef, { once: true, amount: 0.5 });

  // Animate cutting
  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => { setKnifePos(0); setCutPhase(1); }, 500));
    timers.push(setTimeout(() => { setKnifePos(1); setCutPhase(2); }, 1300));
    timers.push(setTimeout(() => { setKnifePos(2); setCutPhase(3); }, 2100));
    timers.push(setTimeout(() => { setKnifePos(-1); setCutPhase(4); }, 2900));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  // Counter animation
  useEffect(() => {
    if (!counterInView) return;
    let val = 0;
    const interval = setInterval(() => {
      val += 1237;
      if (val >= 100000) {
        val = 100000;
        clearInterval(interval);
      }
      setCounterVal(val);
    }, 20);
    return () => clearInterval(interval);
  }, [counterInView]);

  const handleTokenize = useCallback(() => {
    if (userInput.trim()) {
      setUserTokens(simpleTokenize(userInput));
    }
  }, [userInput]);

  return (
    <section ref={ref} className="py-16 px-4">
      {/* Step indicator */}
      <div className="max-w-2xl mx-auto mb-8">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center font-[Poppins] font-bold text-sm">1</div>
          <span className="font-[Poppins] font-semibold text-[#141413]">Step 1: 分词</span>
        </motion.div>

        {/* Term cards */}
        <div id="term-tokenization"><InlineTermCard id="tokenization" showFull /></div>
        <div id="term-token"><InlineTermCard id="token" showFull /></div>

        {/* Explanation */}
        <div className="space-y-4 my-8">
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            AI模型没办法像人一样直接"阅读"一整句话。它需要先把这句话拆成一块一块的小碎片，每一块碎片就叫做一个<InlineTermCard id="token" />。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            为什么要这样？因为人类语言太复杂了——有几十万个不同的词。如果为每一个词都单独记忆，词汇表会大到无法处理。但如果把词拆成更小的片段，用几万个片段就能组合出几乎所有的词。这就像26个英文字母可以拼出所有英文单词一样。
          </motion.p>
        </div>
      </div>

      {/* Sushi Cutting Animation */}
      <div className="max-w-xl mx-auto my-12 relative">
        <div className="flex items-center justify-center gap-1 md:gap-2 relative min-h-[100px]">
          {/* Knife */}
          <AnimatePresence>
            {knifePos >= 0 && knifePos < 3 && (
              <motion.div
                className="absolute top-0 z-10 text-3xl md:text-4xl"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: [-40, 5, -5], opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                style={{
                  left: `${(knifePos + 1) * (100 / 4)}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                🔪
              </motion.div>
            )}
          </AnimatePresence>

          {/* Characters */}
          {tokens.map((tk, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 1 }}
              animate={{
                x: cutPhase > i ? (i < 2 ? -4 * (2 - i) : 4 * (i - 1)) : 0,
              }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="px-3 py-2 md:px-5 md:py-3 rounded-lg text-lg md:text-2xl font-bold font-[Lora] select-none"
                animate={{
                  backgroundColor: cutPhase > i ? 'rgba(217,119,87,0.15)' : 'transparent',
                  borderColor: cutPhase > i ? '#D97757' : 'transparent',
                }}
                style={{ border: '2px solid transparent' }}
              >
                {tk}
              </motion.div>
              {cutPhase >= 4 && (
                <motion.span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#B1ADA1] text-xs font-mono whitespace-nowrap"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  token {i + 1}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div ref={counterRef} className="max-w-2xl mx-auto my-16 text-center">
        <motion.p className="text-[#141413] mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          一个大模型的词汇表通常包含——
        </motion.p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="font-mono text-4xl md:text-5xl font-bold text-[#D97757]">
            {counterVal < 50000 ? counterVal.toLocaleString() : counterVal < 100000 ? '50,000 ~ ' + counterVal.toLocaleString() : '50,000 ~ 100,000'}
          </span>
          <span className="text-[#141413] text-lg">个独特的token</span>
        </div>
        <motion.p
          className="text-[#141413] text-sm mt-3 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          也就是说，模型用5万到10万个"小碎片"，就能拼出人类语言中的几乎所有文字。
        </motion.p>
      </div>

      {/* Truth without analogy */}
      <motion.div
        className="max-w-2xl mx-auto my-8 p-4 bg-[#FAF9F5] border-l-2 border-[#B1ADA1] rounded-r-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-[#141413] text-sm leading-relaxed">
          <span className="font-semibold">🎯 脱掉类比的真话：</span>分词器（Tokenizer）是一个预先训练好的工具，它根据一套固定的规则把文本拆成token序列。不同的模型使用不同的分词器，所以同一句话被不同模型切出的token可能不一样。但核心原则一样——把连续文本变成离散的单元序列，方便后续处理。
        </p>
      </motion.div>

      {/* Interactive tokenizer */}
      <motion.div
        className="max-w-md mx-auto my-12 bg-white rounded-xl p-6 shadow-md border border-[#B1ADA1]/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-[#141413] font-semibold mb-3">试试看！输入任意一句话，看看AI会怎么切——</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleTokenize()}
            placeholder="输入一句话..."
            className="flex-1 px-3 py-2 rounded-lg border border-[#B1ADA1]/30 text-sm focus:outline-none focus:border-[#D97757]"
          />
          <button
            onClick={handleTokenize}
            className="bg-[#D97757] text-white px-4 py-2 rounded-lg font-[Poppins] font-semibold text-sm hover:bg-[#c5664a] transition-colors cursor-pointer"
          >
            🔪 切！
          </button>
        </div>

        <AnimatePresence mode="wait">
          {userTokens && (
            <motion.div
              key={userInput}
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {userTokens.map((tk, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 bg-[#D97757]/10 border border-[#D97757]/30 rounded-lg text-sm font-mono"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 400 }}
                >
                  {tk}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[#B1ADA1] text-xs mt-3">
          注意：这里的切分是简化演示。真正的AI分词器更复杂，切分结果可能不同。
        </p>
      </motion.div>
    </section>
  );
}
