import Link from 'next/link';
import Hero from '@/components/Hero';
import Journey from '@/components/Journey';
import ServiceList from '@/components/ServiceList';
import Logos from '@/components/Logos';
import { Steps, Counter, CTA, ProjectCard } from '@/components/Bits';
import { PROJECTS, STATS, QUOTES, PROCESS } from '@/data/agency';
export default function Home() {
  const q = QUOTES.map((x) => <figure key={x.n}><blockquote>“{x.q}”</blockquote><figcaption><b>{x.n}</b>, {x.r}, {x.c}<br />{x.t} · illustrative testimonial</figcaption></figure>);
  return (<>
    <Hero />
    <section className="sec light intro" data-theme="light"><span className="kick">The agency</span>
      <p className="big" data-split>We help ambitious brands grow with strategy, creative and media that answer to one number.</p><p className="big"><mark data-hl>Measurable growth.</mark></p>
      <div className="facts" data-stagger><div><b>One team</b><p>Strategy, creative, media and development working from the same plan.</p></div><div><b>Plain reporting</b><p>Goals agreed up front and numbers you can read in two minutes.</p></div><div><b>Built to scale</b><p>We test, learn and back what works.</p></div></div></section>
    <div data-theme="dark"><Journey /></div>
    <section className="sec" data-theme="dark"><span className="kick">What we do</span><h2 className="h2" data-split style={{ marginBottom: 60, maxWidth: '12em' }}>Eleven ways to move a brand forward.</h2><ServiceList /></section>
    <section className="hs" data-hs data-theme="dark"><div className="hs-head"><div><span className="kick">Selected work</span><h2 className="h2" data-split>Ideas turned into impact.</h2></div><Link className="btn o" href="/work">All projects <i>→</i></Link></div>
      <div className="hs-in"><div className="hs-track">{PROJECTS.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}</div></div></section>
    <p className="demo" style={{ padding: '30px var(--px) 0' }}>Featured projects are illustrative demo case studies with sample data.</p>
    <section className="sec light" data-theme="light"><span className="kick">By the numbers</span><div className="stg" data-stagger>{STATS.map((s) => <div key={s.l}><Counter s={s} /><span>{s.l}</span></div>)}</div><p className="demo">Demo statistics for illustration. Replace with verified agency figures.</p></section>
    <Logos />
    <section className="tq" data-theme="dark" aria-label="Testimonials"><div style={{ padding: '0 var(--px) 50px' }}><span className="kick">Kind words</span><h2 className="h2" data-split>Don't just take our word for it.</h2></div><div className="mqr"><div className="mqt"><div style={{ display: 'flex' }}>{q}</div><div style={{ display: 'flex' }} aria-hidden="true">{q}</div></div></div></section>
    <Steps items={PROCESS} light /><CTA /></>);
}
