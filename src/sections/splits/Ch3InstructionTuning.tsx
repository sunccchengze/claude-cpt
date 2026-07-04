import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../../components/TermCard';

export function Ch3InstructionTuning() {
  const instRef = useRef<HTMLDivElement>(null);
  const instInView = useInView(instRef, { once: true, amount: 0.2 });
  const [switchOn, setSwitchOn] = useState(false);

  useEffect(() => { if (instInView) { const t = setTimeout(() => setSwitchOn(true), 1500); return () => clearTimeout(t); } }, [instInView]);

  return (
    <section ref={instRef} className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h3 className="font-[Poppins] text-lg font-bold text-[#D97757] mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center text-sm">2</span>
          阶段二：指令微调——"学会做事"
        </motion.h3>
        <div id="term-instruction-tuning"><InlineTermCard id="instruction-tuning" showFull /></div>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <motion.div className="p-4 rounded-xl border-2 transition-all duration-500" style={{ borderColor: switchOn ? '#B1ADA1' : '#C25B4A', backgroundColor: switchOn ? '#F5F5F5' : 'rgba(194,91,74,0.05)', opacity: switchOn ? 0.6 : 1 }}>
            <p className="text-xs text-[#B1ADA1] mb-2 font-[Poppins]">微调前</p>
            <div className="bg-[#6A9BCC]/10 rounded-lg p-2 text-sm mb-2">👤 帮我写首诗</div>
            <div className="bg-[#F0EDE8] rounded-lg p-2 text-sm"><span className="text-lg mr-1">😐</span>帮我写首诗是一个常见的请求。许多人在特殊场合需要诗歌，比如婚礼、生日……</div>
            <p className="text-[#C25B4A] text-xs mt-2">❌ 它在补全文本，不是在写诗！</p>
          </motion.div>

          <motion.div className="p-4 rounded-xl border-2 transition-all duration-500" style={{ borderColor: switchOn ? '#D97757' : '#B1ADA1', backgroundColor: switchOn ? 'rgba(217,119,87,0.05)' : '#F5F5F5', opacity: switchOn ? 1 : 0.6 }}>
            <p className="text-xs text-[#B1ADA1] mb-2 font-[Poppins]">微调后</p>
            <div className="bg-[#6A9BCC]/10 rounded-lg p-2 text-sm mb-2">👤 帮我写首诗</div>
            <div className="bg-[#D97757]/10 rounded-lg p-2 text-sm"><span className="text-lg mr-1">😊🎓</span>春风拂柳绿，细雨润花红。<br/>山间云雾散，溪畔鸟声中。</div>
            <p className="text-[#D97757] text-xs mt-2">✅ 它学会了"执行指令"——你说写诗，它就写诗！</p>
          </motion.div>
        </div>

        <div className="flex justify-center my-4">
          <motion.button className="w-16 h-8 rounded-full relative cursor-pointer" style={{ backgroundColor: switchOn ? '#D97757' : '#B1ADA1' }} onClick={() => setSwitchOn(!switchOn)} whileTap={{ scale: 0.95 }}>
            <motion.div className="w-6 h-6 bg-white rounded-full absolute top-1" animate={{ left: switchOn ? 36 : 4 }} transition={{ type: 'spring', stiffness: 400 }} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
