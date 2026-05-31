import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) return;
    document.body.classList.add('has-cursor');
    setVisible(true);

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };
    const onOver = (e) => {
      const el = e.target;
      const inter = el.closest('a, button, input, textarea, select, [data-cursor=hover]');
      if (ringRef.current) {
        ringRef.current.style.transform += inter ? ' scale(1.8)' : '';
        ringRef.current.dataset.hover = inter ? '1' : '0';
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        const hover = ringRef.current.dataset.hover === '1';
        const s = hover ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ring.current.x - 16}px, ${ring.current.y - 16}px, 0) scale(${s})`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  if (!visible) return null;
  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: 6, height: 6, borderRadius: '50%', background: '#f5d78c', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference' }} />
      <div ref={ringRef} data-hover="0" style={{ position: 'fixed', top: 0, left: 0, width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(245,215,140,0.65)', pointerEvents: 'none', zIndex: 9999, transition: 'transform 120ms ease, border-color 200ms ease, background 200ms ease' }} />
    </>
  );
};

export default CustomCursor;
