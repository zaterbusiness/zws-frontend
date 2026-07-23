import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HOW_CREDITS_WORK = [
  { icon: "🎁", title: "100 Free Credits on Signup", desc: "Every new user gets 100 credits instantly on signup. No credit card. No catch. Start generating right away.", highlight: true },
  { icon: "🤖", title: "Use Credits to Generate", desc: "Each AI website or app generation costs credits. More complex projects use more credits. Preview is always included.", highlight: false },
  { icon: "💳", title: "Top Up 100 Credits for ₹99", desc: "When your credits run low, top up instantly. 100 credits for just ₹99 — paid securely via Razorpay.", highlight: false },
  { icon: "💾", title: "₹99 to Download (Once)", desc: "Your first download of any project costs ₹99. After that, re-downloads of the same project are completely free.", highlight: false },
  { icon: "☁️", title: "Free Hosting Forever", desc: "Deploy your site to ZWS hosting for free. No monthly fee. No bandwidth charges for normal traffic.", highlight: false },
  { icon: "✏️", title: "Free Customization", desc: "Edit and customize your generated site as many times as you want — no extra credits charged.", highlight: false },
];

const PLANS = [
  {
    name: "Free Start",
    price: "₹0",
    priceNote: "on signup",
    credits: "100",
    color: "#6ee7b7",
    borderColor: "rgba(110,231,183,0.3)",
    bg: "rgba(110,231,183,0.06)",
    features: [
      "100 AI credits (free)",
      "Unlimited previews",
      "Free templates",
      "Free customization",
      "Free hosting",
    ],
    cta: "Get Started Free",
    ctaHref: "/signup",
    featured: false,
  },
  {
    name: "Credits Top-Up",
    price: "₹99",
    priceNote: "per 100 credits",
    credits: "+100",
    color: "#818cf8",
    borderColor: "rgba(129,140,248,0.5)",
    bg: "rgba(129,140,248,0.08)",
    features: [
      "100 more AI credits",
      "Credits never expire",
      "Paid via Razorpay (UPI/Cards)",
      "Instant credit delivery",
      "All Free features included",
    ],
    cta: "Buy Credits",
    ctaHref: "/payments",
    featured: true,
  },
  {
    name: "Download",
    price: "₹99",
    priceNote: "one-time per project",
    credits: "—",
    color: "#fbbf24",
    borderColor: "rgba(251,191,36,0.3)",
    bg: "rgba(251,191,36,0.06)",
    features: [
      "Download source code",
      "One-time payment only",
      "Free re-downloads after",
      "Full ownership of code",
      "Hosting stays free",
    ],
    cta: "View Projects",
    ctaHref: "/projects",
    featured: false,
  },
];

const FAQS = [
  { q: "What happens when I run out of credits?", a: "You won't be able to generate new AI outputs until you top up. But you can still preview, customize, and re-download existing projects — those are always free." },
  { q: "Can I use free credits for everything?", a: "Yes! Your 100 free credits work for any AI generation on ZWS — web apps, landing pages, portfolios, and more." },
  { q: "Is the ₹99 download fee per download or per project?", a: "Per project, one-time. Pay ₹99 once for a project and you can download it as many times as you want forever — for free." },
  { q: "What payment methods are accepted?", a: "We accept all major payment methods via Razorpay — UPI, Credit/Debit Cards, Net Banking, and Wallets." },
  { q: "Do credits roll over?", a: "Yes. Credits never expire. Whether you buy 100 credits today or a year ago, they'll be in your account waiting." },
  { q: "Is hosting really free forever?", a: "Yes. Hosting on ZWS is free with no time limit. We believe everyone deserves to be online." },
];

