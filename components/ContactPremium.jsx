'use client';
import { useState } from 'react';
import { useForm } from './Forms';
const EM = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/, TYPES = ['Strategy', 'Social media', 'Paid ads', 'SEO', 'Content', 'Branding', 'Website', 'Lead generation', 'Analytics'], BUD = ['Under 2k', '2k – 5k', '5k – 15k', '15k – 40k', '40k+'];
const Opt = ({ n, v, t }) => <label><input type={t} name={n} value={v} /><span>{v}</span></label>;
export default function ContactPremium() {
  const { st, er, submit } = useForm('/api/contact', [['name', /.+/, 'Enter your full name.'], ['company', /.+/, 'Enter your company name.'], ['email', EM, 'Enter a valid work email.'], ['phone', /^[+\d][\d\s()-]{6,}$/, 'Enter a valid phone number.']]), [cp, setCp] = useState(false);
  const F = ({ n, ...p }) => <div><input name={n} aria-label={p.placeholder} {...p} /><div className="err">{er[n]}</div></div>;
  if (st === 'done') return <div className="okm" role="status">Thanks. Your enquiry is in and we'll reply within one working day.</div>;
  return (<form className="fm" onSubmit={submit} noValidate>
    <F n="name" placeholder="Full name" autoComplete="name" /><F n="company" placeholder="Company name" /><F n="email" type="email" placeholder="Work email" autoComplete="email" /><F n="phone" type="tel" placeholder="Phone number" />
    <fieldset className="w2" style={{ border: 0, padding: 0 }}><legend className="fl">Project type</legend><div className="opts">{TYPES.map((x) => <Opt key={x} n="projectType" v={x} t="radio" />)}</div></fieldset>
    <fieldset className="w2" style={{ border: 0, padding: 0 }}><legend className="fl">Budget range (per month or project)</legend><div className="opts">{BUD.map((x) => <Opt key={x} n="budget" v={x} t="radio" />)}</div></fieldset>
    <div className="w2"><textarea name="details" placeholder="Tell us about your goals" aria-label="Project details" /></div>
    <div className="w2 row"><button className="btn" data-magnetic type="submit" disabled={st === 'sending'}>{st === 'sending' ? 'Sending…' : 'Send enquiry'} <i>→</i></button></div></form>);
}
export function CopyMail() {
  const [c, setC] = useState(false);
  return <button data-cursor="Copy" onClick={() => { navigator.clipboard && navigator.clipboard.writeText('hello@your-domain.com'); setC(true); setTimeout(() => setC(false), 1800); }}><small>{c ? 'Copied' : 'Email · click to copy'}</small>hello@your-domain.com</button>;
}
