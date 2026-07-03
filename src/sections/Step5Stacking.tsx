import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { InlineTermCard } from '../components/TermCard';

const layerDescriptions: Record<string, { label: string; desc: string; example: string }> = {
  'bottom': { label: '基础层 (1-10)', desc: '学习词义、简单语法', example: '"猫"和"狗"都是动物' },
  'mid': { label: '中层 (11-40)', desc: '学习语义关系、句子结构', example: '"他"指代的是谁' },
  'high': { label: '高层 (41-60)', desc: '学习抽象模式、情感、意图', example: '这句话是在讽刺还是认真的？' },
  'top': { label: '顶层 (61-80)', desc: '整合所有信息，做出最终判断', example: '这段话的核心论点是什么？' },
};

export function Step5Stacking() {
  const ref = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const buildInView = useInView(buildRef, { once: true, amount: 0.3 });
  const [layerCount, setLayerCount] = useState(0);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!buildInView) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLayerCount(count);
      if (count >= 80) clearInterval(interval);
    }, count < 5 ? 200 : count < 20 ? 80 : 30);
    return () => clearInterval(interval);
  }, [buildInView]);

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center font-[Poppins] font-bold text-sm">5</div>
          <span className="font-[Poppins] font-semibold text-[#141413]">Step 5: 堆叠</span>
        </motion.div>

        <div id="term-transformer-layer"><InlineTermCard id="transformer-layer" showFull /></div>

        <div className="space-y-4 my-8">
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            好，现在你已经理解了一个Transformer层的内部结构：先做自注意力，再做前馈网络。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            那下一个问题就是——<span className="font-semibold">一层就够了吗？</span>
          </motion.p>
          <motion.p className="text-[#D97757] font-bold text-lg" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            远远不够。
          </motion.p>
          <motion.p className="text-[#141413] leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            一层只能学到最基础的词义和语法关系。要理解复杂的语言——讽刺、隐喻、多步推理、跨段落的逻辑——需要信息在很多层之间反复处理。所以，现代大模型把这样的层堆叠几十到上百层。
          </motion.p>
        </div>
      </div>

      {/* Building animation */}
      <div ref={buildRef} className="max-w-3xl mx-auto my-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Tower */}
          <div className="flex-1">
            <div className="relative bg-gradient-to-b from-blue-50/30 to-amber-50/30 rounded-xl p-4 overflow-hidden" style={{ minHeight: '400px' }}>
              {/* Crane */}
              <motion.div
                className="absolute top-2 right-4 text-2xl"
                animate={layerCount < 80 ? { y: [0, -5, 0] } : {}}
                transition={{ repeat: layerCount < 80 ? Infinity : 0, duration: 0.5 }}
              >
                🏗️
              </motion.div>

              {/* Counter */}
              <div className="text-center mb-4">
                <span className="font-mono text-3xl font-bold text-[#D97757]">Layer {layerCount}</span>
              </div>

              {/* Stacked layers visualization */}
              <div className="flex flex-col-reverse gap-0.5 max-h-[300px] overflow-hidden">
                {Array.from({ length: Math.min(layerCount, 40) }, (_, i) => {
                  const layerNum = layerCount <= 40 ? i + 1 : Math.floor((i / 40) * layerCount) + 1;
                  const region = layerNum <= 10 ? 'bottom' : layerNum <= 40 ? 'mid' : layerNum <= 60 ? 'high' : 'top';
                  const regionColors = { bottom: '#6A9BCC', mid: '#788C5D', high: '#D97757', top: '#8B5CF6' };
                  const isHovered = hoveredRegion === region;
                  return (
                    <motion.div
                      key={i}
                      className="flex rounded-sm cursor-pointer overflow-hidden"
                      style={{ height: '6px' }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      onMouseEnter={() => setHoveredRegion(region)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      <div
                        className="flex-1 transition-all duration-200"
                        style={{
                          backgroundColor: isHovered ? regionColors[region] : `${regionColors[region]}40`,
                        }}
                      />
                      <div
                        className="flex-1 transition-all duration-200"
                        style={{
                          backgroundColor: isHovered ? `${regionColors[region]}80` : `${regionColors[region]}20`,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Layer descriptions */}
          <div className="flex-1 space-y-3">
            {Object.entries(layerDescriptions).map(([key, info]) => (
              <motion.div
                key={key}
                className="rounded-xl p-4 border transition-all duration-200"
                style={{
                  backgroundColor: hoveredRegion === key ? '#FAF9F5' : 'white',
                  borderColor: hoveredRegion === key ? '#D97757' : 'rgba(177,173,161,0.2)',
                  boxShadow: hoveredRegion === key ? '0 4px 12px rgba(217,119,87,0.15)' : 'none',
                }}
                onMouseEnter={() => setHoveredRegion(key)}
                onMouseLeave={() => setHoveredRegion(null)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ['bottom', 'mid', 'high', 'top'].indexOf(key) * 0.2 }}
              >
                <p className="font-[Poppins] font-semibold text-sm text-[#141413]">{info.label}</p>
                <p className="text-[#141413] text-xs mt-1">{info.desc}</p>
                <p className="text-[#B1ADA1] text-xs italic mt-1">例：{info.example}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Truth */}
      <motion.div
        className="max-w-2xl mx-auto my-8 p-4 bg-[#FAF9F5] border-l-2 border-[#B1ADA1] rounded-r-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-[#141413] text-sm leading-relaxed">
          <span className="font-semibold">🎯 脱掉类比的真话：</span>深度学习中的"深度"指的就是网络的层数。层数越多，模型能学到的抽象模式越复杂。但层数也不是越多越好——太多层可能导致训练不稳定。所以实际工程中有很多技巧（如残差连接、层归一化）来确保信息能够在几十上百层中顺畅流动。
        </p>
      </motion.div>
    </section>
  );
}
