import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import zaterLogo from '../assets/zater-logo.jpeg'

export default function AdminLogin() {
  const navigate            = useNavigate()
  const [email,   setEmail] = useState('zaterbusiness@gmail.com')
  const [password,setPw]    = useState('')
  const [showPw,  setShowPw]= useState(false)
  const [loading, setLoading]= useState(false)
  const [error,   setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/login`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email: email.trim(), password }),
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')

      // Store admin token separately — never mixes with user token
      localStorage.setItem('zater_admin_token', data.token)
      localStorage.setItem('zater_admin_info',  JSON.stringify(data.admin))

      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="al-root">
        <div className="al-dotgrid"/>

        <div className="al-card">
          {/* Logo */}
          <div className="al-logo">
            <div className="al-logo-icon">
              <img src={zaterLogo} alt="Zater" style={{width:36,height:36,borderRadius:9,objectFit:'cover'}}/>
            </div>
            <div>
              <div className="al-logo-name">Zater Web Studio</div>
              <div className="al-logo-sub">Admin Control Panel</div>
            </div>
          </div>

          {/* Badge */}
          <div className="al-badge">🔐 Restricted Access — Admins Only</div>

          <h1 className="al-title">Admin Sign In</h1>
          <p className="al-sub">This page is only for administrators</p>

          {error && (
            <div className="al-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="al-form">
            <div className="al-field">
              <label className="al-label">Admin Email</label>
              <input
                className="al-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoFocus
              />
            </div>

            <div className="al-field">
              <label className="al-label">Password</label>
              <div className="al-pw-wrap">
                <input
                  className="al-input al-pw-input"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPw(e.target.value)}
                  placeholder="Your admin password"
                  required
                />
                <button
                  type="button"
                  className="al-pw-eye"
                  onClick={() => setShowPw(o => !o)}
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              className="al-btn"
              type="submit"
              disabled={loading || !email || !password}
            >
              {loading ? (
                <><Spin/> Signing in...</>
              ) : (
                '🔐 Sign In to Admin Panel'
              )}
            </button>
          </form>

          {/* Info box */}
          <div className="al-info">
            <div className="al-info-row">
              <span>🌐</span>
              <span>Regular users login at <strong>/login</strong></span>
            </div>
            <div className="al-info-row">
              <span>🔐</span>
              <span>Admin login is completely separate</span>
            </div>
            <div className="al-info-row">
              <span>⏱️</span>
              <span>Admin session expires in 12 hours</span>
            </div>
          </div>

          <button className="al-back" onClick={() => navigate('/login')}>
            ← Back to User Login
          </button>
        </div>
      </div>
    </>
  )
}

const Spin = () => (
  <span style={{
    width: 14, height: 14,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.8s linear infinite',
    flexShrink: 0,
  }}/>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

.al-root{
  min-height:100vh;
  background:#0a0a12;
  display:flex;align-items:center;justify-content:center;
  padding:24px;
  font-family:'Nunito',sans-serif;
  position:relative;
}
.al-dotgrid{
  position:fixed;inset:0;
  background-image:radial-gradient(circle,#1e1e2e 1px,transparent 1px);
  background-size:26px 26px;
  opacity:0.8;pointer-events:none;
}

.al-card{
  position:relative;z-index:1;
  background:#131320;
  border:1.5px solid #2a2a3a;
  border-radius:22px;
  padding:36px 32px;
  width:100%;max-width:420px;
  box-shadow:0 8px 48px rgba(0,0,0,0.5);
  animation:fadeUp 0.4s ease;
}

.al-logo{display:flex;align-items:center;gap:12px;margin-bottom:24px;}
.al-logo-icon{flex-shrink:0;}
.al-logo-name{font-family:'Playfair Display',serif;font-size:16px;font-weight:800;color:#fff;}
.al-logo-sub{font-size:10px;color:#4a4a6a;font-weight:600;margin-top:2px;}

.al-badge{
  display:inline-block;
  background:rgba(192,57,43,0.15);
  border:1px solid rgba(192,57,43,0.3);
  color:#ff8070;
  font-size:11px;font-weight:800;
  padding:5px 14px;border-radius:100px;
  margin-bottom:18px;
}

.al-title{
  font-family:'Playfair Display',serif;
  font-size:26px;font-weight:900;
  color:#fff;
  margin-bottom:6px;
  letter-spacing:-0.5px;
}
.al-sub{font-size:13px;color:#5050a0;font-weight:500;margin-bottom:24px;}

.al-error{
  background:rgba(239,68,68,0.1);
  border:1.5px solid rgba(239,68,68,0.25);
  border-radius:10px;
  padding:11px 14px;
  font-size:13px;color:#f87171;font-weight:600;
  margin-bottom:18px;line-height:1.5;
}

.al-form{display:flex;flex-direction:column;gap:16px;}
.al-field{display:flex;flex-direction:column;gap:7px;}
.al-label{font-size:11px;font-weight:800;color:#5050a0;text-transform:uppercase;letter-spacing:0.7px;}

.al-input{
  width:100%;
  padding:12px 14px;
  background:#0d0d1a;
  border:1.5px solid #2a2a3a;
  border-radius:10px;
  font-size:14px;font-family:'Nunito',sans-serif;
  color:#e0e0f0;
  outline:none;
  transition:border-color .18s;
}
.al-input:focus{border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.12);}
.al-input::placeholder{color:#3a3a5a;}

.al-pw-wrap{position:relative;}
.al-pw-input{padding-right:44px !important;}
.al-pw-eye{
  position:absolute;right:12px;top:50%;transform:translateY(-50%);
  background:none;border:none;font-size:16px;cursor:pointer;padding:4px;
}

.al-btn{
  width:100%;padding:14px;
  border-radius:11px;
  background:#c0392b;border:none;
  color:#fff;font-size:15px;font-weight:800;
  cursor:pointer;font-family:'Nunito',sans-serif;
  display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 4px 18px rgba(192,57,43,0.4);
  transition:all .18s;
  margin-top:4px;
}
.al-btn:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
.al-btn:disabled{background:#2a2a3a;cursor:not-allowed;box-shadow:none;transform:none;color:#5050a0;}

.al-info{
  margin-top:20px;
  background:rgba(255,255,255,0.03);
  border:1px solid #2a2a3a;
  border-radius:12px;
  padding:14px 16px;
  display:flex;flex-direction:column;gap:8px;
}
.al-info-row{
  display:flex;align-items:center;gap:10px;
  font-size:12px;color:#5050a0;font-weight:600;
}

.al-back{
  display:block;
  width:100%;margin-top:14px;
  background:none;border:none;
  color:#4a4a6a;font-size:13px;font-weight:600;
  cursor:pointer;font-family:'Nunito',sans-serif;
  text-align:center;
  transition:color .15s;
}
.al-back:hover{color:#a0a0c0;}
`
