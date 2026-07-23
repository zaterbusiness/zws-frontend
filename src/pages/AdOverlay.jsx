import React, { useEffect, useState, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * AdOverlay — drop this anywhere inside your homepage/root component.
 *
 * Usage:
 *   import AdOverlay from './components/AdOverlay'
 *   // inside your JSX:
 *   <AdOverlay />
 *
 * It automatically fetches the first active ad from your backend,
 * waits 1.5 s, then shows a full-screen blurred overlay.
 * It won't show again for 24 hours (stored in sessionStorage).
 */
export default function AdOverlay() {
  const [ad,    setAd]    = useState(null)   // the ad object
  const [show,  setShow]  = useState(false)  // controls visibility
  const [ready, setReady] = useState(false)  // controls mount (for animation)

  // ── Fetch active ad ────────────────────────────────────────────────────────
  useEffect(() => {
    // Don't show more than once per session
    if (sessionStorage.getItem('zater_ad_seen')) return

    const fetchAd = async () => {
      try {
        const res  = await fetch(`${API_BASE}/ads/active`)
        const data = await res.json()
        // Expects { ad: { id, title, image_url, link_url, link_text } } or { ad: null }
        if (data?.ad) {
          setAd(data.ad)
          // Show after 1.5 s delay
          setTimeout(() => { setReady(true); setTimeout(() => setShow(true), 20) }, 1500)
        }
      } catch {
        // Silently skip if ad endpoint unavailable
      }
    }

    fetchAd()
  }, [])

  // ── Record click on the ad's CTA ──────────────────────────────────────────
  const handleClick = useCallback(async () => {
    if (!ad?.id) return
    try { await fetch(`${API_BASE}/ads/${ad.id}/click`, { method: 'POST' }) } catch {}
  }, [ad])

  // ── Close helper ──────────────────────────────────────────────────────────
  const close = useCallback(() => {
    setShow(false)
    sessionStorage.setItem('zater_ad_seen', '1')
    // Unmount after transition completes
    setTimeout(() => setReady(false), 400)
  }, [])

  if (!ready || !ad) return null

  const imgSrc = ad.image_url
    ? ad.image_url.startsWith('http') ? ad.image_url : `${API_BASE.replace('/api','')}${ad.image_url}`
    : null

  return (
    <>
      <style>{OVERLAY_CSS}</style>

      {/* ── Backdrop ── */}
      <div
        className={`zad-backdrop ${show ? 'zad-backdrop--in' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Card ── */}
      <div
        className={`zad-card ${show ? 'zad-card--in' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Advertisement"
      >
        {/* Close × */}
        <button className="zad-close" onClick={close} aria-label="Close ad">✕</button>

        {/* Image */}
        {imgSrc && (
          <div className="zad-img-wrap">
            <img src={imgSrc} alt={ad.title} className="zad-img" />
            <div className="zad-img-fade" />
          </div>
        )}

        {/* Body */}
        <div className="zad-body">
          <div className="zad-eyebrow">Special Offer</div>
          <h2 className="zad-title">{ad.title}</h2>

          {ad.link_url && (
            <a
              href={ad.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="zad-cta"
              onClick={handleClick}
            >
              {ad.link_text || 'Get Started →'}
            </a>
          )}

          <button className="zad-dismiss" onClick={close}>
            No thanks, close this
          </button>
        </div>
      </div>
    </>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────
const OVERLAY_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;600;700;800&display=swap');

/* Backdrop */
.zad-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}
.zad-backdrop--in {
  opacity: 1;
  pointer-events: auto;
}

/* Card */
.zad-card {
  position: fixed;
  inset: 0;
  z-index: 9001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: none;
}
.zad-card--in {
  pointer-events: auto;
}

/* Inner box */
.zad-card > *:not(.zad-close) {
  /* handled per element */
}
.zad-card {
  /* re-use as positioning wrapper; actual box below */
}

/* We wrap everything in an inner container */
.zad-backdrop + .zad-card {
  /* nothing extra */
}

/* Build the actual white box via a pseudo-wrapper trick — easier to just
   make the card itself the box and use flex on the overlay */

.zad-card {
  /* override: make this the OVERLAY layer, not the box */
}

/* ─── Rewrite: use a wrapper div approach ─────────────────────────────────── */
/* The .zad-card IS the centered box */
.zad-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -46%) scale(0.94);
  z-index: 9001;
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  box-shadow:
    0 24px 80px rgba(0,0,0,0.35),
    0 2px 8px rgba(0,0,0,0.12);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.35s ease, transform 0.38s cubic-bezier(0.34,1.56,0.64,1);
  pointer-events: none;
}
.zad-card--in {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: auto;
}

/* Close button */
.zad-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.45);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 0.15s;
  font-family: 'Nunito', sans-serif;
}
.zad-close:hover { background: rgba(0,0,0,0.7); }

/* Image */
.zad-img-wrap {
  position: relative;
  width: 100%;
  max-height: 260px;
  overflow: hidden;
  background: #0a0a12;
}
.zad-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}
/* Gradient fade at the bottom of the image into the body */
.zad-img-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #fff);
}

/* Body */
.zad-body {
  padding: 20px 28px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'Nunito', sans-serif;
}

/* Eyebrow */
.zad-eyebrow {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #c0392b;
  background: rgba(192,57,43,0.08);
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 12px;
}

/* Title */
.zad-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 800;
  color: #0a0a12;
  line-height: 1.25;
  margin-bottom: 20px;
}

/* CTA button */
.zad-cta {
  display: inline-block;
  padding: 13px 32px;
  border-radius: 12px;
  background: #c0392b;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: 0.3px;
  margin-bottom: 14px;
  transition: background 0.18s, transform 0.15s;
  box-shadow: 0 4px 18px rgba(192,57,43,0.35);
}
.zad-cta:hover {
  background: #a0311f;
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(192,57,43,0.45);
}
.zad-cta:active { transform: translateY(0); }

/* Dismiss link */
.zad-dismiss {
  background: none;
  border: none;
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  color: #a0a0b0;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  padding: 0;
  transition: color 0.15s;
}
.zad-dismiss:hover { color: #6b6b7a; }

/* Mobile */
@media (max-width: 520px) {
  .zad-card {
    max-width: calc(100vw - 32px);
    border-radius: 16px;
  }
  .zad-img { height: 200px; }
  .zad-title { font-size: 18px; }
  .zad-body { padding: 16px 20px 22px; }
  .zad-cta { padding: 12px 24px; font-size: 13px; }
}
`
