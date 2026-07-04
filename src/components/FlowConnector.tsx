import { motion } from 'framer-motion';

export function FlowConnector() {
  return (
    <div className="flex justify-center py-4">
      <motion.div
        className="w-px h-16 bg-gradient-to-b from-[#D97757]/50 to-[#D97757]/20"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: 'top' }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}
