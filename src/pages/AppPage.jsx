import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { Sandpack } from '@codesandbox/sandpack-react'

import SandpackPreviewComponent from '../pages/Webcontainerpreview'
const loadRazorpay = () => new Promise(resolve => {
  if (window.Razorpay) return resolve(true)
  const s = document.createElement('script')
  s.src = 'https://checkout.razorpay.com/v1/checkout.js'
  s.async = true; s.onload = () => resolve(true); s.onerror = () => resolve(false)
  document.head.appendChild(s)
})

const TABS = ['preview', 'frontend', 'backend', 'schema', 'readme']   // added 'preview' at front
const TAB_LABELS = { preview: 'Live   Preview', frontend: 'React Frontend', backend: 'Node.js Backend', schema: 'Database Schema', readme: 'Setup Guide' }
const TAB_ICONS  = { preview: '👁️', frontend: '⚛️', backend: '🖥️', schema: '🗄️', readme: '📄' }
export default function AppPage() {
  const { id }                      = useParams()
  const navigate                    = useNavigate()
  const { user }                    = useAuth()
  const [app,      setApp]          = useState(null)
  const [loading,  setLoading]      = useState(true)
const [tab,      setTab]          = useState('preview')
  const [paying,   setPaying]       = useState('')
  const [success,  setSuccess]      = useState('')
  const [error,    setError]        = useState('')
  const [polling,  setPolling]      = useState(false)
  const [copied,   setCopied]       = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)
  const [showDomainModal, setShowDomainModal] = useState(false)
const [domainInput, setDomainInput] = useState('')
const [domainRecord, setDomainRecord] = useState(null)
const [domainVerified, setDomainVerified] = useState(false)
const [domainLoading, setDomainLoading] = useState(false)
const [domainError, setDomainError] = useState('')
const [currentStep, setCurrentStep] = useState('')
const [redeploying, setRedeploying] = useState(false);
const [activeFile, setActiveFile] = useState('src/App.jsx')

useEffect(() => {
  if (!app?.custom_domain || domainVerified) return
  const iv = setInterval(async () => {
    try {
      const s = await api.get(`/apps/${id}/domain/status`)
      if (s.verified) { setDomainVerified(true); clearInterval(iv) }
    } catch {}
  }, 8000)
  return () => clearInterval(iv)
}, [app?.custom_domain, domainVerified, id])

const handleConnectDomain = async () => {
  setDomainError(''); setDomainLoading(true)
  try {
    const d = await api.post(`/apps/${id}/domain`, { domain: domainInput.trim() })
    setDomainRecord(d.dnsRecord)
    setDomainVerified(d.verified)
    setApp(prev => ({ ...prev, custom_domain: d.domain }))
  } catch (err) { setDomainError(err.message) }
  finally { setDomainLoading(false) }
}

const handleRedeploy = async () => {
  setError('');
  setRedeploying(true);
  try {
    // 1. Remove old deployment
    await api.delete(`/apps/${id}/deploy`);

    // 2. Trigger a fresh deploy
    const d = await api.post(`/apps/${id}/deploy`);

    // 3. Update local app state with the new URL
    setSuccess(`Redeployed! Live at: ${d.url}`);
    setApp(prev => ({ ...prev, deploy_url: d.url }));
  } catch (err) {
    console.error('Redeploy error:', err);
    setError(err.message);
  } finally {
    setRedeploying(false);
  }
};

  const fetchApp = useCallback(async () => {
    try {
      const d = await api.get(`/apps/${id}`)
      setApp(d.app); return d.app
    } catch (err) { setError(err.message); return null }
    finally { setLoading(false) }
  }, [id])

  useEffect(() => {
  let iv
  fetchApp().then(a => {
  if (a?.status === 'ready') {
    const files = getFrontendFiles(a)
    
    if (files['src/App.jsx']) setActiveFile('src/App.jsx')
    else if (Object.keys(files)[0]) setActiveFile(Object.keys(files)[0])
  }
    if (a?.status === 'generating') {
      setPolling(true)
      setCurrentStep(a?.current_step || 'Starting generation...')
      iv = setInterval(async () => {
        try {
          const s = await api.get(`/apps/${id}/status`)
          if (s.current_step) setCurrentStep(s.current_step)
          if (s.status !== 'generating') { clearInterval(iv); setPolling(false); fetchApp() }
        } catch {}
      }, 2000)
    }
  })
  return () => clearInterval(iv)
}, [fetchApp, id])




 const copyCode = () => {
  navigator.clipboard.writeText(currentCode).then(() => {
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  })
}

  const handlePay = async () => {
    setError(''); setPaying('pay')
    const loaded = await loadRazorpay()
    if (!loaded) { setError('Could not load Razorpay.'); setPaying(''); return }
    const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID
    if (!rzpKey || rzpKey.includes('your_key')) { setError('Add VITE_RAZORPAY_KEY_ID to .env'); setPaying(''); return }
    let order
    try { order = await api.post('/payments/order', { projectId: id, type: 'app' }) }
    catch (err) { setError(err.message); setPaying(''); return }
    new window.Razorpay({
      key: order.keyId || rzpKey, amount: order.amount, currency: 'INR',
      name: 'Zater Web Studio', description: `Download App: ${app?.title}`,
      order_id: order.orderId,
      prefill: { name: user?.name || '', email: user?.email || '' },
      theme: { color: '#5b4fff' },
      handler: async (resp) => {
        setPaying('verifying')
        try {
          await api.post('/payments/verify', {
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature: resp.razorpay_signature,
            projectId: id, type: 'app',
          })
          setSuccess('Payment done! You can now download your app files.')
          await fetchApp()
        } catch (err) { setError(err.message) }
        finally { setPaying('') }
      },
      modal: { ondismiss: () => setPaying('') },
    }).open()
  }


  const [viewport, setViewport] = useState(() =>
  typeof window !== 'undefined' ? window.innerWidth : 1200
)
useEffect(() => {
  const onResize = () => setViewport(window.innerWidth)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}, [])


