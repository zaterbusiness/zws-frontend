import React, { useState } from 'react'
import zaterLogo from '../assets/zater-logo.jpeg'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <>
      <style>{CSS}</style>
      <footer className="ft-root">
        <div className="ft-glow" />
        <div className="ft-inner">

          {/* ── TOP GRID ── */}
          <div className="ft-top">

            {/* Brand */}
            <div className="ft-brand">
              <div className="ft-logo">
                <img src={zaterLogo} alt="Zater" className="ft-logo-img" />
                <span className="ft-logo-text">Zater Web Studio</span>
              </div>
              <p className="ft-tagline">
                The fastest way to turn your ideas into beautiful, professional websites — powered by Claude AI.
              </p>
              <div className="ft-prices">
                <div className="ft-price-pill">
                  <span>👁️</span>
                  <div>
                    <div className="ft-price-name">Preview</div>
                    <div className="ft-price-val ft-price-free">FREE</div>
                  </div>
                </div>
                <span className="ft-price-arrow">→</span>
                <div className="ft-price-pill">
                  <span>💾</span>
                  <div>
                    <div className="ft-price-name">Download</div>
                    <div className="ft-price-val">₹99</div>
                  </div>
                </div>
              </div>
              <div className="ft-socials">
                {SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="ft-social" title={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div className="ft-col">
              <div className="ft-col-title">Product</div>
              <ul className="ft-links">
                <li><button className="ft-link" onClick={() => navigate('/home')}>🏠 Home</button></li>
                <li><button className="ft-link" onClick={() => navigate('/projects')}>📁 My Projects</button></li>
                <li><button className="ft-link" onClick={() => navigate('/payments')}>💳 Payments</button></li>
                <li><a className="ft-link" onClick={() => document.getElementById('tpl-gallery').scrollIntoView({ behavior: 'smooth' })}>🎨 Templates</a></li>
                <li><a className="ft-link" href="/deployments">📍Deployments</a></li>
              </ul>
            </div>

            {/* Company / About */}
            <div className="ft-col">
              <div className="ft-col-title">Company</div>
              <ul className="ft-links">
                <li><a className="ft-link" href="/about">👋 About Us</a></li>
                <li><a className="ft-link" href="/blog">📝 Blog</a></li>
                <li><a className="ft-link" href="/careers">🚀 Careers<span className="ft-badge ft-badge-green">HIRING</span></a></li>
                <li><a className="ft-link" href="/advertise">📢 Ad Support</a></li>
                <li><a className="ft-link" href="/contact">✉️ Contact Us</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="ft-col">
              <div className="ft-col-title">Support</div>
              <ul className="ft-links">
                <li><a className="ft-link" href="/help">❓ Help Center</a></li>
                <li><a className="ft-link" href="/docs">📚 Documentation</a></li>
                <li><a className="ft-link" href="/credits-info">🔌 Credits Reference</a></li>
                <li><a className="ft-link" href="/status">🟢 Status Page</a></li>
                <li><a className="ft-link" href="/report-bug">🐛 Report a Bug</a></li>
              </ul>
            </div>

            {/* Contact only (no newsletter) */}
            <div className="ft-col ft-col-wide">
              <div className="ft-col-title">Contact Us</div>
              <div className="ft-contacts">
                {CONTACTS.map((c, i) => (
                  <a key={i} href={c.href} className="ft-contact-row">
                    <span className="ft-contact-icon">{c.icon}</span>
                    <span className="ft-contact-text">{c.text}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── ABOUT STRIP ── */}
          <div className="ft-about">
            <div className="ft-about-left">
              <div className="ft-about-title">About Zater Web Studio</div>
              <p className="ft-about-desc">
                Zater Web Studio is an AI-powered website builder based in India 🇮🇳. We believe every business,
                freelancer, and creator deserves a professional online presence — fast and affordable.
                Built with Claude AI by Anthropic, React, Node.js, and MySQL.
              </p>
            </div>
            <div className="ft-stats">
              {STATS.map((s, i) => (
                <div key={i} className="ft-stat">
                  <div className="ft-stat-num">{s.num}</div>
                  <div className="ft-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="ft-bottom">
            <div className="ft-bottom-left">
              <span className="ft-copy">© {year} Zater Web Studio. All rights reserved.</span>
              <span className="ft-made">Made with ❤️ in India 🇮🇳</span>
            </div>
            <div className="ft-legal">
              {LEGAL.map((l, i) => (
                <React.Fragment key={i}>
                  <a href={l.href} className="ft-legal-link">{l.label}</a>
                  {i < LEGAL.length - 1 && <span className="ft-legal-sep">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── TECH STRIP ── */}
          <div className="ft-tech">
            <span className="ft-tech-label">Powered by</span>
            {TECH.map((t, i) => (
              <div key={i} className="ft-tech-pill"><span>{t.icon}</span><span>{t.name}</span></div>
            ))}
          </div>

        </div>
      </footer>
    </>
  )
}
/* ── PASTE THIS INTO YOUR FOOTER JSX ── */
/* Updated Company column + CONTACTS array */

/* 1. Update CONTACTS array at the top of your footer file */
const CONTACTS = [
  { icon: "✉️", text: "zaterbusiness@gmail.com", href: "mailto:zaterbusiness@gmail.com" },
  { icon: "💬", text: "+91 97890 49321 (WhatsApp)", href: "https://wa.me/919789049321" },
];

/* 2. Replace the Company column JSX in your footer */
{/* Company / About */}
<div className="ft-col">
  <div className="ft-col-title">Company</div>
  <ul className="ft-links">
    <li><a className="ft-link" href="/about">👋 About Us</a></li>
    <li><a className="ft-link" href="/advertise">📢 Advertise with Us</a></li>
    <li><a className="ft-link" href="#blog">📝 Blog</a></li>
    <li><a className="ft-link" href="#careers">🚀 Careers<span className="ft-badge ft-badge-green">HIRING</span></a></li>
    <li><a className="ft-link" href="/contact">✉️ Contact Us</a></li>
  </ul>
</div>
// ── DATA ─────────────────────────────────────────────────────

// ── Replace the SOCIALS array with this ──

const SOCIALS = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/zaterstudio',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-6.8L4.5 22H1.3l8.1-9.3L1 2h7.2l5 6.3L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/zater-design-services/',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1MEiSaMUvN/',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.95 8.44-9.94Z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/zaterbusiness',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.3 6.84 9.65.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/zater_web_studio?stkn=MTI5cjJoYzI4dnJrdA==',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47C15.06 21.99 14.72 22 12 22s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.72.36-1.03.67-.31.31-.51.61-.67 1.03-.12.31-.26.78-.3 1.65C4.26 8.5 4.25 8.83 4.25 10.5v3c0 1.67.01 2 .06 3.04.04.87.18 1.34.3 1.65.16.42.36.72.67 1.03.31.31.61.51 1.03.67.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.72-.36 1.03-.67.31-.31.51-.61.67-1.03.12-.31.26-.78.3-1.65.05-1.04.06-1.37.06-3.04v-1c0-1.67-.01-2-.06-3.04-.04-.87-.18-1.34-.3-1.65a2.75 2.75 0 0 0-.67-1.03 2.75 2.75 0 0 0-1.03-.67c-.31-.12-.78-.26-1.65-.3C14.99 5.81 14.67 5.8 12 5.8ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm4.8-2a1.08 1.08 0 1 1 0 2.15 1.08 1.08 0 0 1 0-2.15Z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Zater-business',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M23.5 6.75a3.02 3.02 0 0 0-2.12-2.14C19.5 4 12 4 12 4s-7.5 0-9.38.61A3.02 3.02 0 0 0 .5 6.75 31.6 31.6 0 0 0 0 12c0 1.75.17 3.51.5 5.25a3.02 3.02 0 0 0 2.12 2.14C4.5 20 12 20 12 20s7.5 0 9.38-.61a3.02 3.02 0 0 0 2.12-2.14c.33-1.74.5-3.5.5-5.25 0-1.75-.17-3.51-.5-5.25ZM9.6 15.4V8.6L15.8 12 9.6 15.4Z"/>
      </svg>
    ),
  },
]



const STATS = [
  { num: '50', label: 'Sites Built' },
  { num: '10',  label: 'Happy Users' },
  { num: '< 1Min',   label: 'Generation Time' },
  { num: '99.9%',   label: 'Uptime' },
]

const LEGAL = [
  { label: 'Privacy Policy',   href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Refund Policy',    href: '#refund' },
  { label: 'Cookie Policy',    href: '#cookies' },
]

const TECH = [
  { icon: '⚛️', name: 'React' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🐬', name: 'MySQL' },
  { icon: '🤖', name: 'Claude AI' },
  { icon: '💳', name: 'Razorpay' },
  { icon: '⚡', name: 'Vite' },
]

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');

/* ── ROOT ── */
.ft-root{
  position:relative;background:#0a0a12;
  font-family:'Nunito',sans-serif;overflow:hidden;
}
.ft-root::before{
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px);
  background-size:28px 28px;pointer-events:none;
}
.ft-glow{
  position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:700px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(91,79,255,0.7),transparent);
  box-shadow:0 0 50px 10px rgba(91,79,255,0.12);
}
.ft-inner{
  position:relative;z-index:1;
  max-width:1100px;margin:0 auto;padding:60px 28px 0;
}

/* ── TOP GRID ── */
.ft-top{
  display:grid;
  grid-template-columns:230px 1fr 1fr 1fr 220px;
  gap:36px;
  padding-bottom:44px;
  border-bottom:1px solid rgba(255,255,255,0.07);
}

/* Brand */
.ft-brand{display:flex;flex-direction:column;gap:0;}
.ft-logo{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.ft-logo-img{width:32px;height:32px;border-radius:8px;object-fit:cover;border:1px solid rgba(255,255,255,0.1);}
.ft-logo-text{font-family:'Playfair Display',serif;font-size:16px;font-weight:800;color:#fff;letter-spacing:-0.2px;}
.ft-tagline{font-size:12px;color:rgba(255,255,255,0.4);font-weight:500;line-height:1.65;margin-bottom:18px;}
.ft-prices{display:flex;align-items:center;gap:8px;margin-bottom:20px;}
.ft-price-pill{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:9px;padding:8px 11px;flex:1;}
.ft-price-pill span:first-child{font-size:16px;}
.ft-price-name{font-size:10px;color:rgba(255,255,255,0.35);font-weight:700;text-transform:uppercase;letter-spacing:0.4px;}
.ft-price-val{font-size:15px;font-weight:900;color:#fff;}
.ft-price-free{color:#4ade80 !important;font-size:14px;}
.ft-price-arrow{font-size:14px;color:rgba(255,255,255,0.2);}

/* Socials */
.ft-socials{display:flex;gap:7px;}
.ft-social{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.09);display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,0.55);text-decoration:none;cursor:pointer;transition:all 0.18s;}
.ft-social:hover{background:rgba(255,255,255,0.13);border-color:rgba(255,255,255,0.22);color:#fff;transform:translateY(-2px);}

/* Columns */
.ft-col{display:flex;flex-direction:column;}
.ft-col-wide{}
.ft-col-title{font-size:11px;font-weight:800;color:rgba(255,255,255,0.9);text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;}
.ft-links{list-style:none;display:flex;flex-direction:column;gap:9px;}
.ft-link{font-size:12.5px;font-weight:500;color:rgba(255,255,255,0.42);background:none;border:none;cursor:pointer;text-decoration:none;font-family:'Nunito',sans-serif;display:inline-flex;align-items:center;gap:6px;transition:color 0.18s;padding:0;text-align:left;}
.ft-link:hover{color:#fff;}
.ft-badge{font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;background:rgba(91,79,255,0.2);color:#a0a8ff;letter-spacing:0.3px;}
.ft-badge-green{background:rgba(34,197,94,0.15);color:#4ade80;}

/* Contacts */
.ft-contacts{display:flex;flex-direction:column;gap:6px;}
.ft-contact-row{display:flex;align-items:center;gap:8px;text-decoration:none;padding:4px 0;transition:opacity 0.18s;}
.ft-contact-row:hover{opacity:0.75;}
.ft-contact-icon{font-size:13px;width:18px;text-align:center;}
.ft-contact-text{font-size:12px;font-weight:600;color:rgba(255,255,255,0.45);}

/* ── ABOUT STRIP ── */
.ft-about{
  display:grid;grid-template-columns:1fr auto;gap:40px;
  padding:32px 0;
  border-bottom:1px solid rgba(255,255,255,0.06);
  align-items:center;
}
.ft-about-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:800;color:#fff;margin-bottom:10px;}
.ft-about-desc{font-size:12.5px;color:rgba(255,255,255,0.38);font-weight:500;line-height:1.7;max-width:600px;}
.ft-stats{display:flex;gap:0;}
.ft-stat{padding:14px 22px;text-align:center;border-right:1px solid rgba(255,255,255,0.06);}
.ft-stat:last-child{border-right:none;}
.ft-stat-num{font-family:'Playfair Display',serif;font-size:20px;font-weight:900;color:#fff;margin-bottom:4px;}
.ft-stat-label{font-size:10px;color:rgba(255,255,255,0.3);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;}

/* ── BOTTOM BAR ── */
.ft-bottom{display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-top:1px solid rgba(255,255,255,0.05);}
.ft-bottom-left{display:flex;align-items:center;gap:14px;}
.ft-copy{font-size:12px;color:rgba(255,255,255,0.28);font-weight:500;}
.ft-made{font-size:12px;color:rgba(255,255,255,0.2);font-weight:500;}
.ft-legal{display:flex;align-items:center;gap:5px;}
.ft-legal-link{font-size:11.5px;color:rgba(255,255,255,0.28);text-decoration:none;font-weight:500;transition:color 0.18s;}
.ft-legal-link:hover{color:rgba(255,255,255,0.65);}
.ft-legal-sep{font-size:12px;color:rgba(255,255,255,0.1);}

/* ── TECH STRIP ── */
.ft-tech{display:flex;align-items:center;gap:8px;padding:14px 0 22px;flex-wrap:wrap;}
.ft-tech-label{font-size:10px;color:rgba(255,255,255,0.18);font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin-right:4px;}
.ft-tech-pill{display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);font-size:11px;font-weight:700;color:rgba(255,255,255,0.3);transition:all 0.18s;}
.ft-tech-pill:hover{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.6);}

/* ── RESPONSIVE ── */
@media(max-width:1000px){
  .ft-top{grid-template-columns:1fr 1fr 1fr;gap:28px;}
  .ft-brand{grid-column:1/-1;}
  .ft-col-wide{grid-column:span 2;}
  .ft-about{grid-template-columns:1fr;gap:24px;}
  .ft-stats{flex-wrap:wrap;}
}
@media(max-width:600px){
  .ft-top{grid-template-columns:1fr 1fr;gap:24px;}
  .ft-brand{grid-column:1/-1;}
  .ft-col-wide{grid-column:1/-1;}
  .ft-bottom{flex-direction:column;gap:10px;text-align:center;}
  .ft-bottom-left{flex-direction:column;gap:4px;}
  .ft-inner{padding:44px 20px 0;}
}
`