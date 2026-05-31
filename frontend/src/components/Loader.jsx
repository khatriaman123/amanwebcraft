import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#0a0a0b] flex items-center justify-center"
        >
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/20" />
              <div className="absolute inset-2 rounded-full border border-[#d4af37]/40" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-t-[#f5d78c] border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl gold-text">A</div>
            </div>
            <div className="font-serif text-xl tracking-[0.3em] text-zinc-200">AMAN WEB CRAFT</div>
            <div className="mt-3 font-mono text-xs text-[#d4af37] tabular-nums">Loading experience — {progress}%</div>
            <div className="mt-4 w-56 h-[2px] bg-[#1a1a1d] mx-auto overflow-hidden rounded-full">
              <div className="h-full bg-gradient-to-r from-[#f5d78c] via-[#d4af37] to-[#8a7429]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
