import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

const navLinks = [
  { label: 'Home', to: '/' }, { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' }, { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' }, { label: 'Order', to: '/order' },
  { label: 'Blog', to: '/blog' }, { label: 'Contact', to: '/contact' },
];

const Footer = () => {
  const profile = useProfile();
  const year = new Date().getFullYear();
  return (
    <footer className="relative pt-20 pb-10 border-t border-[#d4af37]/15 bg-[#08080a]">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f5d78c] via-[#d4af37] to-[#8a7429] flex items-center justify-center text-black font-bold font-serif text-lg">A</div>
              <div>
                <div className="font-serif text-lg">{profile.name}</div>
                <div className="text-[10px] font-mono text-[#d4af37] tracking-[0.3em]">CRAFTED WITH CARE</div>
              </div>
            </Link>
            <p className="mt-5 text-zinc-400 max-w-sm">Premium full stack development, digital products & bespoke tools for founders who care about the details.</p>
            <div className="mt-6 flex gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#d4af37]/25 flex items-center justify-center text-[#f5d78c]"><Github size={18} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#d4af37]/25 flex items-center justify-center text-[#f5d78c]"><Linkedin size={18} /></a>
              <a href={profile.twitter} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#d4af37]/25 flex items-center justify-center text-[#f5d78c]"><Twitter size={18} /></a>
              <a href={`mailto:${profile.email}`} className="w-11 h-11 rounded-full border border-[#d4af37]/25 flex items-center justify-center text-[#f5d78c]"><Mail size={18} /></a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">Explore</div>
            <ul className="mt-4 space-y-2 text-zinc-300">
              {navLinks.map((l) => (<li key={l.label}><Link to={l.to} className="hover:text-[#f5d78c]">{l.label}</Link></li>))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">Contact</div>
            <div className="mt-4 space-y-2 text-zinc-300">
              <div>{profile.email}</div>
              <div>{profile.phone}</div>
              <div>{profile.location}</div>
            </div>
            <Link to="/adminaman" className="inline-block mt-6 text-[10px] font-mono tracking-[0.3em] text-zinc-600 hover:text-[#d4af37]">□ ADMIN</Link>
          </div>
        </div>
        <div className="mt-14 section-divider" />
        <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-zinc-500">© {year} {profile.name} — all rights reserved.</div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-ghost text-xs"><ArrowUp size={14} /> Back to top</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
