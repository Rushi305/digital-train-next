'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { createTrain } from '@/lib/scene';
import { STOPS, SV, STEPS } from '@/data/content';
const T = 11.4, CTR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11.2], cl = (v) => Math.max(0, Math.min(1, v));
export default function Journey() {
  const J = useRef(), cv = useRef(), pan = useRef([]), lab = useRef(), fill = useRef(), mark = useRef(), hint = useRef();
  const [sv, setSv] = useState('');
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; const sc = createTrain(cv.current);
    let cur = 0, raf, last = '', mx = 0, my = 0;
    const mm = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, rs = () => sc.resize();
    addEventListener('pointermove', mm); addEventListener('resize', rs);
    const loop = (now) => { const j = J.current, y = scrollY - j.offsetTop, h = innerHeight;
      if (y > -h && y < j.offsetHeight) {
        cur += (cl(y / (j.offsetHeight - h)) * T - cur) * (reduce ? 1 : 0.075); const t = cur; sc.update(t, now, mx, my);
        pan.current.forEach((el, i) => { if (!el) return; const d = Math.abs(t - CTR[i]); let o = cl(1 - (d - 0.15) / 0.5);
          if (i === 11) o = cl((t - 10.7) / 0.5); if (i === 10 && t > 10.7) o = Math.min(o, 1 - cl((t - 10.7) / 0.4));
          el.style.opacity = o; el.style.transform = `translateY(${(1 - o) * 22}px)`; el.style.pointerEvents = o > 0.5 ? 'auto' : 'none'; });
        const idx = t > 10.7 ? 11 : Math.round(t); const txt = t < 0.5 ? 'At the station' : idx > 10 ? 'Final destination' : String(Math.max(1, idx)).padStart(2, '0') + ' · ' + STOPS[Math.max(0, idx - 1)].n;
        if (txt !== last) { lab.current.textContent = txt; last = txt; }
        const pr = (t / T) * 100 + '%'; fill.current.style.width = pr; mark.current.style.left = pr; hint.current.style.opacity = 1 - cl(t * 4); }
      raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', mm); removeEventListener('resize', rs); sc.dispose(); };
  }, []);
  const R = (i) => (el) => (pan.current[i] = el);
  return (<main id="journey" ref={J}><div className="stage" id="stage"><canvas id="gl" ref={cv} aria-hidden="true" /><div className="veil" />
    <section className="panel" ref={R(0)}><div className="th">All aboard</div><h2>Your brand's journey to digital growth.</h2><p>Your growth has a destination. We know the route.</p><a className="btn" style={{ marginTop: 20 }} href="#contact">Book a discovery call</a></section>
    {STOPS.map((s, i) => (<section key={s.n} className="panel" ref={R(i + 1)} aria-label={s.n}>
      <div className="th">{String(i + 1).padStart(2, '0')} · {s.t}</div><h2>{s.h}</h2>{s.b && <p>{s.b}</p>}
      {s.items && <div className="chips">{s.items.map((x) => <span className="chip" key={x}>{x}</span>)}</div>}
      {s.svc && <><div className="chips">{Object.keys(SV).map((k) => <button key={k} className="chip" aria-pressed={sv === k} onClick={() => setSv(k)}>{k}</button>)}</div><p className="note">{sv && SV[sv]}</p></>}
      {s.stats && <div className="stats">{['Campaigns delivered', 'Leads generated', 'Brands transformed', 'Industries served'].map((x) => <div key={x}>00<span>{x}</span></div>)}</div>}
      {s.route && <ol className="route">{STEPS.map(([a, b]) => <li key={a}><b>{a}</b>{b}</li>)}</ol>}
      <Link className="go" href={s.href}>Read more →</Link></section>))}
    <section className="panel" ref={R(11)}><h2>Ready to take your brand to the next level?</h2><p>Every great journey starts with a conversation. Let's build something extraordinary together.</p>
      <div className="row" style={{ marginTop: 22 }}><a className="btn" href="#contact">Book a discovery call</a><a className="btn o" href="#contact">Let's talk</a></div></section>
    <div className="hint" ref={hint}>SCROLL TO BOARD ↓</div>
    <div id="prog" aria-live="polite"><span id="cur" ref={lab}>At the station</span><div id="trk"><i id="fill" ref={fill} /><u id="mark" ref={mark} /></div></div></div></main>);
}
