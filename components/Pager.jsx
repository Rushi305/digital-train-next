'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PAGES } from '@/data/content';
export default function Pager() {
  const p = usePathname(), i = Math.max(0, PAGES.findIndex((x) => x.href !== '/' && p.startsWith(x.href))), prev = PAGES[i - 1], next = PAGES[i + 1];
  return (<div className="pager" role="navigation" aria-label="Pagination">{prev ? <Link href={prev.href}><small>PREVIOUS</small>← {prev.n}</Link> : <span />}{next ? <Link href={next.href} style={{ textAlign: 'right' }}><small>NEXT</small>{next.n} →</Link> : <span />}</div>);
}
