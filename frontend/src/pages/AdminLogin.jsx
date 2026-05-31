import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { adminLogin } from '../services/api';
import { useToast } from '../hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(form.username, form.password);
      localStorage.setItem('awc_token', res.token);
      toast({ title: 'Welcome back, Aman', description: 'Access granted ✦' });
      navigate('/adminaman/dashboard');
    } catch (err) {
      toast({ title: 'Access denied', description: err.response?.data?.detail || 'Invalid credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#8a7429]/10 blur-[120px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative w-full max-w-md glass gold-border rounded-3xl p-8">
        <Link to="/" className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 hover:text-[#f5d78c]">← BACK TO SITE</Link>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f5d78c] via-[#d4af37] to-[#8a7429] flex items-center justify-center"><ShieldCheck className="text-black" /></div>
          <div><div className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37]">SECURE AREA</div><h1 className="font-serif text-2xl">Admin Control</h1></div>
        </div>
        <p className="mt-5 text-zinc-400 text-sm">This is a restricted zone. Only Aman has access.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-[10px] font-mono tracking-widest text-zinc-400">USERNAME</label>
            <div className="mt-2 flex items-center gap-3 bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus-within:border-[#d4af37]"><User size={16} className="text-[#f5d78c]" /><input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="flex-1 bg-transparent outline-none" placeholder="aman" /></div>
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-widest text-zinc-400">PASSWORD</label>
            <div className="mt-2 flex items-center gap-3 bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 focus-within:border-[#d4af37]"><Lock size={16} className="text-[#f5d78c]" /><input type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="flex-1 bg-transparent outline-none" placeholder="••••••••" /><button type="button" onClick={() => setShow((v) => !v)} className="text-zinc-400 hover:text-[#f5d78c]">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
          </div>
          <button disabled={loading} className="w-full btn-gold justify-center">{loading ? 'Authenticating…' : 'Enter Dashboard'}</button>
        </form>
        <div className="mt-5 text-[10px] font-mono text-zinc-500 tracking-widest text-center">HINT: aman / craft2025</div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
