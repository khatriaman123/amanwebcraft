import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../mock';

const Bar = ({ name, level, idx }) => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(level), 150 + idx * 90);
    return () => clearTimeout(t);
  }, [level, idx]);
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-xl">{name}</span>
          <span className="text-[10px] font-mono text-zinc-500 tracking-widest">{skills[idx]?.category}</span>
        </div>
        <span className="font-mono text-sm text-[#f5d78c] tabular-nums">{w}%</span>
      </div>
      <div className="h-[6px] rounded-full bg-[#14141a] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#f5d78c] via-[#d4af37] to-[#8a7429] shimmer" style={{ width: `${w}%`, transition: 'width 1.2s cubic-bezier(.2,.7,.2,1)' }} />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-28">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="eyebrow mb-4">— Skills</div>
            <h2 className="section-heading text-4xl md:text-6xl leading-[1.05]">Tools of the <span className="gold-text italic">trade</span>.</h2>
            <p className="mt-5 text-zinc-400 text-lg">A carefully curated stack I reach for daily — battle-tested in production across 80+ projects.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {['Performance', 'Accessibility', 'Clean Code', 'SEO', 'Security', 'DevOps'].map((t) => (
                <div key={t} className="glass gold-border rounded-xl px-4 py-3 text-sm text-zinc-300">{t}</div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {skills.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <Bar {...s} idx={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
