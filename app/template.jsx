'use client';
import { useEffect } from 'react';
import Motion from '@/components/Motion';
export default function Template({ children }) {
  useEffect(() => { window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0); }, []);
  return (<>
    <Motion />
    <div className="wipe" aria-hidden="true"><svg viewBox="0 0 560 90" fill="#f3ece1">
      <path d="M470 66V30h40l40 24v12z" fill="#ff6a4a" />
      {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 150} y="26" width="140" height="40" rx="8" />)}
      {[0, 1, 2].map((i) => [0, 1, 2, 3, 4].map((j) => <rect key={i + '-' + j} x={22 + i * 150 + j * 25} y="36" width="16" height="12" rx="2" fill="#e69a58" />))}
      {[30, 100, 180, 250, 330, 400, 490, 530].map((x) => <circle key={x} cx={x} cy="72" r="10" />)}
    </svg></div>
    {children}
  </>);
}
