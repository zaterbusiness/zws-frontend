import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'   // ← UPDATE THIS IMPORT

async function checkUrlLive(url) {
  try {
    const res = await api.get(`/hosting/check-live?url=${encodeURIComponent(url)}`)
    return res.live
  } catch {
    return false
  }
}

export default function DeploymentsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [githubSites, setGithubSites] = useState([])
  const [hostedSites, setHostedSites] = useState([])
  const [aiApps,      setAiApps]      = useState([])   // ← NEW
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')
  const [copied,      setCopied]      = useState(null)
  const [siteStatus,  setSiteStatus]  = useState({})
  const [tab,         setTab]         = useState('github')
const [versionsByProject, setVersionsByProject] = useState({})
  const fetchAll = useCallback(async () => {
    try {
      const hostRes = await api.get('/hosting/my-sites')

// Per-version GitHub URLs (failure here must not break the page)
api.get('/hosting/site-versions')
  .then(d => setVersionsByProject(d.versions || {}))
  .catch(() => {})
      // GitHub Sites
      const ghSites = hostRes.githubSites || []
      setGithubSites(ghSites)
      ghSites.forEach(p => {
        const key = `gh_${p.id}`
        setSiteStatus(prev => ({ ...prev, [key]: 'checking' }))
        checkUrlLive(p.github_url).then(live =>
          setSiteStatus(prev => ({ ...prev, [key]: live ? 'live' : 'pending' }))
        )
      })

      // Zater Hosted Sites
      const sites = hostRes.sites || []
      setHostedSites(sites)
      sites.forEach(s => {
        const url = `https://${s.hosted_subdomain}`
        const key = `zws_${s.id}`
        setSiteStatus(prev => ({ ...prev, [key]: 'checking' }))
        checkUrlLive(url).then(live =>
          setSiteStatus(prev => ({ ...prev, [key]: live ? 'live' : 'pending' }))
        )
      })

      // AI-Generated Apps (deployed via /apps/:id/deploy)          // ← NEW
      const apps = hostRes.apps || []
      setAiApps(apps)
      apps.forEach(a => {
        const key = `app_${a.id}`
        setSiteStatus(prev => ({ ...prev, [key]: 'checking' }))
        checkUrlLive(a.deploy_url).then(live =>
          setSiteStatus(prev => ({ ...prev, [key]: live ? 'live' : 'pending' }))
        )
      })
    } catch (err) {
      setError(err.message || 'Failed to load deployments.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const retryCheck = (key, url) => {
    setSiteStatus(prev => ({ ...prev, [key]: 'checking' }))
    checkUrlLive(url).then(live =>
      setSiteStatus(prev => ({ ...prev, [key]: live ? 'live' : 'pending' }))
    )
  }

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url).catch(() => {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const totalCount = githubSites.length + hostedSites.length + aiApps.length   // ← UPDATED

  return (
    <>
      <style>{CSS}</style>
      <div className="dp-root">

        {/* ── HEADER ── */}
        <div className="dp-header">
          <button className="dp-back" onClick={() => navigate('/')}>← Home</button>
          <div>
            <h1 className="dp-title">🚀 My Deployments</h1>
            <p className="dp-sub">
              {loading ? 'Loading your deployed sites…'
                : totalCount === 0 ? 'No sites deployed yet'
                : `${totalCount} site${totalCount !== 1 ? 's' : ''} deployed`}
            </p>
          </div>
          <button className="dp-new-btn" onClick={() => navigate('/')}>+ Deploy New Site</button>
        </div>

        {/* ── TABS ── */}
        {!loading && totalCount > 0 && (
          <div className="dp-tabs">
            <button
              className={`dp-tab ${tab === 'github' ? 'dp-tab-active' : ''}`}
              onClick={() => setTab('github')}
            >
              🐙 GitHub Pages
              {githubSites.length > 0 && <span className="dp-tab-count">{githubSites.length}</span>}
            </button>
            
            {/* ── NEW TAB ── */}
            <button
              className={`dp-tab ${tab === 'apps' ? 'dp-tab-active' : ''}`}
              onClick={() => setTab('apps')}
            >
              🤖 AI Apps
              {aiApps.length > 0 && <span className="dp-tab-count dp-tab-count-blue">{aiApps.length}</span>}
            </button>
          </div>
        )}

        {/* ── ERROR ── */}
        {error && (
          <div className="dp-error">
            {error}
            <button onClick={() => setError('')} className="dp-err-x">✕</button>
          </div>
        )}

        {/* ── LOADING ── */}
        {loading && (
          <div className="dp-loading">
            <div className="dp-spinner" />
            <p>Loading your deployments…</p>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && totalCount === 0 && (
          <div className="dp-empty">
            <div className="dp-empty-icon">🚀</div>
            <h3 className="dp-empty-title">No deployments yet</h3>
            <p className="dp-empty-desc">
              Deploy to GitHub Pages for free, host on Zater with a custom subdomain for ₹499,
              or deploy an AI-generated app.
            </p>
            <div className="dp-empty-actions">
              <button className="dp-empty-btn dp-empty-btn-red" onClick={() => navigate('/')}>⚡ Generate a Website</button>
              <button className="dp-empty-btn dp-empty-btn-outline" onClick={() => navigate('/projects')}>📁 My Projects</button>
            </div>
          </div>
        )}

        {/* ══════════════════ GITHUB PAGES TAB ══════════════════ */}
        {!loading && tab === 'github' && (
          githubSites.length === 0 ? (
            <div className="dp-tab-empty">
              <div className="dp-tab-empty-icon">🐙</div>
              <p className="dp-tab-empty-title">No GitHub Pages deployments yet</p>
              {isAdmin ? (
                <>
                  <p className="dp-tab-empty-desc">
                    Connect the admin GitHub account in Settings, then deploy any project for free.
                  </p>
                  <div className="dp-empty-actions" style={{ marginTop: 8 }}>
                    <button className="dp-empty-btn dp-empty-btn-red" onClick={() => navigate('/')}>⚡ Deploy Now</button>
                    <button className="dp-empty-btn dp-empty-btn-outline" onClick={() => navigate('/settings?tab=github')}>
                      🐙 Connect GitHub
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="dp-tab-empty-desc">
                    Deploy any project to GitHub Pages for free — no account needed.
                  </p>
                  <div className="dp-empty-actions" style={{ marginTop: 8 }}>
                    <button className="dp-empty-btn dp-empty-btn-red" onClick={() => navigate('/')}>⚡ Deploy Now</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="dp-info-banner">
                <span>ℹ️</span>
                <span>
                  <strong>GitHub Pages</strong> — free hosting on GitHub.
                  New sites take <strong>1–3 minutes</strong> to go live.
                </span>
              </div>
              <div className="dp-grid">
                {githubSites.map(p => {
                  const key    = `gh_${p.id}`
                  const status = siteStatus[key] || 'checking'
                  const isLive = status === 'live'
                  const isPend = status === 'pending'

                  return (
                    <div key={p.id} className="dp-card">
                      <div className="dp-card-top">
                        <div className="dp-card-badges">
                          <span className="dp-platform-badge dp-platform-github">🐙 GitHub Pages</span>
                          <StatusBadge status={status} />
                        </div>
                        <span className="dp-date">
                          {new Date(p.updated_at || p.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h3 className="dp-card-title">{p.title}</h3>

                      <div className="dp-detail-box">
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Platform</span>
                          <span className="dp-detail-value">GitHub Pages (Free)</span>
                        </div>
                     {p.github_repo && (
  <div className="dp-detail-row">
    <span className="dp-detail-label">Repository</span>
    <a
      href={`https://github.com/${p.github_repo}`}
      target="_blank" rel="noopener noreferrer"
      className="dp-detail-value dp-detail-link dp-mono"
    >
      {p.github_repo}
    </a>
  </div>
)}
                        {p.template_name && (
                          <div className="dp-detail-row">
                            <span className="dp-detail-label">Template</span>
                            <span className="dp-detail-value dp-mono">{p.template_name}</span>
                          </div>
                        )}
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Live URL</span>
                          <span className="dp-detail-value dp-mono" style={{ color: '#2563eb' }}>
                            {p.github_url}
                          </span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Status</span>
                          <span className={`dp-detail-value dp-detail-status ${
                            isLive ? 'dp-text-green' : isPend ? 'dp-text-amber' : 'dp-text-gray'
                          }`}>
                            {isLive ? '● Live' : isPend ? '⏳ Pending' : '○ Checking…'}
                          </span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Deployed</span>
                          <span className="dp-detail-value">
                            {new Date(p.updated_at || p.created_at).toLocaleString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
{(versionsByProject[p.id] || []).length > 0 && (
  <div className="dp-versions">
    <div className="dp-versions-title">
      🕘 Deployed versions
      <span className="dp-versions-count">{versionsByProject[p.id].length}</span>
    </div>
    {versionsByProject[p.id].map(v => {
      const copyId = `v_${p.id}_${v.version_no}`
      const isCurrentUrl = p.github_url && v.github_url.replace(/v\d+\/$/, '') === p.github_url
      return (
        <div key={v.version_no} className="dp-version-row">
          <div className="dp-version-main">
            <div className="dp-version-head">
              <span className="dp-version-tag">v{v.version_no}</span>
              {v.deployed_at && (
                <span className="dp-version-date">
                  {new Date(v.deployed_at).toLocaleString('en-IN', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              )}
            </div>
            <a href={v.github_url} target="_blank" rel="noopener noreferrer" className="dp-version-url">
              {v.github_url} ↗
            </a>
          </div>
          <button
            className={`dp-version-copy ${copied === copyId ? 'dp-version-copied' : ''}`}
            onClick={() => handleCopy(v.github_url, copyId)}
          >
            {copied === copyId ? '✅' : '📋'}
          </button>
        </div>
      )
    })}
  </div>
)}
                      
                       

                      {isPend && (
                        <div className="dp-pending-notice">
                          ⏳ GitHub Pages is still building. Usually ready in 1–3 minutes.
                          <button className="dp-recheck-btn" onClick={() => retryCheck(key, p.github_url)}>🔄 Re-check</button>
                        </div>
                      )}

                      {isLive && p.generated_html && (
                        <div className="dp-preview-wrap">
                          <div className="dp-preview-bar">
                            <div className="dp-preview-dots">
                              <span style={{ background: '#ef4444' }} />
                              <span style={{ background: '#f59e0b' }} />
                              <span style={{ background: '#22c55e' }} />
                            </div>
                            <div className="dp-preview-url">{p.github_url}</div>
                          </div>
                          <div className="dp-iframe-clip">
                            <iframe
                              srcDoc={p.generated_html}
                              title={p.title}
                              className="dp-iframe"
                              sandbox="allow-scripts"
                              scrolling="no"
                            />
                          </div>
                          <div className="dp-preview-overlay">
                            <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="dp-preview-visit">
                              Visit Live Site ↗
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="dp-actions">
                        {isLive
                          ? <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="dp-btn dp-btn-green">🌐 Visit Site</a>
                          : <button className="dp-btn dp-btn-gray" disabled>🌐 Not Live Yet</button>
                        }
                        <button
                          className={`dp-btn ${copied === p.id ? 'dp-btn-copied' : 'dp-btn-outline'}`}
                          onClick={() => handleCopy(p.github_url, p.id)}
                        >
                          {copied === p.id ? '✅ Copied!' : '📋 Copy URL'}
                        </button>
                        <button className="dp-btn dp-btn-dark" onClick={() => navigate(`/project/${p.id}`)}>
                          👁️ View Project
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )
        )}

        {/* ══════════════════ ZATER HOSTING TAB ══════════════════ */}
        {!loading && tab === 'zater' && (
          hostedSites.length === 0 ? (
            <div className="dp-tab-empty">
              <div className="dp-tab-empty-icon">⚡</div>
              <p className="dp-tab-empty-title">No Zater Hosting yet</p>
              <p className="dp-tab-empty-desc">
                Host on Zater with a custom subdomain for ₹499. Go to your projects to get started.
              </p>
              <button
                className="dp-empty-btn dp-empty-btn-purple"
                style={{ marginTop: 8 }}
                onClick={() => navigate('/projects')}
              >📁 Go to Projects</button>
            </div>
          ) : (
            <>
              <div className="dp-info-banner dp-info-banner-purple">
                <span>⚡</span>
                <span><strong>Zater Hosting</strong> — your sites are live on our servers with a custom subdomain.</span>
              </div>
              <div className="dp-grid">
                {hostedSites.map(s => {
                  const key    = `zws_${s.id}`
                  const url    = `https://${s.hosted_subdomain}`
                  const status = siteStatus[key] || 'checking'
                  const isLive = status === 'live'
                  const isPend = status === 'pending'

                  return (
                    <div key={s.id} className="dp-card dp-card-zater">
                      <div className="dp-card-top">
                        <div className="dp-card-badges">
                          <span className="dp-platform-badge dp-platform-zater">⚡ Zater Hosting</span>
                          <StatusBadge status={status} />
                        </div>
                        <span className="dp-date">
                          {new Date(s.hosted_at || s.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h3 className="dp-card-title">{s.title}</h3>

                      <div className="dp-detail-box dp-detail-box-purple">
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Platform</span>
                          <span className="dp-detail-value">
                            Zater Hosting <span className="dp-paid-chip">₹499 Paid</span>
                          </span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Subdomain</span>
                          <span className="dp-detail-value dp-mono">{s.hosted_subdomain}</span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Full URL</span>
                          <span className="dp-detail-value dp-mono" style={{ color: '#7c3aed' }}>{url}</span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Status</span>
                          <span className={`dp-detail-value dp-detail-status ${
                            isLive ? 'dp-text-green' : isPend ? 'dp-text-amber' : 'dp-text-gray'
                          }`}>
                            {isLive ? '● Live' : isPend ? '⏳ Pending' : '○ Checking…'}
                          </span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Hosted on</span>
                          <span className="dp-detail-value">
                            {s.hosted_at
                              ? new Date(s.hosted_at).toLocaleString('en-IN', {
                                  day: 'numeric', month: 'short', year: 'numeric',
                                  hour: '2-digit', minute: '2-digit',
                                })
                              : '—'}
                          </span>
                        </div>
                      </div>

                      <a href={url} target="_blank" rel="noopener noreferrer" className="dp-url-row dp-url-row-purple">
                        <span className="dp-url-icon">🌐</span>
                        <span className="dp-url-text">{url}</span>
                        <span className="dp-url-arrow" style={{ color: '#7c3aed' }}>↗</span>
                      </a>

                      {isPend && (
                        <div className="dp-pending-notice">
                          ⏳ Site may still be propagating.
                          <button className="dp-recheck-btn" onClick={() => retryCheck(key, url)}>🔄 Re-check</button>
                        </div>
                      )}

                      <div className="dp-actions">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="dp-btn dp-btn-purple">🌐 Visit Site</a>
                        <button
                          className={`dp-btn ${copied === s.id ? 'dp-btn-copied' : 'dp-btn-outline'}`}
                          onClick={() => handleCopy(url, s.id)}
                        >
                          {copied === s.id ? '✅ Copied!' : '📋 Copy URL'}
                        </button>
                        <button className="dp-btn dp-btn-dark" onClick={() => navigate(`/project/${s.id}`)}>
                          👁️ View Project
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )
        )}

        {/* ══════════════════ AI APPS TAB (NEW) ══════════════════ */}
        {!loading && tab === 'apps' && (
          aiApps.length === 0 ? (
            <div className="dp-tab-empty">
              <div className="dp-tab-empty-icon">🤖</div>
              <p className="dp-tab-empty-title">No AI Apps deployed yet</p>
              <p className="dp-tab-empty-desc">
                Generate a full-stack app and hit Deploy from the app page to see it here.
              </p>
              <button
                className="dp-empty-btn dp-empty-btn-blue"
                style={{ marginTop: 8 }}
                onClick={() => navigate('/apps')}
              >🤖 Go to My Apps</button>
            </div>
          ) : (
            <>
              <div className="dp-info-banner dp-info-banner-blue">
                <span>🤖</span>
                <span><strong>AI Apps</strong> — full-stack apps generated and deployed straight from your prompt.</span>
              </div>
              <div className="dp-grid">
                {aiApps.map(a => {
                  const key    = `app_${a.id}`
                  const url    = a.deploy_url
                  const status = siteStatus[key] || 'checking'
                  const isLive = status === 'live'
                  const isPend = status === 'pending'

                  return (
                    <div key={a.id} className="dp-card dp-card-apps">
                      <div className="dp-card-top">
                        <div className="dp-card-badges">
                          <span className="dp-platform-badge dp-platform-apps">🤖 AI Generated App</span>
                          <StatusBadge status={status} />
                        </div>
                        <span className="dp-date">
                          {new Date(a.updated_at || a.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h3 className="dp-card-title">{a.title}</h3>

                      <div className="dp-detail-box dp-detail-box-blue">
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Prompt</span>
                          <span className="dp-detail-value" style={{ fontStyle: 'italic' }}>
                            "{(a.prompt || '').slice(0, 90)}{a.prompt?.length > 90 ? '…' : ''}"
                          </span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Live URL</span>
                          <span className="dp-detail-value dp-mono" style={{ color: '#0284c7' }}>{url}</span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Status</span>
                          <span className={`dp-detail-value dp-detail-status ${
                            isLive ? 'dp-text-green' : isPend ? 'dp-text-amber' : 'dp-text-gray'
                          }`}>
                            {isLive ? '● Live' : isPend ? '⏳ Pending' : '○ Checking…'}
                          </span>
                        </div>
                        <div className="dp-detail-row">
                          <span className="dp-detail-label">Deployed</span>
                          <span className="dp-detail-value">
                            {new Date(a.updated_at || a.created_at).toLocaleString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>

                      <a href={url} target="_blank" rel="noopener noreferrer" className="dp-url-row dp-url-row-blue">
                        <span className="dp-url-icon">🌐</span>
                        <span className="dp-url-text">{url}</span>
                        <span className="dp-url-arrow" style={{ color: '#0284c7' }}>↗</span>
                      </a>

                      {isPend && (
                        <div className="dp-pending-notice">
                          ⏳ Site may still be propagating.
                          <button className="dp-recheck-btn" onClick={() => retryCheck(key, url)}>🔄 Re-check</button>
                        </div>
                      )}

                      <div className="dp-actions">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="dp-btn dp-btn-blue">🌐 Visit Site</a>
                        <button
                          className={`dp-btn ${copied === a.id ? 'dp-btn-copied' : 'dp-btn-outline'}`}
                          onClick={() => handleCopy(url, a.id)}
                        >
                          {copied === a.id ? '✅ Copied!' : '📋 Copy URL'}
                        </button>
                        <button className="dp-btn dp-btn-dark" onClick={() => navigate(`/apps/${a.id}`)}>
                          👁️ View App
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )
        )}

      </div>
    </>
  )
}

function StatusBadge({ status }) {
  if (status === 'checking') return <span className="dp-badge dp-badge-checking"><span className="dp-badge-spinner" /> Checking…</span>
  if (status === 'live')     return <span className="dp-badge dp-badge-live"><span className="dp-live-dot" /> Live</span>
  return <span className="dp-badge dp-badge-pending">⏳ Pending</span>
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes dotPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)}}
.dp-versions{background:#f8f8fc;border:1.5px solid #e8e8f2;border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;}
.dp-versions-title{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:.4px;}
.dp-versions-count{background:#0a0a12;color:#fff;font-size:10px;font-weight:800;padding:1px 7px;border-radius:100px;}
.dp-version-row{display:flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e2e2ea;border-radius:9px;padding:8px 10px;}
.dp-version-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;}
.dp-version-head{display:flex;align-items:center;gap:8px;}
.dp-version-tag{background:rgba(91,79,255,.1);color:#5b4fff;font-size:10px;font-weight:800;padding:2px 8px;border-radius:100px;}
.dp-version-date{font-size:10px;color:#a0a0b0;font-weight:600;}
.dp-version-url{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#2563eb;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.dp-version-url:hover{text-decoration:underline;}
.dp-version-copy{background:#fff;border:1.5px solid #e2e2ea;border-radius:7px;padding:5px 8px;font-size:12px;cursor:pointer;transition:all .15s;flex-shrink:0;}
.dp-version-copy:hover{border-color:#0a0a12;}
.dp-version-copied{background:rgba(34,197,94,.1);border-color:rgba(34,197,94,.3);}
.dp-root{font-family:'Nunito',sans-serif;max-width:1100px;margin:0 auto;padding:40px 24px 80px;color:#0a0a12;}

.dp-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;gap:16px;flex-wrap:wrap;}
.dp-back{padding:8px 14px;border-radius:8px;background:transparent;border:1.5px solid #e2e2ea;font-size:12px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;white-space:nowrap;align-self:center;}
.dp-back:hover{border-color:#c0392b;color:#c0392b;}
.dp-title{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#0a0a12;letter-spacing:-1px;margin-bottom:4px;}
.dp-sub{font-size:14px;color:#72727f;font-weight:500;}
.dp-new-btn{background:#c0392b;color:#fff;border:none;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;box-shadow:0 2px 10px rgba(192,57,43,.3);transition:all .18s;white-space:nowrap;align-self:center;}
.dp-new-btn:hover{opacity:.88;transform:translateY(-1px);}

.dp-tabs{display:flex;gap:0;margin-bottom:28px;border-bottom:2px solid #e2e2ea;}
.dp-tab{display:flex;align-items:center;gap:7px;padding:11px 20px;border:none;background:transparent;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;color:#72727f;cursor:pointer;border-bottom:2.5px solid transparent;margin-bottom:-2px;transition:all .18s;border-radius:8px 8px 0 0;}
.dp-tab:hover{color:#0a0a12;background:#f4f4f8;}
.dp-tab-active{color:#c0392b;border-bottom-color:#c0392b;background:#fff8f6;}
.dp-tab-count{background:#c0392b;color:#fff;font-size:10px;font-weight:800;padding:2px 7px;border-radius:100px;}
.dp-tab-count-purple{background:#7c3aed;}
.dp-tab-count-blue{background:#0284c7;}

.dp-info-banner{display:flex;align-items:flex-start;gap:10px;background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:12px 16px;font-size:13px;color:#92400e;font-weight:500;margin-bottom:20px;line-height:1.55;}
.dp-info-banner-purple{background:#f5f3ff;border-color:#c4b5fd;color:#5b21b6;}
.dp-info-banner-blue{background:#eff6ff;border-color:#93c5fd;color:#1e40af;}

.dp-error{background:rgba(239,68,68,.06);border:1.5px solid rgba(239,68,68,.2);border-radius:10px;padding:12px 16px;font-size:13px;color:#dc2626;font-weight:600;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.dp-err-x{background:none;border:none;color:#dc2626;font-size:16px;font-weight:800;cursor:pointer;padding:0;}

.dp-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 0;color:#a0a0b0;font-size:14px;font-weight:600;}
.dp-spinner{width:36px;height:36px;border:3px solid #e2e2ea;border-top-color:#c0392b;border-radius:50%;animation:spin 1s linear infinite;}

.dp-empty{text-align:center;padding:80px 20px;display:flex;flex-direction:column;align-items:center;gap:16px;animation:fadeUp .4s ease;}
.dp-empty-icon{font-size:64px;line-height:1;}
.dp-empty-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:800;color:#0a0a12;}
.dp-empty-desc{font-size:14px;color:#72727f;font-weight:500;max-width:420px;line-height:1.65;}
.dp-empty-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px;}
.dp-empty-btn{padding:11px 22px;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;border:none;transition:all .18s;}
.dp-empty-btn-red{background:#c0392b;color:#fff;box-shadow:0 2px 10px rgba(192,57,43,.3);}
.dp-empty-btn-red:hover{opacity:.88;transform:translateY(-1px);}
.dp-empty-btn-purple{background:#7c3aed;color:#fff;box-shadow:0 2px 10px rgba(124,58,237,.25);}
.dp-empty-btn-purple:hover{opacity:.88;transform:translateY(-1px);}
.dp-empty-btn-blue{background:#0284c7;color:#fff;box-shadow:0 2px 10px rgba(2,132,199,.25);}
.dp-empty-btn-blue:hover{opacity:.88;transform:translateY(-1px);}
.dp-empty-btn-outline{background:#fff;color:#0a0a12;border:1.5px solid #e2e2ea;}
.dp-empty-btn-outline:hover{border-color:#0a0a12;}

.dp-tab-empty{text-align:center;padding:60px 20px;display:flex;flex-direction:column;align-items:center;gap:10px;animation:fadeUp .4s ease;}
.dp-tab-empty-icon{font-size:48px;line-height:1;}
.dp-tab-empty-title{font-size:16px;font-weight:800;color:#0a0a12;}
.dp-tab-empty-desc{font-size:13px;color:#72727f;font-weight:500;max-width:360px;line-height:1.6;}

.dp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px;}

.dp-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:12px;transition:all .22s;animation:fadeUp .35s ease;}
.dp-card:hover{border-color:#c0392b;box-shadow:0 10px 36px rgba(0,0,0,.09);transform:translateY(-3px);}
.dp-card-zater:hover{border-color:#7c3aed;}
.dp-card-apps:hover{border-color:#0284c7;}

.dp-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
.dp-card-badges{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}

.dp-platform-badge{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:800;padding:3px 9px;border-radius:100px;}
.dp-platform-github{background:#f0f0f0;color:#24292e;border:1.5px solid #d0d7de;}
.dp-platform-zater{background:#f5f3ff;color:#5b21b6;border:1.5px solid #c4b5fd;}
.dp-platform-apps{background:#eff6ff;color:#1e40af;border:1.5px solid #93c5fd;}

.dp-badge{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:800;padding:3px 9px;border-radius:100px;}
.dp-badge-live{background:rgba(34,197,94,.1);border:1.5px solid rgba(34,197,94,.3);color:#15803d;}
.dp-badge-pending{background:rgba(251,191,36,.12);border:1.5px solid rgba(251,191,36,.4);color:#92400e;}
.dp-badge-checking{background:rgba(100,116,139,.08);border:1.5px solid rgba(100,116,139,.2);color:#64748b;}
.dp-badge-spinner{display:inline-block;width:8px;height:8px;border:1.5px solid #94a3b8;border-top-color:#475569;border-radius:50%;animation:spin .8s linear infinite;}
.dp-live-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:dotPulse 2s ease-in-out infinite;}
.dp-date{font-size:11px;color:#a0a0b0;font-weight:600;white-space:nowrap;}

.dp-card-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#0a0a12;line-height:1.3;}

.dp-detail-box{background:#f8f8fc;border:1.5px solid #e8e8f2;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;}
.dp-detail-box-purple{background:#faf5ff;border-color:#e9d5ff;}
.dp-detail-box-blue{background:#f0f9ff;border-color:#bae6fd;}
.dp-detail-row{display:flex;align-items:baseline;gap:8px;font-size:12px;}
.dp-detail-label{color:#a0a0b0;font-weight:700;min-width:80px;flex-shrink:0;font-size:11px;text-transform:uppercase;letter-spacing:.4px;}
.dp-detail-value{color:#3a3a4a;font-weight:600;word-break:break-all;line-height:1.4;}
.dp-detail-link{color:#2563eb;text-decoration:none;}
.dp-detail-link:hover{text-decoration:underline;}
.dp-detail-status{font-weight:800;}
.dp-mono{font-family:'JetBrains Mono',monospace;font-size:11px;}
.dp-text-green{color:#15803d;}
.dp-text-amber{color:#92400e;}
.dp-text-gray{color:#94a3b8;}
.dp-paid-chip{background:rgba(34,197,94,.12);color:#15803d;border:1px solid rgba(34,197,94,.3);font-size:10px;font-weight:800;padding:1px 7px;border-radius:100px;margin-left:4px;vertical-align:middle;}

.dp-url-row{display:flex;align-items:center;gap:8px;background:#f4f4f8;border:1.5px solid #e2e2ea;border-radius:10px;padding:9px 12px;text-decoration:none;transition:all .18s;cursor:pointer;}
.dp-url-row:hover:not(.dp-url-row-disabled){border-color:#c0392b;background:#fff8f6;}
.dp-url-row-purple:hover:not(.dp-url-row-disabled){border-color:#7c3aed!important;background:#faf5ff!important;}
.dp-url-row-blue:hover:not(.dp-url-row-disabled){border-color:#0284c7!important;background:#f0f9ff!important;}
.dp-url-row-disabled{opacity:.6;cursor:not-allowed;}
.dp-url-icon{font-size:13px;flex-shrink:0;}
.dp-url-text{font-family:'JetBrains Mono',monospace;font-size:11px;color:#3a3a4a;font-weight:500;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.dp-url-arrow{font-size:12px;color:#c0392b;font-weight:800;flex-shrink:0;}

.dp-pending-notice{background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:10px 14px;font-size:12px;color:#92400e;line-height:1.55;display:flex;flex-direction:column;gap:7px;}
.dp-recheck-btn{align-self:flex-start;background:#fff;border:1.5px solid #fbbf24;color:#92400e;padding:4px 12px;border-radius:7px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.dp-recheck-btn:hover{background:#fef3c7;}

.dp-preview-wrap{position:relative;border-radius:12px;overflow:hidden;border:1.5px solid #e2e2ea;background:#f0f0f8;}
.dp-preview-bar{display:flex;align-items:center;gap:7px;padding:7px 12px;background:#fff;border-bottom:1px solid #e8e8f0;}
.dp-preview-dots{display:flex;gap:4px;}
.dp-preview-dots span{width:8px;height:8px;border-radius:50%;display:block;}
.dp-preview-url{font-family:'JetBrains Mono',monospace;font-size:9px;color:#a0a0b0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.dp-iframe-clip{height:180px;overflow:hidden;position:relative;}
.dp-iframe{width:200%;height:200%;border:none;transform:scale(.5);transform-origin:top left;pointer-events:none;}
.dp-preview-overlay{position:absolute;inset:0;top:30px;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background .2s;}
.dp-card:hover .dp-preview-overlay{background:rgba(0,0,0,.42);}
.dp-preview-visit{background:#fff;color:#0a0a12;padding:8px 18px;border-radius:8px;font-size:12px;font-weight:800;font-family:'Nunito',sans-serif;text-decoration:none;opacity:0;transform:translateY(6px);transition:all .2s;}
.dp-card:hover .dp-preview-visit{opacity:1;transform:translateY(0);}

.dp-actions{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;}
.dp-btn{padding:9px 6px;border-radius:9px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;border:none;transition:all .18s;text-align:center;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;}
.dp-btn-green{background:#22c55e;color:#fff;box-shadow:0 2px 8px rgba(34,197,94,.25);}
.dp-btn-green:hover{opacity:.88;transform:translateY(-1px);}
.dp-btn-purple{background:#7c3aed;color:#fff;box-shadow:0 2px 8px rgba(124,58,237,.25);}
.dp-btn-purple:hover{opacity:.88;transform:translateY(-1px);}
.dp-btn-blue{background:#0284c7;color:#fff;box-shadow:0 2px 8px rgba(2,132,199,.25);}
.dp-btn-blue:hover{opacity:.88;transform:translateY(-1px);}
.dp-btn-gray{background:#e2e2ea;color:#a0a0b0;cursor:not-allowed;}
.dp-btn-outline{background:#fff;color:#0a0a12;border:1.5px solid #e2e2ea;}
.dp-btn-outline:hover{border-color:#0a0a12;background:#fafafa;}
.dp-btn-copied{background:rgba(34,197,94,.1);color:#15803d;border:1.5px solid rgba(34,197,94,.3);}
.dp-btn-dark{background:#0a0a12;color:#fff;}
.dp-btn-dark:hover{background:#c0392b;}
/* ───────── OVERFLOW FIX (must stay last) ───────── */
html,body{max-width:100%;overflow-x:hidden;}

.dp-root{width:100%;min-width:0;}

/* let grid columns shrink below their content width */
.dp-grid{grid-template-columns:repeat(auto-fill,minmax(min(340px,100%),1fr));}
@media(max-width:700px){
  .dp-grid{grid-template-columns:minmax(0,1fr);}
}

/* every flex/grid child in the card must be allowed to shrink */
.dp-card,
.dp-card > *,
.dp-detail-box,
.dp-detail-row,
.dp-versions,
.dp-version-row,
.dp-version-main,
.dp-url-row{min-width:0;max-width:100%;}

/* long URLs wrap instead of stretching the card */
.dp-detail-value,
.dp-detail-link,
.dp-card-title,
.dp-pending-notice{overflow-wrap:anywhere;word-break:break-word;}

/* the live URL span has mono + break-all, make sure it is block level */
.dp-detail-value{display:block;max-width:100%;}
.dp-detail-row > .dp-detail-value{flex:1;min-width:0;}

/* version links: single line with ellipsis */
.dp-version-url{display:block;min-width:0;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

/* header must not overflow */
@media(max-width:700px){
  .dp-header{width:100%;}
  .dp-header > *{min-width:0;}
  .dp-new-btn{white-space:nowrap;max-width:100%;}
  .dp-title{overflow-wrap:anywhere;}
}
/* ───────── TABLET ───────── */
@media(max-width:900px){
  .dp-root{padding:28px 18px 70px;}
  .dp-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;}
  .dp-title{font-size:28px;}
}

/* ───────── MOBILE ───────── */
@media(max-width:700px){
  .dp-root{padding:18px 14px 60px;}

  /* header: back + button on one row, title below */
  .dp-header{display:grid;grid-template-columns:auto 1fr;grid-template-areas:"back new" "title title";gap:12px;align-items:center;margin-bottom:20px;}
  .dp-back{grid-area:back;justify-self:start;}
  .dp-new-btn{grid-area:new;justify-self:end;padding:9px 14px;font-size:12px;}
  .dp-header > div{grid-area:title;}
  .dp-title{font-size:24px;letter-spacing:-.5px;}
  .dp-sub{font-size:13px;}

  /* tabs scroll sideways instead of wrapping */
  .dp-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;margin-bottom:20px;}
  .dp-tabs::-webkit-scrollbar{display:none;}
  .dp-tab{padding:10px 14px;font-size:12px;white-space:nowrap;flex-shrink:0;}

  .dp-info-banner{font-size:12px;padding:10px 12px;margin-bottom:16px;}

  /* single column cards */
  .dp-grid{grid-template-columns:1fr;gap:14px;}
  .dp-card{padding:14px;gap:10px;border-radius:14px;}
  .dp-card:hover{transform:none;}
  .dp-card-title{font-size:16px;}

  /* header row of card: date drops under the badges */
  .dp-card-top{flex-direction:column;gap:6px;}

  /* detail rows stack: label above value */
  .dp-detail-box{padding:10px 12px;gap:10px;}
  .dp-detail-row{flex-direction:column;align-items:flex-start;gap:2px;}
  .dp-detail-label{min-width:0;}
  .dp-detail-value{font-size:12px;}
  .dp-mono{font-size:10.5px;}

  .dp-url-row{padding:9px 10px;}
  .dp-url-text{font-size:10.5px;}

  /* versions list */
  .dp-versions{padding:9px 10px;}
  .dp-version-row{padding:8px;}
  .dp-version-head{flex-wrap:wrap;gap:4px 8px;}
  .dp-version-url{font-size:10px;}
  .dp-version-copy{padding:7px 10px;}

  /* preview is smaller; overlay must not block taps */
  .dp-iframe-clip{height:150px;}
  .dp-preview-overlay{display:none;}

  /* actions: Visit full width, other two side by side */
  .dp-actions{grid-template-columns:1fr 1fr;gap:8px;}
  .dp-actions > :first-child{grid-column:1 / -1;}
  .dp-btn{padding:11px 6px;font-size:12px;min-height:42px;}

  /* empty states */
  .dp-empty{padding:50px 10px;}
  .dp-empty-icon{font-size:52px;}
  .dp-empty-title{font-size:20px;}
  .dp-empty-actions{flex-direction:column;width:100%;max-width:300px;}
  .dp-empty-btn{width:100%;}
  .dp-tab-empty{padding:40px 10px;}
}

/* ───────── SMALL PHONES ───────── */
@media(max-width:380px){
  .dp-root{padding:14px 10px 50px;}
  .dp-title{font-size:21px;}
  .dp-new-btn{font-size:11px;padding:8px 11px;}
  .dp-card{padding:12px;}
  .dp-actions{grid-template-columns:1fr;}
  .dp-actions > :first-child{grid-column:auto;}
}

/* ───────── TOUCH DEVICES: no hover-only UI ───────── */
@media(hover:none){
  .dp-card:hover{transform:none;box-shadow:none;}
  .dp-preview-overlay{display:none;}
}
`