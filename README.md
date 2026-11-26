# Digital Train (Next.js + React + Three.js + Express)

    npm install
    npm run dev          # http://localhost:3000
    npm run build && npm start

- Pages: / (hero + train journey), /about, /services, /work, /team, /insights, /contact. A train wipe plays on every route change, and each page ends with previous/next pagination.
- Express (server.js) serves Next and handles POST /api/contact and /api/audit with server-side validation. Set CRM_WEBHOOK_URL (see .env.example) to forward submissions, or add nodemailer in notify().
- 3D: lib/scene.js (hero light ribbons and the train), components/Props.jsx (floating props on inner pages).
- Placeholders in [brackets], zero stats and sample contact details are yours to replace.

## Redesign notes
- Motion: GSAP + ScrollTrigger and Lenis. Components/Motion.jsx reads data attributes: data-split (word reveal), data-reveal, data-stagger, data-mask (image mask + zoom), data-parallax, data-count, data-hl (text highlight), data-hs (pinned horizontal scroll), data-steps (sticky changing content), data-theme (dark/light switching), data-magnetic.
- All case studies, statistics, testimonials, clients and articles in data/agency.js are illustrative demo content and labelled as such.
- Pages: /, /services, /work, /work/[slug], /about, /insights, /insights/[slug], /contact. Reduced-motion users get static content.
