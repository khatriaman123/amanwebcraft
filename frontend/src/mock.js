// Mock data for Aman Web Craft portfolio — will be replaced with backend APIs

export const profile = {
  name: 'Aman Web Craft',
  alias: 'AMAN',
  tagline: 'Full Stack Developer • Digital Solution Architect',
  headline: 'Crafting Premium Web Experiences, One Pixel at a Time.',
  sub: 'I build modern, AI-powered web apps, renewal platforms, admin dashboards, and bespoke digital tools that help brands scale beyond the ordinary.',
  location: 'India',
  email: 'hello@amanwebcraft.dev',
  phone: '+91 81606 18149',
  whatsapp: '918160618149',
  whatsappMessage: "Hello Aman, I visited your portfolio and I'd like to discuss a project with you.",
  experience: '5+ Years',
  projectsDelivered: 80,
  clientsHappy: 60,
  cupsOfCoffee: 2400,
  github: 'https://github.com/amanwebcraft',
  linkedin: 'https://linkedin.com/in/amanwebcraft',
  twitter: 'https://twitter.com/amanwebcraft',
  photo: 'https://images.unsplash.com/photo-1516202648085-f93e477d1300?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwwfHx8YmxhY2t8MTc3NjU5NjI2N3ww&ixlib=rb-4.1.0&q=85',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Order', href: '#order' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

export const skills = [
  { name: 'HTML', level: 98, category: 'Frontend' },
  { name: 'CSS', level: 95, category: 'Frontend' },
  { name: 'JavaScript', level: 93, category: 'Frontend' },
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'Bootstrap', level: 94, category: 'Frontend' },
  { name: 'PHP', level: 95, category: 'Backend' },
  { name: 'MySQL', level: 92, category: 'Database' },
  { name: 'MongoDB', level: 85, category: 'Database' },
];

export const services = [
  { id: 1, title: 'Custom Website Development', desc: 'Hand-crafted, conversion-focused websites tailored to your brand.', icon: 'Globe' },
  { id: 2, title: 'Full Stack Web Applications', desc: 'End-to-end web apps built with React, PHP, Node & modern stacks.', icon: 'Layers' },
  { id: 3, title: 'Admin Dashboards', desc: 'Powerful admin panels with analytics, auth & role management.', icon: 'LayoutDashboard' },
  { id: 4, title: 'AI Paragraph Maker Tools', desc: 'AI-powered writing & content generation utilities.', icon: 'Sparkles' },
  { id: 5, title: 'Keyword Research Tools', desc: 'SEO suites that surface high-volume, low-competition keywords.', icon: 'Search' },
  { id: 6, title: 'Renewal Websites', desc: 'Automated SaaS renewal platforms with recurring billing flows.', icon: 'RefreshCw' },
  { id: 7, title: 'Invoice Generator Systems', desc: 'Complete invoice, quotation & billing management systems.', icon: 'Receipt' },
  { id: 8, title: 'Branding Design', desc: 'Logo, identity & guidelines that set your brand apart.', icon: 'Palette' },
  { id: 9, title: 'Business Cards', desc: 'Premium print-ready business card designs.', icon: 'CreditCard' },
  { id: 10, title: 'Flyers', desc: 'High-impact marketing flyers that convert.', icon: 'FileImage' },
  { id: 11, title: 'Poster Maker', desc: 'Bold, striking posters for campaigns & events.', icon: 'Image' },
  { id: 12, title: 'Digital Solutions', desc: 'Consulting + bespoke software for your operations.', icon: 'Cpu' },
];

