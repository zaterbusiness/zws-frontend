import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  // ── Load user on mount ──────────────────────────────────────
  useEffect(() => {
    const token = api.getToken()
    if (!token) { setLoading(false); return }
    api.get('/auth/me')
      .then(d => setUser(d.user))
      .catch(() => { api.clearToken(); setUser(null) })
      .finally(() => setLoading(false))
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
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
