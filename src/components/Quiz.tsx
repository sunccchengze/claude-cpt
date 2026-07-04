import { useState } from 'react';
import { motion } from 'framer-motion';

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function Quiz({ question, options, correctIndex, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const isCorrect = selected === correctIndex;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  const reset = () => {
    setSelected(null);
    setShowResult(false);
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-md border border-[#B1ADA1]/20 max-w-lg mx-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="font-[Poppins] font-semibold text-[#141413] mb-4">🧪 小测验</p>
      <p className="text-[#141413] mb-4 leading-relaxed">{question}</p>
      <div className="space-y-2">
        {options.map((opt, idx) => {
          let bg = 'bg-[#FAF9F5] hover:bg-[#D97757]/5';
          let border = 'border-[#B1ADA1]/20';
          if (showResult && idx === correctIndex) {
            bg = 'bg-green-50';
            border = 'border-green-400';
          } else if (showResult && idx === selected && !isCorrect) {
            bg = 'bg-red-50';
            border = 'border-[#C25B4A]';
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3 rounded-lg border ${border} ${bg} transition-all text-sm cursor-pointer`}
            >
              <span className="font-[Poppins] font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
              {showResult && idx === correctIndex && <span className="ml-2">✅</span>}
              {showResult && idx === selected && !isCorrect && idx !== correctIndex && <span className="ml-2">❌</span>}
            </button>
          );
        })}
      </div>
      {showResult && (
        <motion.div
          className="mt-4 p-3 rounded-lg bg-[#FAF9F5] text-sm text-[#141413]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="font-semibold mb-1">{isCorrect ? '🎉 回答正确！' : '💡 不太对哦'}</p>
          <p className="text-[#B1ADA1]">{explanation}</p>
          {!isCorrect && (
            <button onClick={reset} className="mt-2 text-[#D97757] text-sm underline cursor-pointer">重新作答</button>
          )}
          {isCorrect && (
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >✨</motion.span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
