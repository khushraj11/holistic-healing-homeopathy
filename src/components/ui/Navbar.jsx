import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      background: scrolled ? 'rgba(250,247,240,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.4s ease',
      padding: '1.2rem 4rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '1.5rem', color: 'var(--sage-dark)',
        fontWeight: 700, letterSpacing: '1px'
      }}>
        🌿 Holistic Healing Homeopathy
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {[['Home','#home'],['About','#about'],['Services','#services'],['Contact','#contact']].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontFamily: 'Jost, sans-serif', fontSize: '0.95rem',
            color: 'var(--text-dark)', textDecoration: 'none',
            letterSpacing: '0.5px', transition: 'color 0.3s'
          }}
            onMouseEnter={e => e.target.style.color = 'var(--sage-dark)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-dark)'}
          >{label}</a>
        ))}

        {/* Book Appointment */}
        <a href="#appointment" style={{
          background: 'var(--sage-dark)', color: 'white',
          padding: '0.6rem 1.4rem', borderRadius: '30px',
          textDecoration: 'none', fontFamily: 'Jost, sans-serif',
          fontSize: '0.9rem', transition: 'all 0.3s ease'
        }}
          onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.target.style.background = 'var(--sage-dark)'; e.target.style.transform = 'translateY(0)'; }}
        >Book Appointment</a>

        {/* Patient Login */}
        <Link to="/patient-login" style={{
          background: 'rgba(201,168,76,0.15)',
          color: 'var(--gold)',
          padding: '0.6rem 1.4rem', borderRadius: '30px',
          textDecoration: 'none', fontFamily: 'Jost, sans-serif',
          fontSize: '0.9rem', border: '1.5px solid var(--gold)',
          transition: 'all 0.3s ease'
        }}
          onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'white'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(201,168,76,0.15)'; e.target.style.color = 'var(--gold)'; }}
        >Patient Login</Link>

        {/* Doctor Login */}
        <Link to="/login" style={{
          color: 'var(--sage)', fontSize: '0.85rem',
          textDecoration: 'none', fontFamily: 'Jost, sans-serif',
          borderBottom: '1px solid var(--sage-light)'
        }}>Doctor Login</Link>
      </div>
    </nav>
  );
}