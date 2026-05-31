import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Loading from '../components/Loading';
import { getBlogs } from '../services/api';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => { getBlogs().then(setPosts).finally(() => setReady(true)); }, []);
  const tags = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))];
  const list = filter === 'All' ? posts : posts.filter((p) => p.tag === filter);

  return (
    <main className="pt-16">
      <PageHeader eyebrow="— Journal" title="Notes from the" italic="craft." sub="Essays on building premium web products, shipping AI tools and the craft behind a polished developer brand.">
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (<button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase border ${filter === t ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-[#d4af37]/30 text-zinc-300 hover:border-[#d4af37]'}`}>{t}</button>))}
        </div>
      </PageHeader>

      <section className="pb-24">
        <div className="container-xl">
          {!ready ? <Loading /> : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p, i) => (
                <motion.article key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="group glass gold-border rounded-3xl overflow-hidden">
                  <Link to={`/blog/${p.slug}`}>
                    <div className="aspect-[16/10] overflow-hidden"><img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 tracking-[0.25em] uppercase"><span className="text-[#d4af37]">{p.tag}</span><span>·</span><Clock size={11} /> {p.read}</div>
                      <h2 className="mt-3 font-serif text-2xl leading-snug group-hover:text-[#f5d78c] transition-colors">{p.title}</h2>
                      <p className="mt-2 text-zinc-400 text-sm line-clamp-2">{p.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Heart size={12} /> {p.likes || 0}</span>
                          <span className="flex items-center gap-1"><MessageCircle size={12} /> {(p.comments || []).length}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[#f5d78c]">Read <ArrowRight size={12} /></span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
