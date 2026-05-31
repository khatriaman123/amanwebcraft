import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Coffee, Briefcase, Award } from 'lucide-react';
import { profile } from '../mock';

const About = () => {
  return (
    <section id="about" className="relative py-28">
      <div className="container-xl grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden gold-border">
              <img src={profile.photo} alt={profile.name} className="w-full h-[520px] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
              <div className="absolute left-5 bottom-5 glass rounded-xl px-4 py-3">
                <div className="text-[10px] font-mono text-[#d4af37] tracking-[0.25em]">BASED IN</div>
                <div className="text-sm text-zinc-100 flex items-center gap-2 mt-1"><MapPin size={14} className="text-[#f5d78c]" /> {profile.location}</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass gold-border rounded-2xl px-5 py-4 floaty">
              <div className="flex items-center gap-3">
                <Award size={22} className="text-[#f5d78c]" />
                <div>
                  <div className="font-serif text-lg">Top 1%</div>
                  <div className="text-[10px] font-mono text-zinc-400 tracking-widest">FREELANCER</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <div className="eyebrow mb-4">— About</div>
          <h2 className="section-heading text-4xl md:text-6xl leading-[1.05]">
            Freelancer. Full Stack Engineer.
            <br />
            <span className="gold-text italic">Digital solution creator.</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
            I partner with founders, agencies and teams to turn raw ideas into polished digital products. Over the last 5+ years I have shipped 80+ production systems — from AI-powered content tools and SEO suites to enterprise hotel & invoicing platforms. I care obsessively about craft, performance and the small details that make software feel premium.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="glass gold-border rounded-2xl p-5">
              <Briefcase className="text-[#f5d78c]" size={22} />
              <div className="mt-3 font-serif text-2xl">{profile.projectsDelivered}+</div>
              <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase">Projects Shipped</div>
            </div>
            <div className="glass gold-border rounded-2xl p-5">
              <Award className="text-[#f5d78c]" size={22} />
              <div className="mt-3 font-serif text-2xl">{profile.clientsHappy}+</div>
              <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase">Happy Clients</div>
            </div>
            <div className="glass gold-border rounded-2xl p-5">
              <Coffee className="text-[#f5d78c]" size={22} />
              <div className="mt-3 font-serif text-2xl">{profile.cupsOfCoffee}+</div>
              <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase">Cups of Coffee</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMessage)}`} target="_blank" rel="noreferrer" className="btn-gold"><Download size={16} /> Download CV</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn ↗</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
