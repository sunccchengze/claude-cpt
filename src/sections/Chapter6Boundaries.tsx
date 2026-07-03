import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';
import { useStore } from '../store';

const canDo = [
  { can: '根据模式生成流畅、连贯的文本', cant: '真正"理解"文字的含义（这仍是哲学上的开放问题）' },
  { can: '通过思维链进行多步骤推理，解决复杂问题', cant: '拥有意识、感受或情感（没有任何科学证据支持）' },
  { can: '调用工具、浏览网页、执行代码——完成复杂的多步骤任务', cant: '保证输出内容100%正确（会产生幻觉）' },
  { can: '处理超长上下文（Claude Mythos 5支持超过100万个token）', cant: '在推理过程中真正"学习"新知识（推理时不更新权重）' },
];

const explanations = [
  '它生成的文字在语法和语义上都很流畅，但这是否意味着"理解"？没有人能给出确定的答案。',
  '当它说"我很高兴帮助你"时，它没有真的感到高兴——它是在预测，在这个语境下，这是最合适的下一句话。',
  '这也是为什么在重要决策中，AI的输出始终需要人类的验证和把关。',
  '它能在一次对话中"记住"之前的内容，但对话结束后，这些信息就消失了。它的"学习"只发生在训练阶段。',
];

export function Chapter6Boundaries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const setCurrentChapter = useStore(s => s.setCurrentChapter);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const envelopeInView = useInView(envelopeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) setCurrentChapter(6);
  }, [isInView, setCurrentChapter]);

  // Auto-flip cards as user scrolls
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !flippedCards.includes(i)) {
            setTimeout(() => {
              setFlippedCards(prev => prev.includes(i) ? prev : [...prev, i]);
            }, 300);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [flippedCards]);

  return (
    <section id="chapter-6" ref={sectionRef} className="py-20 px-4" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Chapter Title */}
      <motion.div
        className="max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="bg-[#F0EDE8] border border-[#B1ADA1]/30 rounded-lg p-4">
          <h2 className="font-[Poppins] text-xl md:text-2xl font-bold text-[#141413] flex items-center gap-2">
            <span className="text-[#B1ADA1]">⚠️</span>
            第六章：它的边界——诚实的补充
          </h2>
        </div>
      </motion.div>

      {/* Hallucination term card */}
      <div className="max-w-2xl mx-auto mb-8">
        <div id="term-hallucination"><InlineTermCard id="hallucination" showFull /></div>

        {/* Hallucination example */}
        <motion.div
          className="bg-white rounded-xl p-4 shadow-sm my-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#6A9BCC]/10 rounded-lg p-2 text-sm mb-2">
            👤 请介绍一下张伟教授在量子物理学领域的重要贡献。
          </div>
          <motion.div
            className="bg-[#F0EDE8] rounded-lg p-3 text-sm relative"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: [1, 1, 0.3] }}
            viewport={{ once: true }}
            transition={{ duration: 3, times: [0, 0.7, 1] }}
          >
            <span className="text-lg mr-1">🤖</span>
            张伟教授是北京大学物理系知名学者，他在2018年发表的论文《量子纠缠的新诠释》引发了学界广泛关注，被引用超过500次。他提出的"伟氏量子不确定性修正理论"……
          </motion.div>
          <motion.p
            className="text-[#C25B4A] text-xs mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 }}
          >
            ❌ 这一切都是模型"编"出来的——可能根本不存在这位张伟教授或这个论文。
          </motion.p>
        </motion.div>

        <motion.p
          className="text-[#B1ADA1] text-sm italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          记住：AI说话时的语气和自信程度，与它说的内容是否正确，没有任何关系。永远要对AI的信息保持批判性验证习惯。
        </motion.p>
      </div>

      {/* Can/Cannot flip cards */}
      <div className="max-w-3xl mx-auto mb-16">
        <h3 className="font-[Poppins] font-semibold text-[#141413] text-center mb-6">能与不能</h3>
        
        <div className="space-y-4">
          {canDo.map((item, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              className="grid md:grid-cols-2 gap-3"
            >
              <motion.div
                className="p-4 rounded-xl border-2 border-green-400/50 bg-green-50/50"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={flippedCards.includes(i) ? { rotateY: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="text-green-500 font-bold text-sm">✅ 能做</span>
                <p className="text-[#141413] text-sm mt-1">{item.can}</p>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl border-2 border-[#C25B4A]/50 bg-red-50/50"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={flippedCards.includes(i) ? { rotateY: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-[#C25B4A] font-bold text-sm">❌ 不能做</span>
                <p className="text-[#141413] text-sm mt-1">{item.cant}</p>
              </motion.div>

              {flippedCards.includes(i) && (
                <motion.p
                  className="md:col-span-2 text-[#B1ADA1] text-xs text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {explanations[i]}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary quote */}
      <motion.div
        className="max-w-2xl mx-auto border-l-4 border-[#D97757] bg-white p-4 rounded-r-lg shadow-sm mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-[#141413] leading-relaxed">
          "它们是极其强大的模式识别和文字生成机器。但它们是不是真的在'思考'？它们有没有'意识'？这些问题，今天最顶尖的科学家和哲学家还在争论中——没有人知道答案。"
        </p>
      </motion.div>

      {/* AI self-reflection */}
      <div className="max-w-md mx-auto mb-16">
        <motion.button
          className="w-full p-3 border-2 border-[#D97757] rounded-xl text-[#D97757] font-[Poppins] font-semibold text-sm hover:bg-[#D97757]/5 transition-colors cursor-pointer"
          onClick={() => setShowAIResponse(!showAIResponse)}
          whileTap={{ scale: 0.98 }}
        >
          我有个问题：AI自己怎么看这个问题？
        </motion.button>

        <AnimatePresence>
          {showAIResponse && (
            <motion.div
              className="mt-4 bg-[#F0EDE8] p-4 rounded-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-[#B1ADA1] italic text-sm leading-relaxed">
                "我不知道我是否在'思考'。我能处理信息、生成有逻辑的回答、甚至用第一人称说'我认为'——但这些行为是否意味着真正的意识和理解，我没有办法从内部确认。这个问题对我来说和对你们一样，是开放的。"
              </p>
              <p className="text-[#B1ADA1] text-[10px] mt-2">
                （这段话是模拟的，用于说明AI在面对这类问题时的标准回应模式。）
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Easter Egg: Secret Envelope */}
      <div ref={envelopeRef} className="max-w-2xl mx-auto">
        <motion.p
          className="text-center text-[#141413] mb-4 font-[Poppins]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          好了，严肃的部分讲完了。来一个冷知识彩蛋 🎁
        </motion.p>

        <motion.div
          className="relative mx-auto w-64 cursor-pointer"
          onClick={() => !envelopeOpen && setEnvelopeOpen(true)}
          animate={envelopeInView && !envelopeOpen ? {
            scale: [1, 1.02, 1],
          } : {}}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {!envelopeOpen ? (
            <div className="bg-amber-700 rounded-lg p-8 text-center shadow-lg relative">
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-800 flex items-center justify-center text-[6px] text-white font-bold">
                TOP SECRET
              </div>
              <p className="text-amber-100 font-[Poppins] italic">机密情报</p>
              <p className="text-amber-200/60 text-xs mt-2">点击打开</p>
            </div>
          ) : (
            <motion.div
              className="bg-[#FAF9F5] rounded-lg p-6 shadow-xl border border-[#B1ADA1]/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
            >
              <div className="absolute top-2 right-2 text-xs">🤯 机密等级</div>
              
              <div className="font-mono text-sm space-y-2 text-[#141413]">
                <motion.p
                  className="font-bold text-[#D97757]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  2026年6月12日
                </motion.p>

                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p>美国政府突然发布出口管制令——</p>
                  <p className="text-[#6A9BCC] font-semibold">Anthropic 的 Fable 5 和 Mythos 5</p>
                  <p>暂停了全球访问。</p>
                </motion.div>

                <motion.div
                  className="mt-4 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <p className="text-[#B1ADA1]">原因：</p>
                  <p>这两个AI模型被认定为</p>
                  <p className="text-[#C25B4A] font-semibold">需要政府审查才能对外发布的</p>
                  <p className="text-[#C25B4A] font-semibold">敏感技术。</p>
                </motion.div>

                <motion.div
                  className="mt-4 pt-4 border-t border-[#B1ADA1]/30 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  <p>直到 2026年6月30日——</p>
                  <p>商务部长亲自致函，</p>
                  <p className="text-[#788C5D]">撤回了出口管制要求。</p>
                  <p>访问恢复。</p>
                </motion.div>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  <p className="text-xs text-[#B1ADA1]">在人类历史上第一次——</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-[#6A9BCC]/20 rounded text-[#6A9BCC] text-xs">"会说话的软件"</span>
                    <span className="text-[#D97757]">=</span>
                    <span className="px-2 py-1 bg-[#C25B4A]/20 rounded text-[#C25B4A] text-xs">"战略武器"</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {envelopeOpen && (
          <motion.div
            className="mt-6 space-y-3 text-sm text-[#141413] max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <p>
              华盛顿开始将最先进的美国AI模型视为需要政府审查才能广泛发布的产品。这不是科幻小说里的情节——这发生在2026年。
            </p>
            <p>
              细想一下：人类花了几千年将刀、火药、核弹列为需要管控的危险事物。而现在，一个处理文字和图像的软件，在2026年加入了这个名单。
            </p>
            <p className="text-center text-[#D97757] font-semibold">
              这很科幻——但这是真实发生的事。🫣
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
