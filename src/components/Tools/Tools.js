import React from 'react';
import { TOOLS } from '../../data';
import './Tools.css';

export default function Tools() {
  return (
    <section id="skills" className="tools-section">
      <div className="tools-container">
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <div className="line" />
          <span>Tools & Technologies</span>
          <div className="line" />
        </div>
        <h2 className="tools-heading">
          My <span className="h-gradient">Design & Development Arsenal</span>
        </h2>
        <p className="tools-sub">
          Industry-leading tools I use to create world-class digital experiences
        </p>
      </div>

      {/* MARQUEE ROW 1 (left to right) */}
      <div className="marquee-wrapper">
        <div className="marquee-track track-fwd">
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <ToolPill key={`fwd-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      {/* MARQUEE ROW 2 (right to left) */}
      <div className="marquee-wrapper" style={{ marginTop: '16px' }}>
        <div className="marquee-track track-rev">
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <ToolPill key={`rev-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      {/* TOOLS GRID (static showcase below) */}
      <div className="tools-grid-container">
        <div className="tools-grid">
          {TOOLS.map((tool, i) => (
            <div
              key={tool.name}
              className="tool-card"
              style={{ '--tool-color': tool.color, animationDelay: `${i * 0.05}s` }}
            >
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-name">{tool.name}</div>
              <div className="tool-accent-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolPill({ tool }) {
  return (
    <div className="tool-pill" style={{ '--tool-color': tool.color }}>
      <span className="pill-icon">{tool.icon}</span>
      <span className="pill-name">{tool.name}</span>
      <span className="pill-dot" />
    </div>
  );
}
