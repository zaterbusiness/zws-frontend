import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function ProjectPage() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  
  const iframeRef = useRef(null)

  const [project,     setProject]    = useState(null)
  const [loading,     setLoading]    = useState(true)
  // paying state removed — download & hosting are free, no payment flow
  const [success,     setSuccess]    = useState('')
  const [error,       setError]      = useState('')
  const [polling,     setPolling]    = useState(false)
  const [isFullscreen,setFullscreen] = useState(false)
const { user, setUser } = useAuth()   // add setUser
  // After-payment choice modal
  const [choiceOpen,  setChoiceOpen] = useState(false)

  // GitHub deploy state
  const [ghDeploying, setGhDeploying]= useState(false)

  // Edit / regen / delete
  const [editOpen,    setEditOpen]   = useState(false)
  const [editTitle,   setEditTitle]  = useState('')
  const [editSaving,  setEditSaving] = useState(false)
  const [regenOpen,   setRegenOpen]  = useState(false)
  const [regenPrm,    setRegenPrm]   = useState('')
  const [regenBusy,   setRegenBusy]  = useState(false)
  const [delOpen,     setDelOpen]    = useState(false)
  const [delLoading,  setDelLoading] = useState(false)
const [currentStep, setCurrentStep] = useState('')

  const fetchProject = useCallback(async () => {
    try {
      const d = await api.get(`/projects/${id}`)
      setProject(d.project); return d.project
    } catch (err) { setError(err.message); return null }
    finally { setLoading(false) }
  }, [id])

useEffect(() => {
  let iv
  fetchProject().then(p => {
    if (p?.status === 'generating') {
      setPolling(true)
      setCurrentStep(p?.current_step || 'Starting generation...')
      iv = setInterval(async () => {
        try {
          const s = await api.get(`/projects/${id}/status`)
          if (s.current_step) setCurrentStep(s.current_step)
          if (s.status !== 'generating') { clearInterval(iv); setPolling(false); fetchProject() }
        } catch {}
      }, 2000)
    }
  })
  return () => clearInterval(iv)
}, [fetchProject, id])


  // Edit title
  const saveEdit = async () => {
    if (!editTitle.trim()) return
    setEditSaving(true)
    try {
      await api.put(`/projects/${id}`, { title: editTitle.trim() })
      setProject(p => ({ ...p, title: editTitle.trim() }))
      setEditOpen(false); setSuccess('Title updated!')
    } catch (err) { setError(err.message) }
    finally { setEditSaving(false) }
  }

  // Regenerate
  const startRegen = async () => {
    setRegenBusy(true)
    try {
      await api.post(`/projects/${id}/regenerate`, { prompt: regenPrm.trim() })
      setRegenOpen(false)
      setProject(p => ({ ...p, status: 'generating', generated_html: null }))
      setPolling(true)
      const iv = setInterval(async () => {
        try {
          const s = await api.get(`/projects/${id}/status`)
          if (s.status !== 'generating') { clearInterval(iv); setPolling(false); fetchProject() }
        } catch {}
      }, 3000)
    } catch (err) { setError(err.message) }
    finally { setRegenBusy(false) }
  }
const [paying, setPaying] = useState(false)

