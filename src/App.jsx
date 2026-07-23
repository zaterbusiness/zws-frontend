import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ProjectPage from './pages/ProjectPage'
import ProjectsPage from './pages/ProjectsPage'
import PaymentsPage from './pages/PaymentsPage'
import AppsPage from './pages/AppsPage'
import AppPage from './pages/AppPage'
import ZWSBot from './components/ZWSBot'
import AdminLogin from './pages/AdminLogin'
import AdminPage from './pages/AdminPage'
import SettingsPage from './pages/SettingsPage'
import './loadAppTemplates.jsx'
import CreditsPage from './pages/CreditsPage.jsx'
import DeploymentsPage from './pages/DeploymentsPage' // ← ADD THIS
import AboutPage     from './pages/AboutPage'
import ContactPage   from './pages/ContactPage'
import AdSupportPage from './pages/AdSupportPage'
import BlogPage        from './pages/BlogPage'
import CareersPage     from './pages/CareersPage'
import HelpCenterPage  from './pages/HelpCenterPage'
import CreditsInfoPage from './pages/CreditsInfoPage'
import { DocsPage, StatusPage, BugReportPage } from './pages/SupportPages'
import PaymentCallback from './components/PaymentCallback'
// ...

const PublicOnly = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/" replace /> : children
}

const WithFooter = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <div style={{ flex: 1 }}>{children}</div>
    <Footer />
  </div>
)

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public auth ── */}
      <Route path="/login"           element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/signup"          element={<PublicOnly><Signup /></PublicOnly>} />
      <Route path="/forgot-password" element={<PublicOnly><ForgotPassword /></PublicOnly>} />
      <Route path="/reset-password"  element={<ResetPassword />} />

      {/* ── Admin (completely separate — no user auth needed) ── */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin"       element={<AdminPage />} />

      {/* ── Protected user routes ── */}
      <Route path="/"            element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/projects"    element={<ProtectedRoute><WithFooter><ProjectsPage /></WithFooter></ProtectedRoute>} />
      <Route path="/payments"    element={<ProtectedRoute><WithFooter><PaymentsPage /></WithFooter></ProtectedRoute>} />
      <Route path="/project/:id" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
      <Route path="/apps"        element={<ProtectedRoute><WithFooter><AppsPage /></WithFooter></ProtectedRoute>} />
      <Route path="/app/:id"     element={<ProtectedRoute><AppPage /></ProtectedRoute>} />
      <Route path="/settings"    element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/credits"     element={<ProtectedRoute><CreditsPage /></ProtectedRoute>} />

      {/* ── Deployments ── */}                                          {/* ← ADD THIS */}
      <Route path="/deployments" element={<ProtectedRoute><DeploymentsPage /></ProtectedRoute>} />
<Route path="/payment/callback" element={<PaymentCallback />} />

{/*----footer---*/}
<Route path="/about"     element={<AboutPage />} />
<Route path="/contact"   element={<ContactPage />} />
<Route path="/advertise" element={<AdSupportPage />} />
<Route path="/blog"       element={<BlogPage />} />
<Route path="/careers"    element={<CareersPage />} />

{/* // Support */}
<Route path="/help"       element={<HelpCenterPage />} />
<Route path="/credits-info" element={<CreditsInfoPage />} />
<Route path="/docs"       element={<DocsPage />} />
<Route path="/status"     element={<StatusPage />} />
<Route path="/report-bug" element={<BugReportPage />} />



      {/* ── Catch-all (must stay last) ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ZWSBot />
      </AuthProvider>
    </BrowserRouter>
  )
}
  