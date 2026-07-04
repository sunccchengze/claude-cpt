import { motion } from 'framer-motion';

export function PrologueQuestion() {
  return (
    <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.span key={i} className="absolute text-[#B1ADA1]/15 font-[Poppins] select-none pointer-events-none"
          style={{ fontSize: 20 + Math.random() * 40, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0, 0.25, 0.25, 0], x: [(Math.random()-0.5)*60, (Math.random()-0.5)*200], y: [(Math.random()-0.5)*60, (Math.random()-0.5)*200], rotate: [0, Math.random()*360] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 1 }}>?</motion.span>
      ))}
      <motion.div className="text-6xl md:text-8xl z-10" initial={{ y: 60, scale: 0 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}>🤯</motion.div>
      <motion.h2 className="font-[Poppins] text-2xl md:text-4xl font-bold text-[#141413] mt-8 text-center z-10" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        它们到底是怎么工作的？
      </motion.h2>
      <motion.h2 className="font-[Poppins] text-xl md:text-3xl font-bold text-[#D97757] mt-3 text-center z-10" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
        凭什么能"思考"？
      </motion.h2>
    </section>
  );
}
