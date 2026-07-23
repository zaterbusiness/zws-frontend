import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import zaterLogo from '../assets/zater-logo.jpeg'

// ── Country codes list ────────────────────────────────────────
const COUNTRIES = [
  { code: '+91',  flag: '🇮🇳', name: 'India',          short: 'IN' },
  { code: '+1',   flag: '🇺🇸', name: 'United States',  short: 'US' },
  { code: '+1',   flag: '🇨🇦', name: 'Canada',         short: 'CA' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom', short: 'GB' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia',      short: 'AU' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany',        short: 'DE' },
  { code: '+33',  flag: '🇫🇷', name: 'France',         short: 'FR' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy',          short: 'IT' },
  { code: '+34',  flag: '🇪🇸', name: 'Spain',          short: 'ES' },
  { code: '+7',   flag: '🇷🇺', name: 'Russia',         short: 'RU' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil',         short: 'BR' },
  { code: '+52',  flag: '🇲🇽', name: 'Mexico',         short: 'MX' },
  { code: '+86',  flag: '🇨🇳', name: 'China',          short: 'CN' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan',          short: 'JP' },
  { code: '+82',  flag: '🇰🇷', name: 'South Korea',    short: 'KR' },
  { code: '+65',  flag: '🇸🇬', name: 'Singapore',      short: 'SG' },
  { code: '+971', flag: '🇦🇪', name: 'UAE',             short: 'AE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia',   short: 'SA' },
  { code: '+92',  flag: '🇵🇰', name: 'Pakistan',       short: 'PK' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh',     short: 'BD' },
  { code: '+94',  flag: '🇱🇰', name: 'Sri Lanka',      short: 'LK' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal',          short: 'NP' },
  { code: '+60',  flag: '🇲🇾', name: 'Malaysia',       short: 'MY' },
  { code: '+62',  flag: '🇮🇩', name: 'Indonesia',      short: 'ID' },
  { code: '+63',  flag: '🇵🇭', name: 'Philippines',    short: 'PH' },
  { code: '+66',  flag: '🇹🇭', name: 'Thailand',       short: 'TH' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa',   short: 'ZA' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt',          short: 'EG' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria',        short: 'NG' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya',          short: 'KE' },
  { code: '+64',  flag: '🇳🇿', name: 'New Zealand',    short: 'NZ' },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands',    short: 'NL' },
  { code: '+46',  flag: '🇸🇪', name: 'Sweden',         short: 'SE' },
  { code: '+47',  flag: '🇳🇴', name: 'Norway',         short: 'NO' },
  { code: '+45',  flag: '🇩🇰', name: 'Denmark',        short: 'DK' },
  { code: '+41',  flag: '🇨🇭', name: 'Switzerland',    short: 'CH' },
  { code: '+32',  flag: '🇧🇪', name: 'Belgium',        short: 'BE' },
  { code: '+43',  flag: '🇦🇹', name: 'Austria',        short: 'AT' },
  { code: '+48',  flag: '🇵🇱', name: 'Poland',         short: 'PL' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic', short: 'CZ' },
  { code: '+36',  flag: '🇭🇺', name: 'Hungary',        short: 'HU' },
  { code: '+30',  flag: '🇬🇷', name: 'Greece',         short: 'GR' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal',       short: 'PT' },
  { code: '+90',  flag: '🇹🇷', name: 'Turkey',         short: 'TR' },
  { code: '+972', flag: '🇮🇱', name: 'Israel',         short: 'IL' },
  { code: '+98',  flag: '🇮🇷', name: 'Iran',           short: 'IR' },
  { code: '+54',  flag: '🇦🇷', name: 'Argentina',      short: 'AR' },
  { code: '+56',  flag: '🇨🇱', name: 'Chile',          short: 'CL' },
  { code: '+57',  flag: '🇨🇴', name: 'Colombia',       short: 'CO' },
  { code: '+51',  flag: '🇵🇪', name: 'Peru',           short: 'PE' },
]

// ── Password rules ────────────────────────────────────────────
const RULES = [
  { id: 'length',  label: 'At least 8 characters',        test: (p) => p.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter (A-Z)',    test: (p) => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'One lowercase letter (a-z)',    test: (p) => /[a-z]/.test(p) },
  { id: 'number',  label: 'One number (0-9)',              test: (p) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$…)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
]

const getStrength = (password) => {
  const passed = RULES.filter(r => r.test(password)).length
  if (passed === 0) return { level: 0, label: '',        color: '#e2e2ea' }
  if (passed <= 2)  return { level: 1, label: 'Weak',   color: '#ef4444' }
  if (passed <= 3)  return { level: 2, label: 'Fair',   color: '#f59e0b' }
  if (passed === 4) return { level: 3, label: 'Good',   color: '#3b82f6' }
  return              { level: 4, label: 'Strong', color: '#22c55e' }
}

export default function Signup() {
  const navigate         = useNavigate()
  const { signup, loginWithGoogle } = useAuth()
  const dropRef          = useRef(null)

  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [phone,       setPhone]       = useState('')
  const [selCountry,  setSelCountry]  = useState(COUNTRIES[0]) // India default
  const [ccOpen,      setCcOpen]      = useState(false)
  const [ccSearch,    setCcSearch]    = useState('')
  const [password,    setPassword]    = useState('')
  const [confirm,     setConfirm]     = useState('')
  const [showPw,      setShowPw]      = useState(false)
  const [showCf,      setShowCf]      = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [gLoading,    setGLoading]    = useState(false)
  const [error,       setError]       = useState('')
  const [focused,     setFocused]     = useState(false)

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const hasGoogle = !!(clientId && !clientId.includes('your_google'))

  useEffect(() => {
    if (!hasGoogle) return
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => {
      if (!window.google) return
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        auto_select: false,
      })
      window.google.accounts.id.renderButton(
        document.getElementById('g-btn-signup'),
        { theme:'outline', size:'large', width:'396', text:'signup_with', shape:'rectangular', logo_alignment:'left' }
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

  const strength  = getStrength(password)
  const allPassed = RULES.every(r => r.test(password))
  const pwMatch   = password && confirm && password === confirm

  // Filtered country list
  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(ccSearch.toLowerCase()) ||
    c.code.includes(ccSearch) ||
    c.short.toLowerCase().includes(ccSearch.toLowerCase())
  )

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setCcOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!allPassed) { setError('Please meet all password requirements.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (phone && !/^\d{6,15}$/.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number (6-15 digits).'); return
    }
    setLoading(true); setError('')
    try {
      const fullPhone = phone ? `${selCountry.code}${phone.trim()}` : ''
      await signup(name.trim(), email.trim(), password, fullPhone)
      navigate('/')
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
          {/* Logo */}
          <div className="auth-logo-wrap">
            <img src={zaterLogo} alt="Zater" className="auth-logo-img"/>
            <span className="auth-logo-text">Zater Web Studio</span>
          </div>

          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Start building AI websites for free</p>

          {error && <div className="auth-error">⚠️ {error}</div>}

          {/* ── Google Sign-Up Button ── */}
          <div className="auth-google-wrap">
            {hasGoogle ? (
              <>
                <div id="g-btn-signup" className="auth-g-btn-container"/>
                {gLoading && (
                  <div className="auth-g-loading">
                    <span className="auth-g-spinner"/>
                    Signing up with Google...
                  </div>
                )}
              </>
            ) : (
              <div className="auth-g-not-configured">
                ⚙️ Add VITE_GOOGLE_CLIENT_ID to .env to enable Google Sign-Up
              </div>
            )}
          </div>

          <div className="auth-divider"><span>or create account with email</span></div>

          <form onSubmit={handleSubmit} className="auth-form">

            {/* Name */}
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <input
                className="auth-input"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required autoFocus
              />
            </div>

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                className="auth-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone + Country Code */}
            <div className="auth-field">
              <label className="auth-label">
                Phone Number
                <span className="auth-label-opt">optional</span>
              </label>
              <div className="auth-phone-row">

                {/* Country code dropdown */}
                <div className="auth-cc-wrap" ref={dropRef}>
                  <button
                    type="button"
                    className="auth-cc-btn"
                    onClick={() => { setCcOpen(o => !o); setCcSearch('') }}
                  >
                    <span className="auth-cc-flag">{selCountry.flag}</span>
                    <span className="auth-cc-code">{selCountry.code}</span>
                    <span className="auth-cc-arrow">{ccOpen ? '▲' : '▼'}</span>
                  </button>

                  {ccOpen && (
                    <div className="auth-cc-dropdown">
                      <div className="auth-cc-search-wrap">
                        <input
                          className="auth-cc-search"
                          placeholder="Search country..."
                          value={ccSearch}
                          onChange={e => setCcSearch(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="auth-cc-list">
                        {filteredCountries.length === 0 ? (
                          <div className="auth-cc-no-result">No country found</div>
                        ) : filteredCountries.map((c, i) => (
                          <button
                            key={`${c.short}-${i}`}
                            type="button"
                            className={`auth-cc-item ${selCountry.short === c.short && selCountry.code === c.code ? 'auth-cc-selected' : ''}`}
                            onClick={() => { setSelCountry(c); setCcOpen(false); setCcSearch('') }}
                          >
                            <span className="auth-cc-item-flag">{c.flag}</span>
                            <span className="auth-cc-item-name">{c.name}</span>
                            <span className="auth-cc-item-code">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone number input */}
                <input
                  className="auth-input auth-phone-input"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/[^0-9\s]/g, ''))}
                  maxLength={15}
                />
              </div>
              {phone && (
                <div className="auth-phone-preview">
                  Full number: <strong>{selCountry.code}{phone}</strong>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-pw-wrap">
                <input
                  className="auth-input auth-pw-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused(true)}
                  required
                />
                <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(o => !o)}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Strength bar */}
              {password && (
                <div className="auth-strength-wrap">
                  <div className="auth-strength-bar">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="auth-strength-seg"
                        style={{background: i <= strength.level ? strength.color : '#e2e2ea'}}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <span className="auth-strength-label" style={{color: strength.color}}>
                      {strength.label}
                    </span>
                  )}
                </div>
              )}

              {/* Rules checklist */}
              {(focused || password) && (
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

            {/* Confirm Password */}
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

            <button
              className="auth-btn"
              type="submit"
              disabled={loading || !name || !email || !allPassed || !pwMatch}
            >
              {loading ? <><Spin/> Creating account...</> : 'Create Account →'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
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
@keyframes dropDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

.auth-root{min-height:100vh;background:#f4f4f8;display:flex;align-items:center;justify-content:center;padding:24px;font-family:'Nunito',sans-serif;position:relative;}
.auth-dotgrid{position:fixed;inset:0;background-image:radial-gradient(circle,#c8c8d6 1px,transparent 1px);background-size:26px 26px;opacity:0.4;pointer-events:none;}
.auth-card{position:relative;z-index:1;background:#fff;border-radius:24px;padding:36px 32px;width:100%;max-width:460px;box-shadow:0 4px 32px rgba(0,0,0,0.08);border:1.5px solid #e2e2ea;animation:fadeUp 0.4s ease;}
.auth-logo-wrap{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:24px;}
.auth-logo-img{width:36px;height:36px;border-radius:9px;object-fit:cover;border:1px solid #e8e8e8;}
.auth-logo-text{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}
.auth-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#0a0a12;text-align:center;margin-bottom:6px;letter-spacing:-0.5px;}
.auth-sub{font-size:14px;color:#72727f;font-weight:500;text-align:center;margin-bottom:24px;}

/* ── Google Sign-Up ── */
.auth-google-wrap{width:100%;margin-bottom:4px;}
.auth-g-btn-container{width:100%;min-height:44px;}
.auth-g-btn-container > div{width:100% !important;}
.auth-g-loading{display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;color:#72727f;font-weight:600;padding:8px 0;}
.auth-g-spinner{width:14px;height:14px;border:2px solid rgba(66,133,244,0.3);border-top-color:#4285f4;border-radius:50%;display:inline-block;animation:spin 0.8s linear infinite;flex-shrink:0;}
.auth-g-not-configured{font-size:11px;color:#a0a0b0;font-weight:600;text-align:center;padding:8px;background:#f8f8fc;border-radius:8px;border:1px dashed #e2e2ea;}

.auth-error{background:rgba(239,68,68,0.07);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:11px 14px;font-size:13px;color:#dc2626;font-weight:600;margin-bottom:18px;line-height:1.5;}
.auth-form{display:flex;flex-direction:column;gap:16px;}
.auth-field{display:flex;flex-direction:column;}
.auth-label{font-size:12px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:7px;display:flex;align-items:center;gap:7px;}
.auth-label-opt{font-size:10px;font-weight:600;color:#c0c0cc;background:#f5f5f7;padding:2px 7px;border-radius:100px;text-transform:none;letter-spacing:0;}
.auth-input{width:100%;padding:11px 14px;border:1.5px solid #e2e2ea;border-radius:10px;font-size:14px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;background:#fff;transition:border-color .18s;}
.auth-input:focus{border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.08);}
.auth-input-error{border-color:#ef4444 !important;}
.auth-input-success{border-color:#22c55e !important;}

/* PHONE ROW */
.auth-phone-row{display:flex;gap:8px;align-items:stretch;}
.auth-phone-input{flex:1;min-width:0;}

/* COUNTRY CODE DROPDOWN */
.auth-cc-wrap{position:relative;flex-shrink:0;}
.auth-cc-btn{height:100%;min-height:44px;padding:0 12px;border:1.5px solid #e2e2ea;border-radius:10px;background:#fff;display:flex;align-items:center;gap:6px;cursor:pointer;font-family:'Nunito',sans-serif;transition:border-color .18s;white-space:nowrap;}
.auth-cc-btn:hover{border-color:#c0392b;}
.auth-cc-flag{font-size:18px;line-height:1;}
.auth-cc-code{font-size:13px;font-weight:700;color:#0a0a12;}
.auth-cc-arrow{font-size:9px;color:#a0a0b0;}
.auth-cc-dropdown{position:absolute;top:calc(100% + 6px);left:0;z-index:1000;background:#fff;border:1.5px solid #e2e2ea;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.12);width:260px;overflow:hidden;animation:dropDown 0.15s ease;}
.auth-cc-search-wrap{padding:10px 10px 6px;}
.auth-cc-search{width:100%;padding:8px 12px;border:1.5px solid #e2e2ea;border-radius:8px;font-size:13px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;}
.auth-cc-search:focus{border-color:#c0392b;}
.auth-cc-list{max-height:220px;overflow-y:auto;padding:4px 6px 8px;}
.auth-cc-list::-webkit-scrollbar{width:4px;}
.auth-cc-list::-webkit-scrollbar-thumb{background:#e2e2ea;border-radius:4px;}
.auth-cc-item{width:100%;display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;border:none;background:transparent;cursor:pointer;font-family:'Nunito',sans-serif;transition:background .12s;text-align:left;}
.auth-cc-item:hover{background:#f5f5f7;}
.auth-cc-selected{background:#fff8f6 !important;}
.auth-cc-item-flag{font-size:18px;flex-shrink:0;}
.auth-cc-item-name{font-size:13px;font-weight:600;color:#0a0a12;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.auth-cc-item-code{font-size:12px;font-weight:700;color:#c0392b;flex-shrink:0;}
.auth-cc-no-result{padding:16px;text-align:center;font-size:13px;color:#a0a0b0;font-weight:600;}

/* PHONE PREVIEW */
.auth-phone-preview{font-size:11px;color:#72727f;font-weight:600;margin-top:5px;}

.auth-pw-wrap{position:relative;}
.auth-pw-input{padding-right:44px !important;}
.auth-pw-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:16px;cursor:pointer;padding:4px;}

/* STRENGTH */
.auth-strength-wrap{display:flex;align-items:center;gap:10px;margin-top:8px;}
.auth-strength-bar{display:flex;gap:4px;flex:1;}
.auth-strength-seg{flex:1;height:4px;border-radius:100px;transition:background .3s;}
.auth-strength-label{font-size:11px;font-weight:800;white-space:nowrap;}

/* RULES */
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
.auth-divider{display:flex;align-items:center;gap:12px;margin:18px 0;}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:#e2e2ea;}
.auth-divider span{font-size:12px;color:#c0c0cc;font-weight:600;}
.auth-switch{text-align:center;font-size:13px;color:#72727f;font-weight:500;}
.auth-link{color:#c0392b;font-weight:800;text-decoration:none;}
.auth-link:hover{text-decoration:underline;}
`
