import { motion } from 'framer-motion';

export function Ch3Intro() {
  return (
    <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 py-12">
      <motion.div className="max-w-3xl mx-auto mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-[#F0EDE8] border border-[#B1ADA1]/30 rounded-lg p-4 text-center">
          <h2 className="font-[Poppins] text-xl md:text-2xl font-bold text-[#141413]">
            第三章：从"会说话"到"会思考"——训练的三个阶段
          </h2>
        </div>
      </motion.div>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#B1ADA1]/30" />
          {[{ icon: '👶', label: '预训练' }, { icon: '🎓', label: '指令微调' }, { icon: '👔', label: 'RLHF' }].map((stage, i) => (
            <motion.div key={i} className="relative z-10 flex flex-col items-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.25, type: 'spring' }}>
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white border-2 border-[#D97757] flex items-center justify-center text-3xl md:text-4xl">
                {stage.icon}
              </div>
              <span className="mt-3 font-[Poppins] text-sm md:text-base font-semibold text-[#141413]">{stage.label}</span>
            </motion.div>
          ))}
        </div>
        <motion.p className="text-center text-[#B1ADA1] text-sm mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          一个AI模型从零开始到能够对话，需要经历三个阶段——就像一个人从婴儿成长为专业人士。
        </motion.p>
      </div>
    </section>
  );
}
