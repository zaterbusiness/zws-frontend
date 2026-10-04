import React from 'react'

import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
const Spinner = () => (
  <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a12' }}>
    <div style={{ width:36, height:36, border:'3px solid #1e1e3e', borderTopColor:'#c0392b', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </div>
)

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <Spinner />
  return user
    ? children
    : <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
}
