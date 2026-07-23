import React, { useState } from "react";

const CATEGORIES = [
  {
    icon: "💎",
    title: "Credits & Pricing",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
    faqs: [
      { q: "How many free credits do I get?", a: "Every new user gets 100 free credits on signup — no credit card required. These are yours to use immediately." },
      { q: "What can I do with 100 free credits?", a: "100 credits lets you generate and preview multiple websites and apps. Each AI generation uses a set number of credits depending on complexity." },
      { q: "How do I get more credits?", a: "You can top up 100 credits for just ₹99. Go to the Credits / Payments page and choose your top-up option. Payment is handled securely via Razorpay." },
      { q: "Do credits expire?", a: "No! Credits never expire. Once purchased, they stay in your account until you use them." },
      { q: "How much does downloading cost?", a: "The first download of any project costs ₹99 (paid once). After that, re-downloads of the same project are free. Hosting is always free." },
    ],
  },
  {
    icon: "🤖",
    title: "AI Generation",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.08)",
    border: "rgba(129,140,248,0.2)",
    faqs: [
      { q: "What AI powers ZWS?", a: "ZWS is powered by Claude AI by Anthropic — one of the most capable and safe AI models available." },
      { q: "What can the AI generate?", a: "The AI can generate full web apps, landing pages, portfolios, e-commerce pages, dashboards, and mobile-first apps — all from a simple description." },
      { q: "How long does generation take?", a: "Most generations complete in 10–30 seconds depending on the complexity of your request." },
      { q: "Can I regenerate if I don't like the result?", a: "Yes! You can regenerate as many times as you like. Each generation uses credits, so be descriptive to get the best result first try." },
    ],
  },
  {
    icon: "☁️",
    title: "Hosting & Deployment",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    faqs: [
      { q: "Is hosting really free?", a: "Yes! Deploying your site on ZWS hosting is completely free. No credit card, no hidden charges." },
      { q: "How do I deploy my site?", a: "After generating and previewing your project, click the Deploy button. Your site will be live within seconds on a ZWS subdomain." },
      { q: "Can I use a custom domain?", a: "Custom domain support is coming soon. For now, your site gets a free ZWS subdomain." },
      { q: "Is there a bandwidth limit on free hosting?", a: "We have generous limits for free hosted sites. If your site gets very high traffic, reach out and we'll sort it out." },
    ],
  },
  {
    icon: "🎨",
    title: "Templates",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
    faqs: [
      { q: "Are all templates free?", a: "Yes! All templates in the ZWS gallery are completely free to preview and use as a starting point." },
      { q: "Can I customize templates?", a: "Absolutely. After generating from a template, you can customize every part — colors, content, layout, fonts — all for free." },
      { q: "Can I submit my own template?", a: "Template submissions are coming soon. Contact us at zaterbusiness@gmail.com if you're interested in becoming a template creator." },
    ],
  },
];

const s = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0eee8", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: 80 },
  hero: { textAlign: "center", padding: "72px 24px 52px", maxWidth: 680, margin: "0 auto" },
  badge: { display: "inline-block", background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.3)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "6px 16px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" },
  title: { fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.02em" },
  accent: { background: "linear-gradient(135deg,#818cf8,#6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  sub: { fontSize: "1rem", color: "#9e9b93", lineHeight: 1.7, margin: 0 },
  section: { maxWidth: 900, margin: "0 auto", padding: "0 24px" },
  catCard: { borderRadius: 18, padding: "28px 28px", marginBottom: 16, border: "1px solid" },
  catHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 4, cursor: "pointer" },
  catIcon: { fontSize: "1.6rem" },
  catTitle: { fontSize: "1.05rem", fontWeight: 700, color: "#f0eee8" },
  catCount: { fontSize: 12, fontWeight: 600, marginLeft: "auto", color: "#6b6965" },
  faqList: { marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 },
  faqItem: { borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 14, marginBottom: 14 },
  faqQ: { display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16 },
  faqQText: { fontSize: "0.9rem", fontWeight: 600, color: "#f0eee8" },
  faqChevron: { fontSize: "0.75rem", color: "#4b4945", flexShrink: 0 },
  faqA: { marginTop: 10, fontSize: "0.855rem", color: "#9e9b93", lineHeight: 1.7 },
  contactStrip: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "36px 32px", textAlign: "center", marginTop: 48 },
  contactTitle: { fontSize: "1.2rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 10px" },
  contactText: { color: "#9e9b93", fontSize: "0.9rem", margin: "0 0 20px" },
  contactRow: { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" },
  contactBtn: { padding: "10px 22px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#f0eee8", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-block", transition: "all 0.2s" },
};

export default function HelpCenterPage() {
  const [openCat, setOpenCat] = useState(0);
  const [openFaq, setOpenFaq] = useState({});

  const toggleFaq = (ci, fi) => setOpenFaq(prev => ({ ...prev, [`${ci}-${fi}`]: !prev[`${ci}-${fi}`] }));

  return (
    <div style={s.root}>
      <div style={s.hero}>
        <div style={s.badge}>❓ Help Center</div>
        <h1 style={s.title}>How can we <span style={s.accent}>help you?</span></h1>
        <p style={s.sub}>Find answers to the most common questions about ZWS — credits, AI generation, hosting, templates, and more.</p>
      </div>

      <div style={s.section}>
        {CATEGORIES.map((cat, ci) => (
          <div key={ci} style={{ ...s.catCard, background: cat.bg, borderColor: cat.border }}>
            <div style={s.catHeader} onClick={() => setOpenCat(openCat === ci ? null : ci)}>
              <span style={s.catIcon}>{cat.icon}</span>
              <span style={s.catTitle}>{cat.title}</span>
              <span style={s.catCount}>{cat.faqs.length} questions {openCat === ci ? "▲" : "▼"}</span>
            </div>
            {openCat === ci && (
              <div style={s.faqList}>
                {cat.faqs.map((f, fi) => (
                  <div key={fi} style={{ ...s.faqItem, borderBottomColor: fi === cat.faqs.length - 1 ? "transparent" : "rgba(255,255,255,0.05)" }}>
                    <div style={s.faqQ} onClick={() => toggleFaq(ci, fi)}>
                      <span style={s.faqQText}>{f.q}</span>
                      <span style={s.faqChevron}>{openFaq[`${ci}-${fi}`] ? "▲" : "▼"}</span>
                    </div>
                    {openFaq[`${ci}-${fi}`] && <div style={s.faqA}>{f.a}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={s.contactStrip}>
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>🙋</div>
          <div style={s.contactTitle}>Still have questions?</div>
          <p style={s.contactText}>Our team is happy to help. Reach out via email or WhatsApp.</p>
          <div style={s.contactRow}>
            <a href="mailto:zaterbusiness@gmail.com" style={s.contactBtn}>✉️ Email Us</a>
            <a href="https://wa.me/919789049321" target="_blank" rel="noreferrer" style={s.contactBtn}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
