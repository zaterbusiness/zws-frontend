import React, { useState, useRef, useEffect } from 'react'
import zaterLogo from '../assets/zater-logo.jpeg'

// ── Base URL for ZWS — change to your production domain ──────
const ZWS_URL = typeof window !== 'undefined' ? window.location.origin : 'https://zaterstudio.com'

const LINKS = {
  home:        ZWS_URL + '/',
  templates:   ZWS_URL + '/#templates',
  projects:    ZWS_URL + '/projects',
  deployments: ZWS_URL + '/deployments',
  credits:     ZWS_URL + '/credits',
  settings:    ZWS_URL + '/settings',
  help:        ZWS_URL + '/help',
  support:     'mailto:zaterbusiness@gmail.com',
}

// ── Knowledge base — short responses + link chips ────────────
const KB = [
  {
    id: 'greet',
    patterns: ['hi','hello','hey','helo','hii','yo','sup','good morning','good evening','good afternoon','namaste','vanakkam','hai','hola'],
    response: `👋 Hi! I'm **ZWS Bot** — your guide for Zater Web Studio.

What do you want to do?`,
    chips: [
      { label: '🎨 Browse Templates', url: LINKS.templates },
      { label: '⚡ Generate a Site', url: LINKS.home },
    ],
    quickReplies: ['What is free?', 'How to host free?', 'How do credits work?'],
  },

  {
    id: 'about',
    patterns: ['what is zater','what is zws','about zater','about zws','tell me about','explain','zater web studio','what does zws do'],
    response: `🚀 **Zater Web Studio** — AI-powered website & app builder 🇮🇳

3 ways to build:
• 🎨 **Templates** — 10 free templates, host instantly
• ✏️ **Customize** — fill a Google Form, we apply changes free
• ⚡ **AI Generate** — describe your site, built in 15–30s

Built by **Vaishiva** · Powered by **Claude Opus 4.8**`,
    chips: [
      { label: '🚀 Open ZWS', url: LINKS.home },
      { label: '🎨 Templates', url: LINKS.templates },
    ],
    quickReplies: ['What is free?', 'How to generate?', 'How to host free?'],
  },

  {
    id: 'free_overview',
    patterns: ['what is free','free features','without paying','completely free','totally free','is it free','free account','no cost'],
    response: `🆓 **What's FREE:**

✅ All 10 templates — download & host
✅ GitHub Pages hosting — free live URL
✅ Template customization via Google Form
✅ 100 credits on signup (1 free AI generation)
✅ Preview all sites

💰 Only paid: extra credits ₹99 = 100 credits`,
    chips: [
      { label: '🎨 See Templates', url: LINKS.templates },
      { label: '⚡ Generate Free', url: LINKS.home },
    ],
    quickReplies: ['How to use templates?', 'How to customize free?', 'How do credits work?'],
  },

  {
    id: 'templates_free',
    patterns: ['template','templates','free template','website template','app template','pre-built','ready made','download template','which templates','how many templates','prebuilt'],
    response: `🎨 **10 Free Templates:**

**6 Websites:** Fine Dining · Photographer · SaaS · Jewelry · Yoga · Medical Clinic

**4 Apps:** User Management · E-Commerce · Food Ordering · Appointment Booking

For every template → ⬇️ Download · 🐙 Host Free `,
    chips: [
      { label: '🎨 Browse All Templates', url: LINKS.templates },
    ],
    quickReplies: ['How to customize a template?', 'How to host free?', 'How to download?'],
  },

 

  {
  id: 'manual_hosting',
  patterns: ['manual hosting','manual host','host my app','deploy my app','app hosting','full stack hosting','host generated app','backend hosting','deploy backend'],
  response: `🖥️ **Manual Hosting (Generated Apps):**

Full-stack apps need a backend + database, so these are hosted **manually**, not via GitHub Pages.

1. Click **"🖥️ Manual Hosting"** on your generated app
2. Fill in your hosting requirements
3. Pay ₹399 one-time OR request help via form
4. We deploy backend + frontend + DB and send you the live URL

💡 Website-only projects still use **free GitHub Pages hosting**.`,
  chips: [
    { label: '⚛️ My Projects', url: LINKS.projects },
  ],
  quickReplies: ['What is custom domain?', 'How to add custom code?'],
},

{
  id: 'custom_domain',
  patterns: ['custom domain','my own domain','connect domain','domain name','use my domain','add domain','dns','godaddy','namecheap'],
  response: `🌐 **Custom Domain Setup:**

Want \`yourbrand.com\` instead of the default URL?

1. Click **"🌐 Custom Domain"** on your project/deployment
2. Fill the Google Form with your domain + DNS provider
3. We guide you through the DNS records (CNAME/A record)
4. Live on your domain within 24–48 hrs (DNS propagation)

Works for both **website (GitHub Pages)** and **manually hosted apps**.`,
  chips: [
    { label: '🚀 My Deployments', url: LINKS.deployments },
  ],
  quickReplies: ['How to host free?', 'How to contact support?'],
},
{
  id: 'custom_code',
  patterns: ['custom code','edit code','change code','code editor','modify code','custom coding','write my own code','edit source'],
  response: `💻 **Custom Code:**

Want to tweak the generated code yourself?

1. Open your project → **"💻 Custom Code"**
2. Edit HTML/CSS/JS (websites) or React/Node files (apps) directly
3. Save → re-download or re-deploy instantly

Works for **templates**, **AI-generated websites**, and **full-stack apps**.`,
  chips: [
    { label: '📁 My Projects', url: LINKS.projects },
  ],
  quickReplies: ['How to download?', 'How to host free?'],
},

  {
    id: 'hosting_free',
    patterns: ['host','hosting','deploy','live','publish','go live','github pages','how to host','host free','free hosting','website live','github deploy','deploy free','get live url'],
    response: `🌐 **Free Hosting on GitHub Pages:**

1. Click **"🐙 Host Free"** on any template or project
2. URL is created instantly
3. ⏱️ Wait ~**2 minutes** for GitHub to activate
4. Check status in **Deployments** page

Your live URL: \`https://zaterbusiness.github.io/zater-sites/...\``,
    chips: [
      { label: '🚀 My Deployments', url: LINKS.deployments },
      { label: '🎨 Pick a Template', url: LINKS.templates },
    ],
    // Just extend quickReplies for 'hosting_free':
quickReplies: ['URL still pending?', 'How to get GitHub token?', 'How to download?', 'Custom domain?', 'Custom code?'],
  },

  {
    id: 'site_pending',
    patterns: ['not live','site pending','still pending','not working','404','takes long','how long','github pages not working','2 minutes','when live','url not working','url pending'],
    response: `⏱️ **URL Pending — Normal! (~2 min wait)**

| Time | What happens |
|------|-------------|
| 0s | URL created, shown in card |
| ~1 min | HTML uploaded to GitHub |
| ~2 min | 🟢 Site goes live |

Go to **Deployments** → wait 2 min → click **

Still pending after 5 min? Check your GitHub token has **repo** scope.`,
    chips: [
      { label: '🚀 Check Deployments', url: LINKS.deployments },
      { label: '⚙️ Settings', url: LINKS.settings },
    ],
    quickReplies: ['How to get GitHub token?', 'How does hosting work?'],
  },

  {
    id: 'deployment_page',
    patterns: ['deployments','my deployments','deployed sites','deployment page','deployment status','find my live url','check deployment','all deployments'],
    response: `🚀 **Deployments Page** — see all your live sites!

Shows: 🟢 Live · ⏳ Pending ·  Re-check

Actions per card: Visit Site · Copy URL · View Project · Mini preview

New sites take ~2 min to go live after first deploy.`,
    chips: [
      { label: '🚀 Go to Deployments', url: LINKS.deployments },
    ],
    quickReplies: ['Site still pending?', 'How to deploy?'],
  },

  {
    id: 'github_token',
    patterns: ['github token','personal access token','github setup','how to get token','github connect','token for github','pat token','repo scope','settings github'],
    response: `🔑 **GitHub Token Setup (one-time):**

1. **github.com** → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new → check ✅ **repo** scope
4. Copy token (shown once!)
5. ZWS → **Settings** → Paste token → Save

Done! All future hosting is one-click free 🎉`,
    chips: [
      { label: '⚙️ ZWS Settings', url: LINKS.settings },
    ],
    quickReplies: ['How to host after adding token?', 'URL takes 2 min to go live?'],
  },

{
  id: 'credits',
  patterns: ['credit','credits','how many credits','100 credits','200 credits','credit system','free credits','buy credits','credits work','what are credits','credit balance','insufficient credits'],
  response: `⚡ **Credits System:**

- **Signup** → 100 free credits (1 website generation)
- **Website generation** → 100 credits
- **Full-stack app generation** → 200 credits
- **Buy more** → ₹99 = 100 credits

Templates/hosting = **always free, no credits!**`,
  chips: [
    { label: '⚡ View Credits', url: LINKS.credits },
    { label: '🎨 Free Templates', url: LINKS.templates },
  ],
  quickReplies: ['Are templates free without credits?', 'How to buy credits?'],
},

  {
    id: 'pricing',
    patterns: ['price','pricing','cost','charge','how much','fee','fees','₹','plan','plans','rate','how much to pay'],
    response: `💰 **ZWS Pricing:**

| What | Cost |
|------|------|
| Templates (10) | 🆓 Free |
| GitHub hosting | 🆓 Free |
| Website generation | 100 credits |
| App generation | 200 credits |
| First 100 credits | 🆓 Free (signup) |
| More credits | ₹99 = 100 credits |
| Manual hosting | ₹399 one-time |

No subscription. No hidden fees.`,
    chips: [
      { label: '⚡ Get Started Free', url: LINKS.home },
    ],
    quickReplies: ['What are credits?', 'What templates are free?'],
  },

  {
    id: 'how_to_generate',
    patterns: ['how to generate','how do i generate','how to create','how to make','generate website','create website','make website','build website','steps to generate','generate app'],
    response: `⚡ **Generate a Website/App:**

1. Sign up → get 100 free credits
2. Choose **Website (100 credits)** or **Full-Stack App (200 credits)**
3. Describe your site (be specific!)
4. Click **Generate ⚡** — done in 30–60s
5. Preview → Download or Host free

💡 Tip: Use templates first — free, no credits!`,
    chips: [
      { label: '⚡ Generate Now', url: LINKS.home },
      { label: '🎨 Free Templates', url: LINKS.templates },
    ],
    quickReplies: ['How to write a good prompt?', 'How does hosting work?', 'How do credits work?'],
  },
{
  id: 'help_center',
  patterns: ['help center','help page','helpcenter','faq','documentation','docs','guide','user guide','more help'],
  response: `📖 **Help Center**

Find detailed guides on templates, hosting, credits, custom domains, custom code, and troubleshooting.`,
  chips: [
    { label: '📖 Open Help Center', url: LINKS.help },
  ],
  quickReplies: ['How to contact support?', 'How do credits work?'],
},
  {
    id: 'prompt_tips',
    patterns: ['good prompt','better prompt','prompt tips','how to write prompt','what to type','prompt example','tips for prompt'],
    response: `✍️ **Good Prompt = Better Site:**

Include: **business type · style · sections · colors · purpose**

✅ Good: *"Luxury Chennai restaurant, dark theme with gold, hero + menu + reservation form + reviews"*

❌ Bad: *"Make me a website"*

💡 Or just use a free template — prompts already written!`,
    chips: [
      { label: '🎨 Use a Template', url: LINKS.templates },
    ],
    quickReplies: ['What templates are available?', 'How to generate?'],
  },

  {
    id: 'fullstack',
    patterns: ['full stack','fullstack','app mode','react','nodejs','node.js','express','mysql','backend','full-stack app','build app','generate app','api routes'],
    response: `⚛️ **Full-Stack App Mode:**

Generates 4 files: **App.jsx · server.js · schema.sql · README.md**

**4 Free App Templates:**
User Management · E-Commerce · Food Ordering · Appointment Booking

Download as a **ZIP file** anytime · free to host, customize & edit code`,
    chips: [
      { label: '⚛️ Build an App', url: LINKS.home },
      { label: '🎨 App Templates', url: LINKS.templates },
    ],
    quickReplies: ['How to run downloaded app?', 'How do credits work?'],
  },

  {
    id: 'run_app',
    patterns: ['how to run','run the app','setup app','install','run project','how to install','run downloaded'],
    response: `🖥️ **Run Your Downloaded App:**

\`\`\`
# Frontend
cd frontend && npm install && npm run dev
# → http://localhost:5173

# Backend
cd backend && npm install && npm run dev
# → http://localhost:5000

# Database
mysql -u root -p < schema.sql
\`\`\`

Check **README.md** for project-specific instructions.`,
    quickReplies: ['What is full-stack app mode?', 'How to contact support?'],
  },

  {
    id: 'payment',
    patterns: ['upi','gpay','google pay','phonepe','paytm','netbanking','debit card','credit card','how to pay','payment method','razorpay'],
    response: `💳 **Payment (Razorpay — Secure):**

Accepts: UPI (GPay, PhonePe, Paytm) · Debit/Credit Card · Net Banking

Only needed for **extra credits** (₹99) or manual hosting (₹399).

Templates, hosting, and customization = **always free!**`,
    chips: [
      { label: '⚡ Buy Credits', url: LINKS.credits },
    ],
    quickReplies: ['Payment failed?', 'What is free?'],
  },

  {
    id: 'payment_failed',
    patterns: ['payment failed','payment not working','money deducted','double charge','charged twice','refund','not paid','upi failed'],
    response: `⚠️ **Payment Issue?**

• **Deducted but no credits?** — auto-refund in 3–7 days
• **UPI failed?** — try GPay → PhonePe → Paytm
• **Popup not opening?** — disable ad blocker, use Chrome

Still stuck? Email with transaction ID:`,
    chips: [
      { label: '📧 Email Support', url: LINKS.support },
    ],
    quickReplies: ['What is free?', 'How to contact support?'],
  },

  {
    id: 'projects',
    patterns: ['my projects','saved projects','find my project','project page','project history','previous project','all my websites','recent projects'],
    response: `📁 **My Projects** — all your generated sites in one place.

Shows: live preview cards · download · host · delete options

Navbar → **"My Projects"** or homepage → scroll to "Your Recent Work"`,
    chips: [
      { label: '📁 My Projects', url: LINKS.projects },
    ],
    quickReplies: ['How to host my project?', 'How to download?'],
  },

  {
    id: 'account',
    patterns: ['signup','sign up','register','create account','login','log in','account','forgot password','reset password','google login'],
    response: `👤 **Account:**

• Sign up with email or **Google OAuth** (one click)
• On signup: **100 free credits** added instantly
• Forgot password → click "Forgot Password" on login page

No credit card to sign up!`,
    chips: [
      { label: '👤 Sign Up Free', url: LINKS.home },
    ],
    quickReplies: ['What do I get for free?', 'How to generate?'],
  },

  {
  id: 'contact',
  patterns: ['contact','support','help','problem','issue','bug','error','not working','something wrong','reach','email'],
  response: `🆘 **Get Help:**

**Quick fixes:**
- URL pending → wait 2 min → Re-check
- Deploy failed → check GitHub token has **repo** scope
- Payment failed → try different UPI app
- Login issue → use Forgot Password

**Email support:**`,
  chips: [
    { label: '📧 zaterbusiness@gmail.com', url: LINKS.support },
    { label: '📖 Help Center', url: LINKS.help },
    { label: '⚙️ Settings', url: LINKS.settings },
  ],
  quickReplies: ['GitHub hosting issue?', 'URL pending issue?', 'Payment issue?'],
},

  {
    id: 'safe',
    patterns: ['safe','secure','security','trust','legit','legitimate','scam','real','genuine','is this real'],
    response: `🔒 **Yes, ZWS is safe & legit!**

✅ Templates truly free — no card needed
✅ Payments by Razorpay (India's #1 gateway)
✅ Free preview before using credits
✅ Full source code — 100% yours
✅ Built in India by a real developer 🇮🇳`,
    chips: [
      { label: '⚡ Get Started Free', url: LINKS.home },
    ],
    quickReplies: ['What is actually free?', 'How to get started?'],
  },

  {
    id: 'thanks',
    patterns: ['thank','thanks','thank you','thankyou','thx','ty','ok thanks','great','awesome','perfect','nice','good job','helpful','got it','understood','clear now'],
    response: `😊 Happy to help! Good luck with your project! 🚀

Anything else?`,
    chips: [
      { label: '🚀 Open ZWS', url: LINKS.home },
    ],
    quickReplies: ['How to use templates?', 'How to host free?'],
  },

  {
    id: 'bye',
    patterns: ['bye','goodbye','see you','exit','done','that is all','thats all','no thanks','nothing else'],
    response: `👋 Goodbye! Remember:
🎨 Templates + hosting = **always free**
⚡ AI generation = **free once** on signup`,
    chips: [
      { label: '🚀 Open ZWS', url: LINKS.home },
    ],
    quickReplies: [],
  },
]

