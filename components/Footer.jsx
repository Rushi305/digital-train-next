import Link from 'next/link';
import { NewsletterForm } from './Forms';
import { SERVICES, slugify } from '@/data/agency';
export default function Footer() {
  return (<footer className="ft" data-theme="dark"><div className="rail" aria-hidden="true" />
    <p className="big">Let's make growth<br />look easy.</p><a className="mail ul" href="mailto:hello@your-domain.com">hello@your-domain.com</a>
    <div className="cols"><div><h4>Explore</h4><ul>{['about', 'services', 'work', 'insights', 'contact'].map((x) => <li key={x}><Link className="ul" href={'/' + x} style={{ textTransform: 'capitalize' }}>{x}</Link></li>)}</ul></div>
      <div><h4>Services</h4><ul>{SERVICES.slice(0, 6).map((s) => <li key={s.n}><Link className="ul" href={'/services#' + slugify(s.n)}>{s.n}</Link></li>)}</ul></div>
      <div><h4>Contact</h4><ul><li>hello@your-domain.com</li><li>+00 000 000 0000</li><li>Office location</li></ul><h4 style={{ marginTop: 22 }}>Social</h4><ul><li>LinkedIn · Instagram · Facebook</li></ul></div>
      <div><h4>Newsletter</h4><p style={{ color: 'var(--mute)', fontSize: '.9rem' }}>One useful email a month. No spam.</p><NewsletterForm /></div></div>
    <div className="ghost" aria-hidden="true">Digital Train · Digital Train</div>
    <div className="sub"><span>© {new Date().getFullYear()} Digital Train. All rights reserved.</span><span><a className="ul" href="#">Privacy Policy</a> &nbsp; <a className="ul" href="#">Terms and Conditions</a></span></div></footer>);
}
