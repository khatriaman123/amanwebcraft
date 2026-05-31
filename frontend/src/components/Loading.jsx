import React from 'react';

const Loading = ({ label = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border border-[#d4af37]/20" />
      <div className="absolute inset-0 rounded-full border-2 border-t-[#f5d78c] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
    </div>
    <div className="mt-4 text-[10px] font-mono tracking-[0.3em] text-[#d4af37]">{label.toUpperCase()}</div>
  </div>
);

export default Loading;
