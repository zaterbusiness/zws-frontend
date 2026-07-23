import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../utils/api'

export default function PaymentCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus]   = useState('checking') // checking | paid | failed
  const [message, setMessage] = useState('Confirming your payment...')

  useEffect(() => {
    const txn = params.get('txn')
    if (!txn) {
      setStatus('failed')
      setMessage('Missing transaction reference.')
      return
    }

    let attempts = 0
    const poll = async () => {
      attempts++
      try {
        const result = await api.get(`/credits/status/${txn}`)
        if (result.status === 'paid' || result.status === 'already_processed') {
          sessionStorage.removeItem('zws_pending_txn')
          setStatus('paid')
          setMessage(result.message || 'Payment successful!')
          setTimeout(() => navigate('/credits'), 1800)
          return
        }
        if (result.status === 'failed') {
          sessionStorage.removeItem('zws_pending_txn')
          setStatus('failed')
          setMessage(result.message || 'Payment failed or was cancelled.')
          return
        }
        // PhonePe status can lag briefly — retry a few times
        if (attempts < 5) setTimeout(poll, 2000)
        else { setStatus('failed'); setMessage('Could not confirm payment. Check your credits page in a minute — contact support if amount was deducted.') }
      } catch (err) {
        if (attempts < 5) setTimeout(poll, 2000)
        else { setStatus('failed'); setMessage('Could not confirm payment. Contact support if amount was deducted.') }
      }
    }
    poll()
  }, [params, navigate])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
      fontFamily: "'Nunito', sans-serif", background: '#f8f8fc', textAlign: 'center', padding: 24,
    }}>
      <div style={{ fontSize: 40 }}>
        {status === 'checking' ? '⏳' : status === 'paid' ? '✅' : '❌'}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#0a0a12', maxWidth: 360 }}>{message}</div>
      {status === 'failed' && (
        <button
          onClick={() => navigate('/credits')}
          style={{
            padding: '10px 20px', borderRadius: 10, background: '#c0392b',
            border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer',
          }}
        >
          Back to Credits
        </button>
      )}
    </div>
  )
}