export const projects = [
  {
    id: 1,
    title: 'Online Newspaper Platform',
    category: 'Full Stack',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'],
    summary: 'A complete digital newspaper with public reader UI, editor dashboard and admin panel for category, reporter and revenue management.',
    cover: 'https://images.unsplash.com/photo-1720962158813-29b66b8e23e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHx3ZWIlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzh8MA&ixlib=rb-4.1.0&q=85',
    live: '#',
    metrics: [{ k: '2.1M', v: 'Monthly Reads' }, { k: '340+', v: 'Articles' }, { k: '18', v: 'Editors' }],
  },
  {
    id: 2,
    title: 'Invoice Generator (User + Admin)',
    category: 'SaaS',
    tech: ['React', 'PHP', 'MySQL', 'PDF Engine'],
    summary: 'SaaS-grade invoicing with GST, quotations, client portals, PDF export, recurring billing and analytics for business owners.',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBtb2NrdXB8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzJ8MA&ixlib=rb-4.1.0&q=85',
    live: '#',
    metrics: [{ k: '12k+', v: 'Invoices' }, { k: '$2.4M', v: 'Processed' }, { k: '99.9%', v: 'Uptime' }],
  },
  {
    id: 3,
    title: 'Service Hub — Urban Company Style',
    category: 'Marketplace',
    tech: ['React', 'Node', 'MongoDB', 'Stripe'],
    summary: 'On-demand home service marketplace connecting customers with vetted professionals across 40+ service categories.',
    cover: 'https://images.unsplash.com/photo-1540159453465-731d5a46060a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHx3ZWIlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzh8MA&ixlib=rb-4.1.0&q=85',
    live: '#',
    metrics: [{ k: '40+', v: 'Categories' }, { k: '5k+', v: 'Pros' }, { k: '4.9★', v: 'Rating' }],
  },
  {
    id: 4,
    title: 'Hotel Management System',
    category: 'Enterprise',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'Chart.js'],
    summary: 'End-to-end hotel operations — rooms, bookings, billing, housekeeping, F&B and multi-property analytics.',
    cover: 'https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzh8MA&ixlib=rb-4.1.0&q=85',
    live: '#',
    metrics: [{ k: '120+', v: 'Rooms' }, { k: '8', v: 'Properties' }, { k: '−32%', v: 'Admin Time' }],
  },
];

export const testimonials = [
  { id: 1, name: 'Rohan Mehta', role: 'Founder, Kavach Labs', quote: 'Aman delivered a flawless admin dashboard ahead of schedule. The attention to detail is next level — every micro-interaction feels premium.', rating: 5 },
  { id: 2, name: 'Priya Shah', role: 'Marketing Head, NovaCommerce', quote: 'We rebuilt our entire invoicing system with Aman. Conversion is up 28% and our finance team finally smiles on Mondays.', rating: 5 },
  { id: 3, name: 'Arjun Iyer', role: 'CTO, StayNest Hotels', quote: 'The hotel management system handles 8 properties without breaking a sweat. Clean code, clean UI, clean communication.', rating: 5 },
  { id: 4, name: 'Sara Kapoor', role: 'Editor, DailyPulse', quote: 'Our newspaper platform is now a joy to publish on. Readers notice the speed. A rare developer who cares about craft.', rating: 5 },
];

