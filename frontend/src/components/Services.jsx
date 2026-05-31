import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { services, profile } from '../mock';
import { ArrowUpRight } from 'lucide-react';

const Services = () => {
  return (
    <section id="services" className="relative py-28">
      <div className="container-xl">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="eyebrow mb-4">— Services</div>
            <h2 className="section-heading text-4xl md:text-6xl leading-[1.05] max-w-2xl">Premium services, crafted <span className="gold-text italic">end-to-end</span>.</h2>
          </div>
          <a href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMessage)}`} target="_blank" rel="noreferrer" className="btn-ghost">Discuss on WhatsApp <ArrowUpRight size={16} /></a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Star;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="group relative glass gold-border rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#d4af37]/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a1d] to-[#0a0a0b] border border-[#d4af37]/30 flex items-center justify-center">
                    <Icon size={22} className="text-[#f5d78c]" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 tracking-[0.25em]">0{i + 1 < 10 ? 0 : ''}{i + 1}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl leading-snug">{s.title}</h3>
                <p className="mt-2 text-zinc-400 text-sm">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-[#f5d78c] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Get a quote <ArrowUpRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
