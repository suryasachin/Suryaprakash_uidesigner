import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

// const NAV_LINKS = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [ripples, setRipples] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
const scrollToContact = () => {
    const section = document.getElementById("contact-page");
    section.scrollIntoView({ behavior: "smooth" });
  };
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMenuOpen(false);
  };

  const addRipple = (e, key) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => ({ ...r, [key]: { x, y, id } }));
    setTimeout(() => setRipples(r => { const n = { ...r }; delete n[key]; return n; }), 600);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          {/* LOGO */}
          <a className="nav-logo" href="#home" onClick={e => { e.preventDefault(); scrollTo('Home'); }}>
            <span className="logo-mark">SP</span>
            <span className="logo-text">Surya<span>Prakash</span></span>
          </a>

          {/* DESKTOP LINKS */}
          {/* <ul className="nav-links">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <button
                  className={`nav-link ${active === link ? 'active' : ''}`}
                  onClick={(e) => { addRipple(e, link); scrollTo(link); }}
                >
                  {link}
                  {active === link && <span className="nav-dot" />}
                  {ripples[link] && (
                    <span
                      className="ripple"
                      style={{ left: ripples[link].x, top: ripples[link].y }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul> */}

          {/* RIGHT: THEME + HIRE */}
          <div className="nav-right">
            {/* THEME TOGGLE */}
           

            <button
              className="btn btn-primary"
              onClick={scrollToContact}
            >
              Hire Me ✦
              {ripples['cta'] && <span className="ripple" style={{ left: ripples['cta'].x, top: ripples['cta'].y }} />}
            </button>

            {/* HAMBURGER */}
          
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {/* <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              className={`mobile-link ${active === link ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => scrollTo(link)}
            >
              <span className="ml-num">0{i + 1}</span>
              {link}
            </button>
          ))}
         
        </div>
      </div> */}
    </>
  );
}
