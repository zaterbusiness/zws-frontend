import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Footer from './Footer'
import ZWSBot from './ZWSBot'
import TemplateGallery from './TemplateGallery'
import zaterLogo from '../assets/zater-logo.jpeg'
import WelcomeCreditsPopup from './WelcomeCreditsPopup'
import NavCreditsBadge from './NavCreditsBadge'

const EXAMPLES = [
  'Restaurant landing page with menu & reservations',
  'Portfolio for a photographer with gallery',
  'SaaS dashboard for project management',
  'E-commerce store for handmade jewelry',
  'Fitness studio with class schedule & booking',
]

const APP_EXAMPLES = [
  'Task manager with projects, tasks and team members',
  'Expense tracker with categories and monthly charts',
  'Blog platform with posts, comments and user profiles',
  'Inventory system with stock alerts and reports',
]
const APP_TEMPLATES = [
  {
    id: 'user-management',
    icon: '👥',
    name: 'User Management System',
    desc: 'Login, signup, admin panel, role-based access, user CRUD',
    tags: ['Auth', 'Admin', 'CRUD', 'Roles'],
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    name: 'E-Commerce Store',
    desc: 'Products, cart, orders, admin dashboard, payments UI',
    tags: ['Products', 'Cart', 'Orders', 'Admin'],
    color: '#c8860a',
    bg: 'rgba(200,134,10,0.08)',
  },
  {
    id: 'food-ordering',
    icon: '🍔',
    name: 'Food Ordering App',
    desc: 'Menu, cart, checkout, order tracking, restaurant admin',
    tags: ['Menu', 'Cart', 'Orders', 'Tracking'],
    color: '#ff6b00',
    bg: 'rgba(255,107,0,0.08)',
  },
  {
    id: 'appointment',
    icon: '📅',
    name: 'Appointment Booking',
    desc: 'Calendar slots, booking flow, admin approval, status tracking',
    tags: ['Calendar', 'Booking', 'Admin', 'Status'],
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.08)',
  },
  // ── ADD THESE TWO ──
  {
    id: 'chat-app',
    icon: '💬',
    name: 'Chat App',
    desc: 'Real-time messaging UI with contacts, conversations, and online status',
    tags: ['Messaging', 'Contacts', 'Realtime'],
    color: '#7c5cfc',
    bg: 'rgba(124,92,252,0.08)',
  },
  {
    id: 'blog-cms',
    icon: '📝',
    name: 'Blog CMS',
    desc: 'Content management with post editor, categories, and publish workflow',
    tags: ['Posts', 'Editor', 'Categories'],
    color: '#6c47ff',
    bg: 'rgba(108,71,255,0.08)',
  },
]

const TEMPLATES = [
  {
    id: 1, cat: 'Restaurant', catColor: '#f59e0b', catBg: 'rgba(245,158,11,0.1)',
    title: 'Fine Dining', desc: 'Elegant restaurant with menu, reservations & gallery',
    tags: ['Menu', 'Booking', 'Gallery'],
    prompt: 'Luxury fine dining restaurant landing page with menu sections, online reservation form, chef profile, and photo gallery. Use warm gold and dark tones.',
    preview: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;font-family:'Georgia',serif;}body{background:#1a0f00;color:#f5e6c8;overflow:hidden;}nav{background:rgba(0,0,0,0.8);padding:10px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #8b6914;}.logo{font-size:16px;color:#d4a017;letter-spacing:3px;font-weight:bold;}.nav-links{display:flex;gap:16px;}.nav-links a{color:#c8a96e;font-size:10px;letter-spacing:1px;text-decoration:none;text-transform:uppercase;}.hero{background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),linear-gradient(135deg,#3d1f00,#1a0f00);padding:40px 20px;text-align:center;border-bottom:1px solid #8b6914;}.hero h1{font-size:28px;color:#d4a017;letter-spacing:4px;margin-bottom:8px;}.hero p{font-size:11px;color:#c8a96e;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;}.btn{background:#d4a017;color:#1a0f00;padding:8px 24px;border:none;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;}.menu-section{padding:20px;background:#0d0800;}.menu-title{text-align:center;font-size:14px;color:#d4a017;letter-spacing:3px;margin-bottom:14px;text-transform:uppercase;}.menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}.menu-item{background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);padding:10px;border-radius:4px;}.item-name{font-size:11px;color:#f5e6c8;font-weight:bold;margin-bottom:3px;}.item-price{font-size:12px;color:#d4a017;}.item-desc{font-size:9px;color:#9a8060;margin-top:3px;}</style></head><body><nav><div class="logo">MAISON</div><div class="nav-links"><a href="#">Menu</a><a href="#">Reserve</a><a href="#">About</a></div></nav><div class="hero"><h1>Fine Dining</h1><p>An unforgettable culinary journey</p><button class="btn">Reserve a Table</button></div><div class="menu-section"><div class="menu-title">Our Menu</div><div class="menu-grid"><div class="menu-item"><div class="item-name">Foie Gras</div><div class="item-price">₹1,800</div><div class="item-desc">Pan-seared with brioche</div></div><div class="menu-item"><div class="item-name">Beef Tenderloin</div><div class="item-price">₹3,200</div><div class="item-desc">Truffle jus, seasonal veg</div></div><div class="menu-item"><div class="item-name">Lobster Bisque</div><div class="item-price">₹1,400</div><div class="item-desc">Cream, cognac, chives</div></div><div class="menu-item"><div class="item-name">Crème Brûlée</div><div class="item-price">₹780</div><div class="item-desc">Classic vanilla custard</div></div></div></div></body></html>`,
  },
  {
    id: 2, cat: 'Portfolio', catColor: '#8b5cf6', catBg: 'rgba(139,92,246,0.1)',
    title: 'Photographer', desc: 'Stunning portfolio with masonry gallery & contact',
    tags: ['Gallery', 'About', 'Contact'],
    prompt: 'Professional photographer portfolio website with masonry image gallery, about section, services with pricing, and contact form. Minimal black and white aesthetic.',
    preview: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;font-family:'Helvetica Neue',sans-serif;}body{background:#0a0a0a;color:#fff;overflow:hidden;}nav{padding:14px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #222;}.logo{font-size:14px;letter-spacing:6px;font-weight:300;color:#fff;}.nav-links{display:flex;gap:16px;}.nav-links a{color:#888;font-size:9px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;}.hero{padding:28px 20px 20px;display:flex;align-items:center;gap:20px;border-bottom:1px solid #1a1a1a;}.hero-text h1{font-size:22px;font-weight:200;letter-spacing:4px;line-height:1.3;color:#fff;margin-bottom:8px;}.hero-text p{font-size:10px;color:#666;letter-spacing:1px;line-height:1.6;}.hero-img{width:80px;height:100px;background:linear-gradient(135deg,#333,#111);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:24px;}.gallery{padding:16px 20px;}.gallery-title{font-size:9px;letter-spacing:3px;color:#555;text-transform:uppercase;margin-bottom:12px;}.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;}.g-item{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:18px;}.g1{background:linear-gradient(135deg,#2a2a2a,#111);}.g2{background:linear-gradient(135deg,#1a1a2e,#0f0f1e);}.g3{background:linear-gradient(135deg,#1e1e1e,#333);}.g4{background:linear-gradient(135deg,#0d0d0d,#2a2a2a);}.g5{background:linear-gradient(135deg,#1a1a1a,#444);}.g6{background:linear-gradient(135deg,#222,#0a0a0a);}</style></head><body><nav><div class="logo">ARIA</div><div class="nav-links"><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a></div></nav><div class="hero"><div class="hero-text"><h1>Capturing<br/>Moments</h1><p>Fine art photography<br/>available worldwide</p></div><div class="hero-img">📷</div></div><div class="gallery"><div class="gallery-title">Selected Works</div><div class="gallery-grid"><div class="g-item g1">🌆</div><div class="g-item g2">🌙</div><div class="g-item g3">🏔️</div><div class="g-item g4">🌊</div><div class="g-item g5">🌿</div><div class="g-item g6">✨</div></div></div></body></html>`,
  },
  {
    id: 3, cat: 'SaaS', catColor: '#5b4fff', catBg: 'rgba(91,79,255,0.1)',
    title: 'SaaS Product', desc: 'Modern SaaS landing page with pricing & features',
    tags: ['Pricing', 'Features', 'CTA'],
    prompt: 'Modern SaaS landing page with hero section, feature highlights, pricing table with 3 tiers, customer testimonials, and FAQ accordion. Use purple and blue gradients.',
    preview: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;font-family:'Inter',system-ui,sans-serif;}body{background:#0f0a1e;color:#e0d7ff;overflow:hidden;}nav{padding:12px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(139,92,246,0.2);}.logo{font-size:14px;font-weight:800;background:linear-gradient(90deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}.nav-links{display:flex;gap:12px;align-items:center;}.nav-links a{color:#9ca3af;font-size:10px;text-decoration:none;}.nav-btn{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;padding:5px 14px;border-radius:6px;font-size:10px;border:none;cursor:pointer;}.hero{padding:28px 20px;text-align:center;background:radial-gradient(ellipse at top,rgba(139,92,246,0.15),transparent);}.badge{display:inline-block;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);color:#a78bfa;font-size:9px;padding:3px 10px;border-radius:20px;margin-bottom:12px;letter-spacing:1px;}.hero h1{font-size:22px;font-weight:800;line-height:1.2;margin-bottom:8px;background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}.hero p{font-size:10px;color:#9ca3af;margin-bottom:16px;line-height:1.6;}.hero-btns{display:flex;gap:8px;justify-content:center;}.btn-primary{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;padding:7px 18px;border-radius:8px;font-size:10px;border:none;cursor:pointer;font-weight:600;}.btn-secondary{background:rgba(139,92,246,0.1);color:#a78bfa;padding:7px 18px;border-radius:8px;font-size:10px;border:1px solid rgba(139,92,246,0.3);cursor:pointer;}.features{padding:16px 20px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}.feat{background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.15);border-radius:8px;padding:10px;text-align:center;}.feat-icon{font-size:18px;margin-bottom:5px;}.feat-name{font-size:10px;font-weight:600;color:#e0d7ff;margin-bottom:3px;}.feat-desc{font-size:9px;color:#6b7280;}</style></head><body><nav><div class="logo">FlowAI</div><div class="nav-links"><a href="#">Features</a><a href="#">Pricing</a><button class="nav-btn">Start Free</button></div></nav><div class="hero"><div class="badge">✨ Now with AI Automation</div><h1>Build faster with<br/>smart workflows</h1><p>The all-in-one platform for modern<br/>teams to ship products faster.</p><div class="hero-btns"><button class="btn-primary">Get Started Free</button><button class="btn-secondary">Watch Demo</button></div></div><div class="features"><div class="feat"><div class="feat-icon">⚡</div><div class="feat-name">Fast</div><div class="feat-desc">10x faster delivery</div></div><div class="feat"><div class="feat-icon">🔒</div><div class="feat-name">Secure</div><div class="feat-desc">Enterprise grade</div></div><div class="feat"><div class="feat-icon">🤖</div><div class="feat-name">AI-First</div><div class="feat-desc">Smart automation</div></div></div></body></html>`,
  },
  {
    id: 4, cat: 'E-Commerce', catColor: '#ec4899', catBg: 'rgba(236,72,153,0.1)',
    title: 'Online Store', desc: 'Beautiful shop with product grid & cart UI',
    tags: ['Products', 'Cart', 'Filters'],
    prompt: 'Beautiful e-commerce store for handmade jewelry with product grid, category filters, product detail view, and shopping cart sidebar. Use rose and cream tones.',
    preview: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;font-family:'Georgia',serif;}body{background:#fdf8f5;color:#2d1b0e;overflow:hidden;}nav{background:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f0e8e0;}.logo{font-size:14px;letter-spacing:3px;color:#8b4a6b;font-weight:bold;}.nav-right{display:flex;align-items:center;gap:16px;}.nav-right a{font-size:10px;color:#9a7060;text-decoration:none;letter-spacing:1px;}.cart-btn{background:#8b4a6b;color:#fff;padding:5px 12px;border:none;font-size:9px;letter-spacing:1px;cursor:pointer;border-radius:3px;}.banner{background:linear-gradient(135deg,#8b4a6b,#c4698a);padding:20px;text-align:center;color:#fff;}.banner h2{font-size:18px;letter-spacing:3px;margin-bottom:5px;}.banner p{font-size:10px;letter-spacing:1px;opacity:0.9;margin-bottom:10px;}.banner-btn{background:#fff;color:#8b4a6b;padding:6px 18px;border:none;font-size:9px;letter-spacing:2px;cursor:pointer;}.products{padding:14px 20px;}.prod-title{font-size:10px;letter-spacing:2px;color:#9a7060;text-transform:uppercase;margin-bottom:12px;}.prod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}.prod-card{background:#fff;border-radius:6px;overflow:hidden;border:1px solid #f0e0d0;}.prod-img{height:60px;display:flex;align-items:center;justify-content:center;font-size:22px;}.p1{background:linear-gradient(135deg,#fdf0f5,#fae0ea);}.p2{background:linear-gradient(135deg,#f5f0fd,#e8dff5);}.p3{background:linear-gradient(135deg,#fdf5e0,#f5e8c8);}.prod-info{padding:7px;}.prod-name{font-size:10px;color:#2d1b0e;margin-bottom:3px;}.prod-price{font-size:11px;color:#8b4a6b;font-weight:bold;}</style></head><body><nav><div class="logo">LUMIÈRE</div><div class="nav-right"><a href="#">Shop</a><a href="#">About</a><button class="cart-btn">Cart (0)</button></div></nav><div class="banner"><h2>New Collection</h2><p>Handcrafted jewelry for every story</p><button class="banner-btn">Shop Now</button></div><div class="products"><div class="prod-title">Featured Pieces</div><div class="prod-grid"><div class="prod-card"><div class="prod-img p1">💎</div><div class="prod-info"><div class="prod-name">Rose Ring</div><div class="prod-price">₹2,400</div></div></div><div class="prod-card"><div class="prod-img p2">💜</div><div class="prod-info"><div class="prod-name">Pearl Chain</div><div class="prod-price">₹1,800</div></div></div><div class="prod-card"><div class="prod-img p3">✨</div><div class="prod-info"><div class="prod-name">Gold Bangle</div><div class="prod-price">₹3,200</div></div></div></div></div></body></html>`,
  },
  {
    id: 5, cat: 'Wellness', catColor: '#22c55e', catBg: 'rgba(34,197,94,0.1)',
    title: 'Yoga Studio', desc: 'Calm wellness site with schedule & memberships',
    tags: ['Schedule', 'Classes', 'Book'],
    prompt: 'Yoga and wellness studio website with class schedule, instructor profiles, membership plans, and online booking. Use calm green and beige tones.',
    preview: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;font-family:'Georgia',serif;}body{background:#f4f7f0;color:#2c3e2d;overflow:hidden;}nav{background:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e0ead8;}.logo{font-size:14px;letter-spacing:2px;color:#3a6b3c;}.nav-links{display:flex;gap:14px;}.nav-links a{font-size:10px;color:#6b8c6d;text-decoration:none;}.book-btn{background:#3a6b3c;color:#fff;padding:5px 14px;border:none;font-size:10px;border-radius:4px;cursor:pointer;}.hero{background:linear-gradient(135deg,#e8f0e0,#d4e8c8);padding:28px 20px;display:flex;align-items:center;gap:16px;}.hero-text h1{font-size:20px;color:#2c3e2d;line-height:1.3;margin-bottom:8px;}.hero-text p{font-size:10px;color:#5a7a5c;line-height:1.6;margin-bottom:12px;}.hero-icon{font-size:52px;opacity:0.8;}.classes{padding:14px 20px;}.classes-title{font-size:10px;letter-spacing:2px;color:#6b8c6d;text-transform:uppercase;margin-bottom:12px;}.class-list{display:flex;flex-direction:column;gap:7px;}.class-item{background:#fff;border:1px solid #e0ead8;border-radius:8px;padding:9px 12px;display:flex;justify-content:space-between;align-items:center;}.class-left{display:flex;align-items:center;gap:10px;}.class-emoji{font-size:16px;}.class-name{font-size:11px;color:#2c3e2d;font-weight:bold;}.class-time{font-size:9px;color:#6b8c6d;margin-top:2px;}.class-badge{background:#e8f0e0;color:#3a6b3c;font-size:9px;padding:3px 8px;border-radius:10px;font-weight:bold;}</style></head><body><nav><div class="logo">SERENITY</div><div class="nav-links"><a href="#">Classes</a><a href="#">Pricing</a><button class="book-btn">Book Class</button></div></nav><div class="hero"><div class="hero-text"><h1>Find Your<br/>Inner Peace</h1><p>Expert-led yoga classes for<br/>all levels. Join our community.</p><button class="book-btn">Start Today</button></div><div class="hero-icon">🧘</div></div><div class="classes"><div class="classes-title">Today's Schedule</div><div class="class-list"><div class="class-item"><div class="class-left"><div class="class-emoji">🌅</div><div><div class="class-name">Morning Flow</div><div class="class-time">7:00 AM · 60 min</div></div></div><div class="class-badge">4 spots</div></div><div class="class-item"><div class="class-left"><div class="class-emoji">🌿</div><div><div class="class-name">Yin Yoga</div><div class="class-time">12:00 PM · 75 min</div></div></div><div class="class-badge">Full</div></div><div class="class-item"><div class="class-left"><div class="class-emoji">🌙</div><div><div class="class-name">Evening Restore</div><div class="class-time">7:00 PM · 60 min</div></div></div><div class="class-badge">8 spots</div></div></div></div></body></html>`,
  },
  {
    id: 6, cat: 'Medical', catColor: '#0ea5e9', catBg: 'rgba(14,165,233,0.1)',
    title: 'Clinic & Doctor', desc: 'Professional medical practice with appointments',
    tags: ['Appointments', 'Services', 'Team'],
    prompt: 'Professional medical clinic website with doctor profiles, services list, appointment booking form, and patient testimonials. Use clean blue and white tones.',
    preview: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;font-family:'Inter',system-ui,sans-serif;}body{background:#f0f7ff;color:#1e3a5f;overflow:hidden;}nav{background:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dbeafe;box-shadow:0 1px 4px rgba(0,0,0,0.05);}.logo{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:700;color:#1e40af;}.logo-icon{background:#1e40af;color:#fff;width:22px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:12px;}.nav-links{display:flex;gap:14px;align-items:center;}.nav-links a{font-size:10px;color:#64748b;text-decoration:none;}.appt-btn{background:#1e40af;color:#fff;padding:5px 14px;border:none;font-size:10px;border-radius:5px;cursor:pointer;}.hero{background:linear-gradient(135deg,#1e40af,#0ea5e9);padding:24px 20px;color:#fff;}.hero h1{font-size:18px;font-weight:700;margin-bottom:6px;line-height:1.3;}.hero p{font-size:10px;opacity:0.9;line-height:1.6;margin-bottom:14px;}.stats{display:flex;gap:14px;}.stat{text-align:center;}.stat-num{font-size:16px;font-weight:800;}.stat-label{font-size:8px;opacity:0.8;letter-spacing:1px;}.services{padding:14px 20px;}.serv-title{font-size:10px;letter-spacing:2px;color:#64748b;text-transform:uppercase;margin-bottom:10px;}.serv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}.serv-card{background:#fff;border:1px solid #dbeafe;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px;}.serv-icon{font-size:18px;}.serv-name{font-size:11px;color:#1e3a5f;font-weight:600;}.serv-desc{font-size:9px;color:#64748b;margin-top:2px;}</style></head><body><nav><div class="logo"><div class="logo-icon">+</div>MediCare Clinic</div><div class="nav-links"><a href="#">Services</a><a href="#">Doctors</a><button class="appt-btn">Book Appointment</button></div></nav><div class="hero"><h1>Your Health,<br/>Our Priority</h1><p>Expert care with compassion.<br/>Same-day appointments available.</p><div class="stats"><div class="stat"><div class="stat-num">15+</div><div class="stat-label">Doctors</div></div><div class="stat"><div class="stat-num">50K+</div><div class="stat-label">Patients</div></div><div class="stat"><div class="stat-num">4.9★</div><div class="stat-label">Rating</div></div></div></div><div class="services"><div class="serv-title">Our Services</div><div class="serv-grid"><div class="serv-card"><div class="serv-icon">🫀</div><div><div class="serv-name">Cardiology</div><div class="serv-desc">Heart specialists</div></div></div><div class="serv-card"><div class="serv-icon">🧠</div><div><div class="serv-name">Neurology</div><div class="serv-desc">Brain & nerves</div></div></div><div class="serv-card"><div class="serv-icon">🦷</div><div><div class="serv-name">Dental</div><div class="serv-desc">Complete dental care</div></div></div><div class="serv-card"><div class="serv-icon">👁️</div><div><div class="serv-name">Eye Care</div><div class="serv-desc">Vision specialists</div></div></div></div></div></body></html>`,
  },
]

