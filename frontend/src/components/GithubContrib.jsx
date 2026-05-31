import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { githubContributions, profile } from '../mock';

const levelColor = (l) => {
  if (l === 0) return '#121216';
  if (l === 1) return 'rgba(212,175,55,0.25)';
  if (l === 2) return 'rgba(212,175,55,0.45)';
  if (l === 3) return 'rgba(245,215,140,0.7)';
  return 'rgba(245,215,140,1)';
};

const GithubContrib = () => {
  const weeks = 52;
  const total = githubContributions.reduce((a, b) => a + b, 0);
  return (
    <section className="relative py-24">
      <div className="container-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass gold-border rounded-3xl p-6 md:p-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="eyebrow mb-2">— Live Coding Activity</div>
              <h3 className="section-heading text-2xl md:text-3xl">Contribution Graph</h3>
              <p className="text-zinc-400 text-sm mt-1">{total}+ commits in the last year · pushing code almost every day.</p>
            </div>
            <a href={profile.github} className="btn-ghost text-sm"><Github size={14} /> View on GitHub</a>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks}, 12px)` }}>
              {githubContributions.map((l, i) => (
                <div key={i} className="w-3 h-3 rounded-[3px]" style={{ background: levelColor(l) }} title={`Level ${l}`} />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 tracking-widest">
            <div>LESS</div>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((l) => (<div key={l} className="w-3 h-3 rounded-[3px]" style={{ background: levelColor(l) }} />))}
            </div>
            <div>MORE</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContrib;
