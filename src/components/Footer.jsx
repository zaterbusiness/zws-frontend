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

const SOCIALS = [
  { icon: '𝕏',  label: 'Twitter / X', href: 'https://twitter.com/zaterstudio' },
  { icon: '💼', label: 'LinkedIn',      href: 'https://linkedin.com/company/zaterstudio' },
  { icon: '📦', label: 'GitHub',        href: 'https://github.com/zaterstudio' },
  { icon: '▶️', label: 'YouTube',       href: 'https://youtube.com/@zaterstudio' },
  { icon: '📸', label: 'Instagram',     href: 'https://instagram.com/zaterstudio' },
]



const STATS = [
  { num: '500', label: 'Sites Built' },
  { num: '500',  label: 'Happy Users' },
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