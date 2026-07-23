// ── DocsPage.jsx ──────────────────────────────────────────────
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NAV = [
  { icon: "🚀", label: "Getting Started" },
  { icon: "🤖", label: "AI Generation" },
  { icon: "💎", label: "Credits & Billing" },
  { icon: "☁️", label: "Hosting & Deploy" },
  { icon: "🎨", label: "Templates" },
  { icon: "🔌", label: "API Reference" },
];

const DOCS = {
  "Getting Started": {
    intro: "Welcome to Zater Web Studio. Follow these steps to build your first website in minutes.",
    steps: [
      { title: "1. Create your account", body: "Sign up at zaterstudio.com — it's free. You'll instantly receive 100 AI credits in your account." },
      { title: "2. Choose a template or start blank", body: "Browse the template gallery and pick a starting point, or describe what you want from scratch." },
      { title: "3. Generate with AI", body: "Describe your website in plain English. Claude AI will generate the full code — HTML, CSS, JS — in seconds." },
      { title: "4. Preview & customize", body: "Preview your site in the browser. Edit content, colors, and layout for free." },
      { title: "5. Download or deploy", body: "Pay ₹99 once to download the source code, or deploy to free ZWS hosting with one click." },
    ],
  },
  "AI Generation": {
    intro: "ZWS uses Claude AI by Anthropic to generate production-ready websites and apps from your descriptions.",
    steps: [
      { title: "Writing good prompts", body: "Be specific. Instead of 'make a website', try 'create a portfolio website for a freelance photographer with a dark theme, gallery section, and contact form'." },
      { title: "How credits are used", body: "Each generation uses credits based on complexity. Simple pages use fewer credits; complex multi-page apps use more." },
      { title: "Regenerating", body: "If the first result isn't what you wanted, refine your prompt and regenerate. Each regeneration uses credits." },
      { title: "Editing after generation", body: "You can edit any generated output directly in the ZWS editor — no credits needed for editing." },
    ],
  },
  "Credits & Billing": {
    intro: "ZWS uses a simple credit system. Start free, top up when needed.",
    steps: [
      { title: "Free credits", body: "Every new account gets 100 free credits on signup — no credit card required." },
      { title: "Buying credits", body: "Top up 100 credits for ₹99 via Razorpay (UPI, Cards, Net Banking). Credits never expire." },
      { title: "Download fee", body: "Downloading source code for a project costs ₹99 (one-time). After that, re-downloads of the same project are free." },
      { title: "Hosting cost", body: "Hosting on ZWS is completely free, forever." },
    ],
  },
  "Hosting & Deploy": {
    intro: "Deploy your generated site to ZWS hosting for free with one click.",
    steps: [
      { title: "One-click deploy", body: "From the Projects page, click Deploy on any project. Your site will be live within seconds." },
      { title: "Your subdomain", body: "Your site gets a free ZWS subdomain like yourproject.zaterstudio.com." },
      { title: "Redeploying", body: "After editing your project, redeploy anytime for free. The subdomain stays the same." },
      { title: "Custom domains", body: "Custom domain support is coming soon. Join the waitlist via the contact page." },
    ],
  },
  "Templates": {
    intro: "ZWS provides a growing library of free, professionally designed templates.",
    steps: [
      { title: "Browsing templates", body: "Visit the Templates section from the home page. Filter by category — portfolio, business, e-commerce, blog, and more." },
      { title: "Using a template", body: "Click any template and choose 'Generate from Template'. The AI will create a customized version based on your inputs." },
      { title: "All templates are free", body: "Every template in the gallery is free to use as a starting point. No paid templates." },
      { title: "Submit a template", body: "Interested in contributing? Email zaterbusiness@gmail.com with 'Template Submission' as subject." },
    ],
  },
  "API Reference": {
    intro: "ZWS provides a REST API for developers who want to integrate ZWS features into their apps.",
    steps: [
      { title: "Authentication", body: "All API requests require a Bearer token in the Authorization header. Get your token from the ZWS dashboard settings." },
      { title: "Base URL", body: "API base URL: https://api.zaterstudio.com/v1 — all endpoints are relative to this." },
      { title: "Rate limits", body: "Free accounts: 20 requests/minute. Paid accounts: 100 requests/minute. Credits are consumed per generation API call." },
      { title: "Full API docs", body: "Full endpoint documentation with request/response examples is available at api.zaterstudio.com/docs (coming soon)." },
    ],
  },
};

