import { Head } from '@/components/Bits';
import ContactPremium, { CopyMail } from '@/components/ContactPremium';
import Pager from '@/components/Pager';
import { FAQ } from '@/data/content';
export const metadata = { title: 'Contact | Digital Train' };
export default function Contact() {
  return (<><Head kicker="Contact" title="Let's plan your next stop." lead="Tell us where you want to go. We'll reply within one working day." />
    <section className="sec" style={{ paddingTop: 0 }}><div className="cg"><div><ContactPremium /></div>
      <div className="cd"><CopyMail /><a href="tel:+000000000000"><small>Phone</small>+00 000 000 0000</a><a href="#"><small>Office</small>Office location</a><a href="#"><small>LinkedIn</small>Follow us →</a><a href="#"><small>Instagram</small>@digitaltrain →</a><a href="#"><small>Facebook</small>Like us →</a></div></div></section>
    <section className="sec light" data-theme="light"><span className="kick">Good to know</span><h2 className="h2" data-split>Questions before you board.</h2><div style={{ marginTop: 50, maxWidth: '50em' }}>{FAQ.map(([q, a]) => <details key={q} style={{ borderTop: '1px solid var(--line)', padding: '18px 0' }}><summary style={{ cursor: 'pointer', font: '300 1.4rem Fraunces,serif' }}>{q}</summary><p style={{ marginTop: 8, color: 'var(--mute)' }}>{a}</p></details>)}</div></section><Pager /></>);
}
