import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── GSAP loaded from CDN via useEffect ── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    s.onload = () => resolve(window.gsap);
    document.head.appendChild(s);
  });

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const DOMAINS = [
  { id: 'all',       label: 'All Work',   icon: '◈' },
  { id: 'fintech',   label: 'FinTech',    icon: '₿' },
  { id: 'healthtech',label: 'HealthTech', icon: '⚕' },
  { id: 'gambling',label: 'Gambling', icon: '⚕' },
  { id: 'edtech',    label: 'EdTech',     icon: '◎' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '◉' },
  { id: 'training',  label: 'Training',   icon: '✦' },
];

const TOOLS = {
  figma:      { label: 'Figma',         color: '#F24E1E' },
  adobexd:    { label: 'Adobe XD',      color: '#FF61F6' },
  framer:     { label: 'Framer',        color: '#0055FF' },
  photoshop:  { label: 'Photoshop',     color: '#31A8FF' },
  illustrator:{ label: 'Illustrator',   color: '#FF9A00' },
};

const PROJECTS = [
  {
    id: 1,
    domain: 'fintech',
    title: 'Crypto Wallet & DeFi Platform',
    subtitle: 'Web3 · NFT · Launchpad · IDO',
    year: '2023',
    duration: '12 weeks',
    role: 'UI/UX Designer',
    tools: ['figma', 'photoshop', 'illustrator'],
    tags: ['Web3', 'DeFi', 'NFT', 'Wallet', 'Launchpad', 'IDO'],
    screens: 48,
    color: '#6d28d9',
    accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0f0a1e 100%)',
    overview: 'End-to-end UI/UX design for a full-stack Web3 ecosystem — encompassing a crypto wallet, NFT marketplace, DeFi dashboard, token launchpad, and IDO platform. Focused on simplifying complex blockchain interactions into a seamless, trustworthy experience.',
    contributions: [
      'Designed 48-screen Figma prototype across 6 product modules',
      'Created motion-rich micro-interactions for transaction flows',
      'Built a comprehensive design system with dark/light theming',
      'Conducted user research with 30+ crypto-native users',
      'Collaborated with devs using Zeplin handoff & token documentation',
    ],
    results: ['40% reduction in onboarding drop-off', '92% usability score in testing', 'Shipped to 15k+ users on launch'],
    emoji: '₿',
  },
  {
    id: 2,
    domain: 'fintech',
    title: 'Payment App Redesign',
    subtitle: 'Mobile · UPI · P2P Transfer',
    year: '2022',
    duration: '8 weeks',
    role: 'Senior UI/UX Designer',
    tools: ['figma', 'illustrator', 'photoshop'],
    tags: ['Payments', 'UPI', 'Mobile App', 'Redesign'],
    screens: 32,
    color: '#0c4a6e',
    accent: '#38bdf8',
    gradient: 'linear-gradient(135deg, #041c2c 0%, #060d14 100%)',
    overview: 'Complete UX overhaul of a payment app serving 500k+ users. Redesigned the end-to-end flow from onboarding to transaction history, focusing on speed, clarity, and trust.',
    contributions: [
      'Full UX audit with heatmaps and session recordings',
      'Redesigned 32 screens with a new component library',
      'Simplified P2P flow from 7 steps to 3 taps',
      'Introduced biometric-first authentication UX',
      'Created animated success/error feedback states',
    ],
    results: ['55% faster transaction completion', '4.7★ App Store rating post-launch', '28% increase in DAU'],
    emoji: '💳',
  },
  {
    id: 3,
    domain: 'healthtech',
    title: 'Hospital Management Dashboard',
    subtitle: 'Web App · Admin · Patient Flow',
    year: '2023',
    duration: '10 weeks',
    role: 'Lead UI/UX Designer',
    tools: ['figma', 'adobexd', 'illustrator'],
    tags: ['Healthcare', 'Dashboard', 'Admin Panel', 'SaaS'],
    screens: 56,
    color: '#065f46',
    accent: '#34d399',
    gradient: 'linear-gradient(135deg, #011f17 0%, #050f0b 100%)',
    overview: 'Comprehensive design of a hospital management system covering patient registration, doctor scheduling, bed management, billing, and real-time analytics — used across 12 hospitals.',
    contributions: [
      'Mapped 14 user roles and their unique workflow needs',
      'Designed an accessible data-dense dashboard with WCAG 2.1 AA',
      'Built 56-screen prototype with interactive data tables',
      'Created icon library of 200+ medical-specific icons in Illustrator',
      'Ran usability sessions with doctors, nurses, and admin staff',
    ],
    results: ['60% reduction in patient wait data entry time', 'Deployed across 12 hospitals', '98% staff adoption rate'],
    emoji: '🏥',
  },
  {
    id: 4,
    domain: 'gambling',
    title: 'Betji Poker',
    subtitle: 'Games · Betting · Sports',
    year: '2024',
    duration: '6 weeks',
    role: 'UI/UX Designer',
    tools: ['figma', 'photoshop', 'illustrator'],
    tags: ['Health', 'Fitness', 'Mobile App', 'Wellbeing'],
    screens: 38,
    color: '#7c2d12',
    accent: '#fb923c',
    gradient: 'linear-gradient(135deg, #280f06 0%, #100603 100%)',
    overview: 'Gambling platforms allow users to place bets on sports events, casino games, and poker using real or virtual money through secure online systems.They include features like user accounts, live betting, payment processing, and fair play systems for games such as sports betting.',
    contributions: [
      'Graphic Designers: Create posters, banners, and visual marketing materials.',
      'Web Designers: Design responsive layouts and interfaces for websites.',
      'Mobile & Tablet Designers: Develop optimized UI designs for mobile and tablet devices.',
      'UX Researchers: Analyze user behavior, conduct research, and improve user experience.',
      'UX/UI Designers: Design user-friendly interfaces, wireframes, and interactive prototypes.',
    ],
    results: ['4.8★ Avg rating across 2k+ reviews', '73% 30-day retention rate', 'Featured in App Store health category'],
    emoji: '🎰',
  },
  {
    id: 5,
    domain: 'edtech',
    title: 'Education Dashboard Platform',
    subtitle: 'LMS · Student · Teacher · Admin',
    year: '2025',
    duration: '14 weeks',
    role: 'Lead UI/UX Designer',
    tools: ['figma'],
    tags: ['EdTech', 'LMS', 'Dashboard', 'SaaS'],
    screens: 72,
    color: '#1e3a5f',
    accent: '#60a5fa',
    gradient: 'linear-gradient(135deg, #081428 0%, #050810 100%)',
    overview: 'Designed a full-featured Learning Management System with distinct experiences for students, teachers, and administrators. Covers live classes, assignments, grading, analytics, and gamified learning paths.',
    contributions: [
      'Designed 3 separate role-based portals (72 screens total)',
      'Created an interactive course builder UI for teachers',
      'Gamified student dashboard with XP, badges, leaderboards',
      'Built a reusable component library published in Figma',
      'Coordinated handoff using Figma',
    ],
    results: ['Used by 50+ students in 6 months', 'NPS score of 72', '35% improvement in course completion rate'],
    emoji: '📚',
  },
  {
    id: 6,
    domain: 'ecommerce',
    title: 'E-Commerce Platform UI',
    subtitle: 'Web · Mobile · D2C Brand',
    year: '2022',
    duration: '9 weeks',
    role: 'Senior UI/UX Designer',
    tools: ['figma', 'photoshop', 'webflow'],
    tags: ['E-Commerce', 'D2C', 'Responsive', 'Conversion'],
    screens: 44,
    color: '#4a1d96',
    accent: '#c084fc',
    gradient: 'linear-gradient(135deg, #1a0b33 0%, #0c0614 100%)',
    overview: 'End-to-end UI design for a D2C fashion e-commerce platform. Covered product discovery, PDP, cart, checkout, and post-purchase experience across web and mobile with a strong editorial visual identity.',
    contributions: [
      'Designed 44 screens including editorial landing pages',
      'Created a high-converting product detail page template',
      'Built mobile-first responsive design system',
      'Optimized checkout flow (reduced to 2 steps)',
      'Designed email notification templates and empty states',
    ],
    results: ['22% increase in conversion rate', '35% lower cart abandonment', 'Avg session duration up 48%'],
    emoji: '🛍',
  },
  {
    id: 7,
    domain: 'training',
    title: 'UI Design Trainer — FITA Academy',
    subtitle: 'Classroom · 2 Batches · Curriculum Design',
    year: '2023',
    duration: '2 Batches',
    role: 'UI Design Trainer',
    tools: ['figma', 'adobexd', 'illustrator', 'photoshop'],
    tags: ['Training', 'Teaching', 'Figma', 'UI Design', 'FITA Academy'],
    screens: null,
    students: '40+ Students',
    color: '#713f12',
    accent: '#fbbf24',
    gradient: 'linear-gradient(135deg, #271605 0%, #100902 100%)',
    overview: 'Trained 2 batches of aspiring UI designers at FITA Academy — one of India\'s leading training institutes. Delivered hands-on curriculum covering UI fundamentals, design tools, real-world project workflows, and portfolio building.',
    contributions: [
      'Designed complete 8-week UI Design curriculum from scratch',
      'Conducted live sessions on Figma, Adobe XD, and Illustrator',
      'Mentored 40+ students across 2 batches with 1-on-1 feedback',
      'Assigned real-world briefs: app redesigns, design systems, case studies',
      'Guided students in building job-ready portfolios',
      'Coordinated with FITA Academy for batch scheduling and materials',
    ],
    results: ['40+ students trained across 2 batches', '90% placement success rate', 'Rated 4.9/5 by students'],
    emoji: '🎓',
    isTraining: true,
  },
];

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function ToolBadge({ toolKey }) {
  const t = TOOLS[toolKey];
  if (!t) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
      background: `${t.color}18`,
      border: `1px solid ${t.color}40`,
      color: t.color,
      whiteSpace: 'nowrap',
    }}>
      {t.label}
    </span>
  );
}

