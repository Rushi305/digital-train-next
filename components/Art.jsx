// Procedural art for demo projects and services: SVG compositions seeded per item (no stock photos).
export default function Art({ seed = 1, a = '#ff6a4a', b = '#e8b66f', bg = '#10162b', kind = 0 }) {
  const r = (i) => { const x = Math.sin(seed * 997 + i * 131) * 10000; return x - Math.floor(x); };
  const n = (i, lo, hi) => lo + r(i) * (hi - lo), c = (i) => (r(i) > 0.5 ? a : b);
  let s = [];
  if (kind === 0) s = [0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={n(i, 200, 600)} cy={n(i + 9, 200, 400)} r={n(i + 3, 60, 260)} fill="none" stroke={c(i)} strokeWidth={n(i + 5, 1, 14)} opacity=".85" />);
  if (kind === 1) s = Array.from({ length: 12 }, (_, i) => <rect key={i} x={40 + i * 62} y={600 - n(i, 120, 520)} width="44" height={n(i, 120, 520)} fill={c(i)} opacity={0.6 + r(i + 4) * 0.4} />);
  if (kind === 2) s = [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={n(i, 150, 650)} cy={n(i + 7, 150, 450)} r={n(i + 2, 50, 190)} fill={c(i)} opacity={0.5 + r(i) * 0.4} />);
  if (kind === 3) s = Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${-100 + i * 70} 600 L${200 + i * 70} 0`} stroke={c(i)} strokeWidth={n(i, 2, 22)} opacity=".8" />);
  if (kind === 4) s = Array.from({ length: 7 }, (_, i) => <rect key={i} x={n(i, 40, 560)} y={n(i + 5, 30, 380)} width={n(i + 2, 100, 280)} height={n(i + 8, 80, 220)} fill={c(i)} opacity={0.55 + r(i + 1) * 0.4} />);
  return (<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><rect width="800" height="600" fill={bg} />
    <g>{s}</g><rect x="0" y="470" width="800" height="130" fill={bg} opacity=".55" /><path d="M0 560H800" stroke={a} strokeWidth="2" opacity=".7" /><path d="M0 575H800" stroke={a} strokeWidth="1" strokeDasharray="6 10" opacity=".5" /></svg>);
}