const isMobile  = viewport <= 700
const isTablet  = viewport > 700 && viewport <= 1024
const [deploying, setDeploying] = useState(false)
const [previewKey, setPreviewKey] = useState(0)
const [restarting, setRestarting] = useState(false)

 // Replace handleDownload with these two functions:
const handleDownloadZip = async () => {
  setError('')
  try {
    const token = api.getToken()
    const res = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/apps/${id}/download-zip`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Failed') }
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `${app?.title?.replace(/[^a-z0-9]/gi,'_') || 'app'}.zip`
    a.click(); URL.revokeObjectURL(url)
  } catch (err) { setError(err.message) }
}

const handleDownloadApk = async () => {
  setError('')
  try {
    const token = api.getToken()
    const res = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/apps/${id}/download-apk`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Failed') }
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `${app?.title?.replace(/[^a-z0-9]/gi,'_') || 'app'}_apk_project.zip`
    a.click(); URL.revokeObjectURL(url)
  } catch (err) { setError(err.message) }
}

const handleDeploy = async () => {
  setError(''); setDeploying(true)
  try {
    const d = await api.post(`/apps/${id}/deploy`)
    setSuccess(`Deployed! Live at: ${d.url}`)
    setApp(prev => ({ ...prev, deploy_url: d.url }))   // <-- ADD THIS
  } catch (err) { setError(err.message) }
  finally { setDeploying(false) }
}

const copyDeployUrl = () => {
  if (!app?.deploy_url) return
  navigator.clipboard.writeText(app.deploy_url).then(() => {
    setUrlCopied(true); setTimeout(() => setUrlCopied(false), 2000)
  })
}
const [deployStatus, setDeployStatus] = useState(null);

const checkStatus = async () => {
  const res = await fetch(`/apps/${appId}/deploy-status`);
  const data = await res.json();
  setDeployStatus(data);
};



  if (loading) return <Loader />
  if (error && !app) return (
    <div style={S.center}>
      <p style={{color:'#72727f',fontWeight:600}}>{error}</p>
      <button style={S.outBtn} onClick={() => navigate('/apps')}>Back</button>
    </div>
  )


const handleRestartPreview = async () => {
  setRestarting(true)
 
  setPreviewKey(k => k + 1)   // forces WebContainerPreview to remount fresh
  setRestarting(false)
}
  const isGenerating = app?.status === 'generating'
  const isReady      = app?.status === 'ready'
  const isPaid       = !!app?.download_paid
  const isBusy       = !!paying
  const frontendFiles = getFrontendFiles(app)
const frontendFileNames = Object.keys(frontendFiles)

// WebContainers needs a real entry point + api layer to boot a Vite project.
// Old apps (pre multi-file generation) only have a bare src/App.jsx — fall back
// to the old CDN/Babel iframe preview for those.
const hasValidProjectStructure = !!(frontendFiles['src/main.jsx'] && frontendFiles['src/App.jsx'])

const currentCode =
  tab === 'schema'   ? (app?.schema_sql || '') :
  tab === 'frontend' ? (frontendFiles[activeFile] || '') :
  (app?.[tab] || '')
