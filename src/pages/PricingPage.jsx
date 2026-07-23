import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Footer from '../components/Footer'
import zaterLogo from '../assets/zater-logo.jpeg'

const loadRazorpay = () => new Promise(resolve => {
  if (window.Razorpay) return resolve(true)
  const s = document.createElement('script')
  s.src = 'https://checkout.razorpay.com/v1/checkout.js'
  s.async = true; s.onload = () => resolve(true); s.onerror = () => resolve(false)
  document.head.appendChild(s)
})

export default function PricingPage() {
  const navigate              = useNavigate()
  const { user }              = useAuth()
  const [sub,     setSub]     = useState(null)
  const [paying,  setPaying]  = useState('')
  const [success, setSuccess] = useState('')
  const [error,   setError]   = useState('')

  useEffect(() => {
    api.get('/subscriptions/status').then(setSub).catch(() => {})
  }, [])

  const handlePay = async (planType) => {
    setError(''); setSuccess(''); setPaying(planType)
    const loaded = await loadRazorpay()
    if (!loaded) { setError('Could not load Razorpay.'); setPaying(''); return }
    const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID
    if (!rzpKey || rzpKey.includes('your_key')) { setError('Add VITE_RAZORPAY_KEY_ID to your .env'); setPaying(''); return }

    let order
    try { order = await api.post('/subscriptions/order', { planType }) }
    catch (err) { setError(err.message); setPaying(''); return }

    const DESC = {
      basic:  '1 Website/Month + Hosting — ₹499',
      growth: '10 Websites/Month + Hosting — ₹1,999',
      yearly: '10 Websites/Month + Hosting — ₹11,999/year',
    }

    new window.Razorpay({
      key: order.keyId || rzpKey,
      amount: order.amount,
      currency: 'INR',
      name: 'Zater Web Studio',
      description: DESC[planType],
      order_id: order.orderId,
      prefill: { name: user?.name || '', email: user?.email || '' },
      theme: { color: '#c0392b' },
      handler: async (resp) => {
        setPaying('verifying')
        try {
          const r = await api.post('/subscriptions/verify', {
            razorpay_order_id:   resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature:  resp.razorpay_signature,
            planType,
          })
          setSuccess(r.message)
          const s = await api.get('/subscriptions/status')
          setSub(s)
        } catch (err) { setError(err.message) }
        finally { setPaying('') }
      },
      modal: { ondismiss: () => setPaying('') },
    }).open()
  }

  const isBusy   = !!paying
  const curPlan  = sub?.plan || 'free'

  const PlanBtn = ({ planType, label }) => {
    const isCurrent = curPlan === planType && sub?.planActive
    if (isCurrent) return <div className="pg-current">✅ Your Current Plan</div>
    return (
      <button className="pg-pay-btn" onClick={() => handlePay(planType)} disabled={isBusy}>
        {paying === planType   ? <><Spin/> Opening...</>  :
         paying === 'verifying'? <><Spin/> Verifying...</> : label}
      </button>
    )
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="pg-root">
        <div className="pg-dots"/>

        {/* NAV */}
        <nav className="pg-nav">
          <div className="pg-logo" onClick={() => navigate('/')}>
            <img src={zaterLogo} alt="Zater" className="pg-logo-img"/>
            <span className="pg-logo-txt">Zater Web Studio</span>
          </div>
          <div style={{display:'flex',gap:10}}>
            <button className="pg-navbtn" onClick={() => navigate('/')}>← Home</button>
            <button className="pg-navbtn" onClick={() => navigate('/projects')}>My Projects</button>
          </div>
        </nav>

        <div className="pg-wrap">

          {/* HEADER */}
          <div className="pg-head">
            <div className="pg-badge">💳 Simple Pricing</div>
            <h1 className="pg-title">Build your website.<br/>Host it on Zater.</h1>
            <p className="pg-sub">Generate AI websites instantly. Host at <strong>yourname.zater.in</strong></p>
          </div>

          {/* STATUS BAR */}
          {sub && (
            <div className={`pg-status ${sub.planActive ? 'pg-status-ok' : 'pg-status-warn'}`}>
              {sub.planActive
                ? <>✅ <b>{sub.plan.charAt(0).toUpperCase()+sub.plan.slice(1)} Plan Active</b> &nbsp;·&nbsp; {sub.usedThisMonth}/{sub.limit} sites used this month &nbsp;·&nbsp; Renews {new Date(sub.expiresAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</>
                : <>🆓 Free Plan — {sub.usedThisMonth}/{sub.limit} site used this month. Subscribe for hosting & more sites.</>
              }
            </div>
          )}

          {success && <div className="pg-success">🎉 {success}</div>}
          {error   && <div className="pg-error">{error}<button className="pg-err-x" onClick={()=>setError('')}>✕</button></div>}

          {/* PLAN CARDS */}
          <div className="pg-cards">

            {/* FREE */}
            <div className="pg-card">
              <div className="pg-card-head">
                <div className="pg-card-icon">🆓</div>
                <div className="pg-plan-name">Free</div>
                <div className="pg-price-row">
                  <span className="pg-price">₹0</span>
                  <span className="pg-per">/month</span>
                </div>
                <div className="pg-tagline">Try Zater with no commitment</div>
              </div>
              <ul className="pg-feats">
                <li>✅ 1 website per month</li>
                <li>✅ Full AI generation</li>
                <li>✅ Live preview instantly</li>
                <li>✅ Download HTML free</li>
                <li className="feat-no">❌ Hosting not included</li>
                <li className="feat-add">➕ Add hosting: ₹499/site</li>
              </ul>
              {curPlan === 'free'
                ? <div className="pg-current">✅ Your Current Plan</div>
                : <button className="pg-pay-btn pg-btn-outline" onClick={() => navigate('/')}>Start Free →</button>
              }
              <p className="pg-note">No credit card needed</p>
            </div>

            {/* BASIC ₹499/mo */}
            <div className={`pg-card ${curPlan==='basic'&&sub?.planActive?'pg-card-active':''}`}>
              <div className="pg-card-head">
                <div className="pg-card-icon">🚀</div>
                <div className="pg-plan-name">Basic</div>
                <div className="pg-price-row">
                  <span className="pg-price">₹499</span>
                  <span className="pg-per">/month</span>
                </div>
                <div className="pg-tagline">1 website/month with hosting</div>
              </div>
              <ul className="pg-feats">
                <li>✅ 1 website per month</li>
                <li>✅ <b>Hosting included</b></li>
                <li>✅ yourname.zater.in domain</li>
                <li>✅ SSL certificate</li>
                <li>✅ Download HTML free</li>
                <li>✅ Cancel anytime</li>
              </ul>
              <PlanBtn planType="basic" label="Subscribe — ₹499/month"/>
              <p className="pg-note">🔒 Razorpay · UPI · Cards</p>
            </div>

            {/* GROWTH ₹1,999/mo — FEATURED */}
            <div className={`pg-card pg-card-featured ${curPlan==='growth'&&sub?.planActive?'pg-card-active':''}`}>
              <div className="pg-popular">⭐ Most Popular</div>
              <div className="pg-card-head">
                <div className="pg-card-icon">🏗️</div>
                <div className="pg-plan-name">Growth</div>
                <div className="pg-price-row">
                  <span className="pg-price">₹1,999</span>
                  <span className="pg-per">/month</span>
                </div>
                <div className="pg-tagline">10 websites/month with hosting</div>
              </div>
              <ul className="pg-feats">
                <li>✅ <b>10 websites per month</b></li>
                <li>✅ <b>All hosting included</b></li>
                <li>✅ yourname.zater.in domain</li>
                <li>✅ SSL certificate</li>
                <li>✅ Download HTML free</li>
                <li>✅ Cancel anytime</li>
              </ul>
              <PlanBtn planType="growth" label="Subscribe — ₹1,999/month"/>
              <p className="pg-note">🔒 Razorpay · UPI · Cards</p>
            </div>

            {/* YEARLY ₹11,999 */}
            <div className={`pg-card ${curPlan==='yearly'&&sub?.planActive?'pg-card-active':''}`}>
              <div className="pg-save-tag">Save 50%</div>
              <div className="pg-card-head">
                <div className="pg-card-icon">🏆</div>
                <div className="pg-plan-name">Yearly</div>
                <div className="pg-price-row">
                  <span className="pg-price">₹11,999</span>
                  <span className="pg-per">/year</span>
                </div>
                <div className="pg-save-note">Just ₹1,000/month — save ₹11,989</div>
                <div className="pg-tagline">10 websites/month all year</div>
              </div>
              <ul className="pg-feats">
                <li>✅ <b>10 websites per month</b></li>
                <li>✅ <b>All hosting included</b></li>
                <li>✅ yourname.zater.in domain</li>
                <li>✅ SSL certificate</li>
                <li>✅ Download HTML free</li>
                <li>✅ Priority support</li>
              </ul>
              <PlanBtn planType="yearly" label="Subscribe — ₹11,999/year"/>
              <p className="pg-note">🔒 Razorpay · UPI · Cards</p>
            </div>

          </div>

          {/* HOW IT WORKS */}
          <div className="pg-how">
            <h2 className="pg-sec-title">How it works</h2>
            <div className="pg-steps">
              {[
                { n:'1', icon:'✏️', title:'Describe your site',    desc:'Tell Zater what kind of website you need — restaurant, portfolio, SaaS, anything.' },
                { n:'2', icon:'⚡', title:'AI generates it',        desc:'Claude AI builds a complete professional website in 15–30 seconds.' },
                { n:'3', icon:'👁️', title:'Preview free',           desc:'See your site live instantly in your browser. No payment needed to preview.' },
                { n:'4', icon:'🌐', title:'Host at yourname.zater.in', desc:'Pay ₹499 (or subscribe) to go live with a custom Zater domain and SSL.' },
              ].map(s => (
                <div className="pg-step" key={s.n}>
                  <div className="pg-step-n">{s.n}</div>
                  <div className="pg-step-icon">{s.icon}</div>
                  <div className="pg-step-title">{s.title}</div>
                  <div className="pg-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPARE TABLE */}
          <div className="pg-compare">
            <h2 className="pg-sec-title">Plan Comparison</h2>
            <div className="pg-table">
              <div className="pg-thead">
                <div className="pg-th pg-th-f">Feature</div>
                <div className="pg-th">Free</div>
                <div className="pg-th">Basic<br/><span style={{fontSize:10,fontWeight:600,color:'#c0392b'}}>₹499/mo</span></div>
                <div className="pg-th pg-th-hi">Growth<br/><span style={{fontSize:10,fontWeight:600,color:'#c0392b'}}>₹1,999/mo</span></div>
                <div className="pg-th">Yearly<br/><span style={{fontSize:10,fontWeight:600,color:'#c0392b'}}>₹11,999/yr</span></div>
              </div>
              {[
                ['Websites/month',     '1',      '1',   '10',  '10'],
                ['Hosting included',   '❌',     '✅',   '✅',  '✅'],
                ['yourname.zater.in',  '+ ₹499', '✅',  '✅',  '✅'],
                ['SSL certificate',    '+ ₹499', '✅',  '✅',  '✅'],
                ['Download HTML',      '✅',     '✅',   '✅',  '✅'],
                ['Priority support',   '❌',     '❌',  '❌',  '✅'],
              ].map(([feat,...vals], i) => (
                <div className="pg-tr" key={i}>
                  <div className="pg-td pg-td-f">{feat}</div>
                  {vals.map((v, j) => (
                    <div key={j} className={`pg-td ${j===2?'pg-td-hi':''}`}>{v}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="pg-faq">
            <h2 className="pg-sec-title">FAQ</h2>
            <div className="pg-faq-grid">
              {[
                ['What is the free plan?',
                 'Every account gets 1 free website generation per month. You can preview and download it for free. To host it at yourname.zater.in, pay ₹499 separately.'],
                ['What does hosting mean?',
                 'Hosting means your website goes live on the internet at a domain like restaurant.zater.in with SSL. Paid plans (₹499+) include hosting in the price.'],
                ['Can I see the website before paying?',
                 'Yes! Every generated website has a free live preview. You only pay if you want to host it or generate more sites.'],
                ['What is the domain format?',
                 'Your site gets a subdomain like my-restaurant.zater.in or john-portfolio.zater.in based on your website name.'],
                ['Can I cancel anytime?',
                 'Yes. Cancel anytime from your account. You keep access until the end of your billing period.'],
                ['What payment methods are accepted?',
                 'All UPI apps (GPay, PhonePe, Paytm), Credit/Debit cards (Visa, Mastercard, RuPay), and Net Banking via Razorpay.'],
              ].map(([q,a],i) => <FaqItem key={i} q={q} a={a}/>)}
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </>
  )
}

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`pg-faq-item ${open?'pg-faq-open':''}`} onClick={() => setOpen(o=>!o)}>
      <div className="pg-faq-q">{q}<span className="pg-faq-arr">{open?'↑':'↓'}</span></div>
      {open && <p className="pg-faq-a">{a}</p>}
    </div>
  )
}

const Spin = () => (
  <span style={{width:13,height:13,flexShrink:0,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin 0.8s linear infinite'}}/>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

.pg-root{background:#fff;font-family:'Nunito',sans-serif;min-height:100vh;color:#0a0a12;}
.pg-dots{position:fixed;inset:0;background-image:radial-gradient(#c8c8d6 1px,transparent 1px);background-size:26px 26px;opacity:0.4;pointer-events:none;z-index:0;}

.pg-nav{position:sticky;top:0;z-index:100;height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;background:rgba(255,255,255,0.96);backdrop-filter:blur(16px);border-bottom:1px solid #e2e2ea;}
.pg-logo{display:flex;align-items:center;gap:10px;cursor:pointer;}
.pg-logo-img{width:32px;height:32px;border-radius:8px;object-fit:cover;}
.pg-logo-txt{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;}
.pg-navbtn{padding:7px 14px;border-radius:8px;background:transparent;border:1.5px solid #e2e2ea;font-size:13px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.pg-navbtn:hover{border-color:#c0392b;color:#c0392b;}

.pg-wrap{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:60px 24px 80px;}

.pg-head{text-align:center;margin-bottom:44px;}
.pg-badge{display:inline-block;background:#fff;border:1.5px solid #e2e2ea;border-radius:100px;padding:6px 16px;font-size:12px;font-weight:800;color:#c0392b;margin-bottom:14px;box-shadow:0 2px 6px rgba(0,0,0,0.05);}
.pg-title{font-family:'Playfair Display',serif;font-size:clamp(30px,5vw,52px);font-weight:900;letter-spacing:-2px;color:#0a0a12;margin-bottom:10px;line-height:1.1;}
.pg-sub{font-size:15px;color:#72727f;font-weight:500;}

.pg-status{margin-bottom:24px;padding:13px 20px;border-radius:12px;font-size:13px;font-weight:600;text-align:center;}
.pg-status-ok{background:rgba(34,197,94,0.07);border:1.5px solid rgba(34,197,94,0.25);color:#15803d;}
.pg-status-warn{background:rgba(59,130,246,0.06);border:1.5px solid rgba(59,130,246,0.2);color:#1d4ed8;}
.pg-success{padding:14px 20px;border-radius:12px;background:rgba(34,197,94,0.08);border:1.5px solid rgba(34,197,94,0.25);font-size:14px;font-weight:700;color:#15803d;text-align:center;margin-bottom:22px;animation:fadeUp 0.3s ease;}
.pg-error{padding:13px 18px;border-radius:12px;background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);font-size:13px;font-weight:600;color:#dc2626;display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:22px;}
.pg-err-x{background:none;border:none;color:#dc2626;font-size:16px;font-weight:800;cursor:pointer;padding:0;}

.pg-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:70px;align-items:start;}
.pg-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:20px;padding:22px 18px;position:relative;transition:all .22s;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.pg-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,0.09);}
.pg-card-featured{border-color:#c0392b;box-shadow:0 4px 20px rgba(192,57,43,0.12);}
.pg-card-active{border-color:#22c55e;box-shadow:0 4px 20px rgba(34,197,94,0.12);}
.pg-popular{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#c0392b;color:#fff;font-size:11px;font-weight:800;padding:3px 14px;border-radius:100px;white-space:nowrap;}
.pg-save-tag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#22c55e;color:#fff;font-size:11px;font-weight:800;padding:3px 14px;border-radius:100px;white-space:nowrap;}

.pg-card-head{margin-bottom:16px;}
.pg-card-icon{font-size:28px;margin-bottom:8px;}
.pg-plan-name{font-size:11px;font-weight:800;color:#a0a0b0;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;}
.pg-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px;}
.pg-price{font-family:'Playfair Display',serif;font-size:30px;font-weight:900;color:#0a0a12;letter-spacing:-1px;}
.pg-per{font-size:12px;font-weight:600;color:#a0a0b0;}
.pg-save-note{font-size:11px;font-weight:800;color:#22c55e;margin-bottom:4px;}
.pg-tagline{font-size:12px;color:#72727f;font-weight:500;line-height:1.4;}

.pg-feats{list-style:none;display:flex;flex-direction:column;gap:7px;margin-bottom:18px;}
.pg-feats li{font-size:12px;font-weight:600;color:#3a3a4a;line-height:1.4;}
.feat-no{color:#c8c8d6!important;}
.feat-add{color:#5b4fff!important;}

.pg-pay-btn{width:100%;padding:11px;border-radius:10px;border:none;background:#c0392b;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:7px;margin-bottom:8px;transition:all .18s;box-shadow:0 3px 12px rgba(192,57,43,0.3);}
.pg-pay-btn:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
.pg-pay-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
.pg-btn-outline{background:#fff!important;color:#0a0a12!important;border:1.5px solid #e2e2ea!important;box-shadow:none!important;}
.pg-btn-outline:hover:not(:disabled){border-color:#0a0a12!important;}
.pg-current{padding:11px;border-radius:10px;background:rgba(34,197,94,0.08);border:1.5px solid rgba(34,197,94,0.25);font-size:12px;font-weight:800;color:#15803d;text-align:center;margin-bottom:8px;}
.pg-note{font-size:11px;color:#c0c0cc;font-weight:600;text-align:center;}

/* HOW IT WORKS */
.pg-how{margin-bottom:64px;}
.pg-sec-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:#0a0a12;text-align:center;margin-bottom:28px;letter-spacing:-0.5px;}
.pg-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.pg-step{background:#fafafa;border:1.5px solid #e8e8f0;border-radius:16px;padding:20px 16px;text-align:center;transition:all .18s;}
.pg-step:hover{border-color:#c0392b;background:#fff;}
.pg-step-n{width:26px;height:26px;border-radius:50%;background:#0a0a12;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;}
.pg-step-icon{font-size:26px;margin-bottom:8px;}
.pg-step-title{font-size:13px;font-weight:800;color:#0a0a12;margin-bottom:6px;}
.pg-step-desc{font-size:12px;color:#72727f;font-weight:500;line-height:1.55;}

/* TABLE */
.pg-compare{margin-bottom:60px;}
.pg-table{border:1.5px solid #e2e2ea;border-radius:16px;overflow:hidden;}
.pg-thead{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;background:#f8f8fc;border-bottom:1.5px solid #e2e2ea;}
.pg-th{padding:12px 14px;font-size:11px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.6px;text-align:center;}
.pg-th-f{text-align:left;color:#0a0a12;}
.pg-th-hi{color:#c0392b;}
.pg-tr{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;border-bottom:1px solid #f0f0f6;}
.pg-tr:last-child{border-bottom:none;}
.pg-tr:hover{background:#fafafa;}
.pg-td{padding:12px 14px;font-size:12px;font-weight:600;color:#3a3a4a;display:flex;align-items:center;justify-content:center;}
.pg-td-f{justify-content:flex-start;font-weight:700;color:#0a0a12;}
.pg-td-hi{color:#c0392b;font-weight:700;}

/* FAQ */
.pg-faq{margin-bottom:20px;}
.pg-faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.pg-faq-item{background:#fafafa;border:1.5px solid #e8e8f0;border-radius:12px;padding:16px 18px;cursor:pointer;transition:all .18s;}
.pg-faq-item:hover,.pg-faq-open{border-color:#c0392b;background:#fff;}
.pg-faq-q{font-size:13px;font-weight:800;color:#0a0a12;display:flex;justify-content:space-between;gap:12px;line-height:1.4;}
.pg-faq-arr{color:#c0392b;flex-shrink:0;}
.pg-faq-a{font-size:13px;color:#72727f;font-weight:500;line-height:1.65;margin-top:10px;padding-top:10px;border-top:1px solid #f0f0f0;}

@media(max-width:900px){.pg-cards{grid-template-columns:1fr 1fr;}.pg-steps{grid-template-columns:1fr 1fr;}}
@media(max-width:600px){.pg-cards{grid-template-columns:1fr;}.pg-steps{grid-template-columns:1fr;}.pg-faq-grid{grid-template-columns:1fr;}.pg-title{font-size:28px;letter-spacing:-1px;}.pg-thead,.pg-tr{grid-template-columns:1.5fr 0.8fr 0.8fr 0.8fr 0.8fr;}.pg-td,.pg-th{padding:8px 6px;font-size:10px;}}
`
