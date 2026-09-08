import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import zaterLogo from '../assets/zater-logo.jpeg'

const TABS = ['dashboard','users','apps','projects','templates','payments','credits','ads','analytics']
const TAB_ICONS = { dashboard:'📊', users:'👥', apps:'⚛️', projects:'🌐', templates:'🧩', payments:'💳', credits:'🪙', ads:'📢', analytics:'📈' }
const adminApi = {
  base: () => import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: () => ({ 'Content-Type':'application/json', Authorization:`Bearer ${localStorage.getItem('zater_admin_token')||''}` }),
  get: async (p) => { const r=await fetch(`${adminApi.base()}${p}`,{headers:adminApi.headers()}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Failed'); return d },
  post: async (p,b) => { const r=await fetch(`${adminApi.base()}${p}`,{method:'POST',headers:adminApi.headers(),body:JSON.stringify(b)}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Failed'); return d },
  put: async (p,b) => { const r=await fetch(`${adminApi.base()}${p}`,{method:'PUT',headers:adminApi.headers(),body:JSON.stringify(b)}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Failed'); return d },
  del: async (p) => { const r=await fetch(`${adminApi.base()}${p}`,{method:'DELETE',headers:adminApi.headers()}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Failed'); return d },
}

export default function AdminPage() {
  const navigate   = useNavigate()
  const fileRef    = useRef(null)
  const editFileRef= useRef(null)

  const [isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem('zater_admin_token'))
const [loginEmail,setLoginEmail]=useState('zaterbusiness@gmail.com')
  const [loginPw,setLoginPw]=useState('')
  const [showPw,setShowPw]=useState(false)
  const [loginErr,setLoginErr]=useState('')
  const [loginLoad,setLoginLoad]=useState(false)
  const [adminInfo,setAdminInfo]=useState(()=>{ try{return JSON.parse(localStorage.getItem('zater_admin_info')||'null')}catch{return null} })

  const [tab,setTab]=useState('dashboard')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')

  const [dash,setDash]=useState(null)
  const [users,setUsers]=useState([])
  const [uSearch,setUSearch]=useState('')
  const [uTotal,setUTotal]=useState(0)
  const [projects,setProj]=useState([])
  const [pSearch,setPSearch]=useState('')
  const [pStatus,setPStatus]=useState('')
  const [pTotal,setPTotal]=useState(0)
  const [payments,setPaym]=useState([])
  const [payRev,setPayRev]=useState(0)

  // ── Templates ─────────────────────────────────────────────
  const [templates,setTemplates]=useState([])
  const [tSearch,setTSearch]=useState('')
  const [tTotal,setTTotal]=useState(0)
  const [tStats,setTStats]=useState({totalDeployments:0,totalDeployedUsers:0})

  // ── Ads management ────────────────────────────────────────────────────────
  const [ads,setAds]             = useState([])
  const [adForm,setAdForm]       = useState({ title:'', link_url:'', link_text:'Get Started →', is_active:true })
  const [adImage,setAdImage]     = useState(null)
  const [adSaving,setAdSaving]   = useState(false)
  const [editAd,setEditAd]       = useState(null)
  const [editAdImg,setEditAdImg] = useState(null)
  // ─────────────────────────────────────────────────────────────────────────

  const [views,setViews]=useState(null)

const [creditUsers,setCreditUsers]   = useState([])
const [creditSearch,setCreditSearch] = useState('')
const [creditTotal,setCreditTotal]   = useState(0)
const [creditEdit,setCreditEdit]     = useState(null)   // { userId, name, credits, delta:'' }
const [creditSaving,setCreditSaving] = useState(false)

  const [selUser,setSelUser]=useState(null)
  const [userDetail,setUserDetail]=useState(null)
  const [detailLoad,setDetailLoad]=useState(false)
  const [detailTab,setDetailTab]=useState('projects')
  const [confirm,setConfirm]=useState(null)
const [platformEnabled, setPlatformEnabled] = useState(true)
const [platformSaving, setPlatformSaving]   = useState(false)
const [apps,setApps]           = useState([])
const [appsSearch,setAppsSearch] = useState('')
const [appsTotal,setAppsTotal]   = useState(0)
const [pushingGit,setPushingGit] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault(); setLoginLoad(true); setLoginErr('')
    try {
      const r = await fetch(`${adminApi.base()}/admin/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:loginEmail,password:loginPw})})
      const d = await r.json()
      if (!r.ok) throw new Error(d.error)
      localStorage.setItem('zater_admin_token',d.token)
      localStorage.setItem('zater_admin_info',JSON.stringify(d.admin))
      setAdminInfo(d.admin); setIsLoggedIn(true)
    } catch(err){setLoginErr(err.message)} finally{setLoginLoad(false)}
  }
const pushAppToGithub = async (app) => {
  setPushingGit(app.id); setError('')
  try {
    const d = await adminApi.post(`/admin/apps/${app.id}/github-push`)
    setApps(prev => prev.map(a => a.id===app.id ? {...a, github_repo_url: d.url} : a))
    setSuccess(d.alreadyPushed ? 'Already pushed — opening existing repo.' : 'Pushed to GitHub!')
    window.open(d.url, '_blank')
  } catch (err) { setError(err.message) }
  finally { setPushingGit(null) }
}
  const handleLogout = () => {
    localStorage.removeItem('zater_admin_token'); localStorage.removeItem('zater_admin_info')
    setIsLoggedIn(false); setAdminInfo(null); setSelUser(null); setUserDetail(null); setDash(null)
  }
const load = useCallback(async (t=tab) => {
  setLoading(true); setError('')
  try {
    if (t==='dashboard') {
      const [d, ps] = await Promise.all([
        adminApi.get('/admin/dashboard'),
        adminApi.get('/admin/platform-status')
      ])
      setDash(d)
      setPlatformEnabled(ps.enabled)
    }
    else if (t==='users') { const d=await adminApi.get(`/admin/users?search=${encodeURIComponent(uSearch)}&page=1`); setUsers(d.users||[]); setUTotal(d.total||0) }
    else if (t==='projects') { const d=await adminApi.get(`/admin/projects?search=${encodeURIComponent(pSearch)}&status=${pStatus}`); setProj(d.projects||[]); setPTotal(d.total||0) }
    else if (t==='templates') { const d=await adminApi.get(`/admin/templates?search=${encodeURIComponent(tSearch)}&page=1`); setTemplates(d.deployments||[]); setTTotal(d.total||0); setTStats({totalDeployments:d.totalDeployments||0,totalDeployedUsers:d.totalDeployedUsers||0}) }
    else if (t==='payments') { const d=await adminApi.get('/admin/payments'); setPaym(d.payments||[]); setPayRev(d.revenue||0) }
    else if (t==='credits') {
      const d = await adminApi.get(`/admin/credits/users?search=${encodeURIComponent(creditSearch)}`)
      setCreditUsers(d.users||[])
      setCreditTotal(d.total||0)
    }
    else if (t==='ads') { const d=await adminApi.get('/ads/admin/list'); setAds(d.ads||[]) }
    else if (t==='analytics') { const d=await adminApi.get('/ads/admin/views'); setViews(d) }
    else if (t==='apps') {
  const d = await adminApi.get(`/admin/apps?search=${encodeURIComponent(appsSearch)}`)
  setApps(d.apps||[]); setAppsTotal(d.total||0)
}
  } catch(err) {
    const msg = err.message||''
    if (msg.includes('Invalid admin')||msg.includes('No admin token')||msg.includes('expired')||msg.includes('not found')) {
      handleLogout(); return
    }
    setError(msg)
  } finally { setLoading(false) }
},[tab,uSearch,pSearch,pStatus,tSearch])

  useEffect(()=>{ if(isLoggedIn) load(tab) },[tab,isLoggedIn])

  const pickImage = (file,setter) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => setter({base64:e.target.result, type:file.type, preview:e.target.result})
    reader.readAsDataURL(file)
  }

  const createAd = async () => {
    if (!adForm.title.trim()) { setError('Title is required.'); return }
    if (!adImage?.base64) { setError('Please upload an image.'); return }
    setAdSaving(true); setError('')
    try {
      await adminApi.post('/ads/admin/create',{title:adForm.title,imageBase64:adImage.base64,imageType:adImage.type,link_url:adForm.link_url,link_text:adForm.link_text,is_active:adForm.is_active})
      setSuccess('Ad created!'); setAdForm({title:'',link_url:'',link_text:'Get Started →',is_active:true}); setAdImage(null)
      if (fileRef.current) fileRef.current.value=''; load('ads')
    } catch(err){setError(err.message)} finally{setAdSaving(false)}
  }

  const saveEditAd = async () => {
    if (!editAd) return; setAdSaving(true); setError('')
    try {
      await adminApi.put(`/ads/admin/${editAd.id}`,{title:editAd.title,link_url:editAd.link_url,link_text:editAd.link_text,is_active:editAd.is_active,...(editAdImg?{imageBase64:editAdImg.base64,imageType:editAdImg.type}:{})})
      setSuccess('Ad updated!'); setEditAd(null); setEditAdImg(null); load('ads')
    } catch(err){setError(err.message)} finally{setAdSaving(false)}
  }

  const toggleAdActive = async (ad) => {
    try { await adminApi.put(`/ads/admin/${ad.id}`,{is_active:ad.is_active?0:1}); setSuccess(`Ad ${ad.is_active?'paused':'activated'}.`); load('ads') }
    catch(err){setError(err.message)}
  }

  const openUser = async (u) => {
    setSelUser(u); setUserDetail(null); setDetailLoad(true); setDetailTab('projects')
    try { const d=await adminApi.get(`/admin/users/${u.id}/full`); setUserDetail(d) }
    catch(err){setError(err.message)} finally{setDetailLoad(false)}
  }

  const deleteUser = (u) => setConfirm({title:'🗑️ Delete Account',msg:`Delete "${u.name}"? All their data will be removed.`,color:'#dc2626',
    action:async()=>{ await adminApi.del(`/admin/users/${u.id}`); setSuccess(`${u.name} deleted.`); setSelUser(null); setUserDetail(null); load('users') }})

  const toggleStatus = (u) => {
    const pausing=(u.status||'active')!=='paused'
    setConfirm({title:pausing?'⏸️ Pause Account':'▶️ Reactivate',msg:pausing?`Pause "${u.name}"?`:`Reactivate "${u.name}"?`,color:pausing?'#f59e0b':'#22c55e',
      action:async()=>{ await adminApi.put(`/admin/users/${u.id}/status`,{status:pausing?'paused':'active'}); setSuccess(`Account ${pausing?'paused':'reactivated'}.`); if(userDetail) setUserDetail(d=>({...d,user:{...d.user,status:pausing?'paused':'active'}})); load('users') }})
  }

  const updateRole = async (u,role) => {
    try { await adminApi.put(`/admin/users/${u.id}/role`,{role}); setSuccess(`${u.name} is now ${role}.`); load('users'); if(userDetail) setUserDetail(d=>({...d,user:{...d.user,role}})) }
    catch(err){setError(err.message)}
  }

  const fmt=(n)=>Number(n||0).toLocaleString('en-IN')
  const fmtRs=(p)=>`₹${fmt(Math.round(Number(p||0)/100))}`
  const fmtDay=(d)=>d?new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'—'
  const fmtDt=(d)=>d?new Date(d).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'—'
  const stColor=(s)=>({ready:'#16a34a',generating:'#d97706',failed:'#dc2626',paid:'#16a34a',active:'#16a34a',paused:'#f59e0b'}[s]||'#6b6b7a')
  const imgSrc=(url)=>url?(url.startsWith('http')?url:`${adminApi.base().replace('/api','')}${url}`):''

  // Build the hosted URL from subdomain or direct url field
  const buildHostedUrl = (row) => {
    if (row.hosted_url && row.hosted_url.trim()) return row.hosted_url.trim()
    if (row.hosted_subdomain && row.hosted_subdomain.trim()) {
      const base = import.meta.env.VITE_HOSTED_BASE_URL || `${window.location.origin}/sites`
      return `${base}/${row.hosted_subdomain}`
    }
    return null
  }

  if (!isLoggedIn) return (
    <>
      <style>{CSS}</style>
      <div className="al-root">
        <div className="al-dotgrid"/>
        <div className="al-card">
          <div className="al-logo">
            <img src={zaterLogo} alt="Zater" style={{width:38,height:38,borderRadius:10,objectFit:'cover'}}/>
            <div><div className="al-brand">Zater Web Studio</div><div className="al-sub">Admin Control Panel</div></div>
          </div>
          <div className="al-badge">🔐 Admin Access Only</div>
          <h1 className="al-title">Sign in to Admin</h1>
          {loginErr && <div className="al-err">⚠️ {loginErr}</div>}
          <form onSubmit={handleLogin} className="al-form">
            <div className="al-field"><label className="al-label">Admin Email</label><input className="al-input" type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} required autoFocus/></div>
            <div className="al-field">
              <label className="al-label">Password</label>
              <div style={{position:'relative'}}>
                <input className="al-input" type={showPw?'text':'password'} placeholder="Your admin password" value={loginPw} onChange={e=>setLoginPw(e.target.value)} required style={{paddingRight:44}}/>
                <button type="button" onClick={()=>setShowPw(o=>!o)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',fontSize:16,cursor:'pointer'}}>{showPw?'🙈':'👁️'}</button>
              </div>
            </div>
            <button className="al-btn" type="submit" disabled={loginLoad||!loginPw}>{loginLoad?'Signing in...':'🔐 Sign In to Admin Panel'}</button>
          </form>
          <button className="al-back" onClick={()=>navigate('/')}>← Back to App</button>
          <div className="al-note">Session stays active until you manually logout</div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{CSS}</style>
      <div className="adm-root">
        <aside className="adm-sidebar">
          <div className="adm-brand">
            <div className="adm-brand-icon">Z</div>
            <div><div className="adm-brand-name">Zater Admin</div><div className="adm-brand-sub">Control Panel</div></div>
          </div>
          <nav className="adm-nav">
            {TABS.map(t=>(
              <button key={t} className={`adm-nav-btn ${tab===t?'adm-nav-active':''}`} onClick={()=>{setTab(t);setSelUser(null);setUserDetail(null)}}>
                <span>{TAB_ICONS[t]}</span><span>{t.charAt(0).toUpperCase()+t.slice(1)}</span>
              </button>
            ))}
          </nav>
          <div style={{flex:1}}/>
          {dash && (
            <div className="adm-sidebar-stats">
              <div className="adm-ss">👥 {fmt(dash.stats?.totalUsers)} users</div>
              <div className="adm-ss">🌐 {fmt(dash.stats?.totalProjects)} sites</div>
              <div className="adm-ss">🧩 {fmt(tStats.totalDeployments)} deployed</div>
              <div className="adm-ss">💰 {fmtRs(dash.stats?.totalRevenue)}</div>
              {views && <div className="adm-ss">👁️ {fmt(views.totalViews)} views</div>}
              {ads.length>0 && <div className="adm-ss">📢 {ads.filter(a=>a.is_active).length} active ads</div>}
            </div>
          )}
          <div className="adm-sidebar-footer">
            <div className="adm-admin-pill">{adminInfo?.name||'Admin'}</div>
            <button className="adm-logout-btn" onClick={()=>setConfirm({title:'🚪 Logout',msg:'Logout from admin panel?',color:'#dc2626',action:handleLogout})}>Logout</button>
          </div>
        </aside>

        <main className="adm-main">
          <div className="adm-topbar">
            <div>
              <h1 className="adm-page-title">{TAB_ICONS[tab]} {tab.charAt(0).toUpperCase()+tab.slice(1)}</h1>
              {dash && <p className="adm-page-sub">{fmt(dash.stats?.activeToday)} active today · {fmtRs(dash.stats?.todayRevenue)} revenue today</p>}
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
              {views && <div className="adm-realtime" style={{background:'rgba(91,79,255,0.1)',color:'#5b4fff'}}>👁️ {fmt(views.todayViews)} today</div>}
              {dash  && <div className="adm-realtime">🟢 {dash.stats?.activeToday} active</div>}
              <button className="adm-refresh" onClick={()=>load(tab)}>↻ Refresh</button>
            </div>
          </div>

          {success && <div className="adm-success" onClick={()=>setSuccess('')}>✅ {success}</div>}
          {error   && <div className="adm-error"   onClick={()=>setError('')}>⚠️ {error}</div>}

          {loading ? <div className="adm-loading"><div className="adm-spinner"/><p>Loading...</p></div> : (<>
{/* ── Platform Master Switch ── */}
<div style={{
  background: platformEnabled ? 'rgba(34,197,94,0.06)' : 'rgba(220,38,38,0.06)',
  border: `1.5px solid ${platformEnabled ? 'rgba(34,197,94,0.25)' : 'rgba(220,38,38,0.25)'}`,
  borderRadius: 14,
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap',
}}>
  <div>
    <div style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 15,
      fontWeight: 800,
      color: '#0a0a12',
      marginBottom: 3,
    }}>
      {platformEnabled ? '🟢 Platform is LIVE' : '🔴 Platform is PAUSED'}
    </div>
    <div style={{ fontSize: 12, color: '#72727f', fontWeight: 500 }}>
      {platformEnabled
        ? 'Users can generate apps normally.'
        : 'App generation is blocked for all users. They see a maintenance message.'}
    </div>
  </div>
  <button
    disabled={platformSaving}
    onClick={async () => {
      setPlatformSaving(true)
      try {
        const next = !platformEnabled
        await adminApi.put('/admin/platform-status', { enabled: next })
        setPlatformEnabled(next)
        setSuccess(next ? '✅ Platform is now LIVE.' : '⏸ Platform paused. App generation blocked.')
      } catch (err) {
        setError(err.message)
      } finally {
        setPlatformSaving(false)
      }
    }}
    style={{
      padding: '10px 22px',
      borderRadius: 10,
      border: 'none',
      background: platformEnabled ? '#dc2626' : '#16a34a',
      color: '#fff',
      fontSize: 13,
      fontWeight: 800,
      cursor: platformSaving ? 'not-allowed' : 'pointer',
      fontFamily: "'Nunito', sans-serif",
      opacity: platformSaving ? 0.6 : 1,
      transition: 'all .2s',
      whiteSpace: 'nowrap',
    }}
  >
    {platformSaving ? 'Saving...' : platformEnabled ? '⏸ Pause Platform' : '▶ Enable Platform'}
  </button>
</div>
          {/* ═══ DASHBOARD ═══ */}
          {tab==='dashboard' && dash && (
            <div className="adm-content">
              <div className="adm-stat-grid">
                {[
                  {label:'Total Users',value:fmt(dash.stats.totalUsers),sub:`+${fmt(dash.stats.todayUsers)} today`,color:'#5b4fff',icon:'👥'},
                  {label:'Total Websites',value:fmt(dash.stats.totalProjects),sub:`+${fmt(dash.stats.todayProjects)} today`,color:'#c0392b',icon:'🌐'},
                  {label:'Total Apps',value:fmt(dash.stats.totalApps),sub:'full-stack apps',color:'#f59e0b',icon:'⚛️'},
                  {label:'Total Revenue',value:fmtRs(dash.stats.totalRevenue),sub:`${fmtRs(dash.stats.todayRevenue)} today`,color:'#22c55e',icon:'💰'},
                ].map((s,i)=>(
                  <div key={i} className="adm-stat-card" style={{'--c':s.color}}>
                    <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
                    <div className="adm-stat-val">{s.value}</div>
                    <div className="adm-stat-label">{s.label}</div>
                    <div className="adm-stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="adm-row2">
                <div className="adm-card"><div className="adm-card-title">📈 Revenue — Last 7 Days</div><Chart data={dash.revenueChart} valueKey="revenue" color="#22c55e" fmt={fmtRs}/></div>
                <div className="adm-card"><div className="adm-card-title">🌐 Sites — Last 7 Days</div><Chart data={dash.projectsChart} valueKey="count" color="#c0392b" fmt={v=>v}/></div>
              </div>
              <div className="adm-row2">
                <div className="adm-card">
                  <div className="adm-card-title">🏆 Top Users</div>
                  <table className="adm-table">
                    <thead><tr><th>User</th><th>Sites</th><th>Spent</th></tr></thead>
                    <tbody>{dash.topUsers?.map((u,i)=>(
                      <tr key={i} className="adm-tr-hover" onClick={()=>{setTab('users');openUser(u)}}>
                        <td><div className="adm-user-cell"><div className="adm-avatar">{u.avatar}</div><div><div className="adm-uname">{u.name}</div><div className="adm-uemail">{u.email}</div></div></div></td>
                        <td><span className="adm-badge adm-badge-red">{u.projects}</span></td>
                        <td><span className="adm-badge adm-badge-green">{fmtRs(u.spent)}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="adm-card">
                  <div className="adm-card-title">⚡ Recent Activity</div>
                  <div className="adm-activity">
                    {dash.recentActivity?.map((a,i)=>(
                      <div key={i} className="adm-act-row">
                        <span style={{fontSize:16}}>{a.type==='project'?'🌐':'⚛️'}</span>
                        <div style={{flex:1,minWidth:0}}><div className="adm-act-title">{a.title}</div><div className="adm-act-sub">{a.user_name}</div></div>
                        <div style={{textAlign:'right',flexShrink:0}}><div style={{fontSize:10,fontWeight:700,color:stColor(a.status)}}>{a.status}</div><div style={{fontSize:10,color:'#a0a0b0'}}>{fmtDay(a.created_at)}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ USERS ═══ */}
          {tab==='users' && !selUser && (
            <div className="adm-content">
              <div className="adm-toolbar">
                <input className="adm-search" placeholder="Search name or email..." value={uSearch} onChange={e=>setUSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load('users')}/>
                <button className="adm-filter-btn" onClick={()=>load('users')}>Search</button>
                <div className="adm-total">{fmt(uTotal)} users</div>
              </div>
              <div className="adm-card adm-table-wrap" style={{padding:0}}>
                <table className="adm-table">
                  <thead><tr><th>User</th><th>Status</th><th>Sites</th><th>Spent</th><th>Joined</th><th>Actions</th></tr></thead>
                  <tbody>{users.map((u,i)=>(
  <tr key={i} className="adm-tr-hover">
    <td data-label="User" onClick={()=>openUser(u)} style={{cursor:'pointer'}}>
      <div className="adm-user-cell"><div className="adm-avatar">{u.avatar}</div>
      <div><div className="adm-uname">{u.name}</div><div className="adm-uemail">{u.email}</div></div></div>
    </td>
    <td data-label="Status"><span style={{fontSize:11,fontWeight:700,color:stColor(u.status||'active'),background:`${stColor(u.status||'active')}18`,padding:'3px 8px',borderRadius:100}}>{u.status==='paused'?'⏸ Paused':'🟢 Active'}</span></td>
    <td data-label="Sites">{u.total_projects}</td>
    <td data-label="Spent" style={{color:'#22c55e',fontWeight:700}}>{fmtRs(u.total_spent)}</td>
    <td data-label="Joined" style={{fontSize:11,color:'#a0a0b0'}}>{fmtDay(u.created_at)}</td>
    <td data-label="Actions"><div style={{display:'flex',gap:4}}>
      <button className="adm-act-btn adm-act-view" onClick={()=>openUser(u)}>View</button>
      <button className={`adm-act-btn ${u.status==='paused'?'adm-act-activate':'adm-act-pause'}`} onClick={()=>toggleStatus(u)}>{u.status==='paused'?'▶ Resume':'⏸ Pause'}</button>
      <button className="adm-act-btn adm-act-delete" onClick={()=>deleteUser(u)}>Delete</button>
    </div></td>
  </tr>
))}</tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ USER DETAIL ═══ */}
          {tab==='users' && selUser && (
            <div className="adm-content">
              <button className="adm-back-link" onClick={()=>{setSelUser(null);setUserDetail(null)}}>← Back to Users</button>
              <div className="adm-detail-header">
                <div className="adm-avatar adm-avatar-lg">{selUser.avatar||'👤'}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4,flexWrap:'wrap'}}>
                    <h2 className="adm-detail-name">{userDetail?.user?.name||selUser.name}</h2>
                    <span style={{fontSize:11,fontWeight:700,color:stColor(userDetail?.user?.status||'active'),background:`${stColor(userDetail?.user?.status||'active')}18`,padding:'3px 9px',borderRadius:100}}>{userDetail?.user?.status==='paused'?'⏸ Paused':'🟢 Active'}</span>
                    {userDetail?.user?.role==='admin'&&<span style={{fontSize:11,fontWeight:700,color:'#c0392b',background:'rgba(192,57,43,0.1)',padding:'3px 9px',borderRadius:100}}>Admin</span>}
                  </div>
                  <div style={{fontSize:13,color:'#72727f',marginBottom:4}}>{userDetail?.user?.email||selUser.email}</div>
                  <div style={{fontSize:11,color:'#a0a0b0'}}>Joined {fmtDay(userDetail?.user?.created_at||selUser.created_at)}</div>
                </div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'flex-start'}}>
                  <button className={`adm-act-btn ${userDetail?.user?.status==='paused'?'adm-act-activate':'adm-act-pause'}`} onClick={()=>toggleStatus(userDetail?.user||selUser)}>{userDetail?.user?.status==='paused'?'▶ Reactivate':'⏸ Pause'}</button>
                  {userDetail?.user?.role!=='admin'?<button className="adm-act-btn adm-act-promote" onClick={()=>updateRole(selUser,'admin')}>Make Admin</button>:<button className="adm-act-btn adm-act-pause" onClick={()=>updateRole(selUser,'user')}>Remove Admin</button>}
                  <button className="adm-act-btn adm-act-delete" onClick={()=>deleteUser(selUser)}>Delete</button>
                </div>
              </div>
              {detailLoad?<div className="adm-loading"><div className="adm-spinner"/></div>:userDetail&&(<>
              <div className="adm-detail-stats">
                {[{label:'Websites',value:userDetail.projects.length,color:'#c0392b'},{label:'Apps',value:userDetail.apps.length,color:'#5b4fff'},{label:'Payments',value:userDetail.payments.length,color:'#f59e0b'},{label:'Spent',value:fmtRs(userDetail.totalSpent),color:'#22c55e'}].map((s,i)=>(
                  <div key={i} className="adm-dstat" style={{'--c':s.color}}><div className="adm-dstat-val">{s.value}</div><div className="adm-dstat-lbl">{s.label}</div></div>
                ))}
              </div>
              <div className="adm-dtabs">
                {['projects','apps','payments'].map(t=>(
                  <button key={t} className={`adm-dtab ${detailTab===t?'adm-dtab-active':''}`} onClick={()=>setDetailTab(t)}>
                    {t==='projects'?'🌐':t==='apps'?'⚛️':'💳'} {t.charAt(0).toUpperCase()+t.slice(1)} <span className="adm-dtab-count">{t==='projects'?userDetail.projects.length:t==='apps'?userDetail.apps.length:userDetail.payments.length}</span>
                  </button>
                ))}
              </div>
              {detailTab==='projects'&&<div className="adm-card adm-table-wrap" style={{padding:0}}>{userDetail.projects.length===0?<div className="adm-empty">No websites yet</div>:<table className="adm-table"><thead><tr><th>Title</th><th>Status</th><th>Paid</th><th>Created</th></tr></thead><tbody>{userDetail.projects.map((p,i)=><tr key={i}><td><div className="adm-uname">{p.title}</div></td><td><span style={{fontSize:11,fontWeight:700,color:stColor(p.status)}}>{p.status}</span></td><td>{p.download_paid?<span className="adm-badge adm-badge-green">Paid</span>:<span className="adm-badge">Free</span>}</td><td style={{fontSize:11,color:'#a0a0b0'}}>{fmtDay(p.created_at)}</td></tr>)}</tbody></table>}</div>}
              {detailTab==='apps'&&<div className="adm-card adm-table-wrap" style={{padding:0}}>{userDetail.apps.length===0?<div className="adm-empty">No apps yet</div>:<table className="adm-table"><thead><tr><th>Title</th><th>Status</th><th>Created</th></tr></thead><tbody>{userDetail.apps.map((a,i)=><tr key={i}><td><div className="adm-uname">{a.title}</div></td><td><span style={{fontSize:11,fontWeight:700,color:stColor(a.status)}}>{a.status}</span></td><td style={{fontSize:11,color:'#a0a0b0'}}>{fmtDay(a.created_at)}</td></tr>)}</tbody></table>}</div>}
              {detailTab==='payments'&&<div className="adm-card adm-table-wrap" style={{padding:0}}>{userDetail.payments.length===0?<div className="adm-empty">No payments yet</div>:<table className="adm-table"><thead><tr><th>Project</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>{userDetail.payments.map((p,i)=><tr key={i}><td className="adm-uname">{p.project_title||'—'}</td><td style={{fontWeight:800,color:'#22c55e'}}>{fmtRs(p.amount)}</td><td><span style={{fontSize:11,fontWeight:700,color:stColor(p.status)}}>{p.status}</span></td><td style={{fontSize:11,color:'#a0a0b0'}}>{fmtDt(p.created_at)}</td></tr>)}</tbody></table>}</div>}
              </>)}
            </div>
          )}

          {/* ═══ PROJECTS ═══ */}
          {tab==='projects'&&(
            <div className="adm-content">
              <div className="adm-toolbar">
                <input className="adm-search" placeholder="Search..." value={pSearch} onChange={e=>setPSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load('projects')}/>
                <select className="adm-select" value={pStatus} onChange={e=>{setPStatus(e.target.value);load('projects')}}><option value="">All Status</option><option value="ready">Ready</option><option value="generating">Generating</option><option value="failed">Failed</option></select>
                <button className="adm-filter-btn" onClick={()=>load('projects')}>Filter</button>
                <div className="adm-total">{fmt(pTotal)} total (websites + apps)</div>
              </div>
              <div className="adm-card adm-table-wrap" style={{padding:0}}>
               <table className="adm-table"><thead><tr><th>Title</th><th>Type</th><th>User</th><th>Status</th><th>Paid</th><th>Created</th></tr></thead>
<tbody>{projects.map((p,i)=><tr key={i}>
  <td><div className="adm-uname">{p.title}</div></td>
  <td>
    {p.type==='app'
      ? <span className="adm-badge adm-badge-purple">⚛️ App</span>
      : <span className="adm-badge" style={{background:'rgba(192,57,43,0.1)',color:'#c0392b'}}>🌐 Website</span>
    }
  </td>
  <td><div className="adm-user-cell"><div className="adm-avatar">{p.user_avatar}</div><div><div className="adm-uname">{p.user_name}</div><div className="adm-uemail">{p.user_email}</div></div></div></td>
  <td><span style={{fontSize:11,fontWeight:700,color:stColor(p.status)}}>{p.status}</span></td>
  <td>{p.download_paid?<span className="adm-badge adm-badge-green">Paid</span>:<span className="adm-badge">Free</span>}</td>
  <td style={{fontSize:11,color:'#a0a0b0'}}>{fmtDay(p.created_at)}</td>
</tr>)}</tbody></table>

              </div>
            </div>
          )}

          {/* ═══ TEMPLATES ═══ */}
          {tab==='templates'&&(
            <div className="adm-content">
              {/* Summary cards */}
              <div className="adm-tpl-summary">
                <div className="adm-tpl-stat" style={{'--tc':'#5b4fff'}}>
                  <div className="adm-tpl-stat-icon">🧩</div>
                  <div className="adm-tpl-stat-val">{fmt(tStats.totalDeployments)}</div>
                  <div className="adm-tpl-stat-lbl">Total Deployments</div>
                </div>
                <div className="adm-tpl-stat" style={{'--tc':'#22c55e'}}>
                  <div className="adm-tpl-stat-icon">👥</div>
                  <div className="adm-tpl-stat-val">{fmt(tStats.totalDeployedUsers)}</div>
                  <div className="adm-tpl-stat-lbl">Users Deployed</div>
                </div>
                <div className="adm-tpl-stat" style={{'--tc':'#f59e0b'}}>
                  <div className="adm-tpl-stat-icon">🌐</div>
                  <div className="adm-tpl-stat-val">{fmt(tTotal)}</div>
                  <div className="adm-tpl-stat-lbl">Live Deployments</div>
                </div>
              </div>

              {/* Search toolbar */}
              <div className="adm-toolbar">
                <input className="adm-search" placeholder="Search project, user or email..." value={tSearch} onChange={e=>setTSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load('templates')}/>
                <button className="adm-filter-btn" onClick={()=>load('templates')}>Search</button>
                <div className="adm-total">{fmt(tTotal)} deployments</div>
              </div>

              {/* Deployments table */}
              <div className="adm-card adm-table-wrap" style={{padding:0}}>
                {templates.length===0
                  ? <div className="adm-empty">No template deployments found.</div>
                  : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>User</th>
                        <th>Hosted URL</th>
                        <th>Status</th>
                        <th>Deployed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templates.map((row,i)=>{
                        const url = buildHostedUrl(row)
                        return (
                          <tr key={i} className="adm-tr-hover">
                            <td>
                              <div className="adm-uname">{row.title||'Untitled'}</div>
                              {row.template_name&&<div className="adm-tpl-chip">🧩 {row.template_name}</div>}
                            </td>
                            <td>
                              <div className="adm-user-cell">
                                <div className="adm-avatar">{row.user_avatar||'👤'}</div>
                                <div>
                                  <div className="adm-uname">{row.user_name}</div>
                                  <div className="adm-uemail">{row.user_email}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              {url
                                ? (
                                  <div className="adm-url-cell">
                                    <span className="adm-url-text" title={url}>{url}</span>
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="adm-visit-btn"
                                      onClick={e=>e.stopPropagation()}
                                    >
                                      🔗 Visit
                                    </a>
                                  </div>
                                )
                                : <span className="adm-no-url">Not deployed</span>
                              }
                            </td>
                            <td>
                              <span style={{fontSize:11,fontWeight:700,color:stColor(row.status),background:`${stColor(row.status)}18`,padding:'3px 8px',borderRadius:100}}>
                                {row.status}
                              </span>
                            </td>
                            <td style={{fontSize:11,color:'#a0a0b0'}}>{fmtDay(row.created_at)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ═══ PAYMENTS ═══ */}
         {/* ═══ PAYMENTS ═══ */}
{tab==='payments'&&(
  <div className="adm-content">
    <div className="adm-toolbar"><div className="adm-rev-pill">💰 Total Revenue: <strong>{fmtRs(payRev)}</strong></div></div>
    <div className="adm-card adm-table-wrap" style={{padding:0}}>
      <table className="adm-table"><thead><tr><th>User</th><th>Project</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>{payments.map((p,i)=><tr key={i}>
        <td><div className="adm-uname">{p.user_name}</div><div className="adm-uemail">{p.user_email}</div></td>
        <td className="adm-uname">{p.project_title||'—'}</td>
        <td style={{fontWeight:800,color:'#22c55e',fontSize:14}}>{fmtRs(p.amount)}</td>
        <td><span style={{fontSize:11,fontWeight:700,color:stColor(p.status)}}>{p.status}</span></td>
        <td style={{fontSize:11,color:'#a0a0b0'}}>{fmtDt(p.created_at)}</td>
        <td>
          {p.type==='unlock_payment' && p.status==='paid' && (
            <button className="adm-act-btn adm-act-delete" onClick={()=>setConfirm({
              title:'🗑️ Revoke Unlock',
              msg:`Delete this ₹99 unlock payment for ${p.user_name}? They'll be locked out of download & hosting until they pay again.`,
              color:'#dc2626',
              action:async()=>{ await adminApi.del(`/admin/payments/${p.id}`); setSuccess('Unlock revoked — user must pay again.'); load('payments') }
            })}>🗑️ Revoke</button>
          )}
        </td>
      </tr>)}</tbody></table>
    </div>
  </div>
)}


{/* ═══ CREDITS MANAGER ═══ */}
{tab==='credits'&&(
  <div className="adm-content">
    <div className="adm-toolbar">
      <input className="adm-search" placeholder="Search name or email..."
        value={creditSearch} onChange={e=>setCreditSearch(e.target.value)}
        onKeyDown={e=>e.key==='Enter'&&load('credits')}/>
      <button className="adm-filter-btn" onClick={()=>load('credits')}>Search</button>
      <div className="adm-total">{fmt(creditTotal)} users</div>
    </div>

    <div className="adm-card adm-table-wrap" style={{padding:0}}>
      {creditUsers.length===0
        ? <div className="adm-empty">No users found.</div>
        : <table className="adm-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Credits</th>
                <th>Unlocked</th>
                <th>Joined</th>
                <th>Adjust Credits</th>
              </tr>
            </thead>
            <tbody>
              {creditUsers.map((u,i)=>(
                <tr key={i} className="adm-tr-hover">
                  <td>
                    <div className="adm-user-cell">
                      <div className="adm-avatar">{u.avatar||'👤'}</div>
                      <div>
                        <div className="adm-uname">{u.name}</div>
                        <div className="adm-uemail">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:800,
                      color: u.credits>50?'#16a34a': u.credits>0?'#d97706':'#dc2626'}}>
                      {fmt(u.credits)}
                    </span>
                  </td>
                  <td>
                    {u.has_paid
                      ? <span className="adm-badge adm-badge-green">🔓 Unlocked</span>
                      : <span className="adm-badge">🔒 Locked</span>}
                  </td>
                  <td style={{fontSize:11,color:'#a0a0b0'}}>{fmtDay(u.created_at)}</td>
                  <td>
                    {creditEdit?.userId===u.id
                      ? <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                          <input
                            type="number"
                            placeholder="+50 or -20"
                            value={creditEdit.delta}
                            onChange={e=>setCreditEdit(c=>({...c,delta:e.target.value}))}
                            style={{width:100,padding:'5px 8px',borderRadius:7,border:'1.5px solid #c0392b',
                              fontFamily:'Nunito,sans-serif',fontSize:13,outline:'none'}}/>
                          <button
                            className="adm-act-btn adm-act-activate"
                            disabled={creditSaving||creditEdit.delta===''}
                            onClick={async()=>{
                              const delta=parseInt(creditEdit.delta,10)
                              if(isNaN(delta)||delta===0){setError('Enter a non-zero number.');return}
                              setCreditSaving(true);setError('')
                              try{
                               const d=await adminApi.post(`/admin/credits/adjust`,{userId:u.id,delta,reason:'admin_adjustment'})
                                setSuccess(`${u.name}: credits ${delta>0?'+':''}${delta} → now ${d.newBalance}`)
                                setCreditEdit(null);load('credits')
                              }catch(err){setError(err.message)}
                              finally{setCreditSaving(false)}
                            }}>
                            {creditSaving?'…':'✓ Apply'}
                          </button>
                          <button className="adm-act-btn adm-act-view"
                            onClick={()=>setCreditEdit(null)}>✕</button>
                        </div>
                      : <div style={{display:'flex',gap:4}}>
                          <button className="adm-act-btn adm-act-promote"
                            onClick={()=>setCreditEdit({userId:u.id,name:u.name,credits:u.credits,delta:''})}>
                            ✏️ Adjust
                          </button>
                          <button className="adm-act-btn adm-act-activate"
                            onClick={()=>setConfirm({title:'🎁 Give 100 Credits',
                              msg:`Add 100 credits to ${u.name}?`,color:'#16a34a',
                              action:async()=>{
const d=await adminApi.post('/admin/credits/adjust',{userId:u.id,delta:100,reason:'admin_gift'})
                                setSuccess(`${u.name} +100 credits → ${d.newBalance}`)
                                load('credits')
                              }})}>
                            +100
                          </button>
                          <button className="adm-act-btn adm-act-pause"
                            onClick={()=>setConfirm({title:'🧹 Reset Credits',
                              msg:`Reset ${u.name}'s credits to 0?`,color:'#dc2626',
                              action:async()=>{
                                const d=await adminApi.post('/admin/credits/set',{userId:u.id,credits:0,reason:'admin_reset'})
                                setSuccess(`${u.name} credits reset to 0`)
                                load('credits')
                              }})}>
                            Reset
                          </button>
                        </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </div>
  </div>
)}
          {/* ═══ ADS MANAGER ═══ */}
          {tab==='ads'&&(
            <div className="adm-content">
              <div className="adm-card" style={{borderColor:editAd?'#5b4fff':'#e2e2ea'}}>
                <div className="adm-card-title">{editAd?'✏️ Edit Ad':'➕ Create New Ad'}</div>
                <div className="adm-ad-form">
                  <div className="adm-form-row">
                    <div style={{flex:1}}>
                      <label className="adm-label">Ad Title / Message</label>
                      <input className="adm-input" placeholder="Host your site for just ₹99!"
                        value={editAd?editAd.title:adForm.title}
                        onChange={e=>editAd?setEditAd(a=>({...a,title:e.target.value})):setAdForm(f=>({...f,title:e.target.value}))}/>
                      <label className="adm-label">Link URL</label>
                      <input className="adm-input" placeholder="https://zaterbusiness.github.io/zater/"
                        value={editAd?editAd.link_url||'':adForm.link_url}
                        onChange={e=>editAd?setEditAd(a=>({...a,link_url:e.target.value})):setAdForm(f=>({...f,link_url:e.target.value}))}/>
                      <label className="adm-label">Button Text</label>
                      <input className="adm-input" placeholder="Get Started →"
                        value={editAd?editAd.link_text||'':adForm.link_text}
                        onChange={e=>editAd?setEditAd(a=>({...a,link_text:e.target.value})):setAdForm(f=>({...f,link_text:e.target.value}))}/>
                      <div className="adm-check-row">
                        <input type="checkbox" id="adActiveChk"
                          checked={editAd?!!editAd.is_active:adForm.is_active}
                          onChange={e=>editAd?setEditAd(a=>({...a,is_active:e.target.checked?1:0})):setAdForm(f=>({...f,is_active:e.target.checked}))}/>
                        <label htmlFor="adActiveChk" style={{fontSize:13,fontWeight:600,color:'#3a3a4a',cursor:'pointer'}}>Show on homepage</label>
                      </div>
                    </div>
                    <div className="adm-img-upload-wrap">
                      <div className="adm-img-preview"
                        style={{backgroundImage: editAd?(editAdImg?.preview?`url(${editAdImg.preview})`:editAd.image_url?`url(${imgSrc(editAd.image_url)})`:'none'):(adImage?.preview?`url(${adImage.preview})`:'none')}}
                        onClick={()=>editAd?editFileRef.current?.click():fileRef.current?.click()}>
                        {!(editAd?(editAdImg?.preview||editAd.image_url):(adImage?.preview))&&(
                          <div className="adm-img-placeholder">
                            <div style={{fontSize:32,marginBottom:8}}>🖼️</div>
                            <div style={{fontSize:12,fontWeight:700,color:'#a0a0b0'}}>Click to upload image</div>
                            <div style={{fontSize:11,color:'#c0c0cc'}}>PNG, JPG — max 2MB</div>
                          </div>
                        )}
                      </div>
                      <input ref={fileRef}     type="file" accept="image/*" style={{display:'none'}} onChange={e=>pickImage(e.target.files[0],setAdImage)}/>
                      <input ref={editFileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>pickImage(e.target.files[0],setEditAdImg)}/>
                      {!editAd&&adImage&&<button className="adm-img-clear" onClick={()=>{setAdImage(null);if(fileRef.current)fileRef.current.value=''}}>✕ Clear</button>}
                      {editAd&&editAdImg&&<button className="adm-img-clear" onClick={()=>setEditAdImg(null)}>✕ Keep original</button>}
                      <div style={{fontSize:11,color:'#a0a0b0',textAlign:'center'}}>Ad banner image (shown on homepage)</div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button className="adm-filter-btn" style={{padding:'10px 24px'}} onClick={editAd?saveEditAd:createAd} disabled={adSaving}>
                      {adSaving?'Saving...':(editAd?'💾 Save Changes':'➕ Create Ad')}
                    </button>
                    {editAd&&<button className="adm-act-btn adm-act-view" style={{padding:'10px 16px'}} onClick={()=>{setEditAd(null);setEditAdImg(null)}}>Cancel</button>}
                  </div>
                </div>
              </div>

              <div className="adm-card" style={{padding:0}}>
                <div style={{padding:'14px 16px',borderBottom:'1px solid #f0f0f6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div className="adm-card-title" style={{margin:0}}>📢 All Ads ({ads.length})</div>
                </div>
                {ads.length===0?<div className="adm-empty">No ads yet. Create one above.</div>:(
                  <div>{ads.map((ad,i)=>(
                    <div key={i} className="adm-ad-row">
                      <div className="adm-ad-thumb" style={{backgroundImage:ad.image_url?`url(${imgSrc(ad.image_url)})`:'none',background:ad.image_url?undefined:'#f0f0f8'}}>
                        {!ad.image_url&&<span style={{fontSize:24}}>🖼️</span>}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div className="adm-uname">{ad.title}</div>
                        {ad.link_url&&<div className="adm-uemail">{ad.link_url}</div>}
                        <div style={{display:'flex',gap:8,marginTop:6,flexWrap:'wrap'}}>
                          <span className="adm-badge" style={{background:ad.is_active?'rgba(34,197,94,0.1)':undefined,color:ad.is_active?'#16a34a':undefined}}>{ad.is_active?'🟢 Active':'⏸ Paused'}</span>
                          <span className="adm-badge">👁️ {fmt(ad.views)} views</span>
                          <span className="adm-badge">👆 {fmt(ad.clicks)} clicks</span>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:4,flexShrink:0}}>
                        <button className="adm-act-btn adm-act-view" onClick={()=>{setEditAd({...ad});setEditAdImg(null)}}>✏️</button>
                        <button className={`adm-act-btn ${ad.is_active?'adm-act-pause':'adm-act-activate'}`} onClick={()=>toggleAdActive(ad)}>{ad.is_active?'⏸':'▶'}</button>
                        <button className="adm-act-btn adm-act-delete" onClick={()=>setConfirm({title:'🗑️ Delete Ad',msg:`Delete "${ad.title}"?`,color:'#dc2626',action:async()=>{await adminApi.del(`/ads/admin/${ad.id}`);setSuccess('Ad deleted.');load('ads')}})}>🗑️</button>
                      </div>
                    </div>
                  ))}</div>
                )}
              </div>
            </div>
          )}
{/* ═══ APPS (GitHub push) ═══ */}
{tab==='apps'&&(
  <div className="adm-content">
    <div className="adm-toolbar">
      <input className="adm-search" placeholder="Search app, user or email..."
        value={appsSearch} onChange={e=>setAppsSearch(e.target.value)}
        onKeyDown={e=>e.key==='Enter'&&load('apps')}/>
      <button className="adm-filter-btn" onClick={()=>load('apps')}>Search</button>
      <div className="adm-total">{fmt(appsTotal)} apps</div>
    </div>

    {apps.length===0
      ? <div className="adm-card"><div className="adm-empty">No apps found.</div></div>
      : (
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
        {apps.map((a,i)=>(
          <div key={i} className="adm-card" style={{display:'flex',flexDirection:'column',gap:10}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}>
              <div className="adm-uname" style={{fontSize:14}}>{a.title}</div>
              <span style={{fontSize:11,fontWeight:700,color:stColor(a.status),background:`${stColor(a.status)}18`,padding:'3px 8px',borderRadius:100,whiteSpace:'nowrap'}}>{a.status}</span>
            </div>
            <div className="adm-user-cell">
              <div className="adm-avatar">{a.user_avatar||'👤'}</div>
              <div><div className="adm-uname">{a.user_name}</div><div className="adm-uemail">{a.user_email}</div></div>
            </div>
            <div style={{fontSize:11,color:'#a0a0b0'}}>Created {fmtDay(a.created_at)}</div>
            <div style={{marginTop:'auto',paddingTop:8,borderTop:'1px solid #f0f0f6'}}>
              {a.github_repo_url ? (
                <a href={a.github_repo_url} target="_blank" rel="noopener noreferrer"
                  className="adm-act-btn adm-act-view" style={{display:'inline-block',textDecoration:'none'}}>
                  GitHub ↗
                </a>
              ) : a.status==='ready' ? (
                <button className="adm-act-btn adm-act-promote" disabled={pushingGit===a.id} onClick={()=>pushAppToGithub(a)}>
                  {pushingGit===a.id ? 'Pushing...' : '⬆ Push to GitHub'}
                </button>
              ) : (
                <span style={{fontSize:11,color:'#c0c0cc',fontWeight:600}}>Not ready yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
          {/* ═══ ANALYTICS ═══ */}
          {tab==='analytics'&&views&&(
            <div className="adm-content">
              <div className="adm-views-hero">
                <div className="adm-views-live"><div className="adm-live-dot"/><span>{Number(views.activeNow||0).toLocaleString('en-IN')} people on site right now</span></div>
                <div className="adm-views-hero-nums">
                  {[
                    {num:fmt(views.totalViews),lbl:'Total Visits',color:'#fff'},
                    {num:fmt(views.uniqueTotal),lbl:'Unique Visitors',color:'#22c55e'},
                    {num:fmt(views.todayViews),lbl:'Today',color:'#f59e0b'},
                    {num:fmt(views.weekViews),lbl:'This Week',color:'#5b4fff'},
                  ].map((item,i)=>(
                    <React.Fragment key={i}>
                      {i>0&&<div className="adm-views-divider"/>}
                      <div className="adm-views-big">
                        <div className="adm-views-big-num" style={{color:item.color}}>{item.num}</div>
                        <div className="adm-views-big-lbl">{item.lbl}</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="adm-stat-grid">
                {[
                  {label:'Total Visits',value:fmt(views.totalViews),sub:`${fmt(views.todayViews)} today`,color:'#5b4fff',icon:'👁️'},
                  {label:'Unique Visitors',value:fmt(views.uniqueTotal),sub:`${fmt(views.uniqueToday)} new today`,color:'#22c55e',icon:'👤'},
                  {label:'This Month',value:fmt(views.monthViews),sub:'last 30 days',color:'#f59e0b',icon:'📅'},
                  {label:'Active Now',value:fmt(views.activeNow),sub:'last 5 minutes',color:'#c0392b',icon:'🟢'},
                ].map((s,i)=>(
                  <div key={i} className="adm-stat-card" style={{'--c':s.color}}>
                    <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
                    <div className="adm-stat-val">{s.value}</div>
                    <div className="adm-stat-label">{s.label}</div>
                    <div className="adm-stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="adm-row2">
                <div className="adm-card"><div className="adm-card-title">📈 Daily Visits — Last 30 Days</div><Chart data={views.dailyChart} valueKey="count" color="#5b4fff" fmt={v=>v}/></div>
                <div className="adm-card"><div className="adm-card-title">🕐 Today by Hour</div><Chart data={(views.hourlyToday||[]).map(h=>({date:`${h.hour}:00`,count:h.count}))} valueKey="count" color="#22c55e" fmt={v=>v}/></div>
              </div>
              <div className="adm-row2">
                <div className="adm-card">
                  <div className="adm-card-title">👥 Visitor Breakdown</div>
                  <div className="adm-views-breakdown">
                    {[
                      {label:'Logged-in Members',val:views.loggedInViews,total:views.totalViews,color:'#5b4fff',icon:'👤'},
                      {label:'Guest Visitors',val:views.guestViews,total:views.totalViews,color:'#22c55e',icon:'🌐'},
                      {label:'Unique IPs (all time)',val:views.uniqueTotal,total:views.totalViews,color:'#f59e0b',icon:'📍'},
                      {label:'Unique IPs (this week)',val:views.uniqueWeek,total:views.weekViews,color:'#c0392b',icon:'📅'},
                    ].map((row,i)=>{
                      const pct=row.total>0?Math.round((row.val/row.total)*100):0
                      return(
                        <div key={i} className="adm-views-row">
                          <span style={{fontSize:16}}>{row.icon}</span>
                          <div style={{flex:1}}>
                            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                              <span style={{fontSize:12,fontWeight:700,color:'#0a0a12'}}>{row.label}</span>
                              <span style={{fontSize:13,fontWeight:800,color:row.color}}>{fmt(row.val)}</span>
                            </div>
                            <div className="adm-views-bar-bg"><div className="adm-views-bar-fill" style={{width:`${pct}%`,background:row.color}}/></div>
                            <div style={{fontSize:10,color:'#a0a0b0',marginTop:2}}>{pct}% of total</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="adm-card">
                  <div className="adm-card-title">📢 Ad Performance</div>
                  {!views.adStats?.length?<div className="adm-empty">No ads yet</div>:(
                    <div>
                      {views.adStats.map((a,i)=>{
                        const ctr=a.views>0?((a.clicks/a.views)*100).toFixed(1):'0.0'
                        return(
                          <div key={i} className="adm-ad-perf-row">
                            <div className="adm-uname" style={{marginBottom:6,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.title}</div>
                            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                              <span className="adm-badge" style={{background:a.is_active?'rgba(34,197,94,0.1)':undefined,color:a.is_active?'#16a34a':undefined}}>{a.is_active?'🟢 Active':'⏸ Paused'}</span>
                              <span className="adm-badge adm-badge-purple">👁️ {fmt(a.views)} views</span>
                              <span className="adm-badge adm-badge-green">👆 {fmt(a.clicks)} clicks</span>
                              <span className="adm-badge" style={{color:Number(ctr)>2?'#16a34a':'#a0a0b0'}}>{ctr}% CTR</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {views.peakHour!=null&&<div className="adm-peak-hour">⏰ Peak hour: <strong>{views.peakHour}:00 – {(views.peakHour+1)%24}:00</strong></div>}
                </div>
              </div>
            </div>
          )}

          </>)}
        </main>
      </div>

      {confirm&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'fadeIn .15s ease'}}>
          <div style={{background:'#fff',borderRadius:16,padding:24,maxWidth:400,width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',animation:'fadeUp .2s ease'}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:'#0a0a12',marginBottom:10}}>{confirm.title}</h3>
            <p style={{fontSize:13,color:'#72727f',lineHeight:1.6,marginBottom:20}}>{confirm.msg}</p>
            <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
              <button onClick={()=>setConfirm(null)} style={{padding:'9px 18px',borderRadius:9,background:'#fff',border:'1.5px solid #e2e2ea',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'Nunito,sans-serif'}}>Cancel</button>
              <button onClick={async()=>{try{await confirm.action()}catch(err){setError(err.message)}finally{setConfirm(null)}}} style={{padding:'9px 18px',borderRadius:9,background:confirm.color,border:'none',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'Nunito,sans-serif'}}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Chart = ({data,valueKey,color,fmt}) => {
  if (!data?.length) return <div className="adm-no-data">No data yet</div>
  const max=Math.max(...data.map(d=>Number(d[valueKey])),1)
  return (
    <div className="adm-chart">
      {data.map((d,i)=>(
        <div key={i} className="adm-bar-col">
          <div className="adm-bar-val">{fmt(d[valueKey])}</div>
          <div className="adm-bar" style={{height:`${Math.max(4,(Number(d[valueKey])/max)*120)}px`,background:color}}/>
          <div className="adm-bar-lbl">{new Date(d.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>
        </div>
      ))}
    </div>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.al-root{min-height:100vh;background:#0a0a12;display:flex;align-items:center;justify-content:center;padding:24px;font-family:'Nunito',sans-serif;position:relative;}
.al-dotgrid{position:fixed;inset:0;background-image:radial-gradient(circle,#1e1e2e 1px,transparent 1px);background-size:26px 26px;opacity:0.8;pointer-events:none;}
.al-card{position:relative;z-index:1;background:#131320;border:1.5px solid #2a2a3a;border-radius:22px;padding:36px 32px;width:100%;max-width:420px;box-shadow:0 8px 48px rgba(0,0,0,0.5);animation:fadeUp 0.4s ease;}
.al-logo{display:flex;align-items:center;gap:12px;margin-bottom:24px;}
.al-brand{font-family:'Playfair Display',serif;font-size:16px;font-weight:800;color:#fff;}
.al-sub{font-size:10px;color:#4a4a6a;font-weight:600;margin-top:2px;}
.al-badge{display:inline-block;background:rgba(192,57,43,0.15);border:1px solid rgba(192,57,43,0.3);color:#ff8070;font-size:11px;font-weight:800;padding:5px 14px;border-radius:100px;margin-bottom:18px;}
.al-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:900;color:#fff;margin-bottom:22px;}
.al-err{background:rgba(239,68,68,0.1);border:1.5px solid rgba(239,68,68,0.25);border-radius:9px;padding:10px 13px;font-size:13px;color:#f87171;font-weight:600;margin-bottom:16px;}
.al-form{display:flex;flex-direction:column;gap:14px;}
.al-field{display:flex;flex-direction:column;gap:6px;}
.al-label{font-size:11px;font-weight:800;color:#5050a0;text-transform:uppercase;letter-spacing:0.7px;}
.al-input{padding:11px 13px;background:#0d0d1a;border:1.5px solid #2a2a3a;border-radius:9px;font-size:14px;font-family:'Nunito',sans-serif;color:#e0e0f0;outline:none;transition:border-color .18s;}
.al-input:focus{border-color:#c0392b;}
.al-input::placeholder{color:#3a3a5a;}
.al-btn{padding:13px;border-radius:10px;background:#c0392b;border:none;color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;margin-top:4px;transition:all .18s;}
.al-btn:hover:not(:disabled){background:#a0311f;transform:translateY(-1px);}
.al-btn:disabled{background:#2a2a3a;cursor:not-allowed;color:#5050a0;}
.al-back{display:block;text-align:center;margin-top:14px;background:none;border:none;color:#4a4a6a;font-size:13px;font-weight:600;cursor:pointer;font-family:'Nunito',sans-serif;}
.al-back:hover{color:#a0a0c0;}
.al-note{text-align:center;font-size:11px;color:#3a3a5a;font-weight:500;margin-top:10px;}

/* ── BASE LAYOUT ── */
.adm-root{display:grid;grid-template-columns:220px 1fr;min-height:100vh;background:#f4f4f8;font-family:'Nunito',sans-serif;color:#0a0a12;}
.adm-sidebar{background:#0a0a12;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
.adm-brand{display:flex;align-items:center;gap:11px;padding:18px 16px;border-bottom:1px solid #1e1e2e;}
.adm-brand-icon{width:34px;height:34px;border-radius:8px;background:#c0392b;color:#fff;font-size:16px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.adm-brand-name{font-size:13px;font-weight:800;color:#fff;}
.adm-brand-sub{font-size:10px;color:#4a4a6a;font-weight:600;}
.adm-nav{display:flex;flex-direction:column;gap:2px;padding:12px 8px;}
.adm-nav-btn{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:9px;border:none;background:transparent;color:#6060a0;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;text-align:left;}
.adm-nav-btn:hover{background:rgba(255,255,255,0.06);color:#e0e0f0;}
.adm-nav-active{background:rgba(192,57,43,0.15)!important;color:#ff8070!important;}
.adm-sidebar-stats{padding:10px 16px;border-top:1px solid #1e1e2e;}
.adm-ss{font-size:11px;font-weight:600;color:#4a4a6a;padding:3px 0;}
.adm-sidebar-footer{padding:12px 16px;border-top:1px solid #1e1e2e;display:flex;align-items:center;gap:8px;}
.adm-admin-pill{flex:1;font-size:11px;font-weight:700;color:#9090c0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.adm-logout-btn{padding:5px 10px;border-radius:6px;background:rgba(192,57,43,0.15);border:none;color:#ff8070;font-size:11px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;}
.adm-logout-btn:hover{background:rgba(192,57,43,0.25);}
.adm-main{display:flex;flex-direction:column;min-height:100vh;overflow-x:hidden;}
.adm-topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 22px;background:#fff;border-bottom:1px solid #e2e2ea;flex-wrap:wrap;gap:12px;position:sticky;top:0;z-index:10;}
.adm-page-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#0a0a12;margin-bottom:2px;}
.adm-page-sub{font-size:12px;color:#a0a0b0;font-weight:600;}
.adm-realtime{padding:5px 12px;border-radius:100px;background:rgba(34,197,94,0.1);color:#16a34a;font-size:12px;font-weight:700;}
.adm-refresh{padding:7px 14px;border-radius:8px;background:#fff;border:1.5px solid #e2e2ea;font-size:12px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;}
.adm-refresh:hover{border-color:#c0392b;color:#c0392b;}
.adm-success{background:rgba(34,197,94,0.08);border-left:4px solid #22c55e;padding:10px 22px;font-size:13px;font-weight:700;color:#15803d;cursor:pointer;}
.adm-error{background:rgba(239,68,68,0.06);border-left:4px solid #ef4444;padding:10px 22px;font-size:13px;font-weight:600;color:#dc2626;cursor:pointer;}
.adm-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 0;color:#a0a0b0;font-weight:600;}
.adm-spinner{width:32px;height:32px;border:3px solid #e2e2ea;border-top-color:#c0392b;border-radius:50%;animation:spin 1s linear infinite;}
.adm-content{padding:18px 22px;display:flex;flex-direction:column;gap:16px;animation:fadeUp .25s ease;}
.adm-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.adm-stat-card{background:#fff;border-radius:14px;padding:16px;border:1.5px solid #e2e2ea;position:relative;overflow:hidden;transition:all .2s;}
.adm-stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--c);}
.adm-stat-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.07);}
.adm-stat-val{font-family:'Playfair Display',serif;font-size:24px;font-weight:800;color:#0a0a12;margin-bottom:3px;}
.adm-stat-label{font-size:11px;font-weight:700;color:#6b6b7a;margin-bottom:3px;}
.adm-stat-sub{font-size:10px;color:#22c55e;font-weight:600;}
.adm-row2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.adm-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:14px;padding:16px;}
.adm-card-title{font-size:13px;font-weight:800;color:#0a0a12;margin-bottom:14px;}
.adm-chart{display:flex;align-items:flex-end;gap:8px;height:160px;padding-bottom:26px;}
.adm-bar-col{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
.adm-bar-val{font-size:9px;font-weight:700;color:#6b6b7a;}
.adm-bar{width:100%;border-radius:4px 4px 0 0;min-width:16px;}
.adm-bar-lbl{font-size:9px;color:#a0a0b0;font-weight:600;white-space:nowrap;}
.adm-no-data{color:#a0a0b0;font-size:13px;font-weight:600;text-align:center;padding:40px 0;}
.adm-activity{display:flex;flex-direction:column;}
.adm-act-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f5f5f7;}
.adm-act-row:last-child{border-bottom:none;}
.adm-act-title{font-size:12px;font-weight:700;color:#0a0a12;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.adm-act-sub{font-size:10px;color:#a0a0b0;font-weight:500;}
.adm-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.adm-search{padding:9px 13px;border:1.5px solid #e2e2ea;border-radius:9px;font-size:13px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;flex:1;min-width:180px;transition:border-color .18s;}
.adm-search:focus{border-color:#c0392b;}
.adm-select{padding:9px 12px;border:1.5px solid #e2e2ea;border-radius:9px;font-size:13px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;background:#fff;cursor:pointer;}
.adm-filter-btn{padding:9px 16px;border-radius:9px;background:#c0392b;border:none;color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;white-space:nowrap;}
.adm-filter-btn:hover:not(:disabled){opacity:.88;}
.adm-filter-btn:disabled{background:#c0c0cc;cursor:not-allowed;}
.adm-total{padding:7px 13px;border-radius:100px;background:#f0f0f6;font-size:12px;font-weight:700;color:#6b6b7a;white-space:nowrap;}
.adm-rev-pill{padding:7px 13px;border-radius:100px;background:rgba(34,197,94,0.1);font-size:12px;font-weight:600;color:#16a34a;}
.adm-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
.adm-table{width:100%;border-collapse:collapse;min-width:520px;}
.adm-table th{padding:10px 13px;font-size:11px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.5px;text-align:left;background:#f8f8fc;border-bottom:1.5px solid #e2e2ea;}
.adm-table td{padding:10px 13px;font-size:13px;color:#3a3a4a;border-bottom:1px solid #f0f0f6;vertical-align:middle;}
.adm-tr-hover:hover td{background:#fafafa;cursor:pointer;}
.adm-user-cell{display:flex;align-items:center;gap:9px;}
.adm-avatar{width:28px;height:28px;border-radius:50%;background:#e8e8f4;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}
.adm-avatar-lg{width:46px;height:46px;font-size:22px;}
.adm-uname{font-size:13px;font-weight:700;color:#0a0a12;}
.adm-uemail{font-size:11px;color:#a0a0b0;font-weight:500;}
.adm-badge{padding:2px 8px;border-radius:5px;font-size:11px;font-weight:700;background:#f0f0f6;color:#5a5a70;}
.adm-badge-red{background:rgba(192,57,43,0.1);color:#c0392b;}
.adm-badge-purple{background:rgba(91,79,255,0.1);color:#5b4fff;}
.adm-badge-green{background:rgba(34,197,94,0.1);color:#16a34a;}
.adm-act-btn{padding:5px 10px;border-radius:6px;border:none;font-size:11px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .15s;white-space:nowrap;}
.adm-act-view{background:#f0f0f6;color:#3a3a4a;}
.adm-act-view:hover{background:#e0e0ec;}
.adm-act-pause{background:rgba(245,158,11,0.1);color:#d97706;}
.adm-act-pause:hover{background:rgba(245,158,11,0.2);}
.adm-act-activate{background:rgba(34,197,94,0.1);color:#16a34a;}
.adm-act-activate:hover{background:rgba(34,197,94,0.2);}
.adm-act-promote{background:rgba(91,79,255,0.1);color:#5b4fff;}
.adm-act-promote:hover{background:rgba(91,79,255,0.2);}
.adm-act-delete{background:rgba(220,38,38,0.1);color:#dc2626;}
.adm-act-delete:hover{background:rgba(220,38,38,0.2);}
.adm-back-link{background:none;border:none;color:#c0392b;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;padding:0;text-decoration:underline;align-self:flex-start;}
.adm-detail-header{display:flex;align-items:flex-start;gap:14px;background:#fff;border:1.5px solid #e2e2ea;border-radius:14px;padding:18px;flex-wrap:wrap;}
.adm-detail-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#0a0a12;}
.adm-detail-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.adm-dstat{background:#fff;border:1.5px solid #e2e2ea;border-radius:12px;padding:13px;text-align:center;position:relative;}
.adm-dstat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--c);border-radius:12px 12px 0 0;}
.adm-dstat-val{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#0a0a12;margin-bottom:3px;}
.adm-dstat-lbl{font-size:11px;font-weight:700;color:#a0a0b0;}
.adm-dtabs{display:flex;border-bottom:1.5px solid #e2e2ea;background:#fff;border-radius:14px 14px 0 0;overflow-x:auto;-webkit-overflow-scrolling:touch;}
.adm-dtab{padding:11px 18px;border:none;background:transparent;font-size:12px;font-weight:700;color:#6b6b7a;cursor:pointer;font-family:'Nunito',sans-serif;border-bottom:2px solid transparent;transition:all .15s;display:flex;align-items:center;gap:6px;white-space:nowrap;}
.adm-dtab:hover{color:#0a0a12;}
.adm-dtab-active{color:#c0392b;border-bottom-color:#c0392b;background:#fff8f6;}
.adm-dtab-count{background:#f0f0f6;padding:1px 7px;border-radius:100px;font-size:10px;}
.adm-empty{padding:30px;text-align:center;font-size:13px;color:#a0a0b0;font-weight:600;}
.adm-ad-form{display:flex;flex-direction:column;gap:12px;}
.adm-form-row{display:flex;gap:20px;align-items:flex-start;}
.adm-label{font-size:11px;font-weight:800;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:5px;display:block;}
.adm-input{width:100%;padding:9px 12px;border:1.5px solid #e2e2ea;border-radius:8px;font-size:13px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;margin-bottom:10px;transition:border-color .18s;}
.adm-input:focus{border-color:#c0392b;}
.adm-check-row{display:flex;align-items:center;gap:8px;margin-top:2px;}
.adm-img-upload-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0;}
.adm-img-preview{width:200px;height:120px;border-radius:10px;border:2px dashed #e2e2ea;background-size:cover;background-position:center;background-repeat:no-repeat;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .18s;overflow:hidden;}
.adm-img-preview:hover{border-color:#c0392b;}
.adm-img-placeholder{text-align:center;}
.adm-img-clear{background:rgba(220,38,38,0.1);border:none;color:#dc2626;font-size:11px;font-weight:700;padding:4px 12px;border-radius:6px;cursor:pointer;font-family:'Nunito',sans-serif;}
.adm-ad-row{display:flex;align-items:center;gap:14px;padding:14px 16px;border-bottom:1px solid #f0f0f6;}
.adm-ad-row:last-child{border-bottom:none;}
.adm-ad-thumb{width:90px;height:56px;border-radius:8px;background-size:cover;background-position:center;border:1px solid #e2e2ea;flex-shrink:0;display:flex;align-items:center;justify-content:center;background-color:#f8f8fc;}
.adm-views-hero{background:linear-gradient(135deg,#0a0a12,#1a1a2e);border-radius:16px;padding:24px;color:#fff;}
.adm-views-live{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#22c55e;margin-bottom:18px;}
.adm-live-dot{width:10px;height:10px;border-radius:50%;background:#22c55e;animation:pulse 1.5s ease-in-out infinite;flex-shrink:0;}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}
.adm-views-hero-nums{display:flex;align-items:center;gap:0;flex-wrap:wrap;}
.adm-views-divider{width:1px;height:50px;background:rgba(255,255,255,0.1);margin:0 24px;flex-shrink:0;}
.adm-views-big{text-align:center;}
.adm-views-big-num{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#fff;margin-bottom:4px;}
.adm-views-big-lbl{font-size:11px;font-weight:600;color:#6060a0;text-transform:uppercase;letter-spacing:1px;}
.adm-views-breakdown{display:flex;flex-direction:column;gap:14px;}
.adm-views-row{display:flex;align-items:flex-start;gap:10px;}
.adm-views-bar-bg{height:6px;background:#f0f0f6;border-radius:3px;overflow:hidden;}
.adm-views-bar-fill{height:100%;border-radius:3px;transition:width .5s ease;}
.adm-ad-perf-row{padding:10px 0;border-bottom:1px solid #f0f0f6;}
.adm-ad-perf-row:last-child{border-bottom:none;}
.adm-peak-hour{margin-top:14px;padding:10px 12px;background:#f8f8fc;border-radius:8px;font-size:12px;color:#72727f;font-weight:500;border:1px solid #e2e2ea;}

/* ── TEMPLATES TAB ── */
.adm-tpl-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.adm-tpl-stat{background:#fff;border-radius:14px;padding:18px 16px;border:1.5px solid #e2e2ea;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;text-align:center;transition:all .2s;}
.adm-tpl-stat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--tc);}
.adm-tpl-stat:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.07);}
.adm-tpl-stat-icon{font-size:26px;margin-bottom:8px;}
.adm-tpl-stat-val{font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:#0a0a12;margin-bottom:4px;}
.adm-tpl-stat-lbl{font-size:11px;font-weight:700;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.5px;}
.adm-tpl-chip{display:inline-block;margin-top:4px;padding:2px 8px;border-radius:5px;background:rgba(91,79,255,0.08);color:#5b4fff;font-size:10px;font-weight:700;}
.adm-url-cell{display:flex;align-items:center;gap:8px;min-width:0;}
.adm-url-text{font-size:11px;color:#5b4fff;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;flex:1;}
.adm-visit-btn{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:6px;background:rgba(91,79,255,0.1);color:#5b4fff;font-size:11px;font-weight:700;text-decoration:none;white-space:nowrap;flex-shrink:0;border:1px solid rgba(91,79,255,0.2);transition:all .15s;}
.adm-visit-btn:hover{background:rgba(91,79,255,0.18);transform:translateY(-1px);}
.adm-no-url{font-size:11px;color:#c0c0cc;font-weight:600;font-style:italic;}

/* ════════════════════════════════════════════
   RESPONSIVE — LAPTOP (≤1280px)
════════════════════════════════════════════ */
@media(max-width:1280px){
  .adm-root{grid-template-columns:190px 1fr;}
  .adm-stat-grid{grid-template-columns:repeat(4,1fr);gap:10px;}
  .adm-stat-val{font-size:20px;}
  .adm-views-big-num{font-size:26px;}
}

/* ════════════════════════════════════════════
   RESPONSIVE — TABLET LANDSCAPE (≤1024px)
════════════════════════════════════════════ */
@media(max-width:1024px){
  .adm-root{grid-template-columns:64px 1fr;}
  .adm-brand{padding:14px 0;justify-content:center;}
  .adm-brand-name,.adm-brand-sub{display:none;}
  .adm-brand-icon{width:36px;height:36px;}
  .adm-nav{padding:10px 6px;}
  .adm-nav-btn{justify-content:center;padding:12px 0;border-radius:10px;font-size:0;}
  .adm-nav-btn span:last-child{display:none;}
  .adm-nav-btn span:first-child{font-size:19px;}
  .adm-sidebar-stats{display:none;}
  .adm-sidebar-footer{flex-direction:column;padding:10px 4px;gap:6px;align-items:center;}
  .adm-admin-pill{display:none;}
  .adm-logout-btn{width:100%;text-align:center;font-size:10px;padding:6px 2px;}
  .adm-stat-grid{grid-template-columns:repeat(2,1fr);}
  .adm-row2{grid-template-columns:1fr;}
  .adm-detail-stats{grid-template-columns:repeat(2,1fr);}
  .adm-form-row{flex-direction:column;}
  .adm-img-preview{width:100%;height:140px;}
  .adm-img-upload-wrap{width:100%;}
  .adm-topbar{padding:12px 16px;}
  .adm-page-title{font-size:17px;}
  .adm-content{padding:14px 16px;}
  .adm-views-big-num{font-size:22px;}
  .adm-views-hero{padding:18px;}
  .adm-views-divider{margin:0 14px;}
  .adm-tpl-summary{grid-template-columns:repeat(3,1fr);}
}

/* ════════════════════════════════════════════
   RESPONSIVE — TABLET PORTRAIT (≤768px)
════════════════════════════════════════════ */
@media(max-width:768px){
  .adm-root{grid-template-columns:1fr;grid-template-rows:auto 1fr;}
  .adm-sidebar{
    position:fixed;bottom:0;left:0;right:0;top:auto;
    height:58px;flex-direction:row;align-items:stretch;
    z-index:100;box-shadow:0 -2px 16px rgba(0,0,0,0.28);
    overflow:visible;border-top:1px solid #1e1e2e;
  }
  .adm-brand{display:none;}
  .adm-nav{
    flex-direction:row;padding:0;flex:1;
    gap:0;align-items:stretch;justify-content:space-around;height:100%;
  }
  .adm-nav-btn{
    flex-direction:column;gap:2px;padding:6px 4px;
    flex:1;justify-content:center;align-items:center;
    border-radius:0;font-size:0;
  }
  .adm-nav-btn span:first-child{font-size:20px;}
  .adm-nav-btn span:last-child{
    display:block;font-size:9px;font-weight:700;
    color:inherit;text-transform:capitalize;
  }
  .adm-nav-active{
    border-top:2px solid #c0392b;
    background:rgba(192,57,43,0.12)!important;
    color:#ff8070!important;
  }
  .adm-sidebar-stats,.adm-sidebar-footer{display:none;}
  .adm-main{padding-bottom:58px;}
  .adm-topbar{padding:10px 14px;}
  .adm-page-title{font-size:15px;}
  .adm-page-sub{font-size:10px;}
  .adm-realtime{font-size:10px;padding:4px 8px;}
  .adm-refresh{font-size:11px;padding:5px 10px;}
  .adm-content{padding:12px;gap:12px;}
  .adm-stat-grid{grid-template-columns:repeat(2,1fr);gap:8px;}
  .adm-stat-card{padding:12px;}
  .adm-stat-val{font-size:18px;}
  .adm-stat-label{font-size:10px;}
  .adm-stat-sub{font-size:9px;}
  .adm-row2{grid-template-columns:1fr;gap:12px;}
  .adm-detail-stats{grid-template-columns:repeat(2,1fr);gap:8px;}
  .adm-card{border-radius:10px;}
  .adm-card-title{font-size:12px;margin-bottom:10px;}
  .adm-table{font-size:12px;min-width:480px;}
  .adm-table th{padding:8px 10px;font-size:10px;}
  .adm-table td{padding:8px 10px;}
  .adm-user-cell{gap:6px;}
  .adm-avatar{width:24px;height:24px;font-size:11px;}
  .adm-uname{font-size:12px;}
  .adm-uemail{font-size:10px;}
  .adm-toolbar{gap:6px;}
  .adm-search{min-width:120px;font-size:12px;padding:8px 10px;}
  .adm-select{font-size:12px;padding:8px 10px;}
  .adm-filter-btn{padding:8px 12px;font-size:12px;}
  .adm-total{font-size:11px;padding:5px 10px;}
  .adm-detail-header{padding:14px;gap:10px;}
  .adm-detail-name{font-size:16px;}
  .adm-avatar-lg{width:38px;height:38px;font-size:18px;}
  .adm-back-link{font-size:12px;}
  .adm-dstat-val{font-size:16px;}
  .adm-views-hero{padding:14px;border-radius:12px;}
  .adm-views-hero-nums{flex-wrap:wrap;gap:12px 0;}
  .adm-views-divider{display:none;}
  .adm-views-big{text-align:left;display:flex;align-items:baseline;gap:8px;min-width:45%;}
  .adm-views-big-num{font-size:20px;}
  .adm-views-big-lbl{font-size:10px;}
  .adm-views-live{font-size:12px;}
  .adm-form-row{flex-direction:column;gap:12px;}
  .adm-img-preview{width:100%;height:120px;}
  .adm-img-upload-wrap{width:100%;}
  .adm-input{font-size:12px;padding:8px 10px;}
  .adm-label{font-size:10px;}
  .adm-ad-row{padding:10px 12px;gap:10px;}
  .adm-ad-thumb{width:64px;height:42px;}
  .adm-chart{gap:4px;height:120px;}
  .adm-bar-val,.adm-bar-lbl{font-size:8px;}
  .adm-act-btn{font-size:10px;padding:4px 8px;}
  .al-card{padding:24px 18px;border-radius:16px;}
  .al-title{font-size:20px;}
  .adm-tpl-summary{grid-template-columns:repeat(3,1fr);gap:8px;}
  .adm-tpl-stat{padding:12px 10px;}
  .adm-tpl-stat-val{font-size:22px;}
  .adm-url-text{max-width:130px;}
}

/* ════════════════════════════════════════════
   RESPONSIVE — MOBILE (≤480px)
════════════════════════════════════════════ */
@media(max-width:480px){
  .adm-topbar{flex-direction:column;align-items:flex-start;gap:6px;padding:8px 12px;}
  .adm-page-title{font-size:14px;}
  .adm-nav-btn span:last-child{display:none;}
  .adm-nav-btn span:first-child{font-size:22px;}
  .adm-content{padding:10px;}
  .adm-stat-grid{grid-template-columns:1fr 1fr;gap:7px;}
  .adm-stat-val{font-size:16px;}
  .adm-stat-card{padding:10px;}
  .adm-detail-stats{grid-template-columns:1fr 1fr;}
  .adm-detail-header>div:last-child{width:100%;}
  .adm-views-big-num{font-size:17px;}
  .adm-dstat-val{font-size:14px;}
  .adm-card-title{font-size:11px;}
  .adm-chart{height:100px;}
  .adm-table{min-width:400px;}
  .adm-table th,.adm-table td{padding:7px 8px;}
  .adm-ad-row{flex-wrap:wrap;gap:8px;}
  .adm-ad-thumb{width:54px;height:36px;}
  .al-card{padding:20px 14px;}
  .al-title{font-size:18px;}
  .adm-content .adm-toolbar{flex-direction:column;align-items:stretch;}
  .adm-search{min-width:unset;width:100%;}
  .adm-tpl-summary{grid-template-columns:1fr;gap:8px;}
  .adm-tpl-stat{flex-direction:row;text-align:left;gap:12px;padding:12px 14px;}
  .adm-tpl-stat-icon{font-size:20px;margin-bottom:0;}
  .adm-tpl-stat-val{font-size:20px;}
  .adm-url-text{max-width:100px;}
}
`
