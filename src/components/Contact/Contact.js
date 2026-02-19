import React, { useEffect, useRef, useState } from 'react';

const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    s.onload = () => resolve(window.gsap);
    document.head.appendChild(s);
  });

const CONTACT = {
  email: 'suryasachin477@gmail.com',
  phone: '+91 94894 23 900',
};

const AVAILABILITY = [
  {
    id: 'wfh', label: 'Work From Home', short: 'WFH', icon: '⌂',
    statusLabel: 'Available', color: '#059669', accent: '#34d399',
    gradient: 'linear-gradient(135deg,#022c1f 0%,#050f0b 100%)', glow: '#059669',
    description: 'Fully remote setup with high-speed fibre, dual monitor, and a distraction-free workspace ready to go.',
    perks: ['Async-friendly', 'IST timezone', 'Video-call ready'],
  },
  {
    id: 'hybrid', label: 'Hybrid', short: 'Hybrid', icon: '⇄',
    statusLabel: 'Preferred', color: '#7c3aed', accent: '#a78bfa',
    gradient: 'linear-gradient(135deg,#1a0533 0%,#0c0619 100%)', glow: '#7c3aed',
    description: 'Comfortable splitting time between remote and on-site — flexible to your team cadence and sprint cycles.',
    perks: ['Flexible schedule', 'Collaborative sprints', 'Weekly check-ins'],
  },
  {
    id: 'office', label: 'On-Site / Office', short: 'Office', icon: '◫',
    statusLabel: 'Open', color: '#0369a1', accent: '#38bdf8',
    gradient: 'linear-gradient(135deg,#021525 0%,#060d14 100%)', glow: '#0369a1',
    description: 'Open to full-time on-site roles in Chennai and across India for the right opportunity.',
    perks: ['Chennai based', 'Pan-India open', 'Immediate joining'],
  },
];

function CopyBtn({ value, accent }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button onClick={copy} style={{
      background: copied ? `${accent}22` : 'rgba(255,255,255,0.05)',
      border: `1px solid ${copied ? accent+'55' : 'rgba(255,255,255,0.09)'}`,
      borderRadius:8, color: copied ? accent : '#64748b',
      cursor:'pointer', fontSize:11, fontWeight:600,
      padding:'4px 11px', transition:'all .25s',
      letterSpacing:0.4, fontFamily:'inherit', whiteSpace:'nowrap',
    }}>{copied ? '✓ Copied' : 'Copy'}</button>
  );
}

