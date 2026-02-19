import React from 'react';
import './styles/global.css';
import useTheme from './hooks/useTheme';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Resume from './components/Resume/Resume';
import Tools from './components/Tools/Tools';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggle} />

      {/* Main content */}
      <main>
        {/* 1. Hero Banner with 3D tilt */}
        <Hero />

        {/* 2. Resume / Skills Download */}
        <Resume />

        {/* 3. Running Tools Marquee */}
        <Tools />

        {/* 4. Projects Zig-Zag */}
        <Projects />

        {/* 5. Contact + AI Agent */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
