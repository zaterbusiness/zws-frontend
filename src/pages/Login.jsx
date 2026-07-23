import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import zaterLogo from '../assets/zater-logo.jpeg'

export default function Login() {
  const navigate               = useNavigate()
  const { login, loginWithGoogle } = useAuth()
  const [email,    setEmail]   = useState('')
  const [password, setPassword]= useState('')
  const [showPw,   setShowPw]  = useState(false)
  const [loading,  setLoading] = useState(false)
  const [gLoading, setGLoading]= useState(false)
  const [error,    setError]   = useState('')

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const hasGoogle = !!(clientId && !clientId.includes('your_google'))

  // Load Google SDK and render button
  useEffect(() => {
    if (!hasGoogle) return
    const script    = document.createElement('script')
    script.src      = 'https://accounts.google.com/gsi/client'
    script.async    = true
    script.onload   = () => {
      if (!window.google) return
      window.google.accounts.id.initialize({
        client_id:   clientId,
        callback:    handleGoogleResponse,
        auto_select: false,
      })
      window.google.accounts.id.renderButton(
        document.getElementById('g-btn'),
        { theme:'outline', size:'large', width:'356', text:'signin_with', shape:'rectangular', logo_alignment:'left' }
      )
    }
    document.head.appendChild(script)
    return () => { try { document.head.removeChild(script) } catch {} }
  }, [])

  const handleGoogleResponse = async (response) => {
    setGLoading(true); setError('')
    try {
      await loginWithGoogle(response.credential)
      navigate('/')
    } catch (err) { setError(err.message) }
    finally { setGLoading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await login(email.trim(), password)
      navigate('/')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
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

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to your account</p>

          {error && <div className="auth-error">⚠️ {error}</div>}

          {/* ── Google Sign-In ── */}
          {hasGoogle && (
            <>
              <div className="auth-google-box">
                <div id="g-btn" style={{width:'100%'}}/>
                {gLoading && (
                  <div className="auth-g-loading"><Spin color="#4285f4"/> Signing in with Google...</div>
                )}
              </div>
              <div className="auth-divider"><span>or sign in with email</span></div>
            </>
          )}

          {/* ── Email / Password ── */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email address</label>
              <input className="auth-input" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required autoFocus/>
            </div>
            <div className="auth-field">
              <div className="auth-pw-header">
                <label className="auth-label">Password</label>
                <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
              </div>
              <div className="auth-pw-wrap">
                <input className="auth-input auth-pw-input"
                  type={showPw?'text':'password'} placeholder="Your password"
                  value={password} onChange={e => setPassword(e.target.value)} required/>
                <button type="button" className="auth-pw-eye" onClick={() => setShowPw(o=>!o)}>
                  {showPw?'🙈':'👁️'}
                </button>
              </div>
            </div>
            <button className="auth-btn" type="submit" disabled={loading||!email||!password}>
              {loading ? <><Spin/> Signing in...</> : 'Sign In →'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>
          <p className="auth-switch">
            Don't have an account? <Link to="/signup" className="auth-link">Create one free</Link>
          </p>
        </div>
      </div>
    </>
  )
}

const Spin = ({ color='#fff' }) => (
  <span style={{width:14,height:14,border:`2px solid ${color}44`,borderTopColor:color,borderRadius:'50%',display:'inline-block',animation:'spin 0.8s linear infinite',flexShrink:0}}/>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.auth-root{min-height:100vh;background:#f4f4f8;display:flex;align-items:center;justify-content:center;padding:24px;font-family:'Nunito',sans-serif;position:relative;}
.auth-dotgrid{position:fixed;inset:0;background-image:radial-gradient(circle,#c8c8d6 1px,transparent 1px);background-size:26px 26px;opacity:0.4;pointer-events:none;}
.auth-card{position:relative;z-index:1;background:#fff;border-radius:24px;padding:36px 32px;width:100%;max-width:420px;box-shadow:0 4px 32px rgba(0,0,0,0.08);border:1.5px solid #e2e2ea;animation:fadeUp 0.4s ease;}
.auth-logo-wrap{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:24px;}
.auth-logo-img{width:36px;height:36px;border-radius:9px;object-fit:cover;border:1px solid #e8e8e8;}
.auth-logo-text{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}
.auth-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#0a0a12;text-align:center;margin-bottom:6px;letter-spacing:-0.5px;}
.auth-sub{font-size:14px;color:#72727f;font-weight:500;text-align:center;margin-bottom:24px;}
.auth-error{background:rgba(239,68,68,0.07);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:11px 14px;font-size:13px;color:#dc2626;font-weight:600;margin-bottom:18px;line-height:1.5;}
.auth-google-box{width:100%;margin-bottom:4px;min-height:44px;}
.auth-g-loading{display:flex;align-items:center;gap:8px;font-size:13px;color:#72727f;font-weight:600;padding:8px 0;justify-content:center;}
.auth-form{display:flex;flex-direction:column;gap:16px;}
.auth-field{display:flex;flex-direction:column;}
.auth-pw-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;}
.auth-label{font-size:12px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.7px;}
.auth-input{width:100%;padding:11px 14px;border:1.5px solid #e2e2ea;border-radius:10px;font-size:14px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;background:#fff;transition:border-color .18s;}
.auth-input:focus{border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.08);}
.auth-pw-wrap{position:relative;}
.auth-pw-input{padding-right:44px !important;}
.auth-pw-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:16px;cursor:pointer;padding:4px;}
.auth-forgot{font-size:12px;font-weight:700;color:#c0392b;text-decoration:none;}
.auth-forgot:hover{text-decoration:underline;}
.auth-btn{width:100%;padding:13px;border-radius:11px;background:#c0392b;border:none;color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 3px 14px rgba(192,57,43,0.35);transition:all .18s;margin-top:4px;}
.auth-btn:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
.auth-btn:disabled{background:#c0c0cc;cursor:not-allowed;box-shadow:none;transform:none;}
.auth-divider{display:flex;align-items:center;gap:12px;margin:16px 0;}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:#e2e2ea;}
.auth-divider span{font-size:12px;color:#c0c0cc;font-weight:600;white-space:nowrap;}
.auth-switch{text-align:center;font-size:13px;color:#72727f;font-weight:500;}
.auth-link{color:#c0392b;font-weight:800;text-decoration:none;}
.auth-link:hover{text-decoration:underline;}
`
