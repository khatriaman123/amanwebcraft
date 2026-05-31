import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useProfile, whatsappUrl } from '../hooks/useProfile';
import { postMessage } from '../services/api';
import { useToast } from '../hooks/use-toast';

const ContactPage = () => {
  const profile = useProfile();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [busy, setBusy] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return toast({ title: 'Fill all fields' });
    setBusy(true);
    try {
      await postMessage(form);
      toast({ title: 'Message sent ✨', description: 'I will reply within 24 hours.' });
      setForm({ name: '', email: '', msg: '' });
    } catch (err) {
      toast({ title: 'Failed', description: err.response?.data?.detail || 'Try again.' });
    } finally { setBusy(false); }
  };
  const wa = whatsappUrl(profile);
  return (
    <main className="pt-16">
      <PageHeader eyebrow="— Contact" title="Let’s build something" italic="unforgettable." sub="Drop a note, ping me on WhatsApp, or just say hi — I read every message." />

      <section className="pb-24">
        <div className="container-xl grid lg:grid-cols-12 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5 space-y-4">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-4 glass gold-border rounded-2xl p-4 hover:border-[#d4af37]"><span className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><Mail size={18} /></span><div><div className="text-xs font-mono text-zinc-400 tracking-widest">EMAIL</div><div className="text-zinc-100">{profile.email}</div></div></a>
            <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-4 glass gold-border rounded-2xl p-4 hover:border-[#d4af37]"><span className="w-10 h-10 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]"><MessageCircle size={18} /></span><div><div className="text-xs font-mono text-zinc-400 tracking-widest">WHATSAPP</div><div className="text-zinc-100">{profile.phone}</div></div></a>
            <div className="flex items-center gap-4 glass gold-border rounded-2xl p-4"><span className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><MapPin size={18} /></span><div><div className="text-xs font-mono text-zinc-400 tracking-widest">LOCATION</div><div className="text-zinc-100">{profile.location}</div></div></div>
            <div className="flex gap-3 pt-2">
              <a href={profile.github} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><Github size={18} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><Linkedin size={18} /></a>
              <a href={profile.twitter} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><Twitter size={18} /></a>
            </div>
          </motion.div>
          <motion.form onSubmit={submit} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-7 glass gold-border rounded-3xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-[10px] font-mono tracking-widest text-zinc-400">NAME</label><input value={form.name} onChange={update('name')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" placeholder="Your name" /></div>
              <div><label className="text-[10px] font-mono tracking-widest text-zinc-400">EMAIL</label><input type="email" value={form.email} onChange={update('email')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" placeholder="you@company.com" /></div>
              <div className="sm:col-span-2"><label className="text-[10px] font-mono tracking-widest text-zinc-400">MESSAGE</label><textarea rows={6} value={form.msg} onChange={update('msg')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37] resize-none" placeholder="What are you working on?" /></div>
            </div>
            <div className="mt-5 flex gap-3 flex-wrap">
              <button type="submit" disabled={busy} className="btn-gold"><Send size={16} /> {busy ? 'Sending…' : 'Send Message'}</button>
              <a href={wa} target="_blank" rel="noreferrer" className="btn-ghost"><MessageCircle size={16} /> WhatsApp Instead</a>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
