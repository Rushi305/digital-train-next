import { CLIENTS } from '@/data/agency';
const COL = ['#ff6a4a', '#e8b66f', '#8a9bff', '#7ad7e8', '#ff8fa0', '#9be0b0'];
const mark = (i, c) => [<circle key="a" cx="12" cy="12" r="10" fill={c} />, <rect key="b" x="3" y="3" width="18" height="18" fill={c} />, <path key="c" d="M12 2 22 22H2z" fill={c} />, <path key="d" d="M2 12a10 10 0 0 1 20 0z" fill={c} />, <g key="e"><circle cx="8" cy="12" r="7" fill={c} /><circle cx="16" cy="12" r="7" fill={c} opacity=".6" /></g>, <path key="f" d="M12 1l3 8h8l-6.5 5 2.5 8-7-5-7 5 2.5-8L1 9h8z" fill={c} />][i % 6];
function Row({ items, rev, d, off = 0 }) {
  const list = items.map((n, i) => <div className={'lg s' + ((i + off) % 4)} key={n}><svg viewBox="0 0 24 24" aria-hidden="true">{mark(i + off, COL[(i + off) % 6])}</svg>{n}</div>);
  return (<div className={'mqr' + (rev ? ' rev' : '')}><div className="mqt" style={{ '--d': d }}><div style={{ display: 'flex' }}>{list}</div><div style={{ display: 'flex' }} aria-hidden="true">{list}</div></div></div>);
}
export default function Logos() {
  return (<section className="mqw" aria-label="Our clients"><h2 className="h2" data-split>Good company. Better growth.</h2>
    <Row items={CLIENTS.slice(0, 8)} d="70s" /><Row items={CLIENTS.slice(8)} rev d="80s" off={2} />
    <p className="demo" style={{ padding: '24px var(--px) 0' }}>Client names are fictional demo brands used for illustration.</p></section>);
}
