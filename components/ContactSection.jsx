'use client';
import { usePathname } from 'next/navigation';
import { ContactForm } from './Forms';
export default function ContactSection() {
  if (usePathname() === '/contact') return null;
  return (<section className="sec" id="contact" data-theme="dark"><span className="kick">Start a project</span><h2 className="h2" data-split>Ready to take your brand to the next level?</h2>
    <p className="lead" style={{ margin: '24px 0 40px' }}>Every great journey starts with a conversation. Let's build something extraordinary together.</p><ContactForm />
    <p className="demo">hello@your-domain.com · +00 000 000 0000 · Office location</p></section>);
}
