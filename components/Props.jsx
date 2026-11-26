'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Floating 3D props behind page headers: route nodes, tickets, rails and a signal lamp. Reacts to the pointer.
export default function Props() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, R = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true }), S = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    cam.position.z = 14; R.setPixelRatio(Math.min(devicePixelRatio, 2)); S.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dl = new THREE.DirectionalLight(0xffb27a, 2.2); dl.position.set(5, 6, 8); S.add(dl);
    const G = [new THREE.IcosahedronGeometry(1, 0), new THREE.TorusGeometry(0.9, 0.12, 12, 40), new THREE.OctahedronGeometry(0.9), new THREE.BoxGeometry(1.6, 0.9, 0.06), new THREE.CylinderGeometry(0.16, 0.16, 1.8, 12)], K = [0xff6a4a, 0xe8b66f, 0xf3ece1, 0x8a9bff], items = [];
    for (let i = 0; i < 18; i++) { const m = new THREE.Mesh(G[i % 5], new THREE.MeshStandardMaterial({ color: K[i % 4], metalness: 0.35, roughness: 0.3, wireframe: i % 5 === 0 }));
      m.position.set((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 9, -Math.random() * 7); m.scale.setScalar(0.5 + Math.random() * 0.7); m.userData = { s: Math.random() * 6, r: 0.15 + Math.random() * 0.5, y: m.position.y }; S.add(m); items.push(m); }
    const lamp = new THREE.Group(), bulb = new THREE.Mesh(new THREE.SphereGeometry(0.35, 20, 20), new THREE.MeshBasicMaterial({ color: 0xff6a4a })); lamp.add(bulb);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3, 8), new THREE.MeshStandardMaterial({ color: 0xaab3c3 })); pole.position.y = -1.7; lamp.add(pole); lamp.position.set(7, 1, 0); S.add(lamp);
    let mx = 0, my = 0; const pm = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }; addEventListener('pointermove', pm);
    const size = () => { const w = c.clientWidth, h = c.clientHeight; R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }; size(); const ro = new ResizeObserver(size); ro.observe(c);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; let raf;
    const loop = (n) => { const t = reduce ? 0 : n * 0.001; items.forEach((m) => { const u = m.userData; m.rotation.x = t * u.r; m.rotation.y = t * u.r * 1.3; m.position.y = u.y + Math.sin(t * 0.6 + u.s) * 0.5; });
      bulb.material.color.set(Math.sin(t * 1.4) > 0 ? 0xff6a4a : 0x7ee0a0); cam.position.x += (mx * 2 - cam.position.x) * 0.04; cam.position.y += (-my * 1.2 - cam.position.y) * 0.04; cam.lookAt(0, 0, 0); R.render(S, cam); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', pm); ro.disconnect(); R.dispose(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}
