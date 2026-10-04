import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'
import { useNavigate, useLocation } from 'react-router-dom'
const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
const navigate = useNavigate()
const location = useLocation()
  // ── Load user on mount ──────────────────────────────────────
  useEffect(() => {
    const token = api.getToken()
    if (!token) { setLoading(false); return }
    api.get('/auth/me')
      .then(d => setUser(d.user))
      .catch(() => { api.clearToken(); setUser(null) })
      .finally(() => setLoading(false))
  }, [])
useEffect(() => {
  const onUnauthorized = () => setUser(null)
  window.addEventListener('zater:unauthorized', onUnauthorized)
  return () => window.removeEventListener('zater:unauthorized', onUnauthorized)
}, [])
  // ── Email/password login ────────────────────────────────────
  const login = async (email, password) => {
    const d = await api.post('/auth/login', { email, password })
    api.setToken(d.token)
    setUser(d.user)
    return d.user
  }

  // ── Email/password signup ───────────────────────────────────
  const signup = async (name, email, password, phone = '') => {
    const d = await api.post('/auth/signup', { name, email, password, phone })
    api.setToken(d.token)
    setUser(d.user)
    return d.user
  }

  // ── Google OAuth login/signup ───────────────────────────────
  const loginWithGoogle = async (credential) => {
    const d = await api.post('/auth/google', { credential })
    api.setToken(d.token)
    setUser(d.user)
    return d.user
  }

  // ── Email OTP: request code ─────────────────────────────────
  const sendOTP = async (email) => {
    const d = await api.post('/auth/send-otp', { email })
    return d.message
  }

  // ── Email OTP: verify code + login ──────────────────────────
  // ── Email OTP: verify code + login ──────────────────────────
  const loginWithOTP = async (email, otp, name = '', phone = '') => {   // ← added name, phone params
    const d = await api.post('/auth/verify-otp', { email, otp, name, phone })  // ← forward them
    api.setToken(d.token)
    setUser(d.user)
    return d.user
  }
// Run `action` if logged in, otherwise send to login and come back after
const requireAuth = (action) => {
  if (user) { action?.(); return true }
  navigate('/login', { state: { from: location.pathname + location.search } })
  return false
}
  // ── Logout ──────────────────────────────────────────────────
  const logout = () => {
    api.clearToken()
    setUser(null)
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect()
    }
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, signup, loginWithGoogle, sendOTP, loginWithOTP, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  )
}