import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      background: scrolled || menuOpen ? 'rgba(250,247,240,0.98)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.4s ease',
      padding: '1rem 1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: 'var(--sage-dark)', fontWeight: 700 }}>
          🌿 Holistic Healing Homeopathy
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '1.5rem', color: 'var(--sage-dark)',
          display: 'flex', alignItems: 'center', padding: '0.3rem'
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
          padding: '1.2rem 0', borderTop: '1px solid rgba(122,158,126,0.2)',
          marginTop: '0.8rem'
        }}>
          {[['Home','#home'],['About','#about'],['Services','#services'],['Contact','#contact']].map(([label, href]) => (
            <a key={label} href={href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', color: 'var(--text-dark)', textDecoration: 'none', padding: '0.3rem 0' }}
            >{label}</a>
          ))}
          <a href="#appointment" onClick={() => setMenuOpen(false)} style={{
            background: 'var(--sage-dark)', color: 'white',
            padding: '0.8rem 1.4rem', borderRadius: '30px',
            textDecoration: 'none', fontFamily: 'Jost, sans-serif',
            fontSize: '0.95rem', textAlign: 'center', marginTop: '0.5rem'
          }}>Book Appointment</a>
          <Link to="/patient-login" onClick={() => setMenuOpen(false)} style={{
            background: 'rgba(201,168,76,0.15)', color: 'var(--gold)',
            padding: '0.8rem 1.4rem', borderRadius: '30px',
            textDecoration: 'none', fontFamily: 'Jost, sans-serif',
            fontSize: '0.95rem', border: '1.5px solid var(--gold)', textAlign: 'center'
          }}>Patient Login</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} style={{
            color: 'var(--sage)', fontSize: '0.9rem',
            textDecoration: 'none', fontFamily: 'Jost, sans-serif', textAlign: 'center'
          }}>Doctor Login</Link>
        </div>
      )}
    </nav>
  );
}
