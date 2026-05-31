import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Loading from '../components/Loading';
import { getServices } from '../services/api';
import { useProfile, whatsappUrl } from '../hooks/useProfile';

const packages = [
  { name: 'Starter', price: 'from ₹25k', desc: 'Single-page websites, business cards, flyers.', features: ['1 landing page', 'Responsive design', 'Basic SEO', '2 revisions'] },
  { name: 'Pro', price: 'from ₹75k', desc: 'Multi-page sites, admin dashboards, small SaaS.', features: ['Up to 6 pages / screens', 'Admin + auth', 'Integrations', 'Unlimited revisions'], featured: true },
  { name: 'Enterprise', price: 'from ₹2L+', desc: 'Full SaaS, marketplaces, multi-tenant apps.', features: ['Dedicated sprint', 'DevOps & monitoring', 'Post-launch support', 'NDA + contract'] },
];

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [ready, setReady] = useState(false);
  const profile = useProfile();

  useEffect(() => { getServices().then(setServices).finally(() => setReady(true)); }, []);

  return (
    <main className="pt-16">
      <PageHeader eyebrow="— Services" title="Premium services," italic="crafted end-to-end." sub="From custom websites to AI tooling and SaaS products — a studio-grade offering with a single point of contact.">
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/order" className="btn-gold">Get a Quote <ArrowUpRight size={14} /></Link>
          <a href={whatsappUrl(profile)} target="_blank" rel="noreferrer" className="btn-ghost"><MessageCircle size={14} /> WhatsApp Chat</a>
        </div>
      </PageHeader>

      {/* Grid */}
      <section className="py-10">
        <div className="container-xl">
          {!ready ? <Loading /> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => {
                const Icon = Icons[s.icon] || Icons.Star;
                const num = String(i + 1).padStart(2, '0');
                return (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 6) * 0.05 }} className="group relative glass gold-border rounded-2xl p-6 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#d4af37]/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a1d] to-[#0a0a0b] border border-[#d4af37]/30 flex items-center justify-center"><Icon size={22} className="text-[#f5d78c]" /></div>
                      <span className="text-[10px] font-mono text-zinc-500 tracking-[0.25em]">{num}</span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl leading-snug">{s.title}</h3>
                    <p className="mt-2 text-zinc-400 text-sm">{s.desc}</p>
                    <Link to="/order" className="mt-5 inline-flex items-center gap-2 text-[#f5d78c] text-sm">Get a quote <ArrowUpRight size={14} /></Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="container-xl">
          <div className="eyebrow mb-3">— Pricing packages</div>
          <h2 className="section-heading text-3xl md:text-5xl leading-[1.05] mb-10">Flexible ways to <span className="gold-text italic">work together</span>.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((p) => (
              <div key={p.name} className={`relative rounded-2xl p-7 ${p.featured ? 'bg-gradient-to-b from-[#1a1608] to-[#0a0a0b] border border-[#d4af37]/60' : 'glass gold-border'}`}>
                {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] px-3 py-1 rounded-full bg-[#d4af37] text-black">MOST POPULAR</div>}
                <div className="font-serif text-2xl">{p.name}</div>
                <div className="mt-2 font-serif text-4xl gold-text">{p.price}</div>
                <p className="mt-2 text-zinc-400 text-sm">{p.desc}</p>
                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm text-zinc-300"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d4af37]" /> {f}</li>))}
                </ul>
                <Link to="/order" className={p.featured ? 'btn-gold mt-6 w-full justify-center' : 'btn-ghost mt-6 w-full justify-center'}>Choose {p.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