// ─── AI Customization Modal ────────────────────────────────────────────────────
function CustomizeModal({ template, templateType, onClose }) {
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(false)
  const [customizedHtml, setCustomizedHtml] = useState(null)
  const [error, setError] = useState('')
  const [hosted, setHosted] = useState(null)
  const [hosting, setHosting] = useState(false)
  const navigate = useNavigate()

  const sourceHtml = templateType === 'app'
    ? (window.ZATER_APP_HTML?.[template.id] || '')
    : (template.preview || '')


// Replace handleCustomize with this:
const handleCustomize = async () => {
  if (!request.trim()) return
  setLoading(true); setError(''); setCustomizedHtml(null); setHosted(null)
  try {
    let html = ''
    if (aiModel === 'gemini') {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert web developer. Here is my current template HTML:\n\n${sourceHtml}\n\nPlease make these changes:\n${request}\n\nReturn ONLY the complete updated HTML starting with <!DOCTYPE html>. No explanation, no markdown fences.`
              }]
            }]
          })
        }
      )
      const data = await response.json()
      html = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    } 
    // strip possible markdown fences from Gemini
    html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim()
    if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
      throw new Error('AI returned unexpected output. Please try again.')
    }
    setCustomizedHtml(html)
  } catch (e) {
    setError(e.message || 'Something went wrong. Please try again.')
  } finally {
    setLoading(false)
  }
}

  const handleDownload = () => {
    if (!customizedHtml) return
    const blob = new Blob([customizedHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(template.title || template.name || 'template').replace(/[^a-z0-9]/gi, '_').toLowerCase()}-custom.html`
    a.click(); URL.revokeObjectURL(url)
  }

  const handleHost = async () => {
    const htmlToHost = customizedHtml || sourceHtml
    if (!htmlToHost) return
    const token = localStorage.getItem('zater_token')
    if (!token) { alert('Please log in first'); return }
    setHosting(true); setHosted(null)
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const saveRes = await fetch(`${base}/projects/template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: template.title || template.name, html: htmlToHost, templateId: String(template.id) }),
      })
      const saveData = await saveRes.json()
      if (!saveRes.ok) throw new Error(saveData.error || 'Save failed')
      const depRes = await fetch(`${base}/hosting/github-pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ projectId: saveData.projectId }),
      })
      const depData = await depRes.json()
      if (!depRes.ok) throw new Error(depData.error || 'Deploy failed')
      setHosted(depData.url)
    } catch (err) {
      if (err.message.includes('NO_GITHUB_TOKEN') || err.message.includes('token')) {
        if (confirm('No GitHub token connected. Go to Settings to add it?')) navigate('/settings')
      } else { setError('Host error: ' + err.message) }
    } finally { setHosting(false) }
  }

  return (
    <div className="cust-backdrop" onClick={onClose}>
      <div className="cust-modal" onClick={e => e.stopPropagation()}>
        <button className="cust-close" onClick={onClose}>✕</button>
        <div className="cust-head">
          <div className="cust-head-icon">{template.icon || '🎨'}</div>
          <div>
            <div className="cust-head-title">Customize — {template.title || template.name}</div>
            <div className="cust-head-sub">AI applies your changes instantly — completely free ✨</div>
          </div>
        </div>
        <div className="cust-body">
          <div className="cust-left">
            <div className="cust-field-label">What changes do you want?</div>
            <textarea
              className="cust-textarea"
              placeholder={`Examples:\n• Change brand name to "My Cafe"\n• Add a Google Login button\n• Change color theme to blue\n• Update phone to +91 99999 00000\n• Add Instagram link in footer\n• Change ₹ to $`}
              value={request}
              onChange={e => setRequest(e.target.value)}
              rows={7}
            />
            <div className="cust-chips">
              {['Change brand name', 'Add Google Login', 'Change color theme', 'Update contact info', 'Add WhatsApp button', 'Change currency to $'].map((chip, i) => (
                <button key={i} className="cust-chip"
                  onClick={() => setRequest(r => r ? r + '\n• ' + chip : '• ' + chip)}>
                  + {chip}
                </button>
              ))}
            </div>
            {error && <div className="cust-error">⚠️ {error}</div>}
            <button className="cust-apply-btn" onClick={handleCustomize} disabled={loading || !request.trim()}>
              {loading ? <><Spin /> Applying changes...</> : '✨ Apply Changes — Free'}
            </button>
            {(customizedHtml || sourceHtml) && (
              <div className="cust-actions">
                <button className="cust-dl-btn" onClick={handleDownload} disabled={!customizedHtml}>
                  ⬇️ Download {customizedHtml ? 'Customized' : ''} HTML
                </button>
                <button className="cust-host-btn" onClick={handleHost} disabled={hosting}>
                  {hosting ? <><Spin /> Hosting...</> : '🐙 Host on GitHub Pages'}
                </button>
              </div>
            )}
            {/* Inline hosted URL — no alert */}
            {hosted && (
              <div className="cust-hosted-box">
                <div className="cust-hosted-label">🎉 Your site is live at:</div>
                <a href={hosted} target="_blank" rel="noopener noreferrer" className="cust-hosted-url">{hosted}</a>
                <button className="cust-hosted-copy" onClick={() => navigator.clipboard.writeText(hosted)}>Copy URL</button>
              </div>
            )}
          </div>
          <div className="cust-right">
            <div className="cust-preview-label">
              {customizedHtml ? '✅ Customized Preview' : '👁️ Original Preview'}
            </div>
            <div className="cust-preview-wrap">
              {loading ? (
                <div className="cust-preview-loading">
                  <div className="cust-preview-spinner" />
                  <div>Applying your changes...</div>
                </div>
              ) : (
                <iframe
                  srcDoc={customizedHtml || sourceHtml || ''}
                  title="preview"
                  className="cust-iframe"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [prompt,   setPrompt]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [aiProvider, setAiProvider] = useState('claude')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode,     setMode]     = useState('website')
  const [appTplModal,   setAppTplModal]   = useState(null)
  const [customizeModal, setCustomizeModal] = useState(null) // { template, templateType }

  // Inline hosted URLs keyed by card key — replaces alert()
  const [hostedUrls, setHostedUrls] = useState({})
  const [hostingId,  setHostingId]  = useState(null)

  const [adPopup,    setAdPopup]    = useState(null)
  const [activeAd,   setActiveAd]   = useState(null)
  const [adVisible,  setAdVisible]  = useState(false)
  const [adDismissed,setAdDismissed]= useState(false)

  const [recentProjects, setRecentProjects] = useState([])
  const [recentApps,     setRecentApps]     = useState([])
  const [recentLoading,  setRecentLoading]  = useState(true)

  const textareaRef = useRef(null)
  const heroRef     = useRef(null)
  const { user, logout } = useAuth()
  const navigate         = useNavigate()

const [attachedLogo, setAttachedLogo] = useState(null) 
const logoInputRef = useRef(null)
const [clarifyQuestions, setClarifyQuestions] = useState(null) // null = not asked yet
const [clarifyAnswers, setClarifyAnswers] = useState({})
const [checkingClarity, setCheckingClarity] = useState(false)

useEffect(() => {
  const canvas = document.getElementById('zws-bg-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let animId
  let cW, cH

  const resize = () => {
    cW = canvas.width = window.innerWidth
    cH = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const PARTICLE_COUNT = 55
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.5 + 0.2,
    color: Math.random() > 0.5 ? [192,57,43] : [91,79,255],
  }))

  const orbs = [
    { baseX: 0.15, baseY: 0.2,  r: 220, cr: [192,57,43,0.07],  phase: 0   },
    { baseX: 0.8,  baseY: 0.5,  r: 280, cr: [91,79,255,0.055], phase: 2.1 },
    { baseX: 0.5,  baseY: 0.85, r: 200, cr: [192,57,43,0.05],  phase: 4.2 },
  ]

  let t = 0
  const draw = () => {
    ctx.clearRect(0, 0, cW, cH)
    t += 0.008

    ctx.fillStyle = 'rgba(180,180,210,0.35)'
    const GRID = 28
    for (let gx = 0; gx < cW; gx += GRID)
      for (let gy = 0; gy < cH; gy += GRID) {
        ctx.beginPath(); ctx.arc(gx, gy, 0.9, 0, Math.PI * 2); ctx.fill()
      }

    orbs.forEach((o) => {
      const ox = o.baseX * cW + Math.sin(t * 0.7 + o.phase) * 30
      const oy = o.baseY * cH + Math.cos(t * 0.5 + o.phase) * 20
      const [r,g,b,a] = o.cr
      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r)
      grad.addColorStop(0, `rgba(${r},${g},${b},${a})`)
      grad.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2)
      ctx.fillStyle = grad; ctx.fill()
    })

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = cW; if (p.x > cW) p.x = 0
      if (p.y < 0) p.y = cH; if (p.y > cH) p.y = 0
      const [r,g,b] = p.color
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`; ctx.fill()
    })

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 110) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(150,140,220,${(1 - dist/110) * 0.12})`
          ctx.lineWidth = 0.6; ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(draw)
  }

  draw()
  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  }
}, [])
  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/ads/active')
      .then(r => r.json())
      .then(d => {
        if (d.ad) { setAdPopup(d.ad); setActiveAd(d.ad); setTimeout(() => setAdVisible(true), 1500) }
      }).catch(() => {})
  }, [])

  const handleAdClick = async (ad) => {
    if (!ad?.link_url) return
    try { await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ads/click/${ad.id}`, { method:'POST' }) } catch {}
    window.open(ad.link_url, '_blank', 'noopener noreferrer')
  }

  const dismissAd = () => { setAdVisible(false); setAdDismissed(true) }

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const [pd, ad] = await Promise.all([
          api.get('/projects').catch(() => ({ projects: [] })),
          api.get('/apps').catch(() => ({ apps: [] })),
        ])
        const websitesOnly = (pd.projects || []).filter(p => p.type !== 'app')
setRecentProjects(websitesOnly.slice(0, 4))
setRecentApps((ad.apps || []).slice(0, 4))
      } catch {} finally { setRecentLoading(false) }
    }
    fetchRecent()
  }, [])

  const handleInput = e => {
    setPrompt(e.target.value)
    const ta = textareaRef.current
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }
const menuRef = useRef(null)   // add this near your other refs

useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])
const handleGenerate = async (customPrompt) => {
  const p = (customPrompt || prompt).trim()
  if (!p) return
  if ((user?.credits ?? 0) < 100) {
    setError('Insufficient credits. You need 100 credits to generate. Please purchase more credits.')
    return
  }

  // Only the app-generation flow gets the clarify step
  if (mode === 'app' && !clarifyQuestions) {
    setCheckingClarity(true); setError('')
    try {
      const clarify = await api.post('/apps/clarify', { prompt: p })
      if (clarify.needs_clarification && clarify.questions?.length > 0) {
        setClarifyQuestions(clarify.questions)
        setCheckingClarity(false)
        return // wait for user to answer before generating
      }
    } catch (e) {
      // fail open — proceed to generation if clarify check itself fails
    }
    setCheckingClarity(false)
  }

  setLoading(true); setError('')
  try {
    const payload = {
      prompt: p,
      ...(mode === 'app' && Object.keys(clarifyAnswers).length > 0 ? { clarificationAnswers: clarifyAnswers } : {}),
      ...(attachedLogo ? { logoBase64: attachedLogo.base64, logoMediaType: attachedLogo.mediaType } : {}),
    }
    if (mode === 'app') {
      const data = await api.post('/apps', payload)
      setClarifyQuestions(null); setClarifyAnswers({})
      removeLogo()
      navigate(`/app/${data.appId}`)
    } else {
      const data = await api.post('/projects', payload)
      removeLogo()
      navigate(`/project/${data.projectId}`)
    }
  }  catch (err) {
    if (err.message === 'MODE_MISMATCH' || err.data?.error === 'MODE_MISMATCH') {
      const suggested = err.data?.suggestedMode
      setError(err.data?.message || 'This looks like the wrong section for this prompt.')
      if (suggested) {
        setTimeout(() => {
          if (confirm(`Switch to ${suggested === 'app' ? 'Full-Stack App' : 'Website'} mode?`)) {
            setMode(suggested)
          }
        }, 200)
      }
    } else {
      setError(err.message)
    }
  }
  finally { setLoading(false) }
}

  const handleLogoSelect = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const allowed = ['image/png', 'image/jpeg', 'image/webp']
  if (!allowed.includes(file.type)) {
    setError('Only PNG, JPG, or WEBP logos are supported.')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    setError('Logo must be under 5MB.')
    return
  }
  setError('')
  const reader = new FileReader()
  reader.onload = () => {
    const base64 = reader.result.split(',')[1]
    setAttachedLogo({ file, previewUrl: URL.createObjectURL(file), base64, mediaType: file.type })
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

const removeLogo = () => {
  if (attachedLogo?.previewUrl) URL.revokeObjectURL(attachedLogo.previewUrl)
  setAttachedLogo(null)
}

  const handleKey = e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleGenerate() }

  const useTemplate = (tpl) => {
    setPrompt(tpl.prompt)
    heroRef.current?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => textareaRef.current?.focus(), 600)
  }

  // ── Shared host fn — stores URL in state, shows inline ──
  const handleHostTemplate = async ({ html, title, templateId, cardKey }) => {
    const token = localStorage.getItem('zater_token')
    if (!token) { alert('Please log in first'); return }
    setHostingId(cardKey)
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const saveRes = await fetch(`${base}/projects/template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, html, templateId: String(templateId) }),
      })
      const saveData = await saveRes.json()
      if (!saveRes.ok) throw new Error(saveData.error || 'Save failed')
      const depRes = await fetch(`${base}/hosting/github-pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ projectId: saveData.projectId }),
      })
      const depData = await depRes.json()
      if (!depRes.ok) throw new Error(depData.error || 'Deploy failed')
      setHostedUrls(prev => ({ ...prev, [cardKey]: depData.url }))
    } catch (err) {
      if (err.message.includes('NO_GITHUB_TOKEN') || err.message.includes('token')) {
        if (confirm('No GitHub token connected. Go to Settings to add it?')) navigate('/settings')
      } else { alert('Error: ' + err.message) }
    } finally { setHostingId(null) }
  }

  const hasRecent = recentProjects.length > 0 || recentApps.length > 0

  return (
    <>
      <style>{CSS}</style>
      <div className="h-root">
        <div className="h-dotgrid" />
<canvas id="zws-bg-canvas" />

        {/* ══ NAVBAR ══ */}
        <nav className="h-nav">
          <div className="h-nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={zaterLogo} alt="Zater Logo" className="h-logo-img" />
           <span className="h-logo-text">ZATER WEB STUDIO</span>
          </div>
          <div className="h-nav-right">
            <button className="h-nav-link" onClick={() => navigate('/projects')}>My Projects</button>
            <button className="h-nav-link" onClick={() => navigate('/apps')}>My Apps</button>
            <button className="h-nav-link" onClick={() => navigate('/payments')}>Payments</button>
            <button className="h-nav-link h-nav-deploy" onClick={() => navigate('/deployments')}>🚀 Deployments</button>
            <button className="h-nav-link h-nav-free" onClick={() => document.getElementById('tpl-gallery').scrollIntoView({ behavior: 'smooth' })}>🎨 Free Templates</button>
            <button className="h-nav-credits" onClick={() => navigate('/credits')}>
              <NavCreditsBadge
  credits={user?.credits ?? 0}
  onClick={() => navigate('/credits')}
/>
            </button>
            <div className="h-avatar-wrap" ref={menuRef}>
              <button className="h-avatar" onClick={() => setMenuOpen(o => !o)}>
                {user?.avatar?.startsWith('http')
                  ? <img src={user.avatar} alt="" style={{width:36,height:36,borderRadius:'50%',objectFit:'cover'}}/>
                  : <span style={{fontSize:15,fontWeight:700}}>{user?.name?.[0]?.toUpperCase() || '👤'}</span>}
              </button>
              {menuOpen && (
                <div className="h-menu">
                  <div className="h-menu-user">
                    <div className="h-menu-name">{user?.name}</div>
                    <div className="h-menu-email">{user?.email}</div>
                  </div>
                  <div className="h-menu-sep" />
                  <button className="h-menu-item" onClick={() => { navigate('/projects'); setMenuOpen(false) }}>📁 My Projects</button>
                  <button className="h-menu-item" onClick={() => { navigate('/apps'); setMenuOpen(false) }}>⚛️ My Apps</button>
                  <button className="h-menu-item" onClick={() => { navigate('/payments'); setMenuOpen(false) }}>💳 Payment History</button>
                  <button className="h-menu-item" onClick={() => { navigate('/deployments'); setMenuOpen(false) }}>🚀 My Deployments</button>
                  <button className="h-menu-item" onClick={() => { navigate('/settings'); setMenuOpen(false) }}>⚙️ Settings</button>
                  {user?.role === 'admin' && (
                    <button className="h-menu-item" onClick={() => { navigate('/admin-login'); setMenuOpen(false) }}>🔐 Admin Panel</button>
                  )}
                  <div className="h-menu-sep" />
                  <button className="h-menu-item h-menu-logout" onClick={() => { logout(); setMenuOpen(false) }}>🚪 Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section className="h-hero" ref={heroRef}>
          <div className="h-pill">
            <span className="h-pill-dot" />
            Hey{' '}
            {user?.avatar?.startsWith('http')
              ? <img src={user.avatar} alt="" style={{width:20,height:20,borderRadius:'50%',objectFit:'cover',verticalAlign:'middle',margin:'0 3px'}}/>
              : null}
            {' '}{user?.name?.split(' ')[0]}! Ready to build?
          </div>

          <h1 className="h-title">
            {mode === 'website'
              ? <>Where ideas become<br /><span className="h-title-accent">real websites</span></>
              : <>Describe it once,<br /><span className="h-title-accent">get a full app</span></>}
          </h1>
          <p className="h-subtitle">
            {mode === 'website'
              ? 'Describe your website and Zater AI will generate it in under 30 seconds.'
              : 'Zater AI generates React frontend + Node.js backend + database schema in one shot.'}
          </p>

          <div className="h-mode-toggle">
            <button className={`h-mode-btn ${mode === 'website' ? 'h-mode-active' : ''}`}
              onClick={() => { setMode('website'); setPrompt(''); setError('') }}>
              🌐 Website
            </button>
            <button className={`h-mode-btn ${mode === 'app' ? 'h-mode-active h-mode-active-purple' : ''}`}
              onClick={() => { setMode('app'); setPrompt(''); setError('') }}>
              ⚛️ Full-Stack App<span className="h-mode-new">NEW</span>
            </button>
          </div>

          {mode === 'app' && (
            <div className="h-app-banner">
              <div className="h-app-banner-items">
                <span>⚛️ React Frontend</span><span className="h-app-banner-dot">·</span>
                <span>🖥️ Node.js Backend</span><span className="h-app-banner-dot">·</span>
                <span>🗄️ MySQL Schema</span><span className="h-app-banner-dot">·</span>
                <span>📄 Setup Guide</span>
              </div>
            </div>
          )}

         

          {/* ══ PROMPT BOX ══ */}
         {mode === 'app' ? (
  <div className="h-box h-box-app h-box-coming-soon">
    <div className="h-coming-soon-inner">
      <div style={{fontSize:44}}>🚧</div>
      <h3 className="h-coming-soon-title">App Generation — Coming Soon</h3>
      <p className="h-coming-soon-sub">
        Full-stack app generation is still in development. You'll be able to build, preview, download, and host apps here soon.
      </p>
      <button className="h-mode-btn" style={{background:'#fff',border:'1.5px solid #e2e2ea',color:'#0a0a12'}}
        onClick={() => setMode('website')}>
        ← Try Website Generation Instead
      </button>
    </div>
  </div>
) : (
  <div className="h-box">
    <div className="h-box-inner">
      <textarea ref={textareaRef} className="h-textarea"
        placeholder="e.g. A modern landing page for a yoga studio with class schedule, instructor bios, and online booking..."
        value={prompt} onChange={handleInput} onKeyDown={handleKey} rows={4}/>
    </div>
    {error && (
      <div className="h-box-error">
        ⚠️ {error}
        {error.includes('Insufficient credits') && (
          <button className="h-buy-credits-link" onClick={() => navigate('/credits')}>Buy Credits →</button>
        )}
      </div>
    )}
    <div className="h-box-divider" />
    <div className="h-toolbar">
      <div className="h-toolbar-left">
        <button type="button" className="h-attach-btn" onClick={() => logoInputRef.current?.click()} title="Attach a logo to use in your site">
          📎 {attachedLogo ? 'Logo attached' : 'Attach logo'}
        </button>
        <span className="h-model-tag">🤖 Claude Opus 4.8</span>
        <input ref={logoInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogoSelect} className="h-hidden-input" />
        {attachedLogo && (
          <div className="h-logo-chip">
            <img src={attachedLogo.previewUrl} alt="logo preview" className="h-logo-chip-img" />
            <span className="h-logo-chip-name">{attachedLogo.file.name}</span>
            <button type="button" className="h-logo-chip-remove" onClick={removeLogo}>✕</button>
          </div>
        )}
      </div>
      <div className="h-toolbar-right">
        <span className="h-hint">Ctrl+Enter</span>
        <button className="h-generate-btn" onClick={() => handleGenerate()} disabled={loading || checkingClarity || !prompt.trim()}>
          {loading ? <><Spin /> Generating...</> : checkingClarity ? <><Spin /> Checking your prompt...</> : <>Generate ⚡</>}
        </button>
      </div>
    </div>
  </div>
)}

          {(user?.credits ?? 0) < 100 && (
            <div className="h-low-credits-banner">
              <span>⚠️ You have <strong>{user?.credits ?? 0} credits</strong> — need 100 to generate.</span>
              <button className="h-low-credits-btn" onClick={() => navigate('/credits')}>⚡ Buy 100 Credits — ₹99</button>
            </div>
          )}

          <div className="h-examples">
            <span className="h-examples-label">Try:</span>
            {(mode === 'website' ? EXAMPLES : APP_EXAMPLES).map((ex, i) => (
              <button key={i} className="h-chip-ex" onClick={() => { setPrompt(ex); textareaRef.current.focus() }}>{ex}</button>
            ))}
          </div>
 {/* ══ APP TEMPLATES ══ */}
          {mode === 'app' && (
            <div className="apt-wrap">
              <div className="apt-label">🆓 Pre-built Full-Stack Templates — Download, Customize & Host Free</div>
              <div className="apt-grid">
                {APP_TEMPLATES.map(tpl => {
                  const cardKey = `app-${tpl.id}`
                  const hostedUrl = hostedUrls[cardKey]
                  const isHosting = hostingId === cardKey
                  return (
                    <div key={tpl.id} className="apt-card" style={{'--aptc': tpl.color}}>
                      <div className="apt-preview-wrap">
                        <div className="apt-bar">
                          <div className="apt-dots">
                            <span style={{background:'#f87171'}}/><span style={{background:'#fbbf24'}}/><span style={{background:'#4ade80'}}/>
                          </div>
                          <div className="apt-url">app.zater.in</div>
                        </div>
                        <div className="apt-iframe-wrap">
                          {(() => {
                            const html = window.ZATER_APP_HTML?.[tpl.id]
                            return html
                              ? <iframe srcDoc={html} title={tpl.name} className="apt-iframe" sandbox="allow-scripts allow-same-origin" scrolling="no" />
                              : <div className="apt-no-preview"><div style={{fontSize:32,marginBottom:8}}>{tpl.icon}</div><div style={{fontSize:11,color:'#6060a0',fontWeight:600}}>Preview loads after import</div></div>
                          })()}
                        </div>
                        <div className="apt-overlay">
                          <button className="apt-overlay-btn" onClick={() => setAppTplModal(tpl)}>Preview ⚡</button>
                        </div>
                      </div>
                      <div className="apt-body">
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                          <span className="apt-cat-badge" style={{color: tpl.color, background: tpl.bg}}>{tpl.icon} {tpl.tags[0]}</span>
                          <span className="apt-free-badge">🆓 FREE</span>
                        </div>
                        <h3 className="apt-card-title">{tpl.name}</h3>
                        <p className="apt-card-desc">{tpl.desc}</p>
                        <div className="apt-tags-row">{tpl.tags.map((t,i) => <span key={i} className="apt-tag">{t}</span>)}</div>

                        {/* ── Customize button ── */}
                        {/* <button 
  className="apt-customize-btn"
  onClick={() => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeGOeGNuQljOlO-fJ0aQxX5RpDU1t8UMmvqlcwq1VAsVTu7ow/viewform?usp=publish-editor", 
      "_blank"
    )
  }}
>
  ✏️ Customize Free
</button> */}

                        <div className="apt-free-actions">
                          <button className="apt-free-dl-btn" onClick={() => {
                            const html = window.ZATER_APP_HTML?.[tpl.id]
                            if (!html) { alert('Template not loaded. Make sure loadAppTemplates.js is imported in main.jsx'); return }
                            const blob = new Blob([html], { type: 'text/html' })
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url; a.download = `zater-${tpl.id}-app.html`; a.click(); URL.revokeObjectURL(url)
                          }}>⬇️ Download Free</button>

                          <button className="apt-free-host-btn" disabled={isHosting}
                            onClick={() => {
                              const html = window.ZATER_APP_HTML?.[tpl.id]
                              if (!html) { alert('Template not loaded.'); return }
                              handleHostTemplate({ html, title: tpl.name, templateId: tpl.id, cardKey })
                            }}>
                            {isHosting ? <><Spin /> Hosting...</> : '🐙 Host Free'}
                          </button>
                        </div>

                        {/* ── Inline hosted URL — no alert ── */}
                        {hostedUrl && (
                          <div className="tpl-hosted-url-box">
                            <span className="tpl-hosted-label">🌐 Live:</span>
                            <a href={hostedUrl} target="_blank" rel="noopener noreferrer" className="tpl-hosted-link">{hostedUrl}</a>
                            <button className="tpl-hosted-copy" onClick={() => navigator.clipboard.writeText(hostedUrl)}>Copy</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {/* ══ RECENT PROJECTS ══ */}
          {!recentLoading && hasRecent && (
            <div className="rec-wrap">
              <div className="rec-header-row">
                <div className="rec-label"><span className="rec-label-dot"/>Your Recent Work</div>
                <div style={{display:'flex',gap:8}}>
                  {recentProjects.length > 0 && <button className="rec-view-all" onClick={() => navigate('/projects')}>All Websites →</button>}
                  {recentApps.length > 0 && <button className="rec-view-all" onClick={() => navigate('/apps')}>All Apps →</button>}
                </div>
              </div>
              <div className="rec-grid">
                {recentProjects.map(p => (
                  <div key={p.id} className="rec-card" onClick={() => navigate(`/project/${p.id}`)}>
                    {p.generated_html ? (
                      <div className="rec-preview">
                        <div className="rec-dots"><span/><span/><span/></div>
                        <div className="rec-iframe-clip">
                          <iframe srcDoc={p.generated_html} className="rec-iframe" sandbox="allow-scripts" scrolling="no" title={p.title}/>
                        </div>
                        <div className="rec-overlay"><span className="rec-open">Open →</span></div>
                      </div>
                    ) : (
                      <div className="rec-placeholder">
                        {p.status === 'generating' ? <div className="rec-spinner"/> : <span>{p.status === 'failed' ? '❌' : '🌐'}</span>}
                      </div>
                    )}
                    <div className="rec-info">
                      <div className="rec-name">{p.title}</div>
                      <div className="rec-meta">
                        <span className={`rec-status rec-status-${p.status}`}>{p.status}</span>
                        {p.github_url ? <span className="rec-paid">🌐 Hosted</span> : null}
                      </div>
                    </div>
                  </div>
                ))}
                {recentApps.map(a => (
                  <div key={a.id} className="rec-card" onClick={() => navigate(`/app/${a.id}`)}>
                    <div className="rec-app-preview">
                      <div className="rec-app-icon">⚛️</div>
                      <div className="rec-app-files">
                        {['App.jsx','server.js','schema.sql'].map(f => <div key={f} className="rec-app-file">{f}</div>)}
                      </div>
                      <div className="rec-overlay"><span className="rec-open">Open →</span></div>
                    </div>
                    <div className="rec-info">
                      <div className="rec-name">{a.title}</div>
                      <div className="rec-meta">
                        <span className="rec-type">⚛️ App</span>
                        <span className={`rec-status rec-status-${a.status}`}>{a.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ PRICING ══ */}
          <div className="h-pricing-wrap">
            <div className="h-pricing-title">
              {mode === 'website' ? '🆓 Everything is free — generate, download & host' : 'What gets generated'}
            </div>
            {mode === 'website' ? (
              <>
                <div className="h-pricing-row">
                  <div className="h-step-card">
                    <div className="h-step-num">1</div><div className="h-step-icon">⚡</div>
                    <div className="h-step-name">Generate</div>
                    <div className="h-step-price" style={{color:'#22c55e'}}>FREE</div>
                    <div className="h-step-desc">AI builds your full website. No payment needed to generate.</div>
                    <div className="h-step-perks">
                      <div className="h-step-perk">✅ Full AI generation</div>
                      <div className="h-step-perk">✅ No credit card</div>
                      <div className="h-step-perk">✅ Ready in 30 seconds</div>
                    </div>
                  </div>
                  <div className="h-step-arrow">→</div>
                  <div className="h-step-card">
                    <div className="h-step-num">2</div><div className="h-step-icon">👁️</div>
                    <div className="h-step-name">Preview</div>
                    <div className="h-step-price" style={{color:'#22c55e'}}>FREE</div>
                    <div className="h-step-desc">See your website live in browser. Preview is always free.</div>
                    <div className="h-step-perks">
                      <div className="h-step-perk">✅ Live preview</div>
                      <div className="h-step-perk">✅ Interactive preview</div>
                      <div className="h-step-perk">✅ No commitment</div>
                    </div>
                  </div>
                  <div className="h-step-arrow">→</div>
                  <div className="h-step-card h-step-featured" style={{borderColor:'#22c55e',boxShadow:'0 6px 24px rgba(34,197,94,0.15)'}}>
                    <div className="h-step-badge" style={{background:'#22c55e'}}>Always Free</div>
                    <div className="h-step-num" style={{background:'#22c55e',color:'#fff'}}>3</div>
                    <div className="h-step-icon">💾</div>
                    <div className="h-step-name">Download & Host</div>
                    <div className="h-step-price" style={{color:'#22c55e'}}>FREE</div>
                    <div className="h-step-desc">Download your website or host on GitHub Pages — completely free.</div>
                    <div className="h-step-perks">
                      <div className="h-step-perk">✅ Full HTML + CSS + JS</div>
                      <div className="h-step-perk">✅ Host on GitHub Pages free</div>
                      <div className="h-step-perk">✅ Edit freely</div>
                    </div>
                  </div>
                </div>
                <div className="h-what-box">
                  <div className="h-what-title">🎯 What you get — completely free</div>
                  <div className="h-what-grid">
                    <div className="h-what-item"><span>💻</span> Single HTML file</div>
                    <div className="h-what-item"><span>🎨</span> All CSS included</div>
                    <div className="h-what-item"><span>⚙️</span> All JavaScript included</div>
                    <div className="h-what-item"><span>📱</span> Mobile responsive</div>
                    <div className="h-what-item"><span>🌐</span> Host on Netlify / GitHub Pages</div>
                    <div className="h-what-item"><span>✏️</span> Edit in any code editor</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="h-pricing-row">
                  <div className="h-step-card">
                    <div className="h-step-num" style={{background:'#5b4fff',color:'#fff'}}>1</div>
                    <div className="h-step-icon">⚛️</div><div className="h-step-name">Frontend</div>
                    <div className="h-step-price" style={{color:'#5b4fff',fontSize:20,marginBottom:6}}>React App</div>
                    <div className="h-step-desc">Full React App.jsx with all components, pages, hooks and API calls.</div>
                    <div className="h-step-perks">
                      <div className="h-step-perk">✅ Login + Signup pages</div>
                      <div className="h-step-perk">✅ All CRUD screens</div>
                      <div className="h-step-perk">✅ Responsive UI</div>
                    </div>
                  </div>
                  <div className="h-step-arrow">+</div>
                  <div className="h-step-card">
                    <div className="h-step-num" style={{background:'#5b4fff',color:'#fff'}}>2</div>
                    <div className="h-step-icon">🖥️</div><div className="h-step-name">Backend</div>
                    <div className="h-step-price" style={{color:'#5b4fff',fontSize:20,marginBottom:6}}>Node.js API</div>
                    <div className="h-step-desc">Express server with JWT auth, all API routes, and database queries.</div>
                    <div className="h-step-perks">
                      <div className="h-step-perk">✅ JWT authentication</div>
                      <div className="h-step-perk">✅ REST API routes</div>
                      <div className="h-step-perk">✅ Error handling</div>
                    </div>
                  </div>
                  <div className="h-step-arrow">+</div>
                  <div className="h-step-card h-step-featured" style={{borderColor:'#5b4fff',boxShadow:'0 6px 24px rgba(91,79,255,0.15)'}}>
                    <div className="h-step-badge" style={{background:'#22c55e'}}>🆓 Free</div>
                    <div className="h-step-num" style={{background:'#5b4fff',color:'#fff'}}>3</div>
                    <div className="h-step-icon">🗄️</div><div className="h-step-name">DB + Guide</div>
                    <div className="h-step-price" style={{color:'#5b4fff',fontSize:20,marginBottom:6}}>MySQL + README</div>
                    <div className="h-step-desc">Complete database schema + step-by-step setup guide to run the app.</div>
                    <div className="h-step-perks">
                      <div className="h-step-perk">✅ CREATE TABLE SQL</div>
                      <div className="h-step-perk">✅ Setup instructions</div>
                      <div className="h-step-perk">✅ npm packages list</div>
                    </div>
                  </div>
                </div>
                <div className="h-what-box" style={{borderColor:'rgba(91,79,255,0.2)',background:'rgba(91,79,255,0.03)'}}>
                  <div className="h-what-title">🎯 What you get — completely free</div>
                  <div className="h-what-grid">
                    <div className="h-what-item"><span>⚛️</span> React App.jsx</div>
                    <div className="h-what-item"><span>🖥️</span> server.js (Node/Express)</div>
                    <div className="h-what-item"><span>🗄️</span> schema.sql (MySQL)</div>
                    <div className="h-what-item"><span>📄</span> README setup guide</div>
                    <div className="h-what-item"><span>🔐</span> JWT authentication</div>
                    <div className="h-what-item"><span>✏️</span> Edit in VS Code</div>
                  </div>
                </div>
              </>
            )}
            <p className="h-pricing-note">✅ Generate, preview, download & host — all completely free. Credits only required for generation.</p>
          </div>

          {/* ══ CUSTOM DEVELOPMENT OPTION ══ */}
<div className="h-manual-card">
  <div className="h-manual-left">
    <div className="h-manual-badge">🚀 Custom Development</div>

    <h3 className="h-manual-title">
      Need a Custom Website or Web Application?
    </h3>

    <p className="h-manual-desc">
      Our team designs and develops fully customized websites and web
      applications based on your business requirements. From food delivery
      platforms and e-commerce stores to booking systems, portfolios, and
      business dashboards, we build solutions tailored specifically for you.
    </p>

    <div className="h-manual-price">
      <span className="h-manual-price-num">Starting at ₹399</span>
      
    </div>

    <div className="h-manual-perks">
      <span>✅ Fully Customized</span>
      <span>✅ Responsive Design</span>
      <span>✅ Custom Domain</span>
      <span>✅ SSL Included</span>
      <span>✅ Hosting Support</span>
      <span>✅ Business Ready</span>
    </div>
     <div className="h-manual-right">
    

    <a
      href="https://zaterbusiness.github.io/zater/"
      target="_blank"
      rel="noopener noreferrer"
      className="h-manual-url-btn"
    >
      🚀 Register ↗
    </a>

    <p className="h-manual-url-note">
      Explore a sample website developed by our team
    </p>
  </div>
  </div>

 
</div>

          <button className="h-scroll-hint" onClick={() => document.getElementById('tpl-gallery').scrollIntoView({ behavior: 'smooth' })}>
            <span>Browse Free Templates Below</span>
            <span className="h-bounce">↓</span>
          </button>
        </section>

        {/* ══ LUXURY TEMPLATES ══ */}
        <TemplateGallery />

        {/* ══ AI PROMPT TEMPLATES ══ */}
        <section className="tpl-section" id="tpl-section">
          <div className="tpl-inner">
            <div className="tpl-header">
              <div className="tpl-label-pill">⚡ AI Generation Starters</div>
              <h2 className="tpl-title">Generate with AI</h2>
              <p className="tpl-sub">Pick a style → prompt auto-fills → hit Generate. AI builds it in 30 seconds.</p>
            </div>
            <div className="tpl-grid">
              {TEMPLATES.map(tpl => {
                const cardKey = `web-${tpl.id}`
                const hostedUrl = hostedUrls[cardKey]
                const isHosting = hostingId === cardKey
                return (
                  <div key={tpl.id} className="tpl-card" style={{ '--c': tpl.catColor }}>
                    <div className="tpl-preview-wrap">
                      <div className="tpl-bar">
                        <div className="tpl-dots">
                          <span style={{background:'#f87171'}}/><span style={{background:'#fbbf24'}}/><span style={{background:'#4ade80'}}/>
                        </div>
                        <div className="tpl-url">{tpl.cat.toLowerCase()}.zater.in</div>
                      </div>
                      <div className="tpl-iframe-wrap">
                        <iframe srcDoc={tpl.preview} title={tpl.title} className="tpl-iframe" sandbox="allow-scripts" scrolling="no"/>
                      </div>
                      <div className="tpl-overlay">
                        <button className="tpl-overlay-btn" onClick={() => useTemplate(tpl)}>Use This Prompt ⚡</button>
                      </div>
                    </div>
                    <div className="tpl-body">
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                        <span className="tpl-cat" style={{ color: tpl.catColor, background: tpl.catBg }}>{tpl.cat}</span>
                        <span className="tpl-free-badge">🆓 FREE</span>
                      </div>
                      <h3 className="tpl-card-title">{tpl.title}</h3>
                      <p className="tpl-card-desc">{tpl.desc}</p>
                      <div className="tpl-tags">{tpl.tags.map((t, i) => <span key={i} className="tpl-tag">{t}</span>)}</div>
                      <button className="tpl-btn" onClick={() => useTemplate(tpl)}>Use This Prompt ⚡</button>

                     

                     

                      {/* ── Inline hosted URL — no alert ── */}
                      {hostedUrl && (
                        <div className="tpl-hosted-url-box">
                          <span className="tpl-hosted-label">🌐 Live:</span>
                          <a href={hostedUrl} target="_blank" rel="noopener noreferrer" className="tpl-hosted-link">{hostedUrl}</a>
                          <button className="tpl-hosted-copy" onClick={() => navigator.clipboard.writeText(hostedUrl)}>Copy</button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="tpl-bottom-note">💡 AI generates a unique site from your prompt — or start from a pre-built template above</div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="how-section">
          <div className="how-inner">
            <div className="tpl-label-pill" style={{ marginBottom: 16 }}>⚡ Simple 3-Step Process</div>
            <h2 className="tpl-title">How Zater Works</h2>
            <p className="tpl-sub" style={{ marginBottom: 48 }}>From idea to website in under 1 minute</p>
            <div className="how-grid">
              {HOW_STEPS.map((s, i) => (
                <div key={i} className="how-card">
                  <div className="how-num">{i + 1}</div>
                  <div className="how-icon">{s.icon}</div>
                  <h3 className="how-title">{s.title}</h3>
                  <p className="how-desc">{s.desc}</p>
                  {i < HOW_STEPS.length - 1 && <div className="how-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <ZWSBot />

      {/* ══ APP TEMPLATE MODAL ══ */}
      {appTplModal && (
        <div className="apt-modal-backdrop" onClick={() => setAppTplModal(null)}>
          <div className="apt-modal" onClick={e => e.stopPropagation()}>
            <button className="apt-modal-x" onClick={() => setAppTplModal(null)}>✕</button>
            <div className="apt-modal-head">
              <div className="apt-modal-icon" style={{background: appTplModal.bg}}>{appTplModal.icon}</div>
              <div>
                <div className="apt-modal-title">{appTplModal.name}</div>
                <div className="apt-modal-sub">{appTplModal.desc}</div>
              </div>
            </div>
            <div className="apt-modal-preview">
              {(() => {
                const html = window.ZATER_APP_HTML?.[appTplModal.id]
                if (!html) return (
                  <div className="apt-preview-missing">
                    <div style={{fontSize:40,marginBottom:12}}>📦</div>
                    <div style={{fontWeight:700,marginBottom:6}}>Template Not Loaded</div>
                    <div style={{fontSize:12,color:'#888',maxWidth:280}}>Make sure <code>loadAppTemplates.js</code> is imported in your <code>main.jsx</code></div>
                  </div>
                )
                return <iframe srcDoc={html} title={appTplModal.name} className="apt-preview-iframe" sandbox="allow-scripts allow-same-origin" />
              })()}
            </div>
            <div className="apt-modal-actions">
              <button className="apt-dl-btn" onClick={() => {
                const html = window.ZATER_APP_HTML?.[appTplModal.id]
                if (!html) { alert('Template HTML not found.'); return }
                const blob = new Blob([html], { type: 'text/html' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url; a.download = `zater-${appTplModal.id}-app.html`; a.click(); URL.revokeObjectURL(url)
              }}>⬇️ Download HTML</button>
              {/* <button className="apt-customize-modal-btn"
                onClick={() => { setAppTplModal(null); setCustomizeModal({ template: appTplModal, templateType: 'app' }) }}>
                ✏️ Customize Free
              </button> */}
              <button className="apt-gh-btn"
                onClick={() => {
                  const html = window.ZATER_APP_HTML?.[appTplModal.id]
                  if (!html) { alert('Template HTML not found.'); return }
                  const cardKey = `app-modal-${appTplModal.id}`
                  handleHostTemplate({ html, title: appTplModal.name, templateId: appTplModal.id, cardKey })
                }}>
                {hostingId === `app-modal-${appTplModal.id}` ? <><Spin /> Hosting...</> : '🐙 Deploy Free'}
              </button>
            </div>

            {/* Inline hosted URL inside modal */}
            {hostedUrls[`app-modal-${appTplModal.id}`] && (
              <div className="apt-modal-hosted-box">
                <span>🎉 Live at:</span>
                <a href={hostedUrls[`app-modal-${appTplModal.id}`]} target="_blank" rel="noopener noreferrer">
                  {hostedUrls[`app-modal-${appTplModal.id}`]}
                </a>
                <button onClick={() => navigator.clipboard.writeText(hostedUrls[`app-modal-${appTplModal.id}`])}>Copy</button>
              </div>
            )}

            <div className="apt-modal-note">Requires GitHub PAT in Settings for deployment</div>
          </div>
        </div>
      )}

      {/* ══ CUSTOMIZE MODAL ══ */}
      {customizeModal && (
        <CustomizeModal
          template={customizeModal.template}
          templateType={customizeModal.templateType}
          onClose={() => setCustomizeModal(null)}
        />
      )}

      {/* ══ AD OVERLAY ══ */}
      {activeAd && adVisible && !adDismissed && (
        <div className="ad-overlay-backdrop" onClick={dismissAd}>
          <div className="ad-overlay-box" onClick={e => e.stopPropagation()}>
            <button className="ad-overlay-close" onClick={dismissAd}>✕</button>
            {activeAd.image_url ? (
              <img src={`${(import.meta.env.VITE_API_URL||'http://localhost:5000/api').replace('/api','')}${activeAd.image_url}`}
                alt="Ad" className="ad-overlay-img" onError={e => e.target.style.display='none'} />
            ) : (
              <div className="ad-overlay-no-img">📢</div>
            )}
            <div className="ad-overlay-content">
              <div className="ad-overlay-badge">Sponsored</div>
              <h3 className="ad-overlay-title">{activeAd.title}</h3>
              <p className="ad-overlay-sub">Limited time offer — don't miss out!</p>
              {activeAd.link_url && (
                <button className="ad-overlay-cta" onClick={() => handleAdClick(activeAd)}>
                  {activeAd.link_text || 'Get Started →'}
                </button>
              )}
              <p className="ad-overlay-note" onClick={dismissAd}>No thanks, close this</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const HOW_STEPS = [
  { icon: '✍️', title: 'Describe Your Website', desc: 'Type what you want in plain English — or pick a template. Be as detailed or brief as you like.' },
  { icon: '⚡', title: 'AI Builds It Instantly', desc: 'Claude Opus 4.8 writes your full website — HTML, CSS, and JS — in under 30 seconds.' },
  { icon: '💾', title: 'Download & Host — Free', desc: 'Your website is ready! Download it or host on GitHub Pages — both are completely free, no payment needed.' },
]

const Spin = () => (
  <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
)


const CSS = `
.h-provider-toggle {
  display: flex;
  background: #f0f0f6;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}
.h-provider-btn {
  padding: 5px 12px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  color: #72727f;
  background: transparent;
  transition: all 0.18s;
}
.h-provider-active-claude {
  background: #fff;
  color: #c0392b;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.h-provider-active-groq {
  background: #fff;
  color: #f97316;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
/* ══ HOSTED URL BOX ══ */
.tpl-hosted-url-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding: 10px 12px;
  background: rgba(91, 79, 255, 0.06);
  border: 1.5px solid rgba(91, 79, 255, 0.2);
  border-radius: 10px;
  flex-wrap: wrap;
}
.tpl-hosted-label {
  font-size: 11px;
  font-weight: 800;
  color: #5b4fff;
  white-space: nowrap;
  flex-shrink: 0;
}
.tpl-hosted-link {
  font-size: 11px;
  font-weight: 600;
  color: #5b4fff;
  text-decoration: none;
  word-break: break-all;
  flex: 1;
  min-width: 0;
  opacity: 0.8;
}
.tpl-hosted-link:hover {
  opacity: 1;
  text-decoration: underline;
}
.tpl-hosted-copy {
  padding: 4px 12px;
  border-radius: 6px;
  background: #5b4fff;
  border: none;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.18s;
}
.tpl-hosted-copy:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}
.apt-customize-btn {
  width: 100%;
  margin-top: 30px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  position: relative;
  top: -10px; /* 🔥 moves button upward */
}

.apt-customize-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.5);
}