// ── Pay ₹99 to unlock download + hosting ──────────────────────
const handlePay = async () => {
  setPaying(true); setError('')
  try {
    const order = await api.post('/credits/unlock/order')   // was '/payments/order'
    const rzp = new window.Razorpay({
      key: order.razorpayKeyId,
      order_id: order.razorpayOrderId,
      amount: order.amount,
      currency: order.currency,
      name: 'Zater Web Studio',
      description: 'Unlock download & hosting — all projects, forever',
      handler: async (resp) => {
        try {
          const v = await api.post('/credits/verify', {   // was '/payments/verify'
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature: resp.razorpay_signature,
          })
          if (v.status === 'paid') {
            setSuccess('✅ Unlocked forever! Download & host any of your websites.')
            if (setUser) setUser(u => ({ ...u, has_paid: true }))
            fetchProject()
          } else {
            setError(v.message || 'Payment verification failed.')
          }
        } catch (err) { setError(err.message) }
        finally { setPaying(false) }
      },
      modal: { ondismiss: () => setPaying(false) },
      theme: { color: '#c0392b' },
    })
    rzp.open()
  } catch (err) { setError(err.message); setPaying(false) }
}
  // Delete
  const confirmDel = async () => {
    setDelLoading(true)
    try { await api.delete(`/projects/${id}`); navigate('/projects') }
    catch (err) { setError(err.message); setDelLoading(false) }
  }

  // Download & hosting are FREE for everyone — no payment needed

  // ── Download as ZIP ───────────────────────────────────────────
  const handleDownloadZip = async () => {
    setError('')
    try {
      const token = api.getToken()
      const base  = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const res   = await fetch(`${base}/projects/${id}/download`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) { const d = await res.json().catch(() => {}); throw new Error(d?.error || 'Download failed') }
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url
      a.download = `${project?.title?.replace(/[^a-z0-9]/gi, '_') || 'website'}.zip`
      a.click(); URL.revokeObjectURL(url)
      setChoiceOpen(false)
      setSuccess('✅ ZIP downloaded! Check your downloads folder.')
    } catch (err) { setError(err.message) }
  }

  // ── Free download (for template projects) ────────────────────
  const handleFreeDownload = () => {
    if (!project?.generated_html) return
    const blob = new Blob([project.generated_html], { type: 'text/html' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `${project?.title?.replace(/[^a-z0-9]/gi, '_') || 'template'}.html`
    a.click(); URL.revokeObjectURL(url)
    setSuccess('✅ Downloaded! Open the HTML file in your browser.')
  }

  // ── Deploy to GitHub Pages ────────────────────────────────────
  const handleGithubDeploy = async () => {
    setGhDeploying(true); setError('')
    try {
      const r = await api.post('/hosting/github-pages', { projectId: id })
      setChoiceOpen(false)
      setProject(p => ({ ...p, github_url: r.url }))
      setSuccess(`✅ Live at ${r.url} — may take 1–2 min to go live`)
    } catch (err) {
      setChoiceOpen(false)
      if (err.message?.includes('token') || err.message?.includes('NO_GITHUB_TOKEN') || err.message?.includes('Settings')) {
        setError('⚠️ GitHub not connected. Redirecting to Settings...')
        setTimeout(() => navigate('/settings'), 1800)
      } else {
        setError(err.message)
      }
    } finally { setGhDeploying(false) }
  }

  if (loading) return <Loader />
 // AFTER
if (error && !project) return (
  <>
    <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
    <div style={S.center}>
      <div style={{fontSize:52,marginBottom:4}}>⚠️</div>
      <p style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:800,color:'#0a0a12',marginBottom:6}}>
        Generation Failed
      </p>
      <p style={{color:'#72727f',fontWeight:500,fontSize:13,maxWidth:300,textAlign:'center',lineHeight:1.6,marginBottom:18}}>
        This project couldn't be generated or doesn't exist. It may have failed during creation.
      </p>
      <div style={{display:'flex',gap:10}}>
        <button style={S.outBtn} onClick={() => navigate('/projects')}>← Back to Projects</button>
        <button style={{...S.outBtn, borderColor:'#c0392b', color:'#c0392b'}}
          onClick={() => navigate('/home')}>
          Try Again
        </button>
      </div>
    </div>
  </>
)
const CUSTOM_DOMAIN_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdLlXuG7dVFdC94vzFnw8YOe_DK6iytqChqiOIm1dGeVz522g/viewform?usp=publish-editor'
  const isGenerating = project?.status === 'generating'
  const isReady      = project?.status === 'ready'
  const isFailed     = project?.status === 'failed'
  const isGithub     = !!project?.github_url
  // Download & hosting are FREE for everyone — templates AND AI-generated sites
  const isTemplate   = !!project?.template_id || project?.is_template === 1 || !project?.prompt || project?.prompt?.length === 0

  return (
    <>
      <style>{CSS}</style>
      <div className={`pp-root ${isFullscreen ? 'pp-fullscreen' : ''}`}>

        {/* NAV */}
     <nav className="pp-nav">
  <button className="pp-back" onClick={() => navigate('/home')}>← Home</button>
  <StatusBadge status={project?.status} polling={polling} />
  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
    {isReady && (
      <button className="pp-nb pp-nb-outline" onClick={() => setFullscreen(f => !f)}>
        {isFullscreen ? '⊡ Exit Full' : '⛶ Full Screen'}
      </button>
    )}
    <button className="pp-nb pp-nb-outline" onClick={() => { setEditTitle(project?.title || ''); setEditOpen(true) }}>✏️</button>

    <button className="pp-nb pp-nb-danger" onClick={() => setDelOpen(true)}>🗑️</button>
    {isReady && isGithub && (
      <a className="pp-nb pp-nb-green" href={project.github_url} target="_blank" rel="noopener noreferrer">
        🌐 View Live ↗
      </a>
    )}
    {isReady && isGithub && (
      <a className="pp-nb pp-nb-outline" href={CUSTOM_DOMAIN_FORM_URL} target="_blank" rel="noopener noreferrer">
        🔗 Custom Domain
      </a>
    )}

    {/* Template: always free — no unlock needed */}
    {isReady && isTemplate && (
      <>
        <button className="pp-nb pp-nb-outline" onClick={handleFreeDownload}>⬇️ Download</button>
        {!isGithub && (
          <button className="pp-nb pp-nb-green" onClick={() => setChoiceOpen(true)}>🐙 Deploy Free</button>
        )}
      </>
    )}

    {/* AI-generated: gated behind the ONE-TIME global ₹99 unlock (user.has_paid) */}
    {isReady && !isTemplate && !isGithub && (
      user?.has_paid ? (
        <>
          <button className="pp-nb pp-nb-outline" onClick={handleDownloadZip}>⬇️ Download</button>
          <button className="pp-nb pp-nb-green" onClick={() => setChoiceOpen(true)}>🐙 Host</button>
        </>
      ) : (
        <button className="pp-nb pp-nb-red" onClick={handlePay} disabled={paying}>🔓 Unlock ₹99</button>
      )
    )}
  </div>
</nav>

        <div className="pp-layout">

          {/* SIDEBAR */}
          <aside className="pp-sidebar">
            <div>
              <div className="pp-lbl">Project</div>
              <h2 className="pp-title">{project?.title}</h2>
              <button className="pp-edit-link" onClick={() => { setEditTitle(project?.title || ''); setEditOpen(true) }}>Edit title</button>
            </div>

            {!isTemplate && (
              <div>
                <div className="pp-lbl">Prompt</div>
                <div className="pp-prompt">"{project?.prompt}"</div>
                
              </div>
            )}

            {isTemplate && (
              <div className="pp-template-badge">
                <span>🎨</span>
                <div>
                  <div style={{fontWeight:700,fontSize:12,color:'#22c55e'}}>Free Template</div>
                  <div style={{fontSize:11,color:'#72727f',marginTop:2}}>Download or deploy at no cost</div>
                </div>
              </div>
            )}

            {success && <div className="pp-success">{success}</div>}
            {error   && <div className="pp-error">{error}<button className="pp-err-x" onClick={() => setError('')}>✕</button></div>}

            {isReady && (
              <div className="pp-actions">
                <div className="pp-lbl">Your Website</div>

                <div className="pp-interactive-badge">
                  <span>🖱️</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:12}}>Fully Interactive Preview</div>
                    <div style={{fontSize:11,color:'#72727f',marginTop:2}}>Click buttons, fill forms — works live</div>
                  </div>
                </div>

                {/* ── FREE TEMPLATE — no payment ── */}
                {isTemplate && (
                  <div className="pp-card pp-card-free">
                    <div className="pp-free-badge">🆓 Free Template</div>
                    <div className="pp-card-name" style={{marginBottom:8}}>Download or Deploy — No Cost</div>
                    <div className="pp-price-list">
                      <div className="pp-price-item">✅ Download as HTML file</div>
                      <div className="pp-price-item">✅ Deploy to GitHub Pages free</div>
                      <div className="pp-price-item">✅ yourname.github.io URL</div>
                      <div className="pp-price-item">✅ No payment needed</div>
                    </div>
                    <button className="pp-dl-btn" style={{marginBottom:8}} onClick={handleFreeDownload}>
                      ⬇️ Download HTML — Free
                    </button>
                    {!isGithub ? (
                      <button className="pp-pay-btn" style={{background:'#5b4fff',boxShadow:'0 2px 10px rgba(91,79,255,0.3)'}}
                        onClick={() => setChoiceOpen(true)}>
                        🐙 Deploy to GitHub Pages — Free
                      </button>
                    ) : (
                      <div className="pp-hosted-live">🟢 Live on GitHub Pages!</div>
                    )}
                  </div>
                )}

                {/* ── AI GENERATED — download & hosting are FREE ── */}
               {!isTemplate && (
  <>
    {!user?.has_paid ? (
      <div className="pp-card pp-card-paid">
        <div className="pp-price-badge">₹99 One-Time</div>
        <div className="pp-card-name" style={{marginBottom:6}}>Unlock Download & Hosting</div>
        <div className="pp-price-list">
          <div className="pp-price-item">✅ Download full ZIP</div>
          <div className="pp-price-item">✅ Host on GitHub Pages</div>
          
          <div className="pp-price-item">✅ Free Custom code</div>
          <div className="pp-price-item">✅ Custom Domain Name</div>
          <div className="pp-price-item">✅ One-time payment — unlocks ALL your websites forever</div>
        </div>
        <button className="pp-pay-btn" onClick={handlePay} disabled={paying}>
          {paying ? '🔄 Opening checkout...' : '🔓 Pay ₹99 to Unlock'}
        </button>
      </div>
    ) : !isGithub ? (
      <div className="pp-card pp-card-free">
        <div className="pp-free-badge">🔓 Unlocked</div>
        <button className="pp-dl-btn" style={{marginBottom:8}} onClick={handleDownloadZip}>⬇️ Download ZIP</button>
        <button className="pp-choice-btn pp-choice-github" onClick={() => setChoiceOpen(true)}>🐙 Host on GitHub Pages</button>
      </div>
    ) : (
   
                      /* HOSTED: live on GitHub */
                      <div className="pp-card pp-card-hosted">
                        <div className="pp-hosted-live">🟢 Site is Live on GitHub!</div>
                        <div style={{marginTop:8,marginBottom:4}}>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="pp-domain-link">
                            {project.github_url} ↗
                          </a>
                        </div>
                        <div className="pp-card-sub">Free GitHub Pages hosting</div>
                        <a href={CUSTOM_DOMAIN_FORM_URL} target="_blank" rel="noopener noreferrer" className="pp-dl-btn" style={{marginTop:8, background:'#5b4fff', textDecoration:'none', display:'block', textAlign:'center', boxShadow:'0 2px 10px rgba(91,79,255,0.3)'}}>
  🔗 Get Custom Domain
</a>

<button
  className="pp-dl-btn"
  style={{marginTop:8, background:'#f59e0b', boxShadow:'0 2px 10px rgba(245,158,11,0.3)'}}
  onClick={() => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeGOeGNuQljOlO-fJ0aQxX5RpDU1t8UMmvqlcwq1VAsVTu7ow/viewform",
      "_blank"
    )
  }}
>
  🎁 Free Custom Code
</button>

<button className="pp-dl-btn" style={{marginTop:10}} onClick={handleDownloadZip}>
  ⬇️ Also Download ZIP
</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="pp-date">
              Created {new Date(project?.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
            </div>
          </aside>

          {/* MAIN PREVIEW */}
          <main className="pp-preview">
            {isGenerating && <GeneratingState step={currentStep} />}

            {isReady && project?.generated_html && (
              <div className="pp-iframe-container">
                <div className="pp-browser-bar">
                  <div className="pp-browser-dots">
                    <span style={{background:'#ef4444'}} />
                    <span style={{background:'#f59e0b'}} />
                    <span style={{background:'#22c55e'}} />
                  </div>
                  <div className="pp-browser-url">
                    {isGithub ? project.github_url : 'preview.zater.in — ' + (project?.title || '')}
                  </div>
                  <div style={{display:'flex',gap:6}}>
                    <button className="pp-browser-btn" onClick={() => iframeRef.current?.contentWindow?.location?.reload?.()}>↻</button>
                    <button className="pp-browser-btn" onClick={() => setFullscreen(f => !f)}>{isFullscreen ? '⊡' : '⛶'}</button>
                  </div>
                </div>
                <iframe
                  ref={iframeRef}
                  className="pp-iframe"
                  srcDoc={project.generated_html}
                  title={project.title}
                  sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-same-origin allow-downloads"
                />
              </div>
            )}

            {isFailed && (
              <div className="pp-center-state">
                <div style={{fontSize:48}}>⚠️</div>
                <h3 className="pp-state-title">Generation Failed</h3>
                <p className="pp-state-sub">Try regenerating with a different prompt.</p>
                <button style={S.outBtn} onClick={() => { setRegenPrm(project?.prompt || ''); setRegenOpen(true) }}>🔄 Try Again</button>
              </div>
            )}
          </main>
        </div>

        {/* ══ CHOICE MODAL — download / github ══ */}
        {choiceOpen && (
          <div className="pp-overlay" onClick={() => setChoiceOpen(false)}>
            <div className="pp-modal pp-modal-lg" onClick={e => e.stopPropagation()}>
              <div className="pp-modal-hdr">
                <span className="pp-modal-title">
                  {isTemplate ? '🆓 Free Template — Choose Action' : '✅ Download & Host — Free'}
                </span>
                <button className="pp-modal-x" onClick={() => setChoiceOpen(false)}>✕</button>
              </div>
              <div className="pp-modal-body">
                <p className="pp-choice-intro">
                  Both options are completely free — choose one or both!
                </p>

                {error && <div className="pp-error">{error}<button className="pp-err-x" onClick={() => setError('')}>✕</button></div>}

                <div className="pp-choice-grid">
                  {/* GitHub Pages */}
                  <div className="pp-choice-card pp-choice-github-card">
                    <div className="pp-choice-icon">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </div>
                    <h3 className="pp-choice-title">Host on GitHub Pages</h3>
                    <div className="pp-choice-subtitle">FREE · .github.io domain</div>
                    <ul className="pp-choice-perks">
                      <li>✅ Free hosting forever</li>
                      <li>✅ yourname.github.io/site</li>
                      <li>✅ Auto SSL certificate</li>
                      <li>✅ One click deploy</li>
                    </ul>
                    <button className="pp-choice-action pp-choice-action-dark"
                      onClick={handleGithubDeploy} disabled={ghDeploying}>
                      {ghDeploying ? '🔄 Deploying...' : '🐙 Deploy to GitHub Pages'}
                    </button>
                    <p className="pp-choice-note">Requires GitHub token in Settings</p>
                  </div>

                  {/* Download ZIP */}
                  <div className="pp-choice-card pp-choice-zip-card">
                    <div className="pp-choice-icon pp-choice-icon-red">
                      <span style={{fontSize:28}}>📦</span>
                    </div>
                    <h3 className="pp-choice-title">Download File</h3>
                    <div className="pp-choice-subtitle">Host anywhere you like</div>
                    <ul className="pp-choice-perks">
                      <li>✅ Full HTML + CSS + JS</li>
                      <li>✅ Host on Netlify / Vercel</li>
                      <li>✅ Edit in any code editor</li>
                      <li>✅ Yours forever</li>
                    </ul>
                    <button className="pp-choice-action pp-choice-action-red"
                      onClick={isTemplate ? handleFreeDownload : handleDownloadZip}>
                      ⬇️ {isTemplate ? 'Download HTML' : 'Download ZIP'}
                    </button>
                    <p className="pp-choice-note">Ready to host on Netlify, Vercel, or anywhere</p>
                  </div>
                </div>

                <div className="pp-choice-divider">
                  🆓 Both options are completely free — download & host at no cost
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editOpen && (
          <div className="pp-overlay" onClick={() => setEditOpen(false)}>
            <div className="pp-modal" onClick={e => e.stopPropagation()}>
              <div className="pp-modal-hdr"><span className="pp-modal-title">✏️ Edit Title</span><button className="pp-modal-x" onClick={() => setEditOpen(false)}>✕</button></div>
              <div className="pp-modal-body">
                <label className="pp-lbl">New Title</label>
                <input className="pp-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveEdit()} placeholder="Enter title..." autoFocus maxLength={100} />
              </div>
              <div className="pp-modal-ftr">
                <button className="pp-modal-btn pp-modal-cancel" onClick={() => setEditOpen(false)}>Cancel</button>
                <button className="pp-modal-btn pp-modal-save" onClick={saveEdit} disabled={editSaving || !editTitle.trim()}>{editSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          </div>
        )}

        {/* Regen Modal */}
        

        {/* Delete Modal */}
        {delOpen && (
          <div className="pp-overlay" onClick={() => setDelOpen(false)}>
            <div className="pp-modal" onClick={e => e.stopPropagation()}>
              <div className="pp-modal-hdr"><span className="pp-modal-title">🗑️ Delete</span><button className="pp-modal-x" onClick={() => setDelOpen(false)}>✕</button></div>
              <div className="pp-modal-body">
                <div className="pp-del-box">Delete <strong>"{project?.title}"</strong>? This cannot be undone.</div>
              </div>
              <div className="pp-modal-ftr">
                <button className="pp-modal-btn pp-modal-cancel" onClick={() => setDelOpen(false)}>Cancel</button>
                <button className="pp-modal-btn pp-modal-del" onClick={confirmDel} disabled={delLoading}>{delLoading ? 'Deleting...' : '🗑️ Delete'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const StatusBadge = ({ status, polling }) => {
  const M = {
    generating: { label: '⏳ Generating...', color: '#d97706', bg: 'rgba(245,158,11,0.1)' },
    ready:      { label: '✅ Ready',          color: '#16a34a', bg: 'rgba(34,197,94,0.1)'  },
    failed:     { label: '❌ Failed',         color: '#dc2626', bg: 'rgba(239,68,68,0.1)'  },
  }
  const s = M[status] || M.ready
  return <div style={{padding:'5px 13px',borderRadius:100,background:s.bg,fontSize:12,fontWeight:700,color:s.color}}>{s.label}</div>
}

const GeneratingState = ({ step }) => (
  <div className="pp-center-state">
    <div className="pp-gen-ring" />
    <h3 className="pp-state-title">Building your website...</h3>
    <p className="pp-state-sub">{step || 'Claude AI is generating your site...'}</p>
    <div style={{display:'flex',gap:6}}>
      {[0,1,2].map(i => <div key={i} style={{width:8,height:8,borderRadius:'50%',background:'#0a0a12',animation:'pulse 1.2s ease-in-out infinite',animationDelay:`${i*0.2}s`}} />)}
    </div>
  </div>
)

const Loader = () => (
  <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,fontFamily:'Nunito,sans-serif'}}>
    <div style={{width:38,height:38,border:'3px solid #e2e2ea',borderTopColor:'#c0392b',borderRadius:'50%',animation:'spin 1s linear infinite'}} />
    <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
  </div>
)

const S = {
  center: { minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:18,fontFamily:'Nunito,sans-serif' },
  outBtn: { padding:'10px 20px',borderRadius:9,background:'transparent',border:'1.5px solid #e2e2ea',fontSize:13,fontWeight:700,color:'#3a3a4a',cursor:'pointer',fontFamily:'Nunito,sans-serif' },
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

.pp-root{min-height:100vh;background:#fff;font-family:'Nunito',sans-serif;color:#0a0a12;}
.pp-fullscreen{position:fixed;inset:0;z-index:9999;background:#fff;}
.pp-nav{position:sticky;top:0;z-index:100;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;gap:8px;background:rgba(255,255,255,0.97);backdrop-filter:blur(14px);border-bottom:1px solid #e2e2ea;flex-wrap:wrap;}
.pp-back{padding:7px 13px;border-radius:8px;background:transparent;border:1.5px solid #e2e2ea;font-size:12px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;white-space:nowrap;}
.pp-back:hover{border-color:#c0392b;color:#c0392b;}
.pp-nb{padding:6px 11px;border-radius:8px;border:none;font-size:12px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;white-space:nowrap;}
.pp-nb:disabled{opacity:0.45;cursor:not-allowed;}
.pp-nb-outline{background:#fff;color:#0a0a12;border:1.5px solid #e2e2ea;}
.pp-nb-outline:hover:not(:disabled){border-color:#0a0a12;}
.pp-nb-red{background:#c0392b;color:#fff;box-shadow:0 2px 8px rgba(192,57,43,0.3);}
.pp-nb-red:hover:not(:disabled){opacity:.88;}
.pp-nb-green{background:#22c55e;color:#fff;box-shadow:0 2px 8px rgba(34,197,94,0.25);text-decoration:none;display:inline-flex;align-items:center;gap:4px;}
.pp-nb-green:hover:not(:disabled){opacity:.88;}
.pp-nb-danger{background:#fff;color:#dc2626;border:1.5px solid rgba(220,38,38,0.2);}
.pp-nb-danger:hover{background:rgba(220,38,38,0.06);}

.pp-layout{display:grid;grid-template-columns:300px 1fr;height:calc(100vh - 54px);}
.pp-sidebar{border-right:1px solid #e2e2ea;padding:18px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;background:#fafafa;}
.pp-lbl{font-size:10px;font-weight:800;color:#b0b0c0;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;}
.pp-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;line-height:1.3;margin-bottom:4px;}
.pp-edit-link{background:none;border:none;color:#c0392b;font-size:11px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;padding:0;text-decoration:underline;}
.pp-prompt{font-size:12px;color:#5a5a70;font-weight:500;line-height:1.6;background:#fff;border:1px solid #e2e2ea;border-radius:10px;padding:10px;font-style:italic;margin-bottom:4px;}
.pp-template-badge{display:flex;align-items:center;gap:10px;background:rgba(34,197,94,0.06);border:1.5px solid rgba(34,197,94,0.25);border-radius:10px;padding:10px 12px;font-size:13px;}
.pp-success{background:rgba(34,197,94,0.08);border:1.5px solid rgba(34,197,94,0.25);border-radius:10px;padding:11px;font-size:13px;font-weight:700;color:#15803d;word-break:break-all;}
.pp-error{background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:11px 12px;font-size:12.5px;color:#dc2626;font-weight:600;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
.pp-err-x{background:none;border:none;color:#dc2626;cursor:pointer;font-size:14px;font-weight:800;padding:0;flex-shrink:0;}
.pp-date{margin-top:auto;font-size:11px;color:#c0c0cc;font-weight:600;padding-top:14px;border-top:1px solid #efefef;}
.pp-actions{display:flex;flex-direction:column;gap:10px;}
.pp-interactive-badge{display:flex;align-items:center;gap:10px;background:rgba(91,79,255,0.06);border:1.5px solid rgba(91,79,255,0.2);border-radius:10px;padding:10px 12px;font-size:13px;}
.pp-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:13px;padding:14px;}
.pp-card-free{border-color:rgba(34,197,94,0.4);background:rgba(34,197,94,0.03);}
.pp-card-paid{border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.02);}
.pp-card-hosted{border-color:#22c55e;background:rgba(34,197,94,0.04);}
.pp-free-badge{display:inline-block;background:#22c55e;color:#fff;font-size:11px;font-weight:800;padding:3px 12px;border-radius:100px;margin-bottom:10px;}
.pp-lifetime-badge{display:inline-block;background:linear-gradient(135deg,#c0392b,#8b2fc9);color:#fff;font-size:11px;font-weight:800;padding:3px 12px;border-radius:100px;margin-bottom:10px;}
.pp-price-badge{display:inline-block;background:#c0392b;color:#fff;font-size:11px;font-weight:800;padding:3px 12px;border-radius:100px;margin-bottom:10px;}
.pp-card-name{font-size:13px;font-weight:800;color:#0a0a12;}
.pp-card-sub{font-size:11px;color:#a0a0b0;font-weight:500;}
.pp-price-list{display:flex;flex-direction:column;gap:5px;margin-bottom:12px;}
.pp-price-item{font-size:12px;font-weight:600;color:#3a3a4a;}
.pp-pay-btn{width:100%;padding:10px;border-radius:9px;background:#c0392b;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;margin-bottom:8px;transition:all .18s;box-shadow:0 2px 10px rgba(192,57,43,0.3);}
.pp-pay-btn:hover:not(:disabled){opacity:.88;transform:translateY(-1px);}
.pp-pay-btn:disabled{background:#c0c0cc;cursor:not-allowed;box-shadow:none;transform:none;}
.pp-choice-btn{width:100%;padding:10px;border-radius:9px;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.pp-choice-github{background:#0a0a12;}
.pp-choice-github:hover{opacity:.88;}
.pp-dl-btn{width:100%;padding:10px;border-radius:9px;background:#22c55e;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.pp-dl-btn:hover{opacity:.88;}
.pp-hosted-live{font-size:13px;font-weight:800;color:#15803d;}
.pp-domain-link{color:#15803d;font-weight:700;text-decoration:none;font-size:12px;word-break:break-all;}
.pp-domain-link:hover{text-decoration:underline;}
.pp-note{font-size:11px;color:#c0c0cc;font-weight:600;text-align:center;}

.pp-preview{position:relative;background:#f0f0f6;overflow:hidden;display:flex;flex-direction:column;}
.pp-iframe-container{display:flex;flex-direction:column;height:100%;}
.pp-browser-bar{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#fff;border-bottom:1px solid #e2e2ea;flex-shrink:0;}
.pp-browser-dots{display:flex;gap:5px;}
.pp-browser-dots span{width:10px;height:10px;border-radius:50%;display:block;}
.pp-browser-url{flex:1;background:#f4f4f8;border-radius:7px;padding:6px 14px;font-size:11px;color:#72727f;font-family:'JetBrains Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pp-browser-btn{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px;border-radius:6px;color:#72727f;transition:background .15s;}
.pp-browser-btn:hover{background:#f0f0f6;}
.pp-iframe{flex:1;border:none;width:100%;}
.pp-center-state{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;padding:32px;text-align:center;}
.pp-gen-ring{width:72px;height:72px;border:3px solid #e2e2ea;border-top-color:#0a0a12;border-radius:50%;animation:spin .9s linear infinite;flex-shrink:0;}
.pp-state-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#0a0a12;}
.pp-state-sub{font-size:14px;color:#a0a0b0;font-weight:500;max-width:280px;line-height:1.55;}

.pp-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .15s ease;}
.pp-modal{background:#fff;border-radius:18px;width:100%;max-width:440px;box-shadow:0 24px 80px rgba(0,0,0,0.2);animation:fadeUp .2s ease;overflow:hidden;}
.pp-modal-lg{max-width:600px;}
.pp-modal-hdr{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 13px;border-bottom:1px solid #f0f0f6;}
.pp-modal-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}
.pp-modal-x{background:none;border:none;font-size:16px;color:#a0a0b0;cursor:pointer;padding:4px;border-radius:6px;}
.pp-modal-x:hover{background:#f0f0f6;}
.pp-modal-body{padding:18px 20px;display:flex;flex-direction:column;gap:14px;}
.pp-modal-ftr{display:flex;gap:8px;justify-content:flex-end;padding:13px 20px;border-top:1px solid #f0f0f6;}
.pp-input{width:100%;padding:10px 12px;border:1.5px solid #e2e2ea;border-radius:9px;font-size:14px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;transition:border-color .18s;}
.pp-input:focus{border-color:#c0392b;}
.pp-textarea{width:100%;padding:10px 12px;border:1.5px solid #e2e2ea;border-radius:9px;font-size:13px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;resize:vertical;min-height:90px;line-height:1.6;transition:border-color .18s;}
.pp-textarea:focus{border-color:#c0392b;}
.pp-warn-box{background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.25);border-radius:9px;padding:10px 12px;font-size:12.5px;color:#92400e;font-weight:500;line-height:1.5;}
.pp-del-box{background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);border-radius:9px;padding:13px;font-size:13px;color:#991b1b;line-height:1.65;}
.pp-modal-btn{padding:9px 18px;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;border:none;transition:all .18s;}
.pp-modal-btn:disabled{opacity:.5;cursor:not-allowed;}
.pp-modal-cancel{background:#fff;color:#0a0a12;border:1.5px solid #e2e2ea;}
.pp-modal-cancel:hover{background:#f5f5f7;}
.pp-modal-save{background:#5b4fff;color:#fff;}
.pp-modal-save:hover:not(:disabled){opacity:.88;}
.pp-modal-regen{background:#f59e0b;color:#fff;}
.pp-modal-regen:hover:not(:disabled){opacity:.88;}
.pp-modal-del{background:#dc2626;color:#fff;}
.pp-modal-del:hover:not(:disabled){opacity:.88;}

.pp-choice-intro{font-size:14px;color:#72727f;font-weight:500;}
.pp-choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.pp-choice-card{border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:12px;border:2px solid transparent;}
.pp-choice-github-card{background:#0a0a12;color:#fff;}
.pp-choice-zip-card{background:#fff8f6;border-color:#e2e2ea;}
.pp-choice-icon{width:52px;height:52px;border-radius:12px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;}
.pp-choice-icon-red{background:rgba(192,57,43,0.1);}
.pp-choice-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:800;color:inherit;}
.pp-choice-zip-card .pp-choice-title{color:#0a0a12;}
.pp-choice-subtitle{font-size:12px;font-weight:700;color:rgba(255,255,255,0.6);}
.pp-choice-zip-card .pp-choice-subtitle{color:#72727f;}
.pp-choice-perks{list-style:none;display:flex;flex-direction:column;gap:5px;flex:1;}
.pp-choice-perks li{font-size:12px;font-weight:600;color:rgba(255,255,255,0.8);}
.pp-choice-zip-card .pp-choice-perks li{color:#3a3a4a;}
.pp-choice-action{width:100%;padding:11px;border-radius:10px;border:none;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.pp-choice-action:disabled{opacity:.6;cursor:not-allowed;}
.pp-choice-action-dark{background:#fff;color:#0a0a12;}
.pp-choice-action-dark:hover:not(:disabled){background:#f0f0f0;}
.pp-choice-action-red{background:#c0392b;color:#fff;box-shadow:0 2px 10px rgba(192,57,43,0.3);}
.pp-choice-action-red:hover:not(:disabled){opacity:.88;}
.pp-choice-note{font-size:10px;font-weight:500;color:rgba(255,255,255,0.4);text-align:center;}
.pp-choice-zip-card .pp-choice-note{color:#a0a0b0;}
.pp-choice-divider{text-align:center;font-size:12px;color:#a0a0b0;font-weight:600;padding:4px 0;border-top:1px solid #f0f0f6;}

@media(max-width:700px){
  .pp-layout{
    grid-template-columns:1fr;
    grid-template-rows:auto auto;
    height:auto;
    overflow-y:auto;
  }
  .pp-preview{
    order:1;
    min-height:60vh;
  }
  .pp-sidebar{
    order:2;
    overflow-y:visible;
  }
  .pp-iframe-container{
    height:80vh;
  }
  .pp-nav{height:auto;padding:8px;}
  .pp-choice-grid{grid-template-columns:1fr;}
}
`
