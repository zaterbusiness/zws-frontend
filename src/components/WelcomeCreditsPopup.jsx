// WelcomeCreditsPopup.jsx
// Drop this file into: src/components/WelcomeCreditsPopup.jsx
//
// USAGE in Home.jsx (or App.jsx):
//   import WelcomeCreditsPopup from '../components/WelcomeCreditsPopup'
//   <WelcomeCreditsPopup />   ← place it anywhere inside the component tree
//
// HOW IT TRIGGERS:
//   Shows once per user account. Uses localStorage key "zws_welcomed_<userId>"
//   so it only pops for truly new users, never repeats.

import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/* ─── tiny coin particle ─────────────────────────────────── */
function Coin({ style }) {
  return (
    <div className="wcp-coin" style={style}>
      ⚡
    </div>
  )
}

/* ─── main component ─────────────────────────────────────── */
export default function WelcomeCreditsPopup() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [visible, setVisible]   = useState(false)
  const [leaving, setLeaving]   = useState(false)
  const [count,   setCount]     = useState(0)
  const [coins,   setCoins]     = useState([])
  const rafRef                  = useRef(null)

  /* ── decide whether to show ── */
  useEffect(() => {
    if (!user?.id) return
    const key = `zws_welcomed_${user.id}`
    if (localStorage.getItem(key)) return   // already seen it

    // mark immediately so hot-reload or StrictMode double-fire doesn't duplicate
    localStorage.setItem(key, '1')

    // slight delay so the page renders first
    const t = setTimeout(() => {
      setVisible(true)
      spawnCoins()
      animateCount(0, 100, 1400)
    }, 600)

    return () => clearTimeout(t)
  }, [user?.id])

  /* ── count-up animation ── */
  function animateCount(from, to, duration) {
    const start = performance.now()
    function step(now) {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(from + (to - from) * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), [])

  /* ── generate burst of coins ── */
  function spawnCoins() {
    const particles = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x:  Math.random() * 100,           // % horizontal start
      dx: (Math.random() - 0.5) * 340,   // px horizontal spread
      dy: -(80 + Math.random() * 220),    // px upward travel
      delay: Math.random() * 0.35,        // s stagger
      size: 14 + Math.random() * 12,      // px
      rotate: Math.random() * 720 - 360,  // deg total rotation
    }))
    setCoins(particles)
  }

  /* ── close ── */
  function close() {
    setLeaving(true)
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible) return null

  return (
    <>
      <style>{CSS}</style>

      {/* backdrop */}
      <div
        className={`wcp-backdrop ${leaving ? 'wcp-out' : 'wcp-in'}`}
        onClick={close}
      />

      {/* popup */}
      <div className={`wcp-wrap ${leaving ? 'wcp-popup-out' : 'wcp-popup-in'}`}>

        {/* coin burst — rendered relative to the popup */}
        <div className="wcp-coins-stage" aria-hidden>
          {coins.map(c => (
            <Coin
              key={c.id}
              style={{
                left:     `${c.x}%`,
                fontSize: `${c.size}px`,
                animationDelay:    `${c.delay}s`,
                '--dx': `${c.dx}px`,
                '--dy': `${c.dy}px`,
                '--rot': `${c.rotate}deg`,
              }}
            />
          ))}
        </div>

        {/* close button */}
        <button className="wcp-close" onClick={close} aria-label="Close">✕</button>

        {/* gift icon */}
        <div className="wcp-gift">🎁</div>

        {/* headline */}
        <div className="wcp-welcome">Welcome to Zater Web Studio!</div>
        <div className="wcp-sub">You've received a free gift</div>

        {/* big animated number */}
        <div className="wcp-credit-badge">
          <span className="wcp-lightning">⚡</span>
          <span className="wcp-num">{count}</span>
          <span className="wcp-credits-label">credits</span>
        </div>

        {/* description */}
        <p className="wcp-desc">
          Use your <strong>100 free credits</strong> to generate your first
          AI-powered website or app — no payment needed.
        </p>

        {/* progress bar filling up */}
        <div className="wcp-bar-wrap" aria-hidden>
          <div className="wcp-bar-fill" style={{ width: `${count}%` }} />
          <div className="wcp-bar-label">{count} / 100</div>
        </div>

        {/* actions */}
        <div className="wcp-actions">
          <button className="wcp-btn-primary" onClick={() => { close(); /* scroll to generator or navigate */ }}>
            🚀 Start Building
          </button>
          <button className="wcp-btn-secondary" onClick={() => { close(); navigate('/credits') }}>
            View My Credits
          </button>
        </div>

      </div>
    </>
  )
}

