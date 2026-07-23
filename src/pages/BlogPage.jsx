import React, { useState } from "react";

const POSTS = [
  {
    tag: "Product",
    tagColor: "#818cf8",
    tagBg: "rgba(129,140,248,0.12)",
    date: "May 2025",
    title: "Introducing Zater Web Studio: Build Websites with AI",
    desc: "We built ZWS to make professional web creation accessible to everyone — free preview, ₹99 download, free hosting. Here's our story.",
    readTime: "4 min read",
    emoji: "🚀",
  },
  {
    tag: "Tutorial",
    tagColor: "#6ee7b7",
    tagBg: "rgba(110,231,183,0.12)",
    date: "May 2025",
    title: "How to Generate a Full Web App in Under 5 Minutes",
    desc: "Step-by-step walkthrough of using Claude AI inside ZWS to generate, preview, customize, and deploy your website — no code needed.",
    readTime: "6 min read",
    emoji: "⚡",
  },
  {
    tag: "Credits",
    tagColor: "#fbbf24",
    tagBg: "rgba(251,191,36,0.12)",
    date: "Apr 2025",
    title: "Understanding the ZWS Credits System",
    desc: "You get 100 free credits on signup. Each AI generation costs credits. Learn how to use them wisely and when to top up.",
    readTime: "3 min read",
    emoji: "💎",
  },
  {
    tag: "Tips",
    tagColor: "#f87171",
    tagBg: "rgba(248,113,113,0.12)",
    date: "Apr 2025",
    title: "10 Templates You Should Try First on ZWS",
    desc: "From portfolios to e-commerce stores, these 10 free templates are the most popular on Zater Web Studio right now.",
    readTime: "5 min read",
    emoji: "🎨",
  },
  {
    tag: "Hosting",
    tagColor: "#34d399",
    tagBg: "rgba(52,211,153,0.12)",
    date: "Mar 2025",
    title: "Free Hosting on ZWS — How It Actually Works",
    desc: "Your site goes live instantly after deployment. Here's how our free hosting infrastructure works under the hood.",
    readTime: "4 min read",
    emoji: "☁️",
  },
  {
    tag: "AI",
    tagColor: "#c4b5fd",
    tagBg: "rgba(196,181,253,0.12)",
    date: "Mar 2025",
    title: "Claude AI vs Other AI Website Builders — Honest Comparison",
    desc: "We compare ZWS (powered by Claude AI by Anthropic) to other AI website builders. Spoiler: the results are surprising.",
    readTime: "7 min read",
    emoji: "🤖",
  },
];

const TAGS = ["All", "Product", "Tutorial", "Tips", "AI", "Credits", "Hosting"];

const s = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0eee8", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: 80 },
  hero: { textAlign: "center", padding: "72px 24px 48px", maxWidth: 700, margin: "0 auto" },
  badge: { display: "inline-block", background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.3)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "6px 16px", borderRadius: 999, marginBottom: 24, textTransform: "uppercase" },
  title: { fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em", color: "#f0eee8" },
  sub: { fontSize: "1.05rem", color: "#9e9b93", lineHeight: 1.7, margin: 0 },
  accent: { background: "linear-gradient(135deg,#818cf8,#6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  section: { maxWidth: 1000, margin: "0 auto", padding: "0 24px" },
  tagRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 24px", cursor: "pointer", transition: "border-color 0.2s,transform 0.2s" },
  cardEmoji: { fontSize: "2rem", marginBottom: 14 },
  cardTagRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  cardTitle: { fontSize: "1rem", fontWeight: 700, color: "#f0eee8", margin: "0 0 10px", lineHeight: 1.4 },
  cardDesc: { fontSize: "0.85rem", color: "#6b6965", lineHeight: 1.6, margin: "0 0 18px" },
  cardMeta: { fontSize: "0.78rem", color: "#4b4945" },
  comingSoon: { textAlign: "center", padding: "80px 24px", color: "#4b4945" },
  comingIcon: { fontSize: "3rem", marginBottom: 16 },
  comingText: { fontSize: "1.1rem", fontWeight: 600, color: "#6b6965" },
};

export default function BlogPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? POSTS : POSTS.filter(p => p.tag === active);

  const tagBtn = (t) => ({
    padding: "7px 16px",
    borderRadius: 999,
    border: active === t ? "1px solid rgba(129,140,248,0.5)" : "1px solid rgba(255,255,255,0.08)",
    background: active === t ? "rgba(129,140,248,0.12)" : "rgba(255,255,255,0.03)",
    color: active === t ? "#a5b4fc" : "#6b6965",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  });

  return (
    <div style={s.root}>
      <div style={s.hero}>
        <div style={s.badge}>📝 Blog</div>
        <h1 style={s.title}>Stories from <span style={s.accent}>Zater Web Studio</span></h1>
        <p style={s.sub}>Tutorials, product updates, and tips to help you build better websites faster.</p>
      </div>

      <div style={s.section}>
        <div style={s.tagRow}>
          {TAGS.map(t => (
            <button key={t} style={tagBtn(t)} onClick={() => setActive(t)}>{t}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={s.comingSoon}>
            <div style={s.comingIcon}>📭</div>
            <div style={s.comingText}>No posts yet in this category. Check back soon!</div>
          </div>
        ) : (
          <div style={s.grid}>
            {filtered.map((p, i) => (
              <div key={i} style={s.card}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={s.cardEmoji}>{p.emoji}</div>
                <div style={s.cardTagRow}>
                  <span style={{ background: p.tagBg, color: p.tagColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.tag}</span>
                </div>
                <h3 style={s.cardTitle}>{p.title}</h3>
                <p style={s.cardDesc}>{p.desc}</p>
                <div style={s.cardMeta}>{p.date} · {p.readTime}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ ...s.comingSoon, paddingTop: 48 }}>
          <div style={s.comingIcon}>✍️</div>
          <div style={s.comingText}>More articles coming soon — stay tuned!</div>
        </div>
      </div>
    </div>
  );
}