export const blogPosts = [
  { id: 'b1', slug: 'building-premium-dashboards', title: 'Building Premium Admin Dashboards in 2025', excerpt: 'A deep dive into motion, density and state design for truly premium admin UIs.', cover: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxjb2RlJTIwYWJzdHJhY3R8ZW58MHx8fGJsYWNrfDE3NzY1OTYyODF8MA&ixlib=rb-4.1.0&q=85', date: '2025-06-14', tag: 'Design Systems', read: '8 min', likes: 142, content: 'Premium dashboards balance information density with cinematic motion. In this post we explore the golden ratio of padding, the role of micro-charts, and why every production dashboard needs a command palette. We also cover how to structure color tokens so themes can be swapped without regressions, and how to push 60fps scroll performance even on massive tables.' },
  { id: 'b2', slug: 'php-react-hybrid-stack', title: 'Why a PHP + React Hybrid Stack Still Wins', excerpt: 'Pragmatic stacks ship revenue. Here is how I combine legacy PHP APIs with a React front.', cover: 'https://images.pexels.com/photos/6190327/pexels-photo-6190327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', date: '2025-05-02', tag: 'Architecture', read: '6 min', likes: 98, content: 'Legacy PHP codebases drive billions in revenue. Rewriting them is career suicide. Instead, I incrementally front them with a React shell connected via clean REST endpoints. You get the speed of a modern SPA with the stability of tried-and-tested business logic. This article walks through the exact directory structure, auth bridge and deploy pipeline I use with clients.' },
  { id: 'b3', slug: 'ai-writing-tools-that-dont-suck', title: 'AI Writing Tools That Actually Don\'t Suck', excerpt: 'Going beyond ChatGPT wrappers — building AI tools people pay for monthly.', cover: 'https://images.pexels.com/photos/34804021/pexels-photo-34804021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', date: '2025-04-18', tag: 'AI Products', read: '10 min', likes: 211, content: 'Most AI writing tools are thin wrappers. The ones that actually retain users share three traits: deep niche focus, tight editor UX, and smart defaults that remove prompt engineering from the user. We break down how to bake those traits into your product.' },
];

export const blogComments = {
  b1: [
    { id: 'c1', name: 'Vikram S.', text: 'Golden ratio padding — chef\'s kiss. Sharing with my team.', date: '2025-06-15', replies: [{ id: 'r1', name: 'Aman', text: 'Glad it helped, Vikram! Let me know what your team builds.', date: '2025-06-15' }] },
    { id: 'c2', name: 'Neha', text: 'Command palette gang! Any library you recommend?', date: '2025-06-16', replies: [] },
  ],
  b2: [
    { id: 'c3', name: 'Ankit R.', text: 'This is exactly the pragmatic take we needed. Saved.', date: '2025-05-03', replies: [] },
  ],
  b3: [],
};

export const githubContributions = (() => {
  const cells = [];
  for (let i = 0; i < 52 * 7; i++) {
    const r = Math.random();
    const level = r > 0.85 ? 4 : r > 0.7 ? 3 : r > 0.5 ? 2 : r > 0.25 ? 1 : 0;
    cells.push(level);
  }
  return cells;
})();

export const terminalLines = [
  { cmd: 'whoami', out: 'aman_web_craft — full stack developer & digital solution architect' },
  { cmd: 'cat stack.txt', out: 'react · php · mysql · mongodb · node · tailwind · framer-motion' },
  { cmd: 'ls services/', out: 'websites  webapps  dashboards  ai-tools  seo-suites  branding' },
  { cmd: 'uptime', out: '5+ years · 80+ projects delivered · 60+ happy clients' },
  { cmd: 'echo $STATUS', out: 'Available for new premium projects ✦' },
];

export const budgets = ['< ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000 – ₹5,00,000', '₹5,00,000+'];
export const timelines = ['ASAP (Rush)', '1–2 Weeks', '3–4 Weeks', '1–2 Months', '3+ Months'];

// Admin credentials (mock only — backend will replace)
export const ADMIN_CREDENTIALS = { username: 'aman', password: 'craft2025' };

export const mockOrders = [
  { id: 'o1', name: 'Rahul Verma', service: 'Full Stack Web App', budget: '₹2,00,000 – ₹5,00,000', timeline: '3–4 Weeks', status: 'new', date: '2025-07-14' },
  { id: 'o2', name: 'Divya Nair', service: 'Admin Dashboard', budget: '₹75,000 – ₹2,00,000', timeline: '1–2 Weeks', status: 'in-progress', date: '2025-07-10' },
  { id: 'o3', name: 'Kunal Gupta', service: 'Invoice Generator', budget: '₹25,000 – ₹75,000', timeline: '1–2 Weeks', status: 'completed', date: '2025-06-28' },
];

export const mockMessages = [
  { id: 'm1', name: 'Tanvi P.', email: 'tanvi@example.com', msg: 'Need a poster maker tool for my print shop — quick call?', date: '2025-07-18' },
  { id: 'm2', name: 'Ishaan B.', email: 'ishaan@startup.co', msg: 'Interested in a renewal website for my SaaS. Budget flexible.', date: '2025-07-16' },
];