const s = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0eee8", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: 80 },
  hero: { textAlign: "center", padding: "64px 24px 40px", maxWidth: 640, margin: "0 auto" },
  badge: { display: "inline-block", background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.3)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "6px 16px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" },
  title: { fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" },
  accent: { background: "linear-gradient(135deg,#818cf8,#6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  sub: { fontSize: "1rem", color: "#9e9b93", lineHeight: 1.7, margin: 0 },
  body: { maxWidth: 1000, margin: "0 auto", padding: "0 24px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" },
  nav: { width: 200, flexShrink: 0, position: "sticky", top: 24 },
  navItem: (active) => ({
    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
    background: active ? "rgba(129,140,248,0.12)" : "transparent",
    color: active ? "#a5b4fc" : "#6b6965", fontWeight: active ? 700 : 400, fontSize: "0.875rem",
    border: active ? "1px solid rgba(129,140,248,0.25)" : "1px solid transparent", marginBottom: 4, transition: "all 0.15s",
  }),
  content: { flex: 1, minWidth: 0 },
  intro: { fontSize: "1rem", color: "#9e9b93", lineHeight: 1.7, marginBottom: 28, padding: "18px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 12, borderLeft: "3px solid rgba(129,140,248,0.4)" },
  stepCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 22px", marginBottom: 12 },
  stepTitle: { fontSize: "0.95rem", fontWeight: 700, color: "#f0eee8", marginBottom: 8 },
  stepBody: { fontSize: "0.86rem", color: "#9e9b93", lineHeight: 1.7 },
};

export function DocsPage() {
  const [active, setActive] = useState("Getting Started");
  const doc = DOCS[active];

  return (
    <div style={s.root}>
      <div style={s.hero}>
        <div style={s.badge}>📚 Documentation</div>
        <h1 style={s.title}><span style={s.accent}>ZWS</span> Documentation</h1>
        <p style={s.sub}>Everything you need to build, deploy, and grow with Zater Web Studio.</p>
      </div>
      <div style={s.body}>
        <div style={s.nav}>
          {NAV.map((n, i) => (
            <div key={i} style={s.navItem(active === n.label)} onClick={() => setActive(n.label)}>
              <span>{n.icon}</span><span>{n.label}</span>
            </div>
          ))}
        </div>
        <div style={s.content}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 16px" }}>{active}</h2>
          <div style={s.intro}>{doc.intro}</div>
          {doc.steps.map((step, i) => (
            <div key={i} style={s.stepCard}>
              <div style={s.stepTitle}>{step.title}</div>
              <div style={s.stepBody}>{step.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── StatusPage.jsx ─────────────────────────────────────────────
const SERVICES = [
  { name: "AI Generation (Claude API)", status: "operational", uptime: "99.9%" },
  { name: "Website Hosting", status: "operational", uptime: "99.8%" },
  { name: "Template Gallery", status: "operational", uptime: "100%" },
  { name: "Payment Gateway (Razorpay)", status: "operational", uptime: "99.9%" },
  { name: "User Auth & Accounts", status: "operational", uptime: "100%" },
  { name: "Project Storage & Deployments", status: "operational", uptime: "99.7%" },
  { name: "API (Developer Access)", status: "maintenance", uptime: "Coming Soon" },
];

const STATUS_COLORS = {
  operational: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", label: "Operational" },
  degraded: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", label: "Degraded" },
  down: { color: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Down" },
  maintenance: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", label: "Maintenance" },
};

const ss = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0eee8", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: 80 },
  hero: { textAlign: "center", padding: "64px 24px 40px", maxWidth: 600, margin: "0 auto" },
  badge: (color, bg) => ({ display: "inline-flex", alignItems: "center", gap: 8, background: bg, border: `1px solid ${color}40`, color, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "6px 16px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" }),
  dot: (color) => ({ width: 8, height: 8, borderRadius: "50%", background: color }),
  title: { fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" },
  sub: { fontSize: "1rem", color: "#9e9b93", lineHeight: 1.7, margin: 0 },
  section: { maxWidth: 800, margin: "0 auto", padding: "0 24px" },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px", marginBottom: 10, flexWrap: "wrap", gap: 12 },
  rowLeft: { display: "flex", alignItems: "center", gap: 12 },
  svcName: { fontSize: "0.9rem", fontWeight: 600, color: "#f0eee8" },
  rowRight: { display: "flex", alignItems: "center", gap: 12 },
  uptime: { fontSize: 12, color: "#6b6965" },
  pill: (color, bg) => ({ background: bg, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" }),
  historyNote: { textAlign: "center", marginTop: 32, fontSize: "0.85rem", color: "#4b4945" },
};

export function StatusPage() {
  const allOk = SERVICES.filter(s => s.status === "operational").length === SERVICES.length - 1;

  return (
    <div style={ss.root}>
      <div style={ss.hero}>
        <div style={ss.badge("#4ade80", "rgba(74,222,128,0.1)")}>
          <div style={ss.dot("#4ade80")} /> All Systems Operational
        </div>
        <h1 style={ss.title}>ZWS Status</h1>
        <p style={ss.sub}>Real-time status of all Zater Web Studio services and infrastructure.</p>
      </div>
      <div style={ss.section}>
        <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4b4945", marginBottom: 14 }}>Services</div>
        {SERVICES.map((svc, i) => {
          const st = STATUS_COLORS[svc.status];
          return (
            <div key={i} style={ss.row}>
              <div style={ss.rowLeft}>
                <div style={ss.dot(st.color)} />
                <div style={ss.svcName}>{svc.name}</div>
              </div>
              <div style={ss.rowRight}>
                <span style={ss.uptime}>{svc.uptime} uptime</span>
                <span style={ss.pill(st.color, st.bg)}>{st.label}</span>
              </div>
            </div>
          );
        })}
        <div style={ss.historyNote}>Last updated: Just now · Data refreshes every 60 seconds</div>
        <div style={{ marginTop: 40, background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 16, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>📬</div>
          <div style={{ fontWeight: 700, color: "#f0eee8", marginBottom: 8 }}>Subscribe to Incidents</div>
          <div style={{ fontSize: "0.86rem", color: "#6b6965", marginBottom: 16 }}>Get notified by email when a service is affected.</div>
          <a href="mailto:zaterbusiness@gmail.com?subject=Subscribe to ZWS Status Updates" style={{ padding: "10px 22px", borderRadius: 999, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.08)", color: "#4ade80", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Subscribe via Email</a>
        </div>
      </div>
    </div>
  );
}

// ── BugReportPage.jsx ──────────────────────────────────────────
const BUG_TYPES = ["UI Bug", "AI Generation Issue", "Payment / Credits", "Hosting / Deploy", "Account / Auth", "Performance", "Other"];

export function BugReportPage() {
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!desc.trim()) return;
    const subject = encodeURIComponent(`Bug Report: ${type || "General"} — ZWS`);
    const body = encodeURIComponent(`Bug Type: ${type || "Not specified"}\n\nDescription:\n${desc}\n\n---\nSent from ZWS Bug Report page`);
    window.open(`mailto:zaterbusiness@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  const bs = {
    root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0eee8", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: 80 },
    hero: { textAlign: "center", padding: "64px 24px 40px", maxWidth: 600, margin: "0 auto" },
    badge: { display: "inline-block", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "6px 16px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" },
    title: { fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" },
    sub: { fontSize: "1rem", color: "#9e9b93", lineHeight: 1.7, margin: 0 },
    form: { maxWidth: 640, margin: "0 auto", padding: "0 24px" },
    label: { display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#9e9b93", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 },
    fieldGroup: { marginBottom: 22 },
    typeRow: { display: "flex", gap: 8, flexWrap: "wrap" },
    typeBtn: (active) => ({
      padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer",
      border: active ? "1px solid rgba(248,113,113,0.5)" : "1px solid rgba(255,255,255,0.08)",
      background: active ? "rgba(248,113,113,0.12)" : "rgba(255,255,255,0.03)",
      color: active ? "#f87171" : "#6b6965", transition: "all 0.15s",
    }),
    textarea: { width: "100%", minHeight: 140, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", color: "#f0eee8", fontSize: "0.9rem", lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" },
    submitBtn: { width: "100%", padding: "14px", borderRadius: 999, background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.4)", color: "#f87171", fontSize: "1rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" },
    success: { textAlign: "center", padding: "60px 24px", maxWidth: 500, margin: "0 auto" },
  };

  return (
    <div style={bs.root}>
      <div style={bs.hero}>
        <div style={bs.badge}>🐛 Report a Bug</div>
        <h1 style={bs.title}>Found Something Broken?</h1>
        <p style={bs.sub}>Help us improve ZWS by reporting bugs. We take every report seriously and fix issues fast.</p>
      </div>
      {submitted ? (
        <div style={bs.success}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f0eee8", marginBottom: 10 }}>Bug Report Sent!</div>
          <div style={{ color: "#9e9b93", lineHeight: 1.7 }}>Your email client should have opened. We'll look into this and get back to you as soon as possible.</div>
        </div>
      ) : (
        <div style={bs.form}>
          <div style={bs.fieldGroup}>
            <label style={bs.label}>Bug Type</label>
            <div style={bs.typeRow}>
              {BUG_TYPES.map((t, i) => (
                <button key={i} style={bs.typeBtn(type === t)} onClick={() => setType(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div style={bs.fieldGroup}>
            <label style={bs.label}>Describe the Bug</label>
            <textarea style={bs.textarea} placeholder="What happened? What did you expect to happen? Steps to reproduce..." value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <button style={bs.submitBtn} onClick={handleSubmit}>🐛 Send Bug Report →</button>
          <div style={{ textAlign: "center", marginTop: 16, fontSize: "0.82rem", color: "#4b4945" }}>
            This opens your email client with a pre-filled report to bugs@zaterstudio.com
          </div>
        </div>
      )}
    </div>
  );
}

export default DocsPage;
