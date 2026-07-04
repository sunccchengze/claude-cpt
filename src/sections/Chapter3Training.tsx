import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';
import { Quiz } from '../components/Quiz';


const books = ['维基百科', '学术论文', '新闻', '小说', '代码', '法律', '医学', '社交媒体'];

export function Chapter3Training() {
  const sectionRef = useRef<HTMLDivElement>(null);


  // Pre-training animation
  const preRef = useRef<HTMLDivElement>(null);
  const preInView = useInView(preRef, { once: true, amount: 0.3 });
  const [booksAbsorbed, setBooksAbsorbed] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);

  // Instruction tuning
  const instRef = useRef<HTMLDivElement>(null);
  const instInView = useInView(instRef, { once: true, amount: 0.3 });
  const [switchOn, setSwitchOn] = useState(false);

  // RLHF
  const rlhfRef = useRef<HTMLDivElement>(null);
  const rlhfInView = useInView(rlhfRef, { once: true, amount: 0.3 });
  const [dogPhase, setDogPhase] = useState(0);



  useEffect(() => {
    if (!preInView) return;
    const interval = setInterval(() => {
      setBooksAbsorbed(b => {
        if (b >= books.length) {
          clearInterval(interval);
          return b;
        }
        return b + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [preInView]);

  useEffect(() => {
    if (booksAbsorbed < books.length) return;
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5000000000);
      if (count > 10000000000000) {
        count = 10000000000000;
        clearInterval(interval);
      }
      setTokenCount(count);
    }, 50);
    return () => clearInterval(interval);
  }, [booksAbsorbed]);

  useEffect(() => {
    if (!instInView) return;
    const t = setTimeout(() => setSwitchOn(true), 1500);
    return () => clearTimeout(t);
  }, [instInView]);

  useEffect(() => {
    if (!rlhfInView) return;
    const t1 = setTimeout(() => setDogPhase(1), 800);
    const t2 = setTimeout(() => setDogPhase(2), 2500);
    const t3 = setTimeout(() => setDogPhase(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [rlhfInView]);

  return (
    <section id="chapter-3" ref={sectionRef} className="py-20 px-4">
      {/* Chapter Title */}
      <motion.div
        className="max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="bg-[#F0EDE8] border border-[#B1ADA1]/30 rounded-lg p-4 text-center">
          <h2 className="font-[Poppins] text-xl md:text-2xl font-bold text-[#141413]">
            第三章：从"会说话"到"会思考"——训练的三个阶段
          </h2>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#B1ADA1]/30" />
          {[
            { icon: '👶', label: '预训练' },
            { icon: '🎓', label: '指令微调' },
            { icon: '👔', label: 'RLHF' },
          ].map((stage, i) => (
            <motion.div
              key={i}
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, type: 'spring' }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-[#D97757] flex items-center justify-center text-2xl md:text-3xl">
                {stage.icon}
              </div>
              <span className="mt-2 font-[Poppins] text-xs md:text-sm font-semibold text-[#141413]">{stage.label}</span>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center text-[#B1ADA1] text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          一个AI模型从零开始到能够对话，需要经历三个阶段——就像一个人从婴儿成长为专业人士。
        </motion.p>
      </div>

      {/* Stage 1: Pre-training */}
      <div ref={preRef} className="max-w-2xl mx-auto mb-20">
        <motion.h3
          className="font-[Poppins] text-lg font-bold text-[#D97757] mb-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center text-sm">1</span>
          阶段一：预训练——"读遍天下书"
        </motion.h3>

        <div id="term-pre-training"><InlineTermCard id="pre-training" showFull /></div>

        {/* Knowledge flood animation */}
        <div className="relative bg-gradient-to-b from-blue-50/30 to-amber-50/30 rounded-2xl p-8 my-8 overflow-hidden min-h-[300px]">
          {/* AI character */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl z-10"
            animate={{
              scale: 1 + booksAbsorbed * 0.1,
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {booksAbsorbed < books.length ? '🤖' : '🧠'}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute top-4 left-4 right-4">
            <div className="text-xs text-[#B1ADA1] mb-1">知识量</div>
            <div className="h-2 bg-[#F0EDE8] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#D97757] rounded-full"
                animate={{ width: `${(booksAbsorbed / books.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flying books */}
          <AnimatePresence>
            {books.slice(0, booksAbsorbed).map((book, i) => (
              <motion.div
                key={book}
                className="absolute px-2 py-1 bg-white rounded shadow text-xs font-[Poppins]"
                initial={{
                  x: (i % 2 === 0 ? -100 : 300),
                  y: 50 + (i % 3) * 60,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: '50%',
                  y: '50%',
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 0.8 }}
              >
                📚 {book}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Token counter */}
          {tokenCount > 0 && (
            <motion.div
              className="absolute bottom-4 left-4 right-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-[#B1ADA1] text-xs">已读 </span>
              <span className="font-mono text-[#D97757] font-bold">
                {tokenCount >= 10000000000000 ? '数万亿' : (tokenCount / 1000000000000).toFixed(1) + '万亿'}
              </span>
              <span className="text-[#B1ADA1] text-xs"> token</span>
            </motion.div>
          )}
        </div>

        {/* Fill in the blank demos */}
        <div className="space-y-3 my-6">
          {[
            { q: '中国的首都是____', a: '北京' },
            { q: '水的化学式是____', a: 'H₂O' },
            { q: 'def hello():____', a: "print('Hello')" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <span className="text-[#141413] text-sm font-mono">{item.q}</span>
              <motion.span
                className="text-[#D97757] font-semibold text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.2 }}
              >
                → {item.a}
              </motion.span>
              <span className="text-green-500">✅</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-[#141413] text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          经过预训练，模型学会了语言的语法规律、大量的事实性知识、甚至编程技能。但是——它现在只会"补全文本"，还不会"回答问题"。
        </motion.p>
      </div>

      {/* Stage 2: Instruction Tuning */}
      <div ref={instRef} className="max-w-2xl mx-auto mb-20">
        <motion.h3
          className="font-[Poppins] text-lg font-bold text-[#D97757] mb-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center text-sm">2</span>
          阶段二：指令微调——"学会做事"
        </motion.h3>

        <div id="term-instruction-tuning"><InlineTermCard id="instruction-tuning" showFull /></div>

        {/* Before/After comparison */}
        <div className="my-8 grid md:grid-cols-2 gap-4">
          {/* Before */}
          <motion.div
            className="p-4 rounded-xl border-2 transition-all duration-500"
            style={{
              borderColor: switchOn ? '#B1ADA1' : '#C25B4A',
              backgroundColor: switchOn ? '#F5F5F5' : 'rgba(194,91,74,0.05)',
              opacity: switchOn ? 0.6 : 1,
            }}
          >
            <p className="text-xs text-[#B1ADA1] mb-2 font-[Poppins]">微调前</p>
            <div className="bg-[#6A9BCC]/10 rounded-lg p-2 text-sm mb-2">
              👤 帮我写首诗
            </div>
            <div className="bg-[#F0EDE8] rounded-lg p-2 text-sm">
              <span className="text-lg mr-1">😐</span>
              帮我写首诗是一个常见的请求。许多人在特殊场合需要诗歌，比如婚礼、生日……
            </div>
            <p className="text-[#C25B4A] text-xs mt-2">❌ 它在补全文本，不是在写诗！</p>
          </motion.div>

          {/* Switch */}
          <div className="hidden md:flex items-center justify-center">
            <motion.button
              className="w-16 h-8 rounded-full relative cursor-pointer"
              style={{ backgroundColor: switchOn ? '#D97757' : '#B1ADA1' }}
              onClick={() => setSwitchOn(!switchOn)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full absolute top-1"
                animate={{ left: switchOn ? 36 : 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            </motion.button>
          </div>

          {/* After */}
          <motion.div
            className="p-4 rounded-xl border-2 transition-all duration-500"
            style={{
              borderColor: switchOn ? '#D97757' : '#B1ADA1',
              backgroundColor: switchOn ? 'rgba(217,119,87,0.05)' : '#F5F5F5',
              opacity: switchOn ? 1 : 0.6,
            }}
          >
            <p className="text-xs text-[#B1ADA1] mb-2 font-[Poppins]">微调后</p>
            <div className="bg-[#6A9BCC]/10 rounded-lg p-2 text-sm mb-2">
              👤 帮我写首诗
            </div>
            <div className="bg-[#D97757]/10 rounded-lg p-2 text-sm">
              <span className="text-lg mr-1">😊🎓</span>
              春风拂柳绿，细雨润花红。<br/>
              山间云雾散，溪畔鸟声中。
            </div>
            <p className="text-[#D97757] text-xs mt-2">✅ 它学会了"执行指令"——你说写诗，它就写诗！</p>
          </motion.div>
        </div>
      </div>

      {/* Stage 3: RLHF */}
      <div ref={rlhfRef} className="max-w-2xl mx-auto mb-16">
        <motion.h3
          className="font-[Poppins] text-lg font-bold text-[#D97757] mb-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center text-sm">3</span>
          阶段三：RLHF——"学会什么是'好'"
        </motion.h3>

        <div id="term-rlhf"><InlineTermCard id="rlhf" showFull /></div>
        <div id="term-reinforcement-learning"><InlineTermCard id="reinforcement-learning" showFull /></div>

        {/* Dog training animation */}
        <div className="bg-amber-50/50 rounded-2xl p-6 my-8 relative min-h-[200px]">
          <p className="font-[Poppins] text-sm font-semibold text-[#141413] mb-4">🐕 训练小狗</p>

          <div className="flex items-end justify-center gap-8 h-32">
            {/* Bowl A */}
            <motion.div
              className="flex flex-col items-center"
              animate={{ scale: dogPhase >= 1 && dogPhase < 2 ? 1.1 : 1 }}
            >
              <div className="text-xs text-center mb-1 max-w-[100px]">
                {dogPhase === 0 ? '回答A：地球是圆的' : dogPhase < 3 ? '回答A：详细分析...' : ''}
              </div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(dogPhase === 0 ? 5 : 4)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xs">⭐</span>
                ))}
              </div>
              <div className="text-2xl">🥣</div>
            </motion.div>

            {/* Dog */}
            <motion.div
              className="text-4xl"
              animate={{
                x: dogPhase >= 1 ? -30 : 0,
                rotate: dogPhase >= 2 ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              {dogPhase >= 2 ? '🐕😋' : '🐕'}
            </motion.div>

            {/* Bowl B */}
            <motion.div
              className="flex flex-col items-center opacity-50"
            >
              <div className="text-xs text-center mb-1 max-w-[100px]">
                {dogPhase === 0 ? '回答B：可能是方的...' : dogPhase < 3 ? '回答B：我不知道' : ''}
              </div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(dogPhase === 0 ? 2 : 1)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xs">⭐</span>
                ))}
              </div>
              <div className="text-2xl">🥣</div>
            </motion.div>
          </div>

          {/* Bone reward */}
          <AnimatePresence>
            {dogPhase >= 2 && (
              <motion.div
                className="absolute top-1/2 left-1/3 text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
                transition={{ type: 'spring' }}
              >
                🦴
              </motion.div>
            )}
          </AnimatePresence>

          {dogPhase >= 3 && (
            <motion.div
              className="absolute top-4 right-4 text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              💡
            </motion.div>
          )}
        </div>

        <motion.p
          className="text-[#141413] text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          RLHF的核心：不是告诉模型"标准答案是什么"，而是告诉模型"在多个可能的回答中，哪个更好"。模型通过大量比较，学会了人类偏好的回答风格。
        </motion.p>
      </div>

      {/* Summary */}
      <motion.div
        className="max-w-2xl mx-auto bg-[#D97757]/5 border border-[#D97757]/20 rounded-xl p-6 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-around mb-4">
          {[
            { icon: '👶', label: '预训练', desc: '学知识' },
            { icon: '🎓', label: '指令微调', desc: '学做事' },
            { icon: '👔', label: 'RLHF', desc: '做得好' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="font-[Poppins] text-xs font-semibold text-[#D97757]">{s.label}</p>
              <p className="text-xs text-[#B1ADA1]">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[#141413] text-sm">
          <span className="font-semibold">预训练</span>给了它知识，<span className="font-semibold">指令微调</span>教它做事，<span className="font-semibold">RLHF</span>让它做得好。三个阶段缺一不可。
        </p>
      </motion.div>

      {/* Quiz */}
      <Quiz
        question="以下哪项描述的是RLHF（基于人类反馈的强化学习）？"
        options={['把所有书喂给AI读', '告诉AI如何回答指令', '让人类对多个回答打分，AI学习人类的偏好', '给AI加上安全过滤器']}
        correctIndex={2}
        explanation="RLHF让人类对AI的多个回答进行评分或排序，然后用强化学习让AI学习生成人类更喜欢的回答。预训练是'喂书'，指令微调是'教如何回答'。"
      />
    </section>
  );
}
