import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LogoImage } from '../components/Navbar';

function TypewriterText({ text, delay = 0, speed = 80, className = '', onComplete }: {
  text: string; delay?: number; speed?: number; className?: string; onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(t);
    } else {
      onComplete?.();
    }
  }, [started, displayed, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed.split('').map((char, i) => (
        <span
          key={i}
          className={
            (text === '——它们凭什么这么"聪明"？' && (char === '聪' || char === '明'))
              ? 'text-[#D97757] font-semibold'
              : ''
          }
        >
          {char}
        </span>
      ))}
      {displayed.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}

const badgeTooltips: Record<string, string> = {
  '软件工程': '能独立写完整个应用程序，还能帮你找到代码里的bug。',
  '科学研究': '能阅读论文、分析数据、提出研究假设，像一个科研助手。',
  '视觉理解': '能看懂图片、图表、截图中的内容，并用文字描述出来。',
  '知识工作': '能撰写报告、总结文档、分析商业数据——像一个全能的知识型员工。',
  '编程能力': '在各种编程语言和框架中都能写出高质量代码。',
  '生物学': '在生物学相关的推理和知识测试中展现出专家级的水平。',
  '网络安全': '能发现系统漏洞、分析安全威胁，像一个安全专家。',
  '智能体': '能像一个有手有脚的员工一样，自己去执行任务、使用工具，不只是聊天。',
};

function Badge({ text, color, delay }: { text: string; color: string; delay: number }) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 15 }}
    >
      <button
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        onClick={() => setTooltip(!tooltip)}
        className="px-3 py-1 rounded-full text-white text-xs font-[Poppins] font-semibold cursor-pointer"
        style={{ backgroundColor: color }}
      >
        {text}
      </button>
      {tooltip && (
        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#141413] text-white text-xs p-2 rounded-lg w-48 text-center z-10"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {badgeTooltips[text] || text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-[#141413] rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
}

export function Prologue() {
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);
  const questionInView = useInView(questionRef, { once: true, amount: 0.3 });
  const prologueRef = useRef<HTMLDivElement>(null);

  return (
    <section id="chapter-0" ref={prologueRef} className="relative">
      {/* Scene 1: Title */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h1
            className="font-[Poppins] text-3xl md:text-5xl font-bold text-[#141413] mb-4"
            initial={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            onAnimationComplete={() => setTitleDone(true)}
          >
            当今最强AI大模型的工作原理
          </motion.h1>

          {titleDone && (
            <div className="text-lg md:text-2xl text-[#141413] font-[Lora]">
              <TypewriterText
                text='——它们凭什么这么"聪明"？'
                delay={200}
                speed={80}
                onComplete={() => setSubtitleDone(true)}
              />
            </div>
          )}
        </motion.div>

        {subtitleDone && (
          <motion.div
            className="mt-8 text-[#B1ADA1] text-sm animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ↓ 向下滚动开始探索
          </motion.div>
        )}
      </div>

      {/* Scene 2: Two Models */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="flex flex-col md:flex-row items-stretch gap-6 max-w-4xl w-full">
          {/* Divider for desktop */}
          <motion.div
            className="hidden md:block w-px bg-[#B1ADA1]/30 self-stretch"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ order: 1 }}
          />

          {/* Claude Card */}
          <motion.div
            className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-[#6A9BCC]/30"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20, delay: 0.3 }}
            style={{ order: 0 }}
          >
            <div className="flex flex-col items-center mb-4">
              <LogoImage type="claude" size={64} />
              <h3 className="font-[Poppins] text-xl font-bold text-[#6A9BCC] mt-3">Claude Fable 5</h3>
              <p className="text-[#B1ADA1] text-sm">Anthropic · Mythos级别</p>
            </div>
            <p className="text-[#141413] text-sm leading-relaxed mb-4">
              可以连续工作数天，自主规划、拆分任务、检查自己的工作。在编程、科研、视觉等几乎所有测试中达到最先进水平。
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['软件工程', '科学研究', '视觉理解', '知识工作'].map((b, i) => (
                <Badge key={b} text={b} color="#6A9BCC" delay={0.8 + i * 0.3} />
              ))}
            </div>
          </motion.div>

          {/* GPT Card */}
          <motion.div
            className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-[#788C5D]/30"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20, delay: 0.5 }}
            style={{ order: 2 }}
          >
            <div className="flex flex-col items-center mb-4">
              <LogoImage type="gpt" size={64} />
              <h3 className="font-[Poppins] text-xl font-bold text-[#788C5D] mt-3">GPT-5.6 Sol</h3>
              <p className="text-[#B1ADA1] text-sm">OpenAI · 迄今最强</p>
            </div>
            <p className="text-[#141413] text-sm leading-relaxed mb-4">
              在编程、生物学、网络安全等领域展现出更强的智能体能力。支持Ultra模式，可调用子智能体加速复杂工作。
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['编程能力', '生物学', '网络安全', '智能体'].map((b, i) => (
                <Badge key={b} text={b} color="#788C5D" delay={0.9 + i * 0.3} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scene 3: Question Explosion */}
      <div ref={questionRef} className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Floating question marks */}
        {questionInView && [...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-[#B1ADA1]/20 font-[Poppins] select-none pointer-events-none"
            style={{
              fontSize: 20 + Math.random() * 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.3, 0.3, 0],
              scale: [0.5, 1, 1, 0.2],
              x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 400],
              y: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 400],
              rotate: [0, Math.random() * 30 - 15, Math.random() * 20, Math.random() * 360],
            }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          >
            ?
          </motion.span>
        ))}

        <motion.div
          className="text-6xl md:text-8xl z-10"
          initial={{ y: 100, scale: 0 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
            mass: 1.5,
          }}
        >
          🤯
        </motion.div>

        <motion.h2
          className="font-[Poppins] text-2xl md:text-4xl font-bold text-[#141413] mt-8 text-center z-10"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          它们到底是怎么工作的？
        </motion.h2>

        <motion.h2
          className="font-[Poppins] text-xl md:text-3xl font-bold text-[#D97757] mt-3 text-center z-10"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          凭什么能"思考"？
        </motion.h2>
      </div>
    </section>
  );
}
