import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import api from '../utils/api'
import zaterLogo from '../assets/zater-logo.jpeg'

const RULES = [
  { id: 'length',  label: 'At least 8 characters',        test: (p) => p.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter (A-Z)',    test: (p) => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'One lowercase letter (a-z)',    test: (p) => /[a-z]/.test(p) },
  { id: 'number',  label: 'One number (0-9)',              test: (p) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$…)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
]

const getStrength = (password) => {
  const passed = RULES.filter(r => r.test(password)).length
  if (passed === 0) return { level: 0, label: '', color: '#e2e2ea' }
  if (passed <= 2)  return { level: 1, label: 'Weak',   color: '#ef4444' }
  if (passed <= 3)  return { level: 2, label: 'Fair',   color: '#f59e0b' }
  if (passed === 4) return { level: 3, label: 'Good',   color: '#3b82f6' }
  return              { level: 4, label: 'Strong', color: '#22c55e' }
}

export default function ResetPassword() {
  const navigate               = useNavigate()
  const [searchParams]         = useSearchParams()
  const token                  = searchParams.get('token')

  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [showPw,    setShowPw]    = useState(false)
  const [showCf,    setShowCf]    = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [checking,  setChecking]  = useState(true)
  const [validToken,setValidToken]= useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState('')

  const strength  = getStrength(password)
  const allPassed = RULES.every(r => r.test(password))
  const pwMatch   = password && confirm && password === confirm

  // Validate token on load
  useEffect(() => {
    if (!token) { setChecking(false); setValidToken(false); return }
    api.post('/auth/validate-reset-token', { token })
      .then(d => setValidToken(d.valid))
      .catch(() => setValidToken(false))
      .finally(() => setChecking(false))
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!allPassed) { setError('Please meet all password requirements.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setLoading(true); setError('')
    try {
      await api.post('/auth/reset-password', { token, password })
      setDone(true)
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

          {/* Checking token */}
          {checking && (
            <div className="auth-checking">
              <div className="auth-spinner"/>
              <p>Verifying reset link...</p>
            </div>
          )}

          {/* Invalid token */}
          {!checking && !validToken && (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:52,marginBottom:12}}>❌</div>
              <h1 className="auth-title">Link expired</h1>
              <p className="auth-sub">This reset link is invalid or has expired.<br/>Links expire after 1 hour.</p>
              <Link to="/forgot-password" className="auth-btn-link">Request a new reset link →</Link>
              <p className="auth-switch" style={{marginTop:16}}>
                <Link to="/login" className="auth-link">Back to login</Link>
              </p>
            </div>
          )}

          {/* Reset form */}
          {!checking && validToken && !done && (
            <>
              <div style={{fontSize:44,textAlign:'center',marginBottom:12}}>🔑</div>
              <h1 className="auth-title">Set new password</h1>
              <p className="auth-sub">Choose a strong password for your account</p>

              {error && <div className="auth-error">⚠️ {error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">

                <div className="auth-field">
                  <label className="auth-label">New Password</label>
                  <div className="auth-pw-wrap">
                    <input
                      className="auth-input auth-pw-input"
                      type={showPw ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required autoFocus
                    />
                    <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(o => !o)}>
                      {showPw ? '🙈' : '👁️'}
                    </button>
                  </div>

                  {password && (
                    <div className="auth-strength-wrap">
                      <div className="auth-strength-bar">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="auth-strength-seg" style={{background: i <= strength.level ? strength.color : '#e2e2ea'}}/>
                        ))}
                      </div>
                      {strength.label && <span className="auth-strength-label" style={{color:strength.color}}>{strength.label}</span>}
                    </div>
                  )}

                  {password && (
                    <div className="auth-rules">
                      {RULES.map(rule => {
                        const passed = rule.test(password)
                        return (
                          <div key={rule.id} className={`auth-rule ${passed ? 'auth-rule-pass' : 'auth-rule-fail'}`}>
                            <span className="auth-rule-icon">{passed ? '✅' : '○'}</span>
                            <span>{rule.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="auth-field">
                  <label className="auth-label">Confirm Password</label>
                  <div className="auth-pw-wrap">
                    <input
                      className={`auth-input auth-pw-input ${confirm && !pwMatch ? 'auth-input-error' : confirm && pwMatch ? 'auth-input-success' : ''}`}
                      type={showCf ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      required
                    />
                    <button type="button" className="auth-pw-toggle" onClick={() => setShowCf(o => !o)}>
                      {showCf ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {confirm && !pwMatch && <p className="auth-match-err">Passwords do not match</p>}
                  {confirm && pwMatch  && <p className="auth-match-ok">✅ Passwords match</p>}
                </div>

                <button className="auth-btn" type="submit" disabled={loading || !allPassed || !pwMatch}>
                  {loading ? <><Spin/> Resetting...</> : '🔑 Reset Password'}
                </button>
              </form>
            </>
          )}

          {/* Success */}
          {done && (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:56,marginBottom:14}}>🎉</div>
              <h1 className="auth-title">Password reset!</h1>
              <p className="auth-sub" style={{marginBottom:24}}>Your password has been updated successfully. You can now log in with your new password.</p>
              <button className="auth-btn" onClick={() => navigate('/login')}>
                Sign In Now →
              </button>
            </div>
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
.auth-card{position:relative;z-index:1;background:#fff;border-radius:24px;padding:36px 32px;width:100%;max-width:440px;box-shadow:0 4px 32px rgba(0,0,0,0.08);border:1.5px solid #e2e2ea;animation:fadeUp 0.4s ease;}
.auth-logo-wrap{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:24px;}
.auth-logo-img{width:36px;height:36px;border-radius:9px;object-fit:cover;}
.auth-logo-text{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}
.auth-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#0a0a12;text-align:center;margin-bottom:6px;letter-spacing:-0.5px;}
.auth-sub{font-size:14px;color:#72727f;font-weight:500;text-align:center;margin-bottom:24px;line-height:1.6;}
.auth-error{background:rgba(239,68,68,0.07);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:11px 14px;font-size:13px;color:#dc2626;font-weight:600;margin-bottom:18px;}
.auth-form{display:flex;flex-direction:column;gap:16px;}
.auth-field{display:flex;flex-direction:column;}
.auth-label{font-size:12px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:7px;}
.auth-input{width:100%;padding:11px 14px;border:1.5px solid #e2e2ea;border-radius:10px;font-size:14px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;background:#fff;transition:border-color .18s;}
.auth-input:focus{border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.08);}
.auth-input-error{border-color:#ef4444 !important;}
.auth-input-success{border-color:#22c55e !important;}
.auth-pw-wrap{position:relative;}
.auth-pw-input{padding-right:44px !important;}
.auth-pw-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:16px;cursor:pointer;padding:4px;}
.auth-strength-wrap{display:flex;align-items:center;gap:10px;margin-top:8px;}
.auth-strength-bar{display:flex;gap:4px;flex:1;}
.auth-strength-seg{flex:1;height:4px;border-radius:100px;transition:background .3s;}
.auth-strength-label{font-size:11px;font-weight:800;white-space:nowrap;}
.auth-rules{display:flex;flex-direction:column;gap:5px;margin-top:10px;background:#fafafa;border:1px solid #f0f0f6;border-radius:10px;padding:12px 14px;}
.auth-rule{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;transition:color .2s;}
.auth-rule-pass{color:#16a34a;}
.auth-rule-fail{color:#a0a0b0;}
.auth-rule-icon{font-size:13px;width:18px;text-align:center;flex-shrink:0;}
.auth-match-err{font-size:12px;color:#dc2626;font-weight:600;margin-top:5px;}
.auth-match-ok{font-size:12px;color:#16a34a;font-weight:700;margin-top:5px;}
.auth-btn{width:100%;padding:13px;border-radius:11px;background:#c0392b;border:none;color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 3px 14px rgba(192,57,43,0.35);transition:all .18s;margin-top:4px;}
.auth-btn:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
.auth-btn:disabled{background:#c0c0cc;cursor:not-allowed;box-shadow:none;transform:none;}
.auth-btn-link{display:inline-block;background:#c0392b;color:#fff;text-decoration:none;padding:12px 24px;border-radius:11px;font-size:14px;font-weight:800;font-family:'Nunito',sans-serif;margin-top:8px;transition:opacity .18s;}
.auth-btn-link:hover{opacity:0.88;}
.auth-switch{font-size:13px;color:#72727f;font-weight:500;text-align:center;}
.auth-link{color:#c0392b;font-weight:800;text-decoration:none;}
.auth-link:hover{text-decoration:underline;}
.auth-checking{display:flex;flex-direction:column;align-items:center;gap:14px;padding:40px 0;color:#a0a0b0;font-weight:600;font-size:13px;}
.auth-spinner{width:32px;height:32px;border:3px solid #e2e2ea;border-top-color:#c0392b;border-radius:50%;animation:spin 1s linear infinite;}
`
