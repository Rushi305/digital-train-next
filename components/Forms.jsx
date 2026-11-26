'use client';
import { useState } from 'react';
import { SV } from '@/data/content';
const EM = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
export function useForm(url, rules) {
  const [st, setSt] = useState('idle'), [er, setEr] = useState({});
  async function submit(e) {
    e.preventDefault(); const d = Object.fromEntries(new FormData(e.target)), x = {};
    rules.forEach(([k, re, m]) => { if (!re.test((d[k] || '').trim())) x[k] = m; }); setEr(x); if (Object.keys(x).length) return;
    setSt('sending');
    try { const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); const j = await r.json(); if (!r.ok) { setEr(j.errors || {}); setSt('idle'); return; } setSt('done'); }
    catch { setEr({ email: 'Could not send. Please email us directly.' }); setSt('idle'); }
  }
  return { st, er, submit };
}
const F = ({ n, er, ...p }) => <div><input name={n} aria-label={p.placeholder} {...p} /><div className="err">{er[n]}</div></div>;
export function ContactForm() {
  const { st, er, submit } = useForm('/api/contact', [['name', /.+/, 'Enter your full name.'], ['company', /.+/, 'Enter your company name.'], ['email', EM, 'Enter a valid work email.'], ['phone', /^[+\d][\d\s()-]{6,}$/, 'Enter a valid phone number.']]);
  if (st === 'done') return <div className="okm" role="status">Thanks. Your message is in and we'll reply within one working day.</div>;
  return (<form className="fm" onSubmit={submit} noValidate>
    <F n="name" er={er} placeholder="Full name" autoComplete="name" /><F n="company" er={er} placeholder="Company name" /><F n="email" er={er} type="email" placeholder="Work email" autoComplete="email" /><F n="phone" er={er} type="tel" placeholder="Phone number" />
    <div className="w2"><select name="service" aria-label="Services interested in" defaultValue=""><option value="">Services interested in</option>{Object.keys(SV).map((k) => <option key={k}>{k}</option>)}</select></div>
    <div className="w2"><textarea name="details" placeholder="Project details" aria-label="Project details" /></div>
    <div className="w2 row"><button className="btn" type="submit" disabled={st === 'sending'}>{st === 'sending' ? 'Sending…' : 'Book a discovery call'}</button><a className="btn o" href="mailto:hello@your-domain.com">Let's talk</a></div></form>);
}
export function AuditForm() {
  const { st, er, submit } = useForm('/api/audit', [['url', /.+\..+/, 'Enter your website.'], ['email', EM, 'Enter a valid work email.']]);
  if (st === 'done') return <p role="status">Thanks. We'll send your audit within a few working days.</p>;
  return (<form className="fm" onSubmit={submit} noValidate><F n="url" er={er} placeholder="yourwebsite.com" /><F n="email" er={er} type="email" placeholder="Work email" /><button className="btn" type="submit">Request audit</button></form>);
}

export function NewsletterForm() {
  const [d, setD] = useState(false);
  return d ? <p role="status">Thanks. You're on the list.</p> : (<form className="nl" onSubmit={(e) => { e.preventDefault(); if (EM.test(e.target.email.value)) setD(true); }} noValidate><input name="email" type="email" placeholder="Your email" aria-label="Email for newsletter" /><button type="submit">Join →</button></form>);
}
