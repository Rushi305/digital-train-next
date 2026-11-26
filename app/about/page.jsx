import Art from '@/components/Art';
import { Head, Steps, CTA } from '@/components/Bits';
import Pager from '@/components/Pager';
import { VALUES } from '@/data/agency';
export const metadata = { title: 'About | Digital Train' };
const AP = [['Listen first', 'Every plan starts with your customers, your numbers and what you have already tried.'], ['One story, every channel', 'Search, social, paid and web tell the same story in the right voice for each place.'], ['Prove it, then scale it', 'Small tests first. We only spend big behind what has already earned it.'], ['Report like humans', 'Short reviews, plain language and a clear recommendation every time.']];
export default function About() {
  return (<><Head kicker="About" title="We plan the route. Then we drive the results." lead="Digital Train is a digital marketing agency for brands that want growth they can measure." />
    <section className="sec light" data-theme="light"><span className="kick">Our story</span><p className="intro big" style={{ font: '300 clamp(1.8rem,4vw,3.6rem)/1.15 Fraunces,serif', maxWidth: '20em' }} data-split>We started with a simple frustration: agencies that report activity instead of outcomes. So we built one that does the opposite.</p>
      <div className="facts" data-stagger><div><b>Mission</b><p>Help ambitious brands grow with marketing they can measure and a story worth following.</p></div><div><b>Vision</b><p>An agency that is as good at craft as it is at the numbers.</p></div><div><b>Culture</b><p>Small senior team, open calendars, honest feedback and time to experiment.</p></div></div></section>
    <Steps items={VALUES} />
    <section className="hs" data-hs data-theme="dark"><div className="hs-head"><div><span className="kick">Our approach</span><h2 className="h2" data-split>Four habits behind every campaign.</h2></div></div>
      <div className="hs-in"><div className="hs-track">{AP.map(([t, d], i) => <div className="pc" key={t}><div className="art"><Art seed={i + 31} a="#ff6a4a" b="#e8b66f" kind={i} bg="#10162b" /></div><h3>{t}</h3><p style={{ color: 'var(--mute)', marginTop: 8 }}>{d}</p></div>)}</div></div></section>
    <CTA /><Pager /></>);
}
