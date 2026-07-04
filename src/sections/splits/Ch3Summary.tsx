import { motion } from 'framer-motion';
import { Quiz } from '../../components/Quiz';

export function Ch3Summary() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div className="bg-[#D97757]/5 border border-[#D97757]/20 rounded-xl p-6 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-around mb-4">
            {[{ icon: '👶', label: '预训练', desc: '学知识' }, { icon: '🎓', label: '指令微调', desc: '学做事' }, { icon: '👔', label: 'RLHF', desc: '做得好' }].map((s, i) => (
              <motion.div key={i} className="text-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.2, type: 'spring' }}>
                <div className="text-3xl mb-1">{s.icon}</div>
                <p className="font-[Poppins] text-sm font-semibold text-[#D97757]">{s.label}</p>
                <p className="text-xs text-[#B1ADA1]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[#141413] text-sm">
            <span className="font-semibold">预训练</span>给了它知识，<span className="font-semibold">指令微调</span>教它做事，<span className="font-semibold">RLHF</span>让它做得好。三个阶段缺一不可。
          </p>
        </motion.div>
        <Quiz
          question="以下哪项描述的是RLHF（基于人类反馈的强化学习）？"
          options={['把所有书喂给AI读', '告诉AI如何回答指令', '让人类对多个回答打分，AI学习人类的偏好', '给AI加上安全过滤器']}
          correctIndex={2}
          explanation="RLHF让人类对AI的多个回答进行评分或排序，然后用强化学习让AI学习生成人类更喜欢的回答。预训练是'喂书'，指令微调是'教如何回答'。"
        />
      </div>
    </section>
  );
}
