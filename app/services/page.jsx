import Art from '@/components/Art';
import { Head, CTA } from '@/components/Bits';
import Pager from '@/components/Pager';
import { SERVICES, slugify } from '@/data/agency';
export const metadata = { title: 'Services | Digital Train' };
export default function Services() {
  return (<><Head kicker="Services" title="Everything a brand needs to grow." lead="Eleven disciplines, one plan. Use one service or combine several." />
    <nav className="svn" aria-label="Services">{SERVICES.map((s) => <a key={s.n} href={'#' + slugify(s.n)} data-spy-link={slugify(s.n)}>{s.n}</a>)}</nav>
    {SERVICES.map((s, i) => (<section className="svr" id={slugify(s.n)} data-spy-sec key={s.n}><div className="art" data-mask><Art seed={i + 11} a={s.a} b={s.b} kind={i % 5} bg={['#0e1429', '#1a1330', '#101c24', '#1b1410'][i % 4]} /></div>
      <div><span className="kick">{String(i + 1).padStart(2, '0')} · {s.tag}</span><h2 className="h2" style={{ fontSize: 'clamp(2rem,4.4vw,4rem)' }} data-split>{s.n}</h2><p className="lead" style={{ marginTop: 18 }} data-reveal>{s.d}</p>
        <ul>{s.pts.map((x) => <li key={x}>{x}</li>)}</ul><div className="k">{s.k[0]}<small>{s.k[1]}</small></div></div></section>))}
    <p className="demo" style={{ padding: '0 var(--px) 60px' }}>Figures shown are illustrative demo data, not guaranteed or verified results.</p><CTA /><Pager /></>);
}
