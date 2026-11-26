'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const q = (s, r = document) => [...r.querySelectorAll(s)];
// Declarative scroll animation: add data-* attributes to any element (see README).
export default function Motion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mm = gsap.matchMedia(), offs = [];
    const ctx = gsap.context(() => {
      q('[data-split]').forEach((el) => { const t = el.textContent.trim(); el.setAttribute('aria-label', t);
        el.innerHTML = t.split(/\s+/).map((w) => '<span class="w" aria-hidden="true"><i>' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</i></span>').join(' ');
        gsap.from(q('.w i', el), { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.04, scrollTrigger: { trigger: el, start: 'top 92%' } }); });
      q('[data-reveal]').forEach((el) => gsap.from(el, { y: 44, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } }));
      q('[data-stagger]').forEach((el) => gsap.from(el.children, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 90%' } }));
      q('[data-mask]').forEach((el) => { gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 90%' } });
        const i = el.firstElementChild; if (i) gsap.fromTo(i, { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }); });
      q('[data-parallax]').forEach((el) => gsap.to(el, { y: () => -(+el.dataset.parallax) * innerHeight, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      q('[data-line]').forEach((el) => gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 96%' } }));
      q('[data-hl]').forEach((el) => gsap.fromTo(el, { backgroundSize: '0% 38%' }, { backgroundSize: '100% 38%', ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: true } }));
      q('[data-count]').forEach((el) => { const o = { v: 0 }, to = +el.dataset.count, d = +(el.dataset.dec || 0), p = el.dataset.pre || '', s = el.dataset.suf || '';
        gsap.to(o, { v: to, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true }, onUpdate: () => { el.textContent = p + o.v.toFixed(d) + s; } }); });
      q('[data-theme]').forEach((sec) => ScrollTrigger.create({ trigger: sec, start: 'top 56px', end: 'bottom 56px', onToggle: (s) => { if (s.isActive) document.body.dataset.theme = sec.dataset.theme; } }));
      q('[data-spy-sec]').forEach((sec) => ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => { const l = document.querySelector('[data-spy-link="' + sec.id + '"]'); if (l) l.classList.toggle('on', s.isActive); } }));
      q('[data-steps]').forEach((sec) => { const st = q('[data-step]', sec), pn = q('[data-panel]', sec); sec.classList.add('live');
        const set = (i) => { st.forEach((x, k) => x.classList.toggle('on', k === i)); pn.forEach((x, k) => x.classList.toggle('on', k === i)); }; set(0);
        ScrollTrigger.create({ trigger: sec, start: 'top top', end: 'bottom bottom', onUpdate: (s) => set(Math.min(st.length - 1, Math.floor(s.progress * st.length))) }); });
      q('[data-svlist]').forEach((ul) => { const items = q('li', ul), pv = document.querySelector('[data-svprev]'); if (!pv) return;
        items.forEach((li) => li.addEventListener('mouseenter', () => { items.forEach((x) => x.classList.toggle('on', x === li)); pv.querySelectorAll('[data-svi]').forEach((x, k) => { x.style.display = k === +li.dataset.i ? 'block' : 'none'; }); })); });
    });
    mm.add('(min-width: 900px)', () => { q('[data-hs]').forEach((sec) => { const tr = sec.querySelector('.hs-track'), dist = () => Math.max(0, tr.scrollWidth - innerWidth);
      gsap.to(tr, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } }); }); });
    q('[data-magnetic]').forEach((el) => { const xq = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }), yq = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      const mv = (e) => { const r = el.getBoundingClientRect(); xq((e.clientX - r.left - r.width / 2) * 0.3); yq((e.clientY - r.top - r.height / 2) * 0.3); }, lv = () => { xq(0); yq(0); };
      el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv); offs.push(() => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv); }); });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); offs.forEach((f) => f()); mm.revert(); ctx.revert(); };
  }, []);
  return null;
}
