import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../mock';

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];
  return (
    <section id="testimonials" className="relative py-28">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-4">— Testimonials</div>
            <h2 className="section-heading text-4xl md:text-5xl leading-[1.05]">Loved by founders <span className="gold-text italic">worldwide</span>.</h2>
            <p className="mt-4 text-zinc-400">Real words from real clients who trusted me with their digital dreams.</p>

            <div className="mt-6 flex gap-2">
              <button onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c] hover:border-[#d4af37]"><ChevronLeft size={18} /></button>
              <button onClick={() => setIdx((i) => (i + 1) % testimonials.length)} className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c] hover:border-[#d4af37]"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="lg:col-span-8 relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="glass gold-border rounded-3xl p-8 md:p-12">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={18} className="text-[#f5d78c] fill-[#f5d78c]" />))}
                </div>
                <p className="font-serif text-2xl md:text-3xl leading-relaxed text-zinc-100">“{t.quote}”</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f5d78c] to-[#8a7429] flex items-center justify-center font-serif text-xl text-black">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-serif text-lg">{t.name}</div>
                    <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all ${i === idx ? 'w-10 bg-[#d4af37]' : 'w-5 bg-[#d4af37]/25'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
