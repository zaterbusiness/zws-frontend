import React, { useState } from "react";

const JOBS = [
  {
    title: "Full-Stack Developer",
    type: "Full-Time",
    location: "Remote 🇮🇳",
    dept: "Engineering",
    deptColor: "#818cf8",
    deptBg: "rgba(129,140,248,0.12)",
    desc: "Build and scale ZWS platform features using React, Node.js, and MySQL. Experience with AI APIs is a big plus.",
    skills: ["React", "Node.js", "MySQL", "REST APIs"],
  },
  {
    title: "AI Prompt Engineer",
    type: "Full-Time",
    location: "Remote 🇮🇳",
    dept: "AI",
    deptColor: "#c4b5fd",
    deptBg: "rgba(196,181,253,0.12)",
    desc: "Design and optimize prompts for Claude AI to generate better, more accurate websites and apps for our users.",
    skills: ["Claude AI", "Prompt Design", "Web Dev", "Testing"],
  },
  {
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Remote 🇮🇳",
    dept: "Design",
    deptColor: "#f472b6",
    deptBg: "rgba(244,114,182,0.12)",
    desc: "Design beautiful, user-friendly interfaces for ZWS — templates, admin panels, landing pages, and mobile-first experiences.",
    skills: ["Figma", "React", "CSS", "Design Systems"],
  },
  {
    title: "Marketing & Growth",
    type: "Part-Time",
    location: "Remote 🇮🇳",
    dept: "Growth",
    deptColor: "#fbbf24",
    deptBg: "rgba(251,191,36,0.12)",
    desc: "Drive user acquisition and brand awareness for ZWS across social media, content, and partnerships.",
    skills: ["SEO", "Social Media", "Content", "Analytics"],
  },
];

const PERKS = [
  { icon: "🏠", title: "Fully Remote", desc: "Work from anywhere in India. Flexible hours, async-first culture." },
  { icon: "📈", title: "Early Stage Equity", desc: "Join early and grow with us. We believe in rewarding our team." },
  { icon: "🤖", title: "Work with AI", desc: "Use cutting-edge AI tools (Claude, GPT) daily — not just for fun, for your job." },
  { icon: "📚", title: "Learning Budget", desc: "Courses, books, conferences — we invest in your growth." },
  { icon: "⚡", title: "Fast-Moving Team", desc: "Ship fast, learn faster. No red tape, just results." },
  { icon: "🇮🇳", title: "Built for India", desc: "A mission-driven company making the web accessible to every Indian creator." },
];

const s = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0eee8", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: 80 },
  hero: { textAlign: "center", padding: "72px 24px 52px", maxWidth: 740, margin: "0 auto" },
  badge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "6px 16px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" },
  hiringDot: { width: 8, height: 8, borderRadius: "50%", background: "#4ade80", animation: "pulse 1.5s infinite" },
  title: { fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em" },
  accent: { background: "linear-gradient(135deg,#4ade80,#6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  sub: { fontSize: "1.05rem", color: "#9e9b93", lineHeight: 1.7, margin: 0 },
  section: { maxWidth: 1000, margin: "0 auto", padding: "48px 24px 0" },
  sectionTitle: { fontSize: "1.5rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 28px" },
  jobCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 28px", marginBottom: 14, transition: "border-color 0.2s" },
  jobTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 },
  jobTitle: { fontSize: "1.05rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 8px" },
  jobMeta: { display: "flex", gap: 8, flexWrap: "wrap" },
  jobDesc: { fontSize: "0.875rem", color: "#9e9b93", lineHeight: 1.7, margin: "0 0 16px" },
  skillRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  applyBtn: { padding: "10px 22px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#4b4945", fontSize: 13, fontWeight: 700, cursor: "not-allowed", whiteSpace: "nowrap", filter: "blur(2px)", userSelect: "none", pointerEvents: "none" },
  perksGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 },
  perkCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 22px" },
  perkIcon: { fontSize: "1.8rem", marginBottom: 12 },
  perkTitle: { fontSize: "0.95rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 8px" },
  perkDesc: { fontSize: "0.84rem", color: "#6b6965", lineHeight: 1.6, margin: 0 },
  cta: { background: "linear-gradient(135deg,rgba(74,222,128,0.08),rgba(110,231,183,0.05))", border: "1px solid rgba(74,222,128,0.18)", borderRadius: 20, padding: "48px 40px", textAlign: "center" },
  ctaTitle: { fontSize: "1.4rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 12px" },
  ctaText: { color: "#9e9b93", lineHeight: 1.7, margin: "0 0 24px" },
  ctaEmail: { display: "inline-block", padding: "12px 28px", borderRadius: 999, border: "1px solid rgba(74,222,128,0.4)", background: "rgba(74,222,128,0.1)", color: "#4ade80", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.2s" },
};

const pill = (color, bg, text) => ({
  background: bg, color, fontSize: 11, fontWeight: 700, padding: "3px 10px",
  borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase",
});
const skillPill = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9e9b93", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999 };

export default function CareersPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={s.root}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      <div style={s.hero}>
        <div style={s.badge}><div style={s.hiringDot} /> We're Hiring</div>
        <h1 style={s.title}>Join the Team <br /><span style={s.accent}>Building India's AI Web Studio</span></h1>
        <p style={s.sub}>We're a small, passionate team on a big mission. Come help us give every Indian creator a professional online presence.</p>
      </div>

      {/* Open Roles */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Open Positions</h2>
        {JOBS.map((j, i) => (
          <div key={i} style={{ ...s.jobCard, borderColor: hovered === i ? "rgba(74,222,128,0.25)" : "rgba(255,255,255,0.07)" }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div style={s.jobTop}>
              <div>
                <div style={s.jobTitle}>{j.title}</div>
                <div style={s.jobMeta}>
                  <span style={pill(j.deptColor, j.deptBg, j.dept)}>{j.dept}</span>
                  <span style={pill("#9e9b93", "rgba(255,255,255,0.06)", j.type)}>{j.type}</span>
                  <span style={pill("#6b6965", "rgba(255,255,255,0.04)", j.location)}>{j.location}</span>
                </div>
              </div>
              <a href="mailto:zaterbusiness@gmail.com?subject=Application: " style={s.applyBtn}>Apply →</a>
            </div>
            <p style={s.jobDesc}>{j.desc}</p>
            <div style={s.skillRow}>{j.skills.map((sk, si) => <span key={si} style={skillPill}>{sk}</span>)}</div>
          </div>
        ))}
      </div>

      {/* Perks */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Why Join ZWS?</h2>
        <div style={s.perksGrid}>
          {PERKS.map((p, i) => (
            <div key={i} style={s.perkCard}>
              <div style={s.perkIcon}>{p.icon}</div>
              <div style={s.perkTitle}>{p.title}</div>
              <div style={s.perkDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1000, margin: "48px auto 0", padding: "0 24px" }}>
        <div style={s.cta}>
          <div style={{ fontSize: "2rem", marginBottom: 14 }}>📬</div>
          <div style={s.ctaTitle}>Don't see a role that fits?</div>
          <p style={s.ctaText}>We're always looking for talented people. Send us your resume and tell us how you'd like to contribute to ZWS.</p>
          <a href="mailto:zaterbusiness@gmail.com?subject=Open Application - ZWS" style={s.ctaEmail}>zaterbusiness@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