/* ══════════════════════════════════════════════
   PROJECT DETAIL MODAL
══════════════════════════════════════════════ */
function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);

  useEffect(() => {
    loadGSAP().then(gsap => {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 48, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 });
    });
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    loadGSAP().then(gsap => {
      gsap.to(panelRef.current,   { opacity: 0, y: 30, scale: 0.96, duration: 0.3, ease: 'power2.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onClose });
    });
  };

  const p = project;

  return (
    <div ref={overlayRef} onClick={(e) => e.target === overlayRef.current && handleClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
      }}>
      <div ref={panelRef} style={{
        width: '100%', maxWidth: 780,
        maxHeight: '90vh', overflowY: 'auto',
        background: '#0d0f18',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 28,
        boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px ${p.accent}22`,
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.08) transparent',
      }}>

        {/* Hero banner */}
        <div style={{
          background: p.gradient, padding: '48px 40px 36px',
          borderRadius: '28px 28px 0 0', position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative ring */}
          <div style={{
            position: 'absolute', right: -40, top: -40,
            width: 200, height: 200, borderRadius: '50%',
            border: `1px solid ${p.accent}30`,
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0,
            width: 140, height: 140, borderRadius: '50%',
            border: `1px solid ${p.accent}20`,
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, position: 'relative' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: `${p.accent}18`, border: `1px solid ${p.accent}35`,
                borderRadius: 999, padding: '4px 13px', marginBottom: 16,
              }}>
                <span style={{ fontSize: 11, color: p.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
                  {p.isTraining ? 'Training' : p.domain}
                </span>
              </div>
              <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 12 }}>{p.emoji}</div>
              <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(22px, 4vw, 32px)',
                fontWeight: 800, color: '#f8fafc',
                lineHeight: 1.15, marginBottom: 8,
              }}>{p.title}</h2>
              <p style={{ fontSize: 14, color: p.accent, fontWeight: 500 }}>{p.subtitle}</p>
            </div>
            <button onClick={handleClose} style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#94a3b8', cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all .2s',
            }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >✕</button>
          </div>

          {/* Meta pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
            {[
              { icon: '👤', label: p.role },
              { icon: '📅', label: p.year },
              { icon: '⏱', label: p.duration },
              ...(p.screens ? [{ icon: '🖥', label: `${p.screens} Screens` }] : []),
              ...(p.students ? [{ icon: '🎓', label: p.students }] : []),
            ].map((m, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 999,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 12, color: '#cbd5e1', fontWeight: 500,
              }}>
                {m.icon} {m.label}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '36px 40px 40px' }}>

          {/* Overview */}
          <section style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: p.accent, fontWeight: 700, marginBottom: 12 }}>
              Overview
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#94a3b8' }}>{p.overview}</p>
          </section>

          {/* Tools */}
          <section style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: p.accent, fontWeight: 700, marginBottom: 14 }}>
              Tools Used
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.tools.map(t => <ToolBadge key={t} toolKey={t} />)}
            </div>
          </section>

          {/* My Contributions */}
          <section style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: p.accent, fontWeight: 700, marginBottom: 16 }}>
              My Contributions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.contributions.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: `${p.accent}18`, border: `1px solid ${p.accent}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: p.accent, fontWeight: 700,
                    flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#94a3b8' }}>{c}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Results */}
          <section>
            <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: p.accent, fontWeight: 700, marginBottom: 16 }}>
              Results & Impact
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {p.results.map((r, i) => (
                <div key={i} style={{
                  padding: '16px 18px',
                  background: `${p.color}22`,
                  border: `1px solid ${p.accent}25`,
                  borderRadius: 14,
                }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>
                    {i === 0 ? '📈' : i === 1 ? '⭐' : '🚀'}
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: '#cbd5e1', fontWeight: 500 }}>{r}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tags */}
          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                padding: '4px 11px', borderRadius: 999,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 11, color: '#64748b',
              }}>#{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROJECT CARD — GRID view
