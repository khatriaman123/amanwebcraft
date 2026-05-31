import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TermIcon } from 'lucide-react';
import { terminalLines } from '../mock';

const TerminalSection = () => {
  const [lines, setLines] = useState([]);
  const [running, setRunning] = useState(false);
  const endRef = useRef(null);

  const run = async () => {
    if (running) return;
    setRunning(true);
    setLines([]);
    for (let i = 0; i < terminalLines.length; i++) {
      const l = terminalLines[i];
      // Type cmd
      for (let c = 0; c <= l.cmd.length; c++) {
        await new Promise((r) => setTimeout(r, 35));
        setLines((prev) => {
          const next = [...prev];
          next[i] = { cmd: l.cmd.slice(0, c), out: '' };
          return next;
        });
      }
      await new Promise((r) => setTimeout(r, 350));
      setLines((prev) => {
        const next = [...prev];
        next[i] = { cmd: l.cmd, out: l.out };
        return next;
      });
      await new Promise((r) => setTimeout(r, 400));
    }
    setRunning(false);
  };

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    if (endRef.current) io.observe(endRef.current);
    return () => io.disconnect();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="relative py-24">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5">
            <div className="eyebrow mb-4">— Under The Hood</div>
            <h2 className="section-heading text-4xl md:text-5xl leading-[1.05]">A developer who lives in the <span className="gold-text italic">terminal</span>.</h2>
            <p className="mt-5 text-zinc-400">From deploy pipelines to quick scripts — the CLI is my second home. Here is a peek at my daily rituals.</p>
            <button onClick={run} disabled={running} className="mt-6 btn-ghost">{running ? 'Running…' : 'Replay'}</button>
          </motion.div>

          <motion.div ref={endRef} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7">
            <div className="glass gold-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#d4af37]/15 bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 tracking-widest">
                  <TermIcon size={12} /> aman@craft — zsh
                </div>
                <div className="w-12" />
              </div>
              <div className="font-mono text-sm p-5 bg-black/60 min-h-[320px]">
                {lines.map((l, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-zinc-200"><span className="text-[#f5d78c]">aman@craft</span><span className="text-zinc-500">:~$ </span>{l?.cmd}</div>
                    {l?.out && <div className="text-zinc-400 pl-3">{l.out}</div>}
                  </div>
                ))}
                <div className="flex items-center text-zinc-200"><span className="text-[#f5d78c]">aman@craft</span><span className="text-zinc-500">:~$ </span><span className="ml-1 w-2 h-4 bg-[#f5d78c] animate-pulse" /></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;
