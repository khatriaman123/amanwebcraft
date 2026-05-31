import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ArrowUpRight, Star } from 'lucide-react';
import Hero from '../components/Hero';
import Loading from '../components/Loading';
import { getServices, getProjects, getTestimonials } from '../services/api';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [s, p, t] = await Promise.all([getServices(), getProjects(), getTestimonials()]);
        setServices(s.slice(0, 6));
        setProjects(p.slice(0, 4));
        setTestimonials(t.slice(0, 3));
      } finally { setReady(true); }
    })();
  }, []);

  return (
    <main>
      <Hero />

      {/* Teaser: What I Do (Services) */}
      <section className="py-24">
        <div className="container-xl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="eyebrow mb-3">— What I Do</div>
              <h2 className="section-heading text-4xl md:text-5xl leading-[1.05]">A studio-grade <span className="gold-text italic">offering</span>.</h2>
            </div>
            <Link to="/services" className="btn-ghost text-sm">All services <ArrowUpRight size={14} /></Link>
          </div>
          {!ready ? <Loading /> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 6) * 0.05 }} className="group glass gold-border rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#d4af37] tracking-[0.25em]">0{i + 1}</span>
                    <Sparkles size={16} className="text-[#f5d78c] opacity-60 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl">{s.title}</h3>
                  <p className="mt-1 text-zinc-400 text-sm line-clamp-2">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[#0c0c0f]/60 to-transparent">
        <div className="container-xl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="eyebrow mb-3">— Featured Work</div>
              <h2 className="section-heading text-4xl md:text-5xl leading-[1.05]">Selected <span className="gold-text italic">case studies</span>.</h2>
            </div>
            <Link to="/projects" className="btn-ghost text-sm">All projects <ArrowUpRight size={14} /></Link>
          </div>
          {!ready ? <Loading /> : (
            <div className="grid md:grid-cols-2 gap-5">
              {projects.map((p, i) => (
                <motion.article key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="group glass gold-border rounded-3xl overflow-hidden">
                  <Link to="/projects">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] font-mono text-[#f5d78c] tracking-[0.25em]">{p.category.toUpperCase()}</div>
                      <h3 className="mt-2 font-serif text-2xl">{p.title}</h3>
                      <p className="mt-1 text-zinc-400 text-sm line-clamp-2">{p.summary}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials teaser */}
      {testimonials.length > 0 && (
        <section className="py-24">
          <div className="container-xl">
            <div className="eyebrow mb-3">— Words from clients</div>
            <h2 className="section-heading text-4xl md:text-5xl leading-[1.05] mb-10">Trusted by founders <span className="gold-text italic">worldwide</span>.</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div key={t.id} className="glass gold-border rounded-2xl p-6">
                  <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={14} className="text-[#f5d78c] fill-[#f5d78c]" />))}</div>
                  <p className="font-serif text-lg leading-snug text-zinc-100">“{t.quote}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f5d78c] to-[#8a7429] flex items-center justify-center font-serif text-black">{t.name.charAt(0)}</div>
                    <div><div className="font-serif text-sm">{t.name}</div><div className="text-[10px] font-mono text-zinc-500 tracking-widest">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="py-24">
        <div className="container-xl">
          <div className="relative glass gold-border rounded-3xl p-10 md:p-16 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#d4af37]/15 blur-[120px]" />
            <div className="relative grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="eyebrow mb-3">— Ready?</div>
                <h2 className="section-heading text-4xl md:text-6xl leading-[1.05]">Let’s build something <span className="gold-text italic">unforgettable</span>.</h2>
                <p className="mt-5 text-zinc-300 text-lg max-w-xl">Book a discovery call or drop your project brief — I reply within 24 hours.</p>
              </div>
              <div className="lg:col-span-4 flex flex-col items-start gap-3">
                <Link to="/order" className="btn-gold">Start Your Project <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn-ghost">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