══════════════════════════════════════════════ */
function GridCard({ project, onOpen, index }) {
  const cardRef = useRef(null);
  const p = project;

  useEffect(() => {
    loadGSAP().then(gsap => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55, ease: 'power3.out',
          delay: index * 0.07,
        }
      );
    });
  }, [index]);

  return (
    <div ref={cardRef} onClick={() => onOpen(p)}
      style={{
        background: '#0d0f18',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 22, overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = p.accent + '50';
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${p.accent}25`;
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Card hero */}
      <div style={{
        background: p.gradient, padding: '32px 28px 26px',
        position: 'relative', overflow: 'hidden',
        minHeight: 160,
      }}>
        <div style={{
          position: 'absolute', right: -30, bottom: -30,
          width: 130, height: 130, borderRadius: '50%',
          border: `1px solid ${p.accent}25`,
        }} />
        <div style={{
          position: 'absolute', right: 14, top: 14,
          fontSize: 44, lineHeight: 1, opacity: 0.5,
        }}>{p.emoji}</div>

        <div style={{
          display: 'inline-block',
          background: `${p.accent}20`, border: `1px solid ${p.accent}40`,
          borderRadius: 999, padding: '3px 11px', marginBottom: 12,
        }}>
          <span style={{ fontSize: 10, color: p.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
            {p.isTraining ? 'Training' : DOMAINS.find(d => d.id === p.domain)?.label}
          </span>
        </div>

        <h3 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18, fontWeight: 800, color: '#f1f5f9',
          lineHeight: 1.2, marginBottom: 5,
        }}>{p.title}</h3>
        <p style={{ fontSize: 12, color: p.accent, fontWeight: 500 }}>{p.subtitle}</p>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 24px 22px' }}>
        {/* Meta row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { label: p.year },
            { label: p.screens ? `${p.screens} screens` : p.students },
            { label: p.duration },
          ].map((m, i) => (
            <span key={i} style={{ fontSize: 11, color: '#475569', fontWeight: 500 }}>
              {i > 0 && <span style={{ marginRight: 12, opacity: 0.3 }}>·</span>}
              {m.label}
            </span>
          ))}
        </div>

        {/* Role */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 11px', borderRadius: 999,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          fontSize: 11, color: '#94a3b8',
          marginBottom: 16,
        }}>
          👤 {p.role}
        </div>

        {/* Tools */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {p.tools.slice(0, 3).map(t => <ToolBadge key={t} toolKey={t} />)}
          {p.tools.length > 3 && (
            <span style={{ fontSize: 11, color: '#475569', padding: '3px 8px', alignSelf: 'center' }}>
              +{p.tools.length - 3} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16,
        }}>
          <span style={{ fontSize: 12, color: '#334155' }}>View case study</span>
          <span style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `${p.accent}15`, border: `1px solid ${p.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, color: p.accent,
          }}>→</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROJECT ROW — LIST view
══════════════════════════════════════════════ */
function ListRow({ project, onOpen, index }) {
  const rowRef = useRef(null);
  const p = project;

  useEffect(() => {
    loadGSAP().then(gsap => {
      gsap.fromTo(rowRef.current,
        { opacity: 0, x: -32 },
        { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out', delay: index * 0.06 }
      );
    });
  }, [index]);

  return (
    <div ref={rowRef} onClick={() => onOpen(p)}
      style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '20px 24px',
        background: '#0d0f18',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16, cursor: 'pointer',
        transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = p.accent + '45';
        e.currentTarget.style.background = '#111420';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.background = '#0d0f18';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      {/* Emoji circle */}
      <div style={{
        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
        background: p.gradient, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 26,
        border: `1px solid ${p.accent}30`,
      }}>{p.emoji}</div>

      {/* Main info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 16, fontWeight: 700, color: '#f1f5f9',
          }}>{p.title}</h3>
          <span style={{ fontSize: 11, color: p.accent, fontWeight: 600 }}>{p.year}</span>
        </div>
        <p style={{ fontSize: 12, color: '#475569', marginTop: 3 }}>{p.subtitle}</p>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {p.tools.slice(0, 4).map(t => <ToolBadge key={t} toolKey={t} />)}
        </div>
      </div>

      {/* Role + screens — hidden on small */}
      <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <span style={{
          fontSize: 11, color: '#64748b',
          padding: '3px 10px', borderRadius: 999,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          whiteSpace: 'nowrap',
        }}>{p.role}</span>
        <span style={{ fontSize: 11, color: '#334155' }}>
          {p.screens ? `${p.screens} screens` : p.students}
        </span>
      </div>

      {/* Arrow */}
      <span style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: `${p.accent}12`, border: `1px solid ${p.accent}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, color: p.accent,
      }}>→</span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function Projects() {
  const [activeDomain, setActiveDomain] = useState('all');
  const [viewMode,     setViewMode]     = useState('grid'); // 'grid' | 'list'
  const [selected,     setSelected]     = useState(null);
  const headerRef = useRef(null);
  const tabsRef   = useRef(null);
  const toolsRef  = useRef(null);

  /* Filter */
  const filtered = activeDomain === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.domain === activeDomain);

  /* GSAP header + tabs entrance */
  useEffect(() => {
    loadGSAP().then(gsap => {
      const tl = gsap.timeline();
      tl.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
      tl.fromTo(tabsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      );
      tl.fromTo(toolsRef.current?.querySelectorAll('.tool-chip') || [],
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, stagger: 0.04, duration: 0.35, ease: 'back.out(1.5)' },
        '-=0.2'
      );
    });
  }, []);

  /* GSAP animate when domain/view changes */
  const listContainerRef = useRef(null);
  useEffect(() => {
    if (!listContainerRef.current) return;
    loadGSAP().then(gsap => {
      gsap.fromTo(listContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    });
  }, [activeDomain, viewMode]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes pglow  { 0%,100%{opacity:.09} 50%{opacity:.15} }
        @keyframes pshine {
          0%  { background-position: -200% center }
          100% { background-position:  200% center }
        }
        @keyframes pfadein { from{opacity:0} to{opacity:1} }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        #projects {
          min-height: 100vh;
          background: #06080f;
          padding: 80px 24px 100px;
          font-family: 'DM Sans', sans-serif;
          color: #94a3b8;
          position: relative;
          overflow: hidden;
        }
        .p-orb {
          position: absolute; border-radius: 50%;
          filter: blur(130px); pointer-events: none;
          animation: pglow 8s ease-in-out infinite;
        }
        .p-orb-1 { width:700px;height:700px;background:#3b0764;top:-250px;left:-200px;opacity:.09; }
        .p-orb-2 { width:600px;height:600px;background:#082f49;bottom:-180px;right:-200px;opacity:.08; }
        .p-orb-3 { width:400px;height:400px;background:#431407;top:40%;right:5%;opacity:.06;animation-delay:4s; }

        .p-wrap {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .p-header { margin-bottom: 52px; }
        .p-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 18px;
        }
        .p-eyebrow-line { width:28px;height:2px;background:linear-gradient(90deg,#7c3aed,transparent);border-radius:2px; }
        .p-eyebrow-txt  { font-size:11px;letter-spacing:3.5px;text-transform:uppercase;color:#7c3aed;font-weight:700; }
        .p-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 6vw, 64px);
          font-weight: 800; color: #f8fafc;
          line-height: 1.07; margin-bottom: 16px;
        }
        .p-title-grad {
          background: linear-gradient(120deg,#a78bfa,#38bdf8,#f472b6,#a78bfa);
          background-size: 260% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pshine 5s linear infinite;
        }
        .p-subtitle { font-size:16px;color:#475569;line-height:1.65;max-width:560px; }

        /* Tools strip */
        .p-tools-strip {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 40px;
        }
        .tool-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 999px;
          font-size: 12px; font-weight: 600;
          opacity: 0;
        }

        /* Domain tabs */
        .p-tabs {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .p-tab-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 18px; border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #475569; font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.22s ease;
        }
        .p-tab-btn:hover { background:rgba(255,255,255,0.07);color:#94a3b8; }
        .p-tab-btn.active {
          background: rgba(124,58,237,0.18);
          border-color: rgba(124,58,237,0.4);
          color: #c4b5fd;
        }
        .p-tab-icon { font-size: 14px; }

        /* Toolbar row */
        .p-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px; gap: 12px; flex-wrap: wrap;
        }
        .p-count { font-size: 13px; color: #334155; }
        .p-count span { color: #64748b; font-weight: 600; }
        .p-view-toggle {
          display: flex; gap: 4px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 4px;
        }
        .p-view-btn {
          width: 32px; height: 32px; border-radius: 7px;
          background: transparent; border: none;
          cursor: pointer; color: #475569; font-size: 15px;
          display: flex; align-items: center; justify-content: center;
          transition: all .2s;
        }
        .p-view-btn.active { background:rgba(124,58,237,0.25);color:#c4b5fd; }
        .p-view-btn:hover:not(.active) { background:rgba(255,255,255,0.06);color:#94a3b8; }

        /* Grid */
        .p-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 20px;
        }

        /* List */
        .p-list { display: flex; flex-direction: column; gap: 12px; }

        @media (max-width: 600px) {
          .p-grid { grid-template-columns: 1fr; }
          .p-title { font-size: 34px; }
        }
      `}</style>

      <section id="projects">
        <div className="p-orb p-orb-1" />
        <div className="p-orb p-orb-2" />
        <div className="p-orb p-orb-3" />

        <div className="p-wrap">

          {/* ── Header ── */}
          <div className="p-header" ref={headerRef} style={{ opacity: 0 }}>
            <div className="p-eyebrow">
              <div className="p-eyebrow-line" />
              <span className="p-eyebrow-txt">Selected Work</span>
            </div>
            <h2 className="p-title">
              Projects &<br />
              <span className="p-title-grad">Case Studies</span>
            </h2>
            <p className="p-subtitle">
              5 years designing across FinTech, HealthTech, EdTech, E-Commerce and Web3.
              Each project crafted with intention — from research to pixel-perfect delivery.
            </p>
          </div>

          {/* ── Tools strip ── */}
          <div className="p-tools-strip" ref={toolsRef}>
            {Object.entries(TOOLS).map(([key, t]) => (
              <span key={key} className="tool-chip" style={{
                background: `${t.color}14`,
                border: `1px solid ${t.color}35`,
                color: t.color,
              }}>
                {t.label}
              </span>
            ))}
          </div>

          {/* ── Domain Tabs ── */}
          <div className="p-tabs" ref={tabsRef} style={{ opacity: 0 }}>
            {DOMAINS.map(d => (
              <button
                key={d.id}
                className={`p-tab-btn ${activeDomain === d.id ? 'active' : ''}`}
                onClick={() => setActiveDomain(d.id)}
              >
                <span className="p-tab-icon">{d.icon}</span>
                {d.label}
                {d.id !== 'all' && (
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: 'rgba(255,255,255,0.07)',
                    padding: '1px 7px', borderRadius: 999,
                  }}>
                    {PROJECTS.filter(p => p.domain === d.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Toolbar ── */}
          <div className="p-toolbar">
            <div className="p-count">
              Showing <span>{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
              {activeDomain !== 'all' && ` in ${DOMAINS.find(d => d.id === activeDomain)?.label}`}
            </div>
            <div className="p-view-toggle">
              <button
                className={`p-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                className={`p-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>

          {/* ── Projects ── */}
          <div ref={listContainerRef}>
            {viewMode === 'grid' ? (
              <div className="p-grid">
                {filtered.map((p, i) => (
                  <GridCard key={p.id} project={p} onOpen={setSelected} index={i} />
                ))}
              </div>
            ) : (
              <div className="p-list">
                {filtered.map((p, i) => (
                  <ListRow key={p.id} project={p} onOpen={setSelected} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* ── Empty state ── */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#334155' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>◎</div>
              <p style={{ fontSize: 15 }}>No projects in this domain yet.</p>
            </div>
          )}

        </div>
      </section>

      {/* ── Detail Modal ── */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
