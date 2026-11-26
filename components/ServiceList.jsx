'use client';
import Link from 'next/link';
import { useState } from 'react';
import Art from './Art';
import { SERVICES, slugify } from '@/data/agency';
export default function ServiceList() {
  const [i, setI] = useState(0), s = SERVICES[i];
  return (<div className="svl"><ul>{SERVICES.map((x, k) => <li key={x.n} className={k === i ? 'on' : ''} onMouseEnter={() => setI(k)} onFocus={() => setI(k)}><Link href={'/services#' + slugify(x.n)} data-cursor="Open"><small>{String(k + 1).padStart(2, '0')}</small>{x.n}</Link></li>)}</ul>
    <div className="svp"><div className="art"><Art key={i} seed={i + 3} a={s.a} b={s.b} kind={i % 5} bg="#0e1429" /></div><p><b style={{ color: s.a }}>{s.tag}.</b> {s.d}</p></div></div>);
}