function AvailCard({ item, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    loadGSAP().then(gsap => {
      gsap.fromTo(cardRef.current,
        { opacity:0, y:50, scale:0.92 },
        { opacity:1, y:0, scale:1, duration:0.7, ease:'power4.out', delay:0.6 + index*0.13 }
      );
    });
  }, [index]);

  const handleMouseMove = e => {
    const rect = cardRef.current.getBoundingClientRect();
    if (glowRef.current) {
      glowRef.current.style.left = (e.clientX - rect.left) + 'px';
      glowRef.current.style.top  = (e.clientY - rect.top) + 'px';
    }
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        loadGSAP().then(gsap => {
          gsap.to(cardRef.current, { y:-8, scale:1.02, duration:0.35, ease:'power2.out' });
          if (glowRef.current) gsap.to(glowRef.current, { opacity:1, duration:0.3 });
        });
        cardRef.current.style.borderColor = item.accent + '55';
        cardRef.current.style.boxShadow = `0 24px 64px rgba(0,0,0,0.6),0 0 0 1px ${item.accent}20`;
      }}
      onMouseLeave={() => {
        loadGSAP().then(gsap => {
          gsap.to(cardRef.current, { y:0, scale:1, duration:0.4, ease:'power2.out' });
          if (glowRef.current) gsap.to(glowRef.current, { opacity:0, duration:0.4 });
        });
        cardRef.current.style.borderColor = 'rgba(255,255,255,0.07)';
        cardRef.current.style.boxShadow = 'none';
      }}
      style={{ background:'#0b0e1a', border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:24, overflow:'hidden', position:'relative',
        opacity:0, cursor:'default', transition:'border-color .3s, box-shadow .3s' }}>

      {/* Mouse glow */}
      <div ref={glowRef} style={{ position:'absolute', width:200, height:200, borderRadius:'50%',
        background:`radial-gradient(circle,${item.glow}30 0%,transparent 70%)`,
        transform:'translate(-50%,-50%)', pointerEvents:'none', opacity:0,
        transition:'opacity .3s', zIndex:0 }} />

      {/* Hero band */}
      <div style={{ background:item.gradient, padding:'28px 26px 24px',
        position:'relative', borderBottom:`1px solid ${item.accent}18` }}>
        <div style={{ position:'absolute', right:-32, top:-32, width:140, height:140,
          borderRadius:'50%', border:`1px solid ${item.accent}18`, pointerEvents:'none' }} />
        <div style={{ display:'inline-flex', alignItems:'center', gap:6,
          background:`${item.accent}18`, border:`1px solid ${item.accent}40`,
          borderRadius:999, padding:'4px 12px', marginBottom:18, position:'relative', zIndex:1 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:item.accent,
            boxShadow:`0 0 8px ${item.accent}`, animation:'cpulse 2s ease-in-out infinite',
            display:'inline-block' }} />
          <span style={{ fontSize:10, color:item.accent, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase' }}>
            {item.statusLabel}
          </span>
        </div>
        <div style={{ fontSize:44, lineHeight:1, color:item.accent, fontFamily:"'Syne',sans-serif",
          fontWeight:800, marginBottom:14, position:'relative', zIndex:1 }}>{item.icon}</div>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(18px,2.5vw,22px)',
          fontWeight:800, color:'#f8fafc', lineHeight:1.15, position:'relative', zIndex:1 }}>
          {item.label}
        </h3>
      </div>

      {/* Body */}
      <div style={{ padding:'22px 26px 26px', position:'relative', zIndex:1 }}>
        <p style={{ fontSize:13, lineHeight:1.75, color:'#64748b', marginBottom:20 }}>{item.description}</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {item.perks.map((perk,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:18, height:18, borderRadius:'50%', background:`${item.accent}15`,
                border:`1px solid ${item.accent}35`, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:9, color:item.accent, flexShrink:0 }}>✓</span>
              <span style={{ fontSize:13, color:'#94a3b8', fontWeight:500 }}>{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const tagRef     = useRef(null);
  const titleRef   = useRef(null);
  const emailRef   = useRef(null);
  const phoneRef   = useRef(null);
  const locRef     = useRef(null);
  const divRef     = useRef(null);
  const availTitle = useRef(null);
  const socialRef  = useRef(null);

  useEffect(() => {
    loadGSAP().then(gsap => {
      const tl = gsap.timeline({ defaults:{ ease:'power4.out' } });
      tl.fromTo(tagRef.current,   { opacity:0, y:16 }, { opacity:1, y:0, duration:0.5 })
        .fromTo(titleRef.current, { opacity:0, y:30 }, { opacity:1, y:0, duration:0.7 }, '-=0.25')
        .fromTo(divRef.current,   { opacity:0, scaleX:0 }, { opacity:1, scaleX:1, duration:0.6, transformOrigin:'left' }, '-=0.3')
        .fromTo(emailRef.current, { opacity:0, x:-24 }, { opacity:1, x:0, duration:0.55 }, '-=0.3')
        .fromTo(phoneRef.current, { opacity:0, x:-24 }, { opacity:1, x:0, duration:0.55 }, '-=0.38')
        .fromTo(locRef.current,   { opacity:0, x:-24 }, { opacity:1, x:0, duration:0.55 }, '-=0.38')
        .fromTo(availTitle.current, { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5 }, '-=0.1')
        .fromTo(socialRef.current?.querySelectorAll('.c-social-btn') || [],
          { opacity:0, y:14, scale:0.9 },
          { opacity:1, y:0, scale:1, stagger:0.08, duration:0.4, ease:'back.out(1.5)' }, '+=0.1');
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes cpulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.7)} }
        @keyframes corb    { 0%,100%{opacity:.08} 50%{opacity:.14} }
        @keyframes cmarquee{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes cshine  { 0%{background-position:-300% center} 100%{background-position:300% center} }

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        #contact-page {
          min-height:100vh;
          background:#05070d;
          font-family:'DM Sans',sans-serif;
          color:#64748b;
          position:relative;
          overflow:hidden;
        }

        /* Orbs */
        .cp-orb { position:fixed; border-radius:50%; filter:blur(120px);
          pointer-events:none; animation:corb 9s ease-in-out infinite; }
        .cp-orb-1 { width:800px;height:800px;background:#3b0764;top:-300px;left:-300px;opacity:.08; }
        .cp-orb-2 { width:700px;height:700px;background:#052e4a;bottom:-250px;right:-250px;opacity:.07;animation-delay:4s; }
        .cp-orb-3 { width:500px;height:500px;background:#3f1505;top:35%;left:40%;opacity:.06;animation-delay:7s; }

        /* Dot grid */
        .cp-dotgrid { position:fixed;inset:0;pointer-events:none;z-index:0;
          background-image:radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px);
          background-size:36px 36px; }

        /* Wrapper */
        .cp-wrap { max-width:1040px; margin:0 auto; padding:96px 28px 120px; position:relative; z-index:1; }

        /* ── Hero 2-col grid ── */
        .cp-hero { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; margin-bottom:72px; }

        /* Left */
        .cp-tag { display:inline-flex;align-items:center;gap:9px;margin-bottom:20px;opacity:0; }
        .cp-tag-line { width:24px;height:2px;background:linear-gradient(90deg,#7c3aed,transparent);border-radius:2px; }
        .cp-tag-txt  { font-size:11px;letter-spacing:3.5px;text-transform:uppercase;color:#7c3aed;font-weight:700; }
        .cp-title { font-family:'Syne',sans-serif; font-size:clamp(40px,6vw,72px);
          font-weight:800; line-height:1.05; color:#f8fafc; margin-bottom:8px; opacity:0; }
        .cp-title-sub {
          font-family:'Syne',sans-serif; font-size:clamp(40px,6vw,72px);
          font-weight:800; line-height:1.05;
          background:linear-gradient(120deg,#a78bfa 0%,#38bdf8 40%,#f472b6 75%,#a78bfa 100%);
          background-size:300% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; animation:cshine 6s linear infinite;
        }
        .cp-divider { width:100%;height:1px;
          background:linear-gradient(90deg,rgba(124,58,237,0.4),rgba(56,189,248,0.2),transparent);
          margin:28px 0; opacity:0; }
        .cp-status { display:inline-flex;align-items:center;gap:8px;
          padding:7px 16px;border-radius:999px;
          background:rgba(5,150,105,0.1);border:1px solid rgba(52,211,153,0.3);
          font-size:12px;color:#34d399;font-weight:600; }
        .cp-status-dot { width:7px;height:7px;border-radius:50%;background:#34d399;
          box-shadow:0 0 10px #34d399;animation:cpulse 2s ease-in-out infinite; }

        /* Right contact cards */
        .cp-right { display:flex;flex-direction:column;gap:14px;padding-top:8px; }
        .cp-contact-card {
          background:#0b0e1a; border:1px solid rgba(255,255,255,0.07);
          border-radius:18px; padding:20px 22px;
          display:flex; align-items:center; gap:16px;
          position:relative; overflow:hidden; opacity:0;
          text-decoration:none;
          transition:border-color .3s,transform .3s,box-shadow .3s;
        }
        .cp-contact-card:hover { transform:translateX(5px); }
        .cp-card-icon { width:46px;height:46px;border-radius:13px;
          display:flex;align-items:center;justify-content:center;
          font-size:20px;flex-shrink:0;position:relative;z-index:1; }
        .cp-card-body { flex:1;position:relative;z-index:1;min-width:0; }
        .cp-card-label { font-size:10px;letter-spacing:2.5px;text-transform:uppercase;
          font-weight:700;margin-bottom:4px; }
        .cp-card-value { font-family:'DM Mono',monospace;
          font-size:clamp(12px,2vw,15px);color:#e2e8f0;font-weight:500;
          letter-spacing:-0.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
        .cp-card-actions { display:flex;gap:8px;align-items:center;flex-shrink:0;position:relative;z-index:1; }

        /* Ticker */
        .cp-ticker-wrap { overflow:hidden;border-top:1px solid rgba(255,255,255,0.05);
          border-bottom:1px solid rgba(255,255,255,0.05);padding:13px 0;margin-bottom:64px;
          mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent); }
        .cp-ticker { display:flex;gap:0;animation:cmarquee 22s linear infinite;width:max-content; }
        .cp-ticker-item { display:inline-flex;align-items:center;gap:10px;padding:0 28px;
          font-size:11px;color:#334155;font-weight:600;letter-spacing:1px;
          text-transform:uppercase;white-space:nowrap; }
        .cp-ticker-dot { width:5px;height:5px;border-radius:50%; }

        /* Availability section */
        .cp-avail-hdr { margin-bottom:32px;opacity:0; }
        .cp-avail-hdr-top { display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap; }
        .cp-avail-title { font-family:'Syne',sans-serif;
          font-size:clamp(24px,4vw,38px);font-weight:800;color:#f1f5f9; }
        .cp-avail-sub { font-size:14px;color:#475569;margin-top:10px;line-height:1.7; }

        /* Availability 3-col grid */
        .cp-avail-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:18px; }

        /* Social */
        .cp-social { display:flex;gap:10px;flex-wrap:wrap;margin-top:52px;
          padding-top:36px;border-top:1px solid rgba(255,255,255,0.05); }
        .c-social-btn { display:inline-flex;align-items:center;gap:9px;
          padding:10px 18px;border-radius:12px;background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);color:#64748b;
          font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;
          transition:all .25s;font-family:inherit;opacity:0; }
        .c-social-btn:hover { background:rgba(255,255,255,0.09);color:#e2e8f0;
          transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.4); }
        .c-social-icon { width:26px;height:26px;border-radius:7px;
          display:flex;align-items:center;justify-content:center;
          font-size:12px;font-weight:800; }
        .cp-clock { margin-left:auto;display:flex;align-items:center;gap:8px;
          font-size:12px;color:#1e293b; }

        .cp-footer { text-align:center;padding-top:56px;font-size:12px;color:#1e293b;letter-spacing:0.3px; }

        /* ══════════════════════════════════════
           TABLET — 768px–1024px
        ══════════════════════════════════════ */
        @media (max-width:1024px) {
          .cp-wrap { padding:72px 24px 96px; }
          .cp-hero  { gap:44px; }
          .cp-avail-grid { grid-template-columns:repeat(3,1fr); gap:14px; }
          .cp-orb-1 { width:500px;height:500px; }
          .cp-orb-2 { width:460px;height:460px; }
        }

        @media (max-width:900px) {
          .cp-hero { grid-template-columns:1fr; gap:40px; margin-bottom:56px; }
          .cp-right { padding-top:0; }
          .cp-avail-grid { grid-template-columns:repeat(2,1fr); gap:14px; }
          .cp-card-value { font-size:13px; }
          .cp-card-actions { display:none; }
        }

        /* ══════════════════════════════════════
           MOBILE — max 767px
        ══════════════════════════════════════ */
        @media (max-width:767px) {
          .cp-wrap { padding:52px 16px 80px; }

          /* Hero: single col */
          .cp-hero { grid-template-columns:1fr; gap:32px; margin-bottom:44px; }
          .cp-right { padding-top:0; gap:12px; }

          /* Contact cards */
          .cp-contact-card { padding:16px 18px; border-radius:16px; gap:13px; }
          .cp-card-icon { width:40px;height:40px;font-size:18px;border-radius:11px; }
          .cp-card-value { font-size:12px; }
          .cp-card-actions { display:none; }

          /* Availability */
          .cp-avail-grid { grid-template-columns:1fr; gap:12px; }
          .cp-avail-hdr { margin-bottom:24px; }
          .cp-ticker-wrap { margin-bottom:48px; }

          /* Social row */
          .cp-social { gap:8px; padding-top:28px; margin-top:40px; }
          .c-social-btn { padding:8px 14px; font-size:12px; }
          .cp-clock { width:100%; margin-left:0; margin-top:4px; }

          /* Orbs smaller */
          .cp-orb-1 { width:300px;height:300px;top:-100px;left:-100px; }
          .cp-orb-2 { width:280px;height:280px;bottom:-80px;right:-80px; }
          .cp-orb-3 { display:none; }
        }

        /* ══════════════════════════════════════
           SMALL MOBILE — max 400px
        ══════════════════════════════════════ */
        @media (max-width:400px) {
          .cp-wrap { padding:44px 12px 72px; }
          .cp-contact-card { padding:14px 15px; gap:11px; }
          .cp-card-icon { width:36px;height:36px;font-size:16px; }
          .cp-avail-grid { gap:10px; }
          .c-social-btn { padding:7px 12px;font-size:11px; }
        }
      `}</style>

      <div id="contact-page">
        <div className="cp-orb cp-orb-1" />
        <div className="cp-orb cp-orb-2" />
        <div className="cp-orb cp-orb-3" />
        <div className="cp-dotgrid" />

        <div className="cp-wrap">

          {/* ══ HERO GRID ══ */}
          <div className="cp-hero">

            {/* LEFT */}
            <div>
              <div className="cp-tag" ref={tagRef}>
                <div className="cp-tag-line" />
                <span className="cp-tag-txt">Get In Touch</span>
              </div>
              <h1 className="cp-title" ref={titleRef}>
                Let's create<br />
                <span className="cp-title-sub">something real.</span>
              </h1>
              <div className="cp-divider" ref={divRef} />
              <p style={{ fontSize:14, lineHeight:1.8, color:'#475569', marginBottom:24 }}>
                Open to freelance projects, full-time roles, and creative collabs.
                Based in Chennai — available remote-first and worldwide.
              </p>
              <div className="cp-status">
                <span className="cp-status-dot" />
                Open to opportunities
              </div>
            </div>

            {/* RIGHT — Contact display cards */}
            <div className="cp-right">

              {/* Email */}
              <a href={`mailto:${CONTACT.email}`} ref={emailRef} className="cp-contact-card"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#a78bfa55';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5),0 0 0 1px rgba(167,139,250,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(124,58,237,0.06),transparent)',borderRadius:18,pointerEvents:'none' }} />
                <div className="cp-card-icon" style={{ background:'rgba(124,58,237,0.15)',border:'1px solid rgba(167,139,250,0.25)' }}>✉</div>
                <div className="cp-card-body">
                  <div className="cp-card-label" style={{ color:'#7c3aed' }}>Email</div>
                  <div className="cp-card-value">{CONTACT.email}</div>
                </div>
                <div className="cp-card-actions"><CopyBtn value={CONTACT.email} accent="#a78bfa" /></div>
              </a>

              {/* Phone */}
              <a href={`tel:${CONTACT.phone.replace(/\s/g,'')}`} ref={phoneRef} className="cp-contact-card"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#38bdf855';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5),0 0 0 1px rgba(56,189,248,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(14,165,233,0.06),transparent)',borderRadius:18,pointerEvents:'none' }} />
                <div className="cp-card-icon" style={{ background:'rgba(14,165,233,0.15)',border:'1px solid rgba(56,189,248,0.25)' }}>☏</div>
                <div className="cp-card-body">
                  <div className="cp-card-label" style={{ color:'#0ea5e9' }}>Phone · WhatsApp</div>
                  <div className="cp-card-value">{CONTACT.phone}</div>
                </div>
                <div className="cp-card-actions"><CopyBtn value={CONTACT.phone} accent="#38bdf8" /></div>
              </a>

              {/* Location */}
              <div ref={locRef} className="cp-contact-card"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#34d39955';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5),0 0 0 1px rgba(52,211,153,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(5,150,105,0.06),transparent)',borderRadius:18,pointerEvents:'none' }} />
                <div className="cp-card-icon" style={{ background:'rgba(5,150,105,0.15)',border:'1px solid rgba(52,211,153,0.25)' }}>⊙</div>
                <div className="cp-card-body">
                  <div className="cp-card-label" style={{ color:'#059669' }}>Location</div>
                  <div className="cp-card-value">Tamil Nadu, India · Remote Worldwide</div>
                </div>
              </div>

            </div>
          </div>

          {/* ══ TICKER ══ */}
          <div className="cp-ticker-wrap">
            <div className="cp-ticker">
              {[...Array(2)].flatMap(() => [
                { txt:'UI / UX Design',     color:'#a78bfa' },
                { txt:'Figma Expert',        color:'#38bdf8' },
                { txt:'5+ Years Experience', color:'#f472b6' },
                { txt:'Available Now',       color:'#34d399' },
                { txt:'Remote Friendly',     color:'#fbbf24' },
                { txt:'Product Design',      color:'#a78bfa' },
                { txt:'Design Systems',      color:'#38bdf8' },
                { txt:'Photoshop',       color:'#f472b6' },
                { txt:'Illustrator',       color:'#34d399' },
                { txt:'ReactJS',       color:'#34d399' },
                { txt:'HTML/CSS/JS',       color:'#34d399' },
              ]).map((item,i) => (
                <span key={i} className="cp-ticker-item">
                  <span className="cp-ticker-dot" style={{ background:item.color, boxShadow:`0 0 6px ${item.color}` }} />
                  {item.txt}
                </span>
              ))}
            </div>
          </div>

          {/* ══ AVAILABILITY ══ */}
          <div>
            <div className="cp-avail-hdr" ref={availTitle}>
              <div className="cp-avail-hdr-top">
                <h2 className="cp-avail-title">Availability</h2>
                <div className="cp-status">
                  <span className="cp-status-dot" />
                  Open for all modes
                </div>
              </div>
              <p className="cp-avail-sub">
                Flexible across all work arrangements — remote-first, hybrid sprints, or full on-site.
                Surya adapts to your team's rhythm.
              </p>
            </div>

            <div className="cp-avail-grid">
              {AVAILABILITY.map((item,i) => <AvailCard key={item.id} item={item} index={i} />)}
            </div>
          </div>

          {/* ══ SOCIAL ══ */}
          <div className="cp-social" ref={socialRef}>
            {[
              { label:'LinkedIn', icon:'in', href:'https://www.linkedin.com/in/surya-prakash-9a8a48187/', color:'#0a66c2' },
              { label:'Behance',  icon:'Bē', href:'https://www.behance.net/suryasachin', color:'#ea4c89' },
            ].map(link => (
              <a key={link.label} href={link.href} className="c-social-btn">
                <span className="c-social-icon" style={{ background:link.color+'22',
                  border:`1px solid ${link.color}40`, color:link.color }}>{link.icon}</span>
                {link.label}
                <span style={{ fontSize:11, opacity:0.4 }}>↗</span>
              </a>
            ))}
            
          </div>

          

        </div>
      </div>
    </>
  );
}
