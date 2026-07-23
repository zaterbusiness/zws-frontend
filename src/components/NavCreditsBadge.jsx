// NavCreditsbadge.jsx
// Drop this into: src/components/NavCreditsbadge.jsx
//
// REPLACES the existing credits button in your navbar:
//
//   OLD:
//     <button className="h-nav-credits" onClick={() => navigate('/credits')}>
//       <span className="h-nav-credits-icon">⚡</span>
//       <span className="h-nav-credits-val">{user?.credits ?? 0}</span>
//       <span className="h-nav-credits-label">credits</span>
//     </button>
//
//   NEW:
//     import NavCreditsbage from '../components/NavCreditsBadge'
//     <NavCreditsbage credits={user?.credits ?? 0} onClick={() => navigate('/credits')} />
//
// FEATURES:
//   • Count-up animation from 0 → current value on first render
//   • Re-animates with a "pop + glow" whenever credits change (e.g. after purchase)
//   • Low-credits warning pulse (turns amber when < 100)
//   • Zero state turns red with shake

import React, { useEffect, useRef, useState } from 'react'

export default function NavCreditsBadge({ credits = 0, onClick }) {
  const [display, setDisplay]   = useState(0)   // animated displayed value
  const [popping, setPopping]   = useState(false)
  const prevRef                 = useRef(null)
  const rafRef                  = useRef(null)
  const mountedRef              = useRef(false)

  /* ── animate count on mount (0 → credits) and on change ── */
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const from     = mountedRef.current ? (prevRef.current ?? display) : 0
    const to       = credits
    const duration = mountedRef.current ? 600 : 1200   // slower on first load
    mountedRef.current = true
    prevRef.current    = credits

    // trigger pop glow on every change after first render
    if (from !== 0 || to !== 0) {
      setPopping(true)
      setTimeout(() => setPopping(false), 700)
    }

    const start = performance.now()
    function step(now) {
      const p = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)   // ease-out cubic
      setDisplay(Math.round(from + (to - from) * e))
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [credits])

  /* ── color state ── */
  const state = credits >= 100 ? 'ok' : credits > 0 ? 'low' : 'empty'

  return (
    <>
      <style>{CSS}</style>
      <button
        className={`ncb-root ncb-${state} ${popping ? 'ncb-pop' : ''}`}
        onClick={onClick}
        title={`${credits} AI credits remaining`}
      >
        <span className="ncb-icon">⚡</span>
        <span className="ncb-val">{display}</span>
        <span className="ncb-label">credits</span>
        {state === 'low'   && <span className="ncb-dot ncb-dot-amber" />}
        {state === 'empty' && <span className="ncb-dot ncb-dot-red"   />}
      </button>
    </>
  )
}

/* ─── CSS ─────────────────────────────────────────────────── */
const CSS = `
@keyframes ncb-pop {
  0%   { transform:scale(1); }
  35%  { transform:scale(1.18); }
  65%  { transform:scale(.94); }
  100% { transform:scale(1); }
}
@keyframes ncb-glow-ok {
  0%,100% { box-shadow:0 0 0 0 rgba(192,57,43,.4); }
  50%      { box-shadow:0 0 0 6px rgba(192,57,43,0); }
}
@keyframes ncb-glow-low {
  0%,100% { box-shadow:0 0 0 0 rgba(217,119,6,.5); }
  50%      { box-shadow:0 0 0 6px rgba(217,119,6,0); }
}
@keyframes ncb-shake {
  0%,100% { transform:translateX(0); }
  20%      { transform:translateX(-4px) rotate(-2deg); }
  40%      { transform:translateX(4px) rotate(2deg); }
  60%      { transform:translateX(-3px); }
  80%      { transform:translateX(3px); }
}
@keyframes ncb-dot-pulse {
  0%,100% { transform:scale(1); opacity:1; }
  50%      { transform:scale(1.5); opacity:.6; }
}

/* base */
.ncb-root {
  display:inline-flex; align-items:center; gap:5px;
  padding:7px 13px; border-radius:100px;
  border:1.5px solid transparent;
  cursor:pointer; font-family:'Nunito',sans-serif;
  transition:background .2s, border-color .2s, transform .15s;
  position:relative;
  user-select:none;
}
.ncb-root:hover { transform:translateY(-1px); }
.ncb-root:active { transform:translateY(0) scale(.97); }

/* ok state — red/brand */
.ncb-ok {
  background:rgba(192,57,43,.09);
  border-color:rgba(192,57,43,.25);
  color:#c0392b;
}
.ncb-ok:hover { background:rgba(192,57,43,.15); border-color:#c0392b; }

/* low state — amber */
.ncb-low {
  background:rgba(217,119,6,.09);
  border-color:rgba(217,119,6,.3);
  color:#d97706;
  animation:ncb-glow-low 1.8s ease-in-out infinite;
}
.ncb-low:hover { background:rgba(217,119,6,.16); }

/* empty state — red pulse + shake on mount */
.ncb-empty {
  background:rgba(220,38,38,.09);
  border-color:rgba(220,38,38,.3);
  color:#dc2626;
  animation:ncb-shake .5s ease;
}
.ncb-empty:hover { background:rgba(220,38,38,.16); }

/* pop animation (triggered on value change) */
.ncb-pop { animation:ncb-pop .5s cubic-bezier(.22,.68,0,1.3), ncb-glow-ok .6s ease; }

/* icon */
.ncb-icon { font-size:14px; line-height:1; }

/* value */
.ncb-val {
  font-size:14px; font-weight:800; min-width:24px; text-align:center;
  letter-spacing:-.3px;
}

/* label */
.ncb-label {
  font-size:11px; font-weight:600;
  opacity:.75; text-transform:uppercase; letter-spacing:.4px;
}

/* live indicator dot */
.ncb-dot {
  position:absolute; top:5px; right:5px;
  width:6px; height:6px; border-radius:50%;
  animation:ncb-dot-pulse 1.4s ease-in-out infinite;
}
.ncb-dot-amber { background:#f59e0b; }
.ncb-dot-red   { background:#ef4444; }
`
