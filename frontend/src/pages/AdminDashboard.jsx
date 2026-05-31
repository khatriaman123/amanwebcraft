import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Folder, FileText, Inbox, Users, BarChart3, LogOut, Plus, Trash2, Edit3, CheckCircle2, UserCircle2, Sparkles, Star, MessageSquare } from 'lucide-react';
import * as API from '../services/api';
import { useToast } from '../hooks/use-toast';
import CrudModal from '../components/admin/CrudModal';
import Loading from '../components/Loading';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: UserCircle2 },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'services', label: 'Services', icon: Folder },
  { id: 'projects', label: 'Projects', icon: FileText },
  { id: 'blogs', label: 'Blogs', icon: FileText },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'orders', label: 'Orders', icon: Inbox },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const CRUD_TYPES = ['skills', 'services', 'projects', 'testimonials', 'blogs'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [data, setData] = useState({ skills: [], services: [], projects: [], testimonials: [], blogs: [], orders: [], messages: [] });
  const [profile, setProfile] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useCallback(() => {
    if (!localStorage.getItem('awc_token')) { navigate('/adminaman'); return false; }
    return true;
  }, [navigate]);

  const loadAll = useCallback(async () => {
    if (!auth()) return;
    setLoading(true);
    try {
      const [sk, sv, pr, ts, bl, pf, st, od, ms] = await Promise.all([
        API.crud('skills').list(), API.crud('services').list(), API.crud('projects').list(),
        API.crud('testimonials').list(), API.getBlogs(), API.getProfile(),
        API.adminStats().catch(() => ({})), API.adminOrders().catch(() => []), API.adminMessages().catch(() => []),
      ]);
      setData({ skills: sk, services: sv, projects: pr, testimonials: ts, blogs: bl, orders: od, messages: ms });
      setProfile(pf);
      setStats(st);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('awc_token'); navigate('/adminaman'); }
      else toast({ title: 'Load failed', description: err.message });
    } finally { setLoading(false); }
  }, [auth, navigate, toast]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const logout = () => { localStorage.removeItem('awc_token'); navigate('/adminaman'); };

  const save = async (type, item) => {
    try {
      if (type === 'profile') {
        const res = await API.putProfile(item);
        setProfile(res);
        toast({ title: 'Profile saved' });
      } else {
        const crud = API.crud(type);
        const res = item.id ? await crud.update(item.id, item) : await crud.create(item);
        setData((d) => {
          const list = d[type] || [];
          const next = item.id ? list.map((x) => x.id === item.id ? res : x) : [...list, res];
          return { ...d, [type]: next };
        });
        toast({ title: `${type} saved` });
      }
      setModal(null);
    } catch (err) { toast({ title: 'Save failed', description: err.response?.data?.detail || err.message }); }
  };

  const remove = async (type, id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      if (type === 'orders') await API.deleteOrder(id);
      else if (type === 'messages') await API.deleteMessage(id);
      else await API.crud(type).remove(id);
      setData((d) => ({ ...d, [type]: (d[type] || []).filter((x) => x.id !== id) }));
      toast({ title: 'Deleted' });
    } catch (err) { toast({ title: 'Delete failed' }); }
  };

  const setOrderStatus = async (id, status) => {
    try {
      const res = await API.updateOrder(id, { status });
      setData((d) => ({ ...d, orders: d.orders.map((o) => o.id === id ? res : o) }));
      toast({ title: 'Order updated', description: `Status: ${status}` });
    } catch { toast({ title: 'Update failed' }); }
  };

  const overviewStats = [
    { k: data.orders.length, v: 'Total Orders' },
    { k: data.orders.filter((o) => o.status === 'new').length, v: 'New Leads' },
    { k: data.messages.length, v: 'Messages' },
    { k: data.projects.length, v: 'Projects' },
    { k: data.blogs.length, v: 'Blog Posts' },
    { k: data.services.length, v: 'Services' },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-60 flex-col border-r border-[#d4af37]/15 bg-[#0a0a0b] sticky top-0 h-screen">
        <div className="p-5 border-b border-[#d4af37]/15">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f5d78c] via-[#d4af37] to-[#8a7429] flex items-center justify-center text-black font-bold font-serif">A</div>
            <div><div className="font-serif">Aman Web</div><div className="text-[10px] font-mono text-[#d4af37] tracking-widest">ADMIN</div></div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((t) => {
            const Icon = t.icon; const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${active ? 'bg-[#d4af37]/15 text-[#f5d78c] border border-[#d4af37]/30' : 'text-zinc-300 hover:bg-[#14141a]'}`}>
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </nav>
        <button onClick={logout} className="m-3 flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-red-300 hover:bg-red-500/10"><LogOut size={16} /> Logout</button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="eyebrow">— {tab}</div>
            <h1 className="section-heading text-3xl md:text-4xl capitalize">{tabs.find((t) => t.id === tab)?.label}</h1>
          </div>
          {CRUD_TYPES.includes(tab) && (
            <button onClick={() => setModal({ type: tab, item: null })} className="btn-gold"><Plus size={14} /> Add {tab.slice(0, -1)}</button>
          )}
          {tab === 'profile' && profile && (
            <button onClick={() => setModal({ type: 'profile', item: profile })} className="btn-gold"><Edit3 size={14} /> Edit Profile</button>
          )}
        </div>

        {loading && <Loading />}

        {!loading && tab === 'overview' && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {overviewStats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass gold-border rounded-2xl p-5">
                  <div className="font-serif text-4xl gold-text">{s.k}</div>
                  <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mt-1">{s.v}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 grid lg:grid-cols-2 gap-5">
              <div className="glass gold-border rounded-2xl p-5">
                <h3 className="font-serif text-xl mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {data.orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex items-center justify-between py-2 border-b border-[#d4af37]/10 last:border-0">
                      <div><div className="text-sm">{o.name}</div><div className="text-[10px] font-mono text-zinc-500">{o.service} · {o.date}</div></div>
                      <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${o.status === 'new' ? 'bg-[#25D366]/20 text-[#25D366]' : o.status === 'in-progress' ? 'bg-[#d4af37]/20 text-[#f5d78c]' : 'bg-zinc-500/20 text-zinc-400'}`}>{o.status}</span>
                    </div>
                  ))}
                  {data.orders.length === 0 && <div className="text-xs text-zinc-500">No orders yet.</div>}
                </div>
              </div>
              <div className="glass gold-border rounded-2xl p-5">
                <h3 className="font-serif text-xl mb-4">Recent Messages</h3>
                <div className="space-y-3">
                  {data.messages.slice(0, 5).map((m) => (
                    <div key={m.id} className="py-2 border-b border-[#d4af37]/10 last:border-0">
                      <div className="text-sm">{m.name} <span className="text-zinc-500">· {m.email}</span></div>
                      <div className="text-xs text-zinc-400 line-clamp-1">{m.msg}</div>
                    </div>
                  ))}
                  {data.messages.length === 0 && <div className="text-xs text-zinc-500">No messages yet.</div>}
                </div>
              </div>
            </div>
          </>
        )}

        {!loading && tab === 'profile' && profile && (
          <div className="glass gold-border rounded-2xl p-6 max-w-3xl">
            <div className="flex items-center gap-5">
              {profile.photo && <img src={profile.photo} alt="" className="w-20 h-20 rounded-xl object-cover gold-border" />}
              <div>
                <h3 className="font-serif text-2xl">{profile.name}</h3>
                <div className="text-xs font-mono text-zinc-400 tracking-widest">{profile.tagline}</div>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-zinc-500 text-xs">EMAIL: </span>{profile.email}</div>
              <div><span className="text-zinc-500 text-xs">PHONE: </span>{profile.phone}</div>
              <div><span className="text-zinc-500 text-xs">WHATSAPP: </span>{profile.whatsapp}</div>
              <div><span className="text-zinc-500 text-xs">LOCATION: </span>{profile.location}</div>
              <div><span className="text-zinc-500 text-xs">EXPERIENCE: </span>{profile.experience}</div>
              <div><span className="text-zinc-500 text-xs">PROJECTS: </span>{profile.projectsDelivered}</div>
              <div><span className="text-zinc-500 text-xs">CLIENTS: </span>{profile.clientsHappy}</div>
              <div><span className="text-zinc-500 text-xs">COFFEE: </span>{profile.cupsOfCoffee}</div>
              <div className="sm:col-span-2"><span className="text-zinc-500 text-xs">BIO: </span>{profile.sub}</div>
            </div>
          </div>
        )}

        {!loading && CRUD_TYPES.includes(tab) && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(data[tab] || []).map((item) => (
              <div key={item.id} className="glass gold-border rounded-2xl overflow-hidden">
                {item.cover && <img src={item.cover} alt="" className="w-full h-40 object-cover" />}
                <div className="p-5">
                  {tab === 'skills' && <>
                    <div className="flex justify-between items-baseline"><h4 className="font-serif text-xl">{item.name}</h4><span className="font-mono text-[#f5d78c]">{item.level}%</span></div>
                    <div className="text-[10px] font-mono text-zinc-500 tracking-widest mt-1">{item.category}</div>
                  </>}
                  {tab === 'services' && <>
                    <div className="text-[10px] font-mono text-[#d4af37] tracking-widest">{item.icon}</div>
                    <h4 className="font-serif text-xl mt-1">{item.title}</h4>
                    <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{item.desc}</p>
                  </>}
                  {tab === 'projects' && <>
                    <div className="text-[10px] font-mono text-[#d4af37] tracking-widest">{item.category?.toUpperCase()}</div>
                    <h4 className="font-serif text-xl mt-1">{item.title}</h4>
                    <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{item.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-1">{(item.tech || []).slice(0, 4).map((t) => (<span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-[#d4af37]/20">{t}</span>))}</div>
                  </>}
                  {tab === 'testimonials' && <>
                    <div className="flex gap-0.5">{Array.from({ length: item.rating || 5 }).map((_, i) => (<Star key={i} size={12} className="text-[#f5d78c] fill-[#f5d78c]" />))}</div>
                    <p className="font-serif text-base mt-2 line-clamp-3">"{item.quote}"</p>
                    <div className="mt-3 text-sm">{item.name} <span className="text-zinc-500">· {item.role}</span></div>
                  </>}
                  {tab === 'blogs' && <>
                    <div className="text-[10px] font-mono text-[#d4af37] tracking-widest">{item.tag} · {item.date}</div>
                    <h4 className="font-serif text-xl mt-1">{item.title}</h4>
                    <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{item.excerpt}</p>
                  </>}
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setModal({ type: tab, item })} className="flex-1 text-xs font-mono tracking-widest uppercase px-3 py-2 rounded-full border border-[#d4af37]/30 text-zinc-200 hover:border-[#d4af37]"><Edit3 size={12} className="inline mr-1" /> Edit</button>
                    <button onClick={() => remove(tab, item.id)} className="px-3 py-2 rounded-full border border-red-500/30 text-red-300 hover:bg-red-500/10"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
            {(data[tab] || []).length === 0 && <div className="text-center text-zinc-500 py-16 col-span-full">Nothing here yet. Click "Add" above.</div>}
          </div>
        )}

        {!loading && tab === 'orders' && (
          <div className="glass gold-border rounded-2xl overflow-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase bg-black/40">
                <tr>{['Client', 'Email', 'Service', 'Budget', 'Timeline', 'Status', 'Actions'].map((h) => (<th key={h} className="text-left p-4">{h}</th>))}</tr>
              </thead>
              <tbody>
                {data.orders.map((o) => (
                  <tr key={o.id} className="border-t border-[#d4af37]/10">
                    <td className="p-4">{o.name}</td>
                    <td className="p-4 text-zinc-400">{o.email}</td>
                    <td className="p-4 text-zinc-400">{o.service}</td>
                    <td className="p-4 text-zinc-400">{o.budget}</td>
                    <td className="p-4 text-zinc-400">{o.timeline}</td>
                    <td className="p-4">
                      <select value={o.status} onChange={(e) => setOrderStatus(o.id, e.target.value)} className="bg-black/40 border border-[#d4af37]/20 rounded-full px-3 py-1 text-xs font-mono tracking-widest">
                        <option value="new">new</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => setOrderStatus(o.id, 'completed')} className="text-[#25D366]"><CheckCircle2 size={14} /></button>
                        <button onClick={() => remove('orders', o.id)} className="text-red-300"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.orders.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-zinc-500">No orders yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {!loading && tab === 'messages' && (
          <div className="space-y-3">
            {data.messages.map((m) => (
              <div key={m.id} className="glass gold-border rounded-2xl p-5 flex justify-between items-start">
                <div>
                  <div className="font-serif text-lg">{m.name}</div>
                  <div className="text-[11px] font-mono text-zinc-500 tracking-widest">{m.email} · {m.date}</div>
                  <p className="mt-2 text-zinc-300 text-sm">{m.msg}</p>
                </div>
                <button onClick={() => remove('messages', m.id)} className="text-zinc-500 hover:text-red-400"><Trash2 size={16} /></button>
              </div>
            ))}
            {data.messages.length === 0 && <div className="text-center text-zinc-500 py-16">No messages yet.</div>}
          </div>
        )}

        {!loading && tab === 'analytics' && (
          <div className="glass gold-border rounded-2xl p-6">
            <h3 className="font-serif text-2xl">Backend Counts</h3>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(stats).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-[#d4af37]/15 bg-black/30 p-3">
                  <div className="font-serif text-xl gold-text">{v}</div>
                  <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-1">{k}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-7 gap-2 items-end h-48">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="rounded-t-md bg-gradient-to-t from-[#8a7429] to-[#f5d78c]" style={{ height: `${30 + Math.random() * 70}%` }} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 text-[10px] font-mono text-zinc-500 tracking-widest text-center">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (<div key={d}>{d}</div>))}
            </div>
          </div>
        )}
      </main>

      {modal && <CrudModal type={modal.type} item={modal.item} onClose={() => setModal(null)} onSave={(item) => save(modal.type, item)} />}
    </div>
  );
};

export default AdminDashboard;