function findMatch(input) {
  const q = input.toLowerCase().trim().replace(/[?!.,]/g, '')
  for (const entry of KB) {
    for (const p of entry.patterns) {
      if (q === p || q.includes(p) || p.includes(q)) return entry
    }
  }
  let best = null, bestScore = 0
  const qWords = q.split(/\s+/).filter(w => w.length > 2)
  for (const entry of KB) {
    let score = 0
    for (const p of entry.patterns) {
      const pWords = p.split(/\s+/)
      for (const pw of pWords) {
        for (const qw of qWords) {
          if (pw.includes(qw) || qw.includes(pw)) score += pw.length
        }
      }
    }
    if (score > bestScore) { bestScore = score; best = entry }
  }
  return bestScore > 4 ? best : null
}

const WELCOME = {
  role: 'assistant',
  content: `👋 Hi! I'm **ZWS Bot** — instant help for **Zater Web Studio**!

🎨 Free templates · 🌐 Free hosting · ⚡ AI generation · ✏️ Free customization

What can I help you with?`,
  chips: [
    { label: '🎨 Browse Templates', url: LINKS.templates },
    { label: '⚡ Generate a Site', url: LINKS.home },
    { label: '🚀 My Deployments', url: LINKS.deployments },
  ],
  quickReplies: ['What is free?', 'How to host free?', 'How do credits work?'],
}

