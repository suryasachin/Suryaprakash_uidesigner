import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Surya Prakash. All rights reserved.</span>
          <span className="footer-made">Made with ❤️ &amp; Surya Prakash</span>
        </div>
      </div>
    </footer>
  );
}
