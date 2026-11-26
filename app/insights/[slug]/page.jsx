import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/data/agency';
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));
export default function Article({ params }) {
  const a = ARTICLES.find((x) => x.slug === params.slug); if (!a) notFound();
  return (<><header className="ph"><span className="kick">{a.cat} · {a.date} · {a.read}</span><h1 className="dsp" style={{ fontSize: 'clamp(2.4rem,7vw,6.5rem)' }} data-split>{a.t}</h1></header>
    <section className="sec body" style={{ paddingTop: 0 }}><p className="lead" style={{ marginBottom: 30 }}>{a.ex}</p>{a.body.map((t, i) => <p key={i} data-reveal>{t}</p>)}<p className="demo">Sample article text. Replace with your own writing.</p><Link className="btn o" href="/insights">← All insights</Link></section></>);
}
