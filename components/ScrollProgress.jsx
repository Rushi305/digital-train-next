'use client';
import { useEffect, useRef } from 'react';
export default function ScrollProgress() {
  const r = useRef();
  useEffect(() => { let raf; const f = () => { const h = document.documentElement.scrollHeight - innerHeight; r.current.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf); }, []);
  return <div className="prog" ref={r} aria-hidden="true" />;
}
