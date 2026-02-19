import React, { useEffect, useRef, useState } from 'react';
import { STATS } from '../../data';
import './Hero.css';
import profile from "../../assets/resume/photo.png";

export default function Hero() {
  const heroRef = useRef(null);
  const card3dRef = useRef(null);
  const textRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  /* GSAP-like stagger on mount */
  useEffect(() => {
    const elements = textRef.current?.querySelectorAll('.hero-anim');
    elements?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12 + 0.2}s`;
      el.classList.add('animate');
    });
  }, []);

  /* 3D TILT on hero card */
  const handleMouseMove = (e) => {
    const rect = card3dRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -14, y: dx * 14 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });
const scrollToContact = () => {
    const section = document.getElementById("contact-page");
    section.scrollIntoView({ behavior: "smooth" });
  };
  /* Btn ripple */
  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-inner">
        {/* LEFT: TEXT */}
        <div className="hero-text" ref={textRef}>
          <div className="hero-anim hero-badge">
            <span className="badge-dot" />
            <span>Available for work · 2026</span>
          </div>

          <h1 className="hero-anim hero-title">
            Build<br />
            <span className="title-gradient">Design</span><br />
            <span className="title-outline">Experiences</span>
          </h1>

          <p className="hero-anim hero-desc">
            Hi, I'm <strong>Surya Prakash</strong> — a passionate UI/UX Designer
            turning complex ideas into beautiful, intuitive interfaces.
            5+ years · 60+ projects · worldwide clients.
          </p>

          <div className="hero-anim hero-actions">
            <button
              className="btn btn-primary"
              onClick={(e) => { addRipple(e); scrollTo('projects'); }}
            >
              View My Work ↗
              {ripples.map(r => (
                <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
              ))}
            </button>
            <button
              className="btn btn-outline"
             onClick={scrollToContact}
            >
              Let's Talk 💬
            </button>
          </div>

          {/* STATS */}
          <div className="hero-anim hero-stats">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: 3D CARD */}
        <div
          className="hero-card-wrap"
          ref={card3dRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '900px' }}
        >
          <div
            className="hero-card-3d"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 ? 'transform 0.7s ease' : 'transform 0.12s ease',
            }}
          >
            {/* AVATAR CARD */}
            <div className="avatar-card">
              <div className="avatar-inner">
                <div className="avatar-emoji"><img src={profile} alt="Profile" width="200" /></div>
                <div className="avatar-info">
                  <div className="avatar-name">Surya Prakash</div>
                  <div className="avatar-role">Front End Developer</div>
                </div>
                <div className="avatar-status">
                  <span className="status-dot" />
                  <span>Open to work</span>
                </div>
              </div>
              {/* FLOATING TOOL CHIPS */}
              <div className="float-chip chip-1">🎨 Figma</div>
              <div className="float-chip chip-2">✦ Adobe XD</div>
              <div className="float-chip chip-3">⬡ React Js</div>

              {/* OPACITY BOXES (3D overlay effect) */}
              <div className="box3d box3d-1" />
              <div className="box3d box3d-2" />
              <div className="box3d box3d-3" />
            </div>

            {/* MINI METRICS CARD */}
            <div className="metrics-card">
              <div className="metric-row">
                <span className="metric-label">Projects Done</span>
                <span className="metric-val accent">60+</span>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '85%', background: 'var(--btn-primary)' }} />
              </div>
              <div className="metric-row" style={{ marginTop: '10px' }}>
                <span className="metric-label">Client Satisfaction</span>
                <span className="metric-val" style={{ color: 'var(--accent-mint)' }}>98%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '98%', background: 'linear-gradient(90deg,#6dffda,#6dbaff)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
