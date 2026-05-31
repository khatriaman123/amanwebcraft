import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import OrderPage from './pages/OrderPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import WhatsAppButton from './components/WhatsAppButton';
import { Toaster } from './components/ui/toaster';

const PageFade = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
    {children}
  </motion.div>
);

const AppRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/adminaman');

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageFade><HomePage /></PageFade>} />
          <Route path="/about" element={<PageFade><AboutPage /></PageFade>} />
          <Route path="/skills" element={<PageFade><SkillsPage /></PageFade>} />
          <Route path="/services" element={<PageFade><ServicesPage /></PageFade>} />
          <Route path="/projects" element={<PageFade><ProjectsPage /></PageFade>} />
          <Route path="/order" element={<PageFade><OrderPage /></PageFade>} />
          <Route path="/contact" element={<PageFade><ContactPage /></PageFade>} />
          <Route path="/blog" element={<PageFade><BlogPage /></PageFade>} />
          <Route path="/blog/:slug" element={<PageFade><BlogPost /></PageFade>} />
          <Route path="/adminaman" element={<AdminLogin />} />
          <Route path="/adminaman/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="App grain">
      {loading && <Loader />}
      <CustomCursor />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
