'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { createHero } from '@/lib/scene';
export default function Hero() {
  const hc = useRef(), ht = useRef();
  useEffect(() => {
    const h = createHero(hc.current); let raf, pT = 0; const rs = () => h.resize(); addEventListener('resize', rs);
    const loop = (n) => { const dt = Math.min(0.05, (n - pT) / 1000 || 0); pT = n; const hp = Math.min(1, scrollY / innerHeight);
      if (hp < 1) { h.render(dt, hp); ht.current.style.opacity = 1 - Math.min(1, hp * 1.6); ht.current.style.transform = `translateY(${-hp * 50}px)`; }
      raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', rs); h.dispose(); };
  }, []);
  return (<header id="hero"><canvas id="hc" ref={hc} aria-hidden="true" /><div className="hglow" />
    <div id="ht" ref={ht}><h1><span><i>Your brand's next</i></span><span><i>big journey starts</i></span><span><i>here.</i></span></h1>
      <p>We turn ideas into impact through creative strategy, powerful digital experiences and marketing that drives measurable growth.</p>
      <div className="row"><a className="btn" href="#contact">Start your journey</a><a className="btn o" href="#journey">Explore our world</a></div></div>
    <div className="cue">SCROLL TO DEPART</div></header>);
}
