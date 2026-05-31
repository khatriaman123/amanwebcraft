import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ eyebrow, title, italic, sub, align = 'left', children, variant = 1 }) => {
  const variants = {
    1: 'py-24 md:py-32',
    2: 'py-20 md:py-28',
    3: 'py-16 md:py-24',
  };
  return (
    <header className={`relative ${variants[variant] || variants[1]} overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-[#8a7429]/10 blur-[120px]" />
      </div>
      <div className={`relative container-xl ${align === 'center' ? 'text-center' : ''}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          <h1 className="section-heading text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            {title} {italic && <span className="gold-text italic">{italic}</span>}
          </h1>
          {sub && <p className={`mt-6 text-zinc-400 text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{sub}</p>}
          {children}
        </motion.div>
      </div>
    </header>
  );
};

export default PageHeader;
