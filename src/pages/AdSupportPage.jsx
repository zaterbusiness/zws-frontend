import React from "react";
import "./AdSupportPage.css";

const AD_TYPES = [
  {
    icon: "🖼️",
    title: "Banner Ads",
    desc: "Premium banner placements on the homepage, template gallery, and dashboard — high visibility, maximum impressions.",
  },
  {
    icon: "✨",
    title: "Sponsored Templates",
    desc: "Feature your brand's template at the top of our gallery. Ideal for agencies, theme creators, and SaaS companies.",
  },
  {
    icon: "🔗",
    title: "Featured Listings",
    desc: "Get your product or service listed as a featured partner in the ZWS ecosystem — seen by all our active users.",
  },
  {
    icon: "📧",
    title: "Newsletter Sponsorship",
    desc: "Reach our growing email list of Indian developers, freelancers, and business owners directly in their inbox.",
  },
];

const AUDIENCE = [
  { num: "1K+", label: "Active Users" },
  { num: "10+", label: "Templates" },
  { num: "India 🇮🇳", label: "Primary Market" },
  { num: "Free", label: "Hosting Reach" },
];

const CONTACTS = [
  {
    icon: "✉️",
    label: "Email",
    value: "zaterbusiness@gmail.com",
    href: "mailto:zaterbusiness@gmail.com",
    sub: "For ad proposals & partnerships",
    color: "ad-blue",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+91 97890 49321",
    href: "https://wa.me/919789049321",
    sub: "Quick chat for ad inquiries",
    color: "ad-green",
  },
];

const STEPS = [
  { num: "01", title: "Contact Us", desc: "Reach out via email or WhatsApp with your brand details and campaign goal." },
  { num: "02", title: "Choose a Format", desc: "We'll help you pick the right ad format — banner, sponsored template, featured listing, or newsletter." },
  { num: "03", title: "Go Live", desc: "Your ad goes live on ZWS, reaching thousands of active users across India." },
];

export default function AdSupportPage() {
  return (
    <div className="ad-root">

      {/* Hero */}
      <section className="ad-hero">
        <div className="ad-hero-badge">📢 Advertise with ZWS</div>
        <h1 className="ad-hero-title">
          Reach <span className="ad-accent">Thousands of Creators</span><br />on Zater Web Studio
        </h1>
        <p className="ad-hero-sub">
          Partner with ZWS to put your brand in front of developers, freelancers, startups, and
          business owners who are actively building their online presence.
        </p>
        <div className="ad-audience-row">
          {AUDIENCE.map((a, i) => (
            <div key={i} className="ad-audience-card">
              <div className="ad-audience-num">{a.num}</div>
              <div className="ad-audience-label">{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Types */}
      <section className="ad-section">
        <h2 className="ad-section-title">Ad Formats We Offer</h2>
        <div className="ad-types-grid">
          {AD_TYPES.map((t, i) => (
            <div key={i} className="ad-type-card">
              <div className="ad-type-icon">{t.icon}</div>
              <h3 className="ad-type-title">{t.title}</h3>
              <p className="ad-type-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="ad-section">
        <h2 className="ad-section-title">How It Works</h2>
        <div className="ad-steps-row">
          {STEPS.map((s, i) => (
            <div key={i} className="ad-step">
              <div className="ad-step-num">{s.num}</div>
              <h3 className="ad-step-title">{s.title}</h3>
              <p className="ad-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing note */}
      <section className="ad-section">
        <div className="ad-pricing-card">
          <div className="ad-pricing-icon">💰</div>
          <h2 className="ad-pricing-title">Flexible Pricing</h2>
          <p className="ad-pricing-text">
            We offer custom pricing based on your campaign goals, duration, and format.
            Whether you're a small business or a large brand, we'll find a plan that works for you.
            <br /><br />
            <strong>Contact us for a custom quote.</strong>
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="ad-section">
        <h2 className="ad-section-title">Get in Touch</h2>
        <div className="ad-contact-grid">
          {CONTACTS.map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className={`ad-contact-card ${c.color}`}>
              <div className="ad-contact-icon">{c.icon}</div>
              <div className="ad-contact-label">{c.label}</div>
              <div className="ad-contact-value">{c.value}</div>
              <div className="ad-contact-sub">{c.sub}</div>
              <div className="ad-contact-btn">Contact →</div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
