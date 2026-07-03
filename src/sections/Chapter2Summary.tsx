import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { label: '分词 Tokenization', icon: '🔪' },
  { label: '嵌入 Embedding', icon: '🌌' },
  { label: '位置编码', icon: '📍' },
  { label: '自注意力 × N层', icon: '🎯' },
  { label: 'FFN × N层', icon: '📚' },
  { label: '输出预测', icon: '💬' },
];

export function Chapter2Summary() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase(1), 500);
    return () => clearTimeout(t1);
  }, [inView]);

  useEffect(() => {
    if (phase !== 1) return;
    if (currentFloor < steps.length - 1) {
      const t = setTimeout(() => setCurrentFloor(f => f + 1), 600);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase(2), 800);
      return () => clearTimeout(t);
    }
  }, [phase, currentFloor]);

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-[#FAF9F5] to-[#F5F0EB]">
      <div className="max-w-3xl mx-auto">
        <motion.h3
          className="font-[Poppins] text-xl font-bold text-[#141413] text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          第二章总结 — 全流程回顾
        </motion.h3>

        {/* Building visualization */}
        <div className="relative max-w-md mx-auto mb-8">
          {/* Building */}
          <div className="flex flex-col-reverse gap-1">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative h-12 rounded-lg border-2 flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  borderColor: currentFloor >= i ? '#D97757' : '#B1ADA1',
                  backgroundColor: currentFloor === i ? 'rgba(217,119,87,0.15)' : currentFloor > i ? 'rgba(217,119,87,0.05)' : 'white',
                }}
              >
                <span className="text-lg">{step.icon}</span>
                <span className="font-[Poppins] text-xs md:text-sm font-semibold text-[#141413]">{step.label}</span>
                
                {currentFloor === i && (
                  <motion.div
                    className="absolute left-2 w-3 h-3 rounded-full bg-[#D97757]"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Input label */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-[#B1ADA1] whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
          >
            输入："今天天气真好"
          </motion.div>

          {/* Output */}
          {phase >= 2 && (
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#D97757] text-white px-4 py-2 rounded-xl font-[Poppins] font-semibold text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              输出："真好" 🎉
            </motion.div>
          )}
        </div>

        {/* Summary text */}
        <motion.div
          className="mt-16 text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#141413] leading-relaxed">
            从一句话输入，到一个词输出——这就是大语言模型处理文本的完整流程。
          </p>
          <p className="text-[#D97757] font-semibold">
            然后不断重复这个过程，一个词一个词地"蹦"出完整的回答。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
