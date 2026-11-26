'use client';
import Link from 'next/link';
import { useState } from 'react';
import Art from './Art';
import { ARTICLES } from '@/data/agency';
const CATS = ['All', ...new Set(ARTICLES.map((a) => a.cat))];
export default function InsightsClient() {
  const [c, setC] = useState('All'), l = ARTICLES.filter((a) => c === 'All' || a.cat === c), [fe, ...rest] = l, k = (a) => ARTICLES.indexOf(a) + 1;
  return (<><div className="flt" role="group" aria-label="Filter by category">{CATS.map((x) => <button key={x} className={x === c ? 'on' : ''} aria-pressed={x === c} onClick={() => setC(x)}>{x}</button>)}</div>
    {fe && <Link className="feat" href={'/insights/' + fe.slug} data-cursor="Read"><div className="art"><Art seed={k(fe) + 20} a="#ff6a4a" b="#e8b66f" kind={k(fe) % 5} bg="#141a36" /></div><div><span className="kick">Featured · {fe.cat}</span><h2 className="h2" style={{ fontSize: 'clamp(2rem,4.4vw,4rem)' }}>{fe.t}</h2><p className="lead" style={{ marginTop: 18 }}>{fe.ex}</p><small style={{ color: 'var(--mute)' }}>{fe.date} · {fe.read}</small></div></Link>}
    <ul className="al">{rest.map((a) => <li key={a.slug}><Link href={'/insights/' + a.slug}><em>{a.cat}</em><div><h3>{a.t}</h3><p style={{ color: 'var(--mute)', marginTop: 6 }}>{a.ex}</p></div><small>{a.date} · {a.read}</small></Link></li>)}</ul></>);
}
