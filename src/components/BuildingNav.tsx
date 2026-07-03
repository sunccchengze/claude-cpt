import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const floors = [
  { id: 'step1', label: '① 分词', section: 'step-1' },
  { id: 'step2', label: '② 嵌入', section: 'step-2' },
  { id: 'step25', label: '③ 位置编码', section: 'step-25' },
  { id: 'step3', label: '④ 自注意力 ⭐', section: 'step-3' },
  { id: 'step4', label: '⑤ FFN', section: 'step-4' },
  { id: 'step5', label: '⑥ 堆叠', section: 'step-5' },
  { id: 'step6', label: '⑦ 输出', section: 'step-6' },
];

export function BuildingNav({ currentStep }: { currentStep: number }) {
  const [expanded, setExpanded] = useState(true);

  if (!expanded) {
    return (
      <motion.button
        className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden lg:block bg-white shadow-md rounded-lg p-2 text-lg cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        title="展开大厦导航"
      >
        🏢
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 w-[140px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-[Poppins] font-semibold text-[#B1ADA1]">🏢 大厦导航</span>
            <button
              onClick={() => setExpanded(false)}
              className="text-[#B1ADA1] hover:text-[#141413] text-xs cursor-pointer"
            >
              ←
            </button>
          </div>
          <div className="flex flex-col-reverse gap-0.5">
            {floors.map((floor, idx) => {
              const isCurrent = idx === currentStep;
              return (
                <motion.button
                  key={floor.id}
                  className="text-left px-2 py-1.5 rounded text-[10px] font-[Poppins] cursor-pointer transition-all"
                  style={{
                    backgroundColor: isCurrent ? 'rgba(217,119,87,0.15)' : 'transparent',
                    color: isCurrent ? '#D97757' : '#B1ADA1',
                    fontWeight: isCurrent ? 700 : 400,
                  }}
                  animate={isCurrent ? {
                    boxShadow: ['0 0 0 0 rgba(217,119,87,0)', '0 0 4px 1px rgba(217,119,87,0.3)', '0 0 0 0 rgba(217,119,87,0)'],
                  } : {}}
                  transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                  onClick={() => {
                    const el = document.getElementById(`term-${floor.id === 'step1' ? 'tokenization' : floor.id === 'step2' ? 'embedding' : floor.id === 'step25' ? 'positional-encoding' : floor.id === 'step3' ? 'self-attention' : floor.id === 'step4' ? 'ffn' : floor.id === 'step5' ? 'transformer-layer' : 'next-token-prediction'}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  {floor.label}
                </motion.button>
              );
            })}
          </div>
          <p className="text-[8px] text-[#B1ADA1] mt-2 text-center">← 点击楼层跳转</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
