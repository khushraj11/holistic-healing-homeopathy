import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--sage-dark)', color: 'white',
      padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🌿 Holistic Healing Homeopathy
          </div>
          <p style={{ fontFamily: 'Jost', fontSize: '0.85rem', opacity: 0.7, maxWidth: '300px', lineHeight: 1.7 }}>
            Dr. Arpana Raj — Healing naturally since 2009.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['Quick Links', ['Home', 'About', 'Services', 'Contact']]].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontFamily: 'Jost', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '1rem' }}>{title}</div>
              {links.map(l => (
                <div key={l} style={{ fontFamily: 'Jost', fontSize: '0.9rem', opacity: 0.85, marginBottom: '0.5rem' }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontFamily: 'Jost', fontSize: '0.8rem', opacity: 0.5, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '2rem' }}>
        © 2025 Holistic Healing Homeopathy. All rights reserved.
      </div>
    </footer>
  );
}
