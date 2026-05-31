import { useEffect, useState } from 'react';
import * as API from '../services/api';

const defaultProfile = {
  name: 'Aman Web Craft', alias: 'AMAN',
  tagline: 'Full Stack Developer • Digital Solution Architect',
  whatsapp: '918160618149',
  whatsappMessage: "Hello Aman, I visited your portfolio and I'd like to discuss a project with you.",
  email: 'hello@amanwebcraft.dev', phone: '+91 81606 18149', location: 'India',
  github: '#', linkedin: '#', twitter: '#', photo: '',
  projectsDelivered: 80, clientsHappy: 60, cupsOfCoffee: 2400, experience: '5+ Years',
  sub: ''
};

export const useProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  useEffect(() => { API.getProfile().then((p) => setProfile({ ...defaultProfile, ...p })).catch(() => {}); }, []);
  return profile;
};

export const whatsappUrl = (profile, overrideMsg) => {
  const num = (profile && profile.whatsapp) || '918160618149';
  const msg = overrideMsg || (profile && profile.whatsappMessage) || 'Hello Aman!';
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
};
