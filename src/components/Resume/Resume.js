import React, { useState } from 'react';
import './Resume.css';

export default function Resume() {
  const [downloading, setDownloading] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleDownload = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600);
    setDownloading(true);
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = "/Resume.pdf"; 
      link.target = '_blank';
      link.download = 'Suryaprakash_Resume.pdf';
      link.click();
      setDownloading(false);
    }, 1200);
  };

  const SKILLS = [
    { label: 'UI Design', pct: 96 },
    { label: 'UX Research', pct: 88 },
    { label: 'Prototyping', pct: 94 },
    { label: 'Design Systems', pct: 91 },
    { label: 'Figma Make', pct: 85 },
    { label: 'Frontend (HTML/CSS/JS/React)', pct: 78 },
  ];

  const EXPERIENCE = [
    { year: 'Jul 2024 – Present', role: 'UI/UX Designer & Front-End Developer', company: 'Freelance – Worldwide' },
    { year: 'Apr 2024 – Jul 2024', role: 'UX Designer', company: 'Swipewire Technologies' },
    { year: 'Jul 2021 – Mar 2023', role: 'Senior UI/UX Designer / Front-End Developer', company: 'Maticz Technologies' },
    { year: 'Oct 2020 – May 2021', role: 'UI/UX Designer', company: 'Xsosys Technologies' },
    { year: 'Oct 2019 – May 2020', role: 'Junior Designer', company: 'Ultiweb Technologies' },
  ];

  return (
    <section id="resume" className="resume-section">
      <div className="orb orb-r1" />
      <div className="grid-bg" />
      <div className="resume-container">
        {/* TOP CTA */}
        <div className="resume-hero">
          <div className="section-label">
            <div className="line" />
            <span>Resume & Skills</span>
          </div>
          <h2 className="resume-heading">
            Years of <span className="h-gradient">Craft &</span><br />Experience
          </h2>
          <p className="resume-sub">
            A seasoned UI/UX designer and UI Developer with a strong foundation in product thinking,
            design systems, and motion craft. Download my full resume to explore.
          </p>
          <button
            className={`btn btn-primary resume-btn ${downloading ? 'loading' : ''}`}
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <><span className="spin-icon">⏳</span> Downloading...</>
            ) : (
              <><span>⬇</span> Download Resume</>
            )}
            {ripples.map(r => (
              <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
            ))}
          </button>
        </div>

        {/* GRID: SKILLS + EXPERIENCE */}
        <div className="resume-grid">
          {/* SKILLS */}
          <div className="resume-card skills-card">
            <h3 className="card-title">Core Skills</h3>
            <div className="skills-list">
              {SKILLS.map((s, i) => (
                <div key={s.label} className="skill-row">
                  <div className="skill-meta">
                    <span className="skill-name">{s.label}</span>
                    <span className="skill-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{
                        width: `${s.pct}%`,
                        animationDelay: `${i * 0.1 + 0.3}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXPERIENCE TIMELINE */}
          <div className="resume-card exp-card">
            <h3 className="card-title">Experience</h3>
            <div className="timeline">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="timeline-item">
                  <div className="tl-dot" />
                  <div className="tl-content">
                    <div className="tl-year">{e.year}</div>
                    <div className="tl-role">{e.role}</div>
                    <div className="tl-company">{e.company}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* EDUCATION */}
            <div className="edu-block">
              <div className="edu-icon">🎓</div>
              <div>
                <div className="tl-role">B.Tech in Information Technology</div>
                <div className="tl-company">KLN College of Information Technology · 2019</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
