import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send, Sparkles, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useProfile, whatsappUrl } from '../hooks/useProfile';
import { postOrder, getServices } from '../services/api';
import { useToast } from '../hooks/use-toast';

const BUDGETS = ['< ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000 – ₹5,00,000', '₹5,00,000+'];
const TIMELINES = ['ASAP (Rush)', '1–2 Weeks', '3–4 Weeks', '1–2 Months', '3+ Months'];

const OrderPage = () => {
  const profile = useProfile();
  const { toast } = useToast();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: BUDGETS[2], timeline: TIMELINES[1], brief: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => { getServices().then((s) => { setServices(s); if (s[0]) setForm((f) => ({ ...f, service: s[0].title })); }); }, []);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.brief) { toast({ title: 'Missing fields', description: 'Please fill name, email & a short brief.' }); return; }
    setBusy(true);
    try {
      await postOrder(form);
      toast({ title: 'Request received ✨', description: 'Aman will reach out within 24 hours.' });
      setForm({ ...form, name: '', email: '', company: '', brief: '' });
    } catch (err) {
      toast({ title: 'Something went wrong', description: err.response?.data?.detail || 'Try again later.' });
    } finally { setBusy(false); }
  };

  const waMsg = `Hi Aman! I want to book a project.%0AService: ${form.service}%0ABudget: ${form.budget}%0ATimeline: ${form.timeline}%0ABrief: ${form.brief || '(not provided)'}`;
  const waHref = `https://wa.me/${profile.whatsapp}?text=${waMsg}`;

  return (
    <main className="pt-16">
      <PageHeader eyebrow="— Client Order" title="Book your project" italic="in minutes." sub="Skip the back-and-forth. Share the scope, pick a budget + timeline, and I will send a tailored quote within 24 hours." />

      <section className="pb-24">
        <div className="container-xl grid lg:grid-cols-12 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5 space-y-4">
            {['Fixed price · no surprises', 'NDA & contract provided', 'Weekly demos during build', 'Post-launch support included'].map((t) => (
              <div key={t} className="flex items-center gap-3 text-zinc-300">
                <span className="w-7 h-7 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center"><Check size={14} className="text-[#f5d78c]" /></span>
                {t}
              </div>
            ))}
            <div className="mt-6 p-5 rounded-2xl glass gold-border">
              <div className="text-[10px] font-mono tracking-widest text-[#d4af37]">RESPONSE TIME</div>
              <div className="mt-2 font-serif text-3xl">&lt; 24h</div>
              <div className="text-xs text-zinc-400 mt-1">Mon–Sat · 9am to 10pm IST</div>
            </div>
            <a href={waHref} target="_blank" rel="noreferrer" className="btn-ghost w-fit"><MessageCircle size={14} /> Book on WhatsApp</a>
          </motion.div>

          <motion.form onSubmit={submit} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-7 glass gold-border rounded-3xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-[10px] font-mono tracking-widest text-zinc-400">YOUR NAME *</label><input value={form.name} onChange={update('name')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" placeholder="Rohan Mehta" /></div>
              <div><label className="text-[10px] font-mono tracking-widest text-zinc-400">EMAIL *</label><input type="email" value={form.email} onChange={update('email')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" placeholder="you@company.com" /></div>
              <div className="sm:col-span-2"><label className="text-[10px] font-mono tracking-widest text-zinc-400">COMPANY / BRAND</label><input value={form.company} onChange={update('company')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" placeholder="Kavach Labs" /></div>
              <div><label className="text-[10px] font-mono tracking-widest text-zinc-400">SERVICE</label>
                <select value={form.service} onChange={update('service')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]">
                  {services.map((s) => <option key={s.id} className="bg-[#0a0a0b]">{s.title}</option>)}
                </select>
              </div>
              <div><label className="text-[10px] font-mono tracking-widest text-zinc-400">BUDGET</label>
                <select value={form.budget} onChange={update('budget')} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]">
                  {BUDGETS.map((b) => <option key={b} className="bg-[#0a0a0b]">{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2"><label className="text-[10px] font-mono tracking-widest text-zinc-400">TIMELINE</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIMELINES.map((t) => (<button type="button" key={t} onClick={() => setForm({ ...form, timeline: t })} className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase border ${form.timeline === t ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-[#d4af37]/30 text-zinc-300 hover:border-[#d4af37]'}`}>{t}</button>))}
                </div>
              </div>
              <div className="sm:col-span-2"><label className="text-[10px] font-mono tracking-widest text-zinc-400">PROJECT BRIEF *</label><textarea value={form.brief} onChange={update('brief')} rows={4} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37] resize-none" placeholder="Tell me about your project, goals, references…" /></div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={busy} className="btn-gold">{busy ? 'Sending…' : <><Send size={16} /> Request Quote</>}</button>
              <a href={waHref} target="_blank" rel="noreferrer" className="btn-ghost"><Sparkles size={16} /> Book on WhatsApp</a>
              <span className="text-xs text-zinc-500">Your info is never shared. No spam.</span>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default OrderPage;
