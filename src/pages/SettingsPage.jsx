import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../utils/api'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const navigate          = useNavigate()
  const [searchParams]    = useSearchParams()

  const [tab, setTab]     = useState(searchParams.get('tab') || 'github')

  const [ghStatus,    setGhStatus]    = useState(null)
  const [ghToken,     setGhToken]     = useState('')
  const [showToken,   setShowToken]   = useState(false)
  const [ghLoading,   setGhLoading]   = useState(false)
  const [ghMsg,       setGhMsg]       = useState('')
  const [ghErr,       setGhErr]       = useState('')

  const [pwOld,       setPwOld]       = useState('')
  const [pwNew,       setPwNew]       = useState('')
  const [pwConfirm,   setPwConfirm]   = useState('')
  const [pwLoading,   setPwLoading]   = useState(false)
  const [pwMsg,       setPwMsg]       = useState('')
  const [pwErr,       setPwErr]       = useState('')

  useEffect(() => { loadGhStatus() }, [])

  const loadGhStatus = async () => {
    try {
      const data = await api.get('/hosting/github-status')
      setGhStatus(data)
    } catch {
      setGhStatus({ connected: false, username: null })
    }
  }

  const handleConnect = async () => {
    const t = ghToken.trim()
    if (!t) { setGhErr('Please paste your GitHub Personal Access Token.'); return }
    if (!t.startsWith('ghp_') && !t.startsWith('github_pat_')) {
      setGhErr('Token looks invalid. GitHub tokens start with ghp_ or github_pat_')
      return
    }
    setGhLoading(true); setGhErr(''); setGhMsg('')
    try {
      const data = await api.post('/hosting/github-connect', { token: t })
      setGhMsg('Connected as @' + data.username + '! You can now deploy to GitHub Pages.')
      setGhToken('')
      setGhStatus({ connected: true, username: data.username })
    } catch (err) {
      setGhErr(err.message || 'Invalid token. Make sure it has the repo scope.')
    } finally { setGhLoading(false) }
  }

  // Only admins can disconnect
  const handleDisconnect = async () => {
    if (user?.role !== 'admin') {
      setGhErr('Only admins can disconnect GitHub. Please contact your administrator.')
      return
    }
    if (!window.confirm('Disconnect GitHub? You will need to reconnect to deploy sites.')) return
    setGhLoading(true); setGhErr(''); setGhMsg('')
    try {
      await api.delete('/hosting/github-connect')
      setGhStatus({ connected: false, username: null })
      setGhMsg('GitHub disconnected successfully.')
    } catch (err) {
      setGhErr(err.message || 'Could not disconnect. Please try again.')
    } finally { setGhLoading(false) }
  }

  const handleChangePassword = async () => {
    if (!pwOld || !pwNew || !pwConfirm) { setPwErr('All fields are required.'); return }
    if (pwNew !== pwConfirm) { setPwErr('New passwords do not match.'); return }
    if (pwNew.length < 8) { setPwErr('Password must be at least 8 characters.'); return }
    setPwLoading(true); setPwErr(''); setPwMsg('')
    try {
      await api.post('/auth/change-password', { currentPassword: pwOld, newPassword: pwNew })
      setPwMsg('Password changed successfully!')
      setPwOld(''); setPwNew(''); setPwConfirm('')
    } catch (err) {
      setPwErr(err.message)
    } finally { setPwLoading(false) }
  }

  if (!user) { navigate('/login'); return null }

  return (
    <>
      <style>{CSS}</style>
      <div className="st-root">

        <div className="st-topbar">
          <button className="st-back" onClick={() => navigate('/')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Home
          </button>
          <span className="st-topbar-title">Settings</span>
          <div/>
        </div>

        <div className="st-body">
          <aside className="st-sidebar">
            <div className="st-user-card">
              <div className="st-avatar">
                {user.avatar
                  ? <img src={user.avatar} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>
                  : <span>{(user.name||'U')[0].toUpperCase()}</span>
                }
              </div>
              <div className="st-user-name">{user.name}</div>
              <div className="st-user-email">{user.email}</div>
              <div className="st-user-role">{user.role === 'admin' ? 'Admin' : (user.plan || 'Free')}</div>
            </div>

            <nav className="st-nav">
              {[
                { id:'github',   icon:'GitHub', label:'GitHub Hosting' },
                { id:'password', icon:'Lock',   label:'Change Password' },
                { id:'account',  icon:'User',   label:'Account Info' },
              ].map(item => (
                <button key={item.id}
                  className={'st-nav-btn' + (tab === item.id ? ' st-nav-active' : '')}
                  onClick={() => setTab(item.id)}>
                  {item.label}
                </button>
              ))}
            </nav>

            <button className="st-logout" onClick={() => { logout(); navigate('/login') }}>
              Sign Out
            </button>
          </aside>

          <main className="st-main">

            {tab === 'github' && (
              <div className="st-panel">
                <div className="st-panel-header">
                  <h1 className="st-panel-title">GitHub Hosting</h1>
                  <p className="st-panel-sub">
                    Connect your GitHub account to deploy websites to GitHub Pages —
                    free hosting at <strong>yourusername.github.io/site</strong>
                  </p>
                </div>

                <div className={'st-status-bar ' + (ghStatus?.connected ? 'st-status-connected' : 'st-status-none')}>
                  <div className="st-status-left">
                    <div className={'st-status-dot ' + (ghStatus?.connected ? 'st-dot-green' : 'st-dot-red')}/>
                    <div>
                      <div className="st-status-label">
                        {ghStatus === null ? 'Checking status…' : ghStatus.connected ? 'GitHub Connected' : 'GitHub Not Connected'}
                      </div>
                      <div className="st-status-user">
                        {ghStatus?.connected ? '@' + ghStatus.username + ' — sites deploy to your account' : 'Connect below to enable GitHub Pages deployment'}
                      </div>
                    </div>
                  </div>
                  {ghStatus?.connected && (
                    <div className="st-disconnect-wrapper">
                      {user?.role === 'admin' ? (
                        <button className="st-disconnect-btn" onClick={handleDisconnect} disabled={ghLoading}>
                          {ghLoading ? 'Disconnecting…' : 'Disconnect'}
                        </button>
                      ) : (
                        <div className="st-admin-only-badge">Admin only</div>
                      )}
                    </div>
                  )}
                </div>

                {ghMsg && <div className="st-msg-success">{ghMsg}</div>}
                {ghErr && <div className="st-msg-error">{ghErr}</div>}

                {!ghStatus?.connected && (
                  <div className="st-card">
                    <h2 className="st-card-title">Paste Your GitHub Personal Access Token</h2>
                    <p className="st-card-sub">
                      Your token is verified with GitHub and stored securely. It is used only to
                      create repos and deploy your sites to your own GitHub account.
                    </p>
                    <div className="st-field">
                      <label className="st-label">Personal Access Token</label>
                      <div className="st-token-row">
                        <input
                          className="st-input st-monospace"
                          type={showToken ? 'text' : 'password'}
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          value={ghToken}
                          onChange={e => setGhToken(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleConnect()}
                        />
                        <button className="st-toggle-btn" onClick={() => setShowToken(v => !v)}>
                          {showToken ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                    <button className="st-primary-btn" onClick={handleConnect} disabled={ghLoading || !ghToken.trim()}>
                      {ghLoading ? 'Verifying & connecting…' : 'Connect GitHub'}
                    </button>
                  </div>
                )}

                <div className="st-guide">
                  <h2 className="st-guide-title">How to Get Your GitHub Token (Step by Step)</h2>
                  <div className="st-steps">
                    {[
                      <span>Go to <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="st-link">github.com</a> and sign in</span>,
                      'Click your profile photo (top right) → Settings',
                      'Scroll to the bottom → click Developer Settings',
                      'Click Personal Access Tokens → Tokens (classic)',
                      'Click Generate new token → Generate new token (classic)',
                      'Note (name): type "Zater Web Studio"',
                      'Expiration: choose No expiration (or 1 year)',
                      <span>Select scopes: check <code className="st-code">repo</code></span>,
                      'Scroll down → click Generate token (green button)',
                      'Copy the token NOW — GitHub shows it only once!',
                      'Paste it in the box above → click Connect GitHub',
                    ].map((text, i) => (
                      <div key={i} className="st-step">
                        <div className="st-step-num">{i + 1}</div>
                        <div className="st-step-text">{text}</div>
                      </div>
                    ))}
                  </div>

                  <a href="https://github.com/settings/tokens/new?scopes=repo&description=Zater+Web+Studio"
                    target="_blank" rel="noopener noreferrer" className="st-open-github-btn">
                    Open GitHub → Generate Token Page
                  </a>

                  <div className="st-scope-box">
                    <div className="st-scope-title">Required scope (must be checked):</div>
                    <div className="st-scope-row">
                      <span className="st-scope-badge">repo</span>
                      <span className="st-scope-desc">Full control of private and public repositories</span>
                    </div>
                    <div className="st-scope-warn">GitHub shows the token only once. Copy it before closing the page!</div>
                  </div>
                </div>

                <div className="st-perks-card">
                  <h2 className="st-card-title">What GitHub hosting gives you:</h2>
                  <div className="st-perks-grid">
                    {[
                      { icon:'🌐', t:'Free Hosting',    d:'yourusername.github.io/site — forever free' },
                      { icon:'🔒', t:'Auto SSL/HTTPS',  d:'SSL certificate included automatically' },
                      { icon:'⚡', t:'One-Click Deploy', d:'Deploy from your project page instantly' },
                      { icon:'♾️', t:'No Bandwidth Cap', d:'No limits on traffic or visitors' },
                      { icon:'📝', t:'Custom Domain',    d:'Point your own .com domain later' },
                      { icon:'🔄', t:'Easy Updates',     d:'Redeploy anytime to push new changes' },
                    ].map((p,i) => (
                      <div key={i} className="st-perk">
                        <div className="st-perk-icon">{p.icon}</div>
                        <div className="st-perk-title">{p.t}</div>
                        <div className="st-perk-desc">{p.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'password' && (
              <div className="st-panel">
                <div className="st-panel-header">
                  <h1 className="st-panel-title">Change Password</h1>
                  <p className="st-panel-sub">Update your login password. You need your current password to make changes.</p>
                </div>

                {pwMsg && <div className="st-msg-success">{pwMsg}</div>}
                {pwErr && <div className="st-msg-error">{pwErr}</div>}

                {user.google_id && !user.has_password ? (
                  <div className="st-card">
                    <div className="st-info-banner">
                      Your account uses Google Sign-In. Password change is not available for Google-linked accounts.
                    </div>
                  </div>
                ) : (
                  <div className="st-card">
                    <div className="st-field">
                      <label className="st-label">Current Password</label>
                      <input className="st-input" type="password" placeholder="Enter your current password"
                        value={pwOld} onChange={e => setPwOld(e.target.value)}/>
                    </div>
                    <div className="st-field">
                      <label className="st-label">New Password</label>
                      <input className="st-input" type="password" placeholder="Minimum 8 characters"
                        value={pwNew} onChange={e => setPwNew(e.target.value)}/>
                    </div>
                    <div className="st-field">
                      <label className="st-label">Confirm New Password</label>
                      <input className="st-input" type="password" placeholder="Repeat new password"
                        value={pwConfirm} onChange={e => setPwConfirm(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleChangePassword()}/>
                    </div>
                    <button className="st-primary-btn" onClick={handleChangePassword} disabled={pwLoading}>
                      {pwLoading ? 'Updating…' : 'Change Password'}
                    </button>
                  </div>
                )}

                <div className="st-guide">
                  <h2 className="st-guide-title">Password Requirements</h2>
                  <div className="st-req-list">
                    {[
                      'At least 8 characters long',
                      'At least one UPPERCASE letter (A–Z)',
                      'At least one lowercase letter (a–z)',
                      'At least one number (0–9)',
                      'At least one special character (!@#$%^&*)',
                    ].map((r,i) => (
                      <div key={i} className="st-req">{r}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'account' && (
              <div className="st-panel">
                <div className="st-panel-header">
                  <h1 className="st-panel-title">Account Information</h1>
                  <p className="st-panel-sub">Your ZWS account details and status.</p>
                </div>

                <div className="st-card">
                  <h2 className="st-card-title">Profile</h2>
                  <div className="st-info-list">
                    {[
                      { label:'Name',         value: user.name },
                      { label:'Email',        value: user.email },
                      { label:'Plan',         value: user.plan || 'Free' },
                      { label:'Role',         value: user.role || 'user' },
                      { label:'Login Method', value: user.google_id ? 'Google Sign-In' : 'Email & Password' },
                      { label:'GitHub',       value: ghStatus?.connected ? '@' + ghStatus.username + ' Connected' : 'Not connected' },
                      { label:'Phone',        value: user.phone || 'Not added' },
                    ].map((item,i) => (
                      <div key={i} className="st-info-row">
                        <span className="st-info-label">{item.label}</span>
                        <span className="st-info-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="st-card">
                  <h2 className="st-card-title">Quick Actions</h2>
                  <div className="st-quick-grid">
                    {[
                      { icon:'📁', label:'My Projects',    action:() => navigate('/projects') },
                      { icon:'⚛️', label:'My Apps',        action:() => navigate('/apps') },
                      { icon:'💳', label:'Payments',       action:() => navigate('/payments') },
                      { icon:'🐙', label:'GitHub Setup',   action:() => setTab('github') },
                      { icon:'🔒', label:'Change Password',action:() => setTab('password') },
                      { icon:'⚡', label:'Generate Site',  action:() => navigate('/') },
                    ].map((q,i) => (
                      <button key={i} className="st-quick-btn" onClick={q.action}>
                        <span className="st-quick-icon">{q.icon}</span>
                        <span>{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {user.role === 'admin' && (
                  <div className="st-card">
                    <h2 className="st-card-title">Admin Access</h2>
                    <p className="st-card-sub">You have admin privileges on this account.</p>
                    <button className="st-primary-btn" onClick={() => navigate('/admin-login')} style={{marginTop:12}}>
                      Open Admin Panel
                    </button>
                  </div>
                )}

                <div className="st-danger-card">
                  <h2 className="st-danger-title">Danger Zone</h2>
                  <button className="st-danger-btn" onClick={() => { logout(); navigate('/login') }}>
                    Sign Out of All Devices
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  )
}

const Spinner = () => (
  <span style={{width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin 0.8s linear infinite'}}/>
)
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.st-root{min-height:100vh;background:#f2f2f8;font-family:'Nunito',sans-serif;color:#0a0a12;}
.st-topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 28px;background:#0a0a12;border-bottom:1px solid #1e1e3a;position:sticky;top:0;z-index:200;}
.st-back{display:flex;align-items:center;gap:6px;background:none;border:none;color:rgba(255,255,255,0.45);font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:color .15s;padding:0;}
.st-back:hover{color:#fff;}
.st-topbar-title{font-size:14px;font-weight:800;color:#fff;letter-spacing:0.5px;}
.st-body{display:grid;grid-template-columns:240px 1fr;gap:24px;max-width:1080px;margin:0 auto;padding:28px 24px;align-items:start;}
.st-sidebar{display:flex;flex-direction:column;gap:14px;position:sticky;top:80px;}
.st-user-card{background:#fff;border-radius:16px;padding:20px;text-align:center;border:1px solid #e2e2ee;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.st-avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#c0392b,#8e1f15);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;margin:0 auto 10px;overflow:hidden;flex-shrink:0;}
.st-user-name{font-size:14px;font-weight:800;color:#0a0a12;margin-bottom:2px;}
.st-user-email{font-size:11px;color:#9090b0;font-weight:500;margin-bottom:8px;word-break:break-all;}
.st-user-role{display:inline-block;background:rgba(192,57,43,0.1);color:#c0392b;font-size:11px;font-weight:800;padding:3px 12px;border-radius:100px;}
.st-nav{background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e2e2ee;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.st-nav-btn{display:flex;align-items:center;gap:10px;width:100%;padding:13px 16px;background:transparent;border:none;border-bottom:1px solid #f0f0f8;text-align:left;font-size:13px;font-weight:700;color:#5050a0;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;}
.st-nav-btn:last-child{border-bottom:none;}
.st-nav-btn:hover{background:#f6f6fc;color:#0a0a12;}
.st-nav-active{background:#fff8f6 !important;color:#c0392b !important;border-left:3px solid #c0392b;}
.st-logout{background:#fff;border:1.5px solid #fee2e2;border-radius:12px;padding:11px;color:#ef4444;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;width:100%;}
.st-logout:hover{background:#fee2e2;}
.st-main{display:flex;flex-direction:column;gap:16px;}
.st-panel{display:flex;flex-direction:column;gap:16px;}
.st-panel-header{background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e2ee;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.st-panel-title{font-size:22px;font-weight:900;color:#0a0a12;margin-bottom:6px;}
.st-panel-sub{font-size:13px;color:#8080a0;font-weight:500;line-height:1.65;}
.st-panel-sub strong{color:#0a0a12;}
.st-status-bar{display:flex;align-items:center;justify-content:space-between;border-radius:14px;padding:16px 20px;border:2px solid transparent;}
.st-status-connected{background:#f0fdf4;border-color:rgba(34,197,94,0.3);}
.st-status-none{background:#fff8f6;border-color:rgba(192,57,43,0.2);}
.st-status-left{display:flex;align-items:center;gap:12px;}
.st-status-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.st-dot-green{background:#22c55e;box-shadow:0 0 10px rgba(34,197,94,0.5);}
.st-dot-red{background:#f87171;}
.st-status-label{font-size:14px;font-weight:800;color:#0a0a12;margin-bottom:2px;}
.st-status-user{font-size:12px;font-weight:600;color:#8080a0;}
.st-disconnect-wrapper{display:flex;align-items:center;}
.st-disconnect-btn{background:#fff;border:1.5px solid rgba(239,68,68,0.3);color:#ef4444;padding:8px 18px;border-radius:9px;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;white-space:nowrap;}
.st-disconnect-btn:hover:not(:disabled){background:#fee2e2;}
.st-disconnect-btn:disabled{opacity:.5;cursor:not-allowed;}
.st-admin-only-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,0.08);border:1.5px solid rgba(99,102,241,0.25);color:#6366f1;padding:7px 14px;border-radius:9px;font-size:11px;font-weight:800;white-space:nowrap;letter-spacing:0.3px;}
.st-admin-only-badge::before{content:'🔐';font-size:12px;}
.st-msg-success{background:#f0fdf4;border:1.5px solid rgba(34,197,94,0.3);border-radius:12px;padding:14px 18px;font-size:13px;font-weight:700;color:#15803d;animation:fadeIn .2s ease;}
.st-msg-error{background:#fff8f6;border:1.5px solid rgba(192,57,43,0.25);border-radius:12px;padding:14px 18px;font-size:13px;font-weight:700;color:#c0392b;animation:fadeIn .2s ease;}
.st-info-banner{background:#eff6ff;border:1.5px solid rgba(59,130,246,0.25);border-radius:10px;padding:14px 18px;font-size:13px;color:#1d4ed8;font-weight:600;line-height:1.6;}
.st-card{background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e2ee;box-shadow:0 2px 8px rgba(0,0,0,0.04);display:flex;flex-direction:column;gap:16px;}
.st-card-title{font-size:15px;font-weight:800;color:#0a0a12;}
.st-card-sub{font-size:12px;color:#9090b0;font-weight:500;line-height:1.6;margin-top:-8px;}
.st-field{display:flex;flex-direction:column;gap:6px;}
.st-label{font-size:11px;font-weight:800;color:#6060a0;text-transform:uppercase;letter-spacing:0.5px;}
.st-input{width:100%;padding:12px 14px;border:1.5px solid #e2e2ee;border-radius:10px;font-size:14px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;transition:border-color .18s;background:#fafafa;}
.st-input:focus{border-color:#c0392b;background:#fff;}
.st-monospace{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:0.5px;}
.st-token-row{display:flex;gap:8px;}
.st-token-row .st-input{flex:1;}
.st-toggle-btn{background:#f0f0f8;border:1.5px solid #e2e2ee;border-radius:10px;padding:0 14px;font-size:13px;font-weight:700;cursor:pointer;transition:background .15s;flex-shrink:0;color:#5050a0;}
.st-toggle-btn:hover{background:#e4e4f0;}
.st-primary-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#0a0a12;color:#fff;border:none;padding:13px 28px;border-radius:11px;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;width:fit-content;}
.st-primary-btn:hover:not(:disabled){background:#1e1e3a;transform:translateY(-1px);}
.st-primary-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.st-open-github-btn{display:inline-flex;align-items:center;gap:8px;background:#0a0a12;color:#fff;padding:12px 22px;border-radius:10px;font-size:13px;font-weight:800;text-decoration:none;font-family:'Nunito',sans-serif;transition:all .18s;margin:16px 0;}
.st-open-github-btn:hover{background:#1e1e3a;transform:translateY(-1px);}
.st-guide{background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e2ee;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.st-guide-title{font-size:15px;font-weight:800;color:#0a0a12;margin-bottom:18px;}
.st-steps{display:flex;flex-direction:column;gap:10px;}
.st-step{display:flex;align-items:flex-start;gap:12px;}
.st-step-num{width:24px;height:24px;border-radius:50%;background:#0a0a12;color:#fff;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.st-step-text{font-size:13px;font-weight:600;color:#3a3a5a;line-height:1.55;}
.st-link{color:#c0392b;font-weight:700;text-decoration:underline;}
.st-code{background:#f0f0f8;padding:2px 7px;border-radius:5px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#3a3a5a;font-weight:500;}
.st-scope-box{background:#f8f8fc;border-radius:12px;padding:16px 18px;border:1px solid #e8e8f0;}
.st-scope-title{font-size:11px;font-weight:800;color:#6060a0;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;}
.st-scope-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.st-scope-badge{background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.3);color:#15803d;padding:5px 14px;border-radius:8px;font-size:12px;font-weight:800;font-family:'JetBrains Mono',monospace;}
.st-scope-desc{font-size:12px;color:#6060a0;font-weight:600;}
.st-scope-warn{font-size:12px;font-weight:700;color:#c0392b;}
.st-perks-card{background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e2ee;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.st-perks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px;}
.st-perk{background:#f8f8fc;border:1px solid #e8e8f0;border-radius:12px;padding:16px;}
.st-perk-icon{font-size:22px;margin-bottom:7px;}
.st-perk-title{font-size:13px;font-weight:800;color:#0a0a12;margin-bottom:3px;}
.st-perk-desc{font-size:11px;color:#8080a0;font-weight:500;line-height:1.5;}
.st-req-list{display:flex;flex-direction:column;gap:8px;}
.st-req{font-size:13px;font-weight:600;color:#5050a0;}
.st-info-list{display:flex;flex-direction:column;}
.st-info-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f0f0f8;}
.st-info-row:last-child{border-bottom:none;}
.st-info-label{font-size:12px;font-weight:800;color:#9090b0;text-transform:uppercase;letter-spacing:0.3px;}
.st-info-value{font-size:13px;font-weight:700;color:#0a0a12;}
.st-quick-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.st-quick-btn{display:flex;align-items:center;gap:8px;background:#f4f4f8;border:1.5px solid #e2e2ee;border-radius:10px;padding:12px 14px;font-size:13px;font-weight:700;color:#3a3a5a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;text-align:left;}
.st-quick-btn:hover{border-color:#c0392b;color:#c0392b;background:#fff8f6;}
.st-quick-icon{font-size:16px;}
.st-danger-card{background:#fff;border-radius:16px;padding:24px;border:1.5px solid rgba(239,68,68,0.2);box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.st-danger-title{font-size:15px;font-weight:800;color:#ef4444;margin-bottom:8px;}
.st-danger-btn{background:transparent;border:1.5px solid rgba(239,68,68,0.3);color:#ef4444;padding:11px 20px;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;}
.st-danger-btn:hover{background:#fee2e2;}
@media(max-width:700px){.st-body{grid-template-columns:1fr;}.st-sidebar{position:static;}.st-perks-grid{grid-template-columns:1fr 1fr;}.st-quick-grid{grid-template-columns:1fr 1fr;}}
`
