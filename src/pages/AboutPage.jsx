import React from "react";
import "./AboutPage.css";

const FEATURES = [
  { icon: "🤖", title: "AI-Powered Generation", desc: "Generate complete web apps and mobile apps instantly using Claude AI by Anthropic." },
  { icon: "🎨", title: "Free Templates", desc: "Access a growing library of free, beautiful, production-ready templates for any use case." },
  { icon: "☁️", title: "Free Hosting", desc: "Deploy your project online for free — no server setup, no DevOps knowledge needed." },
  { icon: "✏️", title: "Free Customization", desc: "Customize every part of your generated site — colors, fonts, content, layout — all for free." },
  { icon: "⚡", title: "Lightning Fast", desc: "Go from idea to live website in minutes, not days." },
  { icon: "🇮🇳", title: "Made in India", desc: "Built by an Indian team, priced for Indian creators, freelancers, and businesses." },
];

const TECH = [
  { icon: "🧠", name: "Claude AI", desc: "Anthropic's powerful AI for code & content generation" },
  { icon: "⚛️", name: "React", desc: "Modern, fast frontend UI framework" },
  { icon: "🟢", name: "Node.js", desc: "Scalable backend runtime environment" },
  { icon: "🗄️", name: "MySQL", desc: "Reliable relational database" },
];

const STATS = [
  { num: "10+", label: "Templates" },
  { num: "1K+", label: "Users" },
  { num: "Free", label: "Hosting" },
  { num: "Free", label: "Credits(init)" },
   { num: "₹99", label: "Download(init)" },
];

export default function AboutPage() {
  return (
    <div className="about-root">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-badge">👋 About Us</div>
        <h1 className="about-hero-title">
          Building the Web <br />
          <span className="about-hero-accent">Smarter, Faster, Free.</span>
        </h1>
        <p className="about-hero-sub">
          Zater Web Studio is an AI-powered platform that lets anyone — businesses, freelancers,
          creators — generate stunning websites and apps instantly. No code. No cost to start.
        </p>
        <div className="about-stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="about-stat-card">
              <div className="about-stat-num">{s.num}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="about-mission-card">
          <div className="about-mission-icon">🎯</div>
          <h2 className="about-mission-title">Our Mission</h2>
          <p className="about-mission-text">
            We believe every business, freelancer, and creator deserves a professional online presence —
            without the complexity, the waiting, or the high cost. Zater Web Studio was built to
            democratize web creation by putting the power of AI directly in your hands.
            <br /><br />
            Preview for <strong>free</strong>. Download for just <strong>₹99</strong>. Host for <strong>free</strong>.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="about-section">
        <h2 className="about-section-title">What We Offer</h2>
        <div className="about-features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="about-feature-card">
              <div className="about-feature-icon">{f.icon}</div>
              <h3 className="about-feature-title">{f.title}</h3>
              <p className="about-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="about-section">
        <h2 className="about-section-title">Built With</h2>
        <div className="about-tech-grid">
          {TECH.map((t, i) => (
            <div key={i} className="about-tech-card">
              <span className="about-tech-icon">{t.icon}</span>
              <div>
                <div className="about-tech-name">{t.name}</div>
                <div className="about-tech-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Origin */}
      <section className="about-section">
        <div className="about-origin-card">
          <span className="about-origin-flag">🇮🇳</span>
          <h2 className="about-origin-title">Proudly Made in India</h2>
          <p className="about-origin-text">
            Zater Web Studio is based in India and built for the global market — with Indian creators
            at heart. We're a passionate team on a mission to make professional web creation accessible
            and affordable for everyone.
          </p>
        </div>
      </section>

    </div>
  );
}
