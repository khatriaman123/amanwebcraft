import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { profile } from '../mock';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return toast({ title: 'Fill all fields', description: 'Name, email and message are required.' });
    const list = JSON.parse(localStorage.getItem('awc_messages') || '[]');
    list.push({ ...form, id: Date.now().toString(), date: new Date().toISOString().slice(0, 10) });
    localStorage.setItem('awc_messages', JSON.stringify(list));
    toast({ title: 'Message sent ✨', description: 'I will reply within 24 hours.' });
    setForm({ name: '', email: '', msg: '' });
  };

  const waUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMessage)}`;

  return (
    <section id="contact" className="relative py-28">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5">
            <div className="eyebrow mb-4">— Contact</div>
            <h2 className="section-heading text-4xl md:text-6xl leading-[1.05]">Let’s build something <span className="gold-text italic">unforgettable</span>.</h2>
            <p className="mt-5 text-zinc-400 text-lg">Have a project in mind? Drop a note, ping on WhatsApp or just say hi — I read every message.</p>

            <div className="mt-8 space-y-4">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 glass gold-border rounded-2xl p-4 hover:border-[#d4af37]">
                <span className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><Mail size={18} /></span>
                <div><div className="text-xs font-mono text-zinc-400 tracking-widest">EMAIL</div><div className="text-zinc-100">{profile.email}</div></div>
              </a>
              <a href={waUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 glass gold-border rounded-2xl p-4 hover:border-[#d4af37]">
                <span className="w-10 h-10 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]"><MessageCircle size={18} /></span>
                <div><div className="text-xs font-mono text-zinc-400 tracking-widest">WHATSAPP</div><div className="text-zinc-100">{profile.phone}</div></div>
              </a>
              <div className="flex items-center gap-4 glass gold-border rounded-2xl p-4">
                <span className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><MapPin size={18} /></span>
                <div><div className="text-xs font-mono text-zinc-400 tracking-widest">LOCATION</div><div className="text-zinc-100">{profile.location}</div></div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a href={profile.github} className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c] hover:border-[#d4af37]"><Github size={18} /></a>
              <a href={profile.linkedin} className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c] hover:border-[#d4af37]"><Linkedin size={18} /></a>
              <a href={profile.twitter} className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c] hover:border-[#d4af37]"><Twitter size={18} /></a>
            </div>
          </motion.div>

          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-7 glass gold-border rounded-3xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">NAME</label>
                <input value={form.name} onChange={update('name')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" placeholder="Your name" />
              </div>
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">EMAIL</label>
                <input type="email" value={form.email} onChange={update('email')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" placeholder="you@company.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">MESSAGE</label>
                <textarea rows={6} value={form.msg} onChange={update('msg')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37] resize-none" placeholder="What are you working on?" />
              </div>
            </div>
            <div className="mt-5 flex gap-3 flex-wrap">
              <button type="submit" className="btn-gold"><Send size={16} /> Send Message</button>
              <a href={waUrl} target="_blank" rel="noreferrer" className="btn-ghost"><MessageCircle size={16} /> WhatsApp Instead</a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
