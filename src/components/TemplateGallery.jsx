import React, { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

// ══════════════════════════════════════════════════════════════
//  LUXURY TEMPLATES  — fully pre-written HTML, 100% FREE
//  Users can: Download ZIP for free  OR  Deploy to GitHub Pages for free
// ══════════════════════════════════════════════════════════════
const LUXURY_TEMPLATES = [
  {
    id: 'hotel',
    name: 'Grand Palace Hotel',
    category: 'Hospitality',
    catColor: '#c9a84c',
    catBg: 'rgba(201,168,76,0.12)',
    desc: 'Ultra-luxury 5-star hotel with parallax hero, animated room cards, reservation form, gallery & testimonials',
    tags: ['Parallax', 'Gold Animations', 'Booking Form', 'Gallery'],
    liveUrl: 'https://zaterbusiness.github.io/grand-palace-hotel/',
    heroImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
     preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0a0805;color:#f5e6c8;font-family:'Georgia',serif;overflow-x:hidden;width:100%;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes glow{0%,100%{opacity:0.6}50%{opacity:1}}
nav{background:rgba(0,0,0,0.9);padding:8px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(201,168,76,0.3)}
.logo{font-size:13px;letter-spacing:4px;color:#c9a84c;text-transform:uppercase;font-weight:bold}
.nav-links a{color:#c9a84c;font-size:9px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;margin-left:14px}
.hero{height:200px;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.hero-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80');background-size:cover;background-position:center;filter:brightness(0.4);}
.hero-content{position:relative;z-index:2;text-align:center;}
.tag{font-size:8px;letter-spacing:3px;color:#c9a84c;border:1px solid rgba(201,168,76,0.4);padding:3px 12px;margin-bottom:10px;text-transform:uppercase;display:inline-block;}
.hero h1{font-size:22px;letter-spacing:5px;color:#f5e6c8;text-align:center;animation:float 4s ease-in-out infinite}
.hero p{font-size:9px;color:#c9a84c;letter-spacing:2px;margin-top:6px}
.btn{background:transparent;border:1px solid #c9a84c;color:#c9a84c;padding:6px 20px;font-size:9px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;margin-top:10px;display:inline-block}
.rooms{padding:12px 16px;background:#050402}
.rooms-title{text-align:center;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:10px}
.room-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.room-card{border:1px solid rgba(201,168,76,0.2);overflow:hidden;transition:all 0.3s}
.room-card-img{height:80px;background-size:cover;background-position:center;position:relative;}
.room-card-img::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.3);}
.room-info{background:linear-gradient(135deg,#1a1208,#0d0b06);padding:8px;text-align:center}
.room-name{font-size:10px;font-weight:bold;color:#c9a84c;margin-bottom:3px}
.room-price{font-size:9px;color:#f5e6c8}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(201,168,76,0.2);margin-top:0}
.stat{text-align:center;padding:12px 8px;border-right:1px solid rgba(201,168,76,0.1)}
.stat:last-child{border-right:none}
.stat-n{font-size:18px;color:#c9a84c;}
.stat-l{font-size:8px;letter-spacing:2px;color:rgba(245,230,200,0.5);text-transform:uppercase;margin-top:4px}
.amenities{padding:12px 16px;background:#0a0a0a}
.am-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px}
.am{text-align:center;padding:12px 8px;border:1px solid rgba(201,168,76,0.1)}
.am-img{width:100%;height:60px;object-fit:cover;margin-bottom:6px}
.am-name{font-size:9px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase}
.gallery{padding:12px 16px}
.gal-title{text-align:center;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:10px}
.gal-grid{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:100px 100px;gap:4px}
.gal-item{background-size:cover;background-position:center;overflow:hidden}
.gal-item:first-child{grid-row:span 2}
</style></head><body>
<nav><div class="logo">The Grand</div><div><a href="#" class="nav-links">Rooms</a><a href="#" class="nav-links">Spa</a><a href="#" class="nav-links">Dine</a></div></nav>
<div class="hero">
  <div class="hero-img"></div>
  <div class="hero-content">
    <div class="tag">Est. 1892</div>
    <h1>THE GRAND<br/>PALACE</h1>
    <p>Where luxury meets eternity</p>
    <div class="btn">Book Your Stay</div>
  </div>
</div>
<div class="stats">
  <div class="stat"><div class="stat-n">130</div><div class="stat-l">Years</div></div>
  <div class="stat"><div class="stat-n">48</div><div class="stat-l">Suites</div></div>
  <div class="stat"><div class="stat-n">5★</div><div class="stat-l">Forbes</div></div>
  <div class="stat"><div class="stat-n">98%</div><div class="stat-l">Satisfaction</div></div>
</div>
<div class="rooms">
  <div class="rooms-title">Our Suites</div>
  <div class="room-grid">
    <div class="room-card">
      <div class="room-card-img" style="background-image:url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80')"></div>
      <div class="room-info"><div class="room-name">Royal Suite</div><div class="room-price">₹45,000/night</div></div>
    </div>
    <div class="room-card">
      <div class="room-card-img" style="background-image:url('https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80')"></div>
      <div class="room-info"><div class="room-name">Ocean View</div><div class="room-price">₹28,000/night</div></div>
    </div>
    <div class="room-card">
      <div class="room-card-img" style="background-image:url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80')"></div>
      <div class="room-info"><div class="room-name">Penthouse</div><div class="room-price">₹85,000/night</div></div>
    </div>
  </div>
</div>
<div class="amenities">
  <div class="rooms-title">Amenities</div>
  <div class="am-grid">
    <div class="am"><img class="am-img" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80" alt="dining"/><div class="am-name">Fine Dining</div></div>
    <div class="am"><img class="am-img" src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80" alt="spa"/><div class="am-name">Royal Spa</div></div>
    <div class="am"><img class="am-img" src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&q=80" alt="pool"/><div class="am-name">Infinity Pool</div></div>
    <div class="am"><img class="am-img" src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=80" alt="events"/><div class="am-name">Events</div></div>
  </div>
</div>
<div class="gallery">
  <div class="gal-title">Gallery</div>
  <div class="gal-grid">
    <div class="gal-item" style="background-image:url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80')"></div>
    <div class="gal-item" style="background-image:url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80')"></div>
    <div class="gal-item" style="background-image:url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=80')"></div>
    <div class="gal-item" style="background-image:url('https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400&q=80')"></div>
    <div class="gal-item" style="background-image:url('https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=400&q=80')"></div>
  </div>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>The Grand Palace Hotel</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--gold:#c9a84c;--gold2:#e8c97e;--dark:#0a0805;--darker:#050402;--cream:#f5e6c8;}
html{scroll-behavior:smooth;}
body{background:var(--dark);color:var(--cream);font-family:'Cormorant Garamond',serif;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:#0d0b06;}
::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes particleDrift{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) translateX(40px);opacity:0}}
@keyframes lineExpand{from{width:0}to{width:80px}}
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:20px 60px;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s;background:transparent;}
.nav.scrolled{background:rgba(5,4,2,0.95);backdrop-filter:blur(20px);padding:14px 60px;border-bottom:1px solid rgba(201,168,76,0.2);}
.nav-logo-text{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:8px;color:var(--gold);text-transform:uppercase;line-height:1;}
.nav-logo-sub{font-size:9px;letter-spacing:5px;color:rgba(201,168,76,0.6);text-transform:uppercase;font-family:'Montserrat',sans-serif;}
.nav-links{display:flex;align-items:center;gap:40px;}
.nav-links a{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:3px;color:rgba(245,230,200,0.7);text-decoration:none;text-transform:uppercase;transition:color 0.3s;position:relative;}
.nav-links a:hover{color:var(--gold);}
.nav-btn{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;border:1px solid var(--gold);color:var(--gold);padding:10px 28px;background:transparent;cursor:pointer;transition:all 0.3s;}
.nav-btn:hover{background:var(--gold);color:var(--dark);}
.hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=90');background-size:cover;background-position:center;transform:scale(1.05);transition:transform 8s ease;}
.hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);}
.hero-particles{position:absolute;inset:0;}
.particle{position:absolute;width:2px;height:2px;background:var(--gold);border-radius:50%;animation:particleDrift linear infinite;}
.hero-content{position:relative;z-index:2;text-align:center;animation:fadeUp 1.2s ease both;}
.hero-badge{display:inline-flex;align-items:center;gap:12px;font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:4px;color:var(--gold);border:1px solid rgba(201,168,76,0.3);padding:8px 24px;margin-bottom:32px;text-transform:uppercase;}
.badge-line{width:30px;height:1px;background:var(--gold);}
.hero-title{font-size:clamp(52px,10vw,110px);font-weight:300;letter-spacing:12px;line-height:0.9;color:var(--cream);text-transform:uppercase;margin-bottom:24px;}
.hero-title span{color:var(--gold);}
.hero-divider{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:24px;}
.hero-divider-line{height:1px;width:80px;background:linear-gradient(to right,transparent,var(--gold),transparent);}
.hero-divider-diamond{width:6px;height:6px;background:var(--gold);transform:rotate(45deg);}
.hero-sub{font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:6px;color:rgba(245,230,200,0.6);text-transform:uppercase;margin-bottom:48px;}
.hero-btns{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;}
.btn-primary{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;background:var(--gold);color:var(--dark);padding:16px 48px;border:none;cursor:pointer;transition:all 0.3s;font-weight:600;}
.btn-primary:hover{background:var(--gold2);transform:translateY(-2px);box-shadow:0 8px 32px rgba(201,168,76,0.4);}
.btn-secondary{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;background:transparent;color:var(--gold);padding:16px 48px;border:1px solid var(--gold);cursor:pointer;transition:all 0.3s;}
.btn-secondary:hover{background:rgba(201,168,76,0.1);}
.hero-scroll{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;color:rgba(201,168,76,0.5);text-transform:uppercase;animation:float 2s ease-in-out infinite;}
.scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,var(--gold),transparent);}
.stats{background:var(--darker);border-top:1px solid rgba(201,168,76,0.15);border-bottom:1px solid rgba(201,168,76,0.15);padding:40px 60px;display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
.stat-item{text-align:center;border-right:1px solid rgba(201,168,76,0.15);padding:20px;}
.stat-item:last-child{border-right:none;}
.stat-num{font-size:42px;font-weight:300;color:var(--gold);letter-spacing:2px;line-height:1;}
.stat-label{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:rgba(245,230,200,0.5);text-transform:uppercase;margin-top:8px;}
.rooms{padding:100px 60px;background:var(--dark);}
.section-header{text-align:center;margin-bottom:70px;}
.section-badge{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:5px;color:var(--gold);text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:16px;}
.section-badge::before,.section-badge::after{content:'';width:40px;height:1px;background:var(--gold);}
.section-title{font-size:clamp(32px,5vw,56px);font-weight:300;letter-spacing:6px;color:var(--cream);text-transform:uppercase;margin-bottom:16px;}
.section-sub{font-family:'Montserrat',sans-serif;font-size:13px;color:rgba(245,230,200,0.5);letter-spacing:2px;}
.rooms-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.room-card{position:relative;overflow:hidden;cursor:pointer;background:var(--darker);}
.room-img{height:400px;background-size:cover;background-position:center;transition:transform 0.6s ease;position:relative;}
.room-card:hover .room-img{transform:scale(1.05);}
.room-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,4,2,0.9) 0%,rgba(5,4,2,0.2) 60%,transparent 100%);transition:opacity 0.3s;}
.room-card:hover .room-img-overlay{opacity:0.7;}
.room-info{position:absolute;bottom:0;left:0;right:0;padding:30px;transform:translateY(20px);transition:transform 0.3s;}
.room-card:hover .room-info{transform:translateY(0);}
.room-cat{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:8px;}
.room-name{font-size:24px;letter-spacing:3px;color:var(--cream);margin-bottom:6px;}
.room-price{font-family:'Montserrat',sans-serif;font-size:12px;color:var(--gold);letter-spacing:2px;margin-bottom:14px;}
.room-btn{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;border:1px solid var(--gold);color:var(--gold);padding:8px 24px;background:transparent;cursor:pointer;opacity:0;transition:all 0.3s;}
.room-card:hover .room-btn{opacity:1;}
.room-btn:hover{background:var(--gold);color:var(--dark);}
.amenities{padding:100px 60px;background:linear-gradient(135deg,#0d0b06,#1a1208);}
.amenities-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:60px;}
.amenity{overflow:hidden;border:1px solid rgba(201,168,76,0.1);transition:all 0.3s;}
.amenity:hover{border-color:rgba(201,168,76,0.4);transform:translateY(-8px);}
.amenity-img{width:100%;height:180px;object-fit:cover;display:block;}
.amenity-body{padding:20px;text-align:center;}
.amenity-name{font-size:16px;letter-spacing:3px;color:var(--gold);margin-bottom:10px;text-transform:uppercase;}
.amenity-desc{font-family:'Montserrat',sans-serif;font-size:12px;color:rgba(245,230,200,0.5);line-height:1.8;}
.gallery{padding:100px 60px;background:var(--darker);}
.gallery-grid{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(2,220px);gap:4px;margin-top:60px;}
.g1{grid-column:span 6;grid-row:span 2;background-size:cover;background-position:center;transition:transform 0.5s;overflow:hidden;}
.g2{grid-column:span 3;background-size:cover;background-position:center;transition:transform 0.5s;}
.g3{grid-column:span 3;background-size:cover;background-position:center;transition:transform 0.5s;}
.g4{grid-column:span 6;background-size:cover;background-position:center;transition:transform 0.5s;}
.g1:hover,.g2:hover,.g3:hover,.g4:hover{transform:scale(1.03);}
.booking{padding:100px 60px;background:var(--dark);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.booking-left h2{font-size:clamp(32px,4vw,52px);font-weight:300;letter-spacing:5px;color:var(--cream);text-transform:uppercase;margin-bottom:20px;}
.booking-left p{font-family:'Montserrat',sans-serif;font-size:13px;color:rgba(245,230,200,0.5);line-height:2;letter-spacing:1px;}
.booking-features{margin-top:30px;display:flex;flex-direction:column;gap:12px;}
.booking-feature{display:flex;align-items:center;gap:12px;font-family:'Montserrat',sans-serif;font-size:12px;color:rgba(245,230,200,0.7);letter-spacing:1px;}
.bf-dot{width:4px;height:4px;background:var(--gold);border-radius:50%;flex-shrink:0;}
.booking-form{background:var(--darker);border:1px solid rgba(201,168,76,0.15);padding:40px;}
.form-title{font-size:22px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:30px;text-align:center;}
.form-group{margin-bottom:20px;}
.form-label{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:rgba(201,168,76,0.7);text-transform:uppercase;display:block;margin-bottom:8px;}
.form-input,.form-select{width:100%;background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.2);color:var(--cream);padding:12px 16px;font-family:'Cormorant Garamond',serif;font-size:15px;outline:none;transition:border-color 0.3s;}
.form-input:focus,.form-select:focus{border-color:var(--gold);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.form-select option{background:var(--darker);}
.form-submit{width:100%;background:var(--gold);color:var(--dark);border:none;padding:16px;font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;font-weight:600;margin-top:10px;}
.form-submit:hover{background:var(--gold2);transform:translateY(-2px);}
.testimonials{padding:100px 60px;background:linear-gradient(135deg,#050402,#0d0b06);text-align:center;}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin-top:60px;}
.testi-card{border:1px solid rgba(201,168,76,0.1);padding:40px 30px;transition:all 0.3s;position:relative;}
.testi-card::before{content:'"';position:absolute;top:20px;left:24px;font-size:60px;color:var(--gold);opacity:0.2;line-height:1;}
.testi-card:hover{border-color:rgba(201,168,76,0.3);transform:translateY(-4px);}
.testi-stars{color:var(--gold);font-size:14px;margin-bottom:20px;letter-spacing:3px;}
.testi-text{font-size:15px;color:rgba(245,230,200,0.7);line-height:1.9;font-style:italic;margin-bottom:20px;}
.testi-name{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;}
.testi-loc{font-family:'Montserrat',sans-serif;font-size:10px;color:rgba(245,230,200,0.3);margin-top:4px;}
footer{background:#020201;border-top:1px solid rgba(201,168,76,0.15);padding:60px;text-align:center;}
.footer-logo{font-size:32px;letter-spacing:10px;color:var(--gold);text-transform:uppercase;margin-bottom:16px;}
.footer-links{display:flex;justify-content:center;gap:40px;margin-bottom:24px;}
.footer-links a{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:rgba(245,230,200,0.4);text-decoration:none;text-transform:uppercase;transition:color 0.3s;}
.footer-links a:hover{color:var(--gold);}
.footer-copy{font-family:'Montserrat',sans-serif;font-size:10px;color:rgba(245,230,200,0.2);letter-spacing:2px;}
@media(max-width:900px){.nav{padding:16px 24px;}.stats{grid-template-columns:repeat(2,1fr);padding:40px 24px;}.rooms-grid{grid-template-columns:1fr;}.amenities-grid{grid-template-columns:repeat(2,1fr);}.booking{grid-template-columns:1fr;gap:40px;padding:60px 24px;}.testi-grid{grid-template-columns:1fr;}.rooms,.amenities,.gallery,.testimonials{padding:60px 24px;}}
</style>
</head>
<body>
<nav class="nav" id="mainNav">
  <div><div class="nav-logo-text">The Grand</div><div class="nav-logo-sub">Palace Hotel</div></div>
  <div class="nav-links">
    <a href="#rooms">Rooms</a><a href="#amenities">Amenities</a><a href="#gallery">Gallery</a><a href="#booking">Contact</a>
    <button class="nav-btn" onclick="document.getElementById('booking').scrollIntoView({behavior:'smooth'})">Book Now</button>
  </div>
</nav>
<section class="hero" id="hero">
  <div class="hero-bg" id="heroBg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-particles" id="particles"></div>
  <div class="hero-content">
    <div class="hero-badge"><span class="badge-line"></span>Est. 1892 · Mumbai, India<span class="badge-line"></span></div>
    <h1 class="hero-title">The Grand<br/><span>Palace</span></h1>
    <div class="hero-divider"><div class="hero-divider-line"></div><div class="hero-divider-diamond"></div><div class="hero-divider-line"></div></div>
    <p class="hero-sub">Where Luxury Meets Eternity</p>
    <div class="hero-btns">
      <button class="btn-primary" onclick="document.getElementById('booking').scrollIntoView({behavior:'smooth'})">Reserve Your Suite</button>
      <button class="btn-secondary" onclick="document.getElementById('rooms').scrollIntoView({behavior:'smooth'})">Explore Rooms</button>
    </div>
  </div>
  <div class="hero-scroll"><div class="scroll-line"></div>Scroll</div>
</section>
<div class="stats">
  <div class="stat-item"><div class="stat-num">130</div><div class="stat-label">Years of Excellence</div></div>
  <div class="stat-item"><div class="stat-num">48</div><div class="stat-label">Luxury Suites</div></div>
  <div class="stat-item"><div class="stat-num">5★</div><div class="stat-label">Forbes Rated</div></div>
  <div class="stat-item"><div class="stat-num">98%</div><div class="stat-label">Guest Satisfaction</div></div>
</div>
<section class="rooms" id="rooms">
  <div class="section-header"><div class="section-badge">Our Accommodations</div><h2 class="section-title">Suites & Rooms</h2><p class="section-sub">Each suite tells a story of unparalleled comfort</p></div>
  <div class="rooms-grid">
    <div class="room-card">
      <div class="room-img" style="background-image:url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85')"><div class="room-img-overlay"></div></div>
      <div class="room-info"><div class="room-cat">Signature</div><div class="room-name">Royal Suite</div><div class="room-price">From ₹45,000 / night</div><button class="room-btn">Reserve Now</button></div>
    </div>
    <div class="room-card">
      <div class="room-img" style="background-image:url('https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=85')"><div class="room-img-overlay"></div></div>
      <div class="room-info"><div class="room-cat">Premium</div><div class="room-name">Ocean View Suite</div><div class="room-price">From ₹28,000 / night</div><button class="room-btn">Reserve Now</button></div>
    </div>
    <div class="room-card">
      <div class="room-img" style="background-image:url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=85')"><div class="room-img-overlay"></div></div>
      <div class="room-info"><div class="room-cat">Presidential</div><div class="room-name">Grand Penthouse</div><div class="room-price">From ₹85,000 / night</div><button class="room-btn">Reserve Now</button></div>
    </div>
  </div>
</section>
<section class="amenities" id="amenities">
  <div class="section-header"><div class="section-badge">Exclusive Services</div><h2 class="section-title">World-Class Amenities</h2></div>
  <div class="amenities-grid">
    <div class="amenity"><img class="amenity-img" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85" alt="Fine Dining"/><div class="amenity-body"><div class="amenity-name">Fine Dining</div><div class="amenity-desc">Three Michelin-starred restaurants</div></div></div>
    <div class="amenity"><img class="amenity-img" src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=85" alt="Spa"/><div class="amenity-body"><div class="amenity-name">Royal Spa</div><div class="amenity-desc">Award-winning Ayurvedic treatments</div></div></div>
    <div class="amenity"><img class="amenity-img" src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=85" alt="Pool"/><div class="amenity-body"><div class="amenity-name">Infinity Pool</div><div class="amenity-desc">Rooftop with panoramic views</div></div></div>
    <div class="amenity"><img class="amenity-img" src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=85" alt="Events"/><div class="amenity-body"><div class="amenity-name">Events</div><div class="amenity-desc">Bespoke weddings & galas</div></div></div>
  </div>
</section>
<section class="gallery" id="gallery">
  <div class="section-header"><div class="section-badge">Visual Journey</div><h2 class="section-title">Hotel Gallery</h2></div>
  <div class="gallery-grid">
    <div class="g1" style="background-image:url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85')"></div>
    <div class="g2" style="background-image:url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=85')"></div>
    <div class="g3" style="background-image:url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&q=85')"></div>
    <div class="g4" style="background-image:url('https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=700&q=85')"></div>
  </div>
</section>
<section class="booking" id="booking">
  <div class="booking-left">
    <div class="section-badge" style="justify-content:flex-start;margin-bottom:20px">Reserve Your Stay</div>
    <h2>Experience<br/>True Luxury</h2>
    <p>Immerse yourself in a world of timeless elegance. Every detail has been thoughtfully crafted for your stay.</p>
    <div class="booking-features">
      <div class="booking-feature"><div class="bf-dot"></div>Complimentary airport transfers</div>
      <div class="booking-feature"><div class="bf-dot"></div>24/7 dedicated butler service</div>
      <div class="booking-feature"><div class="bf-dot"></div>Daily gourmet breakfast included</div>
      <div class="booking-feature"><div class="bf-dot"></div>Flexible cancellation policy</div>
    </div>
  </div>
  <div class="booking-form">
    <div class="form-title">Make a Reservation</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Check In</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Check Out</label><input type="date" class="form-input"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Adults</label><select class="form-select"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
      <div class="form-group"><label class="form-label">Room Type</label><select class="form-select"><option>Royal Suite</option><option>Ocean View</option><option>Penthouse</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" placeholder="Your full name"/></div>
    <div class="form-group"><label class="form-label">Email Address</label><input type="email" class="form-input" placeholder="your@email.com"/></div>
    <button class="form-submit" onclick="alert('Reservation request received! We will contact you within 24 hours.')">Request Reservation</button>
  </div>
</section>
<section class="testimonials">
  <div class="section-header"><div class="section-badge">Guest Stories</div><h2 class="section-title">What Our Guests Say</h2></div>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"The Grand Palace redefines luxury. Every detail, from the thread count of the sheets to the view from the rooftop, is simply breathtaking."</p><div class="testi-name">Rajesh Mehta</div><div class="testi-loc">Mumbai, India</div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"I've stayed in five-star hotels across three continents. The Grand Palace stands in a class entirely its own. Perfection personified."</p><div class="testi-name">Sarah Williams</div><div class="testi-loc">London, UK</div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"Our honeymoon suite was magical. The butler service, the spa, the food — nothing short of extraordinary. We will return every year."</p><div class="testi-name">Ananya & Karan</div><div class="testi-loc">Delhi, India</div></div>
  </div>
</section>
<footer>
  <div class="footer-logo">The Grand Palace</div>
  <div class="footer-links"><a href="#">About</a><a href="#">Rooms</a><a href="#">Dining</a><a href="#">Spa</a><a href="#">Events</a><a href="#">Contact</a></div>
  <div class="footer-copy">© 2024 The Grand Palace Hotel · 18 Marine Drive, Mumbai, India</div>
</footer>
<script>
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>80);});
const pc=document.getElementById('particles');
for(let i=0;i<30;i++){const p=document.createElement('div');p.style.cssText='position:absolute;width:'+(Math.random()*3+1)+'px;height:'+(Math.random()*3+1)+'px;background:#c9a84c;border-radius:50%;left:'+(Math.random()*100)+'%;bottom:0;animation:particleDrift '+(Math.random()*15+8)+'s linear '+(Math.random()*10)+'s infinite;opacity:0;';pc.appendChild(p);}
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.animation='fadeUp 0.8s ease forwards';e.target.style.opacity='1';}});},{threshold:0.1});
document.querySelectorAll('.room-card,.amenity,.testi-card,.stat-item').forEach(el=>{el.style.opacity='0';obs.observe(el);});
</script>
</body></html>`
  },
  {
    id: 'fashion',
    name: 'Noir Fashion',
    category: 'Fashion',
    catColor: '#e8c97e',
    catBg: 'rgba(232,201,126,0.12)',
    desc: 'High-fashion brand with custom CSS cursor, marquee ticker, split-screen hero and editorial lookbook',
    tags: ['Custom Cursor', 'Marquee', 'Editorial', 'Dark Minimal'],
    liveUrl: 'https://zaterbusiness.github.io/noir-fashion/',
    heroImg: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0a0a0a;color:#fff;font-family:'Helvetica Neue',sans-serif;overflow-x:hidden;width:100%;}
@keyframes slide{0%,100%{transform:translateX(0)}50%{transform:translateX(-5px)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
nav{padding:14px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1a1a1a}
.logo{font-size:16px;letter-spacing:8px;font-weight:100;text-transform:uppercase}
.nav-links a{font-size:9px;letter-spacing:3px;color:#666;text-decoration:none;text-transform:uppercase;margin-left:14px}
.hero{display:grid;grid-template-columns:1fr 1fr;height:220px}
.hero-left{background:#111;padding:20px;display:flex;flex-direction:column;justify-content:flex-end}
.hero-right{position:relative;overflow:hidden}
.hero-right-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80');background-size:cover;background-position:center;filter:brightness(0.7);}
.big-text{font-size:28px;font-weight:100;letter-spacing:4px;line-height:1.1;color:#fff;text-transform:uppercase}
.accent{color:#e8c97e}
.tag{font-size:8px;letter-spacing:4px;color:#e8c97e;text-transform:uppercase;margin-bottom:8px}
.marquee-wrap{background:#0f0f0f;border-top:1px solid #1a1a1a;padding:8px 0;overflow:hidden;white-space:nowrap}
.marquee-content{display:inline-flex;animation:marquee 15s linear infinite}
.marquee-item{font-size:9px;letter-spacing:4px;color:#444;text-transform:uppercase;padding:0 24px}
.products{padding:12px 16px;background:#080808}
.prod-title{font-size:9px;letter-spacing:4px;color:#e8c97e;text-transform:uppercase;margin-bottom:10px}
.prod-row{display:flex;gap:6px}
.prod-item{flex:1;overflow:hidden;position:relative}
.prod-img{width:100%;height:100px;object-fit:cover;display:block;filter:brightness(0.8)}
.prod-name{position:absolute;bottom:6px;left:8px;font-size:8px;letter-spacing:2px;color:#fff;text-transform:uppercase}
.prod-price{position:absolute;bottom:6px;right:8px;font-size:8px;color:#e8c97e}
.editorial{display:grid;grid-template-columns:1fr 1fr;height:160px;margin-top:4px}
.ed-img{background-image:url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80');background-size:cover;background-position:center top;}
.ed-text{background:#0f0f0f;padding:20px;display:flex;flex-direction:column;justify-content:center}
.ed-title{font-size:14px;font-weight:100;letter-spacing:3px;color:#fff;margin-bottom:8px}
.ed-body{font-size:8px;letter-spacing:1px;color:#555;line-height:1.8}
</style></head><body>
<nav><div class="logo">Noir</div><div><a href="#" class="nav-links">New</a><a href="#" class="nav-links">Collection</a><a href="#" class="nav-links">About</a></div></nav>
<div class="hero">
  <div class="hero-left"><div class="tag">SS 2024 Collection</div><div class="big-text">The Art<br/>of <span class="accent">Silence</span></div></div>
  <div class="hero-right"><div class="hero-right-img"></div></div>
</div>
<div class="marquee-wrap">
  <div class="marquee-content">
    <span class="marquee-item">New Collection SS 2024 ◆</span><span class="marquee-item">Free Shipping Above ₹25,000 ◆</span><span class="marquee-item">Handcrafted in Paris ◆</span><span class="marquee-item">Limited Edition ◆</span>
    <span class="marquee-item">New Collection SS 2024 ◆</span><span class="marquee-item">Free Shipping Above ₹25,000 ◆</span><span class="marquee-item">Handcrafted in Paris ◆</span><span class="marquee-item">Limited Edition ◆</span>
  </div>
</div>
<div class="products">
  <div class="prod-title">New Arrivals</div>
  <div class="prod-row">
    <div class="prod-item"><img class="prod-img" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&q=80" alt=""/><div class="prod-name">Silk Gown</div><div class="prod-price">₹1.85L</div></div>
    <div class="prod-item"><img class="prod-img" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80" alt=""/><div class="prod-name">Drape Dress</div><div class="prod-price">₹95K</div></div>
    <div class="prod-item"><img class="prod-img" src="https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=300&q=80" alt=""/><div class="prod-name">Cashmere</div><div class="prod-price">₹68K</div></div>
    <div class="prod-item"><img class="prod-img" src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80" alt=""/><div class="prod-name">Clutch Bag</div><div class="prod-price">₹68K</div></div>
  </div>
</div>
<div class="editorial">
  <div class="ed-img"></div>
  <div class="ed-text"><div class="ed-title">The Woman<br/>Who Wears<br/><span style="color:#e8c97e;font-style:italic">Silence</span></div><div class="ed-body">She doesn't need to speak to be heard. Dressed in NOIR's signature drape, she commands every room.</div></div>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>NOIR — Luxury Fashion</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--black:#080808;--dark:#0f0f0f;--gold:#e8c97e;--white:#f5f5f0;--gray:#2a2a2a;}
html{scroll-behavior:smooth;}
body{background:var(--black);color:var(--white);font-family:'Montserrat',sans-serif;cursor:none;overflow-x:hidden;}
.cursor{position:fixed;width:12px;height:12px;background:var(--white);border-radius:50%;pointer-events:none;z-index:9999;transition:transform 0.15s;transform:translate(-50%,-50%);}
.cursor-follower{position:fixed;width:40px;height:40px;border:1px solid rgba(255,255,255,0.3);border-radius:50%;pointer-events:none;z-index:9998;transition:transform 0.4s,width 0.3s,height 0.3s;transform:translate(-50%,-50%);}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideLeft{from{transform:translateX(60px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideRight{from{transform:translateX(-60px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes scanline{0%{top:-5%}100%{top:105%}}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:24px 60px;transition:all 0.4s;}
.nav.scrolled{background:rgba(8,8,8,0.95);backdrop-filter:blur(20px);padding:14px 60px;border-bottom:1px solid #1a1a1a;}
.nav-left{display:flex;gap:40px;}
.nav-center{font-size:28px;letter-spacing:12px;font-weight:100;text-transform:uppercase;}
.nav-right-links{display:flex;gap:40px;justify-content:flex-end;}
.nav-link{font-size:10px;letter-spacing:4px;color:rgba(245,245,240,0.6);text-decoration:none;text-transform:uppercase;transition:color 0.3s;}
.nav-link:hover{color:var(--white);}
.nav-cart{font-size:10px;letter-spacing:4px;color:var(--gold);text-decoration:none;text-transform:uppercase;}
.marquee-wrap{background:var(--dark);border-top:1px solid #1a1a1a;border-bottom:1px solid #1a1a1a;padding:12px 0;overflow:hidden;white-space:nowrap;margin-top:80px;}
.marquee-content{display:inline-flex;animation:marquee 20s linear infinite;}
.marquee-text{font-size:11px;letter-spacing:5px;color:rgba(245,245,240,0.3);text-transform:uppercase;padding:0 40px;}
.marquee-diamond{color:var(--gold);}
.hero{display:grid;grid-template-columns:1fr 1fr;min-height:100vh;}
.hero-left{position:relative;background:var(--dark);padding:80px 60px;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;}
.hero-left-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 20% 80%,rgba(232,201,126,0.05),transparent);}
.hero-collection{font-size:10px;letter-spacing:6px;color:var(--gold);text-transform:uppercase;margin-bottom:24px;animation:slideLeft 1s ease 0.3s both;}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(48px,7vw,96px);font-weight:300;line-height:0.95;color:var(--white);margin-bottom:32px;animation:slideLeft 1s ease 0.5s both;}
.hero-title em{font-style:italic;color:var(--gold);}
.hero-desc{font-size:12px;color:rgba(245,245,240,0.4);line-height:2;max-width:360px;margin-bottom:48px;animation:slideLeft 1s ease 0.7s both;}
.hero-btns{display:flex;gap:16px;animation:slideLeft 1s ease 0.9s both;}
.btn-gold{background:var(--gold);color:var(--black);border:none;padding:16px 40px;font-size:10px;letter-spacing:4px;text-transform:uppercase;cursor:none;transition:all 0.3s;font-family:'Montserrat',sans-serif;}
.btn-gold:hover{transform:translateY(-2px);}
.btn-outline{background:transparent;color:var(--white);border:1px solid rgba(245,245,240,0.3);padding:16px 40px;font-size:10px;letter-spacing:4px;text-transform:uppercase;cursor:none;font-family:'Montserrat',sans-serif;}
.hero-right{position:relative;overflow:hidden;}
.hero-right-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=90');background-size:cover;background-position:center;transition:transform 8s ease;}
.hero-right:hover .hero-right-img{transform:scale(1.05);}
.hero-right-overlay{position:absolute;inset:0;background:linear-gradient(to right,rgba(15,15,15,0.4),transparent);}
.scanline{position:absolute;left:0;right:0;height:1px;background:linear-gradient(to right,transparent,rgba(232,201,126,0.3),transparent);animation:scanline 4s linear infinite;z-index:3;}
.hero-right-text{position:absolute;right:30px;top:50%;transform:translateY(-50%) rotate(90deg);font-size:9px;letter-spacing:6px;color:rgba(245,245,240,0.2);text-transform:uppercase;white-space:nowrap;z-index:2;}
.products{padding:100px 60px;background:var(--black);}
.products-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:60px;}
.products-title{font-family:'Playfair Display',serif;font-size:clamp(32px,5vw,64px);font-weight:300;color:var(--white);}
.products-title em{font-style:italic;color:var(--gold);}
.products-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}
.prod-card{position:relative;overflow:hidden;cursor:none;}
.prod-img{height:420px;width:100%;object-fit:cover;display:block;transition:transform 0.6s ease;filter:brightness(0.9);}
.prod-card:hover .prod-img{transform:scale(1.04);}
.prod-overlay{position:absolute;inset:0;background:rgba(8,8,8,0);transition:background 0.4s;display:flex;align-items:flex-end;padding:30px;}
.prod-card:hover .prod-overlay{background:rgba(8,8,8,0.5);}
.prod-info{transform:translateY(20px);opacity:0;transition:all 0.3s;}
.prod-card:hover .prod-info{transform:translateY(0);opacity:1;}
.prod-cat{font-size:9px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:6px;}
.prod-name{font-family:'Playfair Display',serif;font-size:20px;color:var(--white);margin-bottom:6px;}
.prod-price{font-size:12px;color:rgba(245,245,240,0.6);}
.prod-add{margin-top:12px;background:var(--gold);color:var(--black);border:none;padding:10px 24px;font-size:9px;letter-spacing:3px;text-transform:uppercase;cursor:none;font-family:'Montserrat',sans-serif;opacity:0;transition:all 0.3s;display:block;}
.prod-card:hover .prod-add{opacity:1;}
.editorial{padding:100px 60px;background:var(--dark);display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:600px;}
.editorial-img{position:relative;overflow:hidden;}
.editorial-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 6s ease;}
.editorial-img:hover img{transform:scale(1.04);}
.editorial-tag-overlay{position:absolute;bottom:24px;right:24px;background:var(--gold);color:var(--black);padding:10px 20px;font-size:10px;letter-spacing:3px;text-transform:uppercase;}
.editorial-text{padding:80px 60px;display:flex;flex-direction:column;justify-content:center;}
.editorial-tag{font-size:9px;letter-spacing:5px;color:var(--gold);text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center;gap:16px;}
.editorial-tag::before{content:'';width:40px;height:1px;background:var(--gold);}
.editorial-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,52px);font-weight:300;line-height:1.2;color:var(--white);margin-bottom:24px;}
.editorial-title em{color:var(--gold);}
.editorial-body{font-size:13px;color:rgba(245,245,240,0.5);line-height:2.2;margin-bottom:32px;}
.newsletter{padding:100px 60px;background:var(--black);text-align:center;border-top:1px solid #111;}
.newsletter-title{font-family:'Playfair Display',serif;font-size:clamp(32px,5vw,64px);font-weight:300;color:var(--white);margin-bottom:16px;}
.newsletter-sub{font-size:12px;color:rgba(245,245,240,0.4);letter-spacing:2px;margin-bottom:48px;}
.newsletter-form{display:flex;max-width:500px;margin:0 auto;border-bottom:1px solid rgba(245,245,240,0.2);}
.newsletter-input{flex:1;background:transparent;border:none;color:var(--white);font-size:14px;font-family:'Montserrat',sans-serif;padding:14px 0;outline:none;}
.newsletter-input::placeholder{color:rgba(245,245,240,0.2);}
.newsletter-btn{background:transparent;border:none;color:var(--gold);font-size:10px;letter-spacing:4px;text-transform:uppercase;cursor:none;padding:14px 0;font-family:'Montserrat',sans-serif;}
footer{background:#040404;border-top:1px solid #111;padding:60px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:40px;}
.footer-logo{font-size:28px;letter-spacing:10px;color:var(--white);font-weight:100;margin-bottom:16px;}
.footer-tagline{font-size:11px;color:rgba(245,245,240,0.3);letter-spacing:3px;}
.footer-col-title{font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:20px;}
.footer-col-links{display:flex;flex-direction:column;gap:12px;}
.footer-col-links a{font-size:12px;color:rgba(245,245,240,0.4);text-decoration:none;transition:color 0.3s;}
.footer-col-links a:hover{color:var(--white);}
.footer-bottom{background:#020202;padding:20px 60px;display:flex;justify-content:space-between;border-top:1px solid #0f0f0f;}
.footer-copy{font-size:10px;color:rgba(245,245,240,0.2);letter-spacing:2px;}
@media(max-width:900px){.hero{grid-template-columns:1fr;}.hero-right{height:50vh;}.products-grid{grid-template-columns:repeat(2,1fr);}.editorial{grid-template-columns:1fr;}.newsletter,.products{padding:60px 24px;}footer{grid-template-columns:1fr 1fr;padding:40px 24px;}}
</style>
</head>
<body>
<div class="cursor" id="cursor"></div>
<div class="cursor-follower" id="follower"></div>
<nav class="nav" id="nav">
  <div class="nav-left"><a href="#" class="nav-link">Collections</a><a href="#" class="nav-link">Editorial</a></div>
  <div class="nav-center">NOIR</div>
  <div class="nav-right-links"><a href="#" class="nav-link">Stores</a><a href="#" class="nav-cart">Bag (0)</a></div>
</nav>
<div class="marquee-wrap">
  <div class="marquee-content">
    <span class="marquee-text">New Collection SS 2024</span><span class="marquee-diamond"> ◆ </span>
    <span class="marquee-text">Free Shipping Above ₹25,000</span><span class="marquee-diamond"> ◆ </span>
    <span class="marquee-text">Handcrafted in Paris</span><span class="marquee-diamond"> ◆ </span>
    <span class="marquee-text">Limited Edition Pieces</span><span class="marquee-diamond"> ◆ </span>
    <span class="marquee-text">New Collection SS 2024</span><span class="marquee-diamond"> ◆ </span>
    <span class="marquee-text">Free Shipping Above ₹25,000</span><span class="marquee-diamond"> ◆ </span>
    <span class="marquee-text">Handcrafted in Paris</span><span class="marquee-diamond"> ◆ </span>
    <span class="marquee-text">Limited Edition Pieces</span><span class="marquee-diamond"> ◆ </span>
  </div>
</div>
<section class="hero">
  <div class="hero-left">
    <div class="hero-left-bg"></div>
    <div class="hero-collection">SS 2024 — The Silence Collection</div>
    <h1 class="hero-title">The Art<br/>of <em>Silence</em></h1>
    <p class="hero-desc">Where minimalism becomes a statement. Crafted from the finest Japanese silk and Italian cashmere.</p>
    <div class="hero-btns"><button class="btn-gold">Explore Collection</button><button class="btn-outline">View Lookbook</button></div>
  </div>
  <div class="hero-right">
    <div class="hero-right-img"></div>
    <div class="hero-right-overlay"></div>
    <div class="scanline"></div>
    <div class="hero-right-text">The Silence Collection 2024</div>
  </div>
</section>
<section class="products" id="products">
  <div class="products-header"><h2 class="products-title">New <em>Arrivals</em></h2></div>
  <div class="products-grid">
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=85" alt="Silk Gown"/><div class="prod-overlay"><div class="prod-info"><div class="prod-cat">Silk Collection</div><div class="prod-name">Noir Evening Gown</div><div class="prod-price">₹1,85,000</div><button class="prod-add">Add to Bag</button></div></div></div>
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85" alt="Coat"/><div class="prod-overlay"><div class="prod-info"><div class="prod-cat">Cashmere</div><div class="prod-name">Le Manteau Coat</div><div class="prod-price">₹2,40,000</div><button class="prod-add">Add to Bag</button></div></div></div>
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=85" alt="Drape"/><div class="prod-overlay"><div class="prod-info"><div class="prod-cat">SS 2024</div><div class="prod-name">Drape Silk Sari</div><div class="prod-price">₹95,000</div><button class="prod-add">Add to Bag</button></div></div></div>
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85" alt="Bag"/><div class="prod-overlay"><div class="prod-info"><div class="prod-cat">Accessories</div><div class="prod-name">Minaudière Clutch</div><div class="prod-price">₹68,000</div><button class="prod-add">Add to Bag</button></div></div></div>
  </div>
</section>
<section class="editorial">
  <div class="editorial-img"><img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=90" alt="Editorial"/><div class="editorial-tag-overlay">Campaign 2024</div></div>
  <div class="editorial-text">
    <div class="editorial-tag">Editorial</div>
    <h2 class="editorial-title">The Woman<br/>Who <em>Wears</em><br/>Silence</h2>
    <p class="editorial-body">She doesn't need to speak to be heard. Dressed in NOIR's signature drape, she commands every room through the sheer presence of restraint and perfect cut.</p>
    <button class="btn-gold">Read the Story</button>
  </div>
</section>
<section class="newsletter">
  <h2 class="newsletter-title">Join the Circle</h2>
  <p class="newsletter-sub">Exclusive access to new collections, private sales & editorial content</p>
  <div class="newsletter-form"><input class="newsletter-input" type="email" placeholder="Your email address"/><button class="newsletter-btn">Subscribe →</button></div>
</section>
<footer>
  <div><div class="footer-logo">NOIR</div><div class="footer-tagline">Silence is the new luxury</div></div>
  <div><div class="footer-col-title">Collections</div><div class="footer-col-links"><a href="#">SS 2024</a><a href="#">Pre-Fall</a><a href="#">Bridal</a><a href="#">Archive</a></div></div>
  <div><div class="footer-col-title">Company</div><div class="footer-col-links"><a href="#">About NOIR</a><a href="#">Ateliers</a><a href="#">Press</a></div></div>
  <div><div class="footer-col-title">Support</div><div class="footer-col-links"><a href="#">Size Guide</a><a href="#">Returns</a><a href="#">Contact</a></div></div>
</footer>
<div class="footer-bottom"><div class="footer-copy">© 2024 NOIR.</div><div class="footer-copy">Maison NOIR · 12 Rue du Faubourg, Paris</div></div>
<script>
const cursor=document.getElementById('cursor'),follower=document.getElementById('follower');
let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
function animFollower(){fx+=(mx-fx)*0.12;fy+=(my-fy)*0.12;follower.style.left=fx+'px';follower.style.top=fy+'px';requestAnimationFrame(animFollower);}
animFollower();
const nav=document.querySelector('.nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60);});
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.style.animation='slideUp 0.8s ease forwards';});},{threshold:0.15});
document.querySelectorAll('.prod-card').forEach(el=>{el.style.opacity='0';obs.observe(el);});
</script>
</body></html>`
  },

  {
    id: 'spa',
    name: 'Serenity Spa',
    category: 'Wellness',
    catColor: '#7fb5a0',
    catBg: 'rgba(127,181,160,0.12)',
    desc: 'Luxury wellness spa with breathing circle animation, ripple rings, particle rise & ritual step reveals',
    tags: ['Breathing FX', 'Particles', 'Ripple Rings', 'Serene'],
    liveUrl: 'https://zaterbusiness.github.io/serenity-spa/',
    heroImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0d1a15;color:#e8f0ea;font-family:'Georgia',serif;overflow-x:hidden;width:100%;}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
nav{padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(127,181,160,0.2)}
.logo{font-size:14px;letter-spacing:4px;color:#7fb5a0;text-transform:uppercase}
.hero{position:relative;min-height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;text-align:center;padding:20px}
.hero-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80');background-size:cover;background-position:center;filter:brightness(0.3);}
.hero-content{position:relative;z-index:2;}
.circle{width:80px;height:80px;border-radius:50%;border:1px solid rgba(127,181,160,0.3);display:flex;align-items:center;justify-content:center;font-size:28px;animation:breathe 4s ease-in-out infinite;margin:0 auto 14px;background:rgba(127,181,160,0.1)}
.tag{font-size:8px;letter-spacing:4px;color:#7fb5a0;text-transform:uppercase;margin-bottom:10px}
.title{font-size:22px;font-weight:300;letter-spacing:4px;color:#e8f0ea}
.sub{font-size:9px;color:rgba(232,240,234,0.5);letter-spacing:2px;margin-top:6px}
.services{padding:12px 16px;background:#0a1410;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.service{background:rgba(127,181,160,0.06);border:1px solid rgba(127,181,160,0.15);overflow:hidden}
.service-img{width:100%;height:70px;object-fit:cover;display:block;filter:brightness(0.7)}
.service-body{padding:8px;text-align:center}
.s-name{font-size:9px;letter-spacing:2px;color:#7fb5a0;text-transform:uppercase}
.s-price{font-size:8px;color:rgba(232,240,234,0.4);margin-top:3px}
.philosophy{padding:12px 16px;background:#060e0a;text-align:center}
.phi-title{font-size:14px;font-weight:300;letter-spacing:3px;color:#e8f0ea;margin-bottom:8px}
.phi-text{font-size:9px;color:rgba(232,240,234,0.4);line-height:1.8;letter-spacing:0.5px;max-width:400px;margin:0 auto}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(127,181,160,0.1);margin-top:12px}
.stat{text-align:center;padding:10px 6px;border-right:1px solid rgba(127,181,160,0.1)}
.stat:last-child{border-right:none}
.stat-n{font-size:16px;color:#7fb5a0}
.stat-l{font-size:7px;letter-spacing:1px;color:rgba(232,240,234,0.3);text-transform:uppercase;margin-top:3px}
</style></head><body>
<nav><div class="logo">Serenity</div><div style="display:flex;gap:14px"><a href="#" style="font-size:9px;letter-spacing:2px;color:rgba(232,240,234,0.5);text-decoration:none;text-transform:uppercase">Treatments</a><a href="#" style="font-size:9px;letter-spacing:2px;color:rgba(232,240,234,0.5);text-decoration:none;text-transform:uppercase">Book</a></div></nav>
<div class="hero">
  <div class="hero-img"></div>
  <div class="hero-content">
    <div class="circle">🌿</div>
    <div class="tag">Luxury Wellness</div>
    <div class="title">SERENITY</div>
    <div class="sub">Breathe. Restore. Transcend.</div>
  </div>
</div>
<div class="philosophy">
  <div class="phi-title">The Art of Inner Stillness</div>
  <div class="phi-text">Ancient Ayurvedic wisdom meets modern wellness science in our sanctuary of peace.</div>
  <div class="stats">
    <div class="stat"><div class="stat-n">18</div><div class="stat-l">Years</div></div>
    <div class="stat"><div class="stat-n">42</div><div class="stat-l">Treatments</div></div>
    <div class="stat"><div class="stat-n">12K</div><div class="stat-l">Guests</div></div>
    <div class="stat"><div class="stat-n">5★</div><div class="stat-l">Condé Nast</div></div>
  </div>
</div>
<div class="services">
  <div class="service"><img class="service-img" src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&q=80" alt="Massage"/><div class="service-body"><div class="s-name">Deep Tissue</div><div class="s-price">₹12,000 · 90 min</div></div></div>
  <div class="service"><img class="service-img" src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&q=80" alt="Aromatherapy"/><div class="service-body"><div class="s-name">Aromatherapy</div><div class="s-price">₹18,000 · 120 min</div></div></div>
  <div class="service"><img class="service-img" src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&q=80" alt="Meditation"/><div class="service-body"><div class="s-name">Meditation</div><div class="s-price">₹8,500 · 60 min</div></div></div>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Serenity Luxury Spa</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--deep:#060e0a;--dark:#0d1a15;--mid:#122018;--green:#7fb5a0;--light-green:#a8d5c4;--cream:#e8f0ea;--muted:rgba(232,240,234,0.45);}
html{scroll-behavior:smooth;}
body{background:var(--deep);color:var(--cream);font-family:'Cormorant Garamond',serif;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--dark);}
::-webkit-scrollbar-thumb{background:var(--green);border-radius:2px;}
@keyframes breathe{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(127,181,160,0.3)}50%{transform:scale(1.06);box-shadow:0 0 40px 20px rgba(127,181,160,0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes ripple{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2.5);opacity:0}}
@keyframes particleRise{0%{transform:translateY(0);opacity:0}10%{opacity:0.6}90%{opacity:0.2}100%{transform:translateY(-100vh);opacity:0}}
@keyframes slideIn{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:22px 60px;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s;}
.nav.scrolled{background:rgba(6,14,10,0.95);backdrop-filter:blur(20px);padding:14px 60px;border-bottom:1px solid rgba(127,181,160,0.1);}
.nav-logo{font-size:24px;letter-spacing:8px;color:var(--green);text-transform:uppercase;font-family:'Montserrat',sans-serif;font-weight:200;}
.nav-links{display:flex;gap:40px;}
.nav-links a{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:4px;color:var(--muted);text-decoration:none;text-transform:uppercase;transition:color 0.3s;}
.nav-links a:hover{color:var(--green);}
.nav-book{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;border:1px solid rgba(127,181,160,0.4);color:var(--green);padding:10px 28px;background:transparent;cursor:pointer;transition:all 0.3s;}
.nav-book:hover{background:rgba(127,181,160,0.1);}
.hero{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.hero-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=90');background-size:cover;background-position:center;transition:transform 8s ease;}
.hero-overlay{position:absolute;inset:0;background:rgba(6,14,10,0.65);}
.hero-particles{position:absolute;inset:0;pointer-events:none;}
.particle{position:absolute;border-radius:50%;background:var(--green);animation:particleRise linear infinite;}
.hero-circle-wrap{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
.hero-circle{border-radius:50%;border:1px solid rgba(127,181,160,0.08);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
.hero-content{position:relative;z-index:2;text-align:center;max-width:700px;padding:0 24px;}
.hero-icon-wrap{position:relative;display:inline-block;margin-bottom:32px;}
.hero-icon{width:100px;height:100px;border-radius:50%;border:1px solid rgba(127,181,160,0.3);display:flex;align-items:center;justify-content:center;font-size:40px;animation:breathe 5s ease-in-out infinite;margin:0 auto;background:rgba(127,181,160,0.05);}
.hero-ripple{position:absolute;inset:-10px;border-radius:50%;border:1px solid rgba(127,181,160,0.2);animation:ripple 3s ease-out infinite;}
.hero-ripple:nth-child(2){animation-delay:1s;}
.hero-ripple:nth-child(3){animation-delay:2s;}
.hero-eyebrow{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:6px;color:var(--green);text-transform:uppercase;margin-bottom:20px;animation:fadeUp 1s ease 0.3s both;}
.hero-title{font-size:clamp(48px,10vw,100px);font-weight:300;letter-spacing:10px;color:var(--cream);text-transform:uppercase;line-height:0.9;margin-bottom:20px;animation:fadeUp 1s ease 0.5s both;}
.hero-title em{font-style:italic;color:var(--green);}
.hero-divider{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:20px;}
.hero-line{height:1px;width:60px;background:linear-gradient(to right,transparent,var(--green));}
.hero-sub{font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:5px;color:var(--muted);text-transform:uppercase;margin-bottom:48px;animation:fadeUp 1s ease 0.7s both;}
.hero-btns{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;animation:fadeUp 1s ease 0.9s both;}
.btn-sage{background:var(--green);color:var(--deep);border:none;padding:16px 44px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
.btn-sage:hover{background:var(--light-green);transform:translateY(-2px);}
.btn-ghost{background:transparent;color:var(--green);border:1px solid rgba(127,181,160,0.4);padding:16px 44px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
.hero-scroll{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:4px;color:rgba(127,181,160,0.4);text-transform:uppercase;animation:float 2.5s ease-in-out infinite;}
.scroll-orb{width:1px;height:40px;background:linear-gradient(to bottom,var(--green),transparent);}
.philosophy{padding:100px 60px;background:var(--dark);text-align:center;}
.phi-eyebrow{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:5px;color:var(--green);text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:20px;}
.phi-eyebrow::before,.phi-eyebrow::after{content:'';width:36px;height:1px;background:var(--green);}
.phi-title{font-size:clamp(28px,5vw,52px);font-weight:300;color:var(--cream);letter-spacing:4px;margin-bottom:24px;}
.phi-text{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--muted);line-height:2.4;max-width:600px;margin:0 auto 60px;}
.phi-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;}
.phi-stat-num{font-size:48px;font-weight:300;color:var(--green);line-height:1;margin-bottom:8px;}
.phi-stat-label{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:var(--muted);text-transform:uppercase;}
.treatments{padding:100px 60px;background:var(--deep);}
.treat-header{text-align:center;margin-bottom:70px;}
.treat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.treat-card{position:relative;overflow:hidden;cursor:pointer;}
.treat-img{height:420px;width:100%;object-fit:cover;display:block;transition:transform 0.6s ease;filter:brightness(0.8);}
.treat-card:hover .treat-img{transform:scale(1.04);filter:brightness(0.7);}
.treat-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,14,10,0.9) 0%,transparent 60%);}
.treat-info{position:absolute;bottom:0;left:0;right:0;padding:30px;transform:translateY(16px);transition:transform 0.3s;}
.treat-card:hover .treat-info{transform:translateY(0);}
.treat-cat{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;color:var(--green);text-transform:uppercase;margin-bottom:8px;}
.treat-name{font-size:22px;letter-spacing:2px;color:var(--cream);margin-bottom:6px;}
.treat-duration{font-family:'Montserrat',sans-serif;font-size:11px;color:var(--muted);}
.treat-price{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--green);margin-bottom:16px;}
.treat-btn{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;border:1px solid rgba(127,181,160,0.4);color:var(--green);padding:8px 22px;background:transparent;cursor:pointer;opacity:0;transition:all 0.3s;}
.treat-card:hover .treat-btn{opacity:1;}
.ritual{padding:100px 60px;background:var(--mid);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.ritual-img-wrap{border-radius:50%;overflow:hidden;width:300px;height:300px;margin:0 auto;}
.ritual-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;}
.ritual-steps{display:flex;flex-direction:column;gap:28px;margin-top:40px;}
.ritual-step{display:flex;gap:20px;align-items:flex-start;opacity:0;}
.ritual-step.visible{animation:slideIn 0.6s ease forwards;}
.step-num{width:36px;height:36px;border-radius:50%;border:1px solid rgba(127,181,160,0.3);display:flex;align-items:center;justify-content:center;font-family:'Montserrat',sans-serif;font-size:12px;color:var(--green);flex-shrink:0;}
.step-name{font-size:18px;letter-spacing:2px;color:var(--cream);margin-bottom:6px;}
.step-desc{font-family:'Montserrat',sans-serif;font-size:12px;color:var(--muted);line-height:1.8;}
.booking{padding:100px 60px;background:var(--deep);text-align:center;}
.booking-form{max-width:640px;margin:60px auto 0;background:var(--dark);border:1px solid rgba(127,181,160,0.1);padding:50px;}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.form-group{display:flex;flex-direction:column;gap:8px;}
.form-label{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;color:rgba(127,181,160,0.6);text-transform:uppercase;}
.form-input,.form-select{background:rgba(127,181,160,0.05);border:1px solid rgba(127,181,160,0.15);color:var(--cream);padding:13px 16px;font-family:'Cormorant Garamond',serif;font-size:15px;outline:none;transition:border-color 0.3s;}
.form-input:focus,.form-select:focus{border-color:var(--green);}
.form-select option{background:var(--dark);}
.form-submit{background:var(--green);color:var(--deep);border:none;width:100%;padding:16px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:5px;text-transform:uppercase;cursor:pointer;margin-top:10px;transition:all 0.3s;}
.form-submit:hover{background:var(--light-green);}
footer{background:#030805;border-top:1px solid rgba(127,181,160,0.08);padding:60px;text-align:center;}
.foot-logo{font-size:28px;letter-spacing:10px;color:var(--green);text-transform:uppercase;font-family:'Montserrat',sans-serif;font-weight:200;margin-bottom:12px;}
.foot-links{display:flex;justify-content:center;gap:40px;margin-bottom:24px;}
.foot-links a{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:var(--muted);text-decoration:none;text-transform:uppercase;transition:color 0.3s;}
.foot-links a:hover{color:var(--green);}
.foot-copy{font-family:'Montserrat',sans-serif;font-size:10px;color:rgba(127,181,160,0.2);letter-spacing:2px;}
@media(max-width:900px){.nav{padding:16px 24px;}.philosophy,.treatments,.ritual,.booking{padding:60px 24px;}.treat-grid{grid-template-columns:1fr;}.ritual{grid-template-columns:1fr;gap:40px;}.phi-stats{grid-template-columns:repeat(2,1fr);}}
</style>
</head>
<body>
<nav class="nav" id="nav">
  <div class="nav-logo">Serenity</div>
  <div class="nav-links"><a href="#treatments">Treatments</a><a href="#ritual">Ritual</a><a href="#booking">Book</a></div>
  <button class="nav-book" onclick="document.getElementById('booking').scrollIntoView({behavior:'smooth'})">Book Now</button>
</nav>
<section class="hero">
  <div class="hero-img" id="heroBg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-particles" id="particles"></div>
  <div class="hero-circle-wrap"><div class="hero-circle" style="width:500px;height:500px;"></div><div class="hero-circle" style="width:700px;height:700px;"></div></div>
  <div class="hero-content">
    <div class="hero-icon-wrap"><div class="hero-ripple"></div><div class="hero-ripple"></div><div class="hero-ripple"></div><div class="hero-icon">🌿</div></div>
    <div class="hero-eyebrow">Luxury Wellness · Est. 2005</div>
    <h1 class="hero-title">Find<br/><em>Serenity</em></h1>
    <div class="hero-divider"><div class="hero-line"></div><span style="color:var(--green);font-size:14px">✦</span><div class="hero-line" style="transform:scaleX(-1)"></div></div>
    <p class="hero-sub">Breathe. Restore. Transcend.</p>
    <div class="hero-btns">
      <button class="btn-sage" onclick="document.getElementById('booking').scrollIntoView({behavior:'smooth'})">Book Your Experience</button>
      <button class="btn-ghost" onclick="document.getElementById('treatments').scrollIntoView({behavior:'smooth'})">Explore Treatments</button>
    </div>
  </div>
  <div class="hero-scroll"><div class="scroll-orb"></div>Breathe</div>
</section>
<section class="philosophy">
  <div class="phi-eyebrow">Our Philosophy</div>
  <h2 class="phi-title">The Art of Inner Stillness</h2>
  <p class="phi-text">At Serenity, true luxury is the art of doing nothing — and doing it perfectly. Our treatments draw from ancient Ayurvedic wisdom and modern wellness science.</p>
  <div class="phi-stats">
    <div><div class="phi-stat-num">18</div><div class="phi-stat-label">Years of Excellence</div></div>
    <div><div class="phi-stat-num">42</div><div class="phi-stat-label">Unique Treatments</div></div>
    <div><div class="phi-stat-num">12K+</div><div class="phi-stat-label">Guests Restored</div></div>
    <div><div class="phi-stat-num">5★</div><div class="phi-stat-label">Condé Nast Rated</div></div>
  </div>
</section>
<section class="treatments" id="treatments">
  <div class="treat-header"><div class="phi-eyebrow">Signature Services</div><h2 class="phi-title">Our Treatments</h2></div>
  <div class="treat-grid">
    <div class="treat-card"><img class="treat-img" src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=85" alt="Massage"/><div class="treat-overlay"></div><div class="treat-info"><div class="treat-cat">Bodywork</div><div class="treat-name">Deep Restoration Massage</div><div class="treat-duration">90 minutes</div><div class="treat-price">₹12,000</div><button class="treat-btn">Book Treatment</button></div></div>
    <div class="treat-card"><img class="treat-img" src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=85" alt="Aromatherapy"/><div class="treat-overlay"></div><div class="treat-info"><div class="treat-cat">Aromatherapy</div><div class="treat-name">Sacred Botanicals Journey</div><div class="treat-duration">120 minutes</div><div class="treat-price">₹18,000</div><button class="treat-btn">Book Treatment</button></div></div>
    <div class="treat-card"><img class="treat-img" src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85" alt="Meditation"/><div class="treat-overlay"></div><div class="treat-info"><div class="treat-cat">Mindfulness</div><div class="treat-name">Sound Bath Meditation</div><div class="treat-duration">60 minutes</div><div class="treat-price">₹8,500</div><button class="treat-btn">Book Treatment</button></div></div>
  </div>
</section>
<section class="ritual" id="ritual">
  <div>
    <div class="phi-eyebrow" style="justify-content:flex-start;margin-bottom:20px">The Serenity Ritual</div>
    <h2 style="font-size:clamp(28px,4vw,48px);font-weight:300;color:var(--cream);letter-spacing:3px;margin-bottom:24px;">Your Journey<br/>to Stillness</h2>
    <div class="ritual-steps">
      <div class="ritual-step"><div class="step-num">01</div><div><div class="step-name">Arrival & Centering</div><div class="step-desc">Begin with ceremonial welcome tea and guided breathing.</div></div></div>
      <div class="ritual-step"><div class="step-num">02</div><div><div class="step-name">Purification Bath</div><div class="step-desc">Immerse in our mineral and essential oil bath with Himalayan salts.</div></div></div>
      <div class="ritual-step"><div class="step-num">03</div><div><div class="step-name">Signature Treatment</div><div class="step-desc">Your personalised treatment, tailored to your body's needs.</div></div></div>
      <div class="ritual-step"><div class="step-num">04</div><div><div class="step-name">Restoration & Tea</div><div class="step-desc">Rest in our tranquil garden with herbal infusions.</div></div></div>
    </div>
  </div>
  <div style="text-align:center"><div class="ritual-img-wrap"><img src="https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&q=85" alt="Ritual"/></div></div>
</section>
<section class="booking" id="booking">
  <div class="phi-eyebrow">Reserve Your Experience</div>
  <h2 class="phi-title">Book a Treatment</h2>
  <div class="booking-form">
    <div class="form-grid">
      <div class="form-group"><label class="form-label">First Name</label><input class="form-input" type="text" placeholder="Your name"/></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="your@email.com"/></div>
    </div>
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Treatment</label><select class="form-select"><option>Deep Restoration Massage</option><option>Sacred Botanicals Journey</option><option>Sound Bath Meditation</option></select></div>
      <div class="form-group"><label class="form-label">Date</label><input class="form-input" type="date"/></div>
    </div>
    <button class="form-submit" onclick="alert('Our wellness advisor will confirm within 2 hours.')">Request Booking</button>
  </div>
</section>
<footer>
  <div class="foot-logo">Serenity</div>
  <div class="foot-links"><a href="#">Treatments</a><a href="#">Memberships</a><a href="#">Gift Cards</a><a href="#">Contact</a></div>
  <div class="foot-copy">© 2024 Serenity Luxury Spa. All rights reserved.</div>
</footer>
<script>
const pc=document.getElementById('particles');
for(let i=0;i<25;i++){const p=document.createElement('div');const size=Math.random()*3+1;p.style.cssText='position:absolute;width:'+size+'px;height:'+size+'px;background:#7fb5a0;border-radius:50%;left:'+(Math.random()*100)+'%;bottom:0;animation:particleRise '+(Math.random()*20+10)+'s linear '+(Math.random()*15)+'s infinite;opacity:0;';pc.appendChild(p);}
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>80);});
const steps=document.querySelectorAll('.ritual-step');
const obs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*150);});},{threshold:0.2});
steps.forEach(s=>obs.observe(s));
</script>
</body></html>`
  },
  {
    id: 'startup',
    name: 'Nexus AI Platform',
    category: 'Tech / SaaS',
    catColor: '#6366f1',
    catBg: 'rgba(99,102,241,0.12)',
    desc: 'Futuristic AI SaaS with neon grid background, glitch title, live terminal animation and animated counters',
    tags: ['Neon Grid', 'Glitch FX', 'Terminal', 'Counter Anim'],
    liveUrl: 'https://zaterbusiness.github.io/nexus-ai/',
    heroImg: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
     preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0c0906;color:#f0e6d3;font-family:'Georgia',serif;overflow-x:hidden;width:100%;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
nav{padding:10px 18px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(212,99,58,0.2);background:rgba(12,9,6,0.95)}
.logo{font-size:15px;letter-spacing:5px;color:#d4633a;text-transform:uppercase;font-weight:bold}
.nav-links a{color:rgba(240,230,211,0.6);font-size:8px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;margin-left:12px}
.hero{height:220px;position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:20px}
.hero-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80');background-size:cover;background-position:center;filter:brightness(0.35);}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(12,9,6,0.95) 0%,rgba(12,9,6,0.2) 70%);}
.hero-content{position:relative;z-index:2;}
.hero-tag{font-size:7px;letter-spacing:4px;color:#d4633a;text-transform:uppercase;margin-bottom:8px}
.hero-title{font-size:26px;font-weight:300;letter-spacing:4px;color:#f0e6d3;line-height:1}
.hero-sub{font-size:8px;color:rgba(240,230,211,0.5);letter-spacing:3px;margin-top:6px;text-transform:uppercase}
.marquee-wrap{background:#0a0705;border-top:1px solid rgba(212,99,58,0.15);padding:7px 0;overflow:hidden;white-space:nowrap}
.marquee-content{display:inline-flex;animation:marquee 18s linear infinite}
.mq-item{font-size:8px;letter-spacing:3px;color:rgba(212,99,58,0.5);text-transform:uppercase;padding:0 20px}
.menu{padding:12px 16px;background:#090705}
.menu-title{font-size:8px;letter-spacing:4px;color:#d4633a;text-transform:uppercase;margin-bottom:10px;text-align:center}
.menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.menu-card{position:relative;overflow:hidden;border:1px solid rgba(212,99,58,0.15)}
.menu-img{width:100%;height:90px;object-fit:cover;filter:brightness(0.7)}
.menu-info{position:absolute;bottom:0;left:0;right:0;padding:8px;background:linear-gradient(to top,rgba(12,9,6,0.95),transparent)}
.menu-name{font-size:9px;letter-spacing:1px;color:#f0e6d3;font-weight:bold}
.menu-price{font-size:8px;color:#d4633a;margin-top:2px}
.chef{display:grid;grid-template-columns:1fr 1fr;margin-top:6px;background:#0c0906}
.chef-img{height:120px;object-fit:cover;width:100%;filter:brightness(0.7)}
.chef-text{padding:14px;display:flex;flex-direction:column;justify-content:center;background:#0a0705}
.chef-label{font-size:7px;letter-spacing:3px;color:#d4633a;text-transform:uppercase;margin-bottom:6px}
.chef-name{font-size:13px;font-weight:300;letter-spacing:2px;color:#f0e6d3}
.chef-bio{font-size:8px;color:rgba(240,230,211,0.4);line-height:1.7;margin-top:6px}
.reserve{padding:12px 16px;background:#0a0705;text-align:center}
.reserve-title{font-size:11px;font-weight:300;letter-spacing:3px;color:#f0e6d3;margin-bottom:8px}
.reserve-btn{background:#d4633a;color:#0c0906;border:none;padding:8px 24px;font-size:8px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-weight:bold}
</style></head><body>
<nav><div class="logo">Ember & Gold</div><div><a href="#">Menu</a><a href="#">Reserve</a><a href="#">About</a></div></nav>
<div class="hero">
  <div class="hero-img"></div><div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-tag">Est. 2018 · Chennai</div>
    <div class="hero-title">WHERE FIRE<br/>MEETS FINESSE</div>
    <div class="hero-sub">Contemporary Indian Fine Dining</div>
  </div>
</div>
<div class="marquee-wrap">
  <div class="marquee-content">
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span>
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span>
  </div>
</div>
<div class="menu">
  <div class="menu-title">Signature Dishes</div>
  <div class="menu-grid">
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80" alt=""/><div class="menu-info"><div class="menu-name">Lamb Raan</div><div class="menu-price">₹2,800</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" alt=""/><div class="menu-info"><div class="menu-name">Lobster Bisque</div><div class="menu-price">₹1,600</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&q=80" alt=""/><div class="menu-info"><div class="menu-name">Truffle Biryani</div><div class="menu-price">₹3,200</div></div></div>
  </div>
</div>
<div class="chef">
  <img class="chef-img" src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80" alt="Chef"/>
  <div class="chef-text">
    <div class="chef-label">Head Chef</div>
    <div class="chef-name">Arjun Mehta</div>
    <div class="chef-bio">Trained at Le Cordon Bleu, Paris. 15 years of redefining Indian cuisine with French technique and local soul.</div>
  </div>
</div>
<div class="reserve">
  <div class="reserve-title">Make a Reservation</div>
  <button class="reserve-btn">Book Your Table</button>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Ember & Gold — Fine Dining</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--ember:#d4633a;--ember2:#e8845a;--gold:#c9a84c;--dark:#0c0906;--darker:#080503;--cream:#f0e6d3;--muted:rgba(240,230,211,0.5);}
html{scroll-behavior:smooth;}
body{background:var(--dark);color:var(--cream);font-family:'Cormorant Garamond',serif;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:var(--ember);}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes flicker{0%,100%{opacity:1}92%{opacity:0.85}95%{opacity:1}97%{opacity:0.9}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:20px 60px;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s;}
.nav.scrolled{background:rgba(8,5,3,0.96);backdrop-filter:blur(20px);padding:14px 60px;border-bottom:1px solid rgba(212,99,58,0.2);}
.nav-logo{font-size:22px;letter-spacing:6px;color:var(--ember);text-transform:uppercase;animation:flicker 8s ease-in-out infinite;}
.nav-logo span{font-style:italic;color:var(--gold);}
.nav-links{display:flex;gap:40px;align-items:center;}
.nav-links a{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:var(--muted);text-decoration:none;text-transform:uppercase;transition:color 0.3s;}
.nav-links a:hover{color:var(--ember);}
.nav-reserve{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;background:var(--ember);color:var(--dark);border:none;padding:11px 28px;cursor:pointer;transition:all 0.3s;font-weight:600;}
.nav-reserve:hover{background:var(--ember2);transform:translateY(-1px);}
.hero{min-height:100vh;position:relative;display:flex;align-items:flex-end;padding:80px 60px;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90');background-size:cover;background-position:center;transform:scale(1.04);transition:transform 12s ease;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,5,3,0.97) 0%,rgba(8,5,3,0.5) 50%,rgba(8,5,3,0.15) 100%);}
.hero-particles{position:absolute;inset:0;pointer-events:none;}
.ember-particle{position:absolute;border-radius:50%;background:var(--ember);filter:blur(1px);}
.hero-content{position:relative;z-index:2;max-width:700px;}
.hero-eyebrow{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:6px;color:var(--ember);text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center;gap:16px;animation:fadeUp 1s ease 0.3s both;}
.hero-eyebrow::before{content:'';width:40px;height:1px;background:var(--ember);}
.hero-title{font-size:clamp(52px,9vw,110px);font-weight:300;line-height:0.9;letter-spacing:4px;color:var(--cream);text-transform:uppercase;margin-bottom:20px;animation:fadeUp 1s ease 0.5s both;}
.hero-title em{font-style:italic;color:var(--ember);}
.hero-desc{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--muted);line-height:2;max-width:440px;margin-bottom:40px;animation:fadeUp 1s ease 0.7s both;}
.hero-btns{display:flex;gap:16px;animation:fadeUp 1s ease 0.9s both;}
.btn-ember{background:var(--ember);color:var(--dark);border:none;padding:16px 44px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;font-weight:600;}
.btn-ember:hover{background:var(--ember2);transform:translateY(-2px);box-shadow:0 8px 32px rgba(212,99,58,0.4);}
.btn-ghost{background:transparent;color:var(--cream);border:1px solid rgba(240,230,211,0.3);padding:16px 44px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
.btn-ghost:hover{border-color:var(--ember);color:var(--ember);}
.hero-awards{position:absolute;right:60px;bottom:80px;z-index:2;display:flex;flex-direction:column;gap:16px;animation:fadeUp 1s ease 1.1s both;}
.award-item{display:flex;align-items:center;gap:10px;font-family:'Montserrat',sans-serif;font-size:10px;color:var(--muted);letter-spacing:1px;}
.award-dot{width:6px;height:6px;border-radius:50%;background:var(--ember);}
.marquee{overflow:hidden;border-top:1px solid rgba(212,99,58,0.1);border-bottom:1px solid rgba(212,99,58,0.1);padding:12px 0;background:rgba(8,5,3,0.8);}
.marquee-inner{display:inline-flex;white-space:nowrap;animation:marquee 22s linear infinite;}
.mq-item{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:4px;color:rgba(212,99,58,0.5);text-transform:uppercase;padding:0 32px;}
.menu-section{padding:100px 60px;background:var(--dark);}
.sec-eyebrow{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:5px;color:var(--ember);text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:20px;}
.sec-eyebrow::before,.sec-eyebrow::after{content:'';width:36px;height:1px;background:var(--ember);}
.sec-title{font-size:clamp(28px,5vw,52px);font-weight:300;color:var(--cream);letter-spacing:4px;text-align:center;margin-bottom:16px;}
.sec-sub{font-family:'Montserrat',sans-serif;font-size:12px;color:var(--muted);text-align:center;letter-spacing:2px;margin-bottom:60px;}
.menu-tabs{display:flex;justify-content:center;gap:0;margin-bottom:48px;border-bottom:1px solid rgba(212,99,58,0.15);}
.menu-tab{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:var(--muted);text-transform:uppercase;padding:12px 28px;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.3s;}
.menu-tab.active,.menu-tab:hover{color:var(--ember);border-bottom-color:var(--ember);}
.menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.menu-card{position:relative;overflow:hidden;cursor:pointer;}
.menu-img{width:100%;height:320px;object-fit:cover;display:block;transition:transform 0.6s ease;filter:brightness(0.8);}
.menu-card:hover .menu-img{transform:scale(1.06);filter:brightness(0.65);}
.menu-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,5,3,0.95) 0%,transparent 55%);}
.menu-info{position:absolute;bottom:0;left:0;right:0;padding:24px;}
.menu-cat{font-family:'Montserrat',sans-serif;font-size:8px;letter-spacing:3px;color:var(--ember);text-transform:uppercase;margin-bottom:6px;}
.menu-name{font-size:22px;font-weight:300;letter-spacing:2px;color:var(--cream);margin-bottom:4px;}
.menu-desc{font-family:'Montserrat',sans-serif;font-size:11px;color:var(--muted);opacity:0;transition:opacity 0.3s;margin-bottom:8px;}
.menu-card:hover .menu-desc{opacity:1;}
.menu-price{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--ember);letter-spacing:1px;}
.chef-section{padding:100px 60px;background:var(--darker);display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:600px;}
.chef-img-wrap{position:relative;overflow:hidden;}
.chef-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(0.75);transition:transform 8s ease;}
.chef-img-wrap:hover img{transform:scale(1.04);}
.chef-badge{position:absolute;top:32px;left:32px;background:var(--ember);color:var(--dark);padding:10px 20px;font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;font-weight:600;}
.chef-content{padding:80px 60px;display:flex;flex-direction:column;justify-content:center;}
.chef-quote{font-size:clamp(20px,3vw,32px);font-weight:300;font-style:italic;color:var(--cream);line-height:1.5;margin-bottom:32px;}
.chef-quote span{color:var(--ember);}
.chef-name{font-size:20px;letter-spacing:4px;color:var(--cream);margin-bottom:6px;text-transform:uppercase;}
.chef-title{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:3px;color:var(--ember);text-transform:uppercase;margin-bottom:24px;}
.chef-bio{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--muted);line-height:2;}
.chef-awards{display:flex;flex-direction:column;gap:12px;margin-top:32px;}
.ca{display:flex;align-items:center;gap:12px;font-family:'Montserrat',sans-serif;font-size:11px;color:var(--muted);}
.ca-dot{width:4px;height:4px;border-radius:50%;background:var(--ember);flex-shrink:0;}
.ambiance{padding:100px 60px;background:var(--dark);}
.amb-grid{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:250px 250px;gap:4px;margin-top:60px;}
.a1{grid-column:span 7;grid-row:span 2;background-size:cover;background-position:center;transition:transform 0.5s;}
.a2{grid-column:span 5;background-size:cover;background-position:center;}
.a3{grid-column:span 3;background-size:cover;background-position:center;}
.a4{grid-column:span 2;background-size:cover;background-position:center;}
.a1:hover,.a2:hover,.a3:hover,.a4:hover{transform:scale(1.02);}
.reservation{padding:100px 60px;background:var(--darker);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.res-left h2{font-size:clamp(32px,4vw,52px);font-weight:300;letter-spacing:4px;color:var(--cream);margin-bottom:20px;}
.res-left p{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--muted);line-height:2;}
.res-features{margin-top:28px;display:flex;flex-direction:column;gap:12px;}
.res-feat{display:flex;align-items:center;gap:12px;font-family:'Montserrat',sans-serif;font-size:12px;color:rgba(240,230,211,0.7);}
.rf-dot{width:4px;height:4px;background:var(--ember);border-radius:50%;}
.res-form{background:rgba(212,99,58,0.04);border:1px solid rgba(212,99,58,0.15);padding:48px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.form-group{display:flex;flex-direction:column;gap:8px;}
.form-label{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;color:rgba(212,99,58,0.7);text-transform:uppercase;}
.form-input,.form-select{background:rgba(212,99,58,0.05);border:1px solid rgba(212,99,58,0.2);color:var(--cream);padding:13px 16px;font-family:'Cormorant Garamond',serif;font-size:15px;outline:none;transition:border-color 0.3s;width:100%;}
.form-input:focus,.form-select:focus{border-color:var(--ember);}
.form-select option{background:var(--darker);}
.form-submit{width:100%;background:var(--ember);color:var(--dark);border:none;padding:16px;font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;font-weight:600;margin-top:8px;}
.form-submit:hover{background:var(--ember2);}
.testimonials{padding:100px 60px;background:var(--dark);text-align:center;}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;}
.testi-card{background:var(--darker);padding:48px 36px;border:1px solid rgba(212,99,58,0.08);transition:all 0.3s;position:relative;}
.testi-card::before{content:'"';position:absolute;top:16px;left:24px;font-size:64px;color:var(--ember);opacity:0.15;line-height:1;}
.testi-card:hover{border-color:rgba(212,99,58,0.3);transform:translateY(-4px);}
.testi-stars{color:var(--ember);font-size:14px;margin-bottom:20px;letter-spacing:3px;}
.testi-text{font-size:16px;color:rgba(240,230,211,0.75);line-height:1.9;font-style:italic;margin-bottom:24px;}
.testi-name{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:3px;color:var(--ember);text-transform:uppercase;}
footer{background:#040200;border-top:1px solid rgba(212,99,58,0.1);padding:60px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px;}
.foot-logo{font-size:26px;letter-spacing:6px;color:var(--ember);text-transform:uppercase;margin-bottom:12px;}
.foot-tagline{font-family:'Montserrat',sans-serif;font-size:11px;color:var(--muted);letter-spacing:2px;}
.foot-col-title{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:4px;color:rgba(212,99,58,0.6);text-transform:uppercase;margin-bottom:20px;}
.foot-col-links{display:flex;flex-direction:column;gap:12px;}
.foot-col-links a{font-family:'Montserrat',sans-serif;font-size:12px;color:var(--muted);text-decoration:none;transition:color 0.3s;}
.foot-col-links a:hover{color:var(--ember);}
.foot-bottom{background:#020100;padding:20px 60px;display:flex;justify-content:space-between;border-top:1px solid rgba(212,99,58,0.06);}
.foot-copy{font-family:'Montserrat',sans-serif;font-size:10px;color:rgba(240,230,211,0.2);letter-spacing:1px;}
@media(max-width:900px){.nav{padding:16px 20px;}.hero{padding:80px 24px 40px;}.menu-grid{grid-template-columns:1fr;}.chef-section,.reservation{grid-template-columns:1fr;}.menu-section,.chef-section,.reservation,.testimonials,.ambiance{padding:60px 24px;}footer{grid-template-columns:1fr 1fr;padding:40px 24px;}}
</style>
</head>
<body>
<nav class="nav" id="nav">
  <div class="nav-logo">Ember <span>&</span> Gold</div>
  <div class="nav-links">
    <a href="#menu">Menu</a><a href="#chef">Chef</a><a href="#ambiance">Ambiance</a><a href="#reservation">Reserve</a>
  </div>
  <button class="nav-reserve" onclick="document.getElementById('reservation').scrollIntoView({behavior:'smooth'})">Book Table</button>
</nav>
<section class="hero">
  <div class="hero-bg" id="heroBg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-particles" id="particles"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Est. 2018 · Chennai, India</div>
    <h1 class="hero-title">Where Fire<br/>Meets <em>Finesse</em></h1>
    <p class="hero-desc">Contemporary Indian fine dining. Ancient spices reimagined through the lens of French technique and modern artistry.</p>
    <div class="hero-btns">
      <button class="btn-ember" onclick="document.getElementById('reservation').scrollIntoView({behavior:'smooth'})">Reserve a Table</button>
      <button class="btn-ghost" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">View Menu</button>
    </div>
  </div>
  <div class="hero-awards">
    <div class="award-item"><div class="award-dot"></div>Michelin Star 2022–2024</div>
    <div class="award-item"><div class="award-dot"></div>Asia's 50 Best 2023</div>
    <div class="award-item"><div class="award-dot"></div>Times Food Award 2023</div>
  </div>
</section>
<div class="marquee">
  <div class="marquee-inner">
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span><span class="mq-item">Private Dining Rooms ◆</span>
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span><span class="mq-item">Private Dining Rooms ◆</span>
  </div>
</div>
<section class="menu-section" id="menu">
  <div class="sec-eyebrow">Our Menu</div>
  <h2 class="sec-title">Signature Creations</h2>
  <p class="sec-sub">Each dish is a canvas of memory, fire, and precision</p>
  <div class="menu-tabs">
    <div class="menu-tab active">Mains</div><div class="menu-tab">Starters</div><div class="menu-tab">Desserts</div><div class="menu-tab">Tasting Menu</div>
  </div>
  <div class="menu-grid">
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=85" alt="Lamb Raan"/><div class="menu-overlay"></div><div class="menu-info"><div class="menu-cat">Slow Roasted</div><div class="menu-name">48-Hour Lamb Raan</div><div class="menu-desc">Bone-in leg slow-cooked in tandoor with rose petal jus</div><div class="menu-price">₹2,800</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=85" alt="Lobster"/><div class="menu-overlay"></div><div class="menu-info"><div class="menu-cat">From the Sea</div><div class="menu-name">Malabar Lobster Bisque</div><div class="menu-desc">Coconut-infused broth, Kerala spices, edible gold</div><div class="menu-price">₹1,600</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&q=85" alt="Truffle"/><div class="menu-overlay"></div><div class="menu-info"><div class="menu-cat">Vegetarian</div><div class="menu-name">Black Truffle Biryani</div><div class="menu-desc">Aged basmati, fresh truffle shavings, saffron crown</div><div class="menu-price">₹3,200</div></div></div>
  </div>
</section>
<section class="chef-section" id="chef">
  <div class="chef-img-wrap"><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=90" alt="Chef Arjun Mehta"/><div class="chef-badge">Head Chef</div></div>
  <div class="chef-content">
    <p class="chef-quote">"Every dish is a <span>conversation</span> — between fire and memory, between the soil and the sea."</p>
    <div class="chef-name">Arjun Mehta</div>
    <div class="chef-title">Executive Chef & Co-Founder</div>
    <p class="chef-bio">Trained at Le Cordon Bleu, Paris and staged at Noma, Copenhagen. Chef Arjun spent 15 years redefining modern Indian cuisine before founding Ember & Gold in 2018.</p>
    <div class="chef-awards">
      <div class="ca"><div class="ca-dot"></div>Le Cordon Bleu, Paris — Grand Diplôme</div>
      <div class="ca"><div class="ca-dot"></div>Staged at Noma & El Bulli</div>
      <div class="ca"><div class="ca-dot"></div>Forbes 30 Under 30 — Food & Beverage</div>
    </div>
  </div>
</section>
<section class="ambiance" id="ambiance">
  <div class="sec-eyebrow">The Space</div>
  <h2 class="sec-title">Our Ambiance</h2>
  <p class="sec-sub">Where architecture becomes part of the dining experience</p>
  <div class="amb-grid">
    <div class="a1" style="background-image:url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=85')"></div>
    <div class="a2" style="background-image:url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=85')"></div>
    <div class="a3" style="background-image:url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=500&q=85')"></div>
    <div class="a4" style="background-image:url('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=85')"></div>
  </div>
</section>
<section class="reservation" id="reservation">
  <div class="res-left">
    <div class="sec-eyebrow" style="justify-content:flex-start;margin-bottom:20px">Reservations</div>
    <h2>Reserve<br/>Your Evening</h2>
    <p>Dinner at Ember & Gold is an experience, not just a meal. Reservations are recommended 2 weeks in advance for weekends.</p>
    <div class="res-features">
      <div class="res-feat"><div class="rf-dot"></div>Chef's table available upon request</div>
      <div class="res-feat"><div class="rf-dot"></div>Private dining rooms for groups</div>
      <div class="res-feat"><div class="rf-dot"></div>Vegetarian & Jain menus available</div>
      <div class="res-feat"><div class="rf-dot"></div>Wine sommelier on request</div>
    </div>
  </div>
  <div class="res-form">
    <div class="form-row">
      <div class="form-group"><label class="form-label">Date</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Time</label><select class="form-select"><option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Guests</label><select class="form-select"><option>1</option><option>2</option><option>3–4</option><option>5–6</option><option>7+</option></select></div>
      <div class="form-group"><label class="form-label">Occasion</label><select class="form-select"><option>Dinner</option><option>Anniversary</option><option>Birthday</option><option>Business</option></select></div>
    </div>
    <div class="form-group" style="margin-bottom:20px"><label class="form-label">Your Name</label><input type="text" class="form-input" placeholder="Full name"/></div>
    <div class="form-group" style="margin-bottom:0"><label class="form-label">Phone</label><input type="tel" class="form-input" placeholder="+91 00000 00000"/></div>
    <button class="form-submit" onclick="alert('Reservation request received. We will confirm within 2 hours.')">Confirm Reservation</button>
  </div>
</section>
<section class="testimonials">
  <div class="sec-eyebrow">Guest Experiences</div>
  <h2 class="sec-title">What They Say</h2>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"The 48-hour lamb raan was the finest piece of meat I've had anywhere in Asia. Chef Arjun is a genius."</p><div class="testi-name">Priya Krishnamurthy · Mumbai</div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"An experience that transcends dining. The black truffle biryani had me close my eyes with every bite."</p><div class="testi-name">James Chen · Singapore</div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"The chef's table experience was unforgettable. Every course told a story of India I had never heard before."</p><div class="testi-name">Anika Sharma · Delhi</div></div>
  </div>
</section>
<footer>
  <div><div class="foot-logo">Ember & Gold</div><div class="foot-tagline">Where Fire Meets Finesse</div></div>
  <div><div class="foot-col-title">Explore</div><div class="foot-col-links"><a href="#">Menu</a><a href="#">Chef's Table</a><a href="#">Wine List</a><a href="#">Private Dining</a></div></div>
  <div><div class="foot-col-title">Visit</div><div class="foot-col-links"><a href="#">Location</a><a href="#">Hours</a><a href="#">Parking</a><a href="#">Dress Code</a></div></div>
  <div><div class="foot-col-title">Connect</div><div class="foot-col-links"><a href="#">Instagram</a><a href="#">Press</a><a href="#">Gift Cards</a><a href="#">Contact</a></div></div>
</footer>
<div class="foot-bottom"><div class="foot-copy">© 2024 Ember & Gold · 14 Nungambakkam High Rd, Chennai</div><div class="foot-copy">Tue–Sun · 6PM–11PM</div></div>
<script>
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80));
const pc=document.getElementById('particles');
for(let i=0;i<20;i++){const p=document.createElement('div');p.className='ember-particle';const size=Math.random()*4+1;p.style.cssText='position:absolute;width:'+size+'px;height:'+size+'px;left:'+(Math.random()*100)+'%;bottom:'+(Math.random()*30)+'%;opacity:'+(Math.random()*0.4)+';animation:float '+(Math.random()*6+4)+'s ease-in-out '+(Math.random()*5)+'s infinite;';pc.appendChild(p);}
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.animation='fadeUp 0.8s ease forwards';e.target.style.opacity='1';}});},{threshold:0.1});
document.querySelectorAll('.menu-card,.testi-card').forEach(el=>{el.style.opacity='0';obs.observe(el);});
document.querySelectorAll('.menu-tab').forEach(tab=>{tab.addEventListener('click',()=>{document.querySelectorAll('.menu-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');});});
</script>
</body></html>`
  },

  // ── 6. LUXURY E-COMMERCE ─────────────────────────────────
  {
    id: 'ecommerce',
    name: 'Velvet Shop',
    category: 'E-Commerce',
    catColor: '#9b59b6',
    catBg: 'rgba(155,89,182,0.1)',
    desc: 'Premium e-commerce store with product showcase, cart animations, and rich category navigation',
    tags: ['Product Cards', 'Cart', 'Filters', 'Wishlist'],
    preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0d0a12;color:#f0ebf8;font-family:'Helvetica Neue',sans-serif;overflow-x:hidden;width:100%;}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
nav{padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(155,89,182,0.2);background:rgba(13,10,18,0.98)}
.logo{font-size:14px;font-weight:100;letter-spacing:8px;color:#f0ebf8;text-transform:uppercase}
.logo span{color:#9b59b6}
.nav-right{display:flex;gap:14px;align-items:center}
.nav-icon{font-size:14px;color:rgba(240,235,248,0.6);position:relative}
.cart-badge{position:absolute;top:-6px;right:-6px;width:14px;height:14px;border-radius:50%;background:#9b59b6;font-size:7px;display:flex;align-items:center;justify-content:center;color:#fff}
.banner{background:linear-gradient(135deg,#9b59b6,#6c3483);padding:7px;text-align:center;font-size:8px;letter-spacing:3px;color:rgba(255,255,255,0.8);text-transform:uppercase}
.hero{display:grid;grid-template-columns:1fr 1fr;height:200px}
.hero-left{background:#120e1a;padding:20px;display:flex;flex-direction:column;justify-content:center}
.hero-eyebrow{font-size:7px;letter-spacing:4px;color:#9b59b6;text-transform:uppercase;margin-bottom:8px}
.hero-title{font-size:22px;font-weight:100;letter-spacing:3px;color:#f0ebf8;line-height:1.1}
.hero-title strong{color:#9b59b6;font-weight:300}
.hero-sub{font-size:8px;color:rgba(240,235,248,0.4);letter-spacing:2px;margin-top:8px}
.hero-btn{background:#9b59b6;color:#fff;border:none;padding:7px 18px;font-size:8px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;margin-top:12px;display:inline-block;width:fit-content}
.hero-right{position:relative;overflow:hidden}
.hero-right-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80');background-size:cover;background-position:center top;}
.cats{display:flex;gap:4px;padding:8px 12px;background:#0a0710;overflow-x:auto}
.cat{flex-shrink:0;position:relative;overflow:hidden;width:80px}
.cat-img{width:80px;height:60px;object-fit:cover;filter:brightness(0.6)}
.cat-name{position:absolute;bottom:4px;left:4px;font-size:7px;letter-spacing:1px;color:#fff;text-transform:uppercase;font-weight:bold}
.products{padding:10px 12px;background:#0d0a12}
.prod-label{font-size:8px;letter-spacing:3px;color:#9b59b6;text-transform:uppercase;margin-bottom:8px}
.prod-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.prod-card{background:#120e1a;border:1px solid rgba(155,89,182,0.1);overflow:hidden;position:relative}
.prod-img{width:100%;height:80px;object-fit:cover;filter:brightness(0.85)}
.prod-badge{position:absolute;top:6px;left:6px;background:#9b59b6;color:#fff;font-size:6px;padding:2px 6px;letter-spacing:1px;text-transform:uppercase}
.prod-body{padding:6px}
.prod-name{font-size:9px;color:#f0ebf8;font-weight:bold;margin-bottom:2px}
.prod-price{font-size:8px;color:#9b59b6}
.prod-old{font-size:7px;color:rgba(240,235,248,0.3);text-decoration:line-through;margin-left:4px}
</style></head><body>
<div class="banner">✦ FREE SHIPPING ON ORDERS ABOVE ₹2,999 · USE CODE VELVET20 FOR 20% OFF ✦</div>
<nav><div class="logo">VELVET<span>.</span></div><div class="nav-right"><div class="nav-icon">♡</div><div class="nav-icon">🔍</div><div class="nav-icon" style="position:relative">🛍<div class="cart-badge">3</div></div></div></nav>
<div class="hero">
  <div class="hero-left">
    <div class="hero-eyebrow">New Season · SS 2024</div>
    <div class="hero-title">Dress to<br/><strong>Obsess</strong></div>
    <div class="hero-sub">Curated luxury, delivered</div>
    <div class="hero-btn">Shop Now</div>
  </div>
  <div class="hero-right"><div class="hero-right-img"></div></div>
</div>
<div class="cats">
  <div class="cat"><img class="cat-img" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=160&q=70" alt=""/><div class="cat-name">Dresses</div></div>
  <div class="cat"><img class="cat-img" src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=160&q=70" alt=""/><div class="cat-name">Bags</div></div>
  <div class="cat"><img class="cat-img" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=160&q=70" alt=""/><div class="cat-name">Jackets</div></div>
  <div class="cat"><img class="cat-img" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&q=70" alt=""/><div class="cat-name">Shoes</div></div>
  <div class="cat"><img class="cat-img" src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=160&q=70" alt=""/><div class="cat-name">Jewellery</div></div>
</div>
<div class="products">
  <div class="prod-label">Trending Now</div>
  <div class="prod-grid">
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200&q=75" alt=""/><div class="prod-badge">New</div><div class="prod-body"><div class="prod-name">Silk Wrap Dress</div><div><span class="prod-price">₹8,499</span><span class="prod-old">₹12,000</span></div></div></div>
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=75" alt=""/><div class="prod-body"><div class="prod-name">Mini Chain Bag</div><div><span class="prod-price">₹14,999</span></div></div></div>
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=75" alt=""/><div class="prod-badge">Sale</div><div class="prod-body"><div class="prod-name">Block Heels</div><div><span class="prod-price">₹5,999</span><span class="prod-old">₹9,000</span></div></div></div>
    <div class="prod-card"><img class="prod-img" src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&q=75" alt=""/><div class="prod-body"><div class="prod-name">Gold Cuff Set</div><div><span class="prod-price">₹3,299</span></div></div></div>
  </div>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>VELVET — Premium Fashion Store</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--purple:#9b59b6;--purple2:#8e44ad;--dark-purple:#6c3483;--dark:#0d0a12;--panel:#120e1a;--cream:#f0ebf8;--muted:rgba(240,235,248,0.5);}
html{scroll-behavior:smooth;}
body{background:var(--dark);color:var(--cream);font-family:'Inter',sans-serif;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:var(--purple);}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideRight{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.announcement{background:linear-gradient(135deg,var(--dark-purple),var(--purple));padding:10px;text-align:center;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.85);text-transform:uppercase;font-family:'Inter',sans-serif;}
.announcement span{color:#f8c8ff;}
.nav{position:sticky;top:0;z-index:1000;background:rgba(13,10,18,0.98);backdrop-filter:blur(20px);border-bottom:1px solid rgba(155,89,182,0.15);padding:16px 60px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-size:26px;font-weight:100;letter-spacing:10px;color:var(--cream);text-transform:uppercase;}
.nav-logo span{color:var(--purple);}
.nav-cats{display:flex;gap:32px;}
.nav-cats a{font-size:11px;letter-spacing:2px;color:var(--muted);text-decoration:none;text-transform:uppercase;transition:color 0.2s;}
.nav-cats a:hover{color:var(--cream);}
.nav-icons{display:flex;gap:20px;align-items:center;}
.nav-icon-btn{background:none;border:none;cursor:pointer;color:var(--muted);font-size:16px;transition:color 0.2s;position:relative;}
.nav-icon-btn:hover{color:var(--cream);}
.cart-count{position:absolute;top:-8px;right:-8px;width:18px;height:18px;border-radius:50%;background:var(--purple);font-size:9px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;}
.hero{display:grid;grid-template-columns:1fr 1fr;min-height:90vh;}
.hero-left{background:var(--panel);padding:80px 60px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
.hero-left-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 70%,rgba(155,89,182,0.08),transparent);}
.hero-eyebrow{font-size:10px;letter-spacing:5px;color:var(--purple);text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center;gap:14px;animation:fadeUp 0.8s ease 0.2s both;}
.hero-eyebrow::before{content:'';width:30px;height:1px;background:var(--purple);}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(44px,7vw,88px);font-weight:300;line-height:0.95;color:var(--cream);margin-bottom:24px;animation:fadeUp 0.8s ease 0.4s both;}
.hero-title em{font-style:italic;color:var(--purple);}
.hero-desc{font-size:13px;color:var(--muted);line-height:1.8;max-width:380px;margin-bottom:40px;animation:fadeUp 0.8s ease 0.6s both;}
.hero-btns{display:flex;gap:14px;animation:fadeUp 0.8s ease 0.8s both;}
.btn-purple{background:var(--purple);color:#fff;border:none;padding:16px 40px;font-size:12px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;font-family:'Inter',sans-serif;}
.btn-purple:hover{background:var(--purple2);transform:translateY(-2px);}
.btn-ghost{background:transparent;color:var(--cream);border:1px solid rgba(240,235,248,0.25);padding:16px 40px;font-size:12px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.3s;}
.btn-ghost:hover{border-color:var(--purple);}
.hero-right{position:relative;overflow:hidden;}
.hero-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=90');background-size:cover;background-position:center top;transition:transform 10s ease;}
.hero-right:hover .hero-img{transform:scale(1.05);}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to right,rgba(18,14,26,0.4),transparent);}
.hero-badge{position:absolute;bottom:40px;right:40px;background:var(--purple);color:#fff;padding:16px 20px;text-align:center;}
.hero-badge-num{font-size:28px;font-weight:300;display:block;}
.hero-badge-label{font-size:9px;letter-spacing:3px;text-transform:uppercase;}
.marquee{overflow:hidden;border-top:1px solid rgba(155,89,182,0.1);border-bottom:1px solid rgba(155,89,182,0.1);padding:12px 0;background:var(--panel);}
.marquee-inner{display:inline-flex;white-space:nowrap;animation:marquee 20s linear infinite;}
.mq-item{font-size:11px;color:var(--muted);padding:0 28px;letter-spacing:2px;text-transform:uppercase;}
.mq-item span{color:var(--purple);}
.categories{padding:80px 60px;background:var(--dark);}
.sec-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:48px;}
.sec-eyebrow{font-size:10px;letter-spacing:4px;color:var(--purple);text-transform:uppercase;margin-bottom:8px;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,48px);font-weight:300;color:var(--cream);}
.sec-title em{font-style:italic;color:var(--purple);}
.view-all{font-size:11px;letter-spacing:2px;color:var(--purple);text-decoration:none;text-transform:uppercase;border-bottom:1px solid var(--purple);padding-bottom:2px;transition:opacity 0.2s;}
.view-all:hover{opacity:0.7;}
.cat-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
.cat-card{position:relative;overflow:hidden;cursor:pointer;}
.cat-card:first-child{grid-column:span 2;grid-row:span 2;}
.cat-img{width:100%;height:180px;object-fit:cover;display:block;filter:brightness(0.7);transition:transform 0.5s,filter 0.4s;}
.cat-card:first-child .cat-img{height:372px;}
.cat-card:hover .cat-img{transform:scale(1.06);filter:brightness(0.55);}
.cat-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,10,18,0.8) 0%,transparent 60%);}
.cat-info{position:absolute;bottom:0;left:0;right:0;padding:20px;}
.cat-name{font-size:14px;letter-spacing:3px;color:var(--cream);text-transform:uppercase;margin-bottom:4px;}
.cat-count{font-size:10px;color:var(--muted);letter-spacing:1px;}
.products{padding:80px 60px;background:var(--panel);}
.filter-bar{display:flex;gap:12px;margin-bottom:48px;flex-wrap:wrap;}
.filter-btn{font-size:11px;letter-spacing:2px;color:var(--muted);text-transform:uppercase;border:1px solid rgba(155,89,182,0.2);padding:8px 20px;cursor:pointer;transition:all 0.2s;background:transparent;}
.filter-btn.active,.filter-btn:hover{border-color:var(--purple);color:var(--cream);background:rgba(155,89,182,0.1);}
.prod-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.prod-card{position:relative;cursor:pointer;group:true;}
.prod-img-wrap{position:relative;overflow:hidden;margin-bottom:14px;}
.prod-img{width:100%;height:360px;object-fit:cover;display:block;filter:brightness(0.9);transition:transform 0.5s,filter 0.4s;}
.prod-card:hover .prod-img{transform:scale(1.04);filter:brightness(0.75);}
.prod-actions{position:absolute;bottom:16px;left:16px;right:16px;display:flex;gap:8px;transform:translateY(20px);opacity:0;transition:all 0.3s;}
.prod-card:hover .prod-actions{transform:translateY(0);opacity:1;}
.prod-action-btn{flex:1;background:rgba(13,10,18,0.9);color:var(--cream);border:1px solid rgba(155,89,182,0.3);padding:10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
.prod-action-btn:hover{background:var(--purple);}
.prod-wish{width:40px;background:rgba(13,10,18,0.9);border:1px solid rgba(155,89,182,0.3);color:var(--muted);cursor:pointer;font-size:14px;transition:all 0.2s;}
.prod-wish:hover{color:var(--purple);border-color:var(--purple);}
.prod-badge{position:absolute;top:12px;left:12px;font-size:9px;font-weight:600;padding:4px 10px;letter-spacing:1px;text-transform:uppercase;}
.badge-new{background:var(--purple);color:#fff;}
.badge-sale{background:#e74c3c;color:#fff;}
.prod-brand{font-size:10px;letter-spacing:2px;color:var(--purple);text-transform:uppercase;margin-bottom:4px;}
.prod-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:300;color:var(--cream);margin-bottom:8px;}
.prod-prices{display:flex;align-items:center;gap:10px;}
.prod-price{font-size:15px;font-weight:500;color:var(--cream);}
.prod-old-price{font-size:13px;color:var(--muted);text-decoration:line-through;}
.prod-discount{font-size:11px;color:#27ae60;font-weight:600;}
.prod-stars{font-size:11px;color:var(--purple);margin-top:6px;letter-spacing:1px;}
.featured{padding:80px 60px;background:var(--dark);display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:500px;}
.feat-img{position:relative;overflow:hidden;}
.feat-img img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(0.75);}
.feat-content{background:var(--panel);padding:80px 60px;display:flex;flex-direction:column;justify-content:center;}
.feat-eyebrow{font-size:10px;letter-spacing:4px;color:var(--purple);text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:12px;}
.feat-eyebrow::before{content:'';width:30px;height:1px;background:var(--purple);}
.feat-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,52px);font-weight:300;color:var(--cream);line-height:1.1;margin-bottom:20px;}
.feat-title em{font-style:italic;color:var(--purple);}
.feat-desc{font-size:13px;color:var(--muted);line-height:2;margin-bottom:32px;}
.newsletter{padding:80px 60px;background:linear-gradient(135deg,var(--dark-purple),var(--purple));text-align:center;}
.nl-title{font-family:'Playfair Display',serif;font-size:clamp(28px,5vw,52px);font-weight:300;color:#fff;margin-bottom:12px;}
.nl-sub{font-size:12px;color:rgba(255,255,255,0.6);letter-spacing:2px;margin-bottom:40px;}
.nl-form{display:flex;max-width:480px;margin:0 auto;gap:0;}
.nl-input{flex:1;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);color:#fff;padding:14px 20px;font-size:13px;font-family:'Inter',sans-serif;outline:none;}
.nl-input::placeholder{color:rgba(255,255,255,0.4);}
.nl-btn{background:#fff;color:var(--dark-purple);border:none;padding:14px 28px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;}
footer{background:#060310;border-top:1px solid rgba(155,89,182,0.1);padding:60px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px;}
.foot-logo{font-size:22px;font-weight:100;letter-spacing:8px;color:var(--cream);margin-bottom:12px;}
.foot-logo span{color:var(--purple);}
.foot-tagline{font-size:11px;color:var(--muted);line-height:1.8;}
.foot-col-title{font-size:9px;letter-spacing:3px;color:rgba(155,89,182,0.6);text-transform:uppercase;margin-bottom:20px;}
.foot-col-links{display:flex;flex-direction:column;gap:12px;}
.foot-col-links a{font-size:12px;color:var(--muted);text-decoration:none;transition:color 0.2s;}
.foot-col-links a:hover{color:var(--cream);}
.foot-bottom{background:#030108;padding:20px 60px;display:flex;justify-content:space-between;border-top:1px solid rgba(155,89,182,0.06);}
.foot-copy{font-size:10px;color:rgba(240,235,248,0.2);letter-spacing:1px;}
@media(max-width:1024px){.hero{grid-template-columns:1fr;}.hero-right{height:60vh;}.cat-grid{grid-template-columns:repeat(3,1fr);}.prod-grid{grid-template-columns:repeat(2,1fr);}.featured{grid-template-columns:1fr;}.categories,.products,.featured,.newsletter{padding:60px 24px;}footer{grid-template-columns:1fr 1fr;padding:40px 24px;}}
@media(max-width:600px){.nav{padding:14px 20px;}.cat-grid{grid-template-columns:repeat(2,1fr);}.cat-card:first-child{grid-column:span 2;}.prod-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<div class="announcement">✦ FREE SHIPPING ABOVE ₹2,999 &nbsp;·&nbsp; <span>USE VELVET20</span> FOR 20% OFF ✦</div>
<nav class="nav">
  <div class="nav-logo">VELVET<span>.</span></div>
  <div class="nav-cats">
    <a href="#">New In</a><a href="#">Dresses</a><a href="#">Bags</a><a href="#">Shoes</a><a href="#">Jewellery</a><a href="#">Sale</a>
  </div>
  <div class="nav-icons">
    <button class="nav-icon-btn">♡</button>
    <button class="nav-icon-btn">🔍</button>
    <button class="nav-icon-btn" style="position:relative">🛍<div class="cart-count">3</div></button>
  </div>
</nav>
<section class="hero">
  <div class="hero-left">
    <div class="hero-left-bg"></div>
    <div class="hero-eyebrow">New Season · SS 2024</div>
    <h1 class="hero-title">Dress to<br/><em>Obsess</em></h1>
    <p class="hero-desc">Curated luxury fashion from the world's most coveted designers. Delivered to your door in 48 hours.</p>
    <div class="hero-btns"><button class="btn-purple">Shop New In</button><button class="btn-ghost">View Lookbook</button></div>
  </div>
  <div class="hero-right">
    <div class="hero-img"></div>
    <div class="hero-overlay"></div>
    <div class="hero-badge"><span class="hero-badge-num">200+</span><span class="hero-badge-label">New Arrivals</span></div>
  </div>
</section>
<div class="marquee">
  <div class="marquee-inner">
    <span class="mq-item">Free Returns <span>·</span></span><span class="mq-item">Authenticity Guaranteed <span>·</span></span><span class="mq-item">48-Hour Delivery <span>·</span></span><span class="mq-item">COD Available <span>·</span></span><span class="mq-item">Secure Payment <span>·</span></span><span class="mq-item">EMI Options <span>·</span></span>
    <span class="mq-item">Free Returns <span>·</span></span><span class="mq-item">Authenticity Guaranteed <span>·</span></span><span class="mq-item">48-Hour Delivery <span>·</span></span><span class="mq-item">COD Available <span>·</span></span>
  </div>
</div>
<section class="categories">
  <div class="sec-header">
    <div><div class="sec-eyebrow">Browse By</div><h2 class="sec-title">Shop <em>Categories</em></h2></div>
    <a href="#" class="view-all">View All →</a>
  </div>
  <div class="cat-grid">
    <div class="cat-card"><img class="cat-img" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85" alt="Dresses"/><div class="cat-overlay"></div><div class="cat-info"><div class="cat-name">Dresses</div><div class="cat-count">248 Items</div></div></div>
    <div class="cat-card"><img class="cat-img" src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=85" alt="Bags"/><div class="cat-overlay"></div><div class="cat-info"><div class="cat-name">Bags</div><div class="cat-count">124 Items</div></div></div>
    <div class="cat-card"><img class="cat-img" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=85" alt="Shoes"/><div class="cat-overlay"></div><div class="cat-info"><div class="cat-name">Shoes</div><div class="cat-count">186 Items</div></div></div>
    <div class="cat-card"><img class="cat-img" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=85" alt="Jackets"/><div class="cat-overlay"></div><div class="cat-info"><div class="cat-name">Jackets</div><div class="cat-count">92 Items</div></div></div>
    <div class="cat-card"><img class="cat-img" src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=85" alt="Jewellery"/><div class="cat-overlay"></div><div class="cat-info"><div class="cat-name">Jewellery</div><div class="cat-count">320 Items</div></div></div>
  </div>
</section>
<section class="products">
  <div class="sec-header"><div><div class="sec-eyebrow">Trending</div><h2 class="sec-title">New <em>Arrivals</em></h2></div><a href="#" class="view-all">View All →</a></div>
  <div class="filter-bar">
    <button class="filter-btn active">All</button><button class="filter-btn">Dresses</button><button class="filter-btn">Bags</button><button class="filter-btn">Shoes</button><button class="filter-btn">Sale</button>
  </div>
  <div class="prod-grid">
    <div class="prod-card"><div class="prod-img-wrap"><img class="prod-img" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=85" alt="Silk Wrap"/><div class="prod-badge badge-new">New</div><div class="prod-actions"><button class="prod-action-btn" onclick="alert('Added to cart!')">Add to Cart</button><button class="prod-wish">♡</button></div></div><div class="prod-brand">VELVET Exclusive</div><div class="prod-name">Silk Wrap Dress</div><div class="prod-prices"><span class="prod-price">₹8,499</span><span class="prod-old-price">₹12,000</span><span class="prod-discount">-29%</span></div><div class="prod-stars">★★★★★ (48)</div></div>
    <div class="prod-card"><div class="prod-img-wrap"><img class="prod-img" src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85" alt="Chain Bag"/><div class="prod-actions"><button class="prod-action-btn" onclick="alert('Added to cart!')">Add to Cart</button><button class="prod-wish">♡</button></div></div><div class="prod-brand">Luxury Collection</div><div class="prod-name">Mini Chain Bag</div><div class="prod-prices"><span class="prod-price">₹14,999</span></div><div class="prod-stars">★★★★☆ (31)</div></div>
    <div class="prod-card"><div class="prod-img-wrap"><img class="prod-img" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85" alt="Block Heels"/><div class="prod-badge badge-sale">Sale</div><div class="prod-actions"><button class="prod-action-btn" onclick="alert('Added to cart!')">Add to Cart</button><button class="prod-wish">♡</button></div></div><div class="prod-brand">VELVET Footwear</div><div class="prod-name">Velvet Block Heels</div><div class="prod-prices"><span class="prod-price">₹5,999</span><span class="prod-old-price">₹9,000</span><span class="prod-discount">-33%</span></div><div class="prod-stars">★★★★★ (72)</div></div>
    <div class="prod-card"><div class="prod-img-wrap"><img class="prod-img" src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=85" alt="Gold Cuffs"/><div class="prod-actions"><button class="prod-action-btn" onclick="alert('Added to cart!')">Add to Cart</button><button class="prod-wish">♡</button></div></div><div class="prod-brand">Fine Jewellery</div><div class="prod-name">Gold Cuff Set</div><div class="prod-prices"><span class="prod-price">₹3,299</span></div><div class="prod-stars">★★★★☆ (19)</div></div>
  </div>
</section>
<section class="featured">
  <div class="feat-img"><img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=90" alt="Editorial"/></div>
  <div class="feat-content">
    <div class="feat-eyebrow">Editorial</div>
    <h2 class="feat-title">The <em>Velvet</em><br/>Edit: SS 2024</h2>
    <p class="feat-desc">This season, we invite you to explore femininity through the lens of restraint and richness. Every piece selected with obsessive attention to craft.</p>
    <button class="btn-purple">Explore the Edit</button>
  </div>
</section>
<section class="newsletter">
  <h2 class="nl-title">Join the Circle</h2>
  <p class="nl-sub">Early access to drops, exclusive offers & style content</p>
  <div class="nl-form"><input class="nl-input" type="email" placeholder="Your email address"/><button class="nl-btn">Subscribe</button></div>
</section>
<footer>
  <div><div class="foot-logo">VELVET<span>.</span></div><div class="foot-tagline">Premium fashion, curated with obsessive care. Delivered to your world.</div></div>
  <div><div class="foot-col-title">Shop</div><div class="foot-col-links"><a href="#">New In</a><a href="#">Dresses</a><a href="#">Bags</a><a href="#">Shoes</a><a href="#">Sale</a></div></div>
  <div><div class="foot-col-title">Help</div><div class="foot-col-links"><a href="#">Sizing Guide</a><a href="#">Returns</a><a href="#">Track Order</a><a href="#">Contact</a></div></div>
  <div><div class="foot-col-title">Company</div><div class="foot-col-links"><a href="#">About</a><a href="#">Press</a><a href="#">Sustainability</a><a href="#">Careers</a></div></div>
</footer>
<div class="foot-bottom"><div class="foot-copy">© 2024 VELVET. All rights reserved.</div><div class="foot-copy">Free returns · Authenticity guaranteed</div></div>
<script>
const obs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.animation='fadeUp 0.6s ease forwards';e.target.style.opacity='1';},i*80);}});},{threshold:0.1});
document.querySelectorAll('.prod-card,.cat-card').forEach(el=>{el.style.opacity='0';obs.observe(el);});
document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');});});
</script>
</body></html>`

  },
  {
    id: 'todo',
    name: 'TaskFlow Pro',
    category: 'Productivity',
    catColor: '#10b981',
    catBg: 'rgba(16,185,129,0.12)',
    desc: 'Clean to-do list app with drag-and-drop tasks, priority labels, progress tracker and dark minimal design',
    tags: ['Task Manager', 'Priority Levels', 'Progress Bar', 'Local Storage'],
    liveUrl: 'https://zaterbusiness.github.io/taskflow-pro/',
    heroImg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0f1117;color:#e2e8f0;font-family:'Helvetica Neue',sans-serif;overflow-x:hidden;width:100%;}
@keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
nav{padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(16,185,129,0.15);background:#0f1117}
.logo{font-size:13px;font-weight:700;letter-spacing:1px;color:#10b981}
.logo span{color:#e2e8f0}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 12px;background:#111318}
.stat{background:#1a1d27;border:1px solid rgba(16,185,129,0.1);border-radius:8px;padding:8px 10px;text-align:center}
.stat-n{font-size:18px;font-weight:700;color:#10b981}
.stat-l{font-size:8px;color:rgba(226,232,240,0.4);letter-spacing:1px;text-transform:uppercase;margin-top:2px}
.progress-section{padding:8px 12px;background:#0f1117}
.progress-label{display:flex;justify-content:space-between;font-size:9px;color:rgba(226,232,240,0.4);letter-spacing:1px;text-transform:uppercase;margin-bottom:5px}
.progress-bar{background:#1a1d27;border-radius:100px;height:6px;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,#10b981,#34d399);border-radius:100px;width:62%}
.input-row{display:flex;gap:6px;padding:8px 12px;background:#111318}
.task-input{flex:1;background:#1a1d27;border:1px solid rgba(16,185,129,0.2);border-radius:7px;padding:8px 10px;font-size:10px;color:#e2e8f0;outline:none}
.add-btn{background:#10b981;border:none;border-radius:7px;padding:8px 12px;font-size:9px;font-weight:700;color:#0f1117;letter-spacing:1px;text-transform:uppercase;cursor:pointer}
.tasks{padding:4px 12px 12px;background:#0f1117;display:flex;flex-direction:column;gap:4px}
.task{background:#1a1d27;border:1px solid rgba(255,255,255,0.06);border-radius:9px;padding:9px 12px;display:flex;align-items:center;gap:10px;animation:slideIn 0.3s ease}
.task-check{width:16px;height:16px;border-radius:50%;border:1.5px solid rgba(16,185,129,0.4);flex-shrink:0;display:flex;align-items:center;justify-content:center}
.task.done .task-check{background:#10b981;border-color:#10b981}
.task.done .task-text{text-decoration:line-through;color:rgba(226,232,240,0.3)}
.task-text{flex:1;font-size:10px;color:#e2e8f0}
.task-pill{font-size:7px;font-weight:700;padding:2px 7px;border-radius:100px;letter-spacing:0.5px;text-transform:uppercase}
.pill-high{background:rgba(239,68,68,0.15);color:#f87171}
.pill-med{background:rgba(245,158,11,0.15);color:#fbbf24}
.pill-low{background:rgba(16,185,129,0.15);color:#34d399}
</style></head><body>
<nav><div class="logo">Task<span>Flow</span></div><div style="font-size:9px;color:rgba(226,232,240,0.3)">8 tasks today</div></nav>
<div class="stats-row">
  <div class="stat"><div class="stat-n">8</div><div class="stat-l">Total</div></div>
  <div class="stat"><div class="stat-n">5</div><div class="stat-l">Done</div></div>
  <div class="stat"><div class="stat-n">3</div><div class="stat-l">Left</div></div>
</div>
<div class="progress-section">
  <div class="progress-label"><span>Daily Progress</span><span>62%</span></div>
  <div class="progress-bar"><div class="progress-fill"></div></div>
</div>
<div class="input-row">
  <div class="task-input">Add a new task...</div>
  <div class="add-btn">+ ADD</div>
</div>
<div class="tasks">
  <div class="task done"><div class="task-check">✓</div><div class="task-text">Design new landing page</div><div class="task-pill pill-high">High</div></div>
  <div class="task done"><div class="task-check">✓</div><div class="task-text">Review pull requests</div><div class="task-pill pill-med">Mid</div></div>
  <div class="task"><div class="task-check"></div><div class="task-text">Write weekly report</div><div class="task-pill pill-high">High</div></div>
  <div class="task"><div class="task-check"></div><div class="task-text">Update API documentation</div><div class="task-pill pill-low">Low</div></div>
  <div class="task"><div class="task-check"></div><div class="task-text">Team standup call</div><div class="task-pill pill-med">Mid</div></div>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TaskFlow Pro — To-Do Manager</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--green:#10b981;--green2:#34d399;--dark:#0f1117;--panel:#111318;--card:#1a1d27;--cream:#e2e8f0;--muted:rgba(226,232,240,0.45);--border:rgba(255,255,255,0.07);}
html{scroll-behavior:smooth;}
body{background:var(--dark);color:var(--cream);font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:var(--green);}
@keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes checkPop{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes strikeThrough{from{text-decoration-color:transparent}to{text-decoration-color:currentColor}}
.nav{position:sticky;top:0;z-index:100;background:rgba(15,17,23,0.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-size:20px;font-weight:700;letter-spacing:-0.5px;color:var(--green);}
.nav-logo span{color:var(--cream);}
.nav-right{display:flex;align-items:center;gap:16px;}
.nav-date{font-size:12px;color:var(--muted);font-family:'DM Mono',monospace;}
.nav-filter{font-size:11px;font-weight:600;color:var(--muted);background:var(--card);border:1px solid var(--border);padding:6px 14px;border-radius:8px;cursor:pointer;transition:all 0.2s;}
.nav-filter.active,.nav-filter:hover{border-color:var(--green);color:var(--green);}
.hero{background:var(--panel);border-bottom:1px solid var(--border);padding:32px 24px;}
.hero-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;}
.hero-title{font-size:clamp(24px,4vw,36px);font-weight:700;letter-spacing:-1px;color:var(--cream);}
.hero-title span{color:var(--green);}
.hero-sub{font-size:13px;color:var(--muted);margin-top:4px;}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center;transition:all 0.2s;}
.stat-card:hover{border-color:rgba(16,185,129,0.25);}
.stat-num{font-size:32px;font-weight:700;color:var(--green);line-height:1;font-family:'DM Mono',monospace;}
.stat-label{font-size:10px;font-weight:600;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:6px;}
.progress-wrap{margin-top:24px;}
.progress-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.progress-text{font-size:12px;font-weight:600;color:var(--muted);}
.progress-pct{font-size:12px;font-weight:700;color:var(--green);font-family:'DM Mono',monospace;}
.progress-track{background:var(--card);border-radius:100px;height:8px;overflow:hidden;border:1px solid var(--border);}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--green),var(--green2));border-radius:100px;transition:width 0.5s cubic-bezier(0.34,1.1,0.64,1);}
.main{padding:24px;max-width:720px;margin:0 auto;}
.input-section{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:24px;}
.input-label{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
.input-row{display:flex;gap:10px;margin-bottom:12px;}
.task-input{flex:1;background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px 16px;font-size:14px;color:var(--cream);font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s;}
.task-input:focus{border-color:var(--green);}
.task-input::placeholder{color:rgba(226,232,240,0.2);}
.add-btn{background:var(--green);color:#0f1117;border:none;border-radius:10px;padding:12px 20px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;white-space:nowrap;}
.add-btn:hover{background:var(--green2);}
.priority-row{display:flex;gap:8px;align-items:center;}
.priority-label{font-size:11px;color:var(--muted);}
.priority-btn{font-size:11px;font-weight:700;padding:5px 14px;border-radius:100px;border:1.5px solid transparent;cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;}
.p-high{background:rgba(239,68,68,0.1);color:#f87171;border-color:rgba(239,68,68,0.2);}
.p-high.sel{background:rgba(239,68,68,0.2);border-color:#f87171;}
.p-med{background:rgba(245,158,11,0.1);color:#fbbf24;border-color:rgba(245,158,11,0.2);}
.p-med.sel{background:rgba(245,158,11,0.2);border-color:#fbbf24;}
.p-low{background:rgba(16,185,129,0.1);color:var(--green2);border-color:rgba(16,185,129,0.2);}
.p-low.sel{background:rgba(16,185,129,0.2);border-color:var(--green);}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.section-title{font-size:12px;font-weight:700;color:var(--muted);letter-spacing:2px;text-transform:uppercase;}
.clear-btn{font-size:11px;color:rgba(239,68,68,0.5);cursor:pointer;transition:color 0.2s;background:none;border:none;font-family:'DM Sans',sans-serif;}
.clear-btn:hover{color:#f87171;}
.tasks-list{display:flex;flex-direction:column;gap:6px;}
.task-item{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;animation:slideIn 0.25s ease;transition:all 0.2s;cursor:pointer;user-select:none;}
.task-item:hover{border-color:rgba(16,185,129,0.2);}
.task-item.done{opacity:0.55;}
.check-circle{width:22px;height:22px;border-radius:50%;border:2px solid rgba(16,185,129,0.35);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;transition:all 0.2s;background:transparent;}
.task-item.done .check-circle{background:var(--green);border-color:var(--green);color:#0f1117;animation:checkPop 0.25s ease;}
.task-content{flex:1;min-width:0;}
.task-text{font-size:14px;font-weight:500;color:var(--cream);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.task-item.done .task-text{text-decoration:line-through;color:var(--muted);}
.task-meta{display:flex;align-items:center;gap:8px;margin-top:4px;}
.task-time{font-size:11px;color:rgba(226,232,240,0.25);font-family:'DM Mono',monospace;}
.priority-badge{font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;letter-spacing:0.5px;text-transform:uppercase;}
.badge-high{background:rgba(239,68,68,0.12);color:#f87171;}
.badge-med{background:rgba(245,158,11,0.12);color:#fbbf24;}
.badge-low{background:rgba(16,185,129,0.12);color:var(--green2);}
.task-del{background:none;border:none;color:rgba(239,68,68,0);cursor:pointer;font-size:14px;transition:all 0.2s;flex-shrink:0;padding:2px;}
.task-item:hover .task-del{color:rgba(239,68,68,0.35);}
.task-del:hover{color:#f87171 !important;}
.empty-state{text-align:center;padding:48px 24px;}
.empty-icon{font-size:36px;margin-bottom:12px;opacity:0.3;}
.empty-text{font-size:14px;color:var(--muted);}
.filters{display:flex;gap:6px;margin-bottom:16px;}
.filter-chip{font-size:11px;font-weight:600;padding:6px 14px;border-radius:100px;border:1.5px solid var(--border);color:var(--muted);cursor:pointer;transition:all 0.15s;background:transparent;font-family:'DM Sans',sans-serif;}
.filter-chip.active{border-color:var(--green);color:var(--green);background:rgba(16,185,129,0.08);}
.filter-chip:hover{border-color:rgba(16,185,129,0.4);}
@media(max-width:600px){.stats{grid-template-columns:repeat(2,1fr);}.hero{padding:20px 16px;}.main{padding:16px;}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-logo">Task<span>Flow</span></div>
  <div class="nav-right">
    <div class="nav-date" id="todayDate"></div>
  </div>
</nav>
<div class="hero">
  <div class="hero-top">
    <div>
      <h1 class="hero-title">Good morning, <span id="greeting">there</span>👋</h1>
      <p class="hero-sub">Here's what's on your plate today.</p>
    </div>
  </div>
  <div class="stats">
    <div class="stat-card"><div class="stat-num" id="totalCount">0</div><div class="stat-label">Total</div></div>
    <div class="stat-card"><div class="stat-num" id="doneCount">0</div><div class="stat-label">Done</div></div>
    <div class="stat-card"><div class="stat-num" id="pendingCount">0</div><div class="stat-label">Pending</div></div>
    <div class="stat-card"><div class="stat-num" id="highCount">0</div><div class="stat-label">High Priority</div></div>
  </div>
  <div class="progress-wrap">
    <div class="progress-row">
      <span class="progress-text">Daily completion</span>
      <span class="progress-pct" id="progressPct">0%</span>
    </div>
    <div class="progress-track"><div class="progress-fill" id="progressBar" style="width:0%"></div></div>
  </div>
</div>
<div class="main">
  <div class="input-section">
    <div class="input-label">New Task</div>
    <div class="input-row">
      <input class="task-input" id="taskInput" type="text" placeholder="What needs to be done?" maxlength="80"/>
      <button class="add-btn" onclick="addTask()">+ Add</button>
    </div>
    <div class="priority-row">
      <span class="priority-label">Priority:</span>
      <button class="priority-btn p-high" onclick="setPriority('high',this)">High</button>
      <button class="priority-btn p-med sel" onclick="setPriority('med',this)">Medium</button>
      <button class="priority-btn p-low" onclick="setPriority('low',this)">Low</button>
    </div>
  </div>
  <div class="section-header">
    <div class="filters">
      <button class="filter-chip active" onclick="setFilter('all',this)">All</button>
      <button class="filter-chip" onclick="setFilter('active',this)">Active</button>
      <button class="filter-chip" onclick="setFilter('done',this)">Done</button>
      <button class="filter-chip" onclick="setFilter('high',this)">High Priority</button>
    </div>
    <button class="clear-btn" onclick="clearDone()">Clear done</button>
  </div>
  <div class="tasks-list" id="tasksList"></div>
  <div class="empty-state" id="emptyState" style="display:none">
    <div class="empty-icon">✅</div>
    <div class="empty-text">No tasks here. Add one above!</div>
  </div>
</div>
<script>
const SAMPLE=[{id:1,text:'Design new landing page wireframes',priority:'high',done:true,time:'9:00 AM'},{id:2,text:'Review open pull requests',priority:'med',done:true,time:'10:30 AM'},{id:3,text:'Write weekly status report',priority:'high',done:false,time:'2:00 PM'},{id:4,text:'Update API documentation',priority:'low',done:false,time:'3:30 PM'},{id:5,text:'Team standup call',priority:'med',done:false,time:'11:00 AM'}];
let tasks=JSON.parse(localStorage.getItem('taskflow_tasks')||'null')||SAMPLE;
let selPriority='med';
let activeFilter='all';
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now=new Date();
document.getElementById('todayDate').textContent=days[now.getDay()]+', '+months[now.getMonth()]+' '+now.getDate();
function save(){localStorage.setItem('taskflow_tasks',JSON.stringify(tasks));}
function setPriority(p,btn){selPriority=p;document.querySelectorAll('.priority-btn').forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');}
function setFilter(f,btn){activeFilter=f;document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render();}
function addTask(){
  const inp=document.getElementById('taskInput');
  const text=inp.value.trim();if(!text)return;
  const hr=now.getHours();const min=String(now.getMinutes()).padStart(2,'0');const ampm=hr>=12?'PM':'AM';
  const displayHr=hr%12||12;
  tasks.unshift({id:Date.now(),text,priority:selPriority,done:false,time:displayHr+':'+min+' '+ampm});
  inp.value='';save();render();
}
function toggle(id){const t=tasks.find(x=>x.id===id);if(t)t.done=!t.done;save();render();}
function del(id){tasks=tasks.filter(x=>x.id!==id);save();render();}
function clearDone(){tasks=tasks.filter(x=>!x.done);save();render();}
function render(){
  const total=tasks.length;const done=tasks.filter(x=>x.done).length;const pending=total-done;const high=tasks.filter(x=>!x.done&&x.priority==='high').length;
  document.getElementById('totalCount').textContent=total;
  document.getElementById('doneCount').textContent=done;
  document.getElementById('pendingCount').textContent=pending;
  document.getElementById('highCount').textContent=high;
  const pct=total?Math.round(done/total*100):0;
  document.getElementById('progressPct').textContent=pct+'%';
  document.getElementById('progressBar').style.width=pct+'%';
  const filtered=tasks.filter(t=>{if(activeFilter==='active')return!t.done;if(activeFilter==='done')return t.done;if(activeFilter==='high')return t.priority==='high'&&!t.done;return true;});
  const list=document.getElementById('tasksList');const empty=document.getElementById('emptyState');
  if(!filtered.length){list.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';
  list.innerHTML=filtered.map(function(t){
    var pLabel=t.priority==='med'?'Medium':t.priority==='high'?'High':'Low';
    return '<div class="task-item'+(t.done?' done':'')+'" onclick="toggle('+t.id+')">'
      +'<div class="check-circle">'+(t.done?'✓':'')+'</div>'
      +'<div class="task-content">'
      +'<div class="task-text">'+t.text+'</div>'
      +'<div class="task-meta">'
      +'<span class="task-time">'+t.time+'</span>'
      +'<span class="priority-badge badge-'+t.priority+'">'+pLabel+'</span>'
      +'</div></div>'
      +'<button class="task-del" onclick="event.stopPropagation();del('+t.id+')">&#x2715;</button>'
      +'</div>';
  }).join('');
}
document.getElementById('taskInput').addEventListener('keydown',e=>{if(e.key==='Enter')addTask();});
render();
</script>
</body></html>`
  },
  {
    id: 'portfolio',
    name: 'Minimal Portfolio',
    category: 'Personal',
    catColor: '#f59e0b',
    catBg: 'rgba(245,158,11,0.12)',
    desc: 'Clean one-page developer portfolio with animated hero, project cards, skill bars and contact form',
    tags: ['Animated Hero', 'Project Showcase', 'Skill Bars', 'Contact Form'],
    liveUrl: 'https://zaterbusiness.github.io/minimal-portfolio/',
    heroImg: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0a0a0f;color:#e8e8f0;font-family:'Helvetica Neue',sans-serif;overflow-x:hidden;width:100%;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
nav{padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(245,158,11,0.15)}
.logo{font-size:14px;font-weight:700;color:#f59e0b;letter-spacing:-0.5px}
.nav-links a{font-size:8px;letter-spacing:2px;color:rgba(232,232,240,0.4);text-decoration:none;text-transform:uppercase;margin-left:12px}
.hero{padding:20px 16px;background:#0d0d14;min-height:160px;display:flex;flex-direction:column;justify-content:flex-end}
.hero-role{font-size:8px;letter-spacing:4px;color:#f59e0b;text-transform:uppercase;margin-bottom:8px}
.hero-name{font-size:28px;font-weight:800;letter-spacing:-1px;color:#e8e8f0;line-height:1}
.hero-cursor{color:#f59e0b;animation:blink 1s step-end infinite}
.hero-desc{font-size:9px;color:rgba(232,232,240,0.4);line-height:1.7;margin-top:8px;max-width:280px}
.hero-btns{display:flex;gap:6px;margin-top:12px}
.btn-amber{background:#f59e0b;color:#0a0a0f;border:none;padding:7px 16px;font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-radius:5px;cursor:pointer}
.btn-ghost{background:transparent;color:#f59e0b;border:1px solid rgba(245,158,11,0.3);padding:7px 14px;font-size:8px;letter-spacing:2px;text-transform:uppercase;border-radius:5px}
.projects{padding:12px 16px;background:#0a0a0f}
.sec-label{font-size:8px;letter-spacing:3px;color:#f59e0b;text-transform:uppercase;margin-bottom:8px}
.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.proj{background:#111118;border:1px solid rgba(255,255,255,0.05);border-radius:9px;padding:10px;overflow:hidden}
.proj-img{width:100%;height:60px;object-fit:cover;border-radius:5px;margin-bottom:7px;filter:brightness(0.7)}
.proj-name{font-size:9px;font-weight:700;color:#e8e8f0;margin-bottom:3px}
.proj-tags{display:flex;gap:3px;flex-wrap:wrap}
.ptag{font-size:7px;padding:1px 6px;border-radius:3px;background:rgba(245,158,11,0.1);color:#f59e0b}
.skills{padding:10px 16px;background:#0d0d14}
.skill-row{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.skill-name{font-size:8px;color:rgba(232,232,240,0.5);width:60px;flex-shrink:0;text-transform:uppercase;letter-spacing:1px}
.skill-bar{flex:1;background:rgba(255,255,255,0.05);border-radius:100px;height:4px;overflow:hidden}
.skill-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#f59e0b,#fbbf24)}
</style></head><body>
<nav><div class="logo">alex.dev</div><div><a href="#">Work</a><a href="#">Skills</a><a href="#">Contact</a></div></nav>
<div class="hero">
  <div class="hero-role">Full Stack Developer</div>
  <div class="hero-name">Alex<br/>Chen<span class="hero-cursor">_</span></div>
  <div class="hero-desc">Building clean, fast web apps with React, Node.js and too much coffee.</div>
  <div class="hero-btns"><div class="btn-amber">View Work</div><div class="btn-ghost">Let's Talk</div></div>
</div>
<div class="projects">
  <div class="sec-label">Selected Work</div>
  <div class="proj-grid">
    <div class="proj"><img class="proj-img" src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&q=70" alt=""/><div class="proj-name">DashBoard UI</div><div class="proj-tags"><span class="ptag">React</span><span class="ptag">TS</span></div></div>
    <div class="proj"><img class="proj-img" src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&q=70" alt=""/><div class="proj-name">E-Commerce</div><div class="proj-tags"><span class="ptag">Next.js</span><span class="ptag">Node</span></div></div>
    <div class="proj"><img class="proj-img" src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&q=70" alt=""/><div class="proj-name">API Platform</div><div class="proj-tags"><span class="ptag">Go</span><span class="ptag">Redis</span></div></div>
  </div>
</div>
<div class="skills">
  <div class="sec-label" style="margin-bottom:8px">Skills</div>
  <div class="skill-row"><div class="skill-name">React</div><div class="skill-bar"><div class="skill-fill" style="width:92%"></div></div></div>
  <div class="skill-row"><div class="skill-name">Node.js</div><div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div></div>
  <div class="skill-row"><div class="skill-name">TypeScript</div><div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div></div>
  <div class="skill-row"><div class="skill-name">Python</div><div class="skill-bar"><div class="skill-fill" style="width:70%"></div></div></div>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Alex Chen — Full Stack Developer</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--amber:#f59e0b;--amber2:#fbbf24;--dark:#0a0a0f;--panel:#0d0d14;--card:#111118;--cream:#e8e8f0;--muted:rgba(232,232,240,0.45);--border:rgba(255,255,255,0.06);}
html{scroll-behavior:smooth;}
body{background:var(--dark);color:var(--cream);font-family:'Sora',sans-serif;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:var(--amber);}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes skillGrow{from{width:0}to{width:var(--w)}}
@keyframes countUp{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(10,10,15,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:18px 60px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-size:18px;font-weight:800;color:var(--amber);letter-spacing:-0.5px;font-family:'JetBrains Mono',monospace;}
.nav-links{display:flex;gap:36px;}
.nav-links a{font-size:11px;letter-spacing:2px;color:var(--muted);text-decoration:none;text-transform:uppercase;transition:color 0.2s;}
.nav-links a:hover{color:var(--amber);}
.nav-hire{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;background:var(--amber);color:var(--dark);border:none;padding:10px 22px;border-radius:8px;cursor:pointer;font-family:'Sora',sans-serif;transition:all 0.2s;}
.nav-hire:hover{background:var(--amber2);transform:translateY(-1px);}
.hero{min-height:100vh;background:var(--panel);padding:0 60px;display:flex;align-items:center;position:relative;overflow:hidden;}
.hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}
.hero-glow{position:absolute;top:-20%;left:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(245,158,11,0.06),transparent 70%);pointer-events:none;}
.hero-content{position:relative;z-index:2;max-width:700px;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);border-radius:100px;padding:6px 16px;font-size:11px;font-weight:600;color:var(--amber);margin-bottom:24px;animation:fadeUp 0.8s ease 0.2s both;}
.hero-status{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:blink 2s ease-in-out infinite;}
.hero-title{font-size:clamp(52px,9vw,96px);font-weight:800;letter-spacing:-3px;line-height:0.95;color:var(--cream);margin-bottom:8px;animation:fadeUp 0.8s ease 0.4s both;}
.hero-cursor{color:var(--amber);animation:blink 1s step-end infinite;}
.hero-role{font-size:clamp(18px,3vw,28px);font-weight:300;color:var(--amber);letter-spacing:-0.5px;margin-bottom:20px;animation:fadeUp 0.8s ease 0.5s both;}
.hero-desc{font-size:15px;color:var(--muted);line-height:1.8;max-width:500px;margin-bottom:40px;animation:fadeUp 0.8s ease 0.6s both;}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.8s ease 0.8s both;}
.btn-amber{background:var(--amber);color:var(--dark);border:none;padding:16px 36px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-radius:10px;cursor:pointer;font-family:'Sora',sans-serif;transition:all 0.2s;}
.btn-amber:hover{background:var(--amber2);transform:translateY(-2px);}
.btn-ghost{background:transparent;color:var(--cream);border:1px solid var(--border);padding:16px 36px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;border-radius:10px;cursor:pointer;font-family:'Sora',sans-serif;transition:all 0.2s;}
.btn-ghost:hover{border-color:var(--amber);color:var(--amber);}
.hero-metrics{position:absolute;right:60px;bottom:80px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;animation:fadeUp 0.8s ease 1s both;}
.metric{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center;}
.metric-num{font-size:28px;font-weight:800;color:var(--amber);font-family:'JetBrains Mono',monospace;line-height:1;}
.metric-label{font-size:10px;color:var(--muted);margin-top:4px;letter-spacing:1px;text-transform:uppercase;}
.projects{padding:100px 60px;background:var(--dark);}
.sec-tag{font-size:11px;font-weight:700;letter-spacing:4px;color:var(--amber);text-transform:uppercase;display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.sec-tag::before{content:'';width:28px;height:1px;background:var(--amber);}
.sec-title{font-size:clamp(28px,5vw,52px);font-weight:800;letter-spacing:-2px;color:var(--cream);margin-bottom:8px;}
.sec-sub{font-size:14px;color:var(--muted);margin-bottom:52px;}
.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.proj-card{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:all 0.3s;cursor:pointer;}
.proj-card:hover{border-color:rgba(245,158,11,0.3);transform:translateY(-6px);}
.proj-img{width:100%;height:200px;object-fit:cover;display:block;filter:brightness(0.75);transition:all 0.4s;}
.proj-card:hover .proj-img{filter:brightness(0.9);transform:scale(1.04);}
.proj-body{padding:18px;}
.proj-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;}
.proj-tag{font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;background:rgba(245,158,11,0.1);color:var(--amber);}
.proj-name{font-size:18px;font-weight:700;letter-spacing:-0.5px;color:var(--cream);margin-bottom:6px;}
.proj-desc{font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:14px;}
.proj-link{font-size:12px;font-weight:700;color:var(--amber);letter-spacing:1px;text-transform:uppercase;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:gap 0.2s;}
.proj-link:hover{gap:10px;}
.skills{padding:100px 60px;background:var(--panel);}
.skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;margin-top:52px;}
.skill-item{margin-bottom:24px;}
.skill-header{display:flex;justify-content:space-between;margin-bottom:8px;}
.skill-name{font-size:13px;font-weight:600;color:var(--cream);}
.skill-pct{font-size:12px;font-weight:700;color:var(--amber);font-family:'JetBrains Mono',monospace;}
.skill-bar{background:var(--card);border-radius:100px;height:6px;overflow:hidden;border:1px solid var(--border);}
.skill-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,var(--amber),var(--amber2));width:0;transition:width 1.2s cubic-bezier(0.34,1.1,0.64,1);}
.about-col{padding:32px;background:var(--card);border:1px solid var(--border);border-radius:16px;}
.about-title{font-size:20px;font-weight:700;letter-spacing:-0.5px;color:var(--cream);margin-bottom:16px;}
.about-text{font-size:13px;color:var(--muted);line-height:2;margin-bottom:20px;}
.tag-cloud{display:flex;flex-wrap:wrap;gap:8px;}
.tag{font-size:11px;font-weight:600;padding:5px 12px;border-radius:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15);color:var(--amber);}
.contact{padding:100px 60px;background:var(--dark);text-align:center;}
.contact-card{max-width:600px;margin:52px auto 0;background:var(--panel);border:1px solid var(--border);border-radius:20px;padding:48px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
.form-group{display:flex;flex-direction:column;gap:8px;text-align:left;}
.form-label{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:2px;text-transform:uppercase;}
.form-input,.form-textarea{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:13px 16px;font-size:14px;color:var(--cream);font-family:'Sora',sans-serif;outline:none;transition:border-color 0.2s;width:100%;}
.form-input:focus,.form-textarea:focus{border-color:var(--amber);}
.form-textarea{resize:vertical;min-height:100px;}
.form-submit{background:var(--amber);color:var(--dark);border:none;width:100%;padding:16px;border-radius:10px;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Sora',sans-serif;margin-top:6px;transition:all 0.2s;}
.form-submit:hover{background:var(--amber2);transform:translateY(-2px);}
footer{background:var(--panel);border-top:1px solid var(--border);padding:32px 60px;display:flex;justify-content:space-between;align-items:center;}
.foot-logo{font-size:16px;font-weight:800;color:var(--amber);font-family:'JetBrains Mono',monospace;}
.foot-copy{font-size:12px;color:var(--muted);}
.foot-links{display:flex;gap:24px;}
.foot-links a{font-size:12px;color:var(--muted);text-decoration:none;transition:color 0.2s;}
.foot-links a:hover{color:var(--amber);}
@media(max-width:900px){.nav{padding:16px 20px;}.hero,.projects,.skills,.contact{padding:80px 20px;}.hero-metrics{display:none;}.proj-grid{grid-template-columns:1fr;}.skills-grid{grid-template-columns:1fr;}.form-row{grid-template-columns:1fr;}footer{flex-direction:column;gap:16px;text-align:center;padding:24px 20px;}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-logo">alex.dev</div>
  <div class="nav-links"><a href="#projects">Work</a><a href="#skills">Skills</a><a href="#contact">Contact</a></div>
  <button class="nav-hire" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Hire Me</button>
</nav>
<section class="hero">
  <div class="hero-grid-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-content">
    <div class="hero-eyebrow"><span class="hero-status"></span>Available for work · Mumbai, IN</div>
    <h1 class="hero-title">Alex<br/>Chen<span class="hero-cursor">_</span></h1>
    <div class="hero-role">Full Stack Developer</div>
    <p class="hero-desc">I build fast, clean web experiences using React, Node.js and modern cloud architecture. 5+ years turning ideas into products people love.</p>
    <div class="hero-btns">
      <button class="btn-amber" onclick="document.getElementById('projects').scrollIntoView({behavior:'smooth'})">View My Work</button>
      <button class="btn-ghost" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Let's Talk →</button>
    </div>
  </div>
  <div class="hero-metrics">
    <div class="metric"><div class="metric-num">5+</div><div class="metric-label">Years exp</div></div>
    <div class="metric"><div class="metric-num">40+</div><div class="metric-label">Projects</div></div>
    <div class="metric"><div class="metric-num">98%</div><div class="metric-label">Satisfaction</div></div>
  </div>
</section>
<section class="projects" id="projects">
  <div class="sec-tag">Selected Work</div>
  <h2 class="sec-title">Things I've Built</h2>
  <p class="sec-sub">A few projects I'm proud of</p>
  <div class="proj-grid">
    <div class="proj-card"><img class="proj-img" src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=85" alt="Dashboard"/><div class="proj-body"><div class="proj-tags"><span class="proj-tag">React</span><span class="proj-tag">TypeScript</span><span class="proj-tag">Recharts</span></div><div class="proj-name">Analytics Dashboard</div><div class="proj-desc">Real-time data visualization platform for SaaS metrics with custom charting.</div><a href="#" class="proj-link">View Project →</a></div></div>
    <div class="proj-card"><img class="proj-img" src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=85" alt="E-Commerce"/><div class="proj-body"><div class="proj-tags"><span class="proj-tag">Next.js</span><span class="proj-tag">Node</span><span class="proj-tag">Stripe</span></div><div class="proj-name">E-Commerce Platform</div><div class="proj-desc">Full-stack shopping experience with inventory management and payment processing.</div><a href="#" class="proj-link">View Project →</a></div></div>
    <div class="proj-card"><img class="proj-img" src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=85" alt="API"/><div class="proj-body"><div class="proj-tags"><span class="proj-tag">Go</span><span class="proj-tag">Redis</span><span class="proj-tag">Docker</span></div><div class="proj-name">API Gateway</div><div class="proj-desc">High-performance REST/GraphQL API platform handling 2M+ req/day.</div><a href="#" class="proj-link">View Project →</a></div></div>
  </div>
</section>
<section class="skills" id="skills">
  <div class="sec-tag">Expertise</div>
  <h2 class="sec-title">My Skill Set</h2>
  <div class="skills-grid">
    <div>
      <div class="skill-item"><div class="skill-header"><span class="skill-name">React / Next.js</span><span class="skill-pct">92%</span></div><div class="skill-bar"><div class="skill-fill" style="--w:92%"></div></div></div>
      <div class="skill-item"><div class="skill-header"><span class="skill-name">Node.js / Express</span><span class="skill-pct">88%</span></div><div class="skill-bar"><div class="skill-fill" style="--w:88%"></div></div></div>
      <div class="skill-item"><div class="skill-header"><span class="skill-name">TypeScript</span><span class="skill-pct">85%</span></div><div class="skill-bar"><div class="skill-fill" style="--w:85%"></div></div></div>
      <div class="skill-item"><div class="skill-header"><span class="skill-name">PostgreSQL / Redis</span><span class="skill-pct">80%</span></div><div class="skill-bar"><div class="skill-fill" style="--w:80%"></div></div></div>
      <div class="skill-item"><div class="skill-header"><span class="skill-name">AWS / Docker</span><span class="skill-pct">75%</span></div><div class="skill-bar"><div class="skill-fill" style="--w:75%"></div></div></div>
    </div>
    <div class="about-col">
      <div class="about-title">A bit about me 👋</div>
      <p class="about-text">I'm a full-stack developer based in Mumbai with a passion for building performant, accessible web apps. I thrive at the intersection of clean code and thoughtful UX.</p>
      <p class="about-text">Currently open to freelance projects and full-time opportunities.</p>
      <div class="tag-cloud"><span class="tag">React</span><span class="tag">Next.js</span><span class="tag">Node.js</span><span class="tag">TypeScript</span><span class="tag">PostgreSQL</span><span class="tag">Redis</span><span class="tag">AWS</span><span class="tag">Docker</span><span class="tag">GraphQL</span><span class="tag">Figma</span></div>
    </div>
  </div>
</section>
<section class="contact" id="contact">
  <div class="sec-tag" style="justify-content:center">Contact</div>
  <h2 class="sec-title">Let's Work Together</h2>
  <div class="contact-card">
    <div class="form-row">
      <div class="form-group"><label class="form-label">Name</label><input class="form-input" type="text" placeholder="Your name"/></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="your@email.com"/></div>
    </div>
    <div class="form-group" style="margin-bottom:16px"><label class="form-label">Subject</label><input class="form-input" type="text" placeholder="Project idea, job offer..."/></div>
    <div class="form-group" style="margin-bottom:0"><label class="form-label">Message</label><textarea class="form-textarea" placeholder="Tell me about your project..."></textarea></div>
    <button class="form-submit" onclick="alert('Message sent! I\\'ll get back to you within 24 hours.')">Send Message →</button>
  </div>
</section>
<footer>
  <div class="foot-logo">alex.dev</div>
  <div class="foot-copy">© 2024 Alex Chen · Built with ❤️ in Mumbai</div>
  <div class="foot-links"><a href="#">GitHub</a><a href="#">LinkedIn</a><a href="#">Twitter</a></div>
</footer>
<script>
const nav=document.querySelector('.nav');
window.addEventListener('scroll',()=>nav.style.background=window.scrollY>80?'rgba(10,10,15,0.98)':'rgba(10,10,15,0.92)');
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.skill-fill').forEach(f=>{f.style.width=f.style.getPropertyValue('--w');});}});},{threshold:0.3});
document.querySelectorAll('.skills-grid').forEach(el=>obs.observe(el));
const fadeObs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>{e.target.style.animation='fadeUp 0.6s ease forwards';e.target.style.opacity='1';},i*80);});},{threshold:0.1});
document.querySelectorAll('.proj-card').forEach(el=>{el.style.opacity='0';fadeObs.observe(el);});
</script>
</body></html>`
  },
  {
    id: 'restaurant',
    name: 'Ember & Gold',
    category: 'Restaurant',
    catColor: '#d4633a',
    catBg: 'rgba(212,99,58,0.12)',
    desc: 'Upscale restaurant website with parallax hero, animated menu cards, chef profile and reservation form',
    tags: ['Parallax', 'Menu Cards', 'Reservation Form', 'Dark & Warm'],
    liveUrl: 'https://zaterbusiness.github.io/ember-gold/',
    heroImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    preview: `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0c0906;color:#f0e6d3;font-family:'Georgia',serif;overflow-x:hidden;width:100%;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
nav{padding:10px 18px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(212,99,58,0.2);background:rgba(12,9,6,0.95)}
.logo{font-size:15px;letter-spacing:5px;color:#d4633a;text-transform:uppercase;font-weight:bold}
.nav-links a{color:rgba(240,230,211,0.6);font-size:8px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;margin-left:12px}
.hero{height:220px;position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:20px}
.hero-img{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80');background-size:cover;background-position:center;filter:brightness(0.35);}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(12,9,6,0.95) 0%,rgba(12,9,6,0.2) 70%);}
.hero-content{position:relative;z-index:2;}
.hero-tag{font-size:7px;letter-spacing:4px;color:#d4633a;text-transform:uppercase;margin-bottom:8px}
.hero-title{font-size:26px;font-weight:300;letter-spacing:4px;color:#f0e6d3;line-height:1}
.hero-sub{font-size:8px;color:rgba(240,230,211,0.5);letter-spacing:3px;margin-top:6px;text-transform:uppercase}
.marquee-wrap{background:#0a0705;border-top:1px solid rgba(212,99,58,0.15);padding:7px 0;overflow:hidden;white-space:nowrap}
.marquee-content{display:inline-flex;animation:marquee 18s linear infinite}
.mq-item{font-size:8px;letter-spacing:3px;color:rgba(212,99,58,0.5);text-transform:uppercase;padding:0 20px}
.menu{padding:12px 16px;background:#090705}
.menu-title{font-size:8px;letter-spacing:4px;color:#d4633a;text-transform:uppercase;margin-bottom:10px;text-align:center}
.menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.menu-card{position:relative;overflow:hidden;border:1px solid rgba(212,99,58,0.15)}
.menu-img{width:100%;height:90px;object-fit:cover;filter:brightness(0.7)}
.menu-info{position:absolute;bottom:0;left:0;right:0;padding:8px;background:linear-gradient(to top,rgba(12,9,6,0.95),transparent)}
.menu-name{font-size:9px;letter-spacing:1px;color:#f0e6d3;font-weight:bold}
.menu-price{font-size:8px;color:#d4633a;margin-top:2px}
.chef{display:grid;grid-template-columns:1fr 1fr;margin-top:6px;background:#0c0906}
.chef-img{height:120px;object-fit:cover;width:100%;filter:brightness(0.7)}
.chef-text{padding:14px;display:flex;flex-direction:column;justify-content:center;background:#0a0705}
.chef-label{font-size:7px;letter-spacing:3px;color:#d4633a;text-transform:uppercase;margin-bottom:6px}
.chef-name{font-size:13px;font-weight:300;letter-spacing:2px;color:#f0e6d3}
.chef-bio{font-size:8px;color:rgba(240,230,211,0.4);line-height:1.7;margin-top:6px}
.reserve{padding:12px 16px;background:#0a0705;text-align:center}
.reserve-title{font-size:11px;font-weight:300;letter-spacing:3px;color:#f0e6d3;margin-bottom:8px}
.reserve-btn{background:#d4633a;color:#0c0906;border:none;padding:8px 24px;font-size:8px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-weight:bold}
</style></head><body>
<nav><div class="logo">Ember & Gold</div><div><a href="#">Menu</a><a href="#">Reserve</a><a href="#">About</a></div></nav>
<div class="hero">
  <div class="hero-img"></div><div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-tag">Est. 2018 · Chennai</div>
    <div class="hero-title">WHERE FIRE<br/>MEETS FINESSE</div>
    <div class="hero-sub">Contemporary Indian Fine Dining</div>
  </div>
</div>
<div class="marquee-wrap">
  <div class="marquee-content">
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span>
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span>
  </div>
</div>
<div class="menu">
  <div class="menu-title">Signature Dishes</div>
  <div class="menu-grid">
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80" alt=""/><div class="menu-info"><div class="menu-name">Lamb Raan</div><div class="menu-price">₹2,800</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" alt=""/><div class="menu-info"><div class="menu-name">Lobster Bisque</div><div class="menu-price">₹1,600</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&q=80" alt=""/><div class="menu-info"><div class="menu-name">Truffle Biryani</div><div class="menu-price">₹3,200</div></div></div>
  </div>
</div>
<div class="chef">
  <img class="chef-img" src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80" alt="Chef"/>
  <div class="chef-text">
    <div class="chef-label">Head Chef</div>
    <div class="chef-name">Arjun Mehta</div>
    <div class="chef-bio">Trained at Le Cordon Bleu, Paris. 15 years of redefining Indian cuisine with French technique and local soul.</div>
  </div>
</div>
<div class="reserve">
  <div class="reserve-title">Make a Reservation</div>
  <button class="reserve-btn">Book Your Table</button>
</div>
</body></html>`,
    fullHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Ember & Gold — Fine Dining</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--ember:#d4633a;--ember2:#e8845a;--gold:#c9a84c;--dark:#0c0906;--darker:#080503;--cream:#f0e6d3;--muted:rgba(240,230,211,0.5);}
html{scroll-behavior:smooth;}
body{background:var(--dark);color:var(--cream);font-family:'Cormorant Garamond',serif;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:var(--ember);}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes flicker{0%,100%{opacity:1}92%{opacity:0.85}95%{opacity:1}97%{opacity:0.9}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:20px 60px;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s;}
.nav.scrolled{background:rgba(8,5,3,0.96);backdrop-filter:blur(20px);padding:14px 60px;border-bottom:1px solid rgba(212,99,58,0.2);}
.nav-logo{font-size:22px;letter-spacing:6px;color:var(--ember);text-transform:uppercase;animation:flicker 8s ease-in-out infinite;}
.nav-logo span{font-style:italic;color:var(--gold);}
.nav-links{display:flex;gap:40px;align-items:center;}
.nav-links a{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:var(--muted);text-decoration:none;text-transform:uppercase;transition:color 0.3s;}
.nav-links a:hover{color:var(--ember);}
.nav-reserve{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;background:var(--ember);color:var(--dark);border:none;padding:11px 28px;cursor:pointer;transition:all 0.3s;font-weight:600;}
.nav-reserve:hover{background:var(--ember2);transform:translateY(-1px);}
.hero{min-height:100vh;position:relative;display:flex;align-items:flex-end;padding:80px 60px;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90');background-size:cover;background-position:center;transform:scale(1.04);transition:transform 12s ease;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,5,3,0.97) 0%,rgba(8,5,3,0.5) 50%,rgba(8,5,3,0.15) 100%);}
.hero-particles{position:absolute;inset:0;pointer-events:none;}
.ember-particle{position:absolute;border-radius:50%;background:var(--ember);filter:blur(1px);}
.hero-content{position:relative;z-index:2;max-width:700px;}
.hero-eyebrow{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:6px;color:var(--ember);text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center;gap:16px;animation:fadeUp 1s ease 0.3s both;}
.hero-eyebrow::before{content:'';width:40px;height:1px;background:var(--ember);}
.hero-title{font-size:clamp(52px,9vw,110px);font-weight:300;line-height:0.9;letter-spacing:4px;color:var(--cream);text-transform:uppercase;margin-bottom:20px;animation:fadeUp 1s ease 0.5s both;}
.hero-title em{font-style:italic;color:var(--ember);}
.hero-desc{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--muted);line-height:2;max-width:440px;margin-bottom:40px;animation:fadeUp 1s ease 0.7s both;}
.hero-btns{display:flex;gap:16px;animation:fadeUp 1s ease 0.9s both;}
.btn-ember{background:var(--ember);color:var(--dark);border:none;padding:16px 44px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;font-weight:600;}
.btn-ember:hover{background:var(--ember2);transform:translateY(-2px);box-shadow:0 8px 32px rgba(212,99,58,0.4);}
.btn-ghost{background:transparent;color:var(--cream);border:1px solid rgba(240,230,211,0.3);padding:16px 44px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
.btn-ghost:hover{border-color:var(--ember);color:var(--ember);}
.hero-awards{position:absolute;right:60px;bottom:80px;z-index:2;display:flex;flex-direction:column;gap:16px;animation:fadeUp 1s ease 1.1s both;}
.award-item{display:flex;align-items:center;gap:10px;font-family:'Montserrat',sans-serif;font-size:10px;color:var(--muted);letter-spacing:1px;}
.award-dot{width:6px;height:6px;border-radius:50%;background:var(--ember);}
.marquee{overflow:hidden;border-top:1px solid rgba(212,99,58,0.1);border-bottom:1px solid rgba(212,99,58,0.1);padding:12px 0;background:rgba(8,5,3,0.8);}
.marquee-inner{display:inline-flex;white-space:nowrap;animation:marquee 22s linear infinite;}
.mq-item{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:4px;color:rgba(212,99,58,0.5);text-transform:uppercase;padding:0 32px;}
.menu-section{padding:100px 60px;background:var(--dark);}
.sec-eyebrow{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:5px;color:var(--ember);text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:20px;}
.sec-eyebrow::before,.sec-eyebrow::after{content:'';width:36px;height:1px;background:var(--ember);}
.sec-title{font-size:clamp(28px,5vw,52px);font-weight:300;color:var(--cream);letter-spacing:4px;text-align:center;margin-bottom:16px;}
.sec-sub{font-family:'Montserrat',sans-serif;font-size:12px;color:var(--muted);text-align:center;letter-spacing:2px;margin-bottom:60px;}
.menu-tabs{display:flex;justify-content:center;gap:0;margin-bottom:48px;border-bottom:1px solid rgba(212,99,58,0.15);}
.menu-tab{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;color:var(--muted);text-transform:uppercase;padding:12px 28px;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.3s;}
.menu-tab.active,.menu-tab:hover{color:var(--ember);border-bottom-color:var(--ember);}
.menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.menu-card{position:relative;overflow:hidden;cursor:pointer;}
.menu-img{width:100%;height:320px;object-fit:cover;display:block;transition:transform 0.6s ease;filter:brightness(0.8);}
.menu-card:hover .menu-img{transform:scale(1.06);filter:brightness(0.65);}
.menu-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,5,3,0.95) 0%,transparent 55%);}
.menu-info{position:absolute;bottom:0;left:0;right:0;padding:24px;}
.menu-cat{font-family:'Montserrat',sans-serif;font-size:8px;letter-spacing:3px;color:var(--ember);text-transform:uppercase;margin-bottom:6px;}
.menu-name{font-size:22px;font-weight:300;letter-spacing:2px;color:var(--cream);margin-bottom:4px;}
.menu-desc{font-family:'Montserrat',sans-serif;font-size:11px;color:var(--muted);opacity:0;transition:opacity 0.3s;margin-bottom:8px;}
.menu-card:hover .menu-desc{opacity:1;}
.menu-price{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--ember);letter-spacing:1px;}
.chef-section{padding:100px 60px;background:var(--darker);display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:600px;}
.chef-img-wrap{position:relative;overflow:hidden;}
.chef-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(0.75);transition:transform 8s ease;}
.chef-img-wrap:hover img{transform:scale(1.04);}
.chef-badge{position:absolute;top:32px;left:32px;background:var(--ember);color:var(--dark);padding:10px 20px;font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;font-weight:600;}
.chef-content{padding:80px 60px;display:flex;flex-direction:column;justify-content:center;}
.chef-quote{font-size:clamp(20px,3vw,32px);font-weight:300;font-style:italic;color:var(--cream);line-height:1.5;margin-bottom:32px;}
.chef-quote span{color:var(--ember);}
.chef-name{font-size:20px;letter-spacing:4px;color:var(--cream);margin-bottom:6px;text-transform:uppercase;}
.chef-title{font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:3px;color:var(--ember);text-transform:uppercase;margin-bottom:24px;}
.chef-bio{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--muted);line-height:2;}
.chef-awards{display:flex;flex-direction:column;gap:12px;margin-top:32px;}
.ca{display:flex;align-items:center;gap:12px;font-family:'Montserrat',sans-serif;font-size:11px;color:var(--muted);}
.ca-dot{width:4px;height:4px;border-radius:50%;background:var(--ember);flex-shrink:0;}
.reservation{padding:100px 60px;background:var(--darker);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.res-left h2{font-size:clamp(32px,4vw,52px);font-weight:300;letter-spacing:4px;color:var(--cream);margin-bottom:20px;}
.res-left p{font-family:'Montserrat',sans-serif;font-size:13px;color:var(--muted);line-height:2;}
.res-features{margin-top:28px;display:flex;flex-direction:column;gap:12px;}
.res-feat{display:flex;align-items:center;gap:12px;font-family:'Montserrat',sans-serif;font-size:12px;color:rgba(240,230,211,0.7);}
.rf-dot{width:4px;height:4px;background:var(--ember);border-radius:50%;}
.res-form{background:rgba(212,99,58,0.04);border:1px solid rgba(212,99,58,0.15);padding:48px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.form-group{display:flex;flex-direction:column;gap:8px;}
.form-label{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;color:rgba(212,99,58,0.7);text-transform:uppercase;}
.form-input,.form-select{background:rgba(212,99,58,0.05);border:1px solid rgba(212,99,58,0.2);color:var(--cream);padding:13px 16px;font-family:'Cormorant Garamond',serif;font-size:15px;outline:none;transition:border-color 0.3s;width:100%;}
.form-input:focus,.form-select:focus{border-color:var(--ember);}
.form-select option{background:var(--darker);}
.form-submit{width:100%;background:var(--ember);color:var(--dark);border:none;padding:16px;font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;font-weight:600;margin-top:8px;}
.form-submit:hover{background:var(--ember2);}
footer{background:#040200;border-top:1px solid rgba(212,99,58,0.1);padding:60px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px;}
.foot-logo{font-size:26px;letter-spacing:6px;color:var(--ember);text-transform:uppercase;margin-bottom:12px;}
.foot-tagline{font-family:'Montserrat',sans-serif;font-size:11px;color:var(--muted);letter-spacing:2px;}
.foot-col-title{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:4px;color:rgba(212,99,58,0.6);text-transform:uppercase;margin-bottom:20px;}
.foot-col-links{display:flex;flex-direction:column;gap:12px;}
.foot-col-links a{font-family:'Montserrat',sans-serif;font-size:12px;color:var(--muted);text-decoration:none;transition:color 0.3s;}
.foot-col-links a:hover{color:var(--ember);}
.foot-bottom{background:#020100;padding:20px 60px;display:flex;justify-content:space-between;border-top:1px solid rgba(212,99,58,0.06);}
.foot-copy{font-family:'Montserrat',sans-serif;font-size:10px;color:rgba(240,230,211,0.2);letter-spacing:1px;}
@media(max-width:900px){.nav{padding:16px 20px;}.hero{padding:80px 24px 40px;}.menu-grid{grid-template-columns:1fr;}.chef-section,.reservation{grid-template-columns:1fr;}.menu-section,.chef-section,.reservation{padding:60px 24px;}footer{grid-template-columns:1fr 1fr;padding:40px 24px;}}
</style>
</head>
<body>
<nav class="nav" id="nav">
  <div class="nav-logo">Ember <span>&</span> Gold</div>
  <div class="nav-links"><a href="#menu">Menu</a><a href="#chef">Chef</a><a href="#reservation">Reserve</a></div>
  <button class="nav-reserve" onclick="document.getElementById('reservation').scrollIntoView({behavior:'smooth'})">Book Table</button>
</nav>
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-particles" id="particles"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Est. 2018 · Chennai, India</div>
    <h1 class="hero-title">Where Fire<br/>Meets <em>Finesse</em></h1>
    <p class="hero-desc">Contemporary Indian fine dining. Ancient spices reimagined through the lens of French technique and modern artistry.</p>
    <div class="hero-btns">
      <button class="btn-ember" onclick="document.getElementById('reservation').scrollIntoView({behavior:'smooth'})">Reserve a Table</button>
      <button class="btn-ghost" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">View Menu</button>
    </div>
  </div>
  <div class="hero-awards">
    <div class="award-item"><div class="award-dot"></div>Michelin Star 2022–2024</div>
    <div class="award-item"><div class="award-dot"></div>Asia's 50 Best 2023</div>
    <div class="award-item"><div class="award-dot"></div>Times Food Award 2023</div>
  </div>
</section>
<div class="marquee">
  <div class="marquee-inner">
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span><span class="mq-item">Private Dining Rooms ◆</span>
    <span class="mq-item">Open Tue–Sun · 6PM–11PM ◆</span><span class="mq-item">Reservations Required ◆</span><span class="mq-item">Chef's Table Available ◆</span><span class="mq-item">Wine Pairing Menu ◆</span><span class="mq-item">Private Dining Rooms ◆</span>
  </div>
</div>
<section class="menu-section" id="menu">
  <div class="sec-eyebrow">Our Menu</div>
  <h2 class="sec-title">Signature Creations</h2>
  <p class="sec-sub">Each dish is a canvas of memory, fire, and precision</p>
  <div class="menu-tabs">
    <div class="menu-tab active">Mains</div><div class="menu-tab">Starters</div><div class="menu-tab">Desserts</div><div class="menu-tab">Tasting Menu</div>
  </div>
  <div class="menu-grid">
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=85" alt="Lamb Raan"/><div class="menu-overlay"></div><div class="menu-info"><div class="menu-cat">Slow Roasted</div><div class="menu-name">48-Hour Lamb Raan</div><div class="menu-desc">Bone-in leg slow-cooked in tandoor with rose petal jus</div><div class="menu-price">₹2,800</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=85" alt="Lobster"/><div class="menu-overlay"></div><div class="menu-info"><div class="menu-cat">From the Sea</div><div class="menu-name">Malabar Lobster Bisque</div><div class="menu-desc">Coconut-infused broth, Kerala spices, edible gold</div><div class="menu-price">₹1,600</div></div></div>
    <div class="menu-card"><img class="menu-img" src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&q=85" alt="Truffle"/><div class="menu-overlay"></div><div class="menu-info"><div class="menu-cat">Vegetarian</div><div class="menu-name">Black Truffle Biryani</div><div class="menu-desc">Aged basmati, fresh truffle shavings, saffron crown</div><div class="menu-price">₹3,200</div></div></div>
  </div>
</section>
<section class="chef-section" id="chef">
  <div class="chef-img-wrap"><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=90" alt="Chef Arjun Mehta"/><div class="chef-badge">Head Chef</div></div>
  <div class="chef-content">
    <p class="chef-quote">"Every dish is a <span>conversation</span> — between fire and memory, between the soil and the sea."</p>
    <div class="chef-name">Arjun Mehta</div>
    <div class="chef-title">Executive Chef & Co-Founder</div>
    <p class="chef-bio">Trained at Le Cordon Bleu, Paris and staged at Noma, Copenhagen. Chef Arjun spent 15 years redefining modern Indian cuisine before founding Ember & Gold in 2018.</p>
    <div class="chef-awards">
      <div class="ca"><div class="ca-dot"></div>Le Cordon Bleu, Paris — Grand Diplôme</div>
      <div class="ca"><div class="ca-dot"></div>Staged at Noma & El Bulli</div>
      <div class="ca"><div class="ca-dot"></div>Forbes 30 Under 30 — Food & Beverage</div>
    </div>
  </div>
</section>
<section class="reservation" id="reservation">
  <div class="res-left">
    <div class="sec-eyebrow" style="justify-content:flex-start;margin-bottom:20px">Reservations</div>
    <h2>Reserve<br/>Your Evening</h2>
    <p>Dinner at Ember & Gold is an experience, not just a meal. Reservations are recommended 2 weeks in advance for weekends.</p>
    <div class="res-features">
      <div class="res-feat"><div class="rf-dot"></div>Chef's table available upon request</div>
      <div class="res-feat"><div class="rf-dot"></div>Private dining rooms for groups</div>
      <div class="res-feat"><div class="rf-dot"></div>Vegetarian & Jain menus available</div>
      <div class="res-feat"><div class="rf-dot"></div>Wine sommelier on request</div>
    </div>
  </div>
  <div class="res-form">
    <div class="form-row">
      <div class="form-group"><label class="form-label">Date</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Time</label><select class="form-select"><option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Guests</label><select class="form-select"><option>1</option><option>2</option><option>3–4</option><option>5–6</option><option>7+</option></select></div>
      <div class="form-group"><label class="form-label">Occasion</label><select class="form-select"><option>Dinner</option><option>Anniversary</option><option>Birthday</option><option>Business</option></select></div>
    </div>
    <div class="form-group" style="margin-bottom:20px"><label class="form-label">Your Name</label><input type="text" class="form-input" placeholder="Full name"/></div>
    <div class="form-group" style="margin-bottom:0"><label class="form-label">Phone</label><input type="tel" class="form-input" placeholder="+91 00000 00000"/></div>
    <button class="form-submit" onclick="alert('Reservation request received. We will confirm within 2 hours.')">Confirm Reservation</button>
  </div>
</section>
<footer>
  <div><div class="foot-logo">Ember & Gold</div><div class="foot-tagline">Where Fire Meets Finesse</div></div>
  <div><div class="foot-col-title">Explore</div><div class="foot-col-links"><a href="#">Menu</a><a href="#">Chef's Table</a><a href="#">Wine List</a><a href="#">Private Dining</a></div></div>
  <div><div class="foot-col-title">Visit</div><div class="foot-col-links"><a href="#">Location</a><a href="#">Hours</a><a href="#">Parking</a><a href="#">Dress Code</a></div></div>
  <div><div class="foot-col-title">Connect</div><div class="foot-col-links"><a href="#">Instagram</a><a href="#">Press</a><a href="#">Gift Cards</a><a href="#">Contact</a></div></div>
</footer>
<div class="foot-bottom"><div class="foot-copy">© 2024 Ember & Gold · 14 Nungambakkam High Rd, Chennai</div><div class="foot-copy">Tue–Sun · 6PM–11PM</div></div>
<script>
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80));
const pc=document.getElementById('particles');
for(let i=0;i<20;i++){const p=document.createElement('div');p.className='ember-particle';const size=Math.random()*4+1;p.style.cssText='position:absolute;width:'+size+'px;height:'+size+'px;left:'+(Math.random()*100)+'%;bottom:'+(Math.random()*30)+'%;opacity:'+(Math.random()*0.4)+';animation:float '+(Math.random()*6+4)+'s ease-in-out '+(Math.random()*5)+'s infinite;';pc.appendChild(p);}
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.animation='fadeUp 0.8s ease forwards';e.target.style.opacity='1';}});},{threshold:0.1});
document.querySelectorAll('.menu-card').forEach(el=>{el.style.opacity='0';obs.observe(el);});
document.querySelectorAll('.menu-tab').forEach(tab=>{tab.addEventListener('click',()=>{document.querySelectorAll('.menu-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');});});
</script>
</body></html>`
  },
]

// ── NO JS iframe access needed — CSS animation handles scroll ──
// (removed useAutoScroll to avoid cross-origin SecurityError)

// ── Individual template card ──────────────────────────────────
function TemplCard({ tpl, onUse, onDownload }) {
  const iframeRef = useRef(null)
  const [hovered, setHov] = useState(false)
  // CSS animation handles preview scrolling

  return (
    <div className="tg-card" style={{'--c': tpl.catColor}}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Live preview */}
      <div className="tg-preview">
        <div className="tg-bar">
          <div className="tg-dots">
            <span style={{background:'#ef4444'}}/><span style={{background:'#f59e0b'}}/><span style={{background:'#22c55e'}}/>
          </div>
          <div className="tg-url-bar">
            <span className="tg-live-dot"/>
           
          </div>
          <a href={tpl.liveUrl} target="_blank" rel="noopener noreferrer" className="tg-visit-btn"
            onClick={e => e.stopPropagation()}>↗</a>
        </div>
        <div className="tg-frame-clip">
          <iframe ref={iframeRef} srcDoc={tpl.preview} title={tpl.name}
            className="tg-iframe tg-iframe-anim" sandbox="allow-scripts allow-same-origin" scrolling="no"/>
        </div>
        {/* Hover overlay */}
        <div className="tg-hover-overlay" style={{opacity: hovered ? 1 : 0}}>
          <button className="tg-hover-btn" onClick={() => onUse(tpl)}>
            Use This Template — FREE ✨
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="tg-body">
        <div className="tg-body-top">
          <span className="tg-cat" style={{color: tpl.catColor, background: tpl.catBg}}>{tpl.category}</span>
          <span className="tg-free-pill">🆓 100% Free</span>
        </div>
        <h3 className="tg-name">{tpl.name}</h3>
        <p className="tg-desc">{tpl.desc}</p>
        <div className="tg-tags">
          {tpl.tags.map((t,i) => <span key={i} className="tg-tag">{t}</span>)}
        </div>
        {/* Hosting URL row */}
        <div className="tg-url-row">
          <span className="tg-url-label">🌐 Live demo:</span>
          <a href={tpl.liveUrl} target="_blank" rel="noopener noreferrer" className="tg-url-link">
            
          </a>
        </div>
        {/* Action buttons */}
        <div className="tg-actions">
          <button className="tg-btn-download" onClick={() => onDownload(tpl)}>
            ⬇️ Download Free
          </button>
          <button className="tg-btn-deploy" onClick={() => onUse(tpl)}>
            🐙 Deploy to GitHub
          </button>
          {/* ── Customize button ── */}
{/* <button className="tg-btn-deploy"
  onClick={() => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeGOeGNuQljOlO-fJ0aQxX5RpDU1t8UMmvqlcwq1VAsVTu7ow/viewform?usp=publish-editor",
      "_blank"
    )
  }}>
  ✏️ Customize Free
</button> */}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function TemplateGallery() {
  const { user } = useAuth()
  const navigate  = useNavigate()

  const [selected,   setSelected]   = useState(null)
  const [modal,      setModal]      = useState(false)
  const [deploying,  setDeploying]  = useState(false)
  const [deployUrl,  setDeployUrl]  = useState('')
  const [err,        setErr]        = useState('')
  const [success,    setSuccess]    = useState('')

  const openModal = (tpl) => {
    setSelected(tpl); setModal(true)
    setErr(''); setSuccess(''); setDeployUrl('')
  }

  const closeModal = () => { setModal(false); setSelected(null) }

  // ── Download HTML file ────────────────────────────────────
  const handleDownload = (tpl) => {
    const blob = new Blob([tpl.fullHtml || tpl.preview], { type: 'text/html' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `${tpl.id}-zws-template.html`; a.click()
    URL.revokeObjectURL(url)
    setSuccess(`✅ "${tpl.name}" downloaded! Open the HTML file in any browser.`)
    if (modal) closeModal()
  }// ── Deploy to GitHub Pages ────────────────────────────────────────────────────
// Replace your existing handleDeploy function with this complete version.
// ─────────────────────────────────────────────────────────────────────────────
const handleDeploy = async (tpl) => {
  if (!user) { navigate('/login'); return }
  setDeploying(true); setErr(''); setSuccess(''); setDeployUrl('')

  try {
    const base  = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const token = localStorage.getItem('zater_token')

    // ── Resolve HTML from template object (check all possible field names) ──
    const htmlContent = tpl.fullHtml || tpl.html || tpl.previewHtml || tpl.preview || ''
    if (!htmlContent || htmlContent.trim().length < 10) {
      throw new Error('Template HTML is missing. Please refresh and try again.')
    }

    // ── Step 1: Save template to DB via /api/hosting/save-template ──────────
    const saveRes = await fetch(`${base}/hosting/save-template`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title:        tpl.name,
        html:         htmlContent,
        templateId:   tpl.id,
        templateName: tpl.id || tpl.name,
      }),
    })
    const saveData = await saveRes.json()
    if (!saveRes.ok) throw new Error(saveData.error || 'Failed to save template')

    console.log('[Deploy] Saved project:', saveData.projectId, '| HTML:', htmlContent.length, 'chars')

    // ── Step 2: Deploy to GitHub Pages ──────────────────────────────────────
    // Send html + meta alongside projectId as a bulletproof fallback.
    // Backend uses DB html first; falls back to body html if DB is empty.
    const deployRes = await fetch(`${base}/hosting/github-pages`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        projectId:    saveData.projectId,
        html:         htmlContent,
        title:        tpl.name,
        templateName: tpl.id || tpl.name,
      }),
    })
    const deployData = await deployRes.json()

    if (!deployRes.ok) {
      if (
        deployData.error?.toLowerCase().includes('github not connected') ||
        deployData.error?.toLowerCase().includes('token') ||
        deployData.error?.toLowerCase().includes('settings')
      ) {
        setErr('GitHub not connected. Redirecting to Settings…')
        setTimeout(() => { navigate('/settings'); closeModal() }, 1600)
        return
      }
      throw new Error(deployData.error || 'Deploy failed')
    }

    const url = deployData.url || deployData.liveUrl
    setDeployUrl(url)
    setSuccess(`🎉 Deployed! Your site is live at: ${url}`)

    // ── Step 3: Poll until the GitHub Pages URL is actually live ────────────
    // GitHub Pages takes 1–3 minutes to go live after the first deploy.
    // We poll /api/hosting/check-live every 10s for up to 3 minutes.
    if (url) {
      let attempts = 0
      const maxAttempts = 18  // 18 × 10s = 3 minutes
      const poll = setInterval(async () => {
        attempts++
        try {
          const checkRes = await fetch(
            `${base}/hosting/check-live?url=${encodeURIComponent(url)}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          const checkData = await checkRes.json()
          if (checkData.live) {
            clearInterval(poll)
            setSuccess(`✅ Site is live! Visit: ${url}`)
          } else if (attempts >= maxAttempts) {
            clearInterval(poll)
            // Don't show error — just leave the URL visible, it'll load soon
          }
        } catch {
          if (attempts >= maxAttempts) clearInterval(poll)
        }
      }, 10000)
    }

  } catch (e) {
    console.error('[Deploy] Error:', e)
    setErr(e.message)
  } finally {
    setDeploying(false)
  }
}

  return (
    <>
      <style>{CSS}</style>

      <section className="tg-section" id="tpl-gallery">
        {/* Header */}
        <div className="tg-header">
          <div className="tg-header-pill">
            <span className="tg-header-pill-dot"/>
            Pre-Written Premium Templates
          </div>
          <h2 className="tg-header-title">Luxury Templates — 100% Free</h2>
          <p className="tg-header-sub">
            Fully coded with real images, animations & interactions.
            <strong> No AI needed, no payment required</strong> — download instantly or host on GitHub Pages free.
          </p>
          {/* Feature badges */}
          <div className="tg-badge-row">
            <div className="tg-badge">✅ Full HTML + CSS + JS</div>
            <div className="tg-badge">✅ Real photos included</div>
            <div className="tg-badge">✅ Mobile responsive</div>
            <div className="tg-badge tg-badge-green">🆓 Download free</div>
            <div className="tg-badge tg-badge-dark">🐙 Host on GitHub free</div>
          </div>
        </div>

        {/* Template grid */}
        <div className="tg-grid">
          {LUXURY_TEMPLATES.map(tpl => (
            <TemplCard key={tpl.id} tpl={tpl} onUse={openModal} onDownload={handleDownload}/>
          ))}
        </div>

        {/* Bottom CTA */}
     

        {success && !modal && (
          <div className="tg-toast" onClick={() => setSuccess('')}>{success} (click to dismiss)</div>
        )}
      </section>

      {/* ── MODAL ── */}
      {modal && selected && (
        <div className="tg-backdrop" onClick={closeModal}>
          <div className="tg-modal" onClick={e => e.stopPropagation()}>
            <button className="tg-modal-close" onClick={closeModal}>✕</button>

            <div className="tg-modal-head">
              <span className="tg-cat" style={{color: selected.catColor, background: selected.catBg}}>{selected.category}</span>
              <h2 className="tg-modal-title">{selected.name}</h2>
              <p className="tg-modal-sub">{selected.desc}</p>
              {selected.liveUrl && (
                <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="tg-modal-live-link">
                  🌐 View live demo: {selected.liveUrl.replace('https://','')} ↗
                </a>
              )}
            </div>

            {err     && <div className="tg-modal-err">⚠️ {err}</div>}
            {success && <div className="tg-modal-ok">{success}</div>}
            {deployUrl && (
              <div className="tg-modal-deployed">
                🎉 Live at: <a href={deployUrl} target="_blank" rel="noopener noreferrer">{deployUrl}</a>
              </div>
            )}

            <div className="tg-choices">
              {/* Download choice */}
              <div className="tg-choice tg-choice-light" onClick={() => handleDownload(selected)}>
                <div className="tg-choice-icon-wrap">📦</div>
                <div className="tg-choice-title">Download HTML File</div>
                <div className="tg-choice-free">FREE — No signup needed</div>
                <ul className="tg-choice-list">
                  <li>✅ Complete HTML + CSS + JavaScript</li>
                  <li>✅ All images & animations included</li>
                  <li>✅ Edit in VS Code or Notepad</li>
                  <li>✅ Host on Netlify, Vercel, anywhere</li>
                  <li>✅ Yours forever — no expiry</li>
                </ul>
                <button className="tg-choice-btn tg-choice-btn-dark">
                  ⬇️ Download Now — Free
                </button>
                
              </div>

              {/* GitHub deploy choice */}
              <div className="tg-choice tg-choice-dark" onClick={() => !deploying && handleDeploy(selected)}>
                <div className="tg-choice-icon-wrap">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div className="tg-choice-title" style={{color:'#fff'}}>Deploy to GitHub Pages</div>
                <div className="tg-choice-free" style={{color:'rgba(255,255,255,0.6)'}}>FREE Hosting — yourname.github.io</div>
                <ul className="tg-choice-list" style={{color:'rgba(255,255,255,0.55)'}}>
                  <li>✅ Free .github.io subdomain</li>
                  <li>✅ Auto SSL/HTTPS certificate</li>
                  <li>✅ No bandwidth limits ever</li>
                  <li>✅ Goes live in under 2 minutes</li>
                  <li>✅ One-click deploy via ZWS</li>
                </ul>
                <button className="tg-choice-btn tg-choice-btn-gh" disabled={deploying}>
                  {deploying ? ' Deploying to GitHub…' : '🐙 Deploy to GitHub — Free'}
                </button>
                <p className="tg-choice-note">Requires GitHub connected in Settings</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');

/* SECTION */
.tg-section{position:relative;z-index:1;background:linear-gradient(180deg,#0a0a12 0%,#0d0d1a 100%);padding:72px 24px;overflow:hidden;}
.tg-section::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(91,79,255,0.04) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;}

/* HEADER */
.tg-header{text-align:center;margin-bottom:52px;position:relative;z-index:1;}
.tg-header-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(91,79,255,0.15);border:1.5px solid rgba(91,79,255,0.3);border-radius:100px;padding:7px 20px;font-size:12px;font-weight:800;color:#a090ff;margin-bottom:16px;font-family:'Nunito',sans-serif;}
.tg-header-pill-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,0.6);flex-shrink:0;}
.tg-header-title{font-family:'Playfair Display',serif;font-size:clamp(28px,5vw,48px);font-weight:900;color:#fff;letter-spacing:-1px;margin-bottom:12px;}
.tg-header-sub{font-size:15px;color:#6060a0;font-weight:500;line-height:1.7;max-width:580px;margin:0 auto 20px;}
.tg-header-sub strong{color:#a090ff;}
.tg-badge-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;}
.tg-badge{font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;color:#5050a0;background:rgba(91,79,255,0.08);border:1px solid rgba(91,79,255,0.15);padding:6px 14px;border-radius:100px;}
.tg-badge-green{color:#15803d;background:rgba(34,197,94,0.1);border-color:rgba(34,197,94,0.25);}
.tg-badge-dark{color:#a090ff;background:rgba(91,79,255,0.12);border-color:rgba(91,79,255,0.25);}

/* GRID */
.tg-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:1100px;margin:0 auto;position:relative;z-index:1;}

/* CARD */
.tg-card{background:#0d0d1a;border:1.5px solid #1e1e3a;border-radius:20px;overflow:hidden;transition:all .25s cubic-bezier(0.34,1.1,0.64,1);cursor:pointer;}
.tg-card:hover{transform:translateY(-8px);border-color:var(--c);box-shadow:0 24px 64px rgba(0,0,0,0.5);}

/* PREVIEW */
.tg-preview{position:relative;height:260px;overflow:hidden;border-bottom:1px solid #1e1e3a;background:#0a0a12;}
.tg-bar{display:flex;align-items:center;gap:7px;padding:7px 10px;background:rgba(8,8,18,0.98);border-bottom:1px solid #1e1e3a;position:relative;z-index:4;flex-shrink:0;}
.tg-dots{display:flex;gap:4px;flex-shrink:0;}
.tg-dots span{width:8px;height:8px;border-radius:50%;display:block;}
.tg-url-bar{display:flex;align-items:center;gap:5px;flex:1;background:rgba(255,255,255,0.04);border-radius:5px;padding:3px 10px;min-width:0;}
.tg-live-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;flex-shrink:0;box-shadow:0 0 6px rgba(34,197,94,0.6);}
.tg-url-text{font-size:10px;font-weight:600;color:rgba(255,255,255,0.25);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.tg-visit-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.4);padding:2px 8px;border-radius:5px;font-size:11px;font-weight:700;cursor:pointer;text-decoration:none;flex-shrink:0;transition:all .15s;}
.tg-visit-btn:hover{background:rgba(255,255,255,0.12);color:#fff;}
.tg-frame-clip{position:absolute;top:28px;left:0;right:0;bottom:0;overflow:hidden;}
.tg-iframe-scroll-wrap{position:absolute;top:0;left:0;width:100%;overflow:hidden;}
.tg-iframe{width:200%;height:400%;border:none;transform:scale(0.5);transform-origin:top left;pointer-events:none;}
@keyframes tgScroll{0%{transform:scale(0.5) translateY(0)}45%{transform:scale(0.5) translateY(-37.5%)}55%{transform:scale(0.5) translateY(-37.5%)}100%{transform:scale(0.5) translateY(0)}}
.tg-iframe-anim{animation:tgScroll 12s ease-in-out infinite;}
.tg-hover-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;transition:opacity .2s;z-index:3;}
.tg-hover-btn{background:#fff;color:#0a0a12;padding:11px 24px;border-radius:10px;border:none;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.tg-hover-btn:hover{background:#22c55e;color:#fff;}

/* CARD BODY */
.tg-body{padding:18px 20px 22px;}
.tg-body-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;}
.tg-cat{font-size:11px;font-weight:800;padding:3px 11px;border-radius:7px;}
.tg-free-pill{font-size:11px;font-weight:800;color:#15803d;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);padding:3px 11px;border-radius:100px;}
.tg-name{font-family:'Playfair Display',serif;font-size:19px;font-weight:900;color:#fff;margin-bottom:6px;}
.tg-desc{font-size:12px;color:#5050a0;font-weight:500;line-height:1.6;margin-bottom:10px;}
.tg-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px;}
.tg-tag{padding:3px 9px;border-radius:5px;background:rgba(91,79,255,0.1);font-size:11px;font-weight:700;color:#6060c0;}

/* URL ROW */
.tg-url-row{display:flex;align-items:center;gap:8px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.15);border-radius:8px;padding:7px 12px;margin-bottom:12px;}
.tg-url-label{font-size:11px;font-weight:700;color:#5050a0;white-space:nowrap;}
.tg-url-link{font-size:11px;font-weight:700;color:#22c55e;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.tg-url-link:hover{text-decoration:underline;}

/* ACTION BUTTONS */
.tg-actions{display:flex;gap:8px;}
.tg-btn-download{flex:1;padding:10px;border-radius:9px;background:rgba(34,197,94,0.1);border:1.5px solid rgba(34,197,94,0.3);color:#22c55e;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.tg-btn-download:hover{background:rgba(34,197,94,0.2);border-color:#22c55e;}
.tg-btn-deploy{padding:10px 16px;border-radius:9px;background:#0a0a12;border:1.5px solid #2a2a4a;color:#a090ff;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;}
.tg-btn-deploy:hover{border-color:#6366f1;color:#c0b0ff;}

/* BOTTOM CTA */
.tg-bottom{display:flex;align-items:center;justify-content:space-between;max-width:1100px;margin:28px auto 0;background:rgba(91,79,255,0.08);border:1.5px solid rgba(91,79,255,0.2);border-radius:16px;padding:18px 24px;gap:16px;flex-wrap:wrap;}
.tg-bottom-left{display:flex;align-items:center;gap:14px;}
.tg-bottom-icon{font-size:28px;}
.tg-bottom-title{font-size:14px;font-weight:800;color:#fff;margin-bottom:3px;}
.tg-bottom-sub{font-size:12px;color:#5050a0;font-weight:500;}
.tg-bottom-btn{background:#fff;color:#0a0a12;border:none;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;white-space:nowrap;}
.tg-bottom-btn:hover{background:#f0f0ff;transform:translateY(-1px);}

/* TOAST */
.tg-toast{max-width:1100px;margin:16px auto 0;background:rgba(34,197,94,0.12);border:1.5px solid rgba(34,197,94,0.3);border-radius:12px;padding:14px 20px;font-size:13px;font-weight:700;color:#22c55e;text-align:center;cursor:pointer;font-family:'Nunito',sans-serif;}

/* MODAL */
@keyframes tgIn{from{opacity:0;transform:translateY(18px) scale(0.97)}to{opacity:1;transform:none}}
.tg-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.78);backdrop-filter:blur(8px);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;}
.tg-modal{position:relative;background:#0d0d1a;border:1.5px solid #1e1e3a;border-radius:22px;width:100%;max-width:660px;max-height:90vh;overflow-y:auto;animation:tgIn .22s ease;box-shadow:0 32px 100px rgba(0,0,0,0.7);}
.tg-modal-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.06);border:none;color:#6060a0;width:30px;height:30px;border-radius:8px;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;z-index:2;}
.tg-modal-close:hover{background:rgba(255,255,255,0.12);color:#fff;}
.tg-modal-head{padding:24px 24px 0;}
.tg-modal-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:900;color:#fff;margin:8px 0 6px;}
.tg-modal-sub{font-size:13px;color:#5050a0;font-weight:500;line-height:1.6;margin-bottom:10px;}
.tg-modal-live-link{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#22c55e;text-decoration:none;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);padding:6px 12px;border-radius:8px;transition:all .15s;}
.tg-modal-live-link:hover{background:rgba(34,197,94,0.15);}
.tg-modal-err{margin:12px 24px 0;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);border-radius:10px;padding:12px 16px;font-size:13px;color:#f87171;font-weight:600;}
.tg-modal-ok{margin:12px 24px 0;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);border-radius:10px;padding:12px 16px;font-size:13px;color:#22c55e;font-weight:700;}
.tg-modal-deployed{margin:12px 24px 0;background:rgba(91,79,255,0.1);border:1px solid rgba(91,79,255,0.25);border-radius:10px;padding:12px 16px;font-size:13px;color:#a090ff;font-weight:600;word-break:break-all;}
.tg-modal-deployed a{color:#c0b0ff;text-decoration:underline;}

/* CHOICES */
.tg-choices{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:20px;}
.tg-choice{border-radius:16px;padding:22px;display:flex;flex-direction:column;gap:10px;border:2px solid transparent;cursor:pointer;transition:all .2s;}
.tg-choice-light{background:#fff8f6;border-color:rgba(34,197,94,0.2);}
.tg-choice-light:hover{border-color:#22c55e;}
.tg-choice-dark{background:#090916;border-color:#1e1e3a;}
.tg-choice-dark:hover{border-color:#5b4fff;}
.tg-choice-icon-wrap{font-size:36px;display:flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:14px;background:rgba(0,0,0,0.06);}
.tg-choice-dark .tg-choice-icon-wrap{background:rgba(255,255,255,0.04);}
.tg-choice-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:800;color:#0a0a12;}
.tg-choice-free{font-size:12px;font-weight:800;color:#15803d;}
.tg-choice-list{list-style:none;display:flex;flex-direction:column;gap:5px;flex:1;}
.tg-choice-list li{font-size:12px;font-weight:600;color:#4a4a6a;}
.tg-choice-btn{padding:13px;border-radius:11px;border:none;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .18s;margin-top:4px;}
.tg-choice-btn:disabled{opacity:.5;cursor:not-allowed;}
.tg-choice-btn-dark{background:#0a0a12;color:#fff;}
.tg-choice-btn-dark:hover:not(:disabled){background:#1a1a2e;}
.tg-choice-btn-gh{background:#5b4fff;color:#fff;}
.tg-choice-btn-gh:hover:not(:disabled){opacity:.88;}
.tg-choice-note{font-size:10px;font-weight:500;color:#3a3a6a;text-align:center;}

@media(max-width:800px){.tg-grid{grid-template-columns:1fr;}.tg-choices{grid-template-columns:1fr;}}
`
