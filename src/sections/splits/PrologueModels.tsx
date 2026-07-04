import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogoImage } from '../../components/Navbar';

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
    <motion.div className="relative" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay, type: 'spring', stiffness: 400, damping: 15 }}>
      <button onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)} onClick={() => setTooltip(!tooltip)}
        className="px-3 py-1 rounded-full text-white text-xs font-[Poppins] font-semibold cursor-pointer" style={{ backgroundColor: color }}>
        {text}
      </button>
      {tooltip && (
        <motion.div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#141413] text-white text-xs p-2 rounded-lg w-48 text-center z-10" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          {badgeTooltips[text] || text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-[#141413] rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
}

export function PrologueModels() {
  return (
    <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row items-stretch gap-6 max-w-4xl w-full">
        <motion.div className="hidden md:block w-px bg-[#B1ADA1]/30 self-stretch" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8 }} style={{ order: 1 }} />
        <motion.div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-[#6A9BCC]/30" initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 20, delay: 0.2 }} style={{ order: 0 }}>
          <div className="flex flex-col items-center mb-4">
            <LogoImage type="claude" size={64} />
            <h3 className="font-[Poppins] text-xl font-bold text-[#6A9BCC] mt-3">Claude Fable 5</h3>
            <p className="text-[#B1ADA1] text-sm">Anthropic · Mythos级别</p>
          </div>
          <p className="text-[#141413] text-sm leading-relaxed mb-4">可以连续工作数天，自主规划、拆分任务、检查自己的工作。在编程、科研、视觉等几乎所有测试中达到最先进水平。</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['软件工程', '科学研究', '视觉理解', '知识工作'].map((b, i) => (<Badge key={b} text={b} color="#6A9BCC" delay={0.6 + i * 0.2} />))}
          </div>
        </motion.div>
        <motion.div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-[#788C5D]/30" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 20, delay: 0.4 }} style={{ order: 2 }}>
          <div className="flex flex-col items-center mb-4">
            <LogoImage type="gpt" size={64} />
            <h3 className="font-[Poppins] text-xl font-bold text-[#788C5D] mt-3">GPT-5.6 Sol</h3>
            <p className="text-[#B1ADA1] text-sm">OpenAI · 迄今最强</p>
          </div>
          <p className="text-[#141413] text-sm leading-relaxed mb-4">在编程、生物学、网络安全等领域展现出更强的智能体能力。支持Ultra模式，可调用子智能体加速复杂工作。</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['编程能力', '生物学', '网络安全', '智能体'].map((b, i) => (<Badge key={b} text={b} color="#788C5D" delay={0.7 + i * 0.2} />))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
