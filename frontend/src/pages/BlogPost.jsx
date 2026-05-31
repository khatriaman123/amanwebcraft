import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ArrowLeft, Send, CornerDownRight } from 'lucide-react';
import { getBlog, postComment, postReply, likeBlog } from '../services/api';
import { useToast } from '../hooks/use-toast';
import Loading from '../components/Loading';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState(null);
  const [ready, setReady] = useState(false);
  const [liked, setLiked] = useState(false);
  const [form, setForm] = useState({ name: '', text: '' });
  const [replyTo, setReplyTo] = useState(null);
  const [replyForm, setReplyForm] = useState({ name: '', text: '' });

  useEffect(() => {
    (async () => {
      try {
        const p = await getBlog(slug);
        setPost(p);
        setLiked(localStorage.getItem(`awc_liked_${p.id}`) === '1');
      } catch (e) { /* not found */ }
      finally { setReady(true); }
    })();
  }, [slug]);

  if (!ready) return <main className="pt-40"><Loading /></main>;
  if (!post) return <main className="pt-40 container-xl text-center"><h1 className="section-heading text-4xl">Post not found.</h1><button onClick={() => navigate('/blog')} className="btn-gold mt-5">Back to blog</button></main>;

  const toggleLike = async () => {
    try {
      const res = await likeBlog(post.id, !liked);
      setPost({ ...post, likes: res.likes });
      const nowLiked = !liked;
      setLiked(nowLiked);
      if (nowLiked) localStorage.setItem(`awc_liked_${post.id}`, '1');
      else localStorage.removeItem(`awc_liked_${post.id}`);
    } catch {}
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!form.name || !form.text) return toast({ title: 'Fill both fields' });
    try {
      const c = await postComment(post.id, form);
      setPost({ ...post, comments: [c, ...(post.comments || [])] });
      setForm({ name: '', text: '' });
      toast({ title: 'Comment posted ✨' });
    } catch { toast({ title: 'Failed to post' }); }
  };

  const addReply = async (cid) => {
    if (!replyForm.text || !replyForm.name) return toast({ title: 'Name and reply required' });
    try {
      const r = await postReply(post.id, cid, replyForm);
      setPost({ ...post, comments: (post.comments || []).map((c) => c.id === cid ? { ...c, replies: [...(c.replies || []), r] } : c) });
      setReplyForm({ name: '', text: '' });
      setReplyTo(null);
    } catch { toast({ title: 'Failed' }); }
  };

  return (
    <main className="pt-28 pb-20">
      <article className="container-xl max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#f5d78c]"><ArrowLeft size={14} /> All posts</Link>
        <div className="mt-6">
          <div className="text-[11px] font-mono text-[#d4af37] tracking-[0.25em] uppercase">{post.tag} · {post.read} · {post.date}</div>
          <h1 className="mt-4 section-heading text-4xl md:text-6xl leading-[1.05]">{post.title}</h1>
          <p className="mt-4 text-zinc-400 text-lg">{post.excerpt}</p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 rounded-3xl overflow-hidden gold-border"><img src={post.cover} alt={post.title} className="w-full h-[380px] object-cover" /></motion.div>
        <div className="mt-10 prose prose-invert max-w-none"><p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line">{post.content}</p></div>

        <div className="mt-10 flex items-center gap-4">
          <button onClick={toggleLike} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${liked ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-[#d4af37]/30 text-zinc-200 hover:border-[#d4af37]'}`}><Heart size={16} fill={liked ? 'currentColor' : 'none'} /> {post.likes || 0}</button>
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><MessageCircle size={16} /> {(post.comments || []).length} comments</div>
        </div>

        <section className="mt-12">
          <h3 className="section-heading text-2xl">Leave a comment</h3>
          <form onSubmit={addComment} className="mt-4 glass gold-border rounded-2xl p-5">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37]" />
            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} placeholder="Share your thoughts…" className="mt-3 w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus:border-[#d4af37] resize-none" />
            <button type="submit" className="mt-3 btn-gold"><Send size={14} /> Post comment</button>
          </form>

          <div className="mt-8 space-y-5">
            {(post.comments || []).map((c) => (
              <div key={c.id} className="glass gold-border rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f5d78c] to-[#8a7429] flex items-center justify-center font-serif text-sm text-black">{(c.name || '?').charAt(0)}</div>
                  <div><div className="font-serif">{c.name}</div><div className="text-[10px] font-mono text-zinc-500 tracking-widest">{c.date}</div></div>
                </div>
                <p className="mt-3 text-zinc-300">{c.text}</p>
                <button onClick={() => setReplyTo(replyTo === c.id ? null : c.id)} className="mt-3 text-xs text-[#f5d78c] inline-flex items-center gap-1"><CornerDownRight size={12} /> Reply</button>
                {replyTo === c.id && (
                  <div className="mt-3 grid sm:grid-cols-[160px_1fr_auto] gap-2">
                    <input value={replyForm.name} onChange={(e) => setReplyForm({ ...replyForm, name: e.target.value })} placeholder="Your name" className="bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-2 text-sm" />
                    <input value={replyForm.text} onChange={(e) => setReplyForm({ ...replyForm, text: e.target.value })} placeholder="Your reply…" className="bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-2 text-sm" />
                    <button onClick={() => addReply(c.id)} className="btn-gold text-xs">Send</button>
                  </div>
                )}
                {(c.replies || []).length > 0 && (
                  <div className="mt-4 pl-5 border-l border-[#d4af37]/15 space-y-3">
                    {c.replies.map((r) => (
                      <div key={r.id}><div className="flex items-center gap-2 text-xs text-zinc-400"><span className="font-serif text-zinc-200">{r.name}</span> · {r.date}</div><div className="text-zinc-300 text-sm mt-1">{r.text}</div></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
};

export default BlogPost;
