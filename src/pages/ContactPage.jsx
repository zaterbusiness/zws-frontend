import React, { useState } from "react";
import "./ContactPage.css";

const CONTACTS = [
  {
    icon: "✉️",
    label: "Email Us",
    value: "zaterbusiness@gmail.com",
    href: "mailto:zaterbusiness@gmail.com",
    desc: "We reply within 24 hours",
    color: "contact-blue",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+91 97890 49321",
    href: "https://wa.me/919789049321",
    desc: "Chat with us directly",
    color: "contact-green",
  },
];

const FAQS = [
  { q: "Is preview really free?", a: "Yes! You can generate and preview any website or app completely free. You only pay ₹99 when you want to download the source code." },
  { q: "How does free hosting work?", a: "After generating your site, you can deploy it to our hosting infrastructure at no cost. No credit card required." },
  { q: "Can I customize the generated output?", a: "Absolutely. Our AI-generated output is fully editable — change colors, content, layout, and more for free." },
  { q: "What kind of apps can ZWS generate?", a: "Web apps, landing pages, portfolios, e-commerce stores, dashboards, and mobile-first apps — all powered by Claude AI." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="contact-root">

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-badge">✉️ Contact Us</div>
        <h1 className="contact-hero-title">We'd Love to <span className="contact-accent">Hear From You</span></h1>
        <p className="contact-hero-sub">
          Have questions, feedback, or just want to say hi? Reach out — we're always happy to help.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="contact-section">
        <div className="contact-cards-row">
          {CONTACTS.map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className={`contact-card ${c.color}`}>
              <div className="contact-card-icon">{c.icon}</div>
              <div className="contact-card-label">{c.label}</div>
              <div className="contact-card-value">{c.value}</div>
              <div className="contact-card-desc">{c.desc}</div>
              <div className="contact-card-btn">Open →</div>
            </a>
          ))}
        </div>
      </section>

      {/* Info strip */}
      <section className="contact-section">
        <div className="contact-info-strip">
          <div className="contact-info-item">
            <span className="contact-info-icon">⏰</span>
            <div>
              <div className="contact-info-label">Response Time</div>
              <div className="contact-info-val">Within 24 hours</div>
            </div>
          </div>
          <div className="contact-info-divider" />
          <div className="contact-info-item">
            <span className="contact-info-icon">🕐</span>
            <div>
              <div className="contact-info-label">Support Hours</div>
              <div className="contact-info-val">Sun – Sat 24/7</div>
            </div>
          </div>
          <div className="contact-info-divider" />
          <div className="contact-info-item">
            <span className="contact-info-icon">📍</span>
            <div>
              <div className="contact-info-label">Based In</div>
              <div className="contact-info-val">India 🇮🇳</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-section">
        <h2 className="contact-section-title">Frequently Asked Questions</h2>
        <div className="contact-faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`contact-faq-item ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="contact-faq-q">
                <span>{f.q}</span>
                <span className="contact-faq-chevron">{openFaq === i ? "▲" : "▼"}</span>
              </div>
              {openFaq === i && <div className="contact-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
