'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function Cursor() {
  const r = useRef();
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return; const d = r.current;
    const xq = gsap.quickTo(d, 'x', { duration: 0.35, ease: 'power3' }), yq = gsap.quickTo(d, 'y', { duration: 0.35, ease: 'power3' });
    const mv = (e) => { xq(e.clientX); yq(e.clientY); }, ov = (e) => { const t = e.target.closest('a,button,[data-cursor]'); d.classList.toggle('big', !!t && !!t.closest('[data-cursor]')); d.dataset.label = (t && t.closest('[data-cursor]') && t.closest('[data-cursor]').dataset.cursor) || ''; };
    addEventListener('pointermove', mv); addEventListener('pointerover', ov); return () => { removeEventListener('pointermove', mv); removeEventListener('pointerover', ov); };
  }, []);
  return <div className="cur" ref={r} aria-hidden="true" />;
}
