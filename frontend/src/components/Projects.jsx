import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { projects } from '../mock';

const categories = ['All', 'Full Stack', 'SaaS', 'Marketplace', 'Enterprise'];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28">
      <div className="container-xl">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="eyebrow mb-4">— Projects</div>
            <h2 className="section-heading text-4xl md:text-6xl leading-[1.05]">Selected <span className="gold-text italic">case studies</span>.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase border ${filter === c ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-[#d4af37]/30 text-zinc-300 hover:border-[#d4af37]'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {list.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group glass gold-border rounded-3xl overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.25em] text-[#f5d78c] bg-black/50 border border-[#d4af37]/30 rounded-full px-3 py-1">{p.category.toUpperCase()}</div>
                <div className="laptop-base" style={{ position: 'absolute', left: '5%', right: '5%', bottom: 0, height: 6, borderRadius: '0 0 14px 14px', background: 'linear-gradient(180deg,#26262a,#101012)' }} />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-2 text-zinc-400 text-sm">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#14141a] border border-[#d4af37]/20 text-zinc-300">{t}</span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {p.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-xl border border-[#d4af37]/15 bg-black/30 p-3">
                      <div className="font-serif text-lg gold-text">{m.k}</div>
                      <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-1">{m.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button onClick={() => setOpen(p)} className="btn-gold">Case Study</button>
                  <a href={p.live} className="btn-ghost"><ExternalLink size={14} /> Live Preview</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative max-w-4xl w-full glass gold-border rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(null)} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><X size={16} /></button>
              <img src={open.cover} alt={open.title} className="w-full h-72 object-cover" />
              <div className="p-8">
                <div className="eyebrow">{open.category} · Case Study</div>
                <h3 className="section-heading text-3xl md:text-4xl mt-2">{open.title}</h3>
                <p className="mt-4 text-zinc-300">{open.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {open.tech.map((t) => (<span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#14141a] border border-[#d4af37]/25 text-zinc-200">{t}</span>))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {open.metrics.map((m, idx) => (<div key={idx} className="rounded-xl border border-[#d4af37]/20 bg-black/30 p-4"><div className="font-serif text-2xl gold-text">{m.k}</div><div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-1">{m.v}</div></div>))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
