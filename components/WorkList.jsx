'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Art from './Art';
import { PROJECTS } from '@/data/agency';
const IND = ['All', ...new Set(PROJECTS.map((p) => p.industry))];
export default function WorkList() {
  const [f, setF] = useState('All'), [h, setH] = useState(null), pv = useRef(), list = PROJECTS.filter((p) => f === 'All' || p.industry === f);
  useEffect(() => { const d = pv.current, xq = gsap.quickTo(d, 'x', { duration: 0.5, ease: 'power3' }), yq = gsap.quickTo(d, 'y', { duration: 0.5, ease: 'power3' }); const mv = (e) => { xq(e.clientX + 24); yq(e.clientY - 90); }; addEventListener('pointermove', mv); return () => removeEventListener('pointermove', mv); }, []);
  return (<><div className="flt" role="group" aria-label="Filter by industry">{IND.map((x) => <button key={x} className={x === f ? 'on' : ''} aria-pressed={x === f} onClick={() => setF(x)}>{x}</button>)}</div>
    <ul className="wl" onMouseLeave={() => setH(null)}>{list.map((p, i) => <li key={p.slug} onMouseEnter={() => setH(p)}><Link href={'/work/' + p.slug} data-cursor="View"><small>{String(i + 1).padStart(2, '0')}</small><div className="th2"><Art seed={i + 2} a={p.a} b={p.b} bg={p.bg} kind={p.kind} /></div><h3>{p.name}</h3><small>{p.industry}</small><small>{p.focus}</small></Link></li>)}</ul>
    <div className={'pv' + (h ? ' on' : '')} ref={pv} aria-hidden="true">{h && <Art seed={PROJECTS.indexOf(h) + 2} a={h.a} b={h.b} bg={h.bg} kind={h.kind} />}</div>
    <p className="demo">All case studies are illustrative demo projects with sample data, not verified client results.</p></>);
}
