import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const Field = ({ label, value, onChange, type = 'text', as = 'input', ...rest }) => (
  <div>
    <label className="text-[10px] font-mono tracking-widest text-zinc-400">{label}</label>
    {as === 'textarea' ? (
      <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} rows={4} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37] resize-none" {...rest} />
    ) : (
      <input type={type} value={value ?? ''} onChange={(e) => onChange(type === 'number' ? Number(e.target.value || 0) : e.target.value)} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" {...rest} />
    )}
  </div>
);

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const CrudModal = ({ type, item, onClose, onSave }) => {
  const [data, setData] = useState(() => {
    const base = item || {};
    if (type === 'skills') return { name: '', level: 80, category: 'Frontend', order: 0, ...base };
    if (type === 'services') return { title: '', desc: '', icon: 'Star', order: 0, ...base };
    if (type === 'projects') return { title: '', category: 'Full Stack', tech: [], summary: '', cover: '', live: '#', metrics: [], order: 0, ...base };
    if (type === 'testimonials') return { name: '', role: '', quote: '', rating: 5, ...base };
    if (type === 'blogs') return { slug: '', title: '', excerpt: '', content: '', cover: '', tag: 'Notes', read: '5 min', date: new Date().toISOString().slice(0, 10), likes: 0, comments: [], order: 0, ...base };
    if (type === 'profile') return base;
    return base;
  });

  const set = (k) => (v) => setData({ ...data, [k]: v });
  const setTechList = (v) => setData({ ...data, tech: v.split(',').map((x) => x.trim()).filter(Boolean) });

  const handleSave = () => {
    let out = { ...data };
    if (type === 'blogs' && !out.slug && out.title) out.slug = slugify(out.title);
    onSave(out);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-2xl my-8 glass gold-border rounded-3xl p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d78c]"><X size={16} /></button>
        <div className="eyebrow mb-2">— {item?.id ? 'Edit' : 'New'} {type}</div>
        <h3 className="section-heading text-2xl md:text-3xl capitalize">{item?.id ? 'Edit' : 'Create'} {type.slice(0, -1)}</h3>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {type === 'skills' && (<>
            <Field label="NAME" value={data.name} onChange={set('name')} />
            <Field label="LEVEL (0-100)" type="number" value={data.level} onChange={set('level')} />
            <Field label="CATEGORY" value={data.category} onChange={set('category')} />
            <Field label="ORDER" type="number" value={data.order} onChange={set('order')} />
          </>)}

          {type === 'services' && (<>
            <Field label="TITLE" value={data.title} onChange={set('title')} />
            <Field label="ICON (lucide-react name)" value={data.icon} onChange={set('icon')} placeholder="Globe / Layers / Sparkles" />
            <div className="sm:col-span-2"><Field label="DESCRIPTION" value={data.desc} onChange={set('desc')} as="textarea" /></div>
            <Field label="ORDER" type="number" value={data.order} onChange={set('order')} />
          </>)}

          {type === 'projects' && (<>
            <Field label="TITLE" value={data.title} onChange={set('title')} />
            <Field label="CATEGORY" value={data.category} onChange={set('category')} />
            <div className="sm:col-span-2"><Field label="SUMMARY" value={data.summary} onChange={set('summary')} as="textarea" /></div>
            <div className="sm:col-span-2"><Field label="COVER URL" value={data.cover} onChange={set('cover')} /></div>
            <Field label="LIVE URL" value={data.live} onChange={set('live')} />
            <Field label="TECH (comma separated)" value={(data.tech || []).join(', ')} onChange={setTechList} />
            <div className="sm:col-span-2">
              <label className="text-[10px] font-mono tracking-widest text-zinc-400">METRICS (one per line as k|v)</label>
              <textarea rows={3} value={(data.metrics || []).map((m) => `${m.k}|${m.v}`).join('\n')} onChange={(e) => setData({ ...data, metrics: e.target.value.split('\n').filter(Boolean).map((l) => { const [k, v] = l.split('|'); return { k: k?.trim() || '', v: v?.trim() || '' }; }) })} className="mt-2 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37] resize-none font-mono text-sm" placeholder="2.1M|Monthly Reads" />
            </div>
            <Field label="ORDER" type="number" value={data.order} onChange={set('order')} />
          </>)}

          {type === 'testimonials' && (<>
            <Field label="NAME" value={data.name} onChange={set('name')} />
            <Field label="ROLE" value={data.role} onChange={set('role')} />
            <div className="sm:col-span-2"><Field label="QUOTE" value={data.quote} onChange={set('quote')} as="textarea" /></div>
            <Field label="RATING (1-5)" type="number" value={data.rating} onChange={set('rating')} />
          </>)}

          {type === 'blogs' && (<>
            <Field label="TITLE" value={data.title} onChange={set('title')} />
            <Field label="SLUG" value={data.slug} onChange={set('slug')} placeholder="auto-from-title" />
            <Field label="TAG" value={data.tag} onChange={set('tag')} />
            <Field label="READ TIME" value={data.read} onChange={set('read')} />
            <Field label="DATE (YYYY-MM-DD)" value={data.date} onChange={set('date')} />
            <div className="sm:col-span-2"><Field label="COVER URL" value={data.cover} onChange={set('cover')} /></div>
            <div className="sm:col-span-2"><Field label="EXCERPT" value={data.excerpt} onChange={set('excerpt')} as="textarea" /></div>
            <div className="sm:col-span-2"><Field label="CONTENT" value={data.content} onChange={set('content')} as="textarea" /></div>
            <Field label="LIKES" type="number" value={data.likes} onChange={set('likes')} />
            <Field label="ORDER" type="number" value={data.order} onChange={set('order')} />
          </>)}

          {type === 'profile' && (<>
            <Field label="NAME" value={data.name} onChange={set('name')} />
            <Field label="TAGLINE" value={data.tagline} onChange={set('tagline')} />
            <div className="sm:col-span-2"><Field label="HEADLINE" value={data.headline} onChange={set('headline')} /></div>
            <div className="sm:col-span-2"><Field label="INTRO (sub)" value={data.sub} onChange={set('sub')} as="textarea" /></div>
            <Field label="EMAIL" value={data.email} onChange={set('email')} />
            <Field label="PHONE" value={data.phone} onChange={set('phone')} />
            <Field label="WHATSAPP (no + sign)" value={data.whatsapp} onChange={set('whatsapp')} />
            <div className="sm:col-span-2"><Field label="DEFAULT WHATSAPP MSG" value={data.whatsappMessage} onChange={set('whatsappMessage')} /></div>
            <Field label="LOCATION" value={data.location} onChange={set('location')} />
            <Field label="EXPERIENCE" value={data.experience} onChange={set('experience')} />
            <Field label="PROJECTS DELIVERED" type="number" value={data.projectsDelivered} onChange={set('projectsDelivered')} />
            <Field label="CLIENTS HAPPY" type="number" value={data.clientsHappy} onChange={set('clientsHappy')} />
            <Field label="CUPS OF COFFEE" type="number" value={data.cupsOfCoffee} onChange={set('cupsOfCoffee')} />
            <Field label="GITHUB URL" value={data.github} onChange={set('github')} />
            <Field label="LINKEDIN URL" value={data.linkedin} onChange={set('linkedin')} />
            <Field label="TWITTER URL" value={data.twitter} onChange={set('twitter')} />
            <div className="sm:col-span-2"><Field label="PHOTO URL" value={data.photo} onChange={set('photo')} /></div>
          </>)}
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={handleSave} className="btn-gold"><Save size={14} /> Save</button>
        </div>
      </motion.div>
    </div>
  );
};

export default CrudModal;
