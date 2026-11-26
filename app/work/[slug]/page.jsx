import Link from 'next/link';
import { notFound } from 'next/navigation';
import Art from '@/components/Art';
import { Counter, CTA } from '@/components/Bits';
import { PROJECTS } from '@/data/agency';
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));
export const generateMetadata = ({ params }) => ({ title: (PROJECTS.find((p) => p.slug === params.slug) || {}).name + ' | Digital Train' });
export default function Case({ params }) {
  const i = PROJECTS.findIndex((p) => p.slug === params.slug); if (i < 0) notFound();
  const p = PROJECTS[i], nx = PROJECTS[(i + 1) % PROJECTS.length];
  return (<><header className="ph" style={{ paddingBottom: 40 }}><span className="kick">{p.industry} · Demo case study</span><h1 className="dsp" data-split>{p.name}</h1><p className="lead" data-reveal>{p.focus}. Illustrative project with sample data.</p></header>
    <div className="cs-hero" data-mask><Art seed={i + 2} a={p.a} b={p.b} bg={p.bg} kind={p.kind} /></div>
    <div className="meta"><div><small>Industry</small>{p.industry}</div><div><small>Year</small>{p.year}</div><div><small>Services</small>{p.svc.join(', ')}</div></div>
    <section className="sec"><div className="stg" data-stagger>{p.results.map((r) => <div key={r.l}><Counter s={r} /><span>{r.l}</span></div>)}</div><p className="demo">Fictional demonstration data. Not verified results achieved by the agency.</p>
      {[['Challenge', p.challenge], ['Strategy', p.strategy], ['Execution', p.execution]].map(([h, t]) => <div className="cs-grid" key={h} data-reveal><h2 className="h2" style={{ fontSize: 'clamp(1.8rem,3.4vw,3rem)' }}>{h}</h2><p>{t}</p></div>)}</section>
    <Link className="sec light" data-theme="light" href={'/work/' + nx.slug} data-cursor="Next" style={{ display: 'block', textDecoration: 'none' }}><span className="kick">Next project</span><span className="dsp" style={{ fontFamily: 'Fraunces,serif', fontWeight: 300 }}>{nx.name} →</span></Link><CTA /></>);
}