const FALLBACK_QR = ['What is free?', 'How to use templates?', 'How to host free?', 'Contact support']

export default function ZWSBot() {
  const [open,      setOpen]     = useState(false)
  const [dark,      setDark]     = useState(false)
  const [messages,  setMessages] = useState([WELCOME])
  const [input,     setInput]    = useState('')
  const [typing,    setTyping]   = useState(false)
  const [unread,    setUnread]   = useState(1)
  const [minimized, setMinimized]= useState(false)
  const endRef   = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])
  useEffect(() => {
    if (open && !minimized) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 150) }
  }, [open, minimized])

  const send = (text) => {
    const content = (text || input).trim()
    if (!content || typing) return
    setInput('')
    const ts = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { role: 'user', content, ts }])
    setTyping(true)
    const entry = findMatch(content)
    setTimeout(() => {
      const ts2 = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      setTyping(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content:      entry ? entry.response : `🤔 I didn't catch that. Try:`,
        chips:        entry ? (entry.chips || []) : [{ label: '🚀 Open ZWS', url: LINKS.home }],
        quickReplies: entry ? (entry.quickReplies || []) : FALLBACK_QR,
        ts: ts2,
      }])
    }, 350 + Math.random() * 300)
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const clearChat = () => {
    setMessages([WELCOME])
    setUnread(0)
  }

  // ── Render markdown-lite ──────────────────────────────────
  const renderLine = (line, key, dm) => {
    const html = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, `<code style="background:${dm?'#2a2a3a':'#f0f0f6'};padding:1px 5px;border-radius:4px;font-size:11px;font-family:monospace;color:${dm?'#e879f9':'#7c3aed'}">\$1</code>`)
    if (!line.trim()) return <div key={key} style={{ height: 4 }} />
    return <div key={key} dangerouslySetInnerHTML={{ __html: html }} />
  }

  const renderContent = (text, dm) => {
    const lines = text.split('\n')
    const result = []
    let tableLines = []
    const flushTable = (idx) => {
      if (!tableLines.length) return
      const rows = tableLines.filter(r => !r.replace(/\|/g,'').trim().match(/^[-:\s]+$/))
      result.push(
        <div key={`t${idx}`} style={{ overflowX:'auto', margin:'6px 0', borderRadius:8, border:`1px solid ${dm?'#333':'#e8e8f0'}` }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <tbody>{rows.map((r,j) => {
              const cells = r.split('|').filter(Boolean)
              return (
                <tr key={j} style={{ background: j===0 ? (dm?'#1e1e2e':'#f4f4f8') : 'transparent' }}>
                  {cells.map((c,k) => (
                    <td key={k} style={{ padding:'5px 10px', borderBottom:`1px solid ${dm?'#2a2a3a':'#f0f0f6'}`, fontWeight:j===0?700:400, fontSize:j===0?11:12, color:dm?'#e0e0f0':'#3a3a4a' }}
                      dangerouslySetInnerHTML={{ __html: c.trim() }} />
                  ))}
                </tr>
              )
            })}</tbody>
          </table>
        </div>
      )
      tableLines = []
    }
    lines.forEach((line, i) => {
      if (line.startsWith('|')) { tableLines.push(line) }
      else { flushTable(i); result.push(renderLine(line, i, dm)) }
    })
    flushTable(lines.length)
    return result
  }

  const dm = dark

  return (
    <>
      <style>{getCSS(dm)}</style>

      {/* FAB */}
      <button className="zb-fab" onClick={() => { setOpen(o => !o); setMinimized(false) }}>
        {open && !minimized
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        }
        {(!open || minimized) && unread > 0 && <div className="zb-badge">{unread}</div>}
      </button>

      {open && !minimized && (
        <div className="zb-window">

          {/* Header */}
          <div className="zb-header">
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div className="zb-avatar">
                <img src={zaterLogo} alt="ZWS" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
              <div>
                <div className="zb-name">ZWS Bot</div>
                <div className="zb-status"><span className="zb-dot" /> Online · Free help 24/7</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:6, alignItems:'center' }}>
              {/* Dark mode toggle */}
              <button className="zb-icon-btn" title="Toggle dark mode" onClick={() => setDark(d => !d)}>
                {dm
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                }
              </button>
              {/* Clear chat */}
              <button className="zb-icon-btn" title="Clear chat" onClick={clearChat}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
              {/* Minimise */}
              <button className="zb-icon-btn" title="Minimise" onClick={() => setMinimized(true)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              {/* Close */}
              <button className="zb-icon-btn" title="Close" onClick={() => setOpen(false)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          {/* Quick access bar */}
          <div className="zb-quickbar">
  <a href={LINKS.home}        target="_blank" rel="noopener noreferrer" className="zb-qlink">🏠 Home</a>
  <a href={LINKS.templates}   target="_blank" rel="noopener noreferrer" className="zb-qlink">🎨 Templates</a>
  <a href={LINKS.deployments} target="_blank" rel="noopener noreferrer" className="zb-qlink">🚀 Deployments</a>
  <a href={LINKS.credits}     target="_blank" rel="noopener noreferrer" className="zb-qlink">⚡ Credits</a>
  <a href={LINKS.help}        target="_blank" rel="noopener noreferrer" className="zb-qlink">📖 Help</a>
</div>

          {/* Messages */}
          <div className="zb-msgs">
            {messages.map((m, i) => (
              <div key={i} className={`zb-row ${m.role === 'user' ? 'zb-row-r' : 'zb-row-l'}`}>
                {m.role === 'assistant' && (
                  <div className="zb-msg-ava">
                    <img src={zaterLogo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%' }} />
                  </div>
                )}
                <div style={{ maxWidth: 285 }}>
                  <div className={`zb-bub ${m.role === 'user' ? 'zb-bub-u' : 'zb-bub-b'}`}>
                    <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                      {renderContent(m.content, dm)}
                    </div>
                  </div>

                  {/* Link chips */}
                  {m.role === 'assistant' && m.chips?.length > 0 && (
                    <div className="zb-chips">
                      {m.chips.map((c, j) => (
                        <a key={j} href={c.url} target="_blank" rel="noopener noreferrer" className="zb-chip">
                          {c.label} ↗
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Quick replies — only on last message */}
                  {m.role === 'assistant' && m.quickReplies?.length > 0 && i === messages.length - 1 && (
                    <div className="zb-qrs">
                      {m.quickReplies.map((qr, j) => (
                        <button key={j} className="zb-qr" onClick={() => send(qr)}>{qr}</button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  {m.ts && (
                    <div className="zb-ts">{m.ts}</div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="zb-row zb-row-l">
                <div className="zb-msg-ava">
                  <img src={zaterLogo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%' }} />
                </div>
                <div className="zb-bub zb-bub-b zb-typing"><span/><span/><span/></div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Powered by */}
          <div className="zb-powered">
            ⚡ ZWS Bot · <a href={LINKS.home} target="_blank" rel="noopener noreferrer" style={{ color:'#c0392b', textDecoration:'none', fontWeight:700 }}>Open Zater Web Studio ↗</a>
          </div>

          {/* Input */}
          <div className="zb-input-row">
            <input
              ref={inputRef}
              className="zb-input"
              placeholder="Ask about templates, hosting, credits…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="zb-send" onClick={() => send()} disabled={!input.trim() || typing}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

        </div>
      )}

      {/* Minimized pill */}
      {open && minimized && (
        <div className="zb-minimized" onClick={() => setMinimized(false)}>
          <div className="zb-avatar" style={{ width:28, height:28 }}>
            <img src={zaterLogo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <span className="zb-min-label">ZWS Bot</span>
          <span className="zb-dot" style={{ margin:'0 2px' }} />
          <button className="zb-min-close" onClick={e => { e.stopPropagation(); setOpen(false) }}>✕</button>
        </div>
      )}
    </>
  )
}

function getCSS(dm) {
  const bg       = dm ? '#0f0f1a' : '#fff'
  const bg2      = dm ? '#1a1a2e' : '#f8f8fc'
  const border   = dm ? '#2a2a3a' : '#e8e8f0'
  const text      = dm ? '#e0e0f0' : '#0a0a12'
  const sub       = dm ? '#8080a0' : '#72727f'
  const bubBg    = dm ? '#1e1e30' : '#fff'
  const bubBorder= dm ? '#2a2a3e' : '#e2e2ea'
  const headerBg = dm ? '#07070f' : '#0a0a12'
  const inputBg  = dm ? '#1a1a2e' : '#f8f8fc'
  const qrBg     = dm ? '#1e1e2e' : '#fff'
  const qrBorder = dm ? '#333' : '#e2e2ea'
  const qrText   = dm ? '#c0c0e0' : '#3a3a4a'
  const chipBg   = dm ? '#1e2a3e' : '#eff6ff'
  const chipBorder=dm ? '#2a3a5a' : '#bfdbfe'
  const chipText = dm ? '#93c5fd' : '#1d4ed8'
  const qbarBg   = dm ? '#131320' : '#fafafa'
  const qlinkC   = dm ? '#8080c0' : '#72727f'
  const poweredBg= dm ? '#0d0d1a' : '#fafafa'
  const tsColor  = dm ? '#4a4a6a' : '#c0c0cc'

  return `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

.zb-fab{position:fixed;bottom:24px;right:24px;width:54px;height:54px;border-radius:50%;background:#c0392b;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(192,57,43,0.45);display:flex;align-items:center;justify-content:center;z-index:8000;transition:all .2s;font-family:'Nunito',sans-serif;}
.zb-fab:hover{transform:scale(1.1);}
.zb-badge{position:absolute;top:-4px;right:-4px;background:#22c55e;color:#fff;font-size:10px;font-weight:800;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;}

@keyframes zbin{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}
.zb-window{position:fixed;bottom:90px;right:24px;width:370px;max-width:calc(100vw - 32px);height:570px;max-height:calc(100vh - 120px);background:${bg};border-radius:20px;box-shadow:0 14px 50px rgba(0,0,0,${dm?'.5':'.18'});z-index:8000;display:flex;flex-direction:column;overflow:hidden;animation:zbin .22s ease;border:1.5px solid ${border};font-family:'Nunito',sans-serif;color:${text};}

.zb-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:${headerBg};flex-shrink:0;}
.zb-avatar{width:36px;height:36px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,0.15);flex-shrink:0;}
.zb-name{font-size:14px;font-weight:800;color:#fff;margin-bottom:1px;}
.zb-status{display:flex;align-items:center;gap:5px;font-size:10px;color:#8080a0;}
.zb-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block;flex-shrink:0;}
.zb-icon-btn{background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.6);width:26px;height:26px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;}
.zb-icon-btn:hover{background:rgba(255,255,255,0.18);color:#fff;}

.zb-quickbar{display:flex;gap:0;padding:7px 10px;background:${qbarBg};border-bottom:1px solid ${border};flex-shrink:0;overflow-x:auto;}
.zb-quickbar::-webkit-scrollbar{display:none;}
.zb-qlink{padding:4px 9px;border-radius:100px;font-size:10.5px;font-weight:700;color:${qlinkC};text-decoration:none;transition:all .15s;white-space:nowrap;border:1.5px solid transparent;}
.zb-qlink:hover{color:#c0392b;background:rgba(192,57,43,0.07);border-color:rgba(192,57,43,0.15);}

.zb-msgs{flex:1;overflow-y:auto;padding:12px 11px;display:flex;flex-direction:column;gap:10px;background:${bg2};}
.zb-msgs::-webkit-scrollbar{width:3px;}
.zb-msgs::-webkit-scrollbar-thumb{background:${border};border-radius:2px;}
.zb-row{display:flex;align-items:flex-end;gap:6px;}
.zb-row-l{flex-direction:row;}
.zb-row-r{flex-direction:row-reverse;}
.zb-msg-ava{width:24px;height:24px;flex-shrink:0;margin-bottom:18px;}
.zb-bub{max-width:275px;padding:9px 12px;border-radius:14px;font-size:12.5px;line-height:1.55;word-break:break-word;}
.zb-bub-b{background:${bubBg};border:1px solid ${bubBorder};border-bottom-left-radius:3px;color:${text};}
.zb-bub-u{background:#c0392b;color:#fff;border-bottom-right-radius:3px;max-width:210px;font-size:13px;}

.zb-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px;}
.zb-chip{display:inline-flex;align-items:center;padding:4px 10px;border-radius:8px;background:${chipBg};border:1.5px solid ${chipBorder};font-size:11px;font-weight:700;color:${chipText};text-decoration:none;transition:all .15s;white-space:nowrap;}
.zb-chip:hover{opacity:.82;transform:translateY(-1px);}

.zb-qrs{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px;}
.zb-qr{padding:4px 9px;border-radius:100px;background:${qrBg};border:1.5px solid ${qrBorder};font-size:11px;font-weight:700;color:${qrText};cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;white-space:nowrap;}
.zb-qr:hover{border-color:#c0392b;color:#c0392b;background:${dm?'rgba(192,57,43,0.1)':'#fff8f6'};}

.zb-ts{font-size:10px;color:${tsColor};margin-top:3px;padding-left:2px;}
.zb-row-r .zb-ts{text-align:right;}

@keyframes tdot{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
.zb-typing{display:flex;align-items:center;gap:4px;padding:10px 14px;}
.zb-typing span{width:7px;height:7px;border-radius:50%;background:${dm?'#4a4a6a':'#c8c8d8'};display:inline-block;animation:tdot 1.2s ease-in-out infinite;}
.zb-typing span:nth-child(2){animation-delay:.2s;}
.zb-typing span:nth-child(3){animation-delay:.4s;}

.zb-powered{padding:5px 14px;text-align:center;font-size:10px;color:${sub};border-top:1px solid ${border};flex-shrink:0;background:${poweredBg};}

.zb-input-row{display:flex;align-items:center;gap:8px;padding:10px 11px;background:${bg};border-top:1.5px solid ${border};flex-shrink:0;}
.zb-input{flex:1;padding:9px 13px;border:1.5px solid ${border};border-radius:100px;font-size:13px;font-family:'Nunito',sans-serif;color:${text};outline:none;transition:border-color .18s;background:${inputBg};}
.zb-input:focus{border-color:#c0392b;background:${bg};}
.zb-input::placeholder{color:${sub};}
.zb-send{width:36px;height:36px;border-radius:50%;background:#c0392b;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;box-shadow:0 2px 8px rgba(192,57,43,0.3);}
.zb-send:hover:not(:disabled){opacity:.88;transform:scale(1.07);}
.zb-send:disabled{background:#d0d0d8;cursor:not-allowed;box-shadow:none;}

.zb-minimized{position:fixed;bottom:90px;right:24px;background:${headerBg};border-radius:100px;padding:8px 16px 8px 10px;display:flex;align-items:center;gap:8px;cursor:pointer;z-index:8000;box-shadow:0 4px 18px rgba(0,0,0,.3);border:1.5px solid rgba(255,255,255,0.08);animation:zbin .2s ease;font-family:'Nunito',sans-serif;}
.zb-min-label{font-size:13px;font-weight:700;color:#fff;}
.zb-min-close{background:rgba(255,255,255,0.1);border:none;color:rgba(255,255,255,0.6);width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;margin-left:2px;}
.zb-min-close:hover{background:rgba(255,255,255,0.2);color:#fff;}

@media(max-width:400px){
  .zb-window{width:calc(100vw - 16px);right:8px;bottom:80px;}
  .zb-fab{right:16px;bottom:16px;}
  .zb-minimized{right:8px;}
}
`
}
