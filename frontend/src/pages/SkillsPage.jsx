import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import Loading from '../components/Loading';
import { getSkills } from '../services/api';
import TerminalSection from '../components/Terminal';
import GithubContrib from '../components/GithubContrib';

const Bar = ({ name, level, category, idx }) => {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(level), 120 + idx * 70); return () => clearTimeout(t); }, [level, idx]);
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-xl">{name}</span>
          <span className="text-[10px] font-mono text-zinc-500 tracking-widest">{category}</span>
        </div>
        <span className="font-mono text-sm text-[#f5d78c] tabular-nums">{w}%</span>
      </div>
      <div className="h-[6px] rounded-full bg-[#14141a] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#f5d78c] via-[#d4af37] to-[#8a7429] shimmer" style={{ width: `${w}%`, transition: 'width 1.2s cubic-bezier(.2,.7,.2,1)' }} />
      </div>
    </div>
  );
};

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { getSkills().then((d) => setSkills(d)).finally(() => setReady(true)); }, []);

  const byCat = skills.reduce((acc, s) => { (acc[s.category] = acc[s.category] || []).push(s); return acc; }, {});

  return (
    <main className="pt-16">
      <PageHeader eyebrow="— Skills" title="Tools of the" italic="trade." sub="A battle-tested stack I reach for daily — from frontends to databases to cloud infra." />

      <section className="py-16">
        <div className="container-xl">
          {!ready ? <Loading /> : Object.entries(byCat).map(([cat, list]) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[1px] bg-[#d4af37]" />
                <h3 className="eyebrow">{cat}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
                {list.map((s, i) => (<Bar key={s.id} {...s} idx={i} />))}
              </div>
            </motion.div>
          ))}

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['Performance', 'Accessibility', 'Clean Code', 'SEO', 'Security', 'DevOps'].map((t) => (
              <div key={t} className="glass gold-border rounded-xl px-4 py-3 text-sm text-zinc-300 text-center">{t}</div>
            ))}
          </div>
        </div>
      </section>

      <TerminalSection />
      <GithubContrib />
    </main>
  );
};

export default SkillsPage;