function extractCleanCode(raw) {
  if (!raw) return ''
  let code = raw.trim()

  // strip markdown fences if present
  code = code.replace(/^```(jsx|javascript|js)?\s*/i, '').replace(/\s*```$/i, '').trim()

  // if there's stray prose before the real code, jump to first import/function/const
  const marks = ['import ', 'export default', 'function App', 'const App']
  let firstIdx = -1
  for (const m of marks) {
    const idx = code.indexOf(m)
    if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) firstIdx = idx
  }
  if (firstIdx > 0) code = code.slice(firstIdx)

  return code
}

  return (
    <>
      <style>{CSS}</style>
      <div className="ap-root">

        {/* NAV */}
        <nav className="ap-nav">
          <button className="ap-back" onClick={() => navigate('/home')}>Back to Home</button>
          <div className="ap-status-pill ap-status-pill--${app?.status}">
            {isGenerating ? 'Generating...' : isReady ? 'Ready' : 'Failed'}
          </div>

          <div style={{display:'flex',gap:7}}>
            
{isReady && (
  <div style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'flex-end'}}>
    <button className="ap-btn ap-btn-purple" onClick={handleDownloadZip}>📦 ZIP</button>
    <button className="ap-btn ap-btn-purple" onClick={handleDownloadApk} style={{background:'#5b4fff'}}>📱 APK</button>

    <button
      className="ap-btn ap-btn-purple"
      style={{background:'#f59e0b'}}
      onClick={() => {
        window.open(
          "https://docs.google.com/forms/d/e/1FAIpQLSeGOeGNuQljOlO-fJ0aQxX5RpDU1t8UMmvqlcwq1VAsVTu7ow/viewform",
          "_blank"
        )
      }}
    >
      🎁 Free Custom Code
    </button>

    {app?.deploy_url ? (
      
  <div style={{display:'flex',gap:6,alignItems:'center'}}>
    <a href={app.deploy_url} target="_blank" rel="noopener noreferrer"
       className="ap-btn ap-btn-purple" style={{background:'#22c55e', textDecoration:'none'}}>
      🌐 Live
    </a>
    <button className="ap-btn ap-btn-purple" onClick={copyDeployUrl} style={{background:'#1e1e3a'}}>
      {urlCopied ? '✓ Copied' : '📋 Copy URL'}
    </button>
     <button className="ap-btn ap-btn-purple" style={{ background: '#0284c7' }}
    onClick={() => setShowDomainModal(true)}>
    🌐 {app?.custom_domain ? 'Manage Domain' : 'Custom Domain'}
  </button>
  <button onClick={handleRedeploy} disabled={redeploying}>
    {redeploying ? 'Redeploying...' : 'Redeploy'}
  </button>
  </div>
)  : (
  <button className="ap-btn ap-btn-purple" onClick={() => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdYm2Rg-j6zkYOdqcCUFUc69jZ_PQwDzCs5HlFgucevPqeedQ/viewform?usp=publish-editor",
      "_blank"
    )
  }}>
    {deploying ? '⏳ Deploying...' : '🚀 Deploy'}
  </button>
 
)}


  </div>
  
)}
          </div>
        </nav>

        <div className="ap-layout">

          {/* SIDEBAR */}
          <aside className="ap-sidebar">
            <div>
              <div className="ap-lbl">App Name</div>
              <h2 className="ap-title">{app?.title}</h2>
            </div>
            <div>
              <div className="ap-lbl">Description</div>
              <div className="ap-prompt">"{app?.prompt}"</div>
            </div>

            {success && <div className="ap-success">{success}</div>}
            {error   && <div className="ap-error">{error}<button onClick={()=>setError('')} className="ap-err-x">x</button></div>}

            {isReady && (
              <div className="ap-files-info">
                <div className="ap-lbl">Generated Files</div>
                {TABS.map(t => (
                  <div key={t} className={`ap-file-item ${tab===t?'ap-file-active':''}`} onClick={() => setTab(t)}>
                    <span className="ap-file-icon">{TAB_ICONS[t]}</span>
                    <span className="ap-file-name">{TAB_LABELS[t]}</span>
                  </div>
                ))}
              </div>
            )}

            {isReady && (
              <div className="ap-download-section">
               
                {!isPaid ? (
                  <div className="ap-pay-car">
                   
                    
                    
                  </div>
                ) : (
                  
<div className="ap-dl-card">
  <div style={{fontSize:20,marginBottom:10}}>⬇️ Download</div>
  <button className="ap-dl-btn" onClick={handleDownloadZip} style={{marginBottom:8}}>
    📦 Download ZIP
  </button>
  <button className="ap-dl-btn" onClick={handleDownloadApk} style={{background:'#5b4fff'}}>
    📱 Download APK Project
  </button>
  
  <p style={{fontSize:10,color:'#5050a0',marginTop:8,lineHeight:1.5}}>
    APK ZIP includes build instructions for Android Studio
  </p>
</div>
                )}
              </div>
            )}

            <div className="ap-date">
              Created {new Date(app?.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="ap-main">
           {isGenerating ? (
  <div className="ap-gen-state">
    <div className="ap-gen-ring"/>
    <h3 className="ap-gen-title">Building your application...</h3>
    <p className="ap-gen-sub">{currentStep || 'Claude AI is generating your app...'}</p>
    <div className="ap-gen-files">
      {['React Frontend', 'Node.js Backend', 'Database Schema', 'Setup Guide'].map((f,i) => (
        <div key={i} className="ap-gen-file">
          <div className="ap-gen-dot" style={{animationDelay:`${i*0.3}s`}}/>
          <span>{f}</span>
        </div>
      ))}
    </div>
  </div>
)  : isReady ? (
              <div className="ap-code-view">
                {/* Tab bar */}
               <div className="ap-tabs">
  {TABS.map(t => (
    <button key={t} className={`ap-tab ${tab===t?'ap-tab-active':''}`} onClick={() => setTab(t)}>
      {TAB_ICONS[t]} {TAB_LABELS[t]}
    </button>
  ))}
  
  {tab !== 'preview' && (
    <button className="ap-copy-btn" onClick={copyCode}>
      {copied ? 'Copied!' : 'Copy Code'}
    </button>
  )}
</div>

                {/* Preview or code block */}
{/* Preview or code block */}
{tab === 'preview' ? (
  <div className="ap-preview-wrap">
    <Sandpack
      template="react"
      theme="dark"
      files={{ '/App.js': app?.frontend || '' }}
      options={{
        showConsole: true,
        showConsoleButton: true,
        editorHeight: 600,
        editorWidthPercentage: 40,
      }}
    />
  </div>
) : (
  <div className="ap-code-wrap">
    <div className="ap-code-header">
      <span className="ap-code-filename">
        {tab === 'frontend' ? 'src/App.jsx' :
         tab === 'backend'  ? 'server.js' :
         tab === 'schema'   ? 'schema.sql' : 'README.md'}
      </span>
      <span className="ap-code-lines">{currentCode.split('\n').length} lines</span>
    </div>
    <pre className="ap-pre"><code>{currentCode}</code></pre>
  </div>
)}
              </div>
            ) : (
              <div className="ap-gen-state">
                <div style={{fontSize:48}}>Generation Failed</div>
                <p className="ap-gen-sub">Something went wrong. Please go back and try again.</p>
                <button style={S.outBtn} onClick={() => navigate('/apps')}>Back to Apps</button>
              </div>
            )}
          </main>
        </div>
      </div>

      {showDomainModal && (
  <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}}>
    <div style={{background:'#0f0f22',border:'1px solid #2a2a4a',borderRadius:16,padding:24,maxWidth:480,width:'90%',color:'#e0e0f0'}}>
      <h3 style={{marginBottom:12}}>🌐 Custom Domain</h3>

      {!app?.custom_domain ? (
        <>
          <p style={{fontSize:13,color:'#a0a0c0',marginBottom:10,lineHeight:1.6}}>
            Don't have a domain yet? Buy one from{' '}
            <a href="https://www.namecheap.com" target="_blank" rel="noopener noreferrer" style={{color:'#a090ff'}}>Namecheap</a>,{' '}
            <a href="https://www.godaddy.com" target="_blank" rel="noopener noreferrer" style={{color:'#a090ff'}}>GoDaddy</a>, or{' '}
            <a href="https://www.hostinger.in" target="_blank" rel="noopener noreferrer" style={{color:'#a090ff'}}>Hostinger</a>
            {' '}— usually ₹300–800/year.
          </p>
          <input
            value={domainInput}
            onChange={e => setDomainInput(e.target.value)}
            placeholder="e.g. myapp.com or app.myapp.com"
            style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #2a2a4a',background:'#0a0a16',color:'#e0e0f0',marginBottom:10}}
          />
          {domainError && <p style={{color:'#f87171',fontSize:12,marginBottom:8}}>{domainError}</p>}
          <button className="ap-btn ap-btn-purple" style={{width:'100%',background:'#0284c7'}}
            disabled={domainLoading} onClick={handleConnectDomain}>
            {domainLoading ? 'Connecting...' : 'Connect Domain'}
          </button>
        </>
      ) : (
        <>
          <p style={{fontSize:13,marginBottom:10}}>
            Domain: <b>{app.custom_domain}</b> —{' '}
            <span style={{color: domainVerified ? '#4ade80' : '#fbbf24'}}>
              {domainVerified ? '✅ Live' : '⏳ Waiting for DNS'}
            </span>
          </p>

          {!domainVerified && domainRecord && (
            <div style={{background:'#0a0a16',border:'1px solid #1e1e3a',borderRadius:10,padding:12,marginBottom:10,fontSize:12,fontFamily:'monospace'}}>
              <p>Add this record at your domain registrar's DNS settings:</p>
              <p style={{marginTop:6}}>Type: <b>{domainRecord.type}</b></p>
              <p>Host: <b>{domainRecord.name}</b></p>
              <p>Value: <b>{domainRecord.value}</b></p>
              <p style={{marginTop:8,color:'#6060a0'}}>Usually live within 5–30 minutes. SSL is issued automatically.</p>
            </div>
          )}
        </>
      )}

      <button className="ap-btn" style={{width:'100%',marginTop:10,background:'#1e1e3a'}}
        onClick={() => setShowDomainModal(false)}>Close</button>
    </div>
  </div>
)}

    </>
  )
}



