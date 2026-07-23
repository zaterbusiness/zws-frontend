import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading]   = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/payments/history').then(d => setPayments(d.payments)).catch(console.error).finally(() => setLoading(false))
  }, [])

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)

  return (
    <>
      <style>{CSS}</style>
      <div className="pay-root">
        <div className="pay-dotgrid" />
        <nav className="pay-nav">
          <button onClick={() => navigate('/')} className="pay-back">← Home</button>
          <span className="pay-nav-title">Payment History</span>
          <div style={{ width: 80 }} />
        </nav>
        <div className="pay-content">
          <div className="pay-stats">
            <div className="pay-stat-card">
              <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
              <div className="pay-stat-val">₹{(totalPaid / 100).toLocaleString('en-IN')}</div>
              <div className="pay-stat-label">Total Spent</div>
            </div>
            <div className="pay-stat-card">
              <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
              <div className="pay-stat-val">{payments.filter(p => p.status === 'paid').length}</div>
              <div className="pay-stat-label">Transactions</div>
            </div>
          </div>

          {loading ? (
            <div className="pay-loader"><div className="pay-spin" /></div>
          ) : payments.length === 0 ? (
            <div className="pay-empty">
              <div style={{ fontSize: 48, marginBottom: 14 }}>🧾</div>
              <p className="pay-empty-text">No payments yet</p>
            </div>
          ) : (
            <div className="pay-list">
              {payments.map(p => (
                <div key={p.id} className="pay-row">
                  <div className="pay-row-left">
                    <div className="pay-row-icon" style={{ background: p.type === 'preview' ? 'rgba(91,79,255,0.1)' : 'rgba(34,197,94,0.1)' }}>
                      {p.type === 'preview' ? '👁️' : '💾'}
                    </div>
                    <div>
                      <div className="pay-row-title">{p.type === 'preview' ? 'Preview Unlock' : 'Download Unlock'}</div>
                      <div className="pay-row-sub">{p.project_title || 'Project'} • {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="pay-row-amount">₹{(p.amount / 100).toLocaleString('en-IN')}</div>
                    <div className="pay-row-status" style={{ color: p.status === 'paid' ? '#22c55e' : '#f59e0b', background: p.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)' }}>
                      {p.status === 'paid' ? 'Paid ✓' : 'Pending'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
.pay-root{min-height:100vh;background:#fff;font-family:'Nunito',sans-serif;}
.pay-dotgrid{position:fixed;inset:0;background-image:radial-gradient(circle,#ccccda 1px,transparent 1px);background-size:26px 26px;opacity:0.42;pointer-events:none;z-index:0;}
.pay-nav{position:sticky;top:0;z-index:100;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;background:rgba(255,255,255,0.93);backdrop-filter:blur(12px);border-bottom:1px solid #e2e2ea;}
.pay-back{padding:7px 14px;border-radius:8px;background:transparent;border:1.5px solid #e2e2ea;font-size:13px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all 0.18s;}
.pay-back:hover{border-color:#c8c8d4;background:#f5f5f7;}
.pay-nav-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}
.pay-content{position:relative;z-index:1;max-width:680px;margin:0 auto;padding:44px 24px;}
.pay-stats{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:36px;}
.pay-stat-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:14px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.pay-stat-val{font-family:'Playfair Display',serif;font-size:28px;font-weight:900;color:#0a0a12;margin-bottom:5px;}
.pay-stat-label{font-size:12px;color:#a0a0b0;font-weight:600;}
.pay-loader{display:flex;justify-content:center;padding-top:60px;}
.pay-spin{width:32px;height:32px;border:3px solid #e2e2ea;border-top-color:#0a0a12;border-radius:50%;animation:spin 1s linear infinite;}
.pay-empty{text-align:center;padding-top:60px;}
.pay-empty-text{font-size:16px;color:#a0a0b0;font-weight:600;}
.pay-list{display:flex;flex-direction:column;gap:10px;}
.pay-row{background:#fff;border:1.5px solid #e2e2ea;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 4px rgba(0,0,0,0.04);}
.pay-row-left{display:flex;align-items:center;gap:14px;}
.pay-row-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;}
.pay-row-title{font-size:14px;font-weight:800;color:#0a0a12;margin-bottom:3px;}
.pay-row-sub{font-size:12px;color:#a0a0b0;font-weight:500;}
.pay-row-amount{font-size:16px;font-weight:900;color:#0a0a12;margin-bottom:4px;}
.pay-row-status{font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;display:inline-block;}
`
