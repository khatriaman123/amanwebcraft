import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send, Sparkles } from 'lucide-react';
import { services, budgets, timelines, profile } from '../mock';
import { useToast } from '../hooks/use-toast';

const OrderSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', company: '', service: services[0].title, budget: budgets[2], timeline: timelines[1], brief: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.brief) {
      toast({ title: 'Missing fields', description: 'Please fill name, email & a short brief.' });
      return;
    }
    const orders = JSON.parse(localStorage.getItem('awc_orders') || '[]');
    orders.push({ ...form, id: Date.now().toString(), status: 'new', date: new Date().toISOString().slice(0, 10) });
    localStorage.setItem('awc_orders', JSON.stringify(orders));
    setSubmitted(true);
    toast({ title: 'Request received ✨', description: 'Aman will reach out within 24 hours.' });
    setTimeout(() => setSubmitted(false), 3500);
    setForm({ ...form, name: '', email: '', company: '', brief: '' });
  };

  const quickWhatsApp = () => {
    const msg = `Hi Aman! I want to book a project.%0AService: ${form.service}%0ABudget: ${form.budget}%0ATimeline: ${form.timeline}%0ABrief: ${form.brief || '(not provided)'}`;
    window.open(`https://wa.me/${profile.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section id="order" className="relative py-28">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5">
            <div className="eyebrow mb-4">— Client Order</div>
            <h2 className="section-heading text-4xl md:text-6xl leading-[1.05]">Book your project <span className="gold-text italic">in minutes</span>.</h2>
            <p className="mt-5 text-zinc-400 text-lg">Skip the back-and-forth — fill the form, tell me what you need and I will send a tailored quote within 24 hours.</p>

            <div className="mt-8 space-y-3">
              {['Fixed price · no surprises', 'NDA & contract provided', 'Weekly demos during build', 'Post-launch support included'].map((t) => (
                <div key={t} className="flex items-center gap-3 text-zinc-300">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center"><Check size={14} className="text-[#f5d78c]" /></span>
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl glass gold-border">
              <div className="text-[10px] font-mono tracking-widest text-[#d4af37]">RESPONSE TIME</div>
              <div className="mt-2 font-serif text-3xl">&lt; 24h</div>
              <div className="text-xs text-zinc-400 mt-1">Mon–Sat · 9am to 10pm IST</div>
            </div>
          </motion.div>

          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-7 glass gold-border rounded-3xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">YOUR NAME *</label>
                <input value={form.name} onChange={update('name')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-zinc-100 focus:border-[#d4af37]" placeholder="Rohan Mehta" />
              </div>
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">EMAIL *</label>
                <input type="email" value={form.email} onChange={update('email')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-zinc-100 focus:border-[#d4af37]" placeholder="you@company.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">COMPANY / BRAND</label>
                <input value={form.company} onChange={update('company')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-zinc-100 focus:border-[#d4af37]" placeholder="Kavach Labs" />
              </div>
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">SERVICE</label>
                <select value={form.service} onChange={update('service')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-zinc-100 focus:border-[#d4af37]">
                  {services.map((s) => <option key={s.id} className="bg-[#0a0a0b]">{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">BUDGET</label>
                <select value={form.budget} onChange={update('budget')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-zinc-100 focus:border-[#d4af37]">
                  {budgets.map((b) => <option key={b} className="bg-[#0a0a0b]">{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">TIMELINE</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {timelines.map((t) => (
                    <button type="button" key={t} onClick={() => setForm({ ...form, timeline: t })} className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase border ${form.timeline === t ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-[#d4af37]/30 text-zinc-300 hover:border-[#d4af37]'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400">PROJECT BRIEF *</label>
                <textarea value={form.brief} onChange={update('brief')} rows={4} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-zinc-100 focus:border-[#d4af37] resize-none" placeholder="Tell me about your project, goals, references…" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" className="btn-gold">{submitted ? <><Check size={16} /> Sent!</> : <><Send size={16} /> Request Quote</>}</button>
              <button type="button" onClick={quickWhatsApp} className="btn-ghost"><Sparkles size={16} /> Book on WhatsApp</button>
              <span className="text-xs text-zinc-500">Your info is never shared. No spam.</span>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
