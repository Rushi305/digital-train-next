'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PAGES } from '@/data/content';
export default function Nav() {
  const p = usePathname(), [open, setOpen] = useState(false), [hide, setHide] = useState(false), [solid, setSolid] = useState(false);
  const items = PAGES.filter((x) => x.href !== '/contact');
  useEffect(() => { let ly = 0; const f = () => { const y = scrollY; setSolid(y > 40); setHide(y > ly && y > 300 && !open); ly = y; }; addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f); }, [open]);
  useEffect(() => setOpen(false), [p]);
  useEffect(() => { document.documentElement.classList.toggle('lock', open); }, [open]);
  const cur = (h) => (h === '/' ? p === '/' : p.startsWith(h)) ? 'page' : undefined;
  return (<>
    <header className={'nav' + (solid ? ' solid' : '') + (hide ? ' hide' : '')}><Link className="logo" href="/">Digital Train</Link>
      <nav aria-label="Main"><ul>{items.map((x) => <li key={x.href}><Link href={x.href} aria-current={cur(x.href)}>{x.n}</Link></li>)}</ul></nav>
      <Link className="btn sm" data-magnetic href="/contact">Let's talk <i>→</i></Link>
      <button className="burger" aria-expanded={open} aria-controls="mm" aria-label="Menu" onClick={() => setOpen(!open)}><span /><span /></button></header>
    <div id="mm" className={'mm' + (open ? ' open' : '')} aria-hidden={!open}><ul>{[...items, { href: '/contact', n: 'Contact' }].map((x, i) => <li key={x.href} style={{ '--i': i }}><Link href={x.href} tabIndex={open ? 0 : -1}>{x.n}</Link></li>)}</ul><p>hello@your-domain.com · +00 000 000 0000</p></div></>);
}
