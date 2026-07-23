import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import zaterLogo from '../assets/zater-logo.jpeg'

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true); setError('')
    try {
      await api.post('/auth/forgot-password', { email: email.trim() })
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="auth-root">
        <div className="auth-dotgrid"/>
        <div className="auth-card">

          <div className="auth-logo-wrap">
            <img src={zaterLogo} alt="Zater" className="auth-logo-img"/>
            <span className="auth-logo-text">Zater Web Studio</span>
          </div>

          {!sent ? (
            <>
              <div className="auth-icon-wrap">🔒</div>
              <h1 className="auth-title">Forgot password?</h1>
              <p className="auth-sub">Enter your email and we'll send you a reset link</p>

              {error && <div className="auth-error">⚠️ {error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required autoFocus
                  />
                </div>
                <button className="auth-btn" type="submit" disabled={loading || !email}>
                  {loading ? <><Spin/> Sending...</> : '📧 Send Reset Link'}
                </button>
              </form>

              <div className="auth-divider"><span>or</span></div>
              <p className="auth-switch">
                Remember your password? <Link to="/login" className="auth-link">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              <div className="auth-success-icon">📧</div>
              <h1 className="auth-title">Check your email</h1>
              <p className="auth-sub">We sent a password reset link to</p>
              <div className="auth-email-pill">{email}</div>
              <div className="auth-success-info">
                <p>• The link expires in <strong>1 hour</strong></p>
                <p>• Check your spam folder if you don't see it</p>
                <p>• Click the link in the email to reset your password</p>
              </div>
              <button className="auth-btn auth-btn-outline" onClick={() => { setSent(false); setEmail('') }}>
                ← Try a different email
              </button>
              <p className="auth-switch" style={{marginTop:12}}>
                <Link to="/login" className="auth-link">Back to login</Link>
              </p>
            </>
          )}

        </div>
      </div>
    </>
  )
}

const Spin = () => (
  <span style={{width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin 0.8s linear infinite'}}/>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

.auth-root{min-height:100vh;background:#f4f4f8;display:flex;align-items:center;justify-content:center;padding:24px;font-family:'Nunito',sans-serif;position:relative;}
.auth-dotgrid{position:fixed;inset:0;background-image:radial-gradient(circle,#c8c8d6 1px,transparent 1px);background-size:26px 26px;opacity:0.4;pointer-events:none;}
.auth-card{position:relative;z-index:1;background:#fff;border-radius:24px;padding:36px 32px;width:100%;max-width:420px;box-shadow:0 4px 32px rgba(0,0,0,0.08);border:1.5px solid #e2e2ea;animation:fadeUp 0.4s ease;text-align:center;}
.auth-logo-wrap{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:24px;}
.auth-logo-img{width:36px;height:36px;border-radius:9px;object-fit:cover;}
.auth-logo-text{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}
.auth-icon-wrap{font-size:44px;margin-bottom:12px;}
.auth-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#0a0a12;margin-bottom:6px;letter-spacing:-0.5px;}
.auth-sub{font-size:14px;color:#72727f;font-weight:500;margin-bottom:24px;}
.auth-error{background:rgba(239,68,68,0.07);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:11px 14px;font-size:13px;color:#dc2626;font-weight:600;margin-bottom:18px;text-align:left;}
.auth-form{display:flex;flex-direction:column;gap:16px;text-align:left;}
.auth-field{display:flex;flex-direction:column;}
.auth-label{font-size:12px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:7px;}
.auth-input{width:100%;padding:11px 14px;border:1.5px solid #e2e2ea;border-radius:10px;font-size:14px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;background:#fff;transition:border-color .18s;}
.auth-input:focus{border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.08);}
.auth-btn{width:100%;padding:13px;border-radius:11px;background:#c0392b;border:none;color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 3px 14px rgba(192,57,43,0.35);transition:all .18s;margin-top:4px;}
.auth-btn:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
.auth-btn:disabled{background:#c0c0cc;cursor:not-allowed;box-shadow:none;transform:none;}
.auth-btn-outline{background:#fff !important;color:#0a0a12 !important;border:1.5px solid #e2e2ea !important;box-shadow:none !important;margin-top:16px;}
.auth-btn-outline:hover{background:#f5f5f7 !important;}
.auth-divider{display:flex;align-items:center;gap:12px;margin:18px 0;}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:#e2e2ea;}
.auth-divider span{font-size:12px;color:#c0c0cc;font-weight:600;}
.auth-switch{font-size:13px;color:#72727f;font-weight:500;}
.auth-link{color:#c0392b;font-weight:800;text-decoration:none;}
.auth-link:hover{text-decoration:underline;}

/* Success state */
.auth-success-icon{font-size:56px;margin-bottom:14px;}
.auth-email-pill{display:inline-block;background:#f0f0f6;border-radius:100px;padding:8px 18px;font-size:14px;font-weight:700;color:#0a0a12;margin-bottom:20px;}
.auth-success-info{background:#f8f8fc;border:1px solid #e8e8f0;border-radius:12px;padding:14px 18px;text-align:left;margin-bottom:20px;}
.auth-success-info p{font-size:13px;color:#3a3a4a;font-weight:500;line-height:1.6;}
.auth-success-info p+p{margin-top:5px;}
`
