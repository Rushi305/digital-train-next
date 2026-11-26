const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

async function notify(type, data) {
  // Plug in nodemailer / your CRM here. A webhook is supported out of the box.
  if (process.env.CRM_WEBHOOK_URL) {
    await fetch(process.env.CRM_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, ...data, at: new Date().toISOString() }) });
  } else console.log('[' + type + ']', data);
}
const clean = (o) => Object.fromEntries(Object.entries(o || {}).map(([k, v]) => [k, String(v).slice(0, 2000).trim()]));

app.prepare().then(() => {
  const s = express();
  s.disable('x-powered-by');
  s.use(express.json({ limit: '50kb' }));
  s.post('/api/contact', async (req, res) => {
    const b = clean(req.body), errors = {};
    if (!b.name) errors.name = 'Enter your full name.';
    if (!b.company) errors.company = 'Enter your company name.';
    if (!EMAIL.test(b.email || '')) errors.email = 'Enter a valid work email.';
    if (!/^[+\d][\d\s()-]{6,}$/.test(b.phone || '')) errors.phone = 'Enter a valid phone number.';
    if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });
    try { await notify('contact', b); res.json({ ok: true }); } catch (e) { res.status(502).json({ ok: false, errors: { email: 'Could not send. Please email us directly.' } }); }
  });
  s.post('/api/audit', async (req, res) => {
    const b = clean(req.body), errors = {};
    if (!/.+\..+/.test(b.url || '')) errors.url = 'Enter your website.';
    if (!EMAIL.test(b.email || '')) errors.email = 'Enter a valid work email.';
    if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });
    try { await notify('audit', b); res.json({ ok: true }); } catch (e) { res.status(502).json({ ok: false, errors: { email: 'Could not send.' } }); }
  });
  s.all('*', (req, res) => handle(req, res));
  s.listen(process.env.PORT || 3000, () => console.log('Digital Train on http://localhost:' + (process.env.PORT || 3000)));
});
