import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Sparkles, PhoneCall } from 'lucide-react';
import ParticleBG from './ParticleBG';
import { useProfile, whatsappUrl } from '../hooks/useProfile';

const roles = ['Full Stack Developer', 'PHP & React Expert', 'AI Tools Builder', 'Digital Solution Architect'];

const Hero = () => {
  const profile = useProfile();
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const current = roles[roleIdx];
    setTyped('');
    const interval = setInterval(() => {
      i++;
      setTyped(current.slice(0, i));
      if (i >= current.length) {
        clearInterval(interval);
        setTimeout(() => setRoleIdx((idx) => (idx + 1) % roles.length), 1800);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [roleIdx]);

  return (
    <section className="relative min-h-screen pt-28 overflow-hidden">
      <ParticleBG />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-[#d4af37]/10 blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#8a7429]/10 blur-[120px]" />
      </div>

      <div className="relative container-xl grid lg:grid-cols-12 gap-10 items-center py-10">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-[#d4af37]" />
            <span className="eyebrow">Portfolio · 2025 Edition</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="section-heading text-5xl md:text-7xl lg:text-[88px] leading-[0.95]">
            Crafting <span className="gold-text italic">premium</span><br />
            web experiences,<br />
            <span className="text-zinc-300">one pixel at a time.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-6 flex items-center gap-3 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-zinc-300 text-sm">I am </span>
            <span className="px-3 py-1 rounded-full border border-[#d4af37]/40 text-[#f5d78c] text-sm">{typed}<span className="ml-0.5 animate-pulse">|</span></span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-6 max-w-xl text-zinc-400 text-lg">
            {profile.sub || 'I build modern web apps, admin dashboards and digital products that help founders ship faster.'}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/order" className="btn-gold"><Rocket size={16} /> Start Your Project <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-ghost"><PhoneCall size={16} /> Hire Me</Link>
            <Link to="/projects" className="text-sm text-zinc-300 hover:text-[#f5d78c] underline underline-offset-4 decoration-[#d4af37]/40">View Projects →</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-12 grid grid-cols-3 max-w-md gap-6">
            <div><div className="font-serif text-3xl gold-text">{profile.projectsDelivered}+</div><div className="text-xs text-zinc-500 font-mono mt-1 tracking-widest uppercase">Projects</div></div>
            <div><div className="font-serif text-3xl gold-text">{profile.clientsHappy}+</div><div className="text-xs text-zinc-500 font-mono mt-1 tracking-widest uppercase">Clients</div></div>
            <div><div className="font-serif text-3xl gold-text">{profile.experience}</div><div className="text-xs text-zinc-500 font-mono mt-1 tracking-widest uppercase">Experience</div></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="lg:col-span-5 flex items-center justify-center">
          <div className="relative">
            <div className="cube-scene floaty">
              <div className="cube">
                <div className="cube-face front">&lt;/&gt; PHP</div>
                <div className="cube-face back">&lt;/&gt; React</div>
                <div className="cube-face right">&lt;/&gt; Node</div>
                <div className="cube-face left">&lt;/&gt; MySQL</div>
                <div className="cube-face top"><Sparkles size={24} className="text-[#f5d78c]" /></div>
                <div className="cube-face bottom">AMAN</div>
              </div>
            </div>
            <div className="absolute -left-10 top-10 glass gold-border rounded-2xl p-4 w-56 floaty" style={{ animationDelay: '1s' }}>
              <div className="text-[10px] font-mono text-[#d4af37] tracking-widest">// CURRENT FOCUS</div>
              <div className="text-sm text-zinc-200 mt-1">Shipping AI SaaS & premium admin UIs</div>
            </div>
            <div className="absolute -right-6 -bottom-6 glass gold-border rounded-2xl p-4 floaty" style={{ animationDelay: '2s' }}>
              <div className="text-[10px] font-mono text-[#d4af37] tracking-widest">AVAILABILITY</div>
              <div className="text-sm text-zinc-200 mt-1 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" /> Open for Q3</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-8 overflow-hidden border-y border-[#d4af37]/15 py-5">
        <div className="marquee-track whitespace-nowrap font-serif text-3xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="mx-8 inline-flex items-center gap-8">
              <span className="text-zinc-300">React</span><span className="text-[#d4af37]">✦</span>
              <span className="text-zinc-300">PHP</span><span className="text-[#d4af37]">✦</span>
              <span className="text-zinc-300">MySQL</span><span className="text-[#d4af37]">✦</span>
              <span className="text-zinc-300">MongoDB</span><span className="text-[#d4af37]">✦</span>
              <span className="text-zinc-300">AI Tools</span><span className="text-[#d4af37]">✦</span>
              <span className="text-zinc-300">Dashboards</span><span className="text-[#d4af37]">✦</span>
              <span className="text-zinc-300">SaaS</span><span className="text-[#d4af37]">✦</span>
              <span className="text-zinc-300">Branding</span><span className="text-[#d4af37]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
