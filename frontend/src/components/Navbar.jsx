import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Order', to: '/order' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useProfile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="container-xl">
        <div className={`flex items-center justify-between rounded-full px-5 py-3 ${scrolled ? 'glass gold-border' : ''}`}>
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f5d78c] via-[#d4af37] to-[#8a7429] flex items-center justify-center text-black font-bold font-serif text-lg shadow-lg">A</div>
              <span className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            </div>
            <div className="leading-tight text-left">
              <div className="font-serif text-[15px] tracking-wide">{profile.name}</div>
              <div className="text-[10px] font-mono text-[#d4af37] tracking-[0.25em]">SINCE 2020</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink key={l.label} to={l.to} className={({ isActive }) => `relative px-3.5 py-2 text-sm ${isActive ? 'text-[#f5d78c]' : 'text-zinc-300 hover:text-[#f5d78c]'}`}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span className={`absolute left-3.5 right-3.5 bottom-1 h-[1px] bg-[#d4af37] origin-left transition-transform ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Link to="/order" className="hidden lg:inline-flex btn-gold text-sm">Start a Project</Link>

          <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2 rounded-full border border-[#d4af37]/30 text-[#f5d78c]">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden mt-3 glass gold-border rounded-2xl p-4">
              <div className="flex flex-col">
                {navLinks.map((l) => (
                  <NavLink key={l.label} to={l.to} className="text-left py-3 px-3 border-b border-[#d4af37]/10 last:border-0 text-zinc-200 hover:text-[#f5d78c]">{l.label}</NavLink>
                ))}
                <Link to="/order" className="btn-gold mt-3 justify-center">Start a Project</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
