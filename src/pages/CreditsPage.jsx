import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

const CREDITS_PER_PACK       = 100
const PRICE_PER_PACK         = 99
const CREDITS_PER_GENERATION = 100
const CREDITS_WEBSITE = 100
const CREDITS_APP     = 200

const PACKS = [
  { key: 'pack100', credits: 100, price: 99  },
  { key: 'pack200', credits: 200, price: 179 },
]

export default function CreditsPage() {
  const navigate          = useNavigate()
  const { user, setUser } = useAuth()

  const [credits,  setCredits]  = useState(user?.credits  ?? 0)
  const [hasPaid,  setHasPaid]  = useState(user?.has_paid ?? false)
  const [history,  setHistory]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [buyingU,  setBuyingU]  = useState(false)   // unlock payment in progress
  const [buyingC,  setBuyingC]  = useState(false)   // credit purchase in progress
  const [success,  setSuccess]  = useState('')
  const [error,    setError]    = useState('')
  const [selectedPack, setSelectedPack] = useState('pack100')

  const fetchCredits = useCallback(async () => {
    try {
      const d = await api.get('/credits')
      setCredits(d.credits)
      setHasPaid(!!d.has_paid)
      setHistory(d.history || [])
    } catch {
      setError('Failed to load credits.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCredits() }, [fetchCredits])

  // ── PhonePe: create order, then redirect the whole page to PhonePe's pay page.
  // No modal, no client-side signature — verification happens on the callback page.
  const startPhonePePayment = async ({ orderEndpoint, orderBody, setbuying }) => {
    setError(''); setSuccess(''); setbuying(true)
    try {
      const order = await api.post(orderEndpoint, orderBody)
      if (!order?.redirectUrl) throw new Error('No redirect URL returned from server.')
      // Stash which txn we're waiting on so the callback page (and this page, on return) can reconcile
      sessionStorage.setItem('zws_pending_txn', order.merchantTransactionId)
      window.location.href = order.redirectUrl
    } catch (err) {
      setError(err.message || 'Failed to start payment.')
      setbuying(false)
    }
  }

  // ── Flow 1: Unlock download & hosting ─────────────────────
  const handleUnlock = () => startPhonePePayment({
    orderEndpoint: '/credits/unlock/order',
    setbuying:     setBuyingU,
  })

  // ── Flow 2: Buy credits (requires unlock first) ────────────
  const handleBuyCredits = (planKey = selectedPack) => {
    const pack = PACKS.find(p => p.key === planKey) || PACKS[0]
    startPhonePePayment({
      orderEndpoint: '/credits/purchase/order',
      orderBody:     { plan: pack.key },
      setbuying:     setBuyingC,
    })
  }

  // ── If we land back on /credits with a pending txn still in sessionStorage
  // (e.g. user navigated here directly instead of via /payment/callback), reconcile it.
  useEffect(() => {
    const pendingTxn = sessionStorage.getItem('zws_pending_txn')
    if (!pendingTxn) return
    api.get(`/credits/status/${pendingTxn}`)
      .then(result => {
        sessionStorage.removeItem('zws_pending_txn')
        if (result.status === 'paid') {
          if (result.has_paid !== undefined) setHasPaid(result.has_paid)
          if (result.newBalance !== undefined) setCredits(result.newBalance)
          if (result.creditsAdded) setSuccess(`✅ ${result.creditsAdded} credits added! New balance: ${result.newBalance}`)
          else setSuccess('🔓 Download & Hosting unlocked forever!')
          if (setUser) setUser(u => ({ ...u, has_paid: result.has_paid ?? u.has_paid, credits: result.newBalance ?? u.credits }))
          fetchCredits()
        } else if (result.status === 'failed') {
          setError(result.message || 'Payment was not completed.')
        }
      })
      .catch(() => sessionStorage.removeItem('zws_pending_txn'))
  }, [])

  const creditColor = credits >= CREDITS_PER_GENERATION ? '#15803d' : credits > 0 ? '#d97706' : '#dc2626'
  const creditBg    = credits >= CREDITS_PER_GENERATION ? 'rgba(34,197,94,0.08)' : credits > 0 ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)'

  return (
    <>
      <style>{CSS}</style>
      <div className="cp-root">

        {/* NAV */}
        <nav className="cp-nav">
          <button className="cp-back" onClick={() => navigate('/')}>← Back to Home</button>
          <div className="cp-nav-title">My Credits</div>
          <div />
        </nav>

        <div className="cp-content">

          {/* Alerts */}
          {success && <div className="cp-alert cp-alert-success">{success}</div>}
          {error   && <div className="cp-alert cp-alert-error">{error}</div>}

          {/* Balance Card */}
         <div className="cp-balance-card" style={{ borderColor: creditColor, background: creditBg }}>
  <div className="cp-balance-icon">⚡</div>
  <div className="cp-balance-num" style={{ color: creditColor }}>
    {loading ? '—' : credits}
  </div>
  <div className="cp-balance-label">AI Generation Credits</div>
  <div className="cp-balance-note">
    {credits >= 200
      ? 'Ready to generate a website or app'
      : credits >= 100
      ? `⚠️ ${credits} credits left — enough for a website (100), not an app (200)`
      : credits > 0
      ? `⚠️ Only ${credits} credits left — need at least 100 to generate`
      : '❌ No credits — buy more to generate a website or app'}
  </div>

  <div className="cp-pack-picker">
    {PACKS.map(p => (
      <button
        key={p.key}
        className={`cp-pack-option ${selectedPack === p.key ? 'active' : ''}`}
        onClick={() => setSelectedPack(p.key)}
      >
        <span className="cp-pack-credits">{p.credits} Credits</span>
        <span className="cp-pack-price">₹{p.price}</span>
      </button>
    ))}
  </div>

  <button className="cp-buy-btn" onClick={() => handleBuyCredits()} disabled={buyingC}>
    {buyingC
      ? <><Spin /> Redirecting to PhonePe...</>
      : <>💳 Buy {PACKS.find(p => p.key === selectedPack)?.credits} Credits — ₹{PACKS.find(p => p.key === selectedPack)?.price}</>}
  </button>
</div>

          {/* Download & Hosting Lock Status */}
          <div className="cp-unlock-card" style={{
            borderColor: hasPaid ? '#15803d' : '#d97706',
            background:  hasPaid ? 'rgba(34,197,94,0.06)' : 'rgba(245,158,11,0.06)',
          }}>
            <div className="cp-unlock-icon">{hasPaid ? '🔓' : '🔒'}</div>
            <div className="cp-unlock-body">
              <div className="cp-unlock-title" style={{ color: hasPaid ? '#15803d' : '#b45309' }}>
                {hasPaid ? 'Download & Hosting — Unlocked Forever' : 'Download & Hosting — Locked'}
              </div>
              <div className="cp-unlock-desc">
                {hasPaid
                  ? 'Your ₹99 unlock payment is complete. Downloads and hosting are permanently free on all your projects.'
                  : 'Pay ₹99 once to permanently unlock downloads and hosting. This is separate from credits.'}
              </div>
            </div>
            {!hasPaid && (
              <button className="cp-unlock-btn" onClick={handleUnlock} disabled={buyingU}>
                {buyingU ? <><Spin /> Redirecting to PhonePe...</> : '🔓 Pay ₹99 to Unlock'}
              </button>
            )}
          </div>

          {/* How Credits Work */}
          <div className="cp-how-card">
            <div className="cp-how-title">How It Works</div>

            <div className="cp-journey">
              <div className="cp-journey-step">
                <div className="cp-journey-num done">1</div>
                <div className="cp-journey-content">
                  <div className="cp-journey-label">Sign Up</div>
                  <div className="cp-journey-desc">Get <strong>100 free credits</strong> automatically. Use them to generate your first website (100 credits) — app generation needs 200.</div>
                </div>
              </div>
              <div className="cp-journey-line" />
              <div className="cp-journey-step">
  <div className="cp-journey-num">2</div>
  <div className="cp-journey-content">
    <div className="cp-journey-label">Generate Website or App</div>
    <div className="cp-journey-desc">Website costs <strong>100 credits</strong>, app costs <strong>200 credits</strong>.</div>
  </div>
</div>
              <div className="cp-journey-line" />
              <div className="cp-journey-step">
                <div className={`cp-journey-num ${hasPaid ? 'done' : ''}`}>3</div>
                <div className="cp-journey-content">
                  <div className="cp-journey-label">Pay ₹99 — Unlock Download & Hosting</div>
                  <div className="cp-journey-desc">
                    This <strong>does not add credits</strong>. It permanently unlocks download &amp; hosting for all your projects forever.
                  </div>
                </div>
              </div>
              <div className="cp-journey-line" />
              <div className="cp-journey-step">
                <div className="cp-journey-num">4</div>
                <div className="cp-journey-content">
                  <div className="cp-journey-label">Pay ₹99 — Buy 100 Credits</div>
                  <div className="cp-journey-desc">Buy credits anytime to generate more websites. Download &amp; hosting remain <strong>free forever</strong>.</div>
                </div>
              </div>
            </div>

            <div className="cp-how-grid">
              <div className="cp-how-item">
                <div className="cp-how-icon" style={{ background: 'rgba(34,197,94,0.1)', color: '#15803d' }}>🎁</div>
                <div className="cp-how-name">Signup Bonus</div>
                <div className="cp-how-val" style={{ color: '#15803d' }}>+100 FREE</div>
                <div className="cp-how-desc">One-time free credits for every new account</div>
              </div>
              <div className="cp-how-item">
  <div className="cp-how-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#dc2626' }}>🌐</div>
  <div className="cp-how-name">Website</div>
  <div className="cp-how-val" style={{ color: '#dc2626' }}>−100 credits</div>
  <div className="cp-how-desc">Each website generated costs 100 credits</div>
</div>
<div className="cp-how-item">
  <div className="cp-how-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#dc2626' }}>📱</div>
  <div className="cp-how-name">App</div>
  <div className="cp-how-val" style={{ color: '#dc2626' }}>−200 credits</div>
  <div className="cp-how-desc">Each full-stack app generated costs 200 credits</div>
</div>
              <div className="cp-how-item">
                <div className="cp-how-icon" style={{ background: 'rgba(245,158,11,0.1)', color: '#d97706' }}>🔓</div>
                <div className="cp-how-name">Unlock Payment</div>
                <div className="cp-how-val" style={{ color: '#d97706' }}>₹99 once</div>
                <div className="cp-how-desc">Unlocks download &amp; hosting permanently. No credits added.</div>
              </div>
              <div className="cp-how-item">
                <div className="cp-how-icon" style={{ background: 'rgba(192,57,43,0.1)', color: '#c0392b' }}>💳</div>
                <div className="cp-how-name">Buy Credits</div>
                <div className="cp-how-val" style={{ color: '#c0392b' }}>₹99 = 100</div>
                <div className="cp-how-desc">Top up credits anytime after unlocking. Download &amp; host stays free.</div>
              </div>
            </div>
          </div>

          {/* Buy Credits Card — only shown after unlock */}
          {hasPaid && (
            <div className="cp-buy-card">
              <div className="cp-buy-left">
                <div className="cp-buy-badge">🔄 Top Up Credits</div>
                <div className="cp-buy-title">Buy More Credits</div>
                <div className="cp-buy-desc">
                  Get 100 AI generation credits instantly. Downloads and hosting are already free forever on your account.
                </div>
                <div className="cp-buy-perks">
                  <span>✅ 100 Credits instantly</span>
                  <span>✅ Generate 1 website</span>
                  <span>✅ Download stays FREE</span>
                  <span>✅ Hosting stays FREE</span>
                  <span>✅ No expiry</span>
                  <span>✅ UPI / Cards / Net Banking</span>
                </div>
              </div>
              <div className="cp-buy-right">
                <div className="cp-buy-price">
                  <span className="cp-buy-price-num">₹{PRICE_PER_PACK}</span>
                  <span className="cp-buy-price-label">one-time</span>
                </div>
                <div className="cp-buy-credits-label">= {CREDITS_PER_PACK} Credits</div>
                <button className="cp-buy-btn" onClick={() => handleBuyCredits()} disabled={buyingC}>
                  {buyingC
                    ? <><Spin /> Redirecting to PhonePe...</>
                    : <>💳 Buy {CREDITS_PER_PACK} Credits — ₹{PRICE_PER_PACK}</>}
                </button>
                <div className="cp-buy-note">🔒 Secured by PhonePe · UPI · Cards · Net Banking</div>
              </div>
            </div>
          )}

          {/* Transaction History */}
          {history.length > 0 && (
            <div className="cp-history-card">
              <div className="cp-history-title">Transaction History</div>
              <div className="cp-history-list">
                {history.map((tx, i) => (
                  <div key={i} className="cp-tx-row">
                    <div className="cp-tx-icon" style={{
                      background: tx.type === 'earn' || tx.type === 'unlock'
                        ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      color: tx.type === 'earn' || tx.type === 'unlock'
                        ? '#15803d' : '#dc2626',
                    }}>
                      {tx.type === 'earn' ? '↑' : tx.type === 'unlock' ? '🔓' : '↓'}
                    </div>
                    <div className="cp-tx-info">
                      <div className="cp-tx-reason">{REASON_LABELS[tx.reason] || tx.reason}</div>
                      <div className="cp-tx-date">
                        {new Date(tx.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <div className="cp-tx-amount" style={{
                      color: tx.type === 'earn' ? '#15803d'
                           : tx.type === 'unlock' ? '#d97706'
                           : '#dc2626',
                    }}>
                      {tx.type === 'earn' ? `+${tx.amount}` : tx.type === 'unlock' ? '🔓 Unlocked' : `−${tx.amount}`}
                    </div>
                    <div className="cp-tx-balance">{tx.balance_after} left</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

const REASON_LABELS = {
  signup_bonus:    '🎁 Signup Bonus',
  ai_generation:   '🤖 AI Generation',
  credit_purchase: '💳 Credit Purchase',
  unlock_payment:  '🔓 Download & Hosting Unlocked',
}

const Spin = () => (
  <span style={{
    width: 14, height: 14,
    border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
    borderRadius: '50%', display: 'inline-block',
    animation: 'spin 0.8s linear infinite',
  }} />
)



const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

.cp-root{min-height:100vh;background:#f8f8fc;font-family:'Nunito',sans-serif;color:#0a0a12;}
.cp-nav{position:sticky;top:0;z-index:100;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;background:rgba(255,255,255,0.97);backdrop-filter:blur(14px);border-bottom:1px solid #e2e2ea;}
.cp-back{padding:7px 13px;border-radius:8px;background:transparent;border:1.5px solid #e2e2ea;font-size:12px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.cp-back:hover{border-color:#c0392b;color:#c0392b;}
.cp-nav-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}

.cp-content{max-width:800px;margin:0 auto;padding:32px 20px;display:flex;flex-direction:column;gap:20px;}

/* Alerts */
.cp-alert{padding:12px 16px;border-radius:12px;font-size:13px;font-weight:700;animation:fadeUp .3s ease;}
.cp-alert-success{background:rgba(34,197,94,0.12);border:1.5px solid rgba(34,197,94,0.3);color:#15803d;}
.cp-alert-error{background:rgba(239,68,68,0.12);border:1.5px solid rgba(239,68,68,0.3);color:#dc2626;}

/* Balance Card */
.cp-balance-card{border:2px solid;border-radius:20px;padding:32px;text-align:center;animation:fadeUp .4s ease;}
.cp-balance-icon{font-size:44px;margin-bottom:12px;}
.cp-balance-num{font-family:'Playfair Display',serif;font-size:72px;font-weight:900;line-height:1;margin-bottom:8px;}
.cp-balance-label{font-size:14px;font-weight:700;color:#5a5a70;margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;}
.cp-balance-note{font-size:13px;font-weight:600;color:#72727f;background:rgba(255,255,255,0.7);padding:8px 16px;border-radius:100px;display:inline-block;}

/* Unlock card */
.cp-unlock-card{border:2px solid;border-radius:16px;padding:18px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;animation:fadeUp .4s .05s ease both;}
.cp-unlock-icon{font-size:28px;flex-shrink:0;}
.cp-unlock-body{flex:1;min-width:180px;}
.cp-unlock-title{font-size:14px;font-weight:800;margin-bottom:4px;}
.cp-unlock-desc{font-size:12px;font-weight:500;color:#72727f;line-height:1.5;}
.cp-unlock-btn{padding:10px 18px;border-radius:10px;background:#d97706;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;gap:6px;white-space:nowrap;transition:all .18s;}
.cp-unlock-btn:hover:not(:disabled){opacity:.88;transform:translateY(-1px);}
.cp-unlock-btn:disabled{background:#9a9aaa;cursor:not-allowed;}


.cp-pack-picker{display:flex;gap:10px;margin:14px 0;justify-content:center;flex-wrap:wrap;}
.cp-pack-option{padding:10px 18px;border-radius:12px;border:1.5px solid #e2e2ea;background:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;transition:all .15s;font-family:'Nunito',sans-serif;}
.cp-pack-option.active{border-color:#c0392b;background:rgba(192,57,43,0.06);}
.cp-pack-credits{font-size:13px;font-weight:800;color:#0a0a12;}
.cp-pack-price{font-size:12px;font-weight:700;color:#c0392b;}


/* How it works */
.cp-how-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:18px;padding:24px;animation:fadeUp .4s .1s ease both;}
.cp-how-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;margin-bottom:20px;color:#0a0a12;}

/* Journey steps */
.cp-journey{display:flex;flex-direction:column;margin-bottom:24px;}
.cp-journey-step{display:flex;gap:14px;align-items:flex-start;}
.cp-journey-num{width:28px;height:28px;border-radius:50%;background:#e2e2ea;color:#72727f;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;}
.cp-journey-num.done{background:#c0392b;color:#fff;}
.cp-journey-content{padding-bottom:4px;}
.cp-journey-label{font-size:13px;font-weight:800;color:#0a0a12;margin-bottom:3px;}
.cp-journey-desc{font-size:12px;font-weight:500;color:#72727f;line-height:1.5;}
.cp-journey-line{width:2px;height:16px;background:#e2e2ea;margin-left:13px;}

/* Grid */
.cp-how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.cp-how-item{text-align:center;padding:14px 10px;background:#f8f8fc;border-radius:12px;}
.cp-how-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;margin:0 auto 8px;}
.cp-how-name{font-size:11px;font-weight:800;color:#0a0a12;margin-bottom:3px;text-transform:uppercase;letter-spacing:.4px;}
.cp-how-val{font-family:'Playfair Display',serif;font-size:15px;font-weight:800;margin-bottom:5px;}
.cp-how-desc{font-size:10px;color:#72727f;font-weight:500;line-height:1.4;}

/* Buy Credits */
.cp-buy-card{background:linear-gradient(135deg,#0a0a12,#1a1a2e);border-radius:20px;padding:28px;display:flex;gap:28px;align-items:flex-start;flex-wrap:wrap;animation:fadeUp .4s .2s ease both;}
.cp-buy-left{flex:1;min-width:240px;}
.cp-buy-badge{display:inline-block;background:#c0392b;color:#fff;font-size:10px;font-weight:800;padding:3px 10px;border-radius:100px;margin-bottom:10px;}
.cp-buy-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:8px;}
.cp-buy-desc{font-size:13px;color:#9090b0;font-weight:500;line-height:1.6;margin-bottom:14px;}
.cp-buy-perks{display:flex;flex-wrap:wrap;gap:6px;}
.cp-buy-perks span{font-size:11px;font-weight:600;color:#8080c0;background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:6px;}
.cp-buy-right{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:10px;min-width:220px;}
.cp-buy-price{display:flex;align-items:baseline;gap:6px;}
.cp-buy-price-num{font-family:'Playfair Display',serif;font-size:48px;font-weight:900;color:#fff;}
.cp-buy-price-label{font-size:13px;color:#5050a0;font-weight:600;}
.cp-buy-credits-label{font-size:13px;font-weight:700;color:#7070c0;}
.cp-buy-btn{width:100%;padding:14px;border-radius:12px;background:#c0392b;border:none;color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 16px rgba(192,57,43,0.4);transition:all .18s;}
.cp-buy-btn:hover:not(:disabled){opacity:.88;transform:translateY(-1px);}
.cp-buy-btn:disabled{background:#5a5a6a;cursor:not-allowed;box-shadow:none;transform:none;}
.cp-buy-note{font-size:10px;font-weight:500;color:#3a3a5a;text-align:center;}

/* History */
.cp-history-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:18px;padding:24px;animation:fadeUp .4s .3s ease both;}
.cp-history-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;margin-bottom:16px;color:#0a0a12;}
.cp-history-list{display:flex;flex-direction:column;gap:8px;}
.cp-tx-row{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;background:#f8f8fc;}
.cp-tx-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0;}
.cp-tx-info{flex:1;}
.cp-tx-reason{font-size:13px;font-weight:700;color:#0a0a12;}
.cp-tx-date{font-size:11px;color:#a0a0b0;font-weight:500;margin-top:2px;}
.cp-tx-amount{font-size:13px;font-weight:800;flex-shrink:0;}
.cp-tx-balance{font-size:11px;color:#a0a0b0;font-weight:600;flex-shrink:0;min-width:60px;text-align:right;}

@media(max-width:680px){
  .cp-how-grid{grid-template-columns:repeat(2,1fr);}
  .cp-buy-card{flex-direction:column;}
  .cp-buy-right{width:100%;}
  .cp-unlock-card{flex-direction:column;align-items:flex-start;}
  .cp-unlock-btn{width:100%;justify-content:center;}
}
@media(max-width:400px){
  .cp-how-grid{grid-template-columns:1fr;}
  .cp-balance-num{font-size:56px;}
}
`
