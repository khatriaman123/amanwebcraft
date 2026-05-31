import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, Briefcase, Coffee, Download, CheckCircle2, Zap } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useProfile, whatsappUrl } from '../hooks/useProfile';

const timeline = [
  { year: '2020', title: 'Beginning the Craft', desc: 'Shipped my first freelance website. Fell in love with pixel-perfect PHP/jQuery builds.' },
  { year: '2021', title: 'Going Full Stack', desc: 'Added React + Node to the kit. Built a hotel management system for a multi-property client.' },
  { year: '2022', title: 'SaaS & Tooling', desc: 'Launched an invoice generator and keyword research suite that crossed 10k users.' },
  { year: '2023', title: 'AI-Powered Products', desc: 'Built AI writing tools + renewal platforms. First ₹1 Cr revenue year for a client I served.' },
  { year: '2024', title: 'Premium Agencies', desc: 'Started partnering with design studios to deliver pixel-perfect engineering.' },
  { year: '2025', title: 'Shipping Craft', desc: 'Focused on a handful of premium founders — Awwwards-grade work only.' },
];

const values = [
  { icon: Zap, t: 'Ship Fast, Ship Right', d: 'I over-communicate and ship every week. No ghosting. No surprise timelines.' },
  { icon: CheckCircle2, t: 'Obsessed with Detail', d: 'Micro-interactions, typography, whitespace — every pixel is intentional.' },
  { icon: Award, t: 'Built for Scale', d: 'Systems I ship survive the first 10x. Clean architecture > clever code.' },
];

const AboutPage = () => {
  const profile = useProfile();
  return (
    <main className="pt-16">
      <PageHeader eyebrow="— About Me" title="The person behind" italic="Aman Web Craft." sub="Freelancer. Full stack engineer. Digital solution creator. I partner with founders and agencies to turn ideas into polished digital products." />

      {/* Bio + Image */}
      <section className="py-16">
        <div className="container-xl grid lg:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-5">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden gold-border">
                {profile.photo && <img src={profile.photo} alt={profile.name} className="w-full h-[540px] object-cover grayscale hover:grayscale-0 transition-all duration-700" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                <div className="absolute left-5 bottom-5 glass rounded-xl px-4 py-3">
                  <div className="text-[10px] font-mono text-[#d4af37] tracking-[0.25em]">BASED IN</div>
                  <div className="text-sm text-zinc-100 flex items-center gap-2 mt-1"><MapPin size={14} className="text-[#f5d78c]" /> {profile.location}</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 glass gold-border rounded-2xl px-5 py-4 floaty">
                <div className="flex items-center gap-3"><Award size={22} className="text-[#f5d78c]" /><div><div className="font-serif text-lg">Top 1%</div><div className="text-[10px] font-mono text-zinc-400 tracking-widest">FREELANCER</div></div></div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7">
            <div className="eyebrow mb-3">— My Story</div>
            <h2 className="section-heading text-3xl md:text-5xl leading-[1.05]">A dev who <span className="gold-text italic">cares obsessively</span>.</h2>
            <p className="mt-5 text-zinc-400 text-lg leading-relaxed">Over the last 5+ years I have shipped 80+ production systems — from AI-powered content tools and SEO suites to enterprise hotel & invoicing platforms. I care obsessively about craft, performance and the small details that make software feel premium.</p>
            <p className="mt-4 text-zinc-400 leading-relaxed">When I am not coding I am tweaking my Raycast scripts, writing short essays on building premium products, and studying typography.</p>
            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              <div className="glass gold-border rounded-2xl p-4"><Briefcase className="text-[#f5d78c]" size={20} /><div className="mt-2 font-serif text-xl">{profile.projectsDelivered}+</div><div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">Projects</div></div>
              <div className="glass gold-border rounded-2xl p-4"><Award className="text-[#f5d78c]" size={20} /><div className="mt-2 font-serif text-xl">{profile.clientsHappy}+</div><div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">Clients</div></div>
              <div className="glass gold-border rounded-2xl p-4"><Coffee className="text-[#f5d78c]" size={20} /><div className="mt-2 font-serif text-xl">{profile.cupsOfCoffee}+</div><div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">Coffees</div></div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappUrl(profile)} target="_blank" rel="noreferrer" className="btn-gold"><Download size={16} /> Request CV</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">GitHub ↗</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container-xl">
          <div className="eyebrow mb-3">— Values</div>
          <h2 className="section-heading text-3xl md:text-5xl leading-[1.05] mb-10">How I <span className="gold-text italic">operate</span>.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass gold-border rounded-2xl p-6">
                <v.icon className="text-[#f5d78c]" size={26} />
                <h3 className="mt-4 font-serif text-xl">{v.t}</h3>
                <p className="mt-2 text-zinc-400 text-sm">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container-xl">
          <div className="eyebrow mb-3">— Journey</div>
          <h2 className="section-heading text-3xl md:text-5xl leading-[1.05] mb-12">The last <span className="gold-text italic">5 years</span>.</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div key={t.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="font-serif text-3xl gold-text">{t.year}</div>
                    <div className="font-serif text-xl mt-1">{t.title}</div>
                    <p className="text-zinc-400 text-sm mt-1">{t.desc}</p>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-[#d4af37] ring-4 ring-[#0a0a0b]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