// Normalizes old single-string apps and new multi-file apps into one shape
const getFrontendFiles = (app) => {
  if (app?.frontend_files && typeof app.frontend_files === 'object') {
    return typeof app.frontend_files === 'string'
      ? JSON.parse(app.frontend_files)
      : app.frontend_files
  }
  // Fallback for old apps generated before this change
  return app?.frontend ? { 'src/App.jsx': app.frontend } : {}
}

const Loader = () => (
  <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,fontFamily:'Nunito,sans-serif'}}>
    <div style={{width:38,height:38,border:'3px solid #e2e2ea',borderTopColor:'#5b4fff',borderRadius:'50%',animation:'spin 1s linear infinite'}}/>
    <p style={{color:'#a0a0b0',fontWeight:600,fontSize:14}}>Loading...</p>
    <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
  </div>
)

const S = {
  center:{ minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:18,fontFamily:'Nunito,sans-serif' },
  outBtn:{ padding:'10px 20px',borderRadius:9,background:'transparent',border:'1.5px solid #e2e2ea',fontSize:13,fontWeight:700,color:'#3a3a4a',cursor:'pointer',fontFamily:'Nunito,sans-serif' },
}
function buildMultiFilePreviewHtml(files) {
  if (!files || Object.keys(files).length === 0) {
    return `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;color:#888">No frontend files to preview</body></html>`
  }

  const entries = Object.entries(files).filter(([path]) =>
    /\.(jsx?|tsx?)$/.test(path) && path !== 'src/main.jsx'
  )

  const appEntry = entries.find(([path]) => path === 'src/App.jsx')
  const others   = entries.filter(([path]) => path !== 'src/App.jsx')

  const componentFiles = others.filter(([p]) => !p.startsWith('src/pages/'))
  const pageFiles      = others.filter(([p]) => p.startsWith('src/pages/'))

  // Raw, UNSTRIPPED code — Babel (inside the iframe) will parse and remove
  // import/export via real AST transformation instead of fragile regex.
  const rawCode = [...componentFiles, ...pageFiles, appEntry]
    .filter(Boolean)
    .map(([, content]) => content || '')
    .join('\n\n')

  const css = files['src/index.css'] || ''

  // Only escape the one sequence that would break out of the <script> tag
  const escapedCode = rawCode.replace(/<\/script/gi, '<\\/script')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/react-router-dom@6/dist/umd/react-router-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>
body{margin:0;font-family:system-ui,sans-serif;background:#fff;color:#111;}
${css}
</style>
</head>
<body>
<div id="root">Loading preview...</div>

<script id="raw-app-code" type="text/plain">${escapedCode}</script>

<script>
window.ReactRouterDOM = window.ReactRouterDOM || {
  BrowserRouter: ({ children }) => React.createElement(React.Fragment, null, children),
  Routes: ({ children }) => React.createElement(React.Fragment, null, children),
  Route: () => null,
  Link: 'a',
  NavLink: 'a',
  useNavigate: () => () => {},
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
  Navigate: () => null,
  Outlet: () => null,
};

window.onerror = function(msg, src, line, col) {
  document.getElementById('root').innerHTML =
    '<pre style="color:#c00;padding:20px;white-space:pre-wrap;font-family:monospace;font-size:12px;">' +
    'Error: ' + msg + '\\n(line ' + line + ':' + col + ')' +
    '</pre>'
  return true
}

try {
 const { useState, useEffect, useCallback, useContext, useRef, useMemo, useReducer, Fragment } = React;

const RRD = (typeof ReactRouterDOM !== 'undefined' && ReactRouterDOM) ? ReactRouterDOM : {};
if (!RRD.Routes) {
  console.warn('react-router-dom failed to load from CDN — routing disabled in this preview.');
}
const {
  BrowserRouter = ({ children }) => React.createElement(React.Fragment, null, children),
  Routes         = ({ children }) => React.createElement(React.Fragment, null, children),
  Route          = () => null,
  Link           = 'a',
  NavLink        = 'a',
  useNavigate    = () => () => {},
  useParams      = () => ({}),
  useLocation    = () => ({ pathname: '/' }),
  Navigate       = () => null,
  Outlet         = () => null,
} = RRD;
  const rawSource = document.getElementById('raw-app-code').textContent;

  // Babel plugin: strip ES module import/export syntax via real AST parsing.
  // This replaces the old regex-based stripFile() and cannot miss any
  // valid import/export form, since it works on the parsed syntax tree.
  function stripModulesPlugin(babel) {
    const t = babel.types;
    return {
      visitor: {
        ImportDeclaration(path) { path.remove(); },
        ExportDefaultDeclaration(path) {
          const decl = path.node.declaration;
          if (t.isFunctionDeclaration(decl) || t.isClassDeclaration(decl)) {
            path.replaceWith(decl);
          } else if (decl) {
            path.replaceWith(t.expressionStatement(decl));
          } else {
            path.remove();
          }
        },
        ExportNamedDeclaration(path) {
          if (path.node.declaration) path.replaceWith(path.node.declaration);
          else path.remove();
        },
        ExportAllDeclaration(path) { path.remove(); },
        CallExpression(path) {
          if (path.node.callee.type === 'Import') {
            path.replaceWithSourceString('Promise.resolve({ default: () => null })');
          }
        },
        MetaProperty(path) {
          path.replaceWithSourceString('({ env: {} })');
        },
      },
    };
  }

  const transformed = Babel.transform(rawSource, {
    presets: ['react'],
    plugins: [stripModulesPlugin],
    filename: 'App.jsx',
  }).code;

  const runner = new Function(
    'React', 'ReactDOM', 'ReactRouterDOM',
    'useState', 'useEffect', 'useCallback', 'useContext', 'useRef', 'useMemo', 'useReducer', 'Fragment',
    'BrowserRouter', 'Routes', 'Route', 'Link', 'NavLink', 'useNavigate', 'useParams', 'useLocation', 'Navigate', 'Outlet',
    transformed + '\\nif (typeof App !== "undefined") { return App; } return null;'
  );

  const App = runner(
    React, ReactDOM, ReactRouterDOM,
    useState, useEffect, useCallback, useContext, useRef, useMemo, useReducer, Fragment,
    BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams, useLocation, Navigate, Outlet
  );

  if (!App) {
    document.getElementById('root').innerHTML =
      '<pre style="color:#c00;padding:20px;">No App component found in generated code.</pre>';
  } else {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(BrowserRouter, null, React.createElement(App)));
  }
} catch (e) {
  document.getElementById('root').innerHTML =
    '<pre style="color:#c00;padding:20px;white-space:pre-wrap;font-family:monospace;font-size:12px;">' +
    'Error: ' + (e && e.message ? e.message : String(e)) +
    '</pre>';
}
</script>
</body>
</html>`
}
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.ap-preview-wrap{flex:1;overflow:hidden;display:flex;height:100%;min-height:500px;}
.ap-preview-wrap > div{width:100%;height:100%;}
.ap-root{min-height:100vh;background:#0d0d1a;font-family:'Nunito',sans-serif;color:#e0e0f0;}

/* NAV */
.ap-nav{position:sticky;top:0;z-index:100;height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;gap:8px;background:rgba(13,13,26,0.97);backdrop-filter:blur(14px);border-bottom:1px solid #1e1e3a;}
.ap-back{display:flex;align-items:center;gap:6px;padding:7px 13px;border-radius:8px;background:transparent;border:1.5px solid #2a2a4a;font-size:12px;font-weight:700;color:#9090c0;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.ap-back:hover{border-color:#5b4fff;color:#a090ff;}
.ap-status-pill{padding:5px 13px;border-radius:100px;font-size:12px;font-weight:700;background:rgba(91,79,255,0.15);color:#a090ff;}
.ap-btn{padding:7px 14px;border-radius:8px;border:none;font-size:12px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.ap-btn:disabled{opacity:0.45;cursor:not-allowed;}
.ap-btn-purple{background:#5b4fff;color:#fff;box-shadow:0 2px 10px rgba(91,79,255,0.35);}
.ap-btn-purple:hover:not(:disabled){opacity:0.87;transform:translateY(-1px);}
.ap-preview-wrap{flex:1;overflow:hidden;display:flex;}
.ap-preview-wrap > div{width:100%;}
/* LAYOUT */
.ap-layout{display:grid;grid-template-columns:280px 1fr;height:calc(100vh - 58px);}

/* SIDEBAR */
.ap-sidebar{border-right:1px solid #1e1e3a;padding:20px;display:flex;flex-direction:column;gap:16px;overflow-y:auto;background:#0a0a16;}
.ap-lbl{font-size:10px;font-weight:800;color:#4a4a7a;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;}
.ap-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#e0e0f0;line-height:1.3;}
.ap-prompt{font-size:12px;color:#6060a0;font-weight:500;line-height:1.6;background:#0f0f22;border:1px solid #1e1e3a;border-radius:10px;padding:10px;font-style:italic;}
.ap-success{background:rgba(34,197,94,0.08);border:1.5px solid rgba(34,197,94,0.2);border-radius:10px;padding:11px;font-size:12px;font-weight:700;color:#4ade80;}
.ap-error{background:rgba(239,68,68,0.08);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:11px 12px;font-size:12px;color:#f87171;font-weight:600;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
.ap-err-x{background:none;border:none;color:#f87171;cursor:pointer;font-size:14px;font-weight:800;padding:0;flex-shrink:0;}
.ap-date{margin-top:auto;font-size:11px;color:#3a3a5a;font-weight:600;padding-top:14px;border-top:1px solid #1a1a30;}

/* FILE LIST */
/* delete these two old lines inside @media(max-width:700px) */
.ap-files-info{flex-direction:row;flex-wrap:wrap;gap:6px;}
.ap-file-item{flex:1 1 45%;padding:8px 10px;}
.ap-file-item:hover{border-color:#5b4fff;background:rgba(91,79,255,0.08);}
.ap-file-active{border-color:#5b4fff;background:rgba(91,79,255,0.12);}
.ap-file-icon{font-size:16px;}
.ap-file-name{font-size:12px;font-weight:700;color:#b0b0e0;}

/* PAY CARD */
.ap-pay-card{background:#0f0f22;border:1.5px solid #2a2a4a;border-radius:13px;padding:13px;}
.ap-pay-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px;}
.ap-pay-name{font-size:13px;font-weight:800;color:#e0e0f0;margin-bottom:3px;}
.ap-pay-sub{font-size:11px;color:#6060a0;font-weight:500;}
.ap-pay-price{font-size:20px;font-weight:900;color:#a090ff;flex-shrink:0;}
.ap-pay-btn{width:100%;padding:10px;border-radius:9px;background:#5b4fff;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;margin-bottom:7px;transition:all .18s;box-shadow:0 2px 10px rgba(91,79,255,0.35);}
.ap-pay-btn:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
.ap-pay-btn:disabled{background:#2a2a4a;cursor:not-allowed;}
.ap-dl-card{background:rgba(34,197,94,0.06);border:1.5px solid rgba(34,197,94,0.2);border-radius:13px;padding:14px;text-align:center;}
.ap-dl-btn{width:100%;padding:10px;border-radius:9px;background:#22c55e;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;margin-top:8px;transition:all .18s;}
.ap-dl-btn:hover{opacity:0.88;}
.ap-note{font-size:10px;color:#4a4a7a;font-weight:600;text-align:center;margin-top:6px;}
.ap-download-section{display:flex;flex-direction:column;gap:8px;}

.ap-preview-wrap{flex:1;overflow:hidden;display:flex;height:100%;min-height:500px;}
.ap-preview-wrap > div{width:100%;height:100%;}

/* MAIN / CODE VIEW */
.ap-main{overflow:hidden;display:flex;flex-direction:column;background:#0d0d1a;}
.ap-code-view{display:flex;flex-direction:column;height:100%;}
.ap-tabs{display:flex;gap:0;border-bottom:1px solid #1e1e3a;background:#0a0a16;padding:0 16px;align-items:center;flex-shrink:0;}
.ap-tab{padding:12px 16px;border:none;background:transparent;font-size:12px;font-weight:700;color:#5050a0;cursor:pointer;font-family:'Nunito',sans-serif;border-bottom:2px solid transparent;transition:all .15s;display:flex;align-items:center;gap:6px;white-space:nowrap;}
.ap-tab:hover{color:#a090ff;}
.ap-tab-active{color:#a090ff;border-bottom-color:#5b4fff;}
.ap-copy-btn{margin-left:auto;padding:6px 14px;border-radius:7px;background:#1e1e3a;border:1px solid #2a2a4a;font-size:11px;font-weight:700;color:#8080c0;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;white-space:nowrap;}
.ap-copy-btn:hover{background:#2a2a4a;color:#a090ff;}
.ap-code-header{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#0a0a16;border-bottom:1px solid #1a1a30;flex-shrink:0;}
.ap-code-filename{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:#6060c0;}
.ap-code-lines{font-size:11px;color:#3a3a5a;font-weight:600;}
.ap-code-wrap{display:flex;flex-direction:column;flex:1;overflow:hidden;}
.ap-pre{flex:1;overflow:auto;padding:18px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.65;color:#c8d3f5;background:#0d0d1a;white-space:pre;word-wrap:normal;}
.ap-preview-wrap{flex:1;overflow:hidden;display:flex;height:100%;min-height:500px;}
.ap-preview-wrap > div{width:100%;height:100%;}
  
/* GENERATING STATE */
.ap-gen-state{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:18px;padding:40px;text-align:center;}
.ap-gen-ring{width:72px;height:72px;border:3px solid #1e1e3a;border-top-color:#5b4fff;border-radius:50%;animation:spin 0.9s linear infinite;flex-shrink:0;}
.ap-gen-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:800;color:#e0e0f0;}
.ap-gen-sub{font-size:13px;color:#6060a0;font-weight:500;max-width:360px;line-height:1.6;}
.ap-gen-files{display:flex;flex-direction:column;gap:10px;width:100%;max-width:260px;}
.ap-gen-file{display:flex;align-items:center;gap:10px;font-size:12px;color:#6060a0;font-weight:600;}
.ap-gen-dot{width:8px;height:8px;border-radius:50%;background:#5b4fff;flex-shrink:0;animation:pulse 1.5s ease-in-out infinite;}

/* ===== TABLET ===== */
@media(max-width:1024px){
  .ap-layout{grid-template-columns:230px 1fr;}
  .ap-sidebar{padding:16px;gap:14px;}
  .ap-pre{font-size:11.5px;padding:14px;}
}

/* ===== MOBILE / SMALL TABLET ===== */
@media(max-width:700px){
  .ap-nav{height:auto;flex-wrap:wrap;padding:10px 12px;gap:8px;}
  .ap-status-pill{order:3;}
  .ap-layout{grid-template-columns:1fr;grid-template-rows:auto 1fr;height:auto;min-height:calc(100vh - 58px);}
  .ap-sidebar{
    max-height:none;
    border-right:none;
    border-bottom:1px solid #1e1e3a;
    padding:16px;
  }
  .ap-title{font-size:15px;}
  .ap-prompt{font-size:11.5px;}
  .ap-files-info{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:8px;
  }
  .ap-file-item{flex:none;padding:8px 10px;}
  .ap-download-section{position:sticky;bottom:0;background:#0a0a16;padding-top:8px;}

  .ap-main{min-height:60vh;}
  .ap-tabs{
    overflow-x:auto;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:none;
    padding:0 10px;
  }
    .ap-file-tabs{display:flex;gap:6px;padding:8px 16px;background:#0a0a16;border-bottom:1px solid #1a1a30;overflow-x:auto;flex-shrink:0;}
.ap-file-tab{padding:5px 12px;border-radius:6px;background:#1a1a30;border:1px solid #2a2a4a;font-size:11px;font-weight:600;color:#8080c0;cursor:pointer;font-family:'JetBrains Mono',monospace;white-space:nowrap;transition:all .15s;}
.ap-file-tab:hover{border-color:#5b4fff;color:#a090ff;}
.ap-file-tab-active{background:rgba(91,79,255,0.15);border-color:#5b4fff;color:#a090ff;}
  .ap-tabs::-webkit-scrollbar{display:none;}
  .ap-tab{padding:10px 12px;font-size:11px;flex-shrink:0;}
  .ap-copy-btn{padding:6px 10px;font-size:10px;}
  .ap-code-header{padding:8px 12px;flex-wrap:wrap;gap:4px;}
  .ap-pre{font-size:11px;padding:12px;line-height:1.55;}
  .ap-preview-wrap{min-height:420px;}

  .ap-gen-state{padding:24px;gap:14px;}
  .ap-gen-ring{width:54px;height:54px;}
  .ap-gen-title{font-size:18px;}
  .ap-gen-sub{font-size:12px;}
}

/* ===== VERY SMALL PHONES ===== */
@media(max-width:400px){
  .ap-back{font-size:11px;padding:6px 10px;}
  .ap-btn{padding:6px 10px;font-size:11px;}
  .ap-title{font-size:14px;}
  .ap-file-item{flex:1 1 100%;}
  .ap-tab{padding:9px 10px;font-size:10.5px;}
}
`
