'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = new Lenis({ lerp: 0.09, anchors: true }); window.__lenis = l; l.on('scroll', ScrollTrigger.update);
    const f = (t) => l.raf(t * 1000); gsap.ticker.add(f); gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(f); l.destroy(); window.__lenis = null; };
  }, []);
  return null;
}