/* ─── CSS ─────────────────────────────────────────────────── */
const CSS = `
/* ── keyframes ───────────────────────────────────── */
@keyframes wcp-fade-in   { from{opacity:0} to{opacity:1} }
@keyframes wcp-fade-out  { from{opacity:1} to{opacity:0} }

@keyframes wcp-pop-in {
  0%   { opacity:0; transform:translateX(-50%) translateY(-40%) scale(.7); }
  65%  { transform:translateX(-50%) translateY(-50%) scale(1.04); }
  100% { opacity:1; transform:translateX(-50%) translateY(-50%) scale(1); }
}
@keyframes wcp-pop-out {
  from { opacity:1; transform:translateX(-50%) translateY(-50%) scale(1); }
  to   { opacity:0; transform:translateX(-50%) translateY(-40%) scale(.8); }
}

@keyframes wcp-coin-burst {
  0%   { opacity:1; transform:translate(0,0) rotate(0deg) scale(1); }
  60%  { opacity:1; }
  100% { opacity:0; transform:translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(.4); }
}

@keyframes wcp-pulse-glow {
  0%,100% { box-shadow: 0 0 0 0 rgba(192,57,43,.5), 0 20px 60px rgba(192,57,43,.25); }
  50%      { box-shadow: 0 0 0 12px rgba(192,57,43,0), 0 20px 60px rgba(192,57,43,.4); }
}

@keyframes wcp-bar-grow {
  from { width: 0%; }
}

@keyframes wcp-bounce-in {
  0%   { transform:scale(0) rotate(-15deg); }
  60%  { transform:scale(1.2) rotate(5deg); }
  100% { transform:scale(1) rotate(0deg); }
}

@keyframes wcp-num-pop {
  0%   { transform:scale(.8); opacity:.4; }
  60%  { transform:scale(1.12); }
  100% { transform:scale(1); opacity:1; }
}

/* ── backdrop ─────────────────────────────────────── */
.wcp-backdrop {
  position:fixed; inset:0; z-index:9998;
  background:rgba(0,0,0,.55);
  backdrop-filter:blur(4px);
}
.wcp-backdrop.wcp-in  { animation:wcp-fade-in .3s ease forwards; }
.wcp-backdrop.wcp-out { animation:wcp-fade-out .35s ease forwards; }

/* ── popup shell ──────────────────────────────────── */
.wcp-wrap {
  position:fixed; z-index:9999;
  left:50%; top:50%;
  width:min(480px, 92vw);
  background:#fff;
  border-radius:24px;
  padding:40px 32px 32px;
  text-align:center;
  overflow:hidden;
  box-shadow:0 24px 80px rgba(0,0,0,.22);
  animation:wcp-pulse-glow 2.5s ease-in-out 1.2s 3;
  font-family:'Nunito',sans-serif;
}
.wcp-wrap.wcp-popup-in  { animation:wcp-pop-in .55s cubic-bezier(.22,.68,0,1.3) forwards,
                                     wcp-pulse-glow 2.5s ease-in-out 1.8s 3; }
.wcp-wrap.wcp-popup-out { animation:wcp-pop-out .38s ease forwards; }

/* top accent bar */
.wcp-wrap::before {
  content:'';
  position:absolute; top:0; left:0; right:0; height:5px;
  background:linear-gradient(90deg,#c0392b,#e74c3c,#f39c12,#c0392b);
  background-size:300% 100%;
  animation:none;
}

/* ── coin burst stage ─────────────────────────────── */
.wcp-coins-stage {
  position:absolute; top:30%; left:0; right:0; height:0;
  pointer-events:none;
}
.wcp-coin {
  position:absolute;
  animation:wcp-coin-burst .9s ease-out forwards;
  will-change:transform,opacity;
  line-height:1;
}

/* ── close ────────────────────────────────────────── */
.wcp-close {
  position:absolute; top:14px; right:14px;
  width:30px; height:30px; border-radius:50%;
  border:none; background:#f0f0f5; color:#5a5a70;
  font-size:13px; font-weight:700; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:all .18s;
}
.wcp-close:hover { background:#e2e2ea; color:#0a0a12; }

/* ── gift icon ────────────────────────────────────── */
.wcp-gift {
  font-size:52px; line-height:1; margin-bottom:10px;
  animation:wcp-bounce-in .6s cubic-bezier(.22,.68,0,1.3) .3s both;
  display:inline-block;
}

/* ── text ─────────────────────────────────────────── */
.wcp-welcome {
  font-family:'Playfair Display',serif;
  font-size:22px; font-weight:900; color:#0a0a12;
  margin-bottom:4px;
  animation:wcp-fade-in .4s .5s both;
}
.wcp-sub {
  font-size:13px; font-weight:600; color:#8080a0;
  margin-bottom:20px;
  animation:wcp-fade-in .4s .6s both;
}

/* ── big credit badge ─────────────────────────────── */
.wcp-credit-badge {
  display:inline-flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#fff8f7,#fff0ee);
  border:2.5px solid #c0392b;
  border-radius:20px;
  padding:14px 28px;
  margin-bottom:16px;
  animation:wcp-num-pop .5s .7s both;
}
.wcp-lightning { font-size:26px; }
.wcp-num {
  font-family:'Playfair Display',serif;
  font-size:56px; font-weight:900; color:#c0392b;
  line-height:1; min-width:72px; text-align:center;
}
.wcp-credits-label {
  font-size:14px; font-weight:800; color:#c0392b;
  text-transform:uppercase; letter-spacing:1px;
  align-self:flex-end; padding-bottom:6px;
}

/* ── description ──────────────────────────────────── */
.wcp-desc {
  font-size:13px; color:#5a5a70; font-weight:500;
  line-height:1.7; margin-bottom:20px; max-width:340px; margin-inline:auto;
  animation:wcp-fade-in .4s .9s both;
}

/* ── progress bar ─────────────────────────────────── */
.wcp-bar-wrap {
  position:relative;
  height:10px; border-radius:100px;
  background:#f0f0f5;
  margin-bottom:24px;
  overflow:hidden;
}
.wcp-bar-fill {
  height:100%; border-radius:100px;
  background:linear-gradient(90deg,#c0392b,#e74c3c);
  transition:width .05s linear;
  box-shadow:0 0 8px rgba(192,57,43,.4);
}
.wcp-bar-label {
  position:absolute; top:50%; right:0;
  transform:translateY(-50%);
  font-size:9px; font-weight:800; color:#c0392b;
  background:#fff; padding:0 4px; border-radius:4px;
  display:none; /* optional: remove if you want the label */
}

/* ── action buttons ───────────────────────────────── */
.wcp-actions {
  display:flex; gap:10px; flex-wrap:wrap;
  animation:wcp-fade-in .4s 1.1s both;
}
.wcp-btn-primary {
  flex:1; min-width:140px;
  padding:13px 20px; border-radius:12px;
  background:#c0392b; border:none; color:#fff;
  font-size:14px; font-weight:800; cursor:pointer;
  font-family:'Nunito',sans-serif;
  box-shadow:0 4px 16px rgba(192,57,43,.35);
  transition:all .18s;
}
.wcp-btn-primary:hover { opacity:.88; transform:translateY(-1px); }

.wcp-btn-secondary {
  flex:1; min-width:140px;
  padding:13px 20px; border-radius:12px;
  background:transparent; border:2px solid #e2e2ea; color:#3a3a4a;
  font-size:14px; font-weight:800; cursor:pointer;
  font-family:'Nunito',sans-serif;
  transition:all .18s;
}
.wcp-btn-secondary:hover { border-color:#c0392b; color:#c0392b; }

@media(max-width:420px) {
  .wcp-wrap { padding:32px 20px 24px; }
  .wcp-num  { font-size:44px; }
  .wcp-actions { flex-direction:column; }
}
`