.apt-customize-btn:active {
  transform: scale(0.97);
}
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes dotPulse{0%,100%{box-shadow:0 0 0 2px rgba(34,197,94,0.2)}50%{box-shadow:0 0 0 6px rgba(34,197,94,0.06)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes recFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

.h-root{background:#fff;font-family:'Nunito',sans-serif;color:#0a0a12;overflow-x:hidden;}
.h-dotgrid{position:fixed;inset:0;pointer-events:none;z-index:0;}
#zws-bg-canvas{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;}

/* NAV */
.h-nav{position:fixed;top:0;left:0;right:0;z-index:200;height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;background:rgba(255,255,255,0.95);backdrop-filter:blur(16px);border-bottom:1px solid #e2e2ea;}
.h-nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer;}
.h-logo-img{width:32px;height:32px;border-radius:8px;object-fit:cover;border:1px solid #e8e8e8;}
.h-logo-text{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;letter-spacing:-0.2px;}
.h-nav-right{display:flex;align-items:center;gap:10px;}
.h-nav-link{padding:7px 14px;border-radius:8px;background:transparent;border:1.5px solid #e2e2ea;font-size:13px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all 0.18s;}
.h-nav-link:hover{border-color:#c0392b;color:#c0392b;}
.h-nav-deploy{background:linear-gradient(135deg,rgba(192,57,43,0.08),rgba(192,57,43,0.04));border-color:rgba(192,57,43,0.3);color:#c0392b;}
.h-nav-deploy:hover{border-color:#c0392b;color:#c0392b;background:rgba(192,57,43,0.14);}
.h-nav-free{background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(34,197,94,0.05));border-color:rgba(34,197,94,0.4);color:#15803d;}
.h-nav-free:hover{border-color:#22c55e;color:#15803d;background:rgba(34,197,94,0.15);}
.h-nav-credits{display:flex;align-items:center;gap:5px;padding:6px 13px;border-radius:100px;background:linear-gradient(135deg,rgba(192,57,43,0.1),rgba(192,57,43,0.06));border:1.5px solid rgba(192,57,43,0.3);cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.h-nav-credits:hover{border-color:#c0392b;background:rgba(192,57,43,0.15);}
.h-nav-credits-icon{font-size:13px;}
.h-nav-credits-val{font-size:13px;font-weight:800;color:#c0392b;}
.h-nav-credits-label{font-size:11px;font-weight:600;color:#c0392b;opacity:.7;}
.h-avatar-wrap{position:relative;}
.h-avatar{width:36px;height:36px;border-radius:50%;background:#0a0a12;border:none;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.h-menu{position:absolute;top:44px;right:0;background:#fff;border:1.5px solid #e2e2ea;border-radius:13px;padding:8px;min-width:190px;box-shadow:0 8px 32px rgba(0,0,0,0.12);animation:fadeIn 0.15s ease;z-index:300;}
.h-menu-user{padding:8px 12px;}
.h-menu-name{font-size:13px;font-weight:800;color:#0a0a12;}
.h-menu-email{font-size:11px;color:#a0a0b0;font-weight:500;margin-top:2px;}
.h-menu-sep{height:1px;background:#f0f0f6;margin:6px 0;}
.h-menu-item{width:100%;text-align:left;padding:8px 12px;border-radius:8px;background:transparent;border:none;font-size:13px;font-weight:600;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:background 0.15s;display:block;}
.h-menu-item:hover{background:#f5f5f7;}
.h-menu-logout{color:#ef4444;}
.h-menu-logout:hover{background:rgba(239,68,68,0.07);}

/* HERO */
.h-hero{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 24px 80px;text-align:center;}
.h-pill{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e2e2ea;border-radius:100px;padding:7px 18px;font-size:13px;font-weight:700;color:#0a0a12;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);animation:fadeUp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;}
.h-pill-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:dotPulse 2s ease-in-out infinite;display:inline-block;}
.h-title{font-family:'Playfair Display',serif;font-size:clamp(40px,7vw,74px);font-weight:900;line-height:1.06;letter-spacing:-2px;color:#0a0a12;margin-bottom:14px;animation:fadeUp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;}
.h-title-accent{color:#c0392b;}
.h-subtitle{font-size:16px;color:#72727f;font-weight:500;line-height:1.65;max-width:420px;margin-bottom:36px;animation:fadeUp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.3s both;}

/* PROMPT BOX */
.h-box{width:100%;max-width:740px;background:#fff;border:1.5px solid #e2e2ea;border-radius:18px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);animation:fadeUp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.4s both;transition:border-color 0.25s,box-shadow 0.25s;}
.h-box:focus-within{border-color:#c0392b;box-shadow:0 4px 24px rgba(192,57,43,0.1),0 12px 48px rgba(0,0,0,0.06);}
.h-box-inner{padding:20px 22px 0;}
.h-textarea{width:100%;background:transparent;border:none;outline:none;resize:none;font-size:15px;font-weight:500;font-family:'Nunito',sans-serif;color:#0a0a12;line-height:1.7;min-height:90px;max-height:200px;}
.h-textarea::placeholder{color:#b8b8c8;font-weight:400;}
.h-box-error{margin:8px 16px;padding:8px 12px;background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.2);border-radius:8px;font-size:13px;color:#ef4444;font-weight:600;}
/* ══ CLARIFY QUESTIONS ══ */
.h-clarify-box{
  margin:8px 16px 4px;
  padding:16px;
  background:rgba(91,79,255,0.05);
  border:1.5px solid rgba(91,79,255,0.2);
  border-radius:12px;
  animation:fadeUp 0.3s ease both;
}
.h-clarify-title{
  font-size:13px;
  font-weight:800;
  color:#5b4fff;
  margin-bottom:14px;
  line-height:1.5;
}
.h-clarify-q{
  margin-bottom:14px;
}
.h-clarify-q:last-of-type{
  margin-bottom:16px;
}
.h-clarify-q-text{
  font-size:13px;
  font-weight:700;
  color:#0a0a12;
  margin-bottom:9px;
  line-height:1.5;
}
.h-clarify-opts{
  display:flex;
  flex-direction:column;
  gap:7px;
}
.h-clarify-opt{
  text-align:left;
  padding:10px 14px;
  border-radius:9px;
  background:#fff;
  border:1.5px solid #e2e2ea;
  font-size:12.5px;
  font-weight:600;
  color:#3a3a4a;
  cursor:pointer;
  font-family:'Nunito',sans-serif;
  transition:all 0.18s;
  line-height:1.4;
}
.h-clarify-opt:hover{
  border-color:#5b4fff;
  background:rgba(91,79,255,0.04);
  color:#5b4fff;
}
.h-clarify-opt-selected{
  border-color:#5b4fff;
  background:rgba(91,79,255,0.1);
  color:#5b4fff;
  font-weight:800;
}
.h-clarify-opt-selected::before{
  content:"✓ ";
}
  .h-clarify-box .h-generate-btn{
  width:100%;
  justify-content:center;
  height:44px;
}

.h-box-divider{height:1px;background:#e2e2ea;margin:0 16px;}
.h-toolbar{display:flex;align-items:center;justify-content:space-between;padding:10px 16px 13px;}
.h-toolbar-left{display:flex;align-items:center;gap:8px;}
.h-model-tag{display:flex;align-items:center;gap:7px;padding:6px 12px;border-radius:8px;border:1.5px solid #e2e2ea;font-size:12px;font-weight:700;color:#0a0a12;}
.h-toolbar-right{display:flex;align-items:center;gap:8px;}
.h-hint{font-size:11px;color:#c0c0cc;font-weight:600;}
.h-generate-btn{height:38px;padding:0 22px;border-radius:10px;background:#c0392b;border:none;color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 2px 12px rgba(192,57,43,0.35);transition:all 0.18s;}
.h-generate-btn:hover:not(:disabled){opacity:0.87;transform:translateY(-1px);}
.h-generate-btn:disabled{background:#c0c0cc;cursor:not-allowed;box-shadow:none;transform:none;}

/* MODE TOGGLE */
.h-mode-toggle{display:inline-flex;background:#f0f0f6;border-radius:100px;padding:4px;gap:2px;margin-bottom:20px;animation:fadeUp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.25s both;}
.h-mode-btn{padding:9px 22px;border-radius:100px;border:none;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;color:#72727f;background:transparent;transition:all .18s;display:flex;align-items:center;gap:7px;}
.h-mode-active{background:#fff;color:#0a0a12;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
.h-mode-active-purple{color:#5b4fff !important;}
.h-mode-new{font-size:9px;font-weight:800;background:#5b4fff;color:#fff;padding:2px 6px;border-radius:100px;}
.h-app-banner{background:rgba(91,79,255,0.06);border:1.5px solid rgba(91,79,255,0.2);border-radius:12px;padding:10px 18px;margin-bottom:16px;animation:fadeUp 0.3s ease;max-width:740px;width:100%;}
.h-app-banner-items{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;font-size:12px;font-weight:700;color:#5b4fff;}
.h-app-banner-dot{color:#c0c0e0;font-weight:400;}
.h-box-app{border-color:rgba(91,79,255,0.3) !important;}
.h-box-app:focus-within{border-color:#5b4fff !important;box-shadow:0 4px 24px rgba(91,79,255,0.12),0 12px 48px rgba(0,0,0,0.06) !important;}
.h-model-tag-app{border-color:rgba(91,79,255,0.3) !important;color:#5b4fff !important;}
.h-generate-btn-app{background:#5b4fff !important;box-shadow:0 2px 12px rgba(91,79,255,0.35) !important;}
.h-examples{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:740px;margin-top:20px;animation:fadeUp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.5s both;}
.h-examples-label{font-size:12px;color:#a0a0b0;font-weight:600;align-self:center;}
.h-chip-ex{padding:6px 14px;border-radius:100px;background:#fff;border:1.5px solid #e2e2ea;font-size:12px;font-weight:600;color:#5a5a70;cursor:pointer;font-family:'Nunito',sans-serif;transition:all 0.18s;}
.h-chip-ex:hover{border-color:#c0392b;color:#c0392b;}

/* ══ RECENT PROJECTS ══ */
.rec-wrap{width:100%;max-width:900px;margin-top:48px;animation:recFadeUp 0.5s ease both;}
.rec-header-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;}
.rec-label{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:800;color:#0a0a12;}
.rec-label-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;}
.rec-view-all{padding:6px 14px;border-radius:8px;background:#fff;border:1.5px solid #e2e2ea;font-size:12px;font-weight:700;color:#3a3a4a;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.rec-view-all:hover{border-color:#c0392b;color:#c0392b;}
.rec-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.rec-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:14px;overflow:hidden;cursor:pointer;transition:all .22s;text-align:left;}
.rec-card:hover{transform:translateY(-4px);border-color:#c0392b;box-shadow:0 10px 32px rgba(0,0,0,0.1);}

/* Website preview inside card */
.rec-preview{height:130px;position:relative;overflow:hidden;background:#f0f0f8;}
.rec-dots{display:flex;gap:3px;padding:6px 8px;background:rgba(255,255,255,0.95);position:absolute;top:0;left:0;right:0;z-index:2;}
.rec-dots span{width:6px;height:6px;border-radius:50%;display:block;background:#e2e2ea;}
.rec-dots span:nth-child(1){background:#ef4444;}
.rec-dots span:nth-child(2){background:#f59e0b;}
.rec-dots span:nth-child(3){background:#22c55e;}
.rec-iframe-clip{position:absolute;top:22px;left:0;right:0;bottom:0;overflow:hidden;}
.rec-iframe{width:200%;height:200%;border:none;transform:scale(0.5);transform-origin:top left;pointer-events:none;}
.rec-placeholder{height:130px;display:flex;align-items:center;justify-content:center;background:#f4f4f8;font-size:28px;}
.rec-spinner{width:28px;height:28px;border:3px solid #e2e2ea;border-top-color:#c0392b;border-radius:50%;animation:spin 1s linear infinite;}

/* App preview inside card */
.rec-app-preview{height:130px;background:linear-gradient(135deg,#0a0a12,#1a1a2e);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:relative;}
.rec-app-icon{font-size:28px;}
.rec-app-files{display:flex;flex-direction:column;gap:3px;}
.rec-app-file{font-family:'JetBrains Mono',monospace;font-size:9px;color:#5050a0;background:rgba(91,79,255,0.15);padding:2px 8px;border-radius:3px;}

/* Hover overlay */
.rec-overlay{position:absolute;inset:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background .2s;z-index:4;}
.rec-card:hover .rec-overlay{background:rgba(0,0,0,0.45);}
.rec-open{background:#fff;color:#0a0a12;padding:7px 16px;border-radius:7px;font-size:12px;font-weight:800;font-family:'Nunito',sans-serif;opacity:0;transform:translateY(6px);transition:all .2s;cursor:pointer;}
.rec-card:hover .rec-open{opacity:1;transform:translateY(0);}

/* Card info */
.rec-info{padding:10px 12px;}
.rec-name{font-size:12px;font-weight:700;color:#0a0a12;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:5px;}
.rec-meta{display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
.rec-status{font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;}
.rec-status-ready{background:rgba(34,197,94,0.1);color:#16a34a;}
.rec-status-generating{background:rgba(245,158,11,0.1);color:#d97706;}
.rec-status-failed{background:rgba(239,68,68,0.1);color:#dc2626;}
.rec-paid{font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:rgba(91,79,255,0.1);color:#5b4fff;}
.rec-type{font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:rgba(91,79,255,0.1);color:#5b4fff;}

/* PRICING */
.h-pricing-wrap{margin-top:52px;width:100%;max-width:780px;animation:fadeUp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.6s both;}
.h-pricing-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:800;color:#0a0a12;margin-bottom:24px;}
.h-pricing-row{display:flex;align-items:stretch;gap:0;}
.h-step-card{flex:1;padding:24px 18px;background:#fff;border:1.5px solid #e2e2ea;border-radius:16px;text-align:center;position:relative;transition:all 0.2s;}
.h-step-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,0.1);}
.h-step-featured{border-color:#c0392b;box-shadow:0 6px 24px rgba(192,57,43,0.15);}
.h-step-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:#c0392b;color:#fff;font-size:10px;font-weight:800;padding:3px 12px;border-radius:20px;letter-spacing:0.5px;white-space:nowrap;}
.h-step-num{width:26px;height:26px;border-radius:50%;background:#e8e8f0;color:#6b6b7a;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;}
.h-step-num-red{background:#c0392b;color:#fff;}
.h-step-icon{font-size:30px;margin-bottom:8px;}
.h-step-name{font-size:11px;font-weight:800;color:#a0a0b0;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;}
.h-step-price{font-family:'Playfair Display',serif;font-size:34px;font-weight:900;margin-bottom:8px;line-height:1;}
.h-step-desc{font-size:12px;color:#72727f;font-weight:500;line-height:1.55;margin-bottom:12px;}
.h-step-perks{display:flex;flex-direction:column;gap:5px;text-align:left;}
.h-step-perk{font-size:12px;font-weight:600;color:#3a3a4a;}
.h-step-arrow{display:flex;align-items:center;font-size:22px;color:#d0d0da;padding:0 12px;flex-shrink:0;}
.h-what-box{margin-top:20px;background:#fafafa;border:1.5px solid #e8e8f0;border-radius:14px;padding:18px 20px;}
.h-what-title{font-size:14px;font-weight:800;color:#0a0a12;margin-bottom:12px;}
.h-what-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.h-what-item{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:#3a3a4a;}
.h-what-item span{font-size:16px;}
.h-pricing-note{font-size:12px;color:#a0a0b0;font-weight:500;margin-top:14px;text-align:center;}

/* ══ SEMI-TRANSPARENT AD OVERLAY ══ */
@keyframes adSlideIn{from{opacity:0;transform:translateY(30px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes backdropIn{from{opacity:0}to{opacity:1}}
.ad-overlay-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;animation:backdropIn 0.3s ease;}
.ad-overlay-box{position:relative;background:#fff;border-radius:20px;overflow:hidden;max-width:420px;width:100%;box-shadow:0 24px 80px rgba(0,0,0,0.35);animation:adSlideIn 0.35s cubic-bezier(0.34,1.4,0.64,1);}
.ad-overlay-close{position:absolute;top:12px;right:12px;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,0.5);border:none;color:#fff;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .15s;font-weight:700;}
.ad-overlay-close:hover{background:rgba(0,0,0,0.75);transform:scale(1.1);}
.ad-overlay-img{width:100%;max-height:220px;object-fit:cover;display:block;}
.ad-overlay-no-img{width:100%;height:140px;display:flex;align-items:center;justify-content:center;font-size:52px;background:linear-gradient(135deg,rgba(192,57,43,0.08),rgba(91,79,255,0.08));}
.ad-overlay-content{padding:20px 22px 18px;}
.ad-overlay-badge{display:inline-block;background:#e2e2ea;color:#72727f;font-size:9px;font-weight:800;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px;}
.ad-overlay-title{font-family:'Playfair Display',serif;font-size:19px;font-weight:800;color:#0a0a12;line-height:1.3;margin-bottom:8px;}
.ad-overlay-sub{font-size:13px;color:#72727f;font-weight:500;margin-bottom:16px;line-height:1.55;}
.ad-overlay-cta{display:block;width:100%;padding:13px;border-radius:10px;background:#c0392b;border:none;color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;text-align:center;transition:all .18s;box-shadow:0 4px 16px rgba(192,57,43,0.35);margin-bottom:12px;}
.ad-overlay-cta:hover{opacity:.88;transform:translateY(-1px);}
.ad-overlay-note{text-align:center;font-size:12px;color:#b0b0c0;font-weight:500;cursor:pointer;transition:color .15s;}
.ad-overlay-note:hover{color:#72727f;}


.h-low-credits-banner{width:100%;max-width:740px;display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(239,68,68,0.06);border:1.5px solid rgba(239,68,68,0.2);border-radius:12px;padding:12px 16px;font-size:13px;font-weight:600;color:#dc2626;flex-wrap:wrap;}
.h-low-credits-btn{padding:7px 16px;border-radius:8px;background:#c0392b;border:none;color:#fff;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;white-space:nowrap;transition:all .18s;box-shadow:0 2px 8px rgba(192,57,43,0.3);}
.h-low-credits-btn:hover{opacity:.88;}
.h-buy-credits-link{margin-left:10px;padding:4px 10px;border-radius:6px;background:#c0392b;border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.h-buy-credits-link:hover{opacity:.88;}
.h-scroll-hint{margin-top:36px;display:flex;flex-direction:column;align-items:center;gap:5px;background:transparent;border:none;cursor:pointer;color:#b0b0c0;font-size:12px;font-weight:700;font-family:'Nunito',sans-serif;animation:fadeUp 0.55s 0.8s both;}
.h-bounce{font-size:18px;animation:bounce 1.5s ease-in-out infinite;}

/* TEMPLATES */
.tpl-section{position:relative;z-index:1;background:linear-gradient(180deg,#f8f8fc 0%,#fff 100%);border-top:1.5px solid #e8e8f0;padding:80px 24px;}
.tpl-inner{max-width:1100px;margin:0 auto;}
.tpl-header{text-align:center;margin-bottom:52px;}
.tpl-label-pill{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1.5px solid #e2e2ea;border-radius:100px;padding:6px 16px;font-size:12px;font-weight:800;color:#c0392b;margin-bottom:14px;box-shadow:0 2px 6px rgba(0,0,0,0.05);}
.tpl-title{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:#0a0a12;letter-spacing:-1px;margin-bottom:10px;}
.tpl-sub{font-size:15px;color:#72727f;font-weight:500;}
.tpl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:28px;}
.tpl-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:20px;overflow:hidden;transition:all 0.22s cubic-bezier(0.34,1.2,0.64,1);box-shadow:0 2px 8px rgba(0,0,0,0.05);}
.tpl-card:hover{transform:translateY(-6px);border-color:var(--c);box-shadow:0 14px 44px rgba(0,0,0,0.13);}
.tpl-preview-wrap{position:relative;height:180px;overflow:hidden;border-bottom:1.5px solid #e8e8f0;background:#f8f8fc;}
.tpl-bar{display:flex;align-items:center;gap:8px;padding:7px 12px;background:rgba(255,255,255,0.95);border-bottom:1px solid #e8e8f0;position:relative;z-index:2;}
.tpl-dots{display:flex;gap:4px;}
.tpl-dots span{width:8px;height:8px;border-radius:50%;display:block;}
.tpl-url{font-size:10px;font-weight:600;color:rgba(0,0,0,0.35);background:rgba(0,0,0,0.06);padding:3px 10px;border-radius:5px;flex:1;text-align:center;}
.tpl-iframe-wrap{position:absolute;top:30px;left:0;right:0;bottom:0;overflow:hidden;}
.tpl-iframe{width:200%;height:200%;border:none;transform:scale(0.5);transform-origin:top left;pointer-events:none;}
.tpl-overlay{position:absolute;inset:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background 0.2s;z-index:3;}
.tpl-card:hover .tpl-overlay{background:rgba(0,0,0,0.45);}
.tpl-overlay-btn{background:#fff;color:#0a0a12;padding:8px 18px;border-radius:8px;border:none;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;opacity:0;transform:translateY(8px);transition:all 0.2s;}
.tpl-card:hover .tpl-overlay-btn{opacity:1;transform:translateY(0);}
.tpl-overlay-btn:hover{background:#c0392b;color:#fff;}
.tpl-body{padding:18px 18px 20px;}
.tpl-cat{font-size:11px;font-weight:800;padding:3px 10px;border-radius:6px;letter-spacing:0.3px;display:inline-block;margin-bottom:8px;}
.tpl-card-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#0a0a12;margin-bottom:6px;}
.tpl-card-desc{font-size:12px;color:#72727f;font-weight:500;line-height:1.55;margin-bottom:11px;}
.tpl-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;}
.tpl-tag{padding:3px 9px;border-radius:5px;background:#f0f0f8;font-size:11px;font-weight:700;color:#5a5a80;}
.tpl-btn{width:100%;padding:11px;border-radius:10px;background:#0a0a12;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all 0.18s;}
.tpl-btn:hover{background:#c0392b;transform:translateY(-1px);}
.tpl-bottom-note{text-align:center;font-size:13px;color:#a0a0b0;font-weight:600;padding-top:8px;}
.tpl-free-badge{display:inline-block;background:rgba(34,197,94,0.12);color:#15803d;border:1.5px solid rgba(34,197,94,0.3);font-size:10px;font-weight:800;padding:2px 9px;border-radius:100px;letter-spacing:0.3px;flex-shrink:0;}
.tpl-free-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:8px;}
.tpl-free-dl-btn{padding:9px 0;border-radius:9px;background:rgba(34,197,94,0.1);border:1.5px solid rgba(34,197,94,0.3);color:#15803d;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.tpl-free-dl-btn:hover{background:rgba(34,197,94,0.2);transform:translateY(-1px);}
.tpl-free-host-btn{padding:9px 0;border-radius:9px;background:rgba(91,79,255,0.08);border:1.5px solid rgba(91,79,255,0.25);color:#5b4fff;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.tpl-free-host-btn:hover{background:rgba(91,79,255,0.15);transform:translateY(-1px);}

/* HOW IT WORKS */
.how-section{position:relative;z-index:1;background:#fff;border-top:1.5px solid #e8e8f0;padding:80px 24px;text-align:center;}
.how-inner{max-width:900px;margin:0 auto;}
.how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;position:relative;}
.how-card{padding:36px 28px;border:1.5px solid #e8e8f0;position:relative;background:#fff;transition:all 0.2s;}
.how-card:first-child{border-radius:18px 0 0 18px;}
.how-card:last-child{border-radius:0 18px 18px 0;}
.how-card:not(:first-child){border-left:none;}
.how-card:hover{background:#fafafa;transform:translateY(-3px);z-index:2;border-color:#c0392b;border-radius:18px;box-shadow:0 8px 28px rgba(0,0,0,0.1);}
.how-num{width:30px;height:30px;border-radius:50%;background:#c0392b;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
.how-icon{font-size:34px;margin-bottom:12px;}
.how-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;margin-bottom:8px;}
.how-desc{font-size:13px;color:#72727f;font-weight:500;line-height:1.65;}
.how-arrow{position:absolute;right:-14px;top:50%;transform:translateY(-50%);font-size:20px;color:#d0d0da;z-index:3;background:#fff;width:26px;height:26px;border-radius:50%;border:1.5px solid #e2e2ea;display:flex;align-items:center;justify-content:center;}


/* ══ MANUAL OPTION CARD ══ */
.h-manual-card{width:100%;max-width:780px;background:linear-gradient(135deg,#0a0a12,#1a1a2e);border-radius:20px;padding:28px 32px;display:flex;gap:32px;align-items:flex-start;margin-top:32px;flex-wrap:wrap;}
.h-manual-left{flex:1;min-width:260px;}
.h-manual-right{display:flex;flex-direction:column;align-items:center;gap:10px;flex-shrink:0;}
.h-manual-badge{display:inline-block;background:rgba(255,255,255,0.1);color:#c8c8e0;font-size:11px;font-weight:800;padding:4px 12px;border-radius:100px;margin-bottom:10px;}
.h-manual-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#fff;line-height:1.35;margin-bottom:8px;}
.h-manual-desc{font-size:13px;color:#9090b0;font-weight:500;line-height:1.65;margin-bottom:14px;}
.h-manual-price{display:flex;align-items:baseline;gap:8px;margin-bottom:12px;}
.h-manual-price-num{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:#c0392b;}
.h-manual-price-label{font-size:12px;color:#7070a0;font-weight:600;}
.h-manual-perks{display:flex;flex-wrap:wrap;gap:8px;}
.h-manual-perks span{font-size:12px;font-weight:600;color:#6060a0;background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:6px;}
.h-manual-url-label{font-size:11px;font-weight:700;color:#5050a0;text-transform:uppercase;letter-spacing:1px;}
.h-manual-url-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 18px;color:#e0e0ff;font-size:13px;font-weight:700;text-decoration:none;font-family:'Nunito',sans-serif;transition:all .18s;white-space:nowrap;}
.h-manual-url-btn:hover{background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.3);transform:translateY(-1px);}
.h-manual-url-note{font-size:11px;color:#4040600;color:#404060;font-weight:500;}

/* ══ RESPONSIVE ══ */
@media(max-width:1000px){
  .rec-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:900px){
  .tpl-grid{grid-template-columns:repeat(2,1fr);}
  .apt-grid{grid-template-columns:1fr;}
  .how-grid{grid-template-columns:1fr;}
  .how-card{border-radius:0!important;border-left:1.5px solid #e8e8f0!important;border-bottom:none;}
  .how-card:first-child{border-radius:18px 18px 0 0!important;}
  .how-card:last-child{border-radius:0 0 18px 18px!important;border-bottom:1.5px solid #e8e8f0!important;}
  .how-arrow{display:none;}
  .h-nav-link{padding:6px 10px;font-size:12px;}
}
@media(max-width:768px){
  .h-nav{padding:0 14px;height:52px;}
  .h-logo-text{font-size:14px;}
  .h-nav-right{gap:6px;}
  .h-nav-link{display:none;}
  .h-nav-deploy,.h-nav-free{display:none;}
  .h-nav-credits{padding:5px 10px;}
  .h-hero{padding:80px 16px 60px;}
  .h-title{font-size:clamp(30px,9vw,44px);letter-spacing:-1px;}
  .h-subtitle{font-size:14px;max-width:100%;}
  .h-box{max-width:100%;}
  .h-textarea{font-size:14px;min-height:76px;}
  .h-toolbar{flex-direction:column;align-items:stretch;gap:10px;}
  .h-toolbar-left{flex-wrap:wrap;justify-content:center;}
  .h-toolbar-right{justify-content:space-between;}
  .h-generate-btn{flex:1;justify-content:center;}
  .h-mode-btn{padding:8px 14px;font-size:12px;}
  .h-app-banner-items{font-size:11px;gap:6px;}
  .h-examples{gap:6px;}
  .h-chip-ex{font-size:11px;padding:5px 11px;}
  .apt-grid{grid-template-columns:1fr;gap:16px;}
  .rec-grid{grid-template-columns:repeat(2,1fr);gap:10px;}
  .h-pricing-row{flex-direction:column;gap:14px;}
  .h-step-arrow{display:none;}
  .h-step-card{padding:20px 14px;}
  .h-what-grid{grid-template-columns:1fr 1fr;}
  .h-manual-card{flex-direction:column;padding:22px 18px;gap:18px;}
  .h-manual-right{align-items:stretch;width:100%;}
  .h-manual-url-btn{justify-content:center;}
  .tpl-grid{grid-template-columns:1fr;}
}
@media(max-width:480px){
  .h-nav-logo .h-logo-text{display:none;}
  .h-avatar{width:32px;height:32px;}
  .h-pill{font-size:11px;padding:6px 14px;}
  .h-title{font-size:clamp(26px,10vw,36px);}
  .h-subtitle{font-size:13px;margin-bottom:24px;}
  .h-mode-toggle{width:100%;justify-content:center;}
  .h-box-inner{padding:14px 14px 0;}
  .h-attach-btn{font-size:11px;padding:5px 9px;}
  .h-model-tag{font-size:10px;padding:5px 9px;}
  .h-clarify-opt{font-size:11.5px;padding:9px 12px;}
  .rec-grid{grid-template-columns:1fr;}
  .apt-body{padding:14px 14px 16px;}
  .apt-card-title{font-size:16px;}
  .tpl-body{padding:14px 14px 16px;}
  .tpl-card-title{font-size:16px;}
  .h-what-grid{grid-template-columns:1fr;}
  .h-step-price{font-size:26px;}
  .h-manual-title{font-size:16px;}
  .h-manual-price-num{font-size:28px;}
  .how-card{padding:26px 18px;}
  .apt-modal-actions{grid-template-columns:1fr;}
}
.h-box-coming-soon{border-color:rgba(91,79,255,0.25) !important;background:rgba(91,79,255,0.02);}
.h-coming-soon-inner{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:44px 28px;}
.h-coming-soon-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#0a0a12;}
.h-coming-soon-sub{font-size:13px;color:#72727f;font-weight:500;line-height:1.6;max-width:420px;margin-bottom:6px;}
/* ══ AD POPUP ══ */
@keyframes adSlideUp{from{opacity:0;transform:translateY(30px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}

/* ══ APP TEMPLATES GRID ══ */
.apt-wrap{width:100%;max-width:960px;margin-top:28px;animation:fadeUp 0.4s ease both;}
.apt-label{font-size:12px;font-weight:800;color:#5b4fff;text-align:center;margin-bottom:14px;letter-spacing:0.3px;}
.apt-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;}

/* Card — same outer structure as tpl-card */
.apt-card{background:#fff;border:1.5px solid #e2e2ea;border-radius:20px;overflow:hidden;transition:all 0.22s cubic-bezier(0.34,1.2,0.64,1);box-shadow:0 2px 8px rgba(0,0,0,0.05);}
.apt-card:hover{transform:translateY(-6px);border-color:var(--aptc);box-shadow:0 14px 44px rgba(0,0,0,0.13);}

/* Browser bar + iframe preview */
.apt-preview-wrap{position:relative;height:180px;overflow:hidden;border-bottom:1.5px solid #e8e8f0;background:#f8f8fc;}
.apt-bar{display:flex;align-items:center;gap:8px;padding:7px 12px;background:rgba(255,255,255,0.95);border-bottom:1px solid #e8e8f0;position:relative;z-index:2;}
.apt-dots{display:flex;gap:4px;}
.apt-dots span{width:8px;height:8px;border-radius:50%;display:block;}
.apt-url{font-size:10px;font-weight:600;color:rgba(0,0,0,0.35);background:rgba(0,0,0,0.06);padding:3px 10px;border-radius:5px;flex:1;text-align:center;}
.apt-iframe-wrap{position:absolute;top:30px;left:0;right:0;bottom:0;overflow:hidden;}
.apt-iframe{width:200%;height:200%;border:none;transform:scale(0.5);transform-origin:top left;pointer-events:none;}
.apt-no-preview{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0a0a12,#1a1a2e);}
.apt-overlay{position:absolute;inset:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background 0.2s;z-index:3;}
.apt-card:hover .apt-overlay{background:rgba(0,0,0,0.45);}
.apt-overlay-btn{background:#fff;color:#0a0a12;padding:8px 18px;border-radius:8px;border:none;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;opacity:0;transform:translateY(8px);transition:all 0.2s;}
.apt-card:hover .apt-overlay-btn{opacity:1;transform:translateY(0);}
.apt-overlay-btn:hover{background:#5b4fff;color:#fff;}

/* Card body */
.apt-body{padding:18px 18px 20px;}
.apt-cat-badge{font-size:11px;font-weight:800;padding:3px 10px;border-radius:6px;letter-spacing:0.3px;display:inline-block;}
.apt-free-badge{display:inline-block;background:rgba(34,197,94,0.12);color:#15803d;border:1.5px solid rgba(34,197,94,0.3);font-size:10px;font-weight:800;padding:2px 9px;border-radius:100px;letter-spacing:0.3px;flex-shrink:0;}
.apt-card-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#0a0a12;margin-bottom:6px;margin-top:2px;}
.apt-card-desc{font-size:12px;color:#72727f;font-weight:500;line-height:1.55;margin-bottom:11px;}
.apt-tags-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;}
.apt-tag{padding:3px 9px;border-radius:5px;background:#f0f0f8;font-size:11px;font-weight:700;color:#5b4fff;}

/* Download + Host buttons — same as tpl-free-actions */
.apt-free-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.apt-free-dl-btn{padding:10px 0;border-radius:9px;background:rgba(34,197,94,0.1);border:1.5px solid rgba(34,197,94,0.3);color:#15803d;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.apt-free-dl-btn:hover{background:rgba(34,197,94,0.2);transform:translateY(-1px);}
.apt-free-host-btn{padding:10px 0;border-radius:9px;background:rgba(91,79,255,0.08);border:1.5px solid rgba(91,79,255,0.25);color:#5b4fff;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.apt-free-host-btn:hover{background:rgba(91,79,255,0.15);transform:translateY(-1px);}

/* ══ APP TEMPLATE MODAL ══ */
@keyframes aptModalIn{from{opacity:0;transform:translateY(20px) scale(0.97)}to{opacity:1;transform:none}}
.apt-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;}
.apt-modal{position:relative;background:#0d0d1a;border:1.5px solid #1e1e3a;border-radius:20px;width:100%;max-width:700px;max-height:92vh;overflow-y:auto;animation:aptModalIn .25s ease;box-shadow:0 32px 100px rgba(0,0,0,0.7);}
.apt-modal-x{position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.08);border:none;color:#8080a0;width:30px;height:30px;border-radius:8px;font-size:14px;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;}
.apt-modal-x:hover{background:rgba(255,255,255,0.15);color:#fff;}
.apt-modal-head{display:flex;align-items:center;gap:14px;padding:22px 22px 16px;}
.apt-modal-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;}
.apt-modal-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:4px;}
.apt-modal-sub{font-size:12px;color:#5050a0;font-weight:500;}
.apt-modal-preview{margin:0 20px;border-radius:12px;overflow:hidden;border:1.5px solid #1e1e3a;background:#080818;height:360px;position:relative;}
.apt-preview-iframe{width:100%;height:100%;border:none;}
.apt-preview-missing{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#5050a0;font-size:14px;text-align:center;padding:24px;}
.apt-preview-missing code{background:rgba(91,79,255,0.15);border-radius:4px;padding:2px 6px;font-size:12px;color:#a090ff;}
.apt-modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px 20px 12px;}
.apt-dl-btn{padding:13px;border-radius:10px;background:rgba(34,197,94,0.12);border:1.5px solid rgba(34,197,94,0.3);color:#22c55e;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.apt-dl-btn:hover{background:rgba(34,197,94,0.22);}
.apt-gh-btn{padding:13px;border-radius:10px;background:#5b4fff;border:none;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.apt-gh-btn:hover{opacity:.88;}
.apt-modal-note{text-align:center;font-size:11px;color:#3a3a5a;padding:0 20px 18px;font-weight:500;}
.h-attach-btn{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;border:1.5px solid #e2e2ea;background:#fff;font-size:12px;font-weight:700;color:#5a5a70;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.h-attach-btn:hover{border-color:#c0392b;color:#c0392b;}
.h-hidden-input{display:none;}
.h-logo-chip{display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:8px;background:#f5f5f7;border:1px solid #e2e2ea;}
.h-logo-chip-img{width:22px;height:22px;border-radius:4px;object-fit:cover;}
.h-logo-chip-name{font-size:11px;font-weight:600;color:#3a3a4a;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.h-logo-chip-remove{background:transparent;border:none;color:#a0a0b0;cursor:pointer;font-size:11px;padding:0 2px;}
.h-logo-chip-remove:hover{color:#ef4444;}
`