import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useProfile, whatsappUrl } from '../hooks/useProfile';

const WhatsAppButton = () => {
  const profile = useProfile();
  const url = whatsappUrl(profile);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 blur-xl group-hover:opacity-60 transition-opacity" />
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] border border-[#1fb457]">
          <MessageCircle size={24} className="text-white" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
        </span>
      </div>
    </a>
  );
};

export default WhatsAppButton;