const s = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0eee8", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: 80 },
  hero: { textAlign: "center", padding: "72px 24px 52px", maxWidth: 760, margin: "0 auto" },
  badge: { display: "inline-block", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", color: "#fcd34d", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "6px 16px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" },
  title: { fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em" },
  accent: { background: "linear-gradient(135deg,#fbbf24,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  sub: { fontSize: "1.05rem", color: "#9e9b93", lineHeight: 1.7, margin: 0 },
  section: { maxWidth: 1000, margin: "0 auto", padding: "48px 24px 0" },
  sectionTitle: { fontSize: "1.5rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 28px" },
  howGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 },
  howCard: (highlight) => ({
    background: highlight ? "linear-gradient(135deg,rgba(251,191,36,0.1),rgba(129,140,248,0.08))" : "rgba(255,255,255,0.03)",
    border: highlight ? "1px solid rgba(251,191,36,0.3)" : "1px solid rgba(255,255,255,0.07)",
    borderRadius: 18, padding: "26px 22px",
  }),
  howIcon: { fontSize: "1.8rem", marginBottom: 12 },
  howTitle: { fontSize: "0.95rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 8px" },
  howDesc: { fontSize: "0.84rem", color: "#9e9b93", lineHeight: 1.6, margin: 0 },
  plansRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 },
  planCard: (featured, borderColor, bg) => ({
    background: bg, border: featured ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
    borderRadius: 20, padding: "32px 26px", display: "flex", flexDirection: "column", position: "relative",
  }),
  planBadge: { position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#818cf8", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" },
  planName: { fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b6965", marginBottom: 12 },
  planPriceRow: { display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 },
  planPrice: (color) => ({ fontSize: "2.2rem", fontWeight: 900, color, lineHeight: 1 }),
  planNote: { fontSize: 12, color: "#6b6965" },
  planCredits: (color) => ({ fontSize: "0.85rem", fontWeight: 700, color, marginBottom: 20 }),
  planFeatures: { listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 },
  planFeat: { fontSize: "0.85rem", color: "#9e9b93", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8 },
  planCta: (color, bg) => ({
    display: "block", textAlign: "center", padding: "12px 0", borderRadius: 999,
    border: `1px solid ${color}`, background: bg, color, fontWeight: 700, fontSize: "0.9rem",
    textDecoration: "none", cursor: "pointer", transition: "all 0.2s",
  }),
  faqList: { display: "flex", flexDirection: "column", gap: 10 },
  faqItem: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 24px", cursor: "pointer" },
  faqQ: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontSize: "0.92rem", fontWeight: 600, color: "#f0eee8" },
  faqChev: { fontSize: "0.75rem", color: "#6b6965", flexShrink: 0 },
  faqA: { marginTop: 12, fontSize: "0.86rem", color: "#9e9b93", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 },
  ctaBanner: { background: "linear-gradient(135deg,rgba(129,140,248,0.1),rgba(251,191,36,0.07))", border: "1px solid rgba(129,140,248,0.2)", borderRadius: 20, padding: "52px 40px", textAlign: "center" },
  ctaTitle: { fontSize: "1.6rem", fontWeight: 800, color: "#f0eee8", margin: "0 0 12px" },
  ctaSub: { color: "#9e9b93", lineHeight: 1.7, margin: "0 0 28px" },
  ctaBtn: { display: "inline-block", padding: "14px 36px", borderRadius: 999, background: "linear-gradient(135deg,#818cf8,#6ee7b7)", color: "#0a0a0f", fontWeight: 800, fontSize: "1rem", textDecoration: "none", cursor: "pointer" },
};

export default function CreditsPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={s.root}>
      <div style={s.hero}>
        <div style={s.badge}>💎 Credits & Pricing</div>
        <h1 style={s.title}>Simple, Honest <span style={s.accent}>Pricing</span></h1>
        <p style={s.sub}>
          Start for free. Pay only when you're ready to download. Hosting is always free.
          <br />No subscriptions. No surprises.
        </p>
      </div>

      {/* Quick Summary */}
      <div style={{ ...s.section, paddingTop: 0 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
          {[
            { label: "Signup Bonus", val: "100 Credits Free", color: "#6ee7b7" },
            { label: "Top-Up Price", val: "₹99 / 100 Credits", color: "#818cf8" },
            { label: "First Download", val: "₹99 (once)", color: "#fbbf24" },
            { label: "Hosting", val: "Always Free", color: "#34d399" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 24px", textAlign: "center", minWidth: 140 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b4945", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: item.color }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>How Credits Work</h2>
        <div style={s.howGrid}>
          {HOW_CREDITS_WORK.map((h, i) => (
            <div key={i} style={s.howCard(h.highlight)}>
              <div style={s.howIcon}>{h.icon}</div>
              <div style={s.howTitle}>{h.title}</div>
              <div style={s.howDesc}>{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Plans at a Glance</h2>
        <div style={s.plansRow}>
          {PLANS.map((plan, i) => (
            <div key={i} style={s.planCard(plan.featured, plan.borderColor, plan.bg)}>
              {plan.featured && <div style={s.planBadge}>Most Popular</div>}
              <div style={s.planName}>{plan.name}</div>
              <div style={s.planPriceRow}>
                <span style={s.planPrice(plan.color)}>{plan.price}</span>
              </div>
              <div style={{ fontSize: 12, color: "#6b6965", marginBottom: 6 }}>{plan.priceNote}</div>
              <div style={s.planCredits(plan.color)}>{plan.credits} Credits</div>
              <ul style={s.planFeatures}>
                {plan.features.map((f, fi) => (
                  <li key={fi} style={s.planFeat}><span style={{ color: plan.color }}>✓</span> {f}</li>
                ))}
              </ul>
              <a href={plan.ctaHref} style={s.planCta(plan.color, `${plan.bg}`)}
                onClick={e => { e.preventDefault(); navigate(plan.ctaHref); }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>Frequently Asked Questions</h2>
        <div style={s.faqList}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ ...s.faqItem, borderColor: openFaq === i ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.07)" }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={s.faqQ}>
                <span>{f.q}</span>
                <span style={s.faqChev}>{openFaq === i ? "▲" : "▼"}</span>
              </div>
              {openFaq === i && <div style={s.faqA}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1000, margin: "48px auto 0", padding: "0 24px" }}>
        <div style={s.ctaBanner}>
          <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>🎁</div>
          <div style={s.ctaTitle}>Start with 100 Free Credits</div>
          <p style={s.ctaSub}>No credit card. No commitment. Sign up and start generating your website in seconds.</p>
          <a href="/signup" style={s.ctaBtn} onClick={e => { e.preventDefault(); navigate('/signup'); }}>Get Started Free →</a>
        </div>
      </div>
    </div>
  );
}
