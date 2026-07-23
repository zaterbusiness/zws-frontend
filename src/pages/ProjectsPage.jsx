import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function ProjectsPage() {
  const navigate               = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')

  // Edit modal state
  const [editModal,  setEditModal]  = useState(null)
  const [editTitle,  setEditTitle]  = useState('')
  const [editSaving, setEditSaving] = useState(false)

  // Regenerate modal state
  const [regenModal,  setRegenModal]  = useState(null)
  const [regenPrompt, setRegenPrompt] = useState('')
  const [regenBusy,   setRegenBusy]   = useState(false)

  // Delete confirm state
  const [deleteModal,   setDeleteModal]   = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchProjects = useCallback(async () => {
    try {
      const d = await api.get('/projects')
      setProjects(d.projects || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  // ── Edit title ───────────────────────────────────────────
  const openEdit = (p) => { setEditModal(p); setEditTitle(p.title) }
  const saveEdit = async () => {
    if (!editTitle.trim()) return
    setEditSaving(true)
    try {
      await api.put(`/projects/${editModal.id}`, { title: editTitle.trim() })
      setProjects(prev => prev.map(p => p.id === editModal.id ? { ...p, title: editTitle.trim() } : p))
      setEditModal(null)
    } catch (err) { setError(err.message) }
    finally { setEditSaving(false) }
  }

  // ── Regenerate ───────────────────────────────────────────
  const openRegen = (p) => { setRegenModal(p); setRegenPrompt(p.prompt) }
  const startRegen = async () => {
    setRegenBusy(true)
    try {
      await api.post(`/projects/${regenModal.id}/regenerate`, { prompt: regenPrompt.trim() })
      setRegenModal(null)
      navigate(`/project/${regenModal.id}`)
    } catch (err) { setError(err.message) }
    finally { setRegenBusy(false) }
  }

  // ── Delete ───────────────────────────────────────────────
  const confirmDelete = async () => {
    setDeleteLoading(true)
    try {
      await api.delete(`/projects/${deleteModal.id}`)
      setProjects(prev => prev.filter(p => p.id !== deleteModal.id))
      setDeleteModal(null)
    } catch (err) { setError(err.message) }
    finally { setDeleteLoading(false) }
  }

  const statusMeta = (s) => ({
    generating: { bg: 'rgba(245,158,11,0.1)', color: '#d97706', label: '⏳ Generating' },
    ready:      { bg: 'rgba(34,197,94,0.1)',  color: '#16a34a', label: '✅ Ready'      },
    failed:     { bg: 'rgba(239,68,68,0.1)',  color: '#dc2626', label: '❌ Failed'     },
  }[s] || { bg: '#f0f0f6', color: '#6b6b7a', label: s })

  return (
    <>
     {/* NAV */}
        <nav className="pp-nav">
          <button className="pp-back" onClick={() => navigate('/home')}>← Home</button>
          
          
        </nav>
      <style>{CSS}</style>
      <div className="pj-root">
        <div className="pj-header">
          <div>
            <h1 className="pj-title">My Projects</h1>
            <p className="pj-sub">{projects.length} website{projects.length !== 1 ? 's' : ''} generated</p>
          </div>
          <button className="pj-new-btn" onClick={() => navigate('/')}>+ New Website</button>
        </div>

        {error && (
          <div className="pj-error">
            {error}
            <button onClick={() => setError('')} className="pj-err-x">✕</button>
          </div>
        )}

        {loading ? (
          <div className="pj-loading"><div className="pj-spinner" /><p>Loading projects…</p></div>
        ) : projects.length === 0 ? (
          <div className="pj-empty">
            <div style={{fontSize:52}}>🖥️</div>
            <h3>No projects yet</h3>
            <p>Generate your first AI website — it's free!</p>
            <button className="pj-new-btn" onClick={() => navigate('/')}>Generate Website ⚡</button>
          </div>
        ) : (
          <div className="pj-grid">
            {projects.map(p => {
              const st = statusMeta(p.status)
              return (
                <div key={p.id} className="pj-card">

                  {/* status + date */}
                  <div className="pj-card-top">
                    <span className="pj-status-pill" style={{background: st.bg, color: st.color}}>{st.label}</span>
                    <span className="pj-date">
                      {new Date(p.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="pj-card-title">{p.title}</h3>

                  {/* prompt */}
                  <p className="pj-card-prompt">
                    "{p.prompt?.slice(0, 100)}{p.prompt?.length > 100 ? '…' : ''}"
                  </p>

                  {/* hosted badge — shown when live on GitHub */}
                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="pj-hosted-badge">
                      🌐 Live on GitHub Pages ↗
                    </a>
                  )}

                  {/* download & host always free badge */}
                  {p.status === 'ready' && !p.github_url && (
                    <span className="pj-free-badge">🆓 Download & Host — Free</span>
                  )}

                  {/* action buttons */}
                  <div className="pj-card-actions">
                    <button
  className="pj-btn pj-btn-primary"
  onClick={() => navigate(p.type === 'app' ? `/app/${p.id}` : `/project/${p.id}`)}
>
  👁️ View
</button>
                    <button className="pj-btn pj-btn-outline" onClick={() => openEdit(p)}>
                      ✏️ Edit
                    </button>
                    {/* <button className="pj-btn pj-btn-outline" onClick={() => openRegen(p)} disabled={p.status === 'generating'}>
                      🔄 Regenerate
                    </button> */}
                    <button className="pj-btn pj-btn-danger" onClick={() => setDeleteModal(p)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── EDIT MODAL ── */}
        {editModal && (
          <div className="pj-modal-overlay" onClick={() => setEditModal(null)}>
            <div className="pj-modal" onClick={e => e.stopPropagation()}>
              <div className="pj-modal-header">
                <h2 className="pj-modal-title">✏️ Edit Project Title</h2>
                <button className="pj-modal-close" onClick={() => setEditModal(null)}>✕</button>
              </div>
              <div className="pj-modal-body">
                <label className="pj-label">Project Title</label>
                <input
                  className="pj-input"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Enter new title…"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && saveEdit()}
                  maxLength={100}
                />
                <div className="pj-char-count">{editTitle.length}/100</div>
              </div>
              <div className="pj-modal-footer">
                <button className="pj-btn pj-btn-outline" onClick={() => setEditModal(null)}>Cancel</button>
                <button className="pj-btn pj-btn-primary" onClick={saveEdit} disabled={editSaving || !editTitle.trim()}>
                  {editSaving ? 'Saving…' : 'Save Title'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── REGENERATE MODAL ── */}
        {regenModal && (
          <div className="pj-modal-overlay" onClick={() => setRegenModal(null)}>
            <div className="pj-modal pj-modal-lg" onClick={e => e.stopPropagation()}>
              <div className="pj-modal-header">
                {/* <h2 className="pj-modal-title">🔄 Regenerate Website</h2> */}
                <button className="pj-modal-close" onClick={() => setRegenModal(null)}>✕</button>
              </div>
              <div className="pj-modal-body">
                <div className="pj-regen-warning">
                  ⚠️ This will <strong>replace</strong> the current website with a new AI-generated one.
                </div>
                <label className="pj-label">Edit your prompt (or keep the same)</label>
                <textarea
                  className="pj-textarea"
                  value={regenPrompt}
                  onChange={e => setRegenPrompt(e.target.value)}
                  placeholder="Describe your website…"
                  rows={4}
                  autoFocus
                />
              </div>
              <div className="pj-modal-footer">
                <button className="pj-btn pj-btn-outline" onClick={() => setRegenModal(null)}>Cancel</button>
                {/* <button className="pj-btn pj-btn-red" onClick={startRegen} disabled={regenBusy || !regenPrompt.trim()}>
                  {regenBusy ? '🔄 Starting…' : '🔄 Regenerate Now'}
                </button> */}
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE MODAL ── */}
        {deleteModal && (
          <div className="pj-modal-overlay" onClick={() => setDeleteModal(null)}>
            <div className="pj-modal" onClick={e => e.stopPropagation()}>
              <div className="pj-modal-header">
                <h2 className="pj-modal-title">🗑️ Delete Project</h2>
                <button className="pj-modal-close" onClick={() => setDeleteModal(null)}>✕</button>
              </div>
              <div className="pj-modal-body">
                <div className="pj-delete-warning">
                  Are you sure you want to delete <strong>"{deleteModal.title}"</strong>?
                  <br /><br />
                  This will permanently delete the project and all generated HTML.{' '}
                  <strong>This cannot be undone.</strong>
                </div>
              </div>
              <div className="pj-modal-footer">
                <button className="pj-btn pj-btn-outline" onClick={() => setDeleteModal(null)}>Cancel</button>
                <button className="pj-btn pj-btn-danger-solid" onClick={confirmDelete} disabled={deleteLoading}>
                  {deleteLoading ? 'Deleting…' : '🗑️ Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

.pj-root{font-family:'Nunito',sans-serif;max-width:1100px;margin:0 auto;padding:40px 24px 80px;color:#0a0a12;}

/* HEADER */
.pj-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;gap:16px;flex-wrap:wrap;}
.pj-title{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#0a0a12;letter-spacing:-1px;margin-bottom:4px;}
.pj-sub{font-size:14px;color:#72727f;font-weight:500;}
.pj-new-btn{background:#c0392b;color:#fff;border:none;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;box-shadow:0 2px 10px rgba(192,57,43,0.3);transition:all .18s;white-space:nowrap;}
.pj-new-btn:hover{opacity:0.88;transform:translateY(-1px);}

/* ERROR */
.pj-error{background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:12px 16px;font-size:13px;color:#dc2626;font-weight:600;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.pj-err-x{background:none;border:none;color:#dc2626;font-size:16px;font-weight:800;cursor:pointer;padding:0;}

/* LOADING */
.pj-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 0;color:#a0a0b0;font-weight:600;}
.pj-spinner{width:36px;height:36px;border:3px solid #e2e2ea;border-top-color:#c0392b;border-radius:50%;animation:spin 1s linear infinite;}

/* EMPTY */
.pj-empty{text-align:center;padding:80px 20px;display:flex;flex-direction:column;align-items:center;gap:14px;}
.pj-empty h3{font-family:'Playfair Display',serif;font-size:22px;font-weight:800;color:#0a0a12;}
.pj-empty p{font-size:14px;color:#72727f;font-weight:500;}

/* GRID */
.pj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;}

/* CARD */
.pj-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:12px;transition:all .2s;animation:fadeUp 0.3s ease;}
.pj-card:hover{border-color:#c0392b;box-shadow:0 8px 32px rgba(0,0,0,0.08);transform:translateY(-2px);}
.pj-card-top{display:flex;align-items:center;justify-content:space-between;gap:8px;}
.pj-status-pill{font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;}
.pj-date{font-size:11px;color:#a0a0b0;font-weight:600;}
.pj-card-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;line-height:1.3;}
.pj-card-prompt{font-size:12px;color:#72727f;font-weight:500;line-height:1.55;font-style:italic;background:#fafafa;border:1px solid #f0f0f6;border-radius:8px;padding:9px 11px;}

/* Badges */
.pj-free-badge{font-size:11px;font-weight:700;color:#15803d;background:rgba(34,197,94,0.1);padding:4px 10px;border-radius:100px;align-self:flex-start;}
.pj-hosted-badge{font-size:11px;font-weight:700;color:#2563eb;background:rgba(37,99,235,0.1);padding:4px 10px;border-radius:100px;align-self:flex-start;text-decoration:none;transition:all .18s;}
.pj-hosted-badge:hover{background:rgba(37,99,235,0.18);}

/* ACTION BUTTONS */
.pj-card-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:4px;}
.pj-btn{padding:8px 12px;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;border:none;transition:all .18s;display:flex;align-items:center;justify-content:center;gap:5px;}
.pj-btn:disabled{opacity:0.45;cursor:not-allowed;transform:none !important;}
.pj-btn-primary{background:#0a0a12;color:#fff;}
.pj-btn-primary:hover:not(:disabled){background:#c0392b;}
.pj-btn-outline{background:#fff;color:#0a0a12;border:1.5px solid #e2e2ea;}
.pj-btn-outline:hover:not(:disabled){border-color:#0a0a12;background:#fafafa;}
.pj-btn-red{background:#c0392b;color:#fff;box-shadow:0 2px 8px rgba(192,57,43,0.25);}
.pj-btn-red:hover:not(:disabled){opacity:0.88;transform:translateY(-1px);}
.pj-btn-danger{background:#fff;color:#dc2626;border:1.5px solid rgba(220,38,38,0.2);}
.pj-btn-danger:hover:not(:disabled){background:rgba(220,38,38,0.06);border-color:#dc2626;}
.pj-btn-danger-solid{background:#dc2626;color:#fff;box-shadow:0 2px 8px rgba(220,38,38,0.25);}
.pj-btn-danger-solid:hover:not(:disabled){opacity:0.88;}

/* MODAL */
.pj-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.15s ease;}
.pj-modal{background:#fff;border-radius:20px;width:100%;max-width:440px;box-shadow:0 24px 80px rgba(0,0,0,0.2);animation:fadeUp 0.2s ease;overflow:hidden;}
.pj-modal-lg{max-width:540px;}
.pj-modal-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid #f0f0f6;}
.pj-modal-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#0a0a12;}
.pj-modal-close{background:none;border:none;font-size:16px;color:#a0a0b0;cursor:pointer;padding:4px;border-radius:6px;}
.pj-modal-close:hover{background:#f0f0f6;color:#0a0a12;}
.pj-modal-body{padding:18px 20px;}
.pj-modal-footer{display:flex;gap:10px;justify-content:flex-end;padding:14px 20px;border-top:1px solid #f0f0f6;}

/* FORM ELEMENTS */
.pj-label{display:block;font-size:12px;font-weight:700;color:#6b6b7a;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:7px;}
.pj-input{width:100%;padding:10px 13px;border:1.5px solid #e2e2ea;border-radius:10px;font-size:14px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;background:#fff;transition:border-color .18s;}
.pj-input:focus{border-color:#c0392b;}
.pj-textarea{width:100%;padding:10px 13px;border:1.5px solid #e2e2ea;border-radius:10px;font-size:13px;font-family:'Nunito',sans-serif;color:#0a0a12;outline:none;resize:vertical;min-height:100px;background:#fff;transition:border-color .18s;line-height:1.6;}
.pj-textarea:focus{border-color:#c0392b;}
.pj-char-count{text-align:right;font-size:11px;color:#a0a0b0;font-weight:600;margin-top:5px;}

/* WARNINGS */
.pj-regen-warning{background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.25);border-radius:10px;padding:11px 13px;font-size:13px;color:#92400e;font-weight:500;line-height:1.5;margin-bottom:16px;}
.pj-delete-warning{background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);border-radius:10px;padding:13px 15px;font-size:13px;color:#991b1b;font-weight:500;line-height:1.65;}

@media(max-width:600px){.pj-grid{grid-template-columns:1fr;}.pj-card-actions{grid-template-columns:1fr 1fr;}}
`